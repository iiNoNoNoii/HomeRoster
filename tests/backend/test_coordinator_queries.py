"""Coordinator query tests: ranged queries, today/next-event, recurrence
expansion end-to-end, and DST-safe all-day handling."""

from __future__ import annotations

import datetime as dt

import pytest
from freezegun import freeze_time
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


class TestRangedQueries:
    async def test_event_fully_before_range_is_excluded(self, coordinator):
        await coordinator.async_create_event(
            {
                "title": "Vorher",
                "start": "2026-09-19T10:00:00+02:00",
                "end": "2026-09-19T11:00:00+02:00",
            }
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 21, tzinfo=UTC)
        )
        assert occurrences == []

    async def test_event_fully_after_range_is_excluded(self, coordinator):
        await coordinator.async_create_event(
            {
                "title": "Nachher",
                "start": "2026-09-22T10:00:00+02:00",
                "end": "2026-09-22T11:00:00+02:00",
            }
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 20, tzinfo=UTC), dt.datetime(2026, 9, 21, tzinfo=UTC)
        )
        assert occurrences == []

    async def test_event_spanning_range_boundary_is_included(self, coordinator):
        await coordinator.async_create_event(
            {
                "title": "Übernacht",
                "start": "2026-09-19T23:00:00+02:00",
                "end": "2026-09-20T01:00:00+02:00",
            }
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 19, 22, 0, tzinfo=UTC),
            dt.datetime(2026, 9, 19, 23, 30, tzinfo=UTC),
        )
        assert len(occurrences) == 1

    async def test_multi_day_all_day_event_appears_on_every_covered_day(self, coordinator):
        await coordinator.async_create_event(
            {"title": "Urlaub", "start": "2026-09-20", "end": "2026-09-23", "all_day": True}
        )
        for day in (20, 21, 22):
            occurrences = coordinator.get_events_in_range(
                dt.datetime(2026, 9, day, tzinfo=UTC), dt.datetime(2026, 9, day + 1, tzinfo=UTC)
            )
            assert len(occurrences) == 1, f"expected the vacation event on day {day}"
        # Exclusive end: day 23 itself is not part of the event.
        occurrences_23 = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 23, tzinfo=UTC), dt.datetime(2026, 9, 24, tzinfo=UTC)
        )
        assert occurrences_23 == []

    async def test_category_and_status_filters(self, coordinator):
        cat = await coordinator.async_create_category({"name": "Sport", "color": "#00ff00"})
        await coordinator.async_create_event(
            {
                "title": "A",
                "start": "2026-09-20T10:00:00+02:00",
                "end": "2026-09-20T11:00:00+02:00",
                "category_id": cat.id,
                "status": "confirmed",
            }
        )
        await coordinator.async_create_event(
            {
                "title": "B",
                "start": "2026-09-20T12:00:00+02:00",
                "end": "2026-09-20T13:00:00+02:00",
                "status": "cancelled",
            }
        )
        by_category = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 20, tzinfo=UTC),
            dt.datetime(2026, 9, 21, tzinfo=UTC),
            category_ids=[cat.id],
        )
        assert len(by_category) == 1
        assert by_category[0].event.title == "A"

        without_cancelled = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 20, tzinfo=UTC),
            dt.datetime(2026, 9, 21, tzinfo=UTC),
            include_cancelled=False,
        )
        assert all(occ.event.status != "cancelled" for occ in without_cancelled)


class TestRecurrenceViaCoordinator:
    async def test_weekly_recurring_event_expands_into_range(self, coordinator):
        await coordinator.async_create_event(
            {
                "title": "Training",
                "start": "2026-09-07T18:00:00+02:00",
                "end": "2026-09-07T19:00:00+02:00",
                "rrule": "FREQ=WEEKLY",
            }
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 1, tzinfo=UTC), dt.datetime(2026, 10, 1, tzinfo=UTC)
        )
        assert len(occurrences) == 4  # Sep 7, 14, 21, 28

    async def test_cancelled_single_instance_is_skipped_but_series_remains(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "Training",
                "start": "2026-09-07T18:00:00+02:00",
                "end": "2026-09-07T19:00:00+02:00",
                "rrule": "FREQ=WEEKLY",
            }
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 1, tzinfo=UTC), dt.datetime(2026, 10, 1, tzinfo=UTC)
        )
        second_occurrence_start = sorted(occ.start for occ in occurrences)[1].isoformat()
        await coordinator.async_delete_event(
            event.id, mode="instance", occurrence_start=second_occurrence_start
        )

        occurrences_after = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 1, tzinfo=UTC), dt.datetime(2026, 10, 1, tzinfo=UTC)
        )
        assert len(occurrences_after) == 3


class TestTodayAndNextEvent:
    async def test_get_today_events_only_includes_today(self, coordinator):
        with freeze_time("2026-09-20T10:00:00+02:00"):
            await coordinator.async_create_event(
                {
                    "title": "Heute",
                    "start": "2026-09-20T14:00:00+02:00",
                    "end": "2026-09-20T15:00:00+02:00",
                }
            )
            await coordinator.async_create_event(
                {
                    "title": "Morgen",
                    "start": "2026-09-21T14:00:00+02:00",
                    "end": "2026-09-21T15:00:00+02:00",
                }
            )
            today = coordinator.get_today_events()
            assert [occ.event.title for occ in today] == ["Heute"]

    async def test_get_next_event_returns_soonest_upcoming(self, coordinator):
        with freeze_time("2026-09-20T10:00:00+02:00"):
            await coordinator.async_create_event(
                {
                    "title": "Später",
                    "start": "2026-09-20T18:00:00+02:00",
                    "end": "2026-09-20T19:00:00+02:00",
                }
            )
            await coordinator.async_create_event(
                {
                    "title": "Bald",
                    "start": "2026-09-20T12:00:00+02:00",
                    "end": "2026-09-20T13:00:00+02:00",
                }
            )
            next_occ = coordinator.get_next_event()
            assert next_occ.event.title == "Bald"

    async def test_get_next_event_returns_currently_running_event(self, coordinator):
        with freeze_time("2026-09-20T14:30:00+02:00"):
            await coordinator.async_create_event(
                {
                    "title": "Laeuft",
                    "start": "2026-09-20T14:00:00+02:00",
                    "end": "2026-09-20T15:00:00+02:00",
                }
            )
            next_occ = coordinator.get_next_event()
            assert next_occ.event.title == "Laeuft"

    async def test_get_next_event_excludes_cancelled(self, coordinator):
        with freeze_time("2026-09-20T10:00:00+02:00"):
            await coordinator.async_create_event(
                {
                    "title": "Abgesagt",
                    "start": "2026-09-20T12:00:00+02:00",
                    "end": "2026-09-20T13:00:00+02:00",
                    "status": "cancelled",
                }
            )
            await coordinator.async_create_event(
                {
                    "title": "Gültig",
                    "start": "2026-09-20T18:00:00+02:00",
                    "end": "2026-09-20T19:00:00+02:00",
                }
            )
            next_occ = coordinator.get_next_event()
            assert next_occ.event.title == "Gültig"

    async def test_get_next_event_filters_by_person(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        with freeze_time("2026-09-20T10:00:00+02:00"):
            await coordinator.async_create_event(
                {
                    "title": "Annas Termin",
                    "start": "2026-09-20T12:00:00+02:00",
                    "end": "2026-09-20T13:00:00+02:00",
                    "person_ids": [anna.id],
                }
            )
            await coordinator.async_create_event(
                {
                    "title": "Toms Termin",
                    "start": "2026-09-20T11:00:00+02:00",
                    "end": "2026-09-20T11:30:00+02:00",
                    "person_ids": [tom.id],
                }
            )
            next_for_anna = coordinator.get_next_event(anna.id)
            assert next_for_anna.event.title == "Annas Termin"
