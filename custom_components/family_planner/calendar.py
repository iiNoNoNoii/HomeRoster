"""Calendar entities: one combined calendar plus one per active person."""

from __future__ import annotations

import datetime as dt
import inspect
import logging
from typing import Any

from homeassistant.components.calendar import (
    EVENT_END_DATE,
    EVENT_END_DATETIME,
    EVENT_IN,
    EVENT_START_DATE,
    EVENT_START_DATETIME,
    CalendarEntity,
    CalendarEntityFeature,
    CalendarEvent,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .compat import DeviceInfo
from .const import DOMAIN
from .coordinator import EventOccurrence, FamilyPlannerCoordinator
from .models import FamilyPlannerError, Person

_LOGGER = logging.getLogger(__name__)

_STATUS_TO_NATIVE = {
    "confirmed": "confirmed",
    "planned": "confirmed",
    "done": "confirmed",
    "tentative": "tentative",
    "cancelled": "cancelled",
}

# CalendarEvent.status was added after our declared min_ha_version's floor;
# guarding this keeps calendar.py importable/usable on the (older) core a
# pinned test environment may provide, without changing behaviour on any
# Home Assistant version we actually support.
_CALENDAR_EVENT_SUPPORTS_STATUS = "status" in inspect.signature(CalendarEvent).parameters


def _device_info(entry: ConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="Family Planner",
        manufacturer="Family Planner (lokal, ohne Cloud)",
        model="Family Calendar",
    )


def _occurrence_to_calendar_event(occ: EventOccurrence) -> CalendarEvent:
    event = occ.event
    if event.all_day:
        start: dt.date | dt.datetime = dt_util.as_local(occ.start).date()
        end: dt.date | dt.datetime = dt_util.as_local(occ.end).date()
    else:
        start = occ.start
        end = occ.end
    kwargs: dict[str, Any] = dict(
        start=start,
        end=end,
        summary=event.title,
        description=event.description,
        location=event.location,
        uid=event.id,
        recurrence_id=occ.recurrence_id,
        rrule=event.rrule,
    )
    if _CALENDAR_EVENT_SUPPORTS_STATUS and event.status:
        kwargs["status"] = _STATUS_TO_NATIVE.get(event.status)
    return CalendarEvent(**kwargs)


def _parse_native_event_kwargs(kwargs: dict[str, Any]) -> tuple[str, str, bool]:
    """Translate the native calendar.create_event / update_event kwargs.

    Returns (start_iso, end_iso, all_day).
    """
    if EVENT_START_DATE in kwargs and EVENT_END_DATE in kwargs:
        return (
            kwargs[EVENT_START_DATE].isoformat(),
            kwargs[EVENT_END_DATE].isoformat(),
            True,
        )
    if EVENT_START_DATETIME in kwargs and EVENT_END_DATETIME in kwargs:
        return (
            dt_util.as_utc(kwargs[EVENT_START_DATETIME]).isoformat(),
            dt_util.as_utc(kwargs[EVENT_END_DATETIME]).isoformat(),
            False,
        )
    if EVENT_IN in kwargs:
        in_data = kwargs[EVENT_IN]
        now = dt_util.now()
        if "days" in in_data:
            start_date = now.date() + dt.timedelta(days=in_data["days"])
            end_date = start_date + dt.timedelta(days=1)
            return start_date.isoformat(), end_date.isoformat(), True
        if "weeks" in in_data:
            start_date = now.date() + dt.timedelta(weeks=in_data["weeks"])
            end_date = start_date + dt.timedelta(days=1)
            return start_date.isoformat(), end_date.isoformat(), True
    raise HomeAssistantError(
        "Ungültige Terminangaben: es wird entweder start_date/end_date, "
        "start_date_time/end_date_time oder 'in' (days/weeks) benötigt."
    )


class FamilyPlannerBaseCalendar(CalendarEntity):
    """Shared behaviour for the combined and per-person calendars."""

    _attr_should_poll = False

    def __init__(
        self,
        coordinator: FamilyPlannerCoordinator,
        entry: ConfigEntry,
        person: Person | None,
    ) -> None:
        self.coordinator = coordinator
        self._entry = entry
        self._person = person
        suffix = "all" if person is None else person.id
        self._attr_unique_id = f"{entry.entry_id}_{suffix}"
        self._attr_name = "Family Planner" if person is None else f"Family Planner {person.name}"
        self._attr_device_info = _device_info(entry)
        # Explicit, locale-independent entity_id: relying on slugify(name)
        # would make "calendar.family_planner" depend on the UI language.
        self.entity_id = (
            "calendar.family_planner"
            if person is None
            else f"calendar.family_planner_{person.slug()}"
        )

    @property
    def person(self) -> Person | None:
        return self._person

    @property
    def event(self) -> CalendarEvent | None:
        occ = self.coordinator.get_next_event(self._person.id if self._person else None)
        return _occurrence_to_calendar_event(occ) if occ else None

    async def async_get_events(
        self, hass: HomeAssistant, start_date: dt.datetime, end_date: dt.datetime
    ) -> list[CalendarEvent]:
        occurrences = self.coordinator.get_events_in_range(
            dt_util.as_utc(start_date),
            dt_util.as_utc(end_date),
            person_ids=[self._person.id] if self._person else None,
        )
        return [_occurrence_to_calendar_event(occ) for occ in occurrences]

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        self.async_on_remove(self.coordinator.async_add_listener(self._handle_coordinator_update))

    @callback
    def _handle_coordinator_update(self) -> None:
        self.async_write_ha_state()


class FamilyPlannerCalendar(FamilyPlannerBaseCalendar):
    """The combined calendar.family_planner entity - the primary read/write entity."""

    _attr_supported_features = (
        CalendarEntityFeature.CREATE_EVENT
        | CalendarEntityFeature.UPDATE_EVENT
        | CalendarEntityFeature.DELETE_EVENT
    )

    async def async_create_event(self, **kwargs: Any) -> None:
        start, end, all_day = _parse_native_event_kwargs(kwargs)
        data = {
            "title": kwargs["summary"],
            "start": start,
            "end": end,
            "all_day": all_day,
            "description": kwargs.get("description") or None,
            "location": kwargs.get("location"),
        }
        try:
            await self.coordinator.async_create_event(data)
        except FamilyPlannerError as err:
            raise HomeAssistantError(str(err)) from err

    async def async_delete_event(
        self,
        uid: str,
        recurrence_id: str | None = None,
        recurrence_range: str | None = None,
    ) -> None:
        if recurrence_range:
            raise HomeAssistantError(
                "Das Löschen 'dieser und folgender' Instanzen wird noch nicht unterstützt "
                "(Phase 3). Bitte die ganze Serie oder eine einzelne Instanz löschen."
            )
        mode = "instance" if recurrence_id else "series"
        try:
            await self.coordinator.async_delete_event(
                uid, mode=mode, occurrence_start=recurrence_id
            )
        except FamilyPlannerError as err:
            raise HomeAssistantError(str(err)) from err

    async def async_update_event(
        self,
        uid: str,
        event: dict[str, Any],
        recurrence_id: str | None = None,
        recurrence_range: str | None = None,
    ) -> None:
        if recurrence_range:
            raise HomeAssistantError(
                "Das Bearbeiten 'dieser und folgender' Instanzen wird noch nicht unterstützt "
                "(Phase 3). Bitte die ganze Serie bearbeiten."
            )
        if recurrence_id:
            raise HomeAssistantError(
                "Das Bearbeiten einzelner Serieninstanzen wird noch nicht unterstützt (Phase 3)."
            )
        start, end, all_day = _parse_native_event_kwargs(event)
        changes = {
            "title": event["summary"],
            "start": start,
            "end": end,
            "all_day": all_day,
            "description": event.get("description") or None,
            "location": event.get("location"),
        }
        try:
            await self.coordinator.async_update_event(uid, changes)
        except FamilyPlannerError as err:
            raise HomeAssistantError(str(err)) from err


class FamilyPlannerPersonCalendar(FamilyPlannerBaseCalendar):
    """A read-only calendar filtered to a single person's events."""

    _attr_supported_features = CalendarEntityFeature(0)


class _PersonCalendarSync:
    """Keeps one read-only calendar entity per active person in sync."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        coordinator: FamilyPlannerCoordinator,
        async_add_entities: AddEntitiesCallback,
    ) -> None:
        self.hass = hass
        self.entry = entry
        self.coordinator = coordinator
        self.async_add_entities = async_add_entities
        self.entities: dict[str, FamilyPlannerPersonCalendar] = {}

    @callback
    def sync(self) -> None:
        active_ids = {p.id for p in self.coordinator.get_people() if p.active}
        known_ids = set(self.entities)

        new_ids = active_ids - known_ids
        if new_ids:
            new_entities = []
            for person_id in new_ids:
                person = self.coordinator.get_person(person_id)
                if person is None:
                    continue
                entity = FamilyPlannerPersonCalendar(self.coordinator, self.entry, person)
                self.entities[person_id] = entity
                new_entities.append(entity)
            if new_entities:
                self.async_add_entities(new_entities)

        removed_ids = known_ids - active_ids
        for person_id in removed_ids:
            entity = self.entities.pop(person_id)
            self.hass.async_create_task(entity.async_remove(force_remove=True))


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    coordinator: FamilyPlannerCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    entities: list[CalendarEntity] = [FamilyPlannerCalendar(coordinator, entry, None)]
    for person in coordinator.get_people():
        if person.active:
            entities.append(FamilyPlannerPersonCalendar(coordinator, entry, person))
    async_add_entities(entities)

    sync = _PersonCalendarSync(hass, entry, coordinator, async_add_entities)
    sync.entities = {e.person.id: e for e in entities if isinstance(e, FamilyPlannerPersonCalendar)}
    entry.async_on_unload(coordinator.async_add_listener(sync.sync))
