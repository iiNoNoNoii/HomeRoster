"""Small compatibility shims for HA APIs that moved between versions.

Every shim here targets the current, documented location for our declared
``min_ha_version`` (see manifest.json) as the primary import; the fallback
only exists so this integration's modules stay importable by tooling that
runs against an older core (e.g. an outdated pinned test harness) and is
never exercised on any Home Assistant version we actually support.
"""

from __future__ import annotations

try:
    from homeassistant.helpers.device_registry import DeviceInfo
except ImportError:  # pragma: no cover - unreachable on any HA >= min_ha_version
    from homeassistant.helpers.entity import DeviceInfo  # type: ignore[no-redef,assignment]

__all__ = ["DeviceInfo"]
