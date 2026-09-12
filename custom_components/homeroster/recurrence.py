"""RFC5545 RRULE validation and bounded expansion helpers.

Uses ``python-dateutil`` (already a transitive dependency of Home Assistant
core, declared explicitly in ``manifest.json`` for correctness) for parsing.
Only simple, non-open-ended-by-second/minute/hour frequencies are supported
in this phase; single-instance overrides (editing one occurrence of a
series) are intentionally out of scope for now, see README "Bekannte
Einschränkungen".
"""

from __future__ import annotations

import datetime as dt

from dateutil.rrule import rrulestr

from .const import MAX_RECURRENCE_EXPANSION_INSTANCES

ALLOWED_RRULE_FREQ = {"DAILY", "WEEKLY", "MONTHLY", "YEARLY"}


class RRuleValidationError(ValueError):
    """Raised when an RRULE string is malformed or uses an unsupported frequency."""


def validate_rrule(rrule_str: str, dtstart: dt.datetime) -> None:
    """Validate an RRULE string, raising RRuleValidationError if invalid."""
    freq: str | None = None
    for part in rrule_str.split(";"):
        if "=" not in part:
            raise RRuleValidationError(f"Ungültiger RRULE-Bestandteil: {part!r}")
        key, _, value = part.partition("=")
        if key.strip().upper() == "FREQ":
            freq = value.strip().upper()
    if freq not in ALLOWED_RRULE_FREQ:
        raise RRuleValidationError(
            f"Nicht unterstützte Wiederholungsfrequenz: {freq!r}. "
            f"Erlaubt: {', '.join(sorted(ALLOWED_RRULE_FREQ))}."
        )
    try:
        rrulestr(rrule_str, dtstart=dtstart)
    except (ValueError, TypeError) as err:
        raise RRuleValidationError(f"Ungültige Wiederholungsregel: {err}") from err


def expand_occurrences(
    rrule_str: str,
    dtstart: dt.datetime,
    duration: dt.timedelta,
    range_start: dt.datetime,
    range_end: dt.datetime,
) -> list[dt.datetime]:
    """Return occurrence start times overlapping [range_start, range_end).

    Bounded to MAX_RECURRENCE_EXPANSION_INSTANCES to guard against
    pathological rules; recurring events are never materialized beyond the
    requested query range.
    """
    rule = rrulestr(rrule_str, dtstart=dtstart)
    query_from = range_start - duration
    starts = rule.between(query_from, range_end, inc=True)
    if len(starts) > MAX_RECURRENCE_EXPANSION_INSTANCES:
        starts = starts[:MAX_RECURRENCE_EXPANSION_INSTANCES]
    return [dt_.replace(tzinfo=dtstart.tzinfo) if dt_.tzinfo is None else dt_ for dt_ in starts]
