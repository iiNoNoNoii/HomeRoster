*[Deutsche Version](README.de.md)*

# HomeRoster

A fully **local** digital family calendar for Home Assistant – no cloud
service, no external account, no internet connection needed for normal
operation. HomeRoster consists of a custom integration (Python) as the
backend and its own Lovelace card (TypeScript/Lit) as the frontend.

> **No Google Calendar, no iCloud, no vendor cloud service required.** All
> events, people and categories are stored exclusively in Home Assistant's
> own storage.

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/iinononoii)

## Contents

- [Feature overview](#feature-overview)
- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Installation](#installation)
- [Setup](#setup)
- [Card configuration](#card-configuration)
- [People management](#people-management)
- [Categories and status](#categories-and-status)
- [Recurring events](#recurring-events)
- [Reminders](#reminders)
- [Entities, sensors and services](#entities-sensors-and-services)
- [Automation examples](#automation-examples)
- [Additional dashboard cards](#additional-dashboard-cards)
- [Backup, import and export](#backup-import-and-export)
- [Privacy and permissions](#privacy-and-permissions)
- [Diagnostics](#diagnostics)
- [Known limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Upgrade and migration notes](#upgrade-and-migration-notes)
- [Development](#development)
- [Acceptance criteria (MVP)](#acceptance-criteria-mvp)
- [Development phases](#development-phases)
- [License](#license)

## Feature overview

- A dedicated calendar card with agenda, day, week and month views (in that
  tab order). The week view shows a rolling 7-day preview starting from
  the currently selected date (like a weather app's forecast), with its
  own section per day, instead of a fixed Monday–Sunday calendar week.
- Events with title, subtitle, location, description, category, color,
  icon, status, multiple assigned people, reminders and optional
  recurrence.
- Multiple people per event – internally a single record, no duplicates.
- Overlapping events are shown side by side in their own lanes, never
  hidden behind each other.
- A dedicated people and category manager with a confirmation prompt when
  deleting a person (events are never lost).
- Standards-compliant `calendar` entities (an overall calendar plus one
  filtered calendar per active person), usable from any other calendar
  card and in automations.
- Sensors for today's events, tomorrow's events, the next event, the next
  birthday – each also available per person – plus an "event active"
  binary sensor.
- Services/actions for event CRUD, queries and status changes, with schema
  and selectors usable in the UI action editor.
- A WebSocket API for the card: events, people and categories are never
  held exclusively in the browser.
- German and English translation, dark mode and mobile layout via Home
  Assistant theme variables. The card language can also be pinned to
  German or English for the whole installation, independent of each
  individual user's own language setting (see
  [Card configuration](#card-configuration)).
- Optional push notifications for reminders via the Home Assistant
  Companion App, in addition to the existing reminder event (see
  [Reminders](#reminders)).

An exact mapping of features to MVP/Phase 2/Phase 3 is at the end of this
README under [Development phases](#development-phases).

## Screenshots

This README deliberately contains no embedded image files – there is no
live Home Assistant instance available for this documentation pass to
capture authentic screenshots from, and fabricated placeholder images
would be misleading. Here's how to add your own screenshots to your
repository:

1. Set up the card on a dashboard (see below) and fill it with a few
   example events.
2. Capture the week view, month view and the event dialog as PNG files
   (browser screenshot or the Home Assistant app).
3. Save the files under `docs/screenshots/`, e.g.
   `docs/screenshots/week-view.png`, and embed them here with
   `![Week view](docs/screenshots/week-view.png)`.

## Requirements

- **Home Assistant Core 2024.10.0 or newer.** This integration relies on
  calendar entity CRUD support (`CalendarEntityFeature.CREATE_EVENT` /
  `UPDATE_EVENT` / `DELETE_EVENT`) as well as `async_register_static_paths`
  for automatically registering the Lovelace card – both are Home
  Assistant APIs that only became available in 2024. `manifest.json` sets
  `min_ha_version` accordingly; older installations refuse to load the
  integration in a controlled way.
- HACS (recommended) or access to the `custom_components` directory for a
  manual installation.
- No further cloud accounts, no additional hardware.

## Installation

### Via HACS

1. Open HACS → **Integrations** → menu (⋮) → **Custom repositories**.
2. Add this project's repository URL
   (`https://github.com/iiNoNoNoii/HomeRoster`), choose category
   **Integration**, and add it.
3. Search for "HomeRoster" in HACS and install it.
4. Restart Home Assistant.

### Manual

1. Copy this repository's `custom_components/homeroster` folder to
   `<config>/custom_components/homeroster`.
2. Make sure `custom_components/homeroster/www/homeroster-card.js`
   is present (it's already built and included in the repository; see
   [Development](#development) if you want to rebuild the card yourself).
3. Restart Home Assistant.

## Setup

1. **Settings → Devices & Services → Add Integration** → search for
   "HomeRoster" → set it up. No account and no external sign-in is
   required.
2. The integration registers the Lovelace card automatically (via
   `add_extra_js_url`) – in general, **you don't need to add a Lovelace
   resource manually**. The exact URL contains a cache-busting hash and
   changes with every card update (e.g.
   `/homeroster_static/homeroster-card-<hash>.js`); the currently
   registered URL is logged to the Home Assistant log (an INFO message
   "HomeRoster: Lovelace card successfully registered at …") and shown
   under **Settings → Dashboards → Resources**. If the card still doesn't
   show up in the card picker, add it there manually with exactly that
   URL, type "JavaScript Module".
3. Use **Manage people**/**Manage categories** in the card (or the
   integration options, see below) to create your first family members.
4. Add the card to a dashboard (see the next section).

Basic admin settings (e.g. whether at least one person per event is
required, whether non-administrators are allowed to edit events, the card
language, or whether reminders are also sent via the Home Assistant app)
are found under **Settings → Devices & Services → HomeRoster →
Configure**. There you can also create, edit, reorder, disable and delete
people and categories without the card being loaded – this is the
frontend-independent fallback path; day to day, managing people/categories
directly in the card is more convenient.

## Card configuration

```yaml
type: custom:homeroster-card
title: Familienkalender
entity: calendar.homeroster
default_view: week
people:
  - anna
  - tom
  - mia
preselected_people: []
visible_categories: []
show_filters: true
show_search: true
show_add_button: true
allow_edit: true
show_done_events: true
show_cancelled_events: false
show_weekends: true
show_week_numbers: true
start_hour: 6
end_hour: 22
time_step: 30
time_format: auto
max_events_per_day: 3
agenda_days: 14
dim_past_events: true
color_mode: person
compact: false
show_now_line: true
highlight_today: true
read_only: false
first_weekday: monday
```

| Option | Description | Default |
| --- | --- | --- |
| `title` | Card title | "Familienkalender" |
| `default_view` | `agenda` / `day` / `week` / `month` | `week` |
| `people` | Show only these person IDs as filter chips (empty = all active) | empty |
| `preselected_people` | Person IDs preselected when the card opens | empty |
| `visible_categories` | Show only these category IDs (empty = all active) | empty |
| `show_filters` / `show_search` / `show_add_button` | Show/hide the filter bar, search field, and add ("+") button | `true` |
| `allow_edit` | Allow editing in general (see also `read_only`) | `true` |
| `read_only` | Kiosk/read-only mode: no editing actions in the UI | `false` |
| `show_done_events` / `show_cancelled_events` | Show done/cancelled events | `true` / `false` |
| `show_weekends` / `show_week_numbers` | Show weekends, and show calendar week numbers (the latter now effectively only affects the month view, since the week view became a rolling forecast – see the note below) | `true` |
| `start_hour` / `end_hour` / `time_step` | Visible time range and time grid (minutes) in the day view (the week view is a day-by-day list with no time grid – see the note below) | `6` / `22` / `30` |
| `time_format` | `auto` (from the Home Assistant locale), `12`, `24` | `auto` |
| `max_events_per_day` | Max. visible events per day in the month view, remainder shown as "+N more" | `3` |
| `agenda_days` | Time span of the agenda view, in days | `14` |
| `dim_past_events` | Dim past events | `true` |
| `color_mode` | `person` or `category` as the primary color source | `person` |
| `compact` | More compact layout (smaller row heights) | `false` |
| `show_now_line` | Red "now" line in the day view | `true` |
| `highlight_today` | Highlight today's date | `true` |
| `first_weekday` | `monday` or `sunday` (empty = from the Home Assistant locale); determines the first weekday of the month view (the week view is no longer tied to a fixed calendar week now that it's a rolling 7-day preview – see the note below) | `monday` |

**Note on the week view:** The week view no longer shows a fixed calendar
week (Monday–Sunday or Sunday–Saturday); instead it always shows the 7
days starting from whatever date is currently selected (today by default,
or wherever you've navigated to) – similar to a weather app's 7-day
forecast. Each day is listed as its own section with that day's actual
events, rather than as a side-by-side time grid. As a result,
`start_hour`, `end_hour`, `time_step` and `show_now_line` now only apply to
the day view, and `show_week_numbers`/`first_weekday` effectively only
matter for the month view, since the week view is no longer bound to a
single calendar week. The day view itself is unchanged: still an
hour-by-hour time grid for a single day (there is no separate "Today" view
any more – the "Heute"/"Today" nav-jump button on the day/week/month/agenda
views already jumps to exactly the same thing).

**Card language:** The integration option "Card language" (**Settings →
Devices & Services → HomeRoster → Configure → General settings**) lets
you pin the card's language to German or English, regardless of each
individual viewer's own Home Assistant language setting. The default,
"Automatic", still follows the language of whichever user is currently
viewing the card. This is especially useful for a shared wall-tablet
dashboard where you don't want the language to change depending on who's
logged in.

A visual card editor (`ha-form`-based) is available in the Lovelace UI
editor and covers the most important options.

## People management

The people icon in the card's header (visible only to administrators)
opens people management: adding, editing, reordering (arrows),
disabling/enabling and deleting.

**Deleting** a person always prompts for a strategy:

- **Disable only** – the person disappears from selection lists; existing
  events remain unchanged.
- **Remove from events** – the person is removed from all assigned
  events; the events themselves are kept (possibly with no person
  assigned).
- **Reassign events to another person** – all events belonging to the
  deleted person are reassigned to a target person (duplicates are
  avoided).
- **Keep events with no person assigned** – technically identical to
  "Remove from events": an event is never lost, only the person
  assignment is removed.

A person can optionally be linked to an existing `person.*` entity (the
"Linked person" field in the integration options); this is purely
informational and not required.

Also optional, a **notification target** can be set for each person (in
the card's people manager, or in the people-editing form of the
integration options) – a Home Assistant `notify.*` service, chosen via a
standard entity picker. Typically this is one of the services the Home
Assistant Companion App automatically creates per device (e.g.
`notify.mobile_app_pixels_phone`). If a target is set and the "Send
reminders via the Home Assistant app" integration option is enabled, that
person additionally receives push notifications for their reminders (see
[Reminders](#reminders)).

## Categories and status

Eight default categories are pre-populated (School, Work, Doctor, Leisure,
Birthday, Vacation, Household, Other) and can be freely customized,
reordered and disabled via category management. Event status (`planned`,
`confirmed`, `tentative`, `done`, `cancelled`) can be set per event;
depending on the card's settings, cancelled events are either hidden or
shown with a strikethrough.

## Recurring events

The data model supports RFC 5545 RRULE strings (the `rrule` field) and is
prepared for future extensions (`recurrence_id`, `exdates`). **Currently
implemented (Phase 1/2):**

- Daily, weekly, monthly or yearly recurrence, with an optional end date,
  directly in the event dialog.
- Editing/deleting the **entire series**.
- Deleting a **single instance** (adds an `EXDATE` without touching the
  rest of the series).
- Expanding a series is always limited to the requested time range (see
  [Development](#development)) – it never materializes an unbounded number
  of instances ahead of time.

**Not yet implemented (Phase 3):** editing a single series instance, or
"this and following instances" – attempting this via the native
`calendar.update_event`/`calendar.delete_event` action with
`recurrence_range` gives the integration's clear error message instead of
a silently wrong result.

## Reminders

Events can store multiple reminder offsets (at start time, 5/15/30/60
minutes before, 1 day before, or a freely chosen number of minutes). The
integration fires the `homeroster_reminder_due` event when a reminder
is due, which an automation then evaluates (see [Automation
examples](#automation-examples)); this fully decouples delivery (mobile
app, TTS, lights, …) from the calendar.

Optionally, the integration can also deliver reminders automatically as a
push notification via the Home Assistant Companion App. Via the
integration option **"Send reminders via the Home Assistant app"**
(**Settings → Devices & Services → HomeRoster → Configure**, default:
on), the integration automatically calls the `notify.*` service configured
for each assigned person, at that person's configured reminder time – in
addition to (not instead of) the `homeroster_reminder_due` event, so
existing custom automations keep working unchanged. This requires **both**
conditions to be true: the global option is enabled, **and** that specific
person has a notification target configured (see [People
management](#people-management)). If either condition isn't met, nothing
changes from today's behavior – only the bus event is still fired. The
integration therefore still never forces notifications on you; they're
entirely optional and opt-in per person.

Behavior in edge cases:

| Situation | Behavior |
| --- | --- |
| Restart shortly before a reminder | The reminder is checked and fired normally after startup, as soon as the first check tick runs (default: every 30s). |
| Restart while an event is in progress | `homeroster_event_started` is fired retroactively on the first tick after startup, provided the event is still active at that point; the "active" sensors show the correct state immediately after loading. |
| Editing an event | The set of already-fired reminders stays bound to the (event ID, instance, offset) combination; changing the time/offsets can make the same reminder become due again. |
| Deleting an event | Pending, not-yet-fired reminders simply lapse. |
| Daylight saving time change | All internal time comparisons run in UTC; the local timezone is only used for display and for all-day events – DST changes never shift reminder times. |
| Missed reminder (Home Assistant was offline) | If the reminder is caught up within 1 hour of its actual due time, the event still fires (once). If the due time is further in the past, the reminder is marked as "seen" but is **not** fired retroactively, to avoid a flood of stale notifications. |

Fired reminders are persisted and automatically cleaned up after 48 hours
so the storage file doesn't grow indefinitely.

## Entities, sensors and services

**Calendar entities**

- `calendar.homeroster` – all events; supports creating/editing/
  deleting via the native `calendar.create_event` / `calendar.update_event`
  / `calendar.delete_event` action.
- `calendar.homeroster_<person>` – a read-only calendar filtered by
  person, one per active person (entity ID derived from the person's name,
  e.g. `calendar.homeroster_anna`).

**Sensors**

- `sensor.homeroster_events_today` / `..._today_<person>` – count
  (state) and list (the `events` attribute, capped at 20) of today's
  events.
- `sensor.homeroster_events_tomorrow` – count of tomorrow's events.
- `sensor.homeroster_next_event` / `..._next_event_<person>` – a
  timestamp sensor; state = the ISO timestamp of the next (or currently
  running) event, or "unknown"; attributes include title, location,
  people, category.
- `sensor.homeroster_next_reminder` / `..._next_reminder_<person>` – a
  timestamp sensor; state = the due time of the *soonest upcoming
  reminder*, not necessarily the reminder for the next event – a later
  event with a longer lead time can be due before an earlier one with a
  short lead time (e.g. a 15:00 event with a 60-minute reminder is due at
  14:00, before a 14:30 event with only a 5-minute reminder). Meant for
  dashboard display; attributes carry the event's title, start, location,
  assigned people (`person_names`) and the reminder's `offset_minutes`.
- `sensor.homeroster_reminder_due` / `..._reminder_due_<person>` – the
  entity to build **notification automations** against: its state changes
  to a fresh timestamp every single time a reminder actually fires (never
  stuck "on", never skips a second reminder due in the same tick), with
  the same attributes as `next_reminder` above. Trigger a State Trigger
  with no `to:` on this entity to react to every reminder – see
  [Automation examples](#automation-examples) #6 for a full push
  notification example. The per-person variant only fires for reminders on
  events that person is assigned to.
- `sensor.homeroster_next_birthday` – the next event in the
  "Birthday" category, if any.
- `binary_sensor.homeroster_event_active` /
  `..._event_active_<person>` – on as long as at least one (non-cancelled)
  event is currently active.

Sensors update only on actual changes (event created/changed/deleted,
start/end transitions, day changes) – not on a per-second basis.

**Services/actions** (domain `homeroster`; see `services.yaml` for
all fields and selectors):

`create_event`, `update_event`, `delete_event`, `get_events`,
`get_today_events`, `get_next_event`, `duplicate_event`,
`set_event_status`.

**Events on the event bus:** `homeroster_event_created`,
`homeroster_event_updated`, `homeroster_event_deleted`,
`homeroster_event_started`, `homeroster_event_ended`,
`homeroster_reminder_due`. Every payload contains at least `event_id`,
`title`, `start`, `end`, `all_day`, `person_ids` – deliberately without
description/location, so as not to spread unnecessary content across the
event bus.

## Automation examples

Complete, copy-ready examples are in
[`docs/automations.yaml`](docs/automations.yaml):

1. A 07:00 summary of today's events via
   `homeroster.get_today_events` + a notification.
2. A reminder 30 minutes before an event for a specific person, via
   `homeroster_reminder_due`.
3. Reacting to newly created/changed events (a logbook entry).
4. An LED hint when an event starts (`homeroster_event_started`).
5. Automatically marking an event done when it ends
   (`homeroster_event_ended` + `homeroster.set_event_status`).
6. A push notification for every reminder (title, who, lead time, tap to
   open the dashboard), built on `sensor.homeroster_reminder_due` instead
   of the bus event – see [Entities, sensors and
   services](#entities-sensors-and-services) above for why that sensor
   exists alongside `homeroster_reminder_due`.

Note on tap-to-open: a notification's `clickAction` can open the dashboard
view that hosts the card (example #6 does this), but Home Assistant has no
built-in way to deep-link straight into *one specific event's* detail
dialog – that would require the card itself to read an event ID from the
URL and auto-open that event on load, which it doesn't do today.

Template examples for dashboard text (see also
[`docs/dashboards.yaml`](docs/dashboards.yaml)):

```jinja2
Heute stehen {{ states('sensor.homeroster_events_today') }} Termine an.
```

```jinja2
{% set next = states.sensor.homeroster_next_event %}
Der nächste Termin ist {{ next.attributes.title }} um
{{ as_timestamp(next.state) | timestamp_custom('%H:%M', true) }} Uhr.
```

```jinja2
{% if states('sensor.homeroster_events_today_mia') | int(0) == 0 %}
Mia hat heute keine Termine.
{% endif %}
```

Querying all events between two points in time (e.g. in a script):

```yaml
- action: homeroster.get_events
  data:
    start: "2026-09-20T00:00:00+02:00"
    end: "2026-09-27T00:00:00+02:00"
  response_variable: woche
```

## Additional dashboard cards

Rather than shipping extra custom card types of its own, the integration
provides robust sensor attributes and example configurations for native
cards (`markdown`, `tile`) – see
[`docs/dashboards.yaml`](docs/dashboards.yaml) for a "Today" tile, a "Next
event" tile and a per-person tile.

## Backup, import and export

All data lives under `<config>/.storage/homeroster_<entry_id>`, so
it's automatically part of every regular Home Assistant backup.

In addition, the card (for administrators) offers **JSON export** and
**JSON import** via the people-management/settings dialogs, or directly
via the WebSocket actions `homeroster/export_json` and
`homeroster/import_json`:

- Export produces people, categories and events as a single JSON
  document.
- Import validates every entry server-side; invalid entries are skipped
  and listed in the result instead of aborting the entire import.
- If an event ID already exists, you choose a conflict strategy: **skip**
  (default), **replace**, or **duplicate** (new ID). Nothing is ever
  silently overwritten.

**ICS import/export is not part of this release** (see [Known
limitations](#known-limitations)).

## Privacy and permissions

- No external requests, no tracking, no telemetry.
- All WebSocket commands run over Home Assistant's regular, authenticated
  connection – there is no additional, unauthenticated HTTP endpoint.
- **Reading** (querying events, people, categories): any signed-in Home
  Assistant user.
- **Creating/editing/deleting events**: allowed for non-administrators by
  default; the integration option "Non-administrators may edit events" can
  restrict this to administrators.
- **People, categories, import/export**: administrators only, always.
- All input is validated server-side (title/description/location etc. are
  never rendered as unfiltered HTML – the card uses Lit templates with
  automatic escaping, no `innerHTML` injection).
- If the optional push notification via the Home Assistant app is enabled
  (see [Reminders](#reminders)), the event title and a time reference
  (e.g. "in 30 minutes") are sent via Home Assistant's own,
  already-authenticated `notify` service call to the device configured for
  that person – exactly the same mechanism any other Home Assistant
  automation already uses to notify via the Companion App. No third-party
  service is contacted.

Home Assistant currently offers no finer-grained permission control for
custom integrations than "administrator yes/no" plus general user
activity – exact, role-based permissions (e.g. "a child may only see their
own events") are therefore **not** possible, and this project does not
pretend otherwise.

## Diagnostics

**Settings → Devices & Services → HomeRoster → Download diagnostics**
provides only metadata: integration version, schema version, number of
people/categories/events, earliest/latest event date, last storage error,
migration status. **No** event titles, descriptions, locations or person
names are exported.

## Known limitations

- No drag-and-drop for moving events (deliberately not implemented, per
  the project brief: "only implement it if it works reliably" – for a
  touch-operated wall tablet, the risk of accidental moves without
  extensive touch-threshold testing is too high).
- Editing a single instance of a recurring series (only deleting an
  instance is possible; "this and following" is not implemented).
- ICS import/export is not included (Phase 3).
- The people-management UI inside Home Assistant's integration options
  (the options flow) is deliberately kept simple (a form rather than a
  drag-and-drop list) – the convenient management experience lives in the
  card itself.
- No fine-grained permission management beyond "administrator" (see
  [Privacy and permissions](#privacy-and-permissions)).
- Voice assistant integration ("What events do we have today?") is not
  part of this release; the building blocks needed for it (services,
  sensors) already exist and can be reused in a separate Assist/intent
  integration.

## Troubleshooting

| Problem | Solution |
| --- | --- |
| Browser console shows `Uncaught (in promise) Error: Custom element not found: homeroster-card` | The card was not (or is no longer) loaded by the browser. Causes, in order of likelihood: **(1)** The integration was installed/updated before this version, when `http` wasn't yet declared as a `dependencies` entry in `manifest.json` – fully restart Home Assistant (not just reload the integration) so `hass.http` is guaranteed to be available by setup time. **(2)** An already-open browser tab missed the registration, because `add_extra_js_url` only takes effect when the frontend's start page (re)loads – hard-refresh the tab (Ctrl/Cmd+Shift+R) or reopen the dashboard. **(3)** `custom_components/homeroster/www/homeroster-card.js` is missing or corrupted – search the Home Assistant log for `HomeRoster`: a WARNING line points to a missing file, an ERROR line (with a full traceback) to an unexpected registration failure; in both cases the backend/sensors/calendar keep working normally regardless. A successful registration is logged as an INFO line with the actually-used URL. |
| It works on one device/browser but shows "Custom element not found" on another (e.g. a phone in the Companion App, while it's fine on a desktop browser) | That specific device cached an old version of the frontend start page – most commonly after renaming, updating, or reinstalling the integration, since the served script URL includes a content hash (and, before a rename, a different path entirely) that changes each time. Fixes, in order of ease: **(1)** Fully close and reopen the Companion App (not just background/foreground it). **(2)** In the app: Settings → Companion App → Debugging (wording varies by app version) → look for a "reset"/"reload frontend" action. **(3)** Reliable fallback (Android): phone Settings → Apps → Home Assistant → Storage → **Clear cache** (not "Clear data" – that would log you out) – this only clears cached web assets. Then reopen the dashboard. |
| The card doesn't show up in the card picker | Add the resource manually (see [Setup](#setup)); then clear the browser cache/reload the dashboard. |
| The card shows "HomeRoster is still loading…" | The integration hasn't finished starting up yet; wait a moment. If it persists, check the Home Assistant log for setup errors in `homeroster`. |
| A "Connection to Home Assistant lost" banner | The card automatically detects WebSocket disconnects and reloads events once the connection is restored; no action needed. |
| Saving fails / a conflict message appears | Another device changed the same event in the meantime (optimistic locking via a version number). Reload the event and make your change again. |
| "This Home Assistant version is older than 2024.10.0" in the log | Update Home Assistant; the backend/sensors still work, only the automatic card registration is skipped. |
| Import fails | Check the error list in the import action's result – individual invalid entries are named, and the rest is still imported. |

## Upgrade and migration notes

The storage format is versioned (`STORAGE_VERSION_MAJOR` /
`STORAGE_VERSION_MINOR` in `const.py`). Future data-model changes are
migrated via `HomeRosterStore._async_migrate_func` (`storage.py`); a
version jump to a **newer** major version than the installed integration
understands is refused in a controlled way, instead of silently
corrupting data. As always, a regular Home Assistant backup is recommended
before major updates.

## Development

### Before publishing

`custom_components/homeroster/manifest.json`'s `codeowners`,
`documentation` and `issue_tracker` already point at the real repository
(`iiNoNoNoii/HomeRoster`). `.github/workflows/` runs HACS/hassfest
validation and the backend test suite on every push and pull request. An
official icon in the HACS store would additionally require a pull request
to [home-assistant/brands](https://github.com/home-assistant/brands) –
that's not required for private use as a custom HACS repository.

### Repository structure

```text
homeroster/
├── custom_components/homeroster/   # Backend (Python)
│   ├── www/homeroster-card.js      # Pre-built card (see below)
│   └── ...
├── frontend/                           # Frontend source (TypeScript/Lit)
├── tests/backend/                      # pytest (backend)
├── frontend/tests/                     # vitest (frontend)
├── docs/                               # Example automations/dashboards
├── hacs.json, LICENSE, pyproject.toml
```

**Deviation from the originally sketched structure:** the frontend tests
live under `frontend/tests/` instead of a shared cross-language `tests/`
folder, because the Vitest/TypeScript tooling (config, `tsconfig.json`)
applies to the `frontend/` package; backend tests remain at the repository
root under `tests/backend/`, as is customary for pytest/Home Assistant
custom-component tests.

### Building the frontend

```bash
cd frontend
npm install
npm run build      # -> frontend/dist/homeroster-card.js
```

After every change, the built file also needs to be copied to
`custom_components/homeroster/www/homeroster-card.js` (the
repository already includes an up-to-date build):

```bash
cp frontend/dist/homeroster-card.js custom_components/homeroster/www/
```

`npm run watch` automatically rebuilds on changes (unminified, with a
source map) for local development against a running Home Assistant
instance.

### Frontend tests, type checking, linting

```bash
cd frontend
npm run typecheck   # tsc --noEmit
npm test            # vitest (lane layout, validation, filters, date/DST)
npm run lint         # eslint
```

### Backend tests

```bash
python -m venv .venv
# Linux/macOS: source .venv/bin/activate   |   Windows: .venv\Scripts\activate
pip install pytest-homeassistant-custom-component python-dateutil tzdata
pytest tests/backend -q
```

(`tzdata` is only required on platforms without a system IANA timezone
database, e.g. Windows.)

Tests run with
[`pytest-homeassistant-custom-component`](https://github.com/MatthewFlamm/pytest-homeassistant-custom-component)
against a real (test) Home Assistant core, and cover: migration, CRUD,
timezones/DST, overlapping events, multiple people per event,
restart/persistence, calendar queries, sensor states, and permissions and
validation via the real WebSocket API (`hass_ws_client`).

> **Note on the PyPI release of `pytest-homeassistant-custom-component`:**
> The release available on PyPI at the time of development pins
> `homeassistant==2023.7.3` – older than this integration's documented
> `min_ha_version: 2024.10.0`. The code itself consistently uses the real
> APIs documented for 2024.10+; in three places (`ServiceValidationError`,
> the `DeviceInfo` import path, `CalendarEvent.status`) there's a minimal,
> clearly commented compatibility fallback so the backend can be fully
> tested against this older test core, without changing behavior on
> supported Home Assistant versions. Testing against a newer
> `homeassistant` version (e.g. `pip install
> "git+https://github.com/MatthewFlamm/pytest-homeassistant-custom-component.git"`)
> yields exactly the same test results.

Backend quality: full type annotations, `ruff` for linting/formatting
(`ruff check custom_components/homeroster tests/backend`,
`ruff format ...`), exclusively async, non-blocking code per Home
Assistant conventions.

## Acceptance criteria (MVP)

- [x] The integration can be set up via the Home Assistant UI.
- [x] Three family members can be created locally.
- [x] The custom card can be added to a dashboard.
- [x] An event can be created via the add ("+") button.
- [x] Title, date, start, end and multiple people are saved.
- [x] The event survives a restart (see restart tests).
- [x] The event appears in the overall view.
- [x] The event appears in the filtered views of all assigned people.
- [x] Two time-overlapping events can be saved.
- [x] Overlapping events are visibly shown side by side (lane layout,
      covered by unit tests).
- [x] An event can be opened, edited and deleted.
- [x] All-day and multi-day events work correctly (DST-safe, see tests).
- [x] `calendar.homeroster` can be used in Home Assistant automations.
- [x] The next event can be retrieved via an entity or an action.
- [x] Today's events can be retrieved via an entity or an action.
- [x] Another dashboard card can display the next event (see
      `docs/dashboards.yaml`).
- [x] The solution needs no internet connection during normal operation.
- [x] German translations are present (backend `strings.json`/
      `translations/de.json`, frontend `utils/localize.ts`).
- [x] Dark mode and mobile layout are usable (HA CSS variables, responsive
      CSS, `prefers-reduced-motion`).
- [x] Backend and core frontend tests pass (102 backend tests, 33 frontend
      tests).

## Development phases

**Phase 1 (MVP) – fully implemented:** local storage, people management,
event CRUD, multiple people per event, day/week/month/agenda views,
overlap layout, overall and per-person calendars, today/next-event hooks,
German/English UI, tests and documentation.

**Phase 2 (convenience) – implemented:** categories, reminder offsets,
duplication, status, search, person/category filters, JSON import/export,
additional-card examples, the visual card editor, a pinned card language,
and push notifications via the Home Assistant app as an optional addition
to the reminder event. **Not implemented:** drag-and-drop (see [Known
limitations](#known-limitations)).

**Phase 3 (extended) – partially implemented:** simple recurrence rules
(daily/weekly/monthly/yearly, deleting single instances) are present;
**not implemented:** editing single series instances, ICS interoperability,
finer-grained permissions beyond administrator/user, voice assistant
integration, kiosk features beyond the existing `read_only` mode.
Birthdays are already usable via the "Birthday" category and the dedicated
`sensor.homeroster_next_birthday`.

## License

GNU Affero General Public License v3.0 (AGPL-3.0), see
[LICENSE](LICENSE). If a modified version is made available over a network
(e.g. as part of a Home Assistant instance), the source code of that
modified version must be made available to its users (see section 13 of
the license).
