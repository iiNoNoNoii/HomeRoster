"""Unit tests for models.py: validation, DST-safe conversions, rrule checks."""

from __future__ import annotations

import datetime as dt

import pytest

from custom_components.family_planner.models import (
    Category,
    Event,
    Person,
    ValidationError,
    new_id,
)


def test_new_id_is_unique():
    assert new_id() != new_id()


class TestPersonValidation:
    def test_valid_person(self):
        Person(id=new_id(), name="Anna", color="#ff0000").validate()

    def test_empty_name_rejected(self):
        with pytest.raises(ValidationError):
            Person(id=new_id(), name="  ", color="#ff0000").validate()

    def test_invalid_color_rejected(self):
        with pytest.raises(ValidationError):
            Person(id=new_id(), name="Anna", color="red").validate()

    def test_invalid_role_rejected(self):
        with pytest.raises(ValidationError):
            Person(id=new_id(), name="Anna", color="#ff0000", role="grandparent").validate()

    def test_slug_is_stable_and_ascii_safe(self):
        person = Person(id=new_id(), name="Björn Müller", color="#ff0000")
        assert person.slug() == "bjorn_muller"

    def test_notify_service_defaults_to_none(self):
        person = Person(id=new_id(), name="Anna", color="#ff0000")
        assert person.notify_service is None

    def test_notify_service_round_trips_through_to_dict_from_dict(self):
        person = Person(
            id=new_id(), name="Anna", color="#ff0000", notify_service="mobile_app_pixel_7"
        )
        data = person.to_dict()
        assert data["notify_service"] == "mobile_app_pixel_7"
        restored = Person.from_dict(data)
        assert restored.notify_service == "mobile_app_pixel_7"
        assert restored == person

    def test_notify_service_defaults_to_none_when_absent_from_stored_data(self):
        # Backward compatibility: people stored before this field existed
        # must still load correctly.
        person = Person.from_dict({"id": new_id(), "name": "Anna", "color": "#ff0000"})
        assert person.notify_service is None


class TestCategoryValidation:
    def test_valid_category(self):
        Category(id=new_id(), name="Schule", color="#3f51b5").validate()

    def test_empty_name_rejected(self):
        with pytest.raises(ValidationError):
            Category(id=new_id(), name="", color="#3f51b5").validate()


class TestEventValidation:
    def test_valid_timed_event(self, hass):
        hass.config.set_time_zone("Europe/Berlin")
        Event(
            id=new_id(),
            title="Zahnarzt",
            start="2026-09-20T14:00:00+02:00",
            end="2026-09-20T15:00:00+02:00",
        ).validate()

    def test_empty_title_rejected(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="  ",
                start="2026-09-20T14:00:00+02:00",
                end="2026-09-20T15:00:00+02:00",
            ).validate()

    def test_end_before_start_rejected(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="X",
                start="2026-09-20T15:00:00+02:00",
                end="2026-09-20T14:00:00+02:00",
            ).validate()

    def test_end_equal_start_rejected_for_timed_event(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="X",
                start="2026-09-20T14:00:00+02:00",
                end="2026-09-20T14:00:00+02:00",
            ).validate()

    def test_all_day_end_must_be_strictly_after_start(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(), title="X", start="2026-09-20", end="2026-09-20", all_day=True
            ).validate()

    def test_all_day_single_day_event_is_one_day_exclusive_end(self):
        # A single-day all-day event spans [2026-09-20, 2026-09-21) - the
        # frontend shows this as "20.09." inclusive, converting on save.
        Event(id=new_id(), title="X", start="2026-09-20", end="2026-09-21", all_day=True).validate()

    def test_invalid_status_rejected(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="X",
                start="2026-09-20T14:00:00+02:00",
                end="2026-09-20T15:00:00+02:00",
                status="finished",
            ).validate()

    def test_negative_reminder_offset_rejected(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="X",
                start="2026-09-20T14:00:00+02:00",
                end="2026-09-20T15:00:00+02:00",
                reminders=[-5],
            ).validate()

    def test_invalid_rrule_frequency_rejected(self):
        with pytest.raises(ValidationError):
            Event(
                id=new_id(),
                title="X",
                start="2026-09-20T14:00:00+02:00",
                end="2026-09-20T15:00:00+02:00",
                rrule="FREQ=SECONDLY",
            ).validate()

    def test_valid_weekly_rrule_accepted(self):
        Event(
            id=new_id(),
            title="X",
            start="2026-09-20T14:00:00+02:00",
            end="2026-09-20T15:00:00+02:00",
            rrule="FREQ=WEEKLY;BYDAY=MO,WE",
        ).validate()

    def test_round_trip_to_dict_from_dict(self):
        event = Event(
            id=new_id(),
            title="Zahnarzt",
            start="2026-09-20T14:00:00+02:00",
            end="2026-09-20T15:00:00+02:00",
            person_ids=["a", "b"],
            reminders=[15, 60],
        )
        restored = Event.from_dict(event.to_dict())
        assert restored == event


class TestDstSafety:
    """Europe/Berlin: 2026-03-29 clocks spring forward (02:00 -> 03:00)."""

    def test_all_day_event_start_is_local_midnight_across_dst(self, hass):
        hass.config.set_time_zone("Europe/Berlin")
        event = Event(
            id=new_id(), title="Urlaub", start="2026-03-29", end="2026-03-31", all_day=True
        )
        start_utc = event.start_utc()
        # Local midnight on 2026-03-29 in Berlin is still UTC+1 (CET, before
        # the 02:00 switch), i.e. 2026-03-28T23:00:00Z.
        assert start_utc == dt.datetime(2026, 3, 28, 23, 0, tzinfo=dt.timezone.utc)

    def test_all_day_event_end_is_local_midnight_after_dst_switch(self, hass):
        hass.config.set_time_zone("Europe/Berlin")
        event = Event(
            id=new_id(), title="Urlaub", start="2026-03-29", end="2026-03-31", all_day=True
        )
        end_utc = event.end_utc()
        # Local midnight on 2026-03-31 in Berlin is now UTC+2 (CEST, after
        # the switch), i.e. 2026-03-30T22:00:00Z. A naive fixed-offset
        # implementation would get this wrong by an hour.
        assert end_utc == dt.datetime(2026, 3, 30, 22, 0, tzinfo=dt.timezone.utc)

    def test_timed_event_across_fall_back_transition(self, hass):
        hass.config.set_time_zone("Europe/Berlin")
        # 2026-10-25 03:00 CEST -> 02:00 CET (clocks fall back).
        event = Event(
            id=new_id(),
            title="Nachtschicht",
            start="2026-10-25T01:00:00+02:00",
            end="2026-10-25T02:00:00+01:00",
        )
        event.validate()
        duration = event.end_utc() - event.start_utc()
        assert duration == dt.timedelta(hours=2)
