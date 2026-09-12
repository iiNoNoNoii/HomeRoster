"""Smoke test: the integration sets up via a config entry end-to-end.

The `calendar` platform's entity behaviour (CRUD, get_events, ...) is
exercised in more depth in test_calendar_entity.py by constructing entities
directly against a coordinator, which is faster and does not require the
full HTTP/websocket stack.
"""

from __future__ import annotations

from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.family_planner.const import DOMAIN


async def test_setup_entry_creates_coordinator_and_entities(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entry.state.value == "loaded"
    assert DOMAIN in hass.data
    assert entry.entry_id in hass.data[DOMAIN]

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    assert coordinator.get_people() == []
    assert coordinator.get_categories()  # default categories seeded

    assert hass.states.get("sensor.family_planner_events_today") is not None
    assert hass.states.get("sensor.family_planner_events_tomorrow") is not None
    assert hass.states.get("sensor.family_planner_next_event") is not None
    assert hass.states.get("sensor.family_planner_next_birthday") is not None
    assert hass.states.get("binary_sensor.family_planner_event_active") is not None
    assert hass.states.get("calendar.family_planner") is not None

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.entry_id not in hass.data[DOMAIN]
