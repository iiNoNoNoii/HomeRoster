"""Permission and validation tests for the homeroster/* websocket API.

Uses the real hass_ws_client fixture (a genuine authenticated websocket
connection into a running Home Assistant test instance) so these exercise
the actual permission checks, not just the coordinator underneath.
"""

from __future__ import annotations

from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.homeroster import websocket_api as fp_ws
from custom_components.homeroster.const import DOMAIN


async def _setup_entry(hass, options=None):
    entry = MockConfigEntry(domain=DOMAIN, data={}, options=options or {"require_person": False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_admin_can_create_event(hass, hass_ws_client):
    await _setup_entry(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "Zahnarzt",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    response = await client.receive_json()
    assert response["success"]
    assert response["result"]["event"]["title"] == "Zahnarzt"


async def test_non_admin_write_blocked_when_allow_non_admin_write_is_false(
    hass, hass_ws_client, hass_read_only_access_token
):
    await _setup_entry(hass, options={"require_person": False, "allow_non_admin_write": False})
    client = await hass_ws_client(hass, hass_read_only_access_token)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "Verboten",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "forbidden"


async def test_non_admin_write_allowed_when_option_enabled(
    hass, hass_ws_client, hass_read_only_access_token
):
    await _setup_entry(hass, options={"require_person": False, "allow_non_admin_write": True})
    client = await hass_ws_client(hass, hass_read_only_access_token)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "Erlaubt",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    response = await client.receive_json()
    assert response["success"]


async def test_non_admin_cannot_manage_people_regardless_of_write_option(
    hass, hass_ws_client, hass_read_only_access_token
):
    await _setup_entry(hass, options={"allow_non_admin_write": True})
    client = await hass_ws_client(hass, hass_read_only_access_token)

    await client.send_json(
        {"id": 1, "type": "homeroster/people/create", "name": "Anna", "color": "#ff0000"}
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "forbidden"


async def test_anyone_authenticated_can_read_events(
    hass, hass_ws_client, hass_read_only_access_token
):
    await _setup_entry(hass, options={"allow_non_admin_write": False})
    client = await hass_ws_client(hass, hass_read_only_access_token)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/get",
            "start": "2026-09-20T00:00:00+00:00",
            "end": "2026-09-21T00:00:00+00:00",
        }
    )
    response = await client.receive_json()
    assert response["success"]
    assert response["result"]["events"] == []


async def test_invalid_event_payload_returns_typed_error(hass, hass_ws_client):
    await _setup_entry(hass, options={"require_person": False})
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "",  # empty title -> invalid
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "invalid_data"


async def test_unknown_person_reference_returns_typed_error(hass, hass_ws_client):
    await _setup_entry(hass, options={"require_person": False})
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "X",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
            "person_ids": ["does-not-exist"],
        }
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "invalid_data"


async def test_update_conflict_surfaces_current_server_version(hass, hass_ws_client):
    await _setup_entry(hass, options={"require_person": False})
    client = await hass_ws_client(hass)

    await client.send_json(
        {
            "id": 1,
            "type": "homeroster/events/create",
            "title": "Original",
            "start": "2026-09-20T14:00:00+02:00",
            "end": "2026-09-20T15:00:00+02:00",
        }
    )
    created = await client.receive_json()
    event_id = created["result"]["event"]["id"]

    await client.send_json(
        {
            "id": 2,
            "type": "homeroster/events/update",
            "event_id": event_id,
            "title": "Erste Änderung",
        }
    )
    await client.receive_json()

    await client.send_json(
        {
            "id": 3,
            "type": "homeroster/events/update",
            "event_id": event_id,
            "title": "Konflikt",
            "expected_version": 1,  # stale - server is now at version 2
        }
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "conflict"
    assert response["error"]["current"]["title"] == "Erste Änderung"


async def test_deleting_unknown_event_returns_not_found(hass, hass_ws_client):
    await _setup_entry(hass)
    client = await hass_ws_client(hass)

    await client.send_json(
        {"id": 1, "type": "homeroster/events/delete", "event_id": "does-not-exist"}
    )
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "not_found"


def test_websocket_commands_are_registered_exactly_once(hass):
    # async_register_websocket_commands is idempotent (guarded by a hass.data
    # flag) since it is called from async_setup, not per config entry.
    fp_ws.async_register_websocket_commands(hass)
    fp_ws.async_register_websocket_commands(hass)
    assert hass.data[f"{DOMAIN}_ws_registered"] is True
