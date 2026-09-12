"""Restart/persistence tests: data written by one coordinator instance must
be loaded correctly by a fresh coordinator instance (simulating a Home
Assistant restart) with no duplication and no loss."""

from __future__ import annotations

from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster.const import DOMAIN
from custom_components.homeroster.coordinator import HomeRosterCoordinator


async def test_events_people_and_categories_survive_a_simulated_restart(hass):
    hass.config.set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)

    coord1 = HomeRosterCoordinator(hass, entry)
    await coord1.async_load()
    anna = await coord1.async_create_person({"name": "Anna", "color": "#ff0000"})
    category = await coord1.async_create_category({"name": "Schule", "color": "#3f51b5"})
    event = await coord1.async_create_event(
        {
            "title": "Elternabend",
            "start": "2026-09-20T18:00:00+02:00",
            "end": "2026-09-20T19:30:00+02:00",
            "person_ids": [anna.id],
            "category_id": category.id,
            "reminders": [15, 60],
        }
    )
    # Force the pending delayed save to disk instead of waiting ~1s.
    await coord1.async_flush()
    await coord1.async_unload()

    # A brand new coordinator instance, as would be created on HA restart.
    coord2 = HomeRosterCoordinator(hass, entry)
    await coord2.async_load()

    assert [p.name for p in coord2.get_people()] == ["Anna"]
    restored_event = coord2.get_event(event.id)
    assert restored_event is not None
    assert restored_event.title == "Elternabend"
    assert restored_event.person_ids == [anna.id]
    assert restored_event.category_id == category.id
    assert restored_event.reminders == [15, 60]
    assert restored_event.version == 1

    await coord2.async_unload()


async def test_fired_reminders_are_persisted_to_avoid_double_firing(hass):
    hass.config.set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)

    coord1 = HomeRosterCoordinator(hass, entry)
    await coord1.async_load()
    coord1._fired_reminders["evt1:single:15"] = "2026-09-20T10:00:00+00:00"  # noqa: SLF001
    await coord1.async_flush()
    await coord1.async_unload()

    coord2 = HomeRosterCoordinator(hass, entry)
    await coord2.async_load()
    assert "evt1:single:15" in coord2._fired_reminders  # noqa: SLF001
    await coord2.async_unload()
