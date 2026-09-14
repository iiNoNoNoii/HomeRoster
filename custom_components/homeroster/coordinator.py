"""Central local-push data manager for the HomeRoster integration.

This is the single source of truth: it owns the in-memory representation of
people, categories and events, persists changes to local storage, expands
bounded recurrence windows, and fires Home Assistant bus events. Calendar
entities, sensors, the websocket API and the services all read/write through
this coordinator instead of touching storage directly.
"""

from __future__ import annotations

import datetime as dt
import logging
from collections.abc import Callable
from typing import Any, NamedTuple

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import (
    CONF_REMINDER_TICK_SECONDS,
    CONF_REQUIRE_PERSON,
    CONF_SEND_MOBILE_NOTIFICATIONS,
    DEFAULT_REMINDER_TICK_SECONDS,
    DEFAULT_REQUIRE_PERSON,
    DEFAULT_SEND_MOBILE_NOTIFICATIONS,
    EVENT_CREATED,
    EVENT_DELETED,
    EVENT_ENDED,
    EVENT_REMINDER_DUE,
    EVENT_STARTED,
    EVENT_UPDATED,
    FIRED_REMINDER_RETENTION_HOURS,
    STRATEGY_DEACTIVATE,
    STRATEGY_KEEP_UNASSIGNED,
    STRATEGY_REASSIGN,
    STRATEGY_REMOVE_FROM_EVENTS,
)
from .models import (
    Category,
    ConflictError,
    Event,
    NotFoundError,
    Person,
    ValidationError,
    new_id,
    utcnow_iso,
)
from .recurrence import RRuleValidationError, expand_occurrences
from .storage import create_store, empty_data

_LOGGER = logging.getLogger(__name__)

ALLOWED_EVENT_FIELDS = {
    "title",
    "subtitle",
    "start",
    "end",
    "all_day",
    "person_ids",
    "description",
    "location",
    "location_address",
    "category_id",
    "color",
    "icon",
    "status",
    "reminders",
    "rrule",
    "exdates",
}

NEXT_EVENT_LOOKAHEAD_DAYS = 400
REMINDER_LOOKAHEAD_HOURS = 24 * 8
MISSED_REMINDER_GRACE = dt.timedelta(hours=1)
START_END_SCAN_WINDOW = dt.timedelta(days=2)


class EventOccurrence(NamedTuple):
    """A single, possibly-expanded, occurrence of an event."""

    event: Event
    start: dt.datetime
    end: dt.datetime
    recurrence_id: str | None

    def occurrence_key(self) -> str:
        return f"{self.event.id}:{self.recurrence_id or 'single'}"


class ReminderOccurrence(NamedTuple):
    """A single not-yet-fired reminder for an occurrence, with its due time.

    Distinct from EventOccurrence's own start/end: an event's *reminder* can
    become due before an *earlier-starting* event's reminder does, if the
    later event has a longer lead time configured (e.g. a 15:00 event with a
    60-minute reminder is due at 14:00, before a 14:30 event with only a
    5-minute reminder, due at 14:25) - get_next_event() alone cannot answer
    "what should I be reminded of next", only get_next_reminder() can.
    """

    occurrence: EventOccurrence
    offset: int
    due_at: dt.datetime


class HomeRosterCoordinator:
    """Owns HomeRoster data, persistence, recurrence and scheduling."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._store = create_store(hass, entry.entry_id)
        self._people: dict[str, Person] = {}
        self._categories: dict[str, Category] = {}
        self._events: dict[str, Event] = {}
        self._fired_reminders: dict[str, str] = {}
        self._listeners: list[Callable[[], None]] = []
        self._reminder_listeners: list[Callable[[EventOccurrence, int, dt.datetime], None]] = []
        self._unsub_tick: Callable[[], None] | None = None
        self._active_keys: set[str] = set()
        self._last_local_date: dt.date | None = None
        self.last_save_error: str | None = None
        self.last_migration: str | None = None

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    async def async_load(self) -> None:
        """Load persisted data (or seed defaults) and start the scheduler."""
        stored = await self._store.async_load()
        if stored is None:
            stored = empty_data()
            self.last_migration = "seeded_default_data"
        self._people = {p["id"]: Person.from_dict(p) for p in stored.get("people", [])}
        self._categories = {c["id"]: Category.from_dict(c) for c in stored.get("categories", [])}
        self._events = {e["id"]: Event.from_dict(e) for e in stored.get("events", [])}
        self._fired_reminders = dict(stored.get("fired_reminders", {}))

        interval = self.entry.options.get(CONF_REMINDER_TICK_SECONDS, DEFAULT_REMINDER_TICK_SECONDS)
        self._unsub_tick = async_track_time_interval(
            self.hass, self._async_tick, dt.timedelta(seconds=interval)
        )
        self._check_start_end(dt_util.utcnow())

    async def async_unload(self) -> None:
        """Stop the scheduler and flush any pending save."""
        if self._unsub_tick is not None:
            self._unsub_tick()
            self._unsub_tick = None
        await self.async_flush()

    def async_add_listener(self, update_callback: Callable[[], None]) -> Callable[[], None]:
        """Register a callback invoked whenever data changes; returns an unsubscribe."""
        self._listeners.append(update_callback)

        def _remove() -> None:
            if update_callback in self._listeners:
                self._listeners.remove(update_callback)

        return _remove

    def async_update_listeners(self) -> None:
        for callback_ in list(self._listeners):
            callback_()

    def async_add_reminder_listener(
        self, listener: Callable[[EventOccurrence, int, dt.datetime], None]
    ) -> Callable[[], None]:
        """Register a callback invoked once for each reminder as it becomes
        due - (occurrence, offset_minutes, due_at). Unlike async_add_listener
        (which just signals "something changed, re-read current state"),
        this fires with the specific reminder that just triggered, which is
        what lets sensor.py's "reminder due" sensor produce one distinct,
        automation-triggerable state change per reminder instead of a
        generic refresh. Returns an unsubscribe callable."""
        self._reminder_listeners.append(listener)

        def _remove() -> None:
            if listener in self._reminder_listeners:
                self._reminder_listeners.remove(listener)

        return _remove

    # ------------------------------------------------------------------
    # Persistence
    # ------------------------------------------------------------------

    def _data_to_save(self) -> dict[str, Any]:
        return {
            "people": [
                p.to_dict() for p in sorted(self._people.values(), key=lambda p: p.sort_order)
            ],
            "categories": [
                c.to_dict() for c in sorted(self._categories.values(), key=lambda c: c.sort_order)
            ],
            "events": [e.to_dict() for e in self._events.values()],
            "fired_reminders": dict(self._fired_reminders),
        }

    def _async_save(self) -> None:
        try:
            self._store.async_delay_save(self._data_to_save, 1.0)
            self.last_save_error = None
        except Exception as err:  # noqa: BLE001 - must never crash a CRUD call
            self.last_save_error = str(err)
            _LOGGER.error("HomeRoster: Speichern fehlgeschlagen: %s", err)
            raise

    async def async_flush(self) -> None:
        """Persist immediately (used on unload and in tests)."""
        await self._store.async_save(self._data_to_save())

    # ------------------------------------------------------------------
    # People
    # ------------------------------------------------------------------

    def get_people(self) -> list[Person]:
        return sorted(self._people.values(), key=lambda p: p.sort_order)

    def get_person(self, person_id: str) -> Person | None:
        return self._people.get(person_id)

    async def async_create_person(self, data: dict[str, Any]) -> Person:
        person = Person(
            id=new_id(),
            name=data["name"],
            color=data.get("color") or "#3f51b5",
            icon=data.get("icon"),
            linked_person_entity_id=data.get("linked_person_entity_id"),
            active=data.get("active", True),
            sort_order=data.get("sort_order", len(self._people)),
            role=data.get("role"),
            notify_service=data.get("notify_service"),
        )
        person.validate()
        self._people[person.id] = person
        self._async_save()
        self.async_update_listeners()
        return person

    async def async_update_person(self, person_id: str, changes: dict[str, Any]) -> Person:
        existing = self._people.get(person_id)
        if existing is None:
            raise NotFoundError(f"Person nicht gefunden: {person_id}")
        data = existing.to_dict()
        data.update(
            {
                k: v
                for k, v in changes.items()
                if k
                in {
                    "name",
                    "color",
                    "icon",
                    "linked_person_entity_id",
                    "active",
                    "sort_order",
                    "role",
                    "notify_service",
                }
            }
        )
        updated = Person.from_dict(data)
        updated.validate()
        self._people[person_id] = updated
        self._async_save()
        self.async_update_listeners()
        return updated

    async def async_delete_person(
        self,
        person_id: str,
        strategy: str,
        reassign_to: str | None = None,
    ) -> None:
        person = self._people.get(person_id)
        if person is None:
            raise NotFoundError(f"Person nicht gefunden: {person_id}")

        if strategy == STRATEGY_DEACTIVATE:
            person.active = False
            self._async_save()
            self.async_update_listeners()
            return

        if strategy == STRATEGY_REASSIGN:
            if not reassign_to or reassign_to not in self._people:
                raise ValidationError("Zielperson für die Neuzuweisung wurde nicht gefunden.")
            for event in self._events.values():
                if person_id in event.person_ids:
                    new_ids = [reassign_to if pid == person_id else pid for pid in event.person_ids]
                    # de-duplicate while preserving order
                    event.person_ids = list(dict.fromkeys(new_ids))
                    event.updated_at = utcnow_iso()
                    event.version += 1
        elif strategy in (STRATEGY_REMOVE_FROM_EVENTS, STRATEGY_KEEP_UNASSIGNED):
            # Both strategies guarantee events are never deleted: events that
            # only had this person assigned are kept with an empty
            # person_ids list rather than silently disappearing.
            for event in self._events.values():
                if person_id in event.person_ids:
                    event.person_ids = [pid for pid in event.person_ids if pid != person_id]
                    event.updated_at = utcnow_iso()
                    event.version += 1
        else:
            raise ValidationError(f"Unbekannte Löschstrategie: {strategy}")

        del self._people[person_id]
        self._async_save()
        self.async_update_listeners()

    async def async_reorder_people(self, ordered_ids: list[str]) -> None:
        for index, person_id in enumerate(ordered_ids):
            if person_id in self._people:
                self._people[person_id].sort_order = index
        self._async_save()
        self.async_update_listeners()

    # ------------------------------------------------------------------
    # Categories
    # ------------------------------------------------------------------

    def get_categories(self) -> list[Category]:
        return sorted(self._categories.values(), key=lambda c: c.sort_order)

    def get_category(self, category_id: str) -> Category | None:
        return self._categories.get(category_id)

    async def async_create_category(self, data: dict[str, Any]) -> Category:
        category = Category(
            id=new_id(),
            name=data["name"],
            color=data.get("color") or "#9e9e9e",
            icon=data.get("icon"),
            active=data.get("active", True),
            sort_order=data.get("sort_order", len(self._categories)),
        )
        category.validate()
        self._categories[category.id] = category
        self._async_save()
        self.async_update_listeners()
        return category

    async def async_update_category(self, category_id: str, changes: dict[str, Any]) -> Category:
        existing = self._categories.get(category_id)
        if existing is None:
            raise NotFoundError(f"Kategorie nicht gefunden: {category_id}")
        data = existing.to_dict()
        data.update(
            {
                k: v
                for k, v in changes.items()
                if k in {"name", "color", "icon", "active", "sort_order"}
            }
        )
        updated = Category.from_dict(data)
        updated.validate()
        self._categories[category_id] = updated
        self._async_save()
        self.async_update_listeners()
        return updated

    async def async_delete_category(self, category_id: str) -> None:
        if category_id not in self._categories:
            raise NotFoundError(f"Kategorie nicht gefunden: {category_id}")
        for event in self._events.values():
            if event.category_id == category_id:
                event.category_id = None
                event.updated_at = utcnow_iso()
                event.version += 1
        del self._categories[category_id]
        self._async_save()
        self.async_update_listeners()

    async def async_reorder_categories(self, ordered_ids: list[str]) -> None:
        for index, category_id in enumerate(ordered_ids):
            if category_id in self._categories:
                self._categories[category_id].sort_order = index
        self._async_save()
        self.async_update_listeners()

    # ------------------------------------------------------------------
    # Events - validation helpers
    # ------------------------------------------------------------------

    def _validate_person_ids(self, person_ids: list[str]) -> None:
        for person_id in person_ids:
            if person_id not in self._people:
                raise ValidationError(f"Unbekannte Person: {person_id}")

    def _validate_category_id(self, category_id: str | None) -> None:
        if category_id and category_id not in self._categories:
            raise ValidationError(f"Unbekannte Kategorie: {category_id}")

    def _require_person(self) -> bool:
        return bool(self.entry.options.get(CONF_REQUIRE_PERSON, DEFAULT_REQUIRE_PERSON))

    def get_event(self, event_id: str) -> Event | None:
        return self._events.get(event_id)

    # ------------------------------------------------------------------
    # Events - CRUD
    # ------------------------------------------------------------------

    async def async_create_event(
        self, data: dict[str, Any], created_by: str | None = None
    ) -> Event:
        person_ids = list(data.get("person_ids", []))
        self._validate_person_ids(person_ids)
        self._validate_category_id(data.get("category_id"))
        if self._require_person() and not person_ids:
            raise ValidationError("Mindestens eine Person muss zugewiesen werden.")

        event = Event(
            id=new_id(),
            title=data["title"],
            subtitle=data.get("subtitle"),
            start=data["start"],
            end=data["end"],
            all_day=data.get("all_day", False),
            person_ids=person_ids,
            description=data.get("description"),
            location=data.get("location"),
            location_address=data.get("location_address"),
            category_id=data.get("category_id"),
            color=data.get("color"),
            icon=data.get("icon"),
            status=data.get("status"),
            created_by=created_by,
            reminders=list(data.get("reminders", [])),
            rrule=data.get("rrule"),
        )
        event.validate()
        self._events[event.id] = event
        self._async_save()
        self.async_update_listeners()
        self._fire(EVENT_CREATED, event)
        return event

    async def async_update_event(
        self,
        event_id: str,
        changes: dict[str, Any],
        expected_version: int | None = None,
    ) -> Event:
        existing = self._events.get(event_id)
        if existing is None:
            raise NotFoundError(f"Termin nicht gefunden: {event_id}")
        if expected_version is not None and expected_version != existing.version:
            raise ConflictError(
                "Der Termin wurde zwischenzeitlich auf einem anderen Gerät geändert.",
                current=existing.to_dict(),
            )

        if "person_ids" in changes:
            self._validate_person_ids(changes["person_ids"])
        if "category_id" in changes:
            self._validate_category_id(changes["category_id"])

        merged = existing.to_dict()
        merged.update({k: v for k, v in changes.items() if k in ALLOWED_EVENT_FIELDS})

        if self._require_person() and not merged.get("person_ids"):
            raise ValidationError("Mindestens eine Person muss zugewiesen werden.")

        updated = Event.from_dict(merged)
        updated.created_at = existing.created_at
        updated.created_by = existing.created_by
        updated.updated_at = utcnow_iso()
        updated.version = existing.version + 1
        updated.validate()

        self._events[event_id] = updated
        self._async_save()
        self.async_update_listeners()
        self._fire(EVENT_UPDATED, updated)
        return updated

    async def async_delete_event(
        self,
        event_id: str,
        mode: str = "series",
        occurrence_start: str | None = None,
    ) -> None:
        existing = self._events.get(event_id)
        if existing is None:
            raise NotFoundError(f"Termin nicht gefunden: {event_id}")

        if mode == "instance":
            if not occurrence_start:
                raise ValidationError("occurrence_start ist für mode=instance erforderlich.")
            if occurrence_start not in existing.exdates:
                existing.exdates.append(occurrence_start)
                existing.updated_at = utcnow_iso()
                existing.version += 1
                self._async_save()
                self.async_update_listeners()
                self._fire(EVENT_UPDATED, existing)
            return

        del self._events[event_id]
        self._async_save()
        self.async_update_listeners()
        self._fire(EVENT_DELETED, existing)

    async def async_duplicate_event(
        self,
        event_id: str,
        start_override: str | None = None,
        end_override: str | None = None,
    ) -> Event:
        existing = self._events.get(event_id)
        if existing is None:
            raise NotFoundError(f"Termin nicht gefunden: {event_id}")
        data = existing.to_dict()
        data["id"] = new_id()
        if start_override:
            data["start"] = start_override
        if end_override:
            data["end"] = end_override
        data["created_at"] = utcnow_iso()
        data["updated_at"] = data["created_at"]
        data["version"] = 1
        data["rrule"] = None
        data["exdates"] = []
        new_event = Event.from_dict(data)
        new_event.validate()
        self._events[new_event.id] = new_event
        self._async_save()
        self.async_update_listeners()
        self._fire(EVENT_CREATED, new_event)
        return new_event

    async def async_set_event_status(self, event_id: str, status: str) -> Event:
        return await self.async_update_event(event_id, {"status": status})

    # ------------------------------------------------------------------
    # Queries (bounded, in-memory, synchronous)
    # ------------------------------------------------------------------

    def _all_occurrences(
        self,
        range_start: dt.datetime,
        range_end: dt.datetime,
        person_ids: list[str] | None = None,
        category_ids: list[str] | None = None,
        statuses: list[str] | None = None,
        include_cancelled: bool = True,
    ) -> list[EventOccurrence]:
        person_filter = set(person_ids) if person_ids else None
        category_filter = set(category_ids) if category_ids else None
        status_filter = set(statuses) if statuses else None
        results: list[EventOccurrence] = []

        for event in self._events.values():
            if person_filter is not None and not (set(event.person_ids) & person_filter):
                continue
            if category_filter is not None and event.category_id not in category_filter:
                continue
            if status_filter is not None and event.status not in status_filter:
                continue
            if not include_cancelled and event.status == "cancelled":
                continue

            duration = event.end_utc() - event.start_utc()

            if event.rrule:
                try:
                    starts = expand_occurrences(
                        event.rrule, event.start_utc(), duration, range_start, range_end
                    )
                except RRuleValidationError:
                    _LOGGER.warning(
                        "HomeRoster: Termin %s hat eine ungültige Wiederholungsregel "
                        "und wird übersprungen.",
                        event.id,
                    )
                    continue
                for occ_start in starts:
                    occ_start_iso = occ_start.isoformat()
                    if occ_start_iso in event.exdates:
                        continue
                    occ_end = occ_start + duration
                    if occ_end <= range_start or occ_start >= range_end:
                        continue
                    results.append(EventOccurrence(event, occ_start, occ_end, occ_start_iso))
            else:
                occ_start = event.start_utc()
                occ_end = event.end_utc()
                if occ_end <= range_start or occ_start >= range_end:
                    continue
                results.append(EventOccurrence(event, occ_start, occ_end, None))

        results.sort(key=lambda occ: occ.start)
        return results

    def get_events_in_range(
        self,
        start: dt.datetime,
        end: dt.datetime,
        person_ids: list[str] | None = None,
        category_ids: list[str] | None = None,
        statuses: list[str] | None = None,
        include_cancelled: bool = True,
    ) -> list[EventOccurrence]:
        return self._all_occurrences(
            start, end, person_ids, category_ids, statuses, include_cancelled
        )

    @staticmethod
    def today_range_utc() -> tuple[dt.datetime, dt.datetime]:
        start_local = dt_util.start_of_local_day()
        end_local = start_local + dt.timedelta(days=1)
        return dt_util.as_utc(start_local), dt_util.as_utc(end_local)

    def get_today_events(self, person_id: str | None = None) -> list[EventOccurrence]:
        start, end = self.today_range_utc()
        return self._all_occurrences(start, end, person_ids=[person_id] if person_id else None)

    def get_next_event(self, person_id: str | None = None) -> EventOccurrence | None:
        now = dt_util.utcnow()
        window_start = dt_util.as_utc(dt_util.start_of_local_day())
        window_end = now + dt.timedelta(days=NEXT_EVENT_LOOKAHEAD_DAYS)
        occurrences = self._all_occurrences(
            window_start,
            window_end,
            person_ids=[person_id] if person_id else None,
            include_cancelled=False,
        )
        upcoming = [occ for occ in occurrences if occ.end > now]
        return upcoming[0] if upcoming else None

    def get_next_reminder(self, person_id: str | None = None) -> ReminderOccurrence | None:
        """The soonest not-yet-fired reminder, across all upcoming occurrences.

        Not the same as "the reminder for get_next_event()": a later event
        with a longer lead time can be due for a reminder before an
        earlier-starting event with a short lead time - see
        ReminderOccurrence's docstring for the concrete example. Bounded by
        REMINDER_LOOKAHEAD_HOURS, same as _check_reminders() itself, so this
        never reports something as "next" that the scheduler wouldn't also
        be about to act on.
        """
        now = dt_util.utcnow()
        window_end = now + dt.timedelta(hours=REMINDER_LOOKAHEAD_HOURS)
        occurrences = self._all_occurrences(
            now,
            window_end,
            person_ids=[person_id] if person_id else None,
            include_cancelled=False,
        )
        candidates: list[ReminderOccurrence] = []
        for occ in occurrences:
            for offset in occ.event.reminders:
                due_at = occ.start - dt.timedelta(minutes=offset)
                if due_at < now:
                    continue
                key = f"{occ.occurrence_key()}:{offset}"
                if key in self._fired_reminders:
                    continue
                candidates.append(ReminderOccurrence(occ, offset, due_at))
        if not candidates:
            return None
        return min(candidates, key=lambda c: c.due_at)

    def get_active_events(self, person_id: str | None = None) -> list[EventOccurrence]:
        now = dt_util.utcnow()
        occurrences = self._all_occurrences(
            now - START_END_SCAN_WINDOW,
            now + START_END_SCAN_WINDOW,
            person_ids=[person_id] if person_id else None,
            include_cancelled=False,
        )
        return [occ for occ in occurrences if occ.start <= now < occ.end]

    # ------------------------------------------------------------------
    # Import / Export
    # ------------------------------------------------------------------

    def export_json(self) -> dict[str, Any]:
        return {
            "schema_version": 1,
            "exported_at": utcnow_iso(),
            "people": [p.to_dict() for p in self.get_people()],
            "categories": [c.to_dict() for c in self.get_categories()],
            "events": [e.to_dict() for e in self._events.values()],
        }

    async def async_import_json(
        self, payload: dict[str, Any], conflict_strategy: str = "skip"
    ) -> dict[str, Any]:
        if not isinstance(payload, dict):
            raise ValidationError("Import-Datei hat ein ungültiges Format.")

        result: dict[str, Any] = {
            "people_imported": 0,
            "categories_imported": 0,
            "events_imported": 0,
            "events_skipped": 0,
            "events_replaced": 0,
            "events_duplicated": 0,
            "errors": [],
        }

        for raw_person in payload.get("people", []):
            try:
                person = Person.from_dict(raw_person)
                person.validate()
                self._people[person.id] = person
                result["people_imported"] += 1
            except (KeyError, ValidationError) as err:
                result["errors"].append(f"Person übersprungen: {err}")

        for raw_category in payload.get("categories", []):
            try:
                category = Category.from_dict(raw_category)
                category.validate()
                self._categories[category.id] = category
                result["categories_imported"] += 1
            except (KeyError, ValidationError) as err:
                result["errors"].append(f"Kategorie übersprungen: {err}")

        for raw_event in payload.get("events", []):
            try:
                event = Event.from_dict(raw_event)
                event.validate()
            except (KeyError, ValidationError) as err:
                result["errors"].append(f"Termin übersprungen: {err}")
                continue

            if event.id in self._events:
                if conflict_strategy == "skip":
                    result["events_skipped"] += 1
                    continue
                if conflict_strategy == "replace":
                    self._events[event.id] = event
                    result["events_replaced"] += 1
                    continue
                if conflict_strategy == "duplicate":
                    event.id = new_id()
                    self._events[event.id] = event
                    result["events_duplicated"] += 1
                    continue
                raise ValidationError(f"Unbekannte Konfliktstrategie: {conflict_strategy}")
            else:
                self._events[event.id] = event
                result["events_imported"] += 1

        self._async_save()
        self.async_update_listeners()
        return result

    # ------------------------------------------------------------------
    # Scheduler: reminders + start/end detection
    # ------------------------------------------------------------------

    async def _async_tick(self, _now: dt.datetime) -> None:
        now = dt_util.utcnow()
        await self._check_reminders(now)
        self._check_start_end(now)
        self._check_date_rollover()
        self._prune_fired_reminders(now)

    def _check_date_rollover(self) -> None:
        """Detect local midnight passing so today/tomorrow-based sensors refresh."""
        today = dt_util.now().date()
        if self._last_local_date is None:
            self._last_local_date = today
            return
        if today != self._last_local_date:
            self._last_local_date = today
            self.async_update_listeners()

    async def _check_reminders(self, now: dt.datetime) -> None:
        window_end = now + dt.timedelta(hours=REMINDER_LOOKAHEAD_HOURS)
        occurrences = self._all_occurrences(
            now - dt.timedelta(hours=1), window_end, include_cancelled=False
        )
        send_notifications = bool(
            self.entry.options.get(
                CONF_SEND_MOBILE_NOTIFICATIONS, DEFAULT_SEND_MOBILE_NOTIFICATIONS
            )
        )
        changed = False
        for occ in occurrences:
            for offset in occ.event.reminders:
                due_at = occ.start - dt.timedelta(minutes=offset)
                if due_at > now:
                    continue
                key = f"{occ.occurrence_key()}:{offset}"
                if key in self._fired_reminders:
                    continue
                self._fired_reminders[key] = now.isoformat()
                changed = True
                if now - due_at <= MISSED_REMINDER_GRACE:
                    self._fire(
                        EVENT_REMINDER_DUE,
                        occ.event,
                        extra={
                            "offset_minutes": offset,
                            "occurrence_start": occ.start.isoformat(),
                        },
                    )
                    if send_notifications:
                        await self._async_send_reminder_notifications(occ, offset)
                    for listener in list(self._reminder_listeners):
                        listener(occ, offset, now)
                else:
                    _LOGGER.debug(
                        "HomeRoster: Erinnerung für Termin %s (Offset %s Min.) nach "
                        "Neustart übersprungen, da sie zu weit in der Vergangenheit liegt.",
                        occ.event.id,
                        offset,
                    )
        if changed:
            self._async_save()

    async def _async_send_reminder_notifications(self, occ: EventOccurrence, offset: int) -> None:
        """Push a due reminder to each assigned person with a notify_service set.

        Best-effort and isolated per person: a missing/removed notify service
        (e.g. the Companion App was uninstalled) must not stop other people
        or other events from being notified, and must not break reminder
        processing (the bus event above has already fired regardless).
        """
        if offset == 0:
            when = "jetzt"
        else:
            when = f"um {dt_util.as_local(occ.start).strftime('%H:%M')} Uhr"
        message = f"Erinnerung: {occ.event.title} {when}"
        for person_id in occ.event.person_ids:
            person = self._people.get(person_id)
            if person is None or not person.notify_service:
                continue
            try:
                await self.hass.services.async_call(
                    "notify",
                    person.notify_service,
                    {"title": occ.event.title, "message": message},
                    blocking=False,
                )
            except Exception as err:  # noqa: BLE001 - one bad target must not break the rest
                _LOGGER.warning(
                    "HomeRoster: Push-Benachrichtigung an %s (notify.%s) fehlgeschlagen: %s",
                    person.name,
                    person.notify_service,
                    err,
                )

    def _check_start_end(self, now: dt.datetime) -> None:
        occurrences = self._all_occurrences(
            now - START_END_SCAN_WINDOW, now + START_END_SCAN_WINDOW, include_cancelled=False
        )
        by_key = {occ.occurrence_key(): occ for occ in occurrences}
        active_keys = {key for key, occ in by_key.items() if occ.start <= now < occ.end}

        started = active_keys - self._active_keys
        ended = self._active_keys - active_keys

        for key in started:
            self._fire(EVENT_STARTED, by_key[key].event)
        for key in ended:
            occ = by_key.get(key)
            if occ is not None:
                self._fire(EVENT_ENDED, occ.event)

        if started or ended:
            self._active_keys = active_keys
            self.async_update_listeners()

    def _prune_fired_reminders(self, now: dt.datetime) -> None:
        cutoff = now - dt.timedelta(hours=FIRED_REMINDER_RETENTION_HOURS)
        stale = [
            key
            for key, fired_at in self._fired_reminders.items()
            if (dt_util.parse_datetime(fired_at) or now) < cutoff
        ]
        if stale:
            for key in stale:
                del self._fired_reminders[key]
            self._async_save()

    def _fire(self, event_type: str, event: Event, extra: dict[str, Any] | None = None) -> None:
        payload: dict[str, Any] = {
            "event_id": event.id,
            "title": event.title,
            "start": event.start,
            "end": event.end,
            "all_day": event.all_day,
            "person_ids": list(event.person_ids),
        }
        if extra:
            payload.update(extra)
        self.hass.bus.async_fire(event_type, payload)

    # ------------------------------------------------------------------
    # Diagnostics
    # ------------------------------------------------------------------

    def diagnostics_summary(self) -> dict[str, Any]:
        dates = []
        for event in self._events.values():
            try:
                dates.append(event.start_utc())
            except Exception:  # noqa: BLE001 - diagnostics must never crash
                continue
        return {
            "people_count": len(self._people),
            "active_people_count": sum(1 for p in self._people.values() if p.active),
            "categories_count": len(self._categories),
            "events_count": len(self._events),
            "recurring_events_count": sum(1 for e in self._events.values() if e.rrule),
            "earliest_event_date": min(dates).date().isoformat() if dates else None,
            "latest_event_date": max(dates).date().isoformat() if dates else None,
            "last_save_error": self.last_save_error,
            "last_migration": self.last_migration,
        }
