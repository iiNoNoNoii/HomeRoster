"""Tests for storage.py: default seeding and schema migration."""

from __future__ import annotations

import pytest

from custom_components.homeroster.const import STORAGE_VERSION_MAJOR, STORAGE_VERSION_MINOR
from custom_components.homeroster.storage import create_store, empty_data


def test_empty_data_seeds_default_categories():
    data = empty_data()
    assert data["people"] == []
    assert data["events"] == []
    assert data["fired_reminders"] == {}
    assert len(data["categories"]) == 8
    assert all(c["active"] for c in data["categories"])


async def test_store_round_trip(hass):
    store = create_store(hass, "test_entry")
    payload = empty_data()
    payload["people"] = [
        {"id": "p1", "name": "Anna", "color": "#ff0000", "active": True, "sort_order": 0}
    ]
    await store.async_save(payload)

    reloaded = create_store(hass, "test_entry")
    loaded = await reloaded.async_load()
    assert loaded["people"][0]["name"] == "Anna"


async def test_migration_fills_missing_keys_from_older_minor_version(hass, hass_storage):
    # Simulate an on-disk file written by an older minor schema version that
    # predates a key later versions rely on - this must trigger
    # HomeRosterStore._async_migrate_func, not just get() defaults.
    key = "homeroster_test_entry_migrate"
    hass_storage[key] = {
        "version": STORAGE_VERSION_MAJOR,
        "minor_version": 0,
        "key": key,
        "data": {
            "people": [],
            "categories": [],
            "events": [
                {
                    "id": "e1",
                    "title": "Alt-Termin",
                    "start": "2020-01-01T00:00:00+00:00",
                    "end": "2020-01-01T01:00:00+00:00",
                }
            ],
            # "fired_reminders" intentionally omitted, as an older schema would.
        },
    }

    store = create_store(hass, "test_entry_migrate")
    loaded = await store.async_load()
    assert loaded["fired_reminders"] == {}
    assert loaded["events"][0]["id"] == "e1"


async def test_migration_rejects_data_from_a_newer_major_version(hass, hass_storage):
    key = "homeroster_test_entry_future"
    hass_storage[key] = {
        "version": STORAGE_VERSION_MAJOR + 1,
        "minor_version": 0,
        "key": key,
        "data": {"people": [], "categories": [], "events": [], "fired_reminders": {}},
    }
    store = create_store(hass, "test_entry_future")
    with pytest.raises(ValueError):
        await store.async_load()


def test_storage_version_constants_are_stable():
    # These constants become part of the on-disk schema contract; bumping
    # STORAGE_VERSION_MAJOR without a corresponding _async_migrate_func
    # branch would silently discard old data, so pin the current values.
    assert STORAGE_VERSION_MAJOR == 1
    assert STORAGE_VERSION_MINOR == 1
