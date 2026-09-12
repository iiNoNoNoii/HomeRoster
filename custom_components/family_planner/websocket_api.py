"""WebSocket API used by the Family Planner Lovelace card.

All commands live under the ``family_planner/`` namespace. Every command
runs over Home Assistant's already-authenticated websocket connection - no
separate unauthenticated HTTP endpoint is exposed. Read commands are
available to any authenticated user; event mutation depends on the
``allow_non_admin_write`` option; people/category/import-export management
is always restricted to administrators.
"""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .const import CONF_ALLOW_NON_ADMIN_WRITE, DEFAULT_ALLOW_NON_ADMIN_WRITE, DOMAIN
from .coordinator import EventOccurrence, FamilyPlannerCoordinator
from .models import ConflictError, FamilyPlannerError

_LOGGER = logging.getLogger(__name__)

EVENT_MUTABLE_FIELDS = (
    "title",
    "subtitle",
    "start",
    "end",
    "all_day",
    "person_ids",
    "description",
    "location",
    "category_id",
    "color",
    "icon",
    "status",
    "reminders",
    "rrule",
)


def _get_coordinator(hass: HomeAssistant) -> FamilyPlannerCoordinator | None:
    domain_data = hass.data.get(DOMAIN)
    if not domain_data:
        return None
    for entry_data in domain_data.values():
        return entry_data["coordinator"]
    return None


def _send_error(
    connection: websocket_api.ActiveConnection,
    msg_id: int,
    code: str,
    message: str,
    extra: dict[str, Any] | None = None,
) -> None:
    error: dict[str, Any] = {"code": code, "message": message}
    if extra:
        error.update(extra)
    connection.send_message({"id": msg_id, "type": "result", "success": False, "error": error})


def _handle_family_planner_error(
    connection: websocket_api.ActiveConnection, msg_id: int, err: FamilyPlannerError
) -> None:
    extra = {"current": err.current} if isinstance(err, ConflictError) and err.current else None
    _send_error(connection, msg_id, err.code, str(err), extra)


def _occurrence_dict(occ: EventOccurrence) -> dict[str, Any]:
    event = occ.event
    data = event.to_dict()
    data["occurrence_start"] = occ.start.isoformat()
    data["occurrence_end"] = occ.end.isoformat()
    data["recurrence_id"] = occ.recurrence_id
    data["is_recurring_instance"] = occ.recurrence_id is not None
    return data


def _require_coordinator(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg_id: int
) -> FamilyPlannerCoordinator | None:
    coordinator = _get_coordinator(hass)
    if coordinator is None:
        _send_error(connection, msg_id, "not_loaded", "Family Planner ist noch nicht geladen.")
        return None
    return coordinator


def _can_write_events(
    hass: HomeAssistant,
    coordinator: FamilyPlannerCoordinator,
    connection: websocket_api.ActiveConnection,
) -> bool:
    if connection.user is None:
        return False
    if connection.user.is_admin:
        return True
    allow_non_admin = coordinator.entry.options.get(
        CONF_ALLOW_NON_ADMIN_WRITE, DEFAULT_ALLOW_NON_ADMIN_WRITE
    )
    return bool(allow_non_admin) and connection.user.is_active


def _require_write_permission(
    hass: HomeAssistant,
    coordinator: FamilyPlannerCoordinator,
    connection: websocket_api.ActiveConnection,
    msg_id: int,
) -> bool:
    if not _can_write_events(hass, coordinator, connection):
        _send_error(
            connection, msg_id, "forbidden", "Keine Berechtigung zum Bearbeiten von Terminen."
        )
        return False
    return True


def _require_admin(connection: websocket_api.ActiveConnection, msg_id: int) -> bool:
    if connection.user is None or not connection.user.is_admin:
        _send_error(connection, msg_id, "forbidden", "Diese Aktion erfordert Administratorrechte.")
        return False
    return True


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/config",
    }
)
@websocket_api.async_response
async def ws_get_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    is_admin = bool(connection.user and connection.user.is_admin)
    connection.send_result(
        msg["id"],
        {
            "options": dict(coordinator.entry.options),
            "is_admin": is_admin,
            "can_write_events": _can_write_events(hass, coordinator, connection),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/events/get",
        vol.Required("start"): str,
        vol.Required("end"): str,
        vol.Optional("person_ids"): [str],
        vol.Optional("category_ids"): [str],
        vol.Optional("statuses"): [str],
        vol.Optional("include_cancelled", default=True): bool,
    }
)
@websocket_api.async_response
async def ws_get_events(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    start = dt_util.parse_datetime(msg["start"]) or dt_util.parse_datetime(
        msg["start"] + "T00:00:00"
    )
    end = dt_util.parse_datetime(msg["end"]) or dt_util.parse_datetime(msg["end"] + "T00:00:00")
    if start is None or end is None:
        _send_error(connection, msg["id"], "invalid_data", "Ungültiger Zeitraum.")
        return
    occurrences = coordinator.get_events_in_range(
        dt_util.as_utc(start),
        dt_util.as_utc(end),
        person_ids=msg.get("person_ids"),
        category_ids=msg.get("category_ids"),
        statuses=msg.get("statuses"),
        include_cancelled=msg.get("include_cancelled", True),
    )
    connection.send_result(msg["id"], {"events": [_occurrence_dict(occ) for occ in occurrences]})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/events/create",
        vol.Required("title"): str,
        vol.Optional("subtitle"): vol.Any(str, None),
        vol.Required("start"): str,
        vol.Required("end"): str,
        vol.Optional("all_day", default=False): bool,
        vol.Optional("person_ids", default=list): [str],
        vol.Optional("description"): vol.Any(str, None),
        vol.Optional("location"): vol.Any(str, None),
        vol.Optional("category_id"): vol.Any(str, None),
        vol.Optional("color"): vol.Any(str, None),
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("status"): vol.Any(str, None),
        vol.Optional("reminders", default=list): [int],
        vol.Optional("rrule"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_create_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    if not _require_write_permission(hass, coordinator, connection, msg["id"]):
        return
    data = {k: v for k, v in msg.items() if k in EVENT_MUTABLE_FIELDS}
    try:
        created_by = connection.user.id if connection.user else None
        event = await coordinator.async_create_event(data, created_by=created_by)
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"event": event.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/events/update",
        vol.Required("event_id"): str,
        vol.Optional("expected_version"): int,
        vol.Optional("title"): str,
        vol.Optional("subtitle"): vol.Any(str, None),
        vol.Optional("start"): str,
        vol.Optional("end"): str,
        vol.Optional("all_day"): bool,
        vol.Optional("person_ids"): [str],
        vol.Optional("description"): vol.Any(str, None),
        vol.Optional("location"): vol.Any(str, None),
        vol.Optional("category_id"): vol.Any(str, None),
        vol.Optional("color"): vol.Any(str, None),
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("status"): vol.Any(str, None),
        vol.Optional("reminders"): [int],
        vol.Optional("rrule"): vol.Any(str, None),
        vol.Optional("exdates"): [str],
    }
)
@websocket_api.async_response
async def ws_update_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    if not _require_write_permission(hass, coordinator, connection, msg["id"]):
        return
    changes = {k: v for k, v in msg.items() if k in EVENT_MUTABLE_FIELDS or k == "exdates"}
    try:
        event = await coordinator.async_update_event(
            msg["event_id"], changes, expected_version=msg.get("expected_version")
        )
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"event": event.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/events/delete",
        vol.Required("event_id"): str,
        vol.Optional("mode", default="series"): vol.In(["series", "instance"]),
        vol.Optional("occurrence_start"): str,
    }
)
@websocket_api.async_response
async def ws_delete_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    if not _require_write_permission(hass, coordinator, connection, msg["id"]):
        return
    try:
        await coordinator.async_delete_event(
            msg["event_id"],
            mode=msg.get("mode", "series"),
            occurrence_start=msg.get("occurrence_start"),
        )
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"deleted": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/events/duplicate",
        vol.Required("event_id"): str,
        vol.Optional("start"): str,
        vol.Optional("end"): str,
    }
)
@websocket_api.async_response
async def ws_duplicate_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    if not _require_write_permission(hass, coordinator, connection, msg["id"]):
        return
    try:
        event = await coordinator.async_duplicate_event(
            msg["event_id"], start_override=msg.get("start"), end_override=msg.get("end")
        )
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"event": event.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/next_event",
        vol.Optional("person_id"): str,
    }
)
@websocket_api.async_response
async def ws_next_event(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    occ = coordinator.get_next_event(msg.get("person_id"))
    connection.send_result(msg["id"], {"event": _occurrence_dict(occ) if occ else None})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/today_events",
        vol.Optional("person_id"): str,
    }
)
@websocket_api.async_response
async def ws_today_events(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    occurrences = coordinator.get_today_events(msg.get("person_id"))
    connection.send_result(msg["id"], {"events": [_occurrence_dict(occ) for occ in occurrences]})


# ----------------------------------------------------------------------
# People
# ----------------------------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "family_planner/people/list"})
@websocket_api.async_response
async def ws_people_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    connection.send_result(msg["id"], {"people": [p.to_dict() for p in coordinator.get_people()]})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/people/create",
        vol.Required("name"): str,
        vol.Required("color"): str,
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("linked_person_entity_id"): vol.Any(str, None),
        vol.Optional("active", default=True): bool,
        vol.Optional("role"): vol.Any(str, None),
        vol.Optional("notify_service"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_people_create(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    data = {k: v for k, v in msg.items() if k not in ("id", "type")}
    try:
        person = await coordinator.async_create_person(data)
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"person": person.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/people/update",
        vol.Required("person_id"): str,
        vol.Optional("name"): str,
        vol.Optional("color"): str,
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("linked_person_entity_id"): vol.Any(str, None),
        vol.Optional("active"): bool,
        vol.Optional("role"): vol.Any(str, None),
        vol.Optional("notify_service"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_people_update(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    changes = {k: v for k, v in msg.items() if k not in ("id", "type", "person_id")}
    try:
        person = await coordinator.async_update_person(msg["person_id"], changes)
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"person": person.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/people/delete",
        vol.Required("person_id"): str,
        vol.Required("strategy"): vol.In(
            ["deactivate", "remove_from_events", "reassign", "keep_unassigned"]
        ),
        vol.Optional("reassign_to"): str,
    }
)
@websocket_api.async_response
async def ws_people_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    try:
        await coordinator.async_delete_person(
            msg["person_id"], msg["strategy"], msg.get("reassign_to")
        )
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"deleted": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/people/reorder",
        vol.Required("ordered_ids"): [str],
    }
)
@websocket_api.async_response
async def ws_people_reorder(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    await coordinator.async_reorder_people(msg["ordered_ids"])
    connection.send_result(msg["id"], {"people": [p.to_dict() for p in coordinator.get_people()]})


# ----------------------------------------------------------------------
# Categories
# ----------------------------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "family_planner/categories/list"})
@websocket_api.async_response
async def ws_categories_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None:
        return
    connection.send_result(
        msg["id"], {"categories": [c.to_dict() for c in coordinator.get_categories()]}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/categories/create",
        vol.Required("name"): str,
        vol.Required("color"): str,
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("active", default=True): bool,
    }
)
@websocket_api.async_response
async def ws_categories_create(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    data = {k: v for k, v in msg.items() if k not in ("id", "type")}
    try:
        category = await coordinator.async_create_category(data)
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"category": category.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/categories/update",
        vol.Required("category_id"): str,
        vol.Optional("name"): str,
        vol.Optional("color"): str,
        vol.Optional("icon"): vol.Any(str, None),
        vol.Optional("active"): bool,
    }
)
@websocket_api.async_response
async def ws_categories_update(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    changes = {k: v for k, v in msg.items() if k not in ("id", "type", "category_id")}
    try:
        category = await coordinator.async_update_category(msg["category_id"], changes)
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"category": category.to_dict()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/categories/delete",
        vol.Required("category_id"): str,
    }
)
@websocket_api.async_response
async def ws_categories_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    try:
        await coordinator.async_delete_category(msg["category_id"])
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], {"deleted": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/categories/reorder",
        vol.Required("ordered_ids"): [str],
    }
)
@websocket_api.async_response
async def ws_categories_reorder(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    await coordinator.async_reorder_categories(msg["ordered_ids"])
    connection.send_result(
        msg["id"], {"categories": [c.to_dict() for c in coordinator.get_categories()]}
    )


# ----------------------------------------------------------------------
# Import / Export
# ----------------------------------------------------------------------


@websocket_api.websocket_command({vol.Required("type"): "family_planner/export_json"})
@websocket_api.async_response
async def ws_export_json(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    connection.send_result(msg["id"], coordinator.export_json())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "family_planner/import_json",
        vol.Required("payload"): dict,
        vol.Optional("conflict_strategy", default="skip"): vol.In(["skip", "replace", "duplicate"]),
    }
)
@websocket_api.async_response
async def ws_import_json(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    coordinator = _require_coordinator(hass, connection, msg["id"])
    if coordinator is None or not _require_admin(connection, msg["id"]):
        return
    try:
        result = await coordinator.async_import_json(
            msg["payload"], msg.get("conflict_strategy", "skip")
        )
    except FamilyPlannerError as err:
        _handle_family_planner_error(connection, msg["id"], err)
        return
    connection.send_result(msg["id"], result)


_COMMANDS = (
    ws_get_config,
    ws_get_events,
    ws_create_event,
    ws_update_event,
    ws_delete_event,
    ws_duplicate_event,
    ws_next_event,
    ws_today_events,
    ws_people_list,
    ws_people_create,
    ws_people_update,
    ws_people_delete,
    ws_people_reorder,
    ws_categories_list,
    ws_categories_create,
    ws_categories_update,
    ws_categories_delete,
    ws_categories_reorder,
    ws_export_json,
    ws_import_json,
)


def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all family_planner/* websocket commands (idempotent)."""
    if hass.data.get(f"{DOMAIN}_ws_registered"):
        return
    for command in _COMMANDS:
        websocket_api.async_register_command(hass, command)
    hass.data[f"{DOMAIN}_ws_registered"] = True
