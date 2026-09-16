"""Tests for the Lovelace card's static-file registration and its retry
behaviour on transient failure - see __init__.py's _async_register_frontend
and _async_register_frontend_with_retry (added after field reports of the
card intermittently missing after a Home Assistant restart/update, with no
recovery short of a full restart)."""

from __future__ import annotations

from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.setup import async_setup_component

from custom_components.homeroster import (
    DOMAIN,
    FRONTEND_RETRY_DELAYS,
    LOADER_BASE_DELAY_MS,
    LOADER_MAX_ATTEMPTS,
    _async_register_frontend,
    _async_register_frontend_with_retry,
    _build_loader_js,
)


class TestBuildLoaderJs:
    def test_embeds_the_card_url_as_a_valid_js_string_literal(self):
        js = _build_loader_js("/homeroster_static/homeroster-card-abc123.js")
        assert '"/homeroster_static/homeroster-card-abc123.js"' in js

    def test_embeds_the_configured_retry_parameters(self):
        js = _build_loader_js("/homeroster_static/homeroster-card-abc123.js")
        assert f"var MAX_ATTEMPTS = {LOADER_MAX_ATTEMPTS};" in js
        assert f"var BASE_DELAY_MS = {LOADER_BASE_DELAY_MS};" in js

    def test_retries_use_a_distinct_url_per_attempt(self):
        # A browser/WebView that memoizes a *failed* dynamic import() by URL
        # would make retries against the exact same URL pointless (they'd
        # resolve from the cached failure instead of re-fetching) - each
        # attempt after the first must therefore request a different URL.
        js = _build_loader_js("/homeroster_static/homeroster-card-abc123.js")
        assert 'var url = n === 1 ? CARD_URL : CARD_URL + "?retry=" + n;' in js
        assert "import(url)" in js
        assert "import(CARD_URL)" not in js

    def test_safely_escapes_a_url_containing_special_characters(self):
        # Not a real value we'd ever generate ourselves, but proves the
        # embedding can't be broken out of by a hostile/unexpected string.
        js = _build_loader_js('/x/"; alert(1); //.js')
        assert 'var CARD_URL = "/x/\\"; alert(1); //.js"' in js


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
    # Both the card and its loader are registered, both with long-lived
    # caching - see _build_loader_js()'s docstring for why there are two.
    assert len(configs) == 2
    assert all(c.cache_headers is True for c in configs)
    card_config, loader_config = configs
    assert card_config.url_path.startswith("/homeroster_static/homeroster-card-")
    assert loader_config.url_path.startswith("/homeroster_static/homeroster-loader-")

    # add_extra_js_url must point at the loader, not the card directly -
    # otherwise there's no retry and this whole mechanism does nothing.
    add_js_mock.assert_called_once()
    (_hass_arg, registered_url), _kwargs2 = add_js_mock.call_args
    assert registered_url == loader_config.url_path

    # The loader file actually written to disk embeds the real card URL.
    loader_content = Path(loader_config.path).read_text(encoding="utf-8")  # noqa: ASYNC240
    assert card_config.url_path in loader_content


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
