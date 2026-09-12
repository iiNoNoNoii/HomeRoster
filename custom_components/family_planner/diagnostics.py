"""Diagnostics support - counts and metadata only, never event content.

No event titles, descriptions, locations, or person/category names are ever
included: only counts, the earliest/latest event date, and feature flags.
"""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import __version__ as HA_VERSION
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .coordinator import FamilyPlannerCoordinator


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    coordinator: FamilyPlannerCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    return {
        "home_assistant_version": HA_VERSION,
        "integration_version": "1.0.0",
        "config_entry_options": dict(entry.options),
        "summary": coordinator.diagnostics_summary(),
    }
