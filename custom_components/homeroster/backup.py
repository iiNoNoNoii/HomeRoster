"""Local, plain-JSON backups of HomeRoster's data.

Deliberately flat, timestamped files under config/homeroster_backups/ (the
same schema as the existing export_json()/import_json()) rather than
anything tied to Home Assistant's own Backup integration or to this
integration's own Store: plain files on disk survive an accidental
integration removal, a failed update, or a corrupted .storage file - none
of which is true of data trapped inside .storage/ - and can be copied,
included in the user's own separate backup solution, or inspected by hand.
Restoring someone else's export works the same way as restoring your own:
copy their file into this folder, then call homeroster.restore_backup with
its filename.
"""

from __future__ import annotations

import datetime as dt
import json
import logging
from collections.abc import Callable
from pathlib import Path
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.util import dt as dt_util

from .const import (
    BACKUP_DIR_NAME,
    CONF_BACKUP_ENABLED,
    CONF_BACKUP_INTERVAL_DAYS,
    CONF_BACKUP_RETENTION_COUNT,
    DEFAULT_BACKUP_ENABLED,
    DEFAULT_BACKUP_INTERVAL_DAYS,
    DEFAULT_BACKUP_RETENTION_COUNT,
)
from .coordinator import HomeRosterCoordinator
from .models import ValidationError

_LOGGER = logging.getLogger(__name__)

# Zero-padded, so a plain lexicographic sort of filenames is also a
# chronological sort - no need to parse filenames or stat() every file just
# to find the oldest/newest one.
FILENAME_FORMAT = "homeroster-backup-%Y%m%d-%H%M%S.json"
# How often the "is an automatic backup due yet?" check runs. Deliberately
# much finer-grained than the configured interval itself (which is in whole
# days): this makes the interval option take effect within the hour after
# it's changed, and means a missed check (e.g. HA was off) is caught up
# within an hour of the next restart, without needing to persist/restore a
# precise "next run at" timestamp across restarts.
CHECK_INTERVAL = dt.timedelta(hours=1)


def _list_backup_files(directory: Path) -> list[dict[str, Any]]:
    """Blocking: list backup files with metadata, newest first."""
    if not directory.exists():
        return []
    files = sorted(directory.glob("homeroster-backup-*.json"))
    result = []
    for path in files:
        stat = path.stat()
        result.append(
            {
                "filename": path.name,
                "size_bytes": stat.st_size,
                "modified_at": dt.datetime.fromtimestamp(
                    stat.st_mtime, tz=dt.timezone.utc
                ).isoformat(),
            }
        )
    result.reverse()
    return result


def _write_backup_file(directory: Path, filename: str, payload: dict[str, Any]) -> None:
    """Blocking: create the backup directory (if needed) and write one file."""
    directory.mkdir(parents=True, exist_ok=True)
    (directory / filename).write_text(
        json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8"
    )


def _prune_backups(directory: Path, retention_count: int) -> list[str]:
    """Blocking: delete the oldest backups beyond retention_count.

    retention_count <= 0 means "keep every backup forever".
    """
    if retention_count <= 0:
        return []
    files = sorted(directory.glob("homeroster-backup-*.json")) if directory.exists() else []
    excess = files[: max(0, len(files) - retention_count)]
    removed = []
    for path in excess:
        path.unlink(missing_ok=True)
        removed.append(path.name)
    return removed


def _safe_backup_path(directory: Path, filename: str) -> Path:
    """Resolve filename to a path inside directory, or raise ValidationError.

    filename is user-supplied (a service call field) - rejecting any path
    separator outright (rather than trying to resolve/compare parents)
    makes it structurally impossible for this to ever escape the backups
    directory, regardless of platform path quirks.
    """
    if not filename or "/" in filename or "\\" in filename or filename in (".", ".."):
        raise ValidationError(f"Ungültiger Dateiname: {filename}")
    path = directory / filename
    if not path.is_file():
        raise ValidationError(f"Backup-Datei nicht gefunden: {filename}")
    return path


def _read_backup_file(directory: Path, filename: str) -> dict[str, Any]:
    """Blocking: read and parse one backup file."""
    path = _safe_backup_path(directory, filename)
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as err:
        raise ValidationError(f"Backup-Datei ist kein gültiges JSON: {err}") from err
    if not isinstance(data, dict):
        raise ValidationError("Backup-Datei hat ein ungültiges Format.")
    return data


class BackupManager:
    """Owns the automatic-backup schedule and the create/list/restore actions."""

    def __init__(
        self, hass: HomeAssistant, entry: ConfigEntry, coordinator: HomeRosterCoordinator
    ) -> None:
        self.hass = hass
        self.entry = entry
        self.coordinator = coordinator
        self.directory = Path(hass.config.path(BACKUP_DIR_NAME))
        self._unsub_timer: Callable[[], None] | None = None

    def async_start(self) -> None:
        self._unsub_timer = async_track_time_interval(
            self.hass, self._async_check_due, CHECK_INTERVAL
        )
        # Also check once shortly after startup rather than waiting a full
        # CHECK_INTERVAL, so a freshly-configured or freshly-restarted
        # instance doesn't wait up to an hour for its first automatic
        # backup once one is actually due.
        self.hass.async_create_task(self._async_check_due(dt_util.utcnow()))

    def async_stop(self) -> None:
        if self._unsub_timer is not None:
            self._unsub_timer()
            self._unsub_timer = None

    async def _async_check_due(self, _now: dt.datetime) -> None:
        if not self.entry.options.get(CONF_BACKUP_ENABLED, DEFAULT_BACKUP_ENABLED):
            return
        interval_days = self.entry.options.get(
            CONF_BACKUP_INTERVAL_DAYS, DEFAULT_BACKUP_INTERVAL_DAYS
        )
        files = await self.hass.async_add_executor_job(_list_backup_files, self.directory)
        if files:
            most_recent = dt_util.parse_datetime(files[0]["modified_at"])
            if most_recent and dt_util.utcnow() - most_recent < dt.timedelta(days=interval_days):
                return
        await self.async_create_backup()

    async def async_create_backup(self) -> str:
        """Write a new backup file and prune old ones per the retention
        setting. Returns the created file's name."""
        payload = self.coordinator.export_json()
        filename = dt_util.utcnow().strftime(FILENAME_FORMAT)
        await self.hass.async_add_executor_job(
            _write_backup_file, self.directory, filename, payload
        )
        retention_count = self.entry.options.get(
            CONF_BACKUP_RETENTION_COUNT, DEFAULT_BACKUP_RETENTION_COUNT
        )
        removed = await self.hass.async_add_executor_job(
            _prune_backups, self.directory, retention_count
        )
        if removed:
            _LOGGER.info(
                "HomeRoster: %s alte(s) Backup(s) gemäß Aufbewahrungseinstellung gelöscht.",
                len(removed),
            )
        _LOGGER.info("HomeRoster: Backup erstellt: %s", filename)
        return filename

    async def async_list_backups(self) -> list[dict[str, Any]]:
        return await self.hass.async_add_executor_job(_list_backup_files, self.directory)

    async def async_restore_backup(
        self, filename: str, conflict_strategy: str = "skip"
    ) -> dict[str, Any]:
        payload = await self.hass.async_add_executor_job(
            _read_backup_file, self.directory, filename
        )
        return await self.coordinator.async_import_json(payload, conflict_strategy)
