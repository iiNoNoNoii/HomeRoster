"""Sensor/binary_sensor state tests via a full config-entry setup."""

from __future__ import annotations

from freezegun import freeze_time
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster.const import DOMAIN


async def test_events_today_sensor_reflects_created_events(hass):
    with freeze_time("2026-09-20T09:00:00+02:00"):
        hass.config.set_time_zone("Europe/Berlin")
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

        state = hass.states.get("sensor.homeroster_events_today")
        assert state.state == "0"

        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            }
        )
        await hass.async_block_till_done()

        state = hass.states.get("sensor.homeroster_events_today")
        assert state.state == "1"
        assert state.attributes["events"][0]["title"] == "Zahnarzt"


async def test_next_event_sensor_is_unknown_when_nothing_scheduled(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    state = hass.states.get("sensor.homeroster_next_event")
    assert state.state == "unknown"


async def test_next_event_sensor_reports_timestamp_after_create(hass):
    with freeze_time("2026-09-20T09:00:00+02:00"):
        hass.config.set_time_zone("Europe/Berlin")
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            }
        )
        await hass.async_block_till_done()

        state = hass.states.get("sensor.homeroster_next_event")
        assert state.state != "unknown"
        assert state.attributes["title"] == "Zahnarzt"


async def test_per_person_sensors_are_created_and_removed_dynamically(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

    assert hass.states.get("sensor.homeroster_events_today_anna") is None

    anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
    await hass.async_block_till_done()
    assert hass.states.get("sensor.homeroster_events_today") is not None
    anna_state = hass.states.get("sensor.homeroster_events_today_anna")
    assert anna_state is not None
    assert anna_state.state == "0"

    await coordinator.async_delete_person(anna.id, "deactivate")
    await hass.async_block_till_done()
    assert hass.states.get("sensor.homeroster_events_today_anna") is None


async def test_binary_sensor_reflects_active_event(hass):
    with freeze_time("2026-09-20T14:30:00+02:00"):
        hass.config.set_time_zone("Europe/Berlin")
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

        assert hass.states.get("binary_sensor.homeroster_event_active").state == "off"

        await coordinator.async_create_event(
            {
                "title": "Laeuft",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            }
        )
        # The binary sensor only flips on the periodic tick, which runs the
        # start/end scan; call it directly rather than waiting real time.
        coordinator._check_start_end(dt_util.utcnow())  # noqa: SLF001
        await hass.async_block_till_done()

        assert hass.states.get("binary_sensor.homeroster_event_active").state == "on"
