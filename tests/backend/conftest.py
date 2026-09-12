"""Shared pytest fixtures for the HomeRoster backend test suite."""

from __future__ import annotations

import pytest
import pytest_socket

pytest_plugins = "pytest_homeassistant_custom_component"

# --- Windows compatibility shim -------------------------------------------
# On Windows, asyncio's ProactorEventLoop creates its internal wakeup
# self-pipe via socket.socketpair(), which resolves to a loopback AF_INET
# pair rather than AF_UNIX. pytest-socket's default guard (as configured by
# pytest-homeassistant-custom-component, allow_unix_socket=True) only
# exempts AF_UNIX, so it blocks this purely-internal, purely-local asyncio
# plumbing before a single test can even run. None of these tests perform
# real outbound network I/O, so widening the guard's definition of "local"
# is safe. This must happen at module import time (before any fixture,
# including pytest-asyncio's `event_loop`, is instantiated).
pytest_socket._is_unix_socket = lambda family: True  # noqa: SLF001


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):  # noqa: ARG001
    """Make custom_components/homeroster loadable by Home Assistant's test harness."""
    yield
