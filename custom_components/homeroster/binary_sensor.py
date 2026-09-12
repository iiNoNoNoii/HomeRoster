"""Binary sensors indicating whether an event is currently active."""

from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import BinarySensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .compat import DeviceInfo
from .const import DOMAIN
from .coordinator import HomeRosterCoordinator
from .models import Person

MAX_ACTIVE_ATTR_EVENTS = 25


def _device_info(entry: ConfigEntry) -> DeviceInfo:
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name="HomeRoster",
        manufacturer="HomeRoster (lokal, ohne Cloud)",
        model="Family Calendar",
    )


class HomeRosterActiveEventBinarySensor(BinarySensorEntity):
    """On while at least one event (optionally for one person) is currently running."""

    _attr_should_poll = False
    _attr_icon = "mdi:calendar-check"

    def __init__(
        self, coordinator: HomeRosterCoordinator, entry: ConfigEntry, person: Person | None
    ) -> None:
        self.coordinator = coordinator
        self._entry = entry
        self._person = person
        id_suffix = "" if person is None else f"_{person.id}"
        self._attr_unique_id = f"{entry.entry_id}_event_active{id_suffix}"
        self._attr_name = "Termin aktiv" if person is None else f"Termin aktiv {person.name}"
        self._attr_device_info = _device_info(entry)
        # Explicit, locale-independent entity_id (see calendar.py for why).
        slug_suffix = "" if person is None else f"_{person.slug()}"
        self.entity_id = f"binary_sensor.homeroster_event_active{slug_suffix}"

    @property
    def is_on(self) -> bool:
        return (
            len(self.coordinator.get_active_events(self._person.id if self._person else None)) > 0
        )

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        occurrences = self.coordinator.get_active_events(self._person.id if self._person else None)
        return {
            "events": [
                {
                    "id": occ.event.id,
                    "title": occ.event.title,
                    "start": occ.start.isoformat(),
                    "end": occ.end.isoformat(),
                    "person_ids": list(occ.event.person_ids),
                }
                for occ in occurrences[:MAX_ACTIVE_ATTR_EVENTS]
            ]
        }

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self.coordinator.async_add_listener(self._handle_coordinator_update))

    @callback
    def _handle_coordinator_update(self) -> None:
        self.async_write_ha_state()


class _PersonBinarySensorSync:
    """Adds/removes per-person active-event binary sensors as people change."""

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
        self.entities: dict[str, HomeRosterActiveEventBinarySensor] = {}

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
                entity = HomeRosterActiveEventBinarySensor(self.coordinator, self.entry, person)
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
    coordinator: HomeRosterCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    entities: list[HomeRosterActiveEventBinarySensor] = [
        HomeRosterActiveEventBinarySensor(coordinator, entry, None)
    ]
    per_person: dict[str, HomeRosterActiveEventBinarySensor] = {}
    for person in coordinator.get_people():
        if person.active:
            entity = HomeRosterActiveEventBinarySensor(coordinator, entry, person)
            per_person[person.id] = entity
            entities.append(entity)

    async_add_entities(entities)

    sync = _PersonBinarySensorSync(hass, entry, coordinator, async_add_entities)
    sync.entities = per_person
    entry.async_on_unload(coordinator.async_add_listener(sync.sync))
