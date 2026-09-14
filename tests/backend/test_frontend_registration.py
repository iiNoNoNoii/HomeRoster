"""Tests for the Lovelace card's static-file registration and its retry
behaviour on transient failure - see __init__.py's _async_register_frontend
and _async_register_frontend_with_retry (added after field reports of the
card intermittently missing after a Home Assistant restart/update, with no
recovery short of a full restart)."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.setup import async_setup_component

from custom_components.homeroster import (
    DOMAIN,
    FRONTEND_RETRY_DELAYS,
    _async_register_frontend,
    _async_register_frontend_with_retry,
)


async def test_missing_card_file_raises_instead_of_silently_skipping(hass, tmp_path):
    with patch("custom_components.homeroster.WWW_PATH", tmp_path):
        with pytest.raises(FileNotFoundError):
            await _async_register_frontend(hass)
    assert not hass.data.get(f"{DOMAIN}_frontend_registered")


class _FakeStaticPathConfig:
    """Stand-in for homeassistant.components.http.StaticPathConfig, which
    doesn't exist yet on the pinned test-harness HA core (see the ImportError
    handling this same gap gets in production - StaticPathConfig was added
    in HA 2024.7, below our own min_ha_version but above the test pin)."""

    def __init__(self, url_path, path, cache_headers=True):
        self.url_path = url_path
        self.path = path
        self.cache_headers = cache_headers


async def test_successful_registration_uses_explicit_long_lived_caching(hass, tmp_path):
    assert await async_setup_component(hass, "http", {})
    card_file = tmp_path / "homeroster-card.js"
    card_file.write_text("console.log('x');")
    register_mock = AsyncMock()
    with (
        patch("custom_components.homeroster.WWW_PATH", tmp_path),
        # create=True for both: the pinned test-harness HA core (see
        # conftest.py / README) predates async_register_static_paths and
        # StaticPathConfig (added HA 2024.7, below our own min_ha_version) -
        # same gap already documented elsewhere in this test suite.
        patch.object(hass.http, "async_register_static_paths", register_mock, create=True),
        patch(
            "homeassistant.components.http.StaticPathConfig",
            _FakeStaticPathConfig,
            create=True,
        ),
        patch("custom_components.homeroster.add_extra_js_url") as add_js_mock,
    ):
        await _async_register_frontend(hass)

    assert hass.data[f"{DOMAIN}_frontend_registered"] is True
    (configs,), _kwargs = register_mock.call_args
    assert configs[0].cache_headers is True
    add_js_mock.assert_called_once()


async def test_transient_failure_schedules_a_retry(hass):
    with (
        patch(
            "custom_components.homeroster._async_register_frontend",
            AsyncMock(side_effect=RuntimeError("transient")),
        ),
        patch("custom_components.homeroster.async_call_later") as call_later_mock,
    ):
        await _async_register_frontend_with_retry(hass)

    call_later_mock.assert_called_once()
    (called_hass, delay, _callback), _kwargs = call_later_mock.call_args
    assert called_hass is hass
    assert delay == FRONTEND_RETRY_DELAYS[0]


async def test_gives_up_after_exhausting_retries(hass):
    with (
        patch(
            "custom_components.homeroster._async_register_frontend",
            AsyncMock(side_effect=RuntimeError("still broken")),
        ),
        patch("custom_components.homeroster.async_call_later") as call_later_mock,
    ):
        await _async_register_frontend_with_retry(hass, attempt=len(FRONTEND_RETRY_DELAYS))

    call_later_mock.assert_not_called()


async def test_old_home_assistant_version_does_not_retry(hass):
    with (
        patch(
            "custom_components.homeroster._async_register_frontend",
            AsyncMock(side_effect=ImportError("too old")),
        ),
        patch("custom_components.homeroster.async_call_later") as call_later_mock,
    ):
        await _async_register_frontend_with_retry(hass)

    call_later_mock.assert_not_called()
