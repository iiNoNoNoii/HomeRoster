"""Data models for the Family Planner integration."""

from __future__ import annotations

import datetime as dt
import uuid
from dataclasses import dataclass, field
from typing import Any

from homeassistant.util import dt as dt_util
from homeassistant.util import slugify

from .const import EVENT_STATUSES, PERSON_ROLES
from .recurrence import RRuleValidationError, validate_rrule


class FamilyPlannerError(Exception):
    """Base error for Family Planner."""

    code = "unknown_error"


class ValidationError(FamilyPlannerError):
    """Raised when user-supplied data fails validation."""

    code = "invalid_data"


class NotFoundError(FamilyPlannerError):
    """Raised when a referenced object does not exist."""

    code = "not_found"


class ConflictError(FamilyPlannerError):
    """Raised when an optimistic-concurrency check fails."""

    code = "conflict"

    def __init__(self, message: str, current: dict[str, Any] | None = None) -> None:
        super().__init__(message)
        self.current = current


def new_id() -> str:
    """Return a new unique id."""
    return uuid.uuid4().hex


def utcnow_iso() -> str:
    """Return the current UTC time as an ISO 8601 string."""
    return dt_util.utcnow().isoformat()


def _parse_iso_datetime(value: str) -> dt.datetime:
    parsed = dt_util.parse_datetime(value)
    if parsed is None:
        raise ValidationError(f"Ungültiger Zeitstempel: {value}")
    if parsed.tzinfo is None:
        # Naive input is interpreted in the Home Assistant instance's
        # configured timezone (zoneinfo-based), not UTC.
        parsed = parsed.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE)
    return dt_util.as_utc(parsed)


def _parse_iso_date(value: str) -> dt.date:
    parsed = dt_util.parse_date(value)
    if parsed is None:
        raise ValidationError(f"Ungültiges Datum: {value}")
    return parsed


@dataclass(slots=True)
class Person:
    """A family member that events can be assigned to."""

    id: str
    name: str
    color: str
    icon: str | None = None
    linked_person_entity_id: str | None = None
    active: bool = True
    sort_order: int = 0
    role: str | None = None
    notify_service: str | None = None

    def validate(self) -> None:
        if not self.name or not self.name.strip():
            raise ValidationError("Der Name der Person darf nicht leer sein.")
        if self.role is not None and self.role not in PERSON_ROLES:
            raise ValidationError(f"Ungültige Rolle: {self.role}")
        if not self.color or not self.color.startswith("#"):
            raise ValidationError("Farbe muss ein Hex-Farbwert sein (#rrggbb).")

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "icon": self.icon,
            "linked_person_entity_id": self.linked_person_entity_id,
            "active": self.active,
            "sort_order": self.sort_order,
            "role": self.role,
            "notify_service": self.notify_service,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Person:
        return cls(
            id=data["id"],
            name=data["name"],
            color=data.get("color", "#3f51b5"),
            icon=data.get("icon"),
            linked_person_entity_id=data.get("linked_person_entity_id"),
            active=data.get("active", True),
            sort_order=data.get("sort_order", 0),
            role=data.get("role"),
            notify_service=data.get("notify_service"),
        )

    def slug(self) -> str:
        return slugify(self.name) or self.id[:8]


@dataclass(slots=True)
class Category:
    """A category used to classify events."""

    id: str
    name: str
    color: str
    icon: str | None = None
    active: bool = True
    sort_order: int = 0

    def validate(self) -> None:
        if not self.name or not self.name.strip():
            raise ValidationError("Der Name der Kategorie darf nicht leer sein.")
        if not self.color or not self.color.startswith("#"):
            raise ValidationError("Farbe muss ein Hex-Farbwert sein (#rrggbb).")

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "icon": self.icon,
            "active": self.active,
            "sort_order": self.sort_order,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Category:
        return cls(
            id=data["id"],
            name=data["name"],
            color=data.get("color", "#9e9e9e"),
            icon=data.get("icon"),
            active=data.get("active", True),
            sort_order=data.get("sort_order", 0),
        )


@dataclass(slots=True)
class Event:
    """A single calendar event (or the master of a recurring series)."""

    id: str
    title: str
    start: str
    end: str
    all_day: bool = False
    subtitle: str | None = None
    person_ids: list[str] = field(default_factory=list)
    description: str | None = None
    location: str | None = None
    category_id: str | None = None
    color: str | None = None
    icon: str | None = None
    status: str | None = None
    created_at: str = field(default_factory=utcnow_iso)
    updated_at: str = field(default_factory=utcnow_iso)
    created_by: str | None = None
    reminders: list[int] = field(default_factory=list)
    rrule: str | None = None
    exdates: list[str] = field(default_factory=list)
    version: int = 1

    def validate(self) -> None:
        if not self.title or not self.title.strip():
            raise ValidationError("Der Titel darf nicht leer sein.")
        if self.status is not None and self.status not in EVENT_STATUSES:
            raise ValidationError(f"Ungültiger Status: {self.status}")

        if self.all_day:
            start_date = _parse_iso_date(self.start)
            end_date = _parse_iso_date(self.end)
            if end_date <= start_date:
                raise ValidationError(
                    "Das Enddatum muss nach dem Startdatum liegen (Ende ist exklusiv)."
                )
        else:
            start_ts = _parse_iso_datetime(self.start)
            end_ts = _parse_iso_datetime(self.end)
            if end_ts <= start_ts:
                raise ValidationError(
                    "Die Endzeit darf nicht vor oder gleich der Startzeit liegen."
                )

        for offset in self.reminders:
            if not isinstance(offset, int) or offset < 0:
                raise ValidationError(
                    "Erinnerungs-Offsets müssen nicht-negative Minutenwerte sein."
                )

        if self.rrule:
            try:
                validate_rrule(self.rrule, self.start_utc())
            except RRuleValidationError as err:
                raise ValidationError(str(err)) from err

    def start_utc(self) -> dt.datetime:
        """Return the start as a timezone-aware UTC datetime (all-day -> local midnight)."""
        if self.all_day:
            date_value = _parse_iso_date(self.start)
            local_midnight = dt.datetime.combine(date_value, dt.time.min)
            return dt_util.as_utc(local_midnight.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE))
        return _parse_iso_datetime(self.start)

    def end_utc(self) -> dt.datetime:
        """Return the end as an aware UTC datetime (all-day -> local midnight, exclusive)."""
        if self.all_day:
            date_value = _parse_iso_date(self.end)
            local_midnight = dt.datetime.combine(date_value, dt.time.min)
            return dt_util.as_utc(local_midnight.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE))
        return _parse_iso_datetime(self.end)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "start": self.start,
            "end": self.end,
            "all_day": self.all_day,
            "person_ids": list(self.person_ids),
            "description": self.description,
            "location": self.location,
            "category_id": self.category_id,
            "color": self.color,
            "icon": self.icon,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "created_by": self.created_by,
            "reminders": list(self.reminders),
            "rrule": self.rrule,
            "exdates": list(self.exdates),
            "version": self.version,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Event:
        return cls(
            id=data["id"],
            title=data["title"],
            subtitle=data.get("subtitle"),
            start=data["start"],
            end=data["end"],
            all_day=data.get("all_day", False),
            person_ids=list(data.get("person_ids", [])),
            description=data.get("description"),
            location=data.get("location"),
            category_id=data.get("category_id"),
            color=data.get("color"),
            icon=data.get("icon"),
            status=data.get("status"),
            created_at=data.get("created_at", utcnow_iso()),
            updated_at=data.get("updated_at", utcnow_iso()),
            created_by=data.get("created_by"),
            reminders=list(data.get("reminders", [])),
            rrule=data.get("rrule"),
            exdates=list(data.get("exdates", [])),
            version=data.get("version", 1),
        )
