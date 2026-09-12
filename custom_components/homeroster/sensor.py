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
from .coordinator import EventOccurrence, HomeRosterCoordinator
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
        HomeRosterNextBirthdaySensor(coordinator, entry),
    ]
    per_person: dict[str, list[_HomeRosterSensorBase]] = {}
    for person in coordinator.get_people():
        if person.active:
            created = [
                HomeRosterEventsTodaySensor(coordinator, entry, person),
                HomeRosterNextEventSensor(coordinator, entry, person),
            ]
            per_person[person.id] = created
            entities.extend(created)

    async_add_entities(entities)

    sync = _PersonSensorSync(hass, entry, coordinator, async_add_entities)
    sync.entities = per_person
    entry.async_on_unload(coordinator.async_add_listener(sync.sync))
