"""Persistent local storage for the Family Planner integration."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import (
    DEFAULT_CATEGORIES,
    STORAGE_KEY_PREFIX,
    STORAGE_VERSION_MAJOR,
    STORAGE_VERSION_MINOR,
)

_LOGGER = logging.getLogger(__name__)


def empty_data() -> dict[str, Any]:
    """Return a fresh, empty storage payload with the seeded default categories."""
    return {
        "people": [],
        "categories": [dict(category) for category in _default_categories()],
        "events": [],
        "fired_reminders": {},
    }


def _default_categories() -> list[dict[str, Any]]:
    categories = []
    for index, entry in enumerate(DEFAULT_CATEGORIES):
        categories.append(
            {
                "id": entry["id"],
                "name": entry["id"],
                "name_key": entry["name_key"],
                "color": entry["color"],
                "icon": entry["icon"],
                "active": True,
                "sort_order": index,
            }
        )
    return categories


class FamilyPlannerStore(Store[dict[str, Any]]):
    """Store subclass handling schema migrations for Family Planner data."""

    async def _async_migrate_func(
        self,
        old_major_version: int,
        old_minor_version: int,
        old_data: dict[str, Any],
    ) -> dict[str, Any]:
        """Migrate old storage data to the current schema version.

        Version history:
          1.0 / 1.1 - initial schema (people, categories, events, fired_reminders).
        Future schema changes must add a migration branch here and MUST NOT
        mutate `old_data` in place for versions they don't own.
        """
        data = dict(old_data)
        if old_major_version > STORAGE_VERSION_MAJOR:
            raise ValueError(
                "Die gespeicherten Family-Planner-Daten stammen von einer neueren "
                "Version der Integration und können nicht geladen werden."
            )
        data.setdefault("people", [])
        data.setdefault("categories", _default_categories())
        data.setdefault("events", [])
        data.setdefault("fired_reminders", {})
        return data


def create_store(hass: HomeAssistant, entry_id: str) -> FamilyPlannerStore:
    """Create the Store instance for a given config entry."""
    return FamilyPlannerStore(
        hass,
        STORAGE_VERSION_MAJOR,
        f"{STORAGE_KEY_PREFIX}_{entry_id}",
        minor_version=STORAGE_VERSION_MINOR,
        atomic_writes=True,
    )
