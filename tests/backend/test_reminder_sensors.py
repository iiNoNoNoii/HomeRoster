"""Tests for the "which reminder is next / just fired" machinery: the
coordinator's get_next_reminder() and async_add_reminder_listener(), plus
the HomeRosterNextReminderSensor / HomeRosterReminderDueSensor entities that
consume them (see sensor.py). Added so HA automations can notify on a
per-reminder basis (accounting for differing lead times per event) instead
of only via the integration's own built-in notify_service push."""

from __future__ import annotations

import datetime as dt

import pytest
from freezegun import freeze_time
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster.const import DOMAIN
from custom_components.homeroster.coordinator import HomeRosterCoordinator

UTC = dt.timezone.utc


@pytest.fixture
async def coordinator(hass):
    hass.config.set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    coord = HomeRosterCoordinator(hass, entry)
    await coord.async_load()
    yield coord
    await coord.async_unload()


class TestGetNextReminder:
    async def test_none_when_nothing_scheduled(self, coordinator):
        assert coordinator.get_next_reminder() is None

    async def test_none_when_events_exist_but_have_no_reminders(self, coordinator):
        await coordinator.async_create_event(
            {
                "title": "Ohne Erinnerung",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            }
        )
        assert coordinator.get_next_reminder() is None

    async def test_later_event_with_longer_lead_time_wins(self, coordinator):
        # Starts later (15:00) but its 60-min reminder is due at 14:00.
        later_long_lead = await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T15:00:00+02:00",
                "end": "2026-09-20T15:30:00+02:00",
                "reminders": [60],
            }
        )
        # Starts earlier (14:30) but its 5-min reminder is only due at 14:25.
        await coordinator.async_create_event(
            {
                "title": "Abholen",
                "start": "2026-09-20T14:30:00+02:00",
                "end": "2026-09-20T14:45:00+02:00",
                "reminders": [5],
            }
        )
        with freeze_time("2026-09-20T10:00:00+02:00"):
            reminder = coordinator.get_next_reminder()
        assert reminder is not None
        assert reminder.occurrence.event.id == later_long_lead.id
        assert reminder.offset == 60
        assert reminder.due_at == dt.datetime(2026, 9, 20, 12, 0, tzinfo=UTC)

    async def test_already_fired_reminder_is_skipped(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T15:00:00+02:00",
                "end": "2026-09-20T15:30:00+02:00",
                "reminders": [60, 120],
            }
        )
        with freeze_time("2026-09-20T13:30:00+02:00"):
            # 120-min-offset reminder is due at 13:00, so it fires now; the
            # 60-min one is due at 14:00, still in the future.
            await coordinator._check_reminders(dt_util.utcnow())  # noqa: SLF001
            reminder = coordinator.get_next_reminder()
        assert reminder is not None
        assert reminder.occurrence.event.id == event.id
        assert reminder.offset == 60

    async def test_respects_person_filter(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        await coordinator.async_create_event(
            {
                "title": "Annas Termin",
                "start": "2026-09-20T15:00:00+02:00",
                "end": "2026-09-20T15:30:00+02:00",
                "reminders": [60],
                "person_ids": [anna.id],
            }
        )
        with freeze_time("2026-09-20T10:00:00+02:00"):
            assert coordinator.get_next_reminder(tom.id) is None
            reminder = coordinator.get_next_reminder(anna.id)
        assert reminder is not None
        assert reminder.occurrence.event.title == "Annas Termin"


async def test_reminder_listener_fires_with_correct_arguments(coordinator):
    calls = []
    coordinator.async_add_reminder_listener(
        lambda occ, offset, due_at: calls.append((occ.event.title, offset, due_at))
    )
    await coordinator.async_create_event(
        {
            "title": "Zahnarzt",
            "start": "2026-09-20T15:00:00+02:00",
            "end": "2026-09-20T15:30:00+02:00",
            "reminders": [60],
        }
    )
    with freeze_time("2026-09-20T14:00:05+02:00"):
        await coordinator._check_reminders(dt_util.utcnow())  # noqa: SLF001

    assert len(calls) == 1
    title, offset, _due_at = calls[0]
    assert title == "Zahnarzt"
    assert offset == 60


async def test_reminder_listener_unsubscribe_stops_further_calls(coordinator):
    calls = []
    unsub = coordinator.async_add_reminder_listener(lambda occ, offset, due_at: calls.append(1))
    unsub()
    await coordinator.async_create_event(
        {
            "title": "Zahnarzt",
            "start": "2026-09-20T15:00:00+02:00",
            "end": "2026-09-20T15:30:00+02:00",
            "reminders": [60],
        }
    )
    with freeze_time("2026-09-20T14:00:05+02:00"):
        await coordinator._check_reminders(dt_util.utcnow())  # noqa: SLF001
    assert calls == []


class TestSensors:
    async def test_next_reminder_sensor_unknown_when_nothing_scheduled(self, hass):
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        assert hass.states.get("sensor.homeroster_next_reminder").state == "unknown"
        assert hass.states.get("sensor.homeroster_reminder_due").state == "unknown"

    async def test_next_reminder_sensor_reports_soonest_due_reminder(self, hass):
        with freeze_time("2026-09-20T10:00:00+02:00"):
            hass.config.set_time_zone("Europe/Berlin")
            entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
            entry.add_to_hass(hass)
            assert await hass.config_entries.async_setup(entry.entry_id)
            await hass.async_block_till_done()
            coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

            await coordinator.async_create_event(
                {
                    "title": "Zahnarzt",
                    "start": "2026-09-20T15:00:00+02:00",
                    "end": "2026-09-20T15:30:00+02:00",
                    "reminders": [60],
                }
            )
            await hass.async_block_till_done()

            state = hass.states.get("sensor.homeroster_next_reminder")
            assert state.state != "unknown"
            assert state.attributes["title"] == "Zahnarzt"
            assert state.attributes["offset_minutes"] == 60

    async def test_reminder_due_sensor_updates_on_fire_and_only_for_assigned_person(self, hass):
        hass.config.set_time_zone("Europe/Berlin")
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]

        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        await hass.async_block_till_done()

        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T15:00:00+02:00",
                "end": "2026-09-20T15:30:00+02:00",
                "reminders": [60],
                "person_ids": [anna.id],
            }
        )
        await hass.async_block_till_done()

        assert hass.states.get("sensor.homeroster_reminder_due").state == "unknown"
        assert hass.states.get("sensor.homeroster_reminder_due_anna").state == "unknown"

        with freeze_time("2026-09-20T14:00:05+02:00"):
            await coordinator._check_reminders(dt_util.utcnow())  # noqa: SLF001
            await hass.async_block_till_done()

        overall_state = hass.states.get("sensor.homeroster_reminder_due")
        anna_state = hass.states.get("sensor.homeroster_reminder_due_anna")
        assert overall_state.state != "unknown"
        assert overall_state.attributes["title"] == "Zahnarzt"
        assert overall_state.attributes["person_names"] == ["Anna"]
        assert anna_state.state != "unknown"
