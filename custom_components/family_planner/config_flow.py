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
    CONF_ALLOW_NON_ADMIN_WRITE,
    CONF_ENABLE_CATEGORIES,
    CONF_ENABLE_STATUS,
    CONF_FIRST_WEEKDAY,
    CONF_REMINDER_TICK_SECONDS,
    CONF_REQUIRE_PERSON,
    CONF_TODAY_SENSOR_LIMIT,
    DEFAULT_ALLOW_NON_ADMIN_WRITE,
    DEFAULT_ENABLE_CATEGORIES,
    DEFAULT_ENABLE_STATUS,
    DEFAULT_FIRST_WEEKDAY,
    DEFAULT_REMINDER_TICK_SECONDS,
    DEFAULT_REQUIRE_PERSON,
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


class FamilyPlannerConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle the initial setup of Family Planner (no external account needed)."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is not None:
            return self.async_create_entry(title="Family Planner", data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> FamilyPlannerOptionsFlow:
        return FamilyPlannerOptionsFlow()


class FamilyPlannerOptionsFlow(config_entries.OptionsFlow):
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
            menu_options=["settings", "people", "categories"],
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
            }
        )
        if user_input is not None:
            new_options = dict(self.config_entry.options)
            new_options.update(user_input)
            return self.async_create_entry(title="", data=new_options)
        return self.async_show_form(step_id="settings", data_schema=schema)

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

        if user_input is not None:
            action = user_input["action"]
            person_id = user_input.get("person_id")
            try:
                if action == ACTION_ADD:
                    if not user_input.get("name"):
                        raise ValidationError("Name erforderlich.")
                    await coordinator.async_create_person(
                        {
                            "name": user_input["name"],
                            "color": user_input.get("color") or "#3f51b5",
                            "role": user_input.get("role"),
                        }
                    )
                    return await self.async_step_people()
                if action == ACTION_EDIT:
                    if not person_id:
                        raise ValidationError("Bitte eine Person auswählen.")
                    changes: dict[str, Any] = {}
                    if user_input.get("name"):
                        changes["name"] = user_input["name"]
                    if user_input.get("color"):
                        changes["color"] = user_input["color"]
                    if user_input.get("role"):
                        changes["role"] = user_input["role"]
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
                _LOGGER.debug("Family Planner options: %s", err)

        person_choices = {p.id: f"{p.name} ({'aktiv' if p.active else 'inaktiv'})" for p in people}
        schema = vol.Schema(
            {
                vol.Required("action", default=ACTION_ADD): _manager_action_selector(
                    "people_action"
                ),
                vol.Optional("person_id"): vol.In(person_choices) if person_choices else str,
                vol.Optional("name", default=""): str,
                vol.Optional("color", default=""): str,
                vol.Optional("role"): _ROLE_SELECTOR,
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
                _LOGGER.debug("Family Planner options: %s", err)

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
                _LOGGER.debug("Family Planner options: %s", err)

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
