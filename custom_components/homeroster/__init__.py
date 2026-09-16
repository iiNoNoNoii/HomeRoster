"""The HomeRoster integration - a fully local family calendar."""

from __future__ import annotations

import hashlib
import json
import logging
from pathlib import Path
from typing import Any

import voluptuous as vol
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.event import async_call_later

try:  # ServiceValidationError was added in HA 2024.1, well below our min_ha_version.
    from homeassistant.exceptions import ServiceValidationError
except ImportError:  # pragma: no cover - unreachable on any HA >= min_ha_version
    from homeassistant.exceptions import HomeAssistantError as ServiceValidationError
from homeassistant.util import dt as dt_util

from .backup import BackupManager
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
    SERVICE_CREATE_BACKUP,
    SERVICE_CREATE_EVENT,
    SERVICE_DELETE_EVENT,
    SERVICE_DUPLICATE_EVENT,
    SERVICE_GET_EVENTS,
    SERVICE_GET_NEXT_EVENT,
    SERVICE_GET_TODAY_EVENTS,
    SERVICE_LIST_BACKUPS,
    SERVICE_RESTORE_BACKUP,
    SERVICE_SET_EVENT_STATUS,
    SERVICE_UPDATE_EVENT,
)
from .coordinator import EventOccurrence, HomeRosterCoordinator
from .models import HomeRosterError
from .websocket_api import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)

WWW_PATH = Path(__file__).parent / "www"
CARD_JS_FILENAME = "homeroster-card.js"
LOADER_JS_FILENAME = "homeroster-loader.js"
# Where the generated loader file is written - deliberately hass.config.path
# (alongside homeroster_backups/, outside the git/HACS-managed
# custom_components/ tree), not WWW_PATH: WWW_PATH only ever holds files
# this repo actually ships, and a HACS update overwrites that whole
# directory from the release, so anything we generate at runtime doesn't
# belong there.
GENERATED_DIR_NAME = "homeroster_generated"
CARD_URL_BASE = "/homeroster_static"
# Client-side retry for the loader script (see _build_loader_js) - separate
# from FRONTEND_RETRY_DELAYS below, which only covers registering the URL
# server-side at Home Assistant startup. This covers a *browser* failing to
# fetch an already-correctly-registered URL (e.g. one dropped request over
# an unreliable reverse proxy/tunnel) - something the retry below can't see
# at all, since it never leaves the server. Home Assistant's own
# add_extra_js_url loading has no retry of its own (a failed import() is
# just caught and logged), so without this, a single bad fetch leaves the
# card missing until the user manually reloads.
LOADER_MAX_ATTEMPTS = 5
LOADER_BASE_DELAY_MS = 500
# Retry delays (seconds) for _async_register_frontend() if it fails for a
# transient reason (e.g. the www/ file briefly missing/unreadable during an
# update, or hass.http not fully warmed up yet on a cold start). Without
# this, a single transient failure during startup would silently leave the
# card permanently unregistered for the rest of that HA run (the previous
# behaviour), forcing a full Home Assistant restart to recover instead of
# self-healing within a minute.
FRONTEND_RETRY_DELAYS = (5, 15, 60)

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
CREATE_BACKUP_SCHEMA = vol.Schema({})
LIST_BACKUPS_SCHEMA = vol.Schema({})
RESTORE_BACKUP_SCHEMA = vol.Schema(
    {
        vol.Required("filename"): str,
        vol.Optional("conflict_strategy", default="skip"): vol.In(
            ["skip", "replace", "duplicate"]
        ),
    }
)


def _get_any_coordinator(hass: HomeAssistant) -> HomeRosterCoordinator:
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        raise ServiceValidationError("HomeRoster ist nicht geladen.")
    for entry_data in domain_data.values():
        return entry_data["coordinator"]
    raise ServiceValidationError("HomeRoster ist nicht geladen.")


def _get_any_backup_manager(hass: HomeAssistant) -> BackupManager:
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        raise ServiceValidationError("HomeRoster ist nicht geladen.")
    for entry_data in domain_data.values():
        return entry_data["backup_manager"]
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

    async def handle_create_backup(call: ServiceCall) -> ServiceResponse:
        backup_manager = _get_any_backup_manager(hass)
        filename = await backup_manager.async_create_backup()
        return {"filename": filename} if call.return_response else None

    async def handle_list_backups(call: ServiceCall) -> ServiceResponse:
        backup_manager = _get_any_backup_manager(hass)
        return {"backups": await backup_manager.async_list_backups()}

    async def handle_restore_backup(call: ServiceCall) -> ServiceResponse:
        backup_manager = _get_any_backup_manager(hass)
        try:
            result = await backup_manager.async_restore_backup(
                call.data["filename"], call.data.get("conflict_strategy", "skip")
            )
        except HomeRosterError as err:
            raise ServiceValidationError(str(err)) from err
        return result if call.return_response else None

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
    hass.services.async_register(
        DOMAIN,
        SERVICE_CREATE_BACKUP,
        handle_create_backup,
        CREATE_BACKUP_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_LIST_BACKUPS,
        handle_list_backups,
        LIST_BACKUPS_SCHEMA,
        SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_RESTORE_BACKUP,
        handle_restore_backup,
        RESTORE_BACKUP_SCHEMA,
        SupportsResponse.OPTIONAL,
    )
    hass.data[f"{DOMAIN}_services_registered"] = True


def _build_loader_js(card_url: str) -> str:
    """A tiny, hand-written (not esbuild-bundled) loader that fetches the
    real card bundle with its own retry-with-backoff, instead of relying on
    Home Assistant's own add_extra_js_url loading (a single import() with
    no retry - see LOADER_MAX_ATTEMPTS's comment above). json.dumps() is
    used purely to safely embed card_url as a JS string literal (it's
    always our own computed /homeroster_static/... path, never external
    input, but this avoids ever having to reason about escaping by hand).
    """
    return (
        '"use strict";\n'
        "(function () {\n"
        f"  var CARD_URL = {json.dumps(card_url)};\n"
        f"  var MAX_ATTEMPTS = {LOADER_MAX_ATTEMPTS};\n"
        f"  var BASE_DELAY_MS = {LOADER_BASE_DELAY_MS};\n"
        "  function attempt(n) {\n"
        "    import(CARD_URL).catch(function (err) {\n"
        "      if (n >= MAX_ATTEMPTS) {\n"
        "        console.error(\n"
        '          "HomeRoster: Karte konnte nach " + MAX_ATTEMPTS +\n'
        '            " Versuchen nicht geladen werden.",\n'
        "          err\n"
        "        );\n"
        "        return;\n"
        "      }\n"
        "      setTimeout(function () {\n"
        "        attempt(n + 1);\n"
        "      }, BASE_DELAY_MS * Math.pow(2, n - 1));\n"
        "    });\n"
        "  }\n"
        "  attempt(1);\n"
        "})();\n"
    )


def _write_text_file(path: Path, content: str) -> None:
    """Blocking - always called via hass.async_add_executor_job."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


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
    # the "Custom element not found" bug. Any failure here (including a
    # headless HA instance without frontend loaded) is handled by the caller,
    # _async_register_frontend_with_retry(), which retries with backoff
    # before giving up and logging, so setup never crashes.
    if hass.data.get(f"{DOMAIN}_frontend_registered"):
        return
    card_file = WWW_PATH / CARD_JS_FILENAME
    if not card_file.exists():
        # Deliberately raised (not just logged) so the caller's retry loop
        # covers this too - e.g. an update/HACS refresh can leave this file
        # transiently missing for a moment during a config entry reload,
        # which used to silently and permanently skip card registration for
        # the rest of that HA run instead of resolving itself within a
        # minute once the file reappears.
        raise FileNotFoundError(
            f"{card_file} wurde nicht gefunden. Die Karte wurde vermutlich noch nicht "
            "gebaut - siehe README ('npm run build' im frontend/-Verzeichnis) und kopiere "
            "frontend/dist/homeroster-card.js nach custom_components/homeroster/www/."
        )
    # Imported locally: StaticPathConfig / async_register_static_paths were
    # added in HA 2024.7 (see manifest.json min_ha_version). A local import
    # keeps this module importable for tooling running against older cores,
    # while async_setup_entry itself still requires >=2024.10 to function.
    from homeassistant.components.http import StaticPathConfig

    # Cache-bust via a content hash embedded in the URL itself (no query
    # string, since add_extra_js_url loads this as a JS module and some
    # browsers/HA frontend tooling do not reliably re-fetch module URLs that
    # only differ by "?v=..."). Because the URL changes whenever the file's
    # content changes, this specific URL's response can never become stale -
    # it either 404s (never registered/wrong build) or is exactly this
    # content, forever. That makes `cache_headers=True` (HA's standard
    # public, max-age=31d static-file caching) both safe and desirable here:
    # it gives browsers *and* any intermediate proxy/CDN (e.g. a Cloudflare
    # Tunnel) an explicit, unambiguous caching instruction instead of
    # leaving them to fall back to heuristic caching of an unheadered
    # response - which behaves inconsistently across clients/proxies and is
    # a plausible source of the "works on one device/account, not another"
    # reports seen in the field. A previous version of this code used
    # cache_headers=False for the same "never serve something stale" goal,
    # but that reasoning was backwards: omitting the header doesn't disable
    # caching, it just makes it unpredictable.
    content_hash = hashlib.sha256(card_file.read_bytes()).hexdigest()[:10]
    card_url = f"{CARD_URL_BASE}/homeroster-card-{content_hash}.js"

    # add_extra_js_url points at this small loader instead of card_url
    # directly, so a single dropped fetch (e.g. over a flaky reverse proxy/
    # tunnel) can retry itself instead of leaving the card missing until a
    # manual reload - see _build_loader_js()'s docstring. The loader's own
    # URL is hashed from its content the same way, so it's just as safe to
    # cache long-term, and a change to either the card or the loader itself
    # naturally produces a new loader URL.
    loader_js = _build_loader_js(card_url)
    loader_file = Path(hass.config.path(GENERATED_DIR_NAME)) / LOADER_JS_FILENAME
    await hass.async_add_executor_job(_write_text_file, loader_file, loader_js)
    loader_hash = hashlib.sha256(loader_js.encode("utf-8")).hexdigest()[:10]
    loader_url = f"{CARD_URL_BASE}/homeroster-loader-{loader_hash}.js"

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(card_url, str(card_file), cache_headers=True),
            StaticPathConfig(loader_url, str(loader_file), cache_headers=True),
        ]
    )
    add_extra_js_url(hass, loader_url)
    hass.data[f"{DOMAIN}_frontend_registered"] = True
    _LOGGER.info(
        "HomeRoster: Lovelace-Karte erfolgreich registriert (Loader: %s, Karte: %s).",
        loader_url,
        card_url,
    )


async def _async_register_frontend_with_retry(hass: HomeAssistant, attempt: int = 0) -> None:
    """Wrap _async_register_frontend() with a bounded retry on transient failure.

    A single failed attempt (e.g. the www/ file briefly unreadable during an
    update/HACS refresh, or some other transient error) used to leave the
    card permanently unregistered for the rest of that Home Assistant run -
    the only recovery was a full restart. This retries a few times with
    backoff before giving up and logging, so most transient startup hiccups
    self-heal within about a minute instead.
    """
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
        if attempt < len(FRONTEND_RETRY_DELAYS):
            delay = FRONTEND_RETRY_DELAYS[attempt]
            _LOGGER.warning(
                "HomeRoster: Registrierung der Lovelace-Karte fehlgeschlagen "
                "(Versuch %s/%s), erneuter Versuch in %s Sekunden.",
                attempt + 1,
                len(FRONTEND_RETRY_DELAYS),
                delay,
                exc_info=True,
            )

            async def _retry(_now: Any) -> None:
                await _async_register_frontend_with_retry(hass, attempt + 1)

            async_call_later(hass, delay, _retry)
        else:
            _LOGGER.exception(
                "HomeRoster: Die Lovelace-Karte konnte auch nach mehreren Versuchen nicht "
                "registriert werden (www/%s). Backend, Sensoren, Kalender und Automationen "
                "funktionieren unabhängig davon weiter; ein Neustart von Home Assistant "
                "behebt dies in der Regel.",
                CARD_JS_FILENAME,
            )


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

    backup_manager = BackupManager(hass, entry, coordinator)
    backup_manager.async_start()

    hass.data[DOMAIN][entry.entry_id] = {
        "coordinator": coordinator,
        "backup_manager": backup_manager,
    }

    device_registry = dr.async_get(hass)
    device_registry.async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, entry.entry_id)},
        name="HomeRoster",
        manufacturer="HomeRoster (lokal, ohne Cloud)",
        model="Family Calendar",
        sw_version="1.0.0",
    )

    await _async_register_frontend_with_retry(hass)

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
        entry_data["backup_manager"].async_stop()
        await entry_data["coordinator"].async_unload()
    return unload_ok
