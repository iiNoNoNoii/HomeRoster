"""Calendar entity tests, constructed directly against a coordinator - faster
than a full hass.config_entries.async_setup() and enough to exercise the
entity logic (CRUD adapters, get_events, entity_id derivation)."""

from __future__ import annotations

import datetime as dt

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.family_planner.calendar import (
    FamilyPlannerCalendar,
    FamilyPlannerPersonCalendar,
)
from custom_components.family_planner.const import DOMAIN
from custom_components.family_planner.coordinator import FamilyPlannerCoordinator

UTC = dt.timezone.utc


@pytest.fixture
async def coordinator(hass):
    hass.config.set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    coord = FamilyPlannerCoordinator(hass, entry)
    await coord.async_load()
    yield coord
    await coord.async_unload()


async def test_main_calendar_entity_id_and_features(coordinator):
    entity = FamilyPlannerCalendar(coordinator, coordinator.entry, None)
    assert entity.entity_id == "calendar.family_planner"
    assert entity.supported_features.value & 1  # CREATE_EVENT bit set
    assert entity.person is None


async def test_person_calendar_entity_id_uses_slug(coordinator):
    anna = await coordinator.async_create_person({"name": "Anna Müller", "color": "#ff0000"})
    entity = FamilyPlannerPersonCalendar(coordinator, coordinator.entry, anna)
    assert entity.entity_id == "calendar.family_planner_anna_muller"


async def test_main_calendar_get_events_returns_events_in_range(coordinator):
    await coordinator.async_create_event(
        {
            "title": "Zahnarzt",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    entity = FamilyPlannerCalendar(coordinator, coordinator.entry, None)
    events = await entity.async_get_events(
        coordinator.hass, dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 21, tzinfo=UTC)
    )
    assert len(events) == 1
    assert events[0].summary == "Zahnarzt"


async def test_person_calendar_only_returns_that_persons_events(coordinator):
    anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
    tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
    await coordinator.async_create_event(
        {
            "title": "Annas Termin",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
            "person_ids": [anna.id],
        }
    )
    await coordinator.async_create_event(
        {
            "title": "Toms Termin",
            "start": "2026-09-20T16:00:00+02:00",
            "end": "2026-09-20T17:00:00+02:00",
            "person_ids": [tom.id],
        }
    )
    entity = FamilyPlannerPersonCalendar(coordinator, coordinator.entry, anna)
    events = await entity.async_get_events(
        coordinator.hass, dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 21, tzinfo=UTC)
    )
    assert [e.summary for e in events] == ["Annas Termin"]


async def test_event_shared_by_multiple_people_appears_in_both_person_calendars(coordinator):
    anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
    tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
    await coordinator.async_create_event(
        {
            "title": "Familienausflug",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T16:00:00+02:00",
            "person_ids": [anna.id, tom.id],
        }
    )
    for person in (anna, tom):
        entity = FamilyPlannerPersonCalendar(coordinator, coordinator.entry, person)
        events = await entity.async_get_events(
            coordinator.hass,
            dt.datetime(2026, 9, 20, tzinfo=UTC),
            dt.datetime(2026, 9, 21, tzinfo=UTC),
        )
        assert len(events) == 1
        assert events[0].summary == "Familienausflug"


async def test_all_day_calendar_event_uses_date_not_datetime(coordinator):
    await coordinator.async_create_event(
        {"title": "Ferien", "start": "2026-09-20", "end": "2026-09-22", "all_day": True}
    )
    entity = FamilyPlannerCalendar(coordinator, coordinator.entry, None)
    events = await entity.async_get_events(
        coordinator.hass, dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 23, tzinfo=UTC)
    )
    assert len(events) == 1
    assert isinstance(events[0].start, dt.date) and not isinstance(events[0].start, dt.datetime)


async def test_native_create_event_via_calendar_entity(coordinator):
    entity = FamilyPlannerCalendar(coordinator, coordinator.entry, None)
    await entity.async_create_event(
        summary="Meeting",
        start_date_time=dt.datetime(2026, 9, 20, 10, 0, tzinfo=UTC),
        end_date_time=dt.datetime(2026, 9, 20, 11, 0, tzinfo=UTC),
    )
    events = coordinator.get_events_in_range(
        dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 21, tzinfo=UTC)
    )
    assert len(events) == 1
    assert events[0].event.title == "Meeting"


async def test_native_delete_event_via_calendar_entity(coordinator):
    event = await coordinator.async_create_event(
        {"title": "X", "start": "2026-09-20T14:00:00+02:00", "end": "2026-09-20T15:00:00+02:00"}
    )
    entity = FamilyPlannerCalendar(coordinator, coordinator.entry, None)
    await entity.async_delete_event(event.id)
    assert coordinator.get_event(event.id) is None
