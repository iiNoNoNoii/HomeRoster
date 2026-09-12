"""Coordinator CRUD tests: people, categories, events, overlap, multi-person,
concurrency/version conflicts, and require_person validation."""

from __future__ import annotations

import datetime as dt

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.family_planner.const import DOMAIN
from custom_components.family_planner.coordinator import FamilyPlannerCoordinator
from custom_components.family_planner.models import ConflictError, NotFoundError, ValidationError


@pytest.fixture
async def coordinator(hass):
    """A coordinator with require_person disabled, so tests unrelated to
    that specific option don't all need to create a person first. The
    require_person behaviour itself is covered by its own dedicated tests
    below, which construct a coordinator with the (enabled-by-default)
    option explicitly."""
    hass.config.set_time_zone("Europe/Berlin")
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    coord = FamilyPlannerCoordinator(hass, entry)
    await coord.async_load()
    yield coord
    await coord.async_unload()


class TestPeopleCrud:
    async def test_create_and_list_people(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        people = coordinator.get_people()
        assert [p.name for p in people] == ["Anna", "Tom"]
        assert anna.sort_order == 0
        assert tom.sort_order == 1

    async def test_update_person(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        updated = await coordinator.async_update_person(anna.id, {"name": "Anna B."})
        assert updated.name == "Anna B."
        assert updated.color == "#ff0000"

    async def test_update_unknown_person_raises_not_found(self, coordinator):
        with pytest.raises(NotFoundError):
            await coordinator.async_update_person("does-not-exist", {"name": "X"})

    async def test_reorder_people(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        await coordinator.async_reorder_people([tom.id, anna.id])
        assert [p.name for p in coordinator.get_people()] == ["Tom", "Anna"]

    async def test_delete_person_strategy_deactivate_keeps_event_assignment(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        event = await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            }
        )
        await coordinator.async_delete_person(anna.id, "deactivate")
        assert coordinator.get_person(anna.id).active is False
        assert coordinator.get_event(event.id).person_ids == [anna.id]

    async def test_delete_person_strategy_remove_from_events_keeps_event(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        event = await coordinator.async_create_event(
            {
                "title": "Ausflug",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id, tom.id],
            }
        )
        await coordinator.async_delete_person(anna.id, "remove_from_events")
        assert coordinator.get_person(anna.id) is None
        assert coordinator.get_event(event.id).person_ids == [tom.id]

    async def test_delete_person_strategy_remove_from_events_can_leave_event_unassigned(
        self, coordinator
    ):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        event = await coordinator.async_create_event(
            {
                "title": "Solo-Termin",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            }
        )
        await coordinator.async_delete_person(anna.id, "keep_unassigned")
        # The event itself must never be silently deleted.
        assert coordinator.get_event(event.id) is not None
        assert coordinator.get_event(event.id).person_ids == []

    async def test_delete_person_strategy_reassign(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        event = await coordinator.async_create_event(
            {
                "title": "Termin",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            }
        )
        await coordinator.async_delete_person(anna.id, "reassign", reassign_to=tom.id)
        assert coordinator.get_event(event.id).person_ids == [tom.id]

    async def test_delete_person_reassign_without_target_raises(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        with pytest.raises(ValidationError):
            await coordinator.async_delete_person(anna.id, "reassign")

    async def test_delete_person_reassign_deduplicates_person_ids(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        event = await coordinator.async_create_event(
            {
                "title": "Termin",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id, tom.id],
            }
        )
        await coordinator.async_delete_person(anna.id, "reassign", reassign_to=tom.id)
        # Tom was already assigned; reassigning Anna's slot to Tom must not
        # produce a duplicate entry.
        assert coordinator.get_event(event.id).person_ids == [tom.id]


class TestCategoryCrud:
    async def test_create_update_delete_category(self, coordinator):
        cat = await coordinator.async_create_category({"name": "Sport", "color": "#00ff00"})
        updated = await coordinator.async_update_category(cat.id, {"name": "Fitness"})
        assert updated.name == "Fitness"
        await coordinator.async_delete_category(cat.id)
        assert coordinator.get_category(cat.id) is None

    async def test_delete_category_clears_reference_without_deleting_event(self, coordinator):
        cat = await coordinator.async_create_category({"name": "Sport", "color": "#00ff00"})
        event = await coordinator.async_create_event(
            {
                "title": "Training",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "category_id": cat.id,
            },
        )
        await coordinator.async_delete_category(cat.id)
        assert coordinator.get_event(event.id) is not None
        assert coordinator.get_event(event.id).category_id is None


class TestEventCrud:
    async def test_create_event_minimal(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "Zahnarzt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            }
        )
        assert event.title == "Zahnarzt"
        assert event.version == 1
        assert coordinator.get_event(event.id) is not None

    async def test_create_event_with_unknown_person_rejected(self, coordinator):
        with pytest.raises(ValidationError):
            await coordinator.async_create_event(
                {
                    "title": "X",
                    "start": "2026-09-20T14:00:00+02:00",
                    "end": "2026-09-20T15:00:00+02:00",
                    "person_ids": ["unknown"],
                }
            )

    async def test_create_event_with_unknown_category_rejected(self, coordinator):
        with pytest.raises(ValidationError):
            await coordinator.async_create_event(
                {
                    "title": "X",
                    "start": "2026-09-20T14:00:00+02:00",
                    "end": "2026-09-20T15:00:00+02:00",
                    "category_id": "unknown",
                }
            )

    async def test_require_person_option_enforced_by_default(self, hass):
        entry = MockConfigEntry(
            domain=DOMAIN, data={}, options={}
        )  # require_person defaults to True
        entry.add_to_hass(hass)
        coord = FamilyPlannerCoordinator(hass, entry)
        await coord.async_load()
        with pytest.raises(ValidationError):
            await coord.async_create_event(
                {
                    "title": "X",
                    "start": "2026-09-20T14:00:00+02:00",
                    "end": "2026-09-20T15:00:00+02:00",
                }
            )
        await coord.async_unload()

    async def test_require_person_option_can_be_disabled(self, hass):
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
        entry.add_to_hass(hass)
        coord = FamilyPlannerCoordinator(hass, entry)
        await coord.async_load()
        event = await coord.async_create_event(
            {"title": "X", "start": "2026-09-20T14:00:00+02:00", "end": "2026-09-20T15:00:00+02:00"}
        )
        assert event.person_ids == []
        await coord.async_unload()

    async def test_multiple_people_on_one_event_share_a_single_record(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        tom = await coordinator.async_create_person({"name": "Tom", "color": "#00ff00"})
        event = await coordinator.async_create_event(
            {
                "title": "Familienausflug",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T16:00:00+02:00",
                "person_ids": [anna.id, tom.id],
            }
        )
        # Exactly one stored event references both people - not two copies.
        assert len(coordinator._events) == 1  # noqa: SLF001
        assert set(coordinator.get_event(event.id).person_ids) == {anna.id, tom.id}

    async def test_update_event_partial_fields_only(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        event = await coordinator.async_create_event(
            {
                "title": "Alt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            }
        )
        updated = await coordinator.async_update_event(event.id, {"title": "Neu"})
        assert updated.title == "Neu"
        assert updated.person_ids == [anna.id]  # untouched
        assert updated.version == 2

    async def test_update_event_optimistic_concurrency_conflict(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        event = await coordinator.async_create_event(
            {
                "title": "Alt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            }
        )
        # Device A loads version 1 and saves...
        await coordinator.async_update_event(event.id, {"title": "Von Gerät A"}, expected_version=1)
        # ...device B still thinks it's version 1 - must be rejected, not silently overwritten.
        with pytest.raises(ConflictError) as exc_info:
            await coordinator.async_update_event(
                event.id, {"title": "Von Gerät B"}, expected_version=1
            )
        assert exc_info.value.current["title"] == "Von Gerät A"
        assert coordinator.get_event(event.id).title == "Von Gerät A"

    async def test_update_event_without_expected_version_always_succeeds(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "Alt",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            },
        )
        await coordinator.async_update_event(event.id, {"title": "A"})
        # No expected_version passed -> last-write-wins is allowed.
        result = await coordinator.async_update_event(event.id, {"title": "B"})
        assert result.title == "B"

    async def test_delete_event_series(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "X",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            },
        )
        await coordinator.async_delete_event(event.id)
        assert coordinator.get_event(event.id) is None

    async def test_delete_single_instance_adds_exdate_without_deleting_series(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "Wöchentlich",
                "start": "2026-09-07T14:00:00+02:00",
                "end": "2026-09-07T15:00:00+02:00",
                "rrule": "FREQ=WEEKLY",
            },
        )
        occurrence_start = "2026-09-14T12:00:00+00:00"
        await coordinator.async_delete_event(
            event.id, mode="instance", occurrence_start=occurrence_start
        )
        stored = coordinator.get_event(event.id)
        assert stored is not None
        assert occurrence_start in stored.exdates

    async def test_duplicate_event_creates_independent_copy(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        original = await coordinator.async_create_event(
            {
                "title": "Original",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            },
        )
        copy = await coordinator.async_duplicate_event(original.id)
        assert copy.id != original.id
        assert copy.title == original.title
        await coordinator.async_update_event(copy.id, {"title": "Geändert"})
        assert coordinator.get_event(original.id).title == "Original"

    async def test_set_event_status(self, coordinator):
        event = await coordinator.async_create_event(
            {
                "title": "X",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
            },
        )
        updated = await coordinator.async_set_event_status(event.id, "done")
        assert updated.status == "done"


class TestOverlappingEvents:
    async def test_overlapping_events_are_both_stored_and_both_returned(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        e1 = await coordinator.async_create_event(
            {
                "title": "A",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            },
        )
        e2 = await coordinator.async_create_event(
            {
                "title": "B",
                "start": "2026-09-20T14:30:00+02:00",
                "end": "2026-09-20T15:30:00+02:00",
                "person_ids": [anna.id],
            },
        )
        occurrences = coordinator.get_events_in_range(
            dt.datetime(2026, 9, 20, tzinfo=dt.timezone.utc),
            dt.datetime(2026, 9, 21, tzinfo=dt.timezone.utc),
        )
        ids = {occ.event.id for occ in occurrences}
        assert ids == {e1.id, e2.id}

    async def test_overlap_for_the_same_person_is_allowed_and_not_merged(self, coordinator):
        anna = await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        e1 = await coordinator.async_create_event(
            {
                "title": "A",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            },
        )
        e2 = await coordinator.async_create_event(
            {
                "title": "B",
                "start": "2026-09-20T14:00:00+02:00",
                "end": "2026-09-20T15:00:00+02:00",
                "person_ids": [anna.id],
            },
        )
        assert e1.id != e2.id
        assert coordinator.get_event(e1.id) is not None
        assert coordinator.get_event(e2.id) is not None
