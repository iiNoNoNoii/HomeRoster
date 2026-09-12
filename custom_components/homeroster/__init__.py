"""The HomeRoster integration - a fully local family calendar."""

from __future__ import annotations

import hashlib
import logging
from pathlib import Path
from typing import Any

import voluptuous as vol
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.helpers import device_registry as dr

try:  # ServiceValidationError was added in HA 2024.1, well below our min_ha_version.
    from homeassistant.exceptions import ServiceValidationError
except ImportError:  # pragma: no cover - unreachable on any HA >= min_ha_version
    from homeassistant.exceptions import HomeAssistantError as ServiceValidationError
from homeassistant.util import dt as dt_util

from .const import (
    ATTR_ALL_DAY,
    ATTR_CATEGORY_ID,
    ATTR_COLOR,
    ATTR_DESCRIPTION,
    ATTR_END,
    ATTR_EVENT_ID,
    ATTR_ICON,
    ATTR_LOCATION,
    ATTR_PERSON_ID,
    ATTR_PERSON_IDS,
    ATTR_REMINDERS,
    ATTR_RRULE,
    ATTR_START,
    ATTR_STATUS,
    ATTR_SUBTITLE,
    ATTR_TITLE,
    DOMAIN,
    EVENT_STATUSES,
    PLATFORMS,
    SERVICE_CREATE_EVENT,
    SERVICE_DELETE_EVENT,
    SERVICE_DUPLICATE_EVENT,
    SERVICE_GET_EVENTS,
    SERVICE_GET_NEXT_EVENT,
    SERVICE_GET_TODAY_EVENTS,
    SERVICE_SET_EVENT_STATUS,
    SERVICE_UPDATE_EVENT,
)
from .coordinator import EventOccurrence, HomeRosterCoordinator
from .models import HomeRosterError
from .websocket_api import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)

WWW_PATH = Path(__file__).parent / "www"
CARD_JS_FILENAME = "homeroster-card.js"
CARD_URL_BASE = "/homeroster_static"

_EVENT_FIELDS_SCHEMA = {
    vol.Optional(ATTR_SUBTITLE): vol.Any(str, None),
    vol.Optional(ATTR_ALL_DAY): bool,
    vol.Optional(ATTR_PERSON_IDS): [str],
    vol.Optional(ATTR_DESCRIPTION): vol.Any(str, None),
    vol.Optional(ATTR_LOCATION): vol.Any(str, None),
    vol.Optional(ATTR_CATEGORY_ID): vol.Any(str, None),
    vol.Optional(ATTR_COLOR): vol.Any(str, None),
    vol.Optional(ATTR_ICON): vol.Any(str, None),
    vol.Optional(ATTR_STATUS): vol.In(EVENT_STATUSES),
    vol.Optional(ATTR_REMINDERS): [vol.All(int, vol.Range(min=0))],
    vol.Optional(ATTR_RRULE): vol.Any(str, None),
}

CREATE_EVENT_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_TITLE): str,
        vol.Required(ATTR_START): str,
        vol.Required(ATTR_END): str,
        **_EVENT_FIELDS_SCHEMA,
    }
)
UPDATE_EVENT_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_EVENT_ID): str,
        vol.Optional(ATTR_TITLE): str,
        vol.Optional(ATTR_START): str,
        vol.Optional(ATTR_END): str,
        vol.Optional("expected_version"): int,
        **_EVENT_FIELDS_SCHEMA,
    }
)
DELETE_EVENT_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_EVENT_ID): str,
        vol.Optional("mode", default="series"): vol.In(["series", "instance"]),
        vol.Optional("occurrence_start"): str,
    }
)
GET_EVENTS_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_START): str,
        vol.Required(ATTR_END): str,
        vol.Optional(ATTR_PERSON_IDS): [str],
    }
)
GET_TODAY_EVENTS_SCHEMA = vol.Schema({vol.Optional(ATTR_PERSON_ID): str})
GET_NEXT_EVENT_SCHEMA = vol.Schema({vol.Optional(ATTR_PERSON_ID): str})
DUPLICATE_EVENT_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_EVENT_ID): str,
        vol.Optional(ATTR_START): str,
        vol.Optional(ATTR_END): str,
    }
)
SET_STATUS_SCHEMA = vol.Schema(
    {vol.Required(ATTR_EVENT_ID): str, vol.Required(ATTR_STATUS): vol.In(EVENT_STATUSES)}
)


def _get_any_coordinator(hass: HomeAssistant) -> HomeRosterCoordinator:
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        raise ServiceValidationError("HomeRoster ist nicht geladen.")
    for entry_data in domain_data.values():
        return entry_data["coordinator"]
    raise ServiceValidationError("HomeRoster ist nicht geladen.")


def _occurrence_to_service_dict(occ: EventOccurrence) -> dict[str, Any]:
    data = occ.event.to_dict()
    data["occurrence_start"] = occ.start.isoformat()
    data["occurrence_end"] = occ.end.isoformat()
    data["recurrence_id"] = occ.recurrence_id
    return data


async def _async_setup_services(hass: HomeAssistant) -> None:
    if hass.data.get(f"{DOMAIN}_services_registered"):
        return

    async def handle_create_event(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        try:
            event = await coordinator.async_create_event(dict(call.data))
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err
        return {"event": event.to_dict()} if call.return_response else None

    async def handle_update_event(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        data = dict(call.data)
        event_id = data.pop(ATTR_EVENT_ID)
        expected_version = data.pop("expected_version", None)
        try:
            event = await coordinator.async_update_event(event_id, data, expected_version)
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err
        return {"event": event.to_dict()} if call.return_response else None

    async def handle_delete_event(call: ServiceCall) -> None:
        coordinator = _get_any_coordinator(hass)
        try:
            await coordinator.async_delete_event(
                call.data[ATTR_EVENT_ID],
                mode=call.data.get("mode", "series"),
                occurrence_start=call.data.get("occurrence_start"),
            )
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err

    async def handle_get_events(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        start = dt_util.parse_datetime(call.data[ATTR_START]) or dt_util.parse_datetime(
            call.data[ATTR_START] + "T00:00:00"
        )
        end = dt_util.parse_datetime(call.data[ATTR_END]) or dt_util.parse_datetime(
            call.data[ATTR_END] + "T00:00:00"
        )
        if start is None or end is None:
            raise ServiceValidationError("Ungültiger Zeitraum.")
        occurrences = coordinator.get_events_in_range(
            dt_util.as_utc(start), dt_util.as_utc(end), person_ids=call.data.get(ATTR_PERSON_IDS)
        )
        return {"events": [_occurrence_to_service_dict(o) for o in occurrences]}

    async def handle_get_today_events(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        occurrences = coordinator.get_today_events(call.data.get(ATTR_PERSON_ID))
        return {"events": [_occurrence_to_service_dict(o) for o in occurrences]}

    async def handle_get_next_event(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        occ = coordinator.get_next_event(call.data.get(ATTR_PERSON_ID))
        return {"event": _occurrence_to_service_dict(occ) if occ else None}

    async def handle_duplicate_event(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        try:
            event = await coordinator.async_duplicate_event(
                call.data[ATTR_EVENT_ID],
                start_override=call.data.get(ATTR_START),
                end_override=call.data.get(ATTR_END),
            )
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err
        return {"event": event.to_dict()} if call.return_response else None

    async def handle_set_event_status(call: ServiceCall) -> ServiceResponse:
        coordinator = _get_any_coordinator(hass)
        try:
            event = await coordinator.async_set_event_status(
                call.data[ATTR_EVENT_ID], call.data[ATTR_STATUS]
            )
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err
        return {"event": event.to_dict()} if call.return_response else None

    hass.services.async_register(
        DOMAIN,
        SERVICE_CREATE_EVENT,
        handle_create_event,
        CREATE_EVENT_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_UPDATE_EVENT,
        handle_update_event,
        UPDATE_EVENT_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_DELETE_EVENT, handle_delete_event, DELETE_EVENT_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_GET_EVENTS, handle_get_events, GET_EVENTS_SCHEMA, SupportsResponse.ONLY
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_GET_TODAY_EVENTS,
        handle_get_today_events,
        GET_TODAY_EVENTS_SCHEMA,
        SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_GET_NEXT_EVENT,
        handle_get_next_event,
        GET_NEXT_EVENT_SCHEMA,
        SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_DUPLICATE_EVENT,
        handle_duplicate_event,
        DUPLICATE_EVENT_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_EVENT_STATUS,
        handle_set_event_status,
        SET_STATUS_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.data[f"{DOMAIN}_services_registered"] = True


async def _async_register_frontend(hass: HomeAssistant) -> None:
    # "http" is declared in manifest.json's `dependencies`, so hass.http is
    # guaranteed to exist by the time this runs. "frontend" (needed for
    # add_extra_js_url below) is deliberately *not* declared there: it is a
    # system integration that's part of every normal HA bootstrap (via
    # default_config) and therefore always finishes setup long before any
    # config entry - including ours - is loaded, so redeclaring it here would
    # be redundant in practice. It would also pull in frontend's full
    # dependency chain (onboarding -> analytics/person -> recorder, etc.)
    # which is unnecessarily heavy and not what actually protects against
    # the "Custom element not found" bug. The one theoretical gap (a
    # headless HA instance without frontend loaded at all) is handled by the
    # broad except-and-log around the call to this function in
    # async_setup_entry, so it degrades gracefully instead of crashing setup.
    if hass.data.get(f"{DOMAIN}_frontend_registered"):
        return
    card_file = WWW_PATH / CARD_JS_FILENAME
    if not card_file.exists():
        _LOGGER.warning(
            "HomeRoster: %s wurde nicht gefunden. Die Karte wurde vermutlich noch "
            "nicht gebaut - siehe README ('npm run build' im frontend/-Verzeichnis) und "
            "kopiere frontend/dist/homeroster-card.js nach custom_components/"
            "homeroster/www/.",
            card_file,
        )
        return
    # Imported locally: StaticPathConfig / async_register_static_paths were
    # added in HA 2024.7 (see manifest.json min_ha_version). A local import
    # keeps this module importable for tooling running against older cores,
    # while async_setup_entry itself still requires >=2024.10 to function.
    from homeassistant.components.http import StaticPathConfig

    # Cache-bust via a content hash embedded in the URL itself (no query
    # string, since add_extra_js_url loads this as a JS module and some
    # browsers/HA frontend tooling do not reliably re-fetch module URLs that
    # only differ by "?v=..."). `cache_headers=False` only stops Home
    # Assistant from attaching its own long-lived (1 month) Cache-Control
    # header - it does not send "no-cache" either, so without this a browser
    # can still keep serving a stale/broken bundle from a previous version
    # under the same URL. Hashing the content means an updated bundle is
    # always served under a brand-new URL, so a stale cache entry can never
    # collide with it.
    content_hash = hashlib.sha256(card_file.read_bytes()).hexdigest()[:10]
    url_path = f"{CARD_URL_BASE}/homeroster-card-{content_hash}.js"

    await hass.http.async_register_static_paths(
        [StaticPathConfig(url_path, str(card_file), cache_headers=False)]
    )
    add_extra_js_url(hass, url_path)
    hass.data[f"{DOMAIN}_frontend_registered"] = True
    _LOGGER.info("HomeRoster: Lovelace-Karte erfolgreich unter %s registriert.", url_path)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up domain-wide services and the websocket API (config-entry independent)."""
    await _async_setup_services(hass)
    async_register_websocket_commands(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up HomeRoster from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    coordinator = HomeRosterCoordinator(hass, entry)
    await coordinator.async_load()

    hass.data[DOMAIN][entry.entry_id] = {"coordinator": coordinator}

    device_registry = dr.async_get(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, entry.entry_id)},
        name="HomeRoster",
        manufacturer="HomeRoster (lokal, ohne Cloud)",
        model="Family Calendar",
        sw_version="1.0.0",
    )

    try:
        await _async_register_frontend(hass)
    except ImportError:
        _LOGGER.error(
            "HomeRoster: Die Lovelace-Karte konnte nicht automatisch registriert "
            "werden - diese Home-Assistant-Version ist älter als %s. Bitte Home Assistant "
            "aktualisieren; Backend, Sensoren und Automationen funktionieren unabhängig davon.",
            "2024.10.0",
        )
    except Exception:  # noqa: BLE001 - frontend registration must never break entry setup
        _LOGGER.exception(
            "HomeRoster: Unerwarteter Fehler bei der Registrierung der Lovelace-Karte "
            "(www/%s). Backend, Sensoren, Kalender und Automationen funktionieren unabhängig "
            "davon weiter; bitte diesen Fehler im Home-Assistant-Log prüfen.",
            CARD_JS_FILENAME,
        )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        entry_data = hass.data[DOMAIN].pop(entry.entry_id)
        await entry_data["coordinator"].async_unload()
    return unload_ok
