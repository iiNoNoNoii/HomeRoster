"""Tests for recurrence.py: RRULE validation and bounded occurrence expansion."""

from __future__ import annotations

import datetime as dt

import pytest

from custom_components.homeroster.recurrence import (
    RRuleValidationError,
    expand_occurrences,
    validate_rrule,
)

UTC = dt.timezone.utc


class TestValidateRrule:
    def test_accepts_weekly(self):
        validate_rrule("FREQ=WEEKLY;BYDAY=MO,WE", dt.datetime(2026, 1, 1, tzinfo=UTC))

    def test_accepts_daily_with_count(self):
        validate_rrule("FREQ=DAILY;COUNT=10", dt.datetime(2026, 1, 1, tzinfo=UTC))

    def test_rejects_secondly(self):
        with pytest.raises(RRuleValidationError):
            validate_rrule("FREQ=SECONDLY", dt.datetime(2026, 1, 1, tzinfo=UTC))

    def test_rejects_minutely(self):
        with pytest.raises(RRuleValidationError):
            validate_rrule("FREQ=MINUTELY", dt.datetime(2026, 1, 1, tzinfo=UTC))

    def test_rejects_malformed_string(self):
        with pytest.raises(RRuleValidationError):
            validate_rrule("not a rule", dt.datetime(2026, 1, 1, tzinfo=UTC))

    def test_rejects_missing_freq(self):
        with pytest.raises(RRuleValidationError):
            validate_rrule("BYDAY=MO", dt.datetime(2026, 1, 1, tzinfo=UTC))


class TestExpandOccurrences:
    def test_daily_expansion_within_range(self):
        dtstart = dt.datetime(2026, 1, 1, 9, 0, tzinfo=UTC)
        duration = dt.timedelta(hours=1)
        starts = expand_occurrences(
            "FREQ=DAILY;COUNT=5",
            dtstart,
            duration,
            dt.datetime(2026, 1, 1, tzinfo=UTC),
            dt.datetime(2026, 1, 4, tzinfo=UTC),
        )
        assert [s.date() for s in starts] == [
            dt.date(2026, 1, 1),
            dt.date(2026, 1, 2),
            dt.date(2026, 1, 3),
        ]

    def test_never_expands_past_the_requested_range(self):
        dtstart = dt.datetime(2026, 1, 1, 9, 0, tzinfo=UTC)
        duration = dt.timedelta(hours=1)
        starts = expand_occurrences(
            "FREQ=DAILY",  # unbounded (no COUNT/UNTIL)
            dtstart,
            duration,
            dt.datetime(2026, 1, 1, tzinfo=UTC),
            dt.datetime(2026, 1, 8, tzinfo=UTC),
        )
        assert len(starts) == 7
        assert max(starts) < dt.datetime(2026, 1, 8, tzinfo=UTC)

    def test_weekly_byday_expansion(self):
        dtstart = dt.datetime(2026, 1, 5, 10, 0, tzinfo=UTC)  # a Monday
        duration = dt.timedelta(hours=1)
        starts = expand_occurrences(
            "FREQ=WEEKLY;BYDAY=MO,WE",
            dtstart,
            duration,
            dt.datetime(2026, 1, 1, tzinfo=UTC),
            dt.datetime(2026, 1, 15, tzinfo=UTC),
        )
        weekdays = sorted({s.weekday() for s in starts})
        assert weekdays == [0, 2]  # Monday, Wednesday

    def test_an_occurrence_starting_before_the_range_but_still_running_is_included(self):
        # A long event that starts before `range_start` but is still
        # ongoing when the range begins must still be returned.
        dtstart = dt.datetime(2026, 1, 1, 22, 0, tzinfo=UTC)
        duration = dt.timedelta(hours=4)  # ends 2026-01-02T02:00Z
        starts = expand_occurrences(
            "FREQ=DAILY;COUNT=2",
            dtstart,
            duration,
            dt.datetime(2026, 1, 2, 0, 30, tzinfo=UTC),
            dt.datetime(2026, 1, 2, 1, 0, tzinfo=UTC),
        )
        assert dtstart in starts
