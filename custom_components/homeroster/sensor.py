"""Sensors for dashboard tiles and automations.

Sensor state is only written when the coordinator reports an actual change
(event CRUD, a start/end transition, or local midnight passing) - never on a
fixed polling interval - to avoid unnecessary recorder writes.
"""

from __future__ import annotations

import datetime as dt
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from .compat import DeviceInfo
from .const import DOMAIN, MAX_TODAY_ATTR_EVENTS
from .coordinator import EventOccurrence, HomeRosterCoordinator, ReminderOccurrence
from .models import Person

BIRTHDAY_CATEGORY_ID = "birthday"


def _device_info(entry: ConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="HomeRoster",
        manufacturer="HomeRoster (lokal, ohne Cloud)",
        model="Family Calendar",
    )


def _event_summary(occ: EventOccurrence) -> dict[str, Any]:
    event = occ.event
    return {
        "id": event.id,
        "title": event.title,
        "subtitle": event.subtitle,
        "start": occ.start.isoformat(),
        "end": occ.end.isoformat(),
        "all_day": event.all_day,
        "person_ids": list(event.person_ids),
        "category_id": event.category_id,
        "location": event.location,
        "status": event.status,
    }


def _reminder_summary(
    coordinator: HomeRosterCoordinator, reminder: ReminderOccurrence
) -> dict[str, Any]:
    data = _event_summary(reminder.occurrence)
    data["offset_minutes"] = reminder.offset
    data["due_at"] = reminder.due_at.isoformat()
    person_names = []
    for person_id in reminder.occurrence.event.person_ids:
        person = coordinator.get_person(person_id)
        if person is not None:
            person_names.append(person.name)
    data["person_names"] = person_names
    return data


class _HomeRosterSensorBase(SensorEntity):
    _attr_should_poll = False

    def __init__(
        self,
        coordinator: HomeRosterCoordinator,
        entry: ConfigEntry,
        key: str,
        name: str,
        person: Person | None,
    ) -> None:
        self.coordinator = coordinator
        self._entry = entry
        self._person = person
        id_suffix = "" if person is None else f"_{person.id}"
        self._attr_unique_id = f"{entry.entry_id}_{key}{id_suffix}"
        self._attr_name = name if person is None else f"{name} {person.name}"
        self._attr_device_info = _device_info(entry)
        # Explicit, locale-independent entity_id (see calendar.py for why).
        slug_suffix = "" if person is None else f"_{person.slug()}"
        self.entity_id = f"sensor.homeroster_{key}{slug_suffix}"

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.coordinator.async_add_listener(self._handle_coordinator_update))

    @callback
    def _handle_coordinator_update(self) -> None:
        self.async_write_ha_state()


class HomeRosterEventsTodaySensor(_HomeRosterSensorBase):
    """Number of events today (optionally filtered to one person)."""

    _attr_icon = "mdi:calendar-today"
    _attr_native_unit_of_measurement = "Termine"

    def __init__(
        self, coordinator: HomeRosterCoordinator, entry: ConfigEntry, person: Person | None
    ) -> None:
        super().__init__(coordinator, entry, "events_today", "Termine heute", person)

    @property
    def native_value(self) -> int:
        return len(self.coordinator.get_today_events(self._person.id if self._person else None))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        occurrences = self.coordinator.get_today_events(self._person.id if self._person else None)
        return {"events": [_event_summary(occ) for occ in occurrences[:MAX_TODAY_ATTR_EVENTS]]}


class HomeRosterEventsTomorrowSensor(_HomeRosterSensorBase):
    """Number of events tomorrow (overall)."""

    _attr_icon = "mdi:calendar-arrow-right"
    _attr_native_unit_of_measurement = "Termine"

    def __init__(self, coordinator: HomeRosterCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "events_tomorrow", "Termine morgen", None)

    @property
    def native_value(self) -> int:
        start_local = dt_util.start_of_local_day() + dt.timedelta(days=1)
        end_local = start_local + dt.timedelta(days=1)
        occurrences = self.coordinator.get_events_in_range(
            dt_util.as_utc(start_local), dt_util.as_utc(end_local)
        )
        return len(occurrences)


class HomeRosterNextEventSensor(_HomeRosterSensorBase):
    """The next (or currently active) event, as a timestamp sensor."""

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:calendar-clock"

    def __init__(
        self, coordinator: HomeRosterCoordinator, entry: ConfigEntry, person: Person | None
    ) -> None:
        super().__init__(coordinator, entry, "next_event", "Nächster Termin", person)

    def _occurrence(self) -> EventOccurrence | None:
        return self.coordinator.get_next_event(self._person.id if self._person else None)

    @property
    def native_value(self):
        occ = self._occurrence()
        return occ.start if occ else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        occ = self._occurrence()
        if occ is None:
            return {}
        return _event_summary(occ)


class HomeRosterNextReminderSensor(_HomeRosterSensorBase):
    """The next upcoming (not-yet-fired) reminder, as a timestamp sensor.

    Deliberately distinct from HomeRosterNextEventSensor: the next *event*
    by start time is not necessarily the next *reminder* by due time - see
    ReminderOccurrence's docstring. Meant for dashboard display ("next
    reminder in ...", via HA's automatic relative-time rendering for
    timestamp sensors); see HomeRosterReminderDueSensor below for the
    automation-triggerable counterpart.
    """

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:bell-ring-outline"

    def __init__(
        self, coordinator: HomeRosterCoordinator, entry: ConfigEntry, person: Person | None
    ) -> None:
        super().__init__(coordinator, entry, "next_reminder", "Nächste Erinnerung", person)

    def _reminder(self) -> ReminderOccurrence | None:
        return self.coordinator.get_next_reminder(self._person.id if self._person else None)

    @property
    def native_value(self):
        reminder = self._reminder()
        return reminder.due_at if reminder else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        reminder = self._reminder()
        return _reminder_summary(self.coordinator, reminder) if reminder else {}

    async def async_added_to_hass(self) -> None:
        # In addition to the usual "something changed, re-read" listener,
        # also recompute whenever a reminder actually fires - that changes
        # which reminder is "next" even when nothing about the underlying
        # events themselves changed.
        await super().async_added_to_hass()
        self.async_on_remove(
            self.coordinator.async_add_reminder_listener(
                lambda occ, offset, due_at: self.async_write_ha_state()
            )
        )


class HomeRosterReminderDueSensor(_HomeRosterSensorBase):
    """Updates to a fresh, unique timestamp each time a reminder fires.

    This is the entity to build notification automations against: trigger
    on this entity's state changing (a plain State Trigger with no `to:`
    filter - the state is a new value every single time, by design, so it
    reliably fires once per reminder even if two become due in the same
    scheduler tick) and read the event/person details from its attributes.
    Unlike a binary_sensor toggled True/False, there's no "stuck on" or
    "missed the second one because it was already on" failure mode - every
    firing is its own distinct state.

    Holds its own last-fired state rather than deriving it from current
    coordinator data (there's nothing to "currently compute" here - it's
    inherently about the most recent past event, the firing itself).
    """

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:bell-ring"

    def __init__(
        self, coordinator: HomeRosterCoordinator, entry: ConfigEntry, person: Person | None
    ) -> None:
        super().__init__(coordinator, entry, "reminder_due", "Erinnerung fällig", person)
        self._last_fired: dt.datetime | None = None
        self._last_attrs: dict[str, Any] = {}

    @property
    def native_value(self):
        return self._last_fired

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return self._last_attrs

    @callback
    def _handle_reminder(
        self, occ: EventOccurrence, offset: int, due_at: dt.datetime
    ) -> None:
        if self._person is not None and self._person.id not in occ.event.person_ids:
            return
        self._last_fired = due_at
        self._last_attrs = _reminder_summary(
            self.coordinator, ReminderOccurrence(occ, offset, due_at)
        )
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        # Deliberately does NOT call super() / subscribe to the general
        # "something changed" listener: this entity only ever changes when a
        # reminder actually fires, never on an unrelated CRUD save.
        self.async_on_remove(self.coordinator.async_add_reminder_listener(self._handle_reminder))


class HomeRosterNextBirthdaySensor(_HomeRosterSensorBase):
    """Next upcoming event in the 'birthday' category, if that category exists."""

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:cake-variant"

    def __init__(self, coordinator: HomeRosterCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "next_birthday", "Nächster Geburtstag", None)

    def _occurrence(self) -> EventOccurrence | None:
        now = dt_util.utcnow()
        window_start = dt_util.as_utc(dt_util.start_of_local_day())
        window_end = now + dt.timedelta(days=400)
        occurrences = self.coordinator.get_events_in_range(
            window_start,
            window_end,
            category_ids=[BIRTHDAY_CATEGORY_ID],
            include_cancelled=False,
        )
        upcoming = [occ for occ in occurrences if occ.end > now]
        return upcoming[0] if upcoming else None

    @property
    def native_value(self):
        occ = self._occurrence()
        return occ.start if occ else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        occ = self._occurrence()
        return _event_summary(occ) if occ else {}


class _PersonSensorSync:
    """Adds/removes per-person sensors as people become active/inactive."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        coordinator: HomeRosterCoordinator,
        async_add_entities: AddEntitiesCallback,
    ) -> None:
        self.hass = hass
        self.entry = entry
        self.coordinator = coordinator
        self.async_add_entities = async_add_entities
        self.entities: dict[str, list[_HomeRosterSensorBase]] = {}

    @callback
    def sync(self) -> None:
        active_ids = {p.id for p in self.coordinator.get_people() if p.active}
        known_ids = set(self.entities)

        new_ids = active_ids - known_ids
        if new_ids:
            new_entities: list[_HomeRosterSensorBase] = []
            for person_id in new_ids:
                person = self.coordinator.get_person(person_id)
                if person is None:
                    continue
                created = [
                    HomeRosterEventsTodaySensor(self.coordinator, self.entry, person),
                    HomeRosterNextEventSensor(self.coordinator, self.entry, person),
                    HomeRosterNextReminderSensor(self.coordinator, self.entry, person),
                    HomeRosterReminderDueSensor(self.coordinator, self.entry, person),
                ]
                self.entities[person_id] = created
                new_entities.extend(created)
            if new_entities:
                self.async_add_entities(new_entities)

        removed_ids = known_ids - active_ids
        for person_id in removed_ids:
            for entity in self.entities.pop(person_id):
                self.hass.async_create_task(entity.async_remove(force_remove=True))


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    coordinator: HomeRosterCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    entities: list[_HomeRosterSensorBase] = [
        HomeRosterEventsTodaySensor(coordinator, entry, None),
        HomeRosterEventsTomorrowSensor(coordinator, entry),
        HomeRosterNextEventSensor(coordinator, entry, None),
        HomeRosterNextReminderSensor(coordinator, entry, None),
        HomeRosterReminderDueSensor(coordinator, entry, None),
        HomeRosterNextBirthdaySensor(coordinator, entry),
    ]
    per_person: dict[str, list[_HomeRosterSensorBase]] = {}
    for person in coordinator.get_people():
        if person.active:
            created = [
                HomeRosterEventsTodaySensor(coordinator, entry, person),
                HomeRosterNextEventSensor(coordinator, entry, person),
                HomeRosterNextReminderSensor(coordinator, entry, person),
                HomeRosterReminderDueSensor(coordinator, entry, person),
            ]
            per_person[person.id] = created
            entities.extend(created)

    async_add_entities(entities)

    sync = _PersonSensorSync(hass, entry, coordinator, async_add_entities)
    sync.entities = per_person
    entry.async_on_unload(coordinator.async_add_listener(sync.sync))
