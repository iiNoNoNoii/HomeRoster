"""Tests for backup.py (BackupManager: create/list/restore/retention/path
safety) and its wiring as homeroster.create_backup / list_backups /
restore_backup services plus the options-flow "backup" settings step."""

from __future__ import annotations

import json

import pytest
from freezegun import freeze_time
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster.backup import BackupManager
from custom_components.homeroster.config_flow import HomeRosterOptionsFlow
from custom_components.homeroster.const import (
    CONF_BACKUP_ENABLED,
    CONF_BACKUP_INTERVAL_DAYS,
    CONF_BACKUP_RETENTION_COUNT,
    DOMAIN,
)
from custom_components.homeroster.coordinator import HomeRosterCoordinator
from custom_components.homeroster.models import ValidationError


@pytest.fixture
async def coordinator(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    coord = HomeRosterCoordinator(hass, entry)
    await coord.async_load()
    yield coord
    await coord.async_unload()


@pytest.fixture
def backup_manager(hass, coordinator, tmp_path):
    manager = BackupManager(hass, coordinator.entry, coordinator)
    # Isolate each test's files under pytest's own tmp_path rather than
    # hass.config.path(): the latter is not guaranteed fresh/empty per test
    # in this harness, which caused cross-test file leakage when first
    # tried (a "restore" test kept seeing another test's backup files).
    manager.directory = tmp_path / "homeroster_backups"
    return manager


class TestCreateListRestore:
    async def test_create_backup_writes_a_file_with_current_data(
        self, hass, coordinator, backup_manager
    ):
        await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        filename = await backup_manager.async_create_backup()

        path = backup_manager.directory / filename
        assert path.is_file()
        payload = json.loads(path.read_text(encoding="utf-8"))
        assert payload["people"][0]["name"] == "Anna"

    async def test_list_backups_returns_newest_first(self, hass, backup_manager):
        first = await backup_manager.async_create_backup()
        second = await backup_manager.async_create_backup()

        backups = await backup_manager.async_list_backups()
        filenames = [b["filename"] for b in backups]
        # Both were created in the same test, possibly the same second -
        # what matters is both are present and newest-first ordering never
        # puts an older file before an equal-or-newer one.
        assert set(filenames) >= {first, second}
        assert filenames.index(second) <= filenames.index(first)

    async def test_restore_backup_imports_the_saved_data(self, hass, coordinator, backup_manager):
        await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})
        filename = await backup_manager.async_create_backup()

        # Simulate disaster recovery: wipe in-memory state, then restore.
        anna = coordinator.get_people()[0]
        await coordinator.async_delete_person(anna.id, "deactivate")
        assert coordinator.get_person(anna.id).active is False

        result = await backup_manager.async_restore_backup(filename)
        assert result["people_imported"] == 1
        assert coordinator.get_person(anna.id).active is True

    async def test_restore_unknown_filename_raises(self, hass, backup_manager):
        with pytest.raises(ValidationError):
            await backup_manager.async_restore_backup("does-not-exist.json")

    async def test_restore_rejects_path_traversal(self, hass, backup_manager):
        with pytest.raises(ValidationError):
            await backup_manager.async_restore_backup("../../etc/passwd")
        with pytest.raises(ValidationError):
            await backup_manager.async_restore_backup("..\\..\\windows\\win.ini")

    async def test_restore_a_foreign_export_file(self, hass, coordinator, backup_manager):
        """A backup doesn't have to be one this instance created itself -
        any compatible export_json()-shaped file placed in the backups
        directory works the same way (see README)."""
        backup_manager.directory.mkdir(parents=True, exist_ok=True)
        foreign_payload = {
            "schema_version": 1,
            "people": [{"id": "p1", "name": "Fremde Person", "color": "#123456"}],
            "categories": [],
            "events": [],
        }
        (backup_manager.directory / "friend-export.json").write_text(
            json.dumps(foreign_payload), encoding="utf-8"
        )

        result = await backup_manager.async_restore_backup("friend-export.json")
        assert result["people_imported"] == 1
        assert coordinator.get_person("p1").name == "Fremde Person"


async def _create_backups_at_distinct_times(backup_manager, count: int) -> None:
    # Each call uses a different frozen instant so the (second-resolution)
    # filename timestamp never collides between iterations.
    for i in range(count):
        with freeze_time(f"2026-09-20T10:00:{i:02d}+00:00"):
            await backup_manager.async_create_backup()


class TestRetention:
    async def test_retention_count_prunes_oldest_backups(self, hass, backup_manager, coordinator):
        coordinator.entry.options = {**coordinator.entry.options, CONF_BACKUP_RETENTION_COUNT: 2}
        await _create_backups_at_distinct_times(backup_manager, 4)
        remaining = await backup_manager.async_list_backups()
        assert len(remaining) == 2

    async def test_retention_zero_keeps_everything(self, hass, backup_manager, coordinator):
        coordinator.entry.options = {**coordinator.entry.options, CONF_BACKUP_RETENTION_COUNT: 0}
        await _create_backups_at_distinct_times(backup_manager, 4)
        remaining = await backup_manager.async_list_backups()
        assert len(remaining) == 4


class TestAutomaticSchedule:
    async def test_disabled_does_not_create_a_backup(self, hass, backup_manager, coordinator):
        coordinator.entry.options = {**coordinator.entry.options, CONF_BACKUP_ENABLED: False}
        await backup_manager._async_check_due(None)  # noqa: SLF001
        assert await backup_manager.async_list_backups() == []

    async def test_enabled_with_no_prior_backup_creates_one(
        self, hass, backup_manager, coordinator
    ):
        coordinator.entry.options = {**coordinator.entry.options, CONF_BACKUP_ENABLED: True}
        await backup_manager._async_check_due(None)  # noqa: SLF001
        assert len(await backup_manager.async_list_backups()) == 1

    async def test_does_not_create_a_second_backup_before_interval_elapses(
        self, hass, backup_manager, coordinator
    ):
        coordinator.entry.options = {
            **coordinator.entry.options,
            CONF_BACKUP_ENABLED: True,
            CONF_BACKUP_INTERVAL_DAYS: 7,
        }
        await backup_manager.async_create_backup()
        await backup_manager._async_check_due(None)  # noqa: SLF001
        assert len(await backup_manager.async_list_backups()) == 1


async def test_backup_services_are_registered_and_work_end_to_end(hass):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={"require_person": False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    await coordinator.async_create_person({"name": "Anna", "color": "#ff0000"})

    create_result = await hass.services.async_call(
        DOMAIN, "create_backup", {}, blocking=True, return_response=True
    )
    filename = create_result["filename"]

    list_result = await hass.services.async_call(
        DOMAIN, "list_backups", {}, blocking=True, return_response=True
    )
    assert any(b["filename"] == filename for b in list_result["backups"])

    restore_result = await hass.services.async_call(
        DOMAIN,
        "restore_backup",
        {"filename": filename, "conflict_strategy": "skip"},
        blocking=True,
        return_response=True,
    )
    assert restore_result["people_imported"] == 1


class TestOptionsFlowBackupStep:
    async def test_backup_step_defaults(self, hass):
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        flow = HomeRosterOptionsFlow()
        flow.hass = hass
        flow.config_entry = entry

        result = await flow.async_step_backup()
        defaults = {str(k): getattr(k, "default", None) for k in result["data_schema"].schema}
        assert defaults[CONF_BACKUP_ENABLED]() is True
        assert defaults[CONF_BACKUP_INTERVAL_DAYS]() == 1
        assert defaults[CONF_BACKUP_RETENTION_COUNT]() == 14

    async def test_backup_step_saves_options(self, hass):
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        flow = HomeRosterOptionsFlow()
        flow.hass = hass
        flow.config_entry = entry

        result = await flow.async_step_backup(
            {
                CONF_BACKUP_ENABLED: False,
                CONF_BACKUP_INTERVAL_DAYS: 3,
                CONF_BACKUP_RETENTION_COUNT: 5,
            }
        )
        assert result["type"] == "create_entry"
        assert result["data"][CONF_BACKUP_ENABLED] is False
        assert result["data"][CONF_BACKUP_INTERVAL_DAYS] == 3
        assert result["data"][CONF_BACKUP_RETENTION_COUNT] == 5

    async def test_backup_is_a_menu_option(self, hass):
        entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        flow = HomeRosterOptionsFlow()
        flow.hass = hass
        flow.config_entry = entry

        result = await flow.async_step_init()
        assert "backup" in result["menu_options"]
