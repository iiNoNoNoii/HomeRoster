"""Tests for config_flow.py: new default-* options and the color helpers."""

from __future__ import annotations

import voluptuous as vol
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster.config_flow import (
    HomeRosterOptionsFlow,
    _entity_id_to_notify_service,
    _hex_to_rgb,
    _notify_service_to_entity_id,
    _rgb_to_hex,
)
from custom_components.homeroster.const import (
    CONF_DEFAULT_COLORS,
    CONF_DEFAULT_ICONS,
    CONF_DEFAULT_REMINDER_MINUTES,
    CONF_LANGUAGE,
    CONF_SEND_MOBILE_NOTIFICATIONS,
    DEFAULT_COLORS,
    DEFAULT_ICONS,
    DEFAULT_LANGUAGE,
    DEFAULT_PERSON_COLORS,
    DEFAULT_REMINDER_MINUTES,
    DEFAULT_SEND_MOBILE_NOTIFICATIONS,
    DOMAIN,
)


def _schema_defaults(schema: vol.Schema) -> dict:
    defaults = {}
    for key in schema.schema:
        default = getattr(key, "default", vol.UNDEFINED)
        if default is vol.UNDEFINED:
            continue
        defaults[str(key)] = default() if callable(default) else default
    return defaults


async def test_settings_step_defaults_include_new_options(hass):
    """The settings form defaults default_reminder_minutes/colors/icons sensibly."""
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    flow = HomeRosterOptionsFlow()
    flow.hass = hass
    flow.config_entry = entry

    result = await flow.async_step_settings()
    defaults = _schema_defaults(result["data_schema"])

    assert defaults[CONF_DEFAULT_REMINDER_MINUTES] == 60 == DEFAULT_REMINDER_MINUTES
    assert defaults[CONF_DEFAULT_COLORS] == DEFAULT_COLORS
    assert defaults[CONF_DEFAULT_ICONS] == DEFAULT_ICONS
    # DEFAULT_COLORS is the DEFAULT_PERSON_COLORS list joined with commas.
    assert defaults[CONF_DEFAULT_COLORS].split(",") == DEFAULT_PERSON_COLORS
    assert defaults[CONF_LANGUAGE] == "auto" == DEFAULT_LANGUAGE
    assert defaults[CONF_SEND_MOBILE_NOTIFICATIONS] is True == DEFAULT_SEND_MOBILE_NOTIFICATIONS


async def test_settings_step_saves_new_options_via_create_entry(hass):
    """Submitting the settings form returns the three new options as-is."""
    entry = MockConfigEntry(domain=DOMAIN, data={}, options={})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    flow = HomeRosterOptionsFlow()
    flow.hass = hass
    flow.config_entry = entry

    result = await flow.async_step_settings(
        {
            "require_person": True,
            "enable_categories": True,
            "enable_status": True,
            "allow_non_admin_write": True,
            "first_weekday": "monday",
            "today_sensor_limit": 20,
            "reminder_tick_seconds": 30,
            CONF_DEFAULT_REMINDER_MINUTES: 15,
            CONF_DEFAULT_COLORS: "#111111,#222222",
            CONF_DEFAULT_ICONS: "mdi:star,mdi:home",
            CONF_LANGUAGE: "en",
            CONF_SEND_MOBILE_NOTIFICATIONS: False,
        }
    )
    assert result["type"] == "create_entry"
    assert result["data"][CONF_DEFAULT_REMINDER_MINUTES] == 15
    assert result["data"][CONF_DEFAULT_COLORS] == "#111111,#222222"
    assert result["data"][CONF_DEFAULT_ICONS] == "mdi:star,mdi:home"
    assert result["data"][CONF_LANGUAGE] == "en"
    assert result["data"][CONF_SEND_MOBILE_NOTIFICATIONS] is False


async def test_default_reminder_minutes_readable_via_entry_options(hass):
    """default_reminder_minutes set on a config entry is readable via entry.options,
    exactly as websocket_api.py's ws_get_config exposes it to the card
    (`dict(coordinator.entry.options)`, unchanged by this feature)."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={},
        options={CONF_DEFAULT_REMINDER_MINUTES: 15},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    assert coordinator.entry.options[CONF_DEFAULT_REMINDER_MINUTES] == 15
    assert dict(coordinator.entry.options) == {CONF_DEFAULT_REMINDER_MINUTES: 15}


def test_hex_to_rgb_and_rgb_to_hex_round_trip():
    for hex_color in ["#3f51b5", "#000000", "#ffffff", "#e53935", "#00ACC1"]:
        rgb = _hex_to_rgb(hex_color)
        assert len(rgb) == 3
        assert all(0 <= component <= 255 for component in rgb)
        assert _rgb_to_hex(rgb) == hex_color.lower()


def test_hex_to_rgb_falls_back_for_malformed_input():
    assert _hex_to_rgb(None) == _hex_to_rgb("#3f51b5")
    assert _hex_to_rgb("not-a-color") == _hex_to_rgb("#3f51b5")
    assert _hex_to_rgb("#zzzzzz") == _hex_to_rgb("#3f51b5")


def test_rgb_to_hex_clamps_out_of_range_components():
    assert _rgb_to_hex([-10, 300, 128]) == "#00ff80"


async def test_language_and_notifications_readable_via_entry_options(hass):
    """language/send_mobile_notifications set on a config entry are readable
    via entry.options, exactly as websocket_api.py's ws_get_config exposes
    them to the card (`dict(coordinator.entry.options)`, unchanged by this
    feature)."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={},
        options={CONF_LANGUAGE: "de", CONF_SEND_MOBILE_NOTIFICATIONS: False},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    coordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    assert coordinator.entry.options[CONF_LANGUAGE] == "de"
    assert coordinator.entry.options[CONF_SEND_MOBILE_NOTIFICATIONS] is False


def test_notify_service_to_entity_id_and_back_round_trip():
    assert _notify_service_to_entity_id("mobile_app_pixel_7") == "notify.mobile_app_pixel_7"
    assert _entity_id_to_notify_service("notify.mobile_app_pixel_7") == "mobile_app_pixel_7"
    assert (
        _entity_id_to_notify_service(_notify_service_to_entity_id("mobile_app_pixel_7"))
        == "mobile_app_pixel_7"
    )


def test_notify_service_conversion_handles_empty_values():
    assert _notify_service_to_entity_id(None) is None
    assert _notify_service_to_entity_id("") is None
    assert _entity_id_to_notify_service(None) is None
    assert _entity_id_to_notify_service("") is None
