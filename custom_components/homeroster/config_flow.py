"""Config flow (setup) and options flow (settings / people / categories)."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    ACTION_ADD,
    ACTION_DELETE,
    ACTION_DONE,
    ACTION_EDIT,
    ACTION_MOVE_DOWN,
    ACTION_MOVE_UP,
    CARD_LANGUAGES,
    CONF_ALLOW_NON_ADMIN_WRITE,
    CONF_BACKUP_ENABLED,
    CONF_BACKUP_INTERVAL_DAYS,
    CONF_BACKUP_RETENTION_COUNT,
    CONF_DEFAULT_COLORS,
    CONF_DEFAULT_ICONS,
    CONF_DEFAULT_REMINDER_MINUTES,
    CONF_ENABLE_CATEGORIES,
    CONF_ENABLE_STATUS,
    CONF_FIRST_WEEKDAY,
    CONF_LANGUAGE,
    CONF_REMINDER_TICK_SECONDS,
    CONF_REQUIRE_PERSON,
    CONF_SEND_MOBILE_NOTIFICATIONS,
    CONF_TODAY_SENSOR_LIMIT,
    DEFAULT_ALLOW_NON_ADMIN_WRITE,
    DEFAULT_BACKUP_ENABLED,
    DEFAULT_BACKUP_INTERVAL_DAYS,
    DEFAULT_BACKUP_RETENTION_COUNT,
    DEFAULT_COLORS,
    DEFAULT_ENABLE_CATEGORIES,
    DEFAULT_ENABLE_STATUS,
    DEFAULT_FIRST_WEEKDAY,
    DEFAULT_ICONS,
    DEFAULT_LANGUAGE,
    DEFAULT_REMINDER_MINUTES,
    DEFAULT_REMINDER_TICK_SECONDS,
    DEFAULT_REQUIRE_PERSON,
    DEFAULT_SEND_MOBILE_NOTIFICATIONS,
    DEFAULT_TODAY_SENSOR_LIMIT,
    DOMAIN,
    PERSON_ROLES,
    STRATEGY_DEACTIVATE,
    STRATEGY_KEEP_UNASSIGNED,
    STRATEGY_REASSIGN,
    STRATEGY_REMOVE_FROM_EVENTS,
)
from .models import NotFoundError, ValidationError

_LOGGER = logging.getLogger(__name__)

_MANAGER_ACTIONS = [
    ACTION_ADD,
    ACTION_EDIT,
    ACTION_DELETE,
    ACTION_MOVE_UP,
    ACTION_MOVE_DOWN,
    ACTION_DONE,
]


def _manager_action_selector(translation_key: str) -> selector.SelectSelector:
    return selector.SelectSelector(
        selector.SelectSelectorConfig(
            options=_MANAGER_ACTIONS,
            translation_key=translation_key,
            mode=selector.SelectSelectorMode.DROPDOWN,
        )
    )


_ROLE_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=PERSON_ROLES,
        translation_key="person_role",
        mode=selector.SelectSelectorMode.DROPDOWN,
    )
)

_STRATEGY_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=[
            STRATEGY_DEACTIVATE,
            STRATEGY_REMOVE_FROM_EVENTS,
            STRATEGY_REASSIGN,
            STRATEGY_KEEP_UNASSIGNED,
        ],
        translation_key="delete_strategy",
        mode=selector.SelectSelectorMode.LIST,
    )
)

_FIRST_WEEKDAY_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=["monday", "sunday"],
        translation_key="first_weekday",
        mode=selector.SelectSelectorMode.DROPDOWN,
    )
)

_LANGUAGE_SELECTOR = selector.SelectSelector(
    selector.SelectSelectorConfig(
        options=CARD_LANGUAGES,
        translation_key="language",
        mode=selector.SelectSelectorMode.DROPDOWN,
    )
)

_NOTIFY_SERVICE_SELECTOR = selector.EntitySelector(selector.EntitySelectorConfig(domain="notify"))

_DEFAULT_PERSON_COLOR = "#3f51b5"


def _notify_service_to_entity_id(notify_service: str | None) -> str | None:
    """Turn a stored `notify_service` (e.g. "mobile_app_pixel_7") into the
    full entity id ("notify.mobile_app_pixel_7") the EntitySelector expects
    as a default value when prefilling the form for editing."""
    if not notify_service:
        return None
    return f"notify.{notify_service}"


def _entity_id_to_notify_service(entity_id: str | None) -> str | None:
    """Strip the "notify." domain prefix the EntitySelector returns, so the
    stored value matches what's passed to hass.services.async_call("notify",
    <this value>, ...)."""
    if not entity_id:
        return None
    return entity_id.removeprefix("notify.")


def _hex_to_rgb(hex_color: str | None) -> list[int]:
    """Convert a "#rrggbb" hex string to an [r, g, b] list (0-255 each).

    Falls back to _DEFAULT_PERSON_COLOR's RGB value for anything that isn't
    a well-formed 6-digit hex color.
    """
    value = (hex_color or "").lstrip("#")
    if len(value) != 6:
        value = _DEFAULT_PERSON_COLOR.lstrip("#")
    try:
        return [int(value[i : i + 2], 16) for i in (0, 2, 4)]
    except ValueError:
        return [int(_DEFAULT_PERSON_COLOR.lstrip("#")[i : i + 2], 16) for i in (0, 2, 4)]


def _rgb_to_hex(rgb: list[int] | tuple[int, int, int]) -> str:
    """Convert an [r, g, b] list/tuple (0-255 each) to a "#rrggbb" hex string."""
    r, g, b = (max(0, min(255, int(component))) for component in rgb)
    return f"#{r:02x}{g:02x}{b:02x}"


class HomeRosterConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle the initial setup of HomeRoster (no external account needed)."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="HomeRoster", data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> HomeRosterOptionsFlow:
        return HomeRosterOptionsFlow()


class HomeRosterOptionsFlow(config_entries.OptionsFlow):
    """Options: general settings plus a basic people/category manager.

    The rich, everyday person/category management happens in the card's own
    dialogs (via the websocket API), which is far more comfortable on a wall
    tablet. This options flow is the admin-only, frontend-independent
    fallback required by Home Assistant's config entry conventions.
    """

    def __init__(self) -> None:
        self._pending_person_id: str | None = None

    def _coordinator(self):
        domain_data = self.hass.data.get(DOMAIN, {})
        entry_data = domain_data.get(self.config_entry.entry_id)
        return entry_data["coordinator"] if entry_data else None

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        return self.async_show_menu(
            step_id="init",
            menu_options=["settings", "people", "categories", "backup"],
        )

    # ------------------------------------------------------------------
    # General settings
    # ------------------------------------------------------------------

    async def async_step_settings(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_REQUIRE_PERSON,
                    default=options.get(CONF_REQUIRE_PERSON, DEFAULT_REQUIRE_PERSON),
                ): bool,
                vol.Required(
                    CONF_ENABLE_CATEGORIES,
                    default=options.get(CONF_ENABLE_CATEGORIES, DEFAULT_ENABLE_CATEGORIES),
                ): bool,
                vol.Required(
                    CONF_ENABLE_STATUS,
                    default=options.get(CONF_ENABLE_STATUS, DEFAULT_ENABLE_STATUS),
                ): bool,
                vol.Required(
                    CONF_ALLOW_NON_ADMIN_WRITE,
                    default=options.get(CONF_ALLOW_NON_ADMIN_WRITE, DEFAULT_ALLOW_NON_ADMIN_WRITE),
                ): bool,
                vol.Required(
                    CONF_FIRST_WEEKDAY,
                    default=options.get(CONF_FIRST_WEEKDAY, DEFAULT_FIRST_WEEKDAY),
                ): _FIRST_WEEKDAY_SELECTOR,
                vol.Required(
                    CONF_TODAY_SENSOR_LIMIT,
                    default=options.get(CONF_TODAY_SENSOR_LIMIT, DEFAULT_TODAY_SENSOR_LIMIT),
                ): vol.All(int, vol.Range(min=1, max=100)),
                vol.Required(
                    CONF_REMINDER_TICK_SECONDS,
                    default=options.get(CONF_REMINDER_TICK_SECONDS, DEFAULT_REMINDER_TICK_SECONDS),
                ): vol.All(int, vol.Range(min=10, max=300)),
                vol.Required(
                    CONF_DEFAULT_REMINDER_MINUTES,
                    default=options.get(CONF_DEFAULT_REMINDER_MINUTES, DEFAULT_REMINDER_MINUTES),
                ): vol.All(int, vol.Range(min=0, max=10080)),
                vol.Required(
                    CONF_DEFAULT_COLORS,
                    default=options.get(CONF_DEFAULT_COLORS, DEFAULT_COLORS),
                ): str,
                vol.Required(
                    CONF_DEFAULT_ICONS,
                    default=options.get(CONF_DEFAULT_ICONS, DEFAULT_ICONS),
                ): str,
                vol.Required(
                    CONF_LANGUAGE,
                    default=options.get(CONF_LANGUAGE, DEFAULT_LANGUAGE),
                ): _LANGUAGE_SELECTOR,
                vol.Required(
                    CONF_SEND_MOBILE_NOTIFICATIONS,
                    default=options.get(
                        CONF_SEND_MOBILE_NOTIFICATIONS, DEFAULT_SEND_MOBILE_NOTIFICATIONS
                    ),
                ): bool,
            }
        )
        if user_input is not None:
            new_options = dict(self.config_entry.options)
            new_options.update(user_input)
            return self.async_create_entry(title="", data=new_options)
        return self.async_show_form(step_id="settings", data_schema=schema)

    # ------------------------------------------------------------------
    # Backups
    # ------------------------------------------------------------------

    async def async_step_backup(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Automatic-backup settings. Manual/on-demand actions (create a
        backup right now, list existing backups, restore one) are exposed
        as services (homeroster.create_backup / list_backups /
        restore_backup, see services.yaml) rather than form fields here -
        an options flow form is for persisted settings, not one-off
        actions, and services are directly callable from Developer Tools,
        automations or a dashboard button without needing this dialog."""
        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_BACKUP_ENABLED,
                    default=options.get(CONF_BACKUP_ENABLED, DEFAULT_BACKUP_ENABLED),
                ): bool,
                vol.Required(
                    CONF_BACKUP_INTERVAL_DAYS,
                    default=options.get(CONF_BACKUP_INTERVAL_DAYS, DEFAULT_BACKUP_INTERVAL_DAYS),
                ): vol.All(int, vol.Range(min=1, max=365)),
                vol.Required(
                    CONF_BACKUP_RETENTION_COUNT,
                    default=options.get(
                        CONF_BACKUP_RETENTION_COUNT, DEFAULT_BACKUP_RETENTION_COUNT
                    ),
                ): vol.All(int, vol.Range(min=0, max=1000)),
            }
        )
        if user_input is not None:
            new_options = dict(self.config_entry.options)
            new_options.update(user_input)
            return self.async_create_entry(title="", data=new_options)
        return self.async_show_form(step_id="backup", data_schema=schema)

    # ------------------------------------------------------------------
    # People
    # ------------------------------------------------------------------

    async def async_step_people(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        people = coordinator.get_people()
        errors: dict[str, str] = {}

        # Best-effort prefill for the color picker: ColorRGBSelector always
        # returns a value (it has no "blank" state like the old text field),
        # so on a redisplay after a validation error - where user_input
        # already names the person being edited - show that person's real
        # current color rather than resetting the swatch to the app default.
        color_default_hex = _DEFAULT_PERSON_COLOR
        # Same idea as the color prefill above, but for the notify-service
        # EntitySelector: it has a genuine "blank" state (no default at all),
        # so we only supply a default when the selected person actually has
        # a notify_service, converting it back to the full entity id the
        # selector expects (see _notify_service_to_entity_id).
        notify_service_default: str | None = None
        if user_input is not None and user_input.get("person_id"):
            selected_person = coordinator.get_person(user_input["person_id"])
            if selected_person is not None:
                color_default_hex = selected_person.color
                notify_service_default = _notify_service_to_entity_id(
                    selected_person.notify_service
                )

        if user_input is not None:
            action = user_input["action"]
            person_id = user_input.get("person_id")
            color_rgb = user_input.get("color")
            notify_service = _entity_id_to_notify_service(user_input.get("notify_service"))
            try:
                if action == ACTION_ADD:
                    if not user_input.get("name"):
                        raise ValidationError("Name erforderlich.")
                    await coordinator.async_create_person(
                        {
                            "name": user_input["name"],
                            "color": _rgb_to_hex(color_rgb) if color_rgb else "#3f51b5",
                            "role": user_input.get("role"),
                            "notify_service": notify_service,
                        }
                    )
                    return await self.async_step_people()
                if action == ACTION_EDIT:
                    if not person_id:
                        raise ValidationError("Bitte eine Person auswählen.")
                    changes: dict[str, Any] = {}
                    if user_input.get("name"):
                        changes["name"] = user_input["name"]
                    if color_rgb:
                        changes["color"] = _rgb_to_hex(color_rgb)
                    if user_input.get("role"):
                        changes["role"] = user_input["role"]
                    if notify_service:
                        changes["notify_service"] = notify_service
                    await coordinator.async_update_person(person_id, changes)
                    return await self.async_step_people()
                if action == ACTION_DELETE:
                    if not person_id:
                        raise ValidationError("Bitte eine Person auswählen.")
                    self._pending_person_id = person_id
                    return await self.async_step_people_delete_confirm()
                if action in (ACTION_MOVE_UP, ACTION_MOVE_DOWN):
                    if not person_id:
                        raise ValidationError("Bitte eine Person auswählen.")
                    ordered = [p.id for p in people]
                    index = ordered.index(person_id)
                    swap_with = index - 1 if action == ACTION_MOVE_UP else index + 1
                    if 0 <= swap_with < len(ordered):
                        ordered[index], ordered[swap_with] = ordered[swap_with], ordered[index]
                        await coordinator.async_reorder_people(ordered)
                    return await self.async_step_people()
                if action == ACTION_DONE:
                    return await self.async_step_init()
            except (ValidationError, NotFoundError) as err:
                errors["base"] = "invalid_person"
                _LOGGER.debug("HomeRoster options: %s", err)

        person_choices = {p.id: f"{p.name} ({'aktiv' if p.active else 'inaktiv'})" for p in people}
        schema = vol.Schema(
            {
                vol.Required("action", default=ACTION_ADD): _manager_action_selector(
                    "people_action"
                ),
                vol.Optional("person_id"): vol.In(person_choices) if person_choices else str,
                vol.Optional("name", default=""): str,
                vol.Optional(
                    "color", default=_hex_to_rgb(color_default_hex)
                ): selector.ColorRGBSelector(),
                vol.Optional("role"): _ROLE_SELECTOR,
                (
                    vol.Optional("notify_service", default=notify_service_default)
                    if notify_service_default
                    else vol.Optional("notify_service")
                ): _NOTIFY_SERVICE_SELECTOR,
            }
        )
        return self.async_show_form(
            step_id="people",
            data_schema=schema,
            errors=errors,
            description_placeholders={
                "people_list": ", ".join(f"{p.name}" for p in people) or "(keine Personen)"
            },
        )

    async def async_step_people_delete_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None or self._pending_person_id is None:
            return await self.async_step_people()

        person = coordinator.get_person(self._pending_person_id)
        if person is None:
            self._pending_person_id = None
            return await self.async_step_people()

        other_people = {p.id: p.name for p in coordinator.get_people() if p.id != person.id}
        errors: dict[str, str] = {}

        if user_input is not None:
            strategy = user_input["strategy"]
            reassign_to = user_input.get("reassign_to")
            try:
                await coordinator.async_delete_person(person.id, strategy, reassign_to)
                self._pending_person_id = None
                return await self.async_step_people()
            except ValidationError as err:
                errors["base"] = "reassign_target_required"
                _LOGGER.debug("HomeRoster options: %s", err)

        schema = vol.Schema(
            {
                vol.Required("strategy", default=STRATEGY_DEACTIVATE): _STRATEGY_SELECTOR,
                vol.Optional("reassign_to"): vol.In(other_people) if other_people else str,
            }
        )
        return self.async_show_form(
            step_id="people_delete_confirm",
            data_schema=schema,
            errors=errors,
            description_placeholders={"person_name": person.name},
        )

    # ------------------------------------------------------------------
    # Categories
    # ------------------------------------------------------------------

    async def async_step_categories(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        coordinator = self._coordinator()
        if coordinator is None:
            return self.async_abort(reason="not_loaded")

        categories = coordinator.get_categories()
        errors: dict[str, str] = {}

        if user_input is not None:
            action = user_input["action"]
            category_id = user_input.get("category_id")
            try:
                if action == ACTION_ADD:
                    if not user_input.get("name"):
                        raise ValidationError("Name erforderlich.")
                    await coordinator.async_create_category(
                        {"name": user_input["name"], "color": user_input.get("color") or "#9e9e9e"}
                    )
                    return await self.async_step_categories()
                if action == ACTION_EDIT:
                    if not category_id:
                        raise ValidationError("Bitte eine Kategorie auswählen.")
                    changes: dict[str, Any] = {}
                    if user_input.get("name"):
                        changes["name"] = user_input["name"]
                    if user_input.get("color"):
                        changes["color"] = user_input["color"]
                    await coordinator.async_update_category(category_id, changes)
                    return await self.async_step_categories()
                if action == ACTION_DELETE:
                    if not category_id:
                        raise ValidationError("Bitte eine Kategorie auswählen.")
                    await coordinator.async_delete_category(category_id)
                    return await self.async_step_categories()
                if action in (ACTION_MOVE_UP, ACTION_MOVE_DOWN):
                    if not category_id:
                        raise ValidationError("Bitte eine Kategorie auswählen.")
                    ordered = [c.id for c in categories]
                    index = ordered.index(category_id)
                    swap_with = index - 1 if action == ACTION_MOVE_UP else index + 1
                    if 0 <= swap_with < len(ordered):
                        ordered[index], ordered[swap_with] = ordered[swap_with], ordered[index]
                        await coordinator.async_reorder_categories(ordered)
                    return await self.async_step_categories()
                if action == ACTION_DONE:
                    return await self.async_step_init()
            except (ValidationError, NotFoundError) as err:
                errors["base"] = "invalid_category"
                _LOGGER.debug("HomeRoster options: %s", err)

        category_choices = {c.id: c.name for c in categories}
        schema = vol.Schema(
            {
                vol.Required("action", default=ACTION_ADD): _manager_action_selector(
                    "category_action"
                ),
                vol.Optional("category_id"): vol.In(category_choices) if category_choices else str,
                vol.Optional("name", default=""): str,
                vol.Optional("color", default=""): str,
            }
        )
        return self.async_show_form(
            step_id="categories",
            data_schema=schema,
            errors=errors,
            description_placeholders={
                "categories_list": ", ".join(c.name for c in categories) or "(keine Kategorien)"
            },
        )
