"""Constants for the Family Planner integration."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "family_planner"
PLATFORMS: Final = ["calendar", "sensor", "binary_sensor"]

# Storage
STORAGE_VERSION_MAJOR: Final = 1
STORAGE_VERSION_MINOR: Final = 1
STORAGE_KEY_PREFIX: Final = "family_planner"

# Config / options keys
CONF_REQUIRE_PERSON: Final = "require_person"
CONF_ENABLE_STATUS: Final = "enable_status"
CONF_ENABLE_CATEGORIES: Final = "enable_categories"
CONF_ALLOW_NON_ADMIN_WRITE: Final = "allow_non_admin_write"
CONF_FIRST_WEEKDAY: Final = "first_weekday"
CONF_TODAY_SENSOR_LIMIT: Final = "today_sensor_limit"
CONF_REMINDER_TICK_SECONDS: Final = "reminder_tick_seconds"

DEFAULT_REQUIRE_PERSON: Final = True
DEFAULT_ENABLE_STATUS: Final = True
DEFAULT_ENABLE_CATEGORIES: Final = True
DEFAULT_ALLOW_NON_ADMIN_WRITE: Final = True
DEFAULT_FIRST_WEEKDAY: Final = "monday"
DEFAULT_TODAY_SENSOR_LIMIT: Final = 20
DEFAULT_REMINDER_TICK_SECONDS: Final = 30
FIRED_REMINDER_RETENTION_HOURS: Final = 48

# Options flow actions
ACTION_ADD: Final = "add"
ACTION_EDIT: Final = "edit"
ACTION_DELETE: Final = "delete"
ACTION_MOVE_UP: Final = "move_up"
ACTION_MOVE_DOWN: Final = "move_down"
ACTION_DONE: Final = "done"

# Person deletion strategies
STRATEGY_DEACTIVATE: Final = "deactivate"
STRATEGY_REMOVE_FROM_EVENTS: Final = "remove_from_events"
STRATEGY_REASSIGN: Final = "reassign"
STRATEGY_KEEP_UNASSIGNED: Final = "keep_unassigned"

PERSON_ROLES: Final = ["parent", "child", "other"]

EVENT_STATUSES: Final = ["planned", "confirmed", "tentative", "done", "cancelled"]

DEFAULT_CATEGORIES: Final = [
    {"id": "school", "name_key": "school", "color": "#3f51b5", "icon": "mdi:school"},
    {"id": "work", "name_key": "work", "color": "#607d8b", "icon": "mdi:briefcase"},
    {"id": "doctor", "name_key": "doctor", "color": "#e53935", "icon": "mdi:stethoscope"},
    {"id": "leisure", "name_key": "leisure", "color": "#43a047", "icon": "mdi:tennis-ball"},
    {"id": "birthday", "name_key": "birthday", "color": "#fb8c00", "icon": "mdi:cake-variant"},
    {"id": "vacation", "name_key": "vacation", "color": "#00acc1", "icon": "mdi:beach"},
    {"id": "household", "name_key": "household", "color": "#8d6e63", "icon": "mdi:home"},
    {"id": "other", "name_key": "other", "color": "#9e9e9e", "icon": "mdi:dots-horizontal"},
]

DEFAULT_PERSON_COLORS: Final = [
    "#e53935",
    "#1e88e5",
    "#43a047",
    "#fb8c00",
    "#8e24aa",
    "#00acc1",
    "#fdd835",
    "#6d4c41",
    "#3949ab",
    "#d81b60",
]

REMINDER_PRESET_OFFSETS: Final = [0, 5, 15, 30, 60, 1440]

# Event bus events
EVENT_CREATED: Final = f"{DOMAIN}_event_created"
EVENT_UPDATED: Final = f"{DOMAIN}_event_updated"
EVENT_DELETED: Final = f"{DOMAIN}_event_deleted"
EVENT_STARTED: Final = f"{DOMAIN}_event_started"
EVENT_ENDED: Final = f"{DOMAIN}_event_ended"
EVENT_REMINDER_DUE: Final = f"{DOMAIN}_reminder_due"

# Services
SERVICE_CREATE_EVENT: Final = "create_event"
SERVICE_UPDATE_EVENT: Final = "update_event"
SERVICE_DELETE_EVENT: Final = "delete_event"
SERVICE_GET_EVENTS: Final = "get_events"
SERVICE_GET_TODAY_EVENTS: Final = "get_today_events"
SERVICE_GET_NEXT_EVENT: Final = "get_next_event"
SERVICE_DUPLICATE_EVENT: Final = "duplicate_event"
SERVICE_SET_EVENT_STATUS: Final = "set_event_status"

ATTR_EVENT_ID: Final = "event_id"
ATTR_TITLE: Final = "title"
ATTR_SUBTITLE: Final = "subtitle"
ATTR_START: Final = "start"
ATTR_END: Final = "end"
ATTR_ALL_DAY: Final = "all_day"
ATTR_PERSON_IDS: Final = "person_ids"
ATTR_DESCRIPTION: Final = "description"
ATTR_LOCATION: Final = "location"
ATTR_CATEGORY_ID: Final = "category_id"
ATTR_COLOR: Final = "color"
ATTR_ICON: Final = "icon"
ATTR_STATUS: Final = "status"
ATTR_REMINDERS: Final = "reminders"
ATTR_RRULE: Final = "rrule"
ATTR_PERSON_ID: Final = "person_id"

MAX_TODAY_ATTR_EVENTS: Final = 25
MAX_RECURRENCE_EXPANSION_INSTANCES: Final = 500
