"""Tests for the Android/Companion-App push notification feature: the
coordinator's periodic reminder tick calling `notify.<person.notify_service>`
in addition to firing `family_planner_reminder_due`, gated by the
`send_mobile_notifications` option and each person's own opt-in."""

from __future__ import annotations

import datetime as dt

import pytest
from freezegun import freeze_time
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.family_planner.const import CONF_SEND_MOBILE_NOTIFICATIONS, DOMAIN
from custom_components.family_planner.coordinator import FamilyPlannerCoordinator

UTC = dt.timezone.utc


class _NotifyRecorder:
    """A plain async function (not a callable instance) recording every
    call's data - Home Assistant's service dispatcher only reliably detects
    a bound `__call__` on an instance as a coroutine function on some Python
    versions, silently falling back to sync dispatch otherwise and never
    awaiting it."""

    def __init__(self) -> None:
        self.calls: list[dict] = []

        async def _handler(call) -> None:
            self.calls.append(dict(call.data))

        self.handler = _handler


@pytest.fixture
async def make_coordinator(hass):
    """Factory fixture: builds a loaded coordinator with the given options
    and guarantees `async_unload()` runs (stopping its periodic timer) even
    if the test body fails an assertion."""
    hass.config.set_time_zone("Europe/Berlin")
    created: list[FamilyPlannerCoordinator] = []

    async def _make(**options) -> FamilyPlannerCoordinator:
        entry = MockConfigEntry(
            domain=DOMAIN, data={}, options={"require_person": False, **options}
        )
        entry.add_to_hass(hass)
        coord = FamilyPlannerCoordinator(hass, entry)
        await coord.async_load()
        created.append(coord)
        return coord

    yield _make

    for coord in created:
        await coord.async_unload()


async def test_reminder_notification_sent_to_person_with_notify_service(hass, make_coordinator):
    coordinator = await make_coordinator()
    recorder = _NotifyRecorder()
    hass.services.async_register("notify", "annas_phone", recorder.handler)

    anna = await coordinator.async_create_person(
        {"name": "Anna", "color": "#ff0000", "notify_service": "annas_phone"}
    )
    with freeze_time("2026-09-20T13:00:00+02:00"):
        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
                "reminders": [0],
            }
        )

    with freeze_time("2026-09-20T14:00:05+02:00"):
        await coordinator._async_tick(dt.datetime.now(tz=UTC))  # noqa: SLF001
        await hass.async_block_till_done()

    assert len(recorder.calls) == 1
    assert "Zahnarzt" in recorder.calls[0]["message"]
    assert recorder.calls[0]["title"] == "Zahnarzt"


async def test_no_notification_when_person_has_no_notify_service(hass, make_coordinator):
    coordinator = await make_coordinator()
    recorder = _NotifyRecorder()
    hass.services.async_register("notify", "annas_phone", recorder.handler)

    anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
    with freeze_time("2026-09-20T13:00:00+02:00"):
        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
                "reminders": [0],
            }
        )

    with freeze_time("2026-09-20T14:00:05+02:00"):
        await coordinator._async_tick(dt.datetime.now(tz=UTC))  # noqa: SLF001
        await hass.async_block_till_done()

    assert recorder.calls == []


async def test_no_notification_when_option_disabled(hass, make_coordinator):
    coordinator = await make_coordinator(**{CONF_SEND_MOBILE_NOTIFICATIONS: False})
    recorder = _NotifyRecorder()
    hass.services.async_register("notify", "annas_phone", recorder.handler)

    anna = await coordinator.async_create_person(
        {"name": "Anna", "color": "#ff0000", "notify_service": "annas_phone"}
    )
    with freeze_time("2026-09-20T13:00:00+02:00"):
        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
                "reminders": [0],
            }
        )

    with freeze_time("2026-09-20T14:00:05+02:00"):
        await coordinator._async_tick(dt.datetime.now(tz=UTC))  # noqa: SLF001
        await hass.async_block_till_done()

    assert recorder.calls == []


async def test_missing_notify_service_does_not_raise_or_block_other_people(hass, make_coordinator):
    coordinator = await make_coordinator()
    recorder = _NotifyRecorder()
    hass.services.async_register("notify", "toms_phone", recorder.handler)

    anna = await coordinator.async_create_person(
        {"name": "Anna", "color": "#ff0000", "notify_service": "does_not_exist"}
    )
    tom = await coordinator.async_create_person(
        {"name": "Tom", "color": "#00ff00", "notify_service": "toms_phone"}
    )
    with freeze_time("2026-09-20T13:00:00+02:00"):
        await coordinator.async_create_event(
            {
                "title": "Familientermin",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id, tom.id],
                "reminders": [0],
            }
        )

    with freeze_time("2026-09-20T14:00:05+02:00"):
        # Must not raise even though Anna's notify_service doesn't exist.
        await coordinator._async_tick(dt.datetime.now(tz=UTC))  # noqa: SLF001
        await hass.async_block_till_done()

    # Tom still gets notified despite Anna's target being invalid.
    assert len(recorder.calls) == 1
    assert recorder.calls[0]["title"] == "Familientermin"


async def test_missed_reminder_after_restart_does_not_send_late_notification(
    hass, make_coordinator
):
    """A reminder whose due time is far enough in the past when finally
    checked (e.g. Home Assistant was offline) still fires the bus event once
    but must not also trigger a stale push notification - see the "Missed
    reminder" row in README's reminders edge-case table."""
    coordinator = await make_coordinator()
    recorder = _NotifyRecorder()
    hass.services.async_register("notify", "annas_phone", recorder.handler)

    anna = await coordinator.async_create_person(
        {"name": "Anna", "color": "#ff0000", "notify_service": "annas_phone"}
    )
    with freeze_time("2026-09-20T10:00:00+02:00"):
        await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
                "reminders": [0],
            }
        )

    # Simulate Home Assistant only checking reminders again 2 hours after
    # the reminder was due (well past MISSED_REMINDER_GRACE).
    with freeze_time("2026-09-20T16:00:00+02:00"):
        await coordinator._async_tick(dt.datetime.now(tz=UTC))  # noqa: SLF001
        await hass.async_block_till_done()

    assert recorder.calls == []
