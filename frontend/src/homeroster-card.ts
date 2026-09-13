import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import * as api from "./api";
import { CARD_STYLES } from "./styles";
import { DEFAULT_COLORS, DEFAULT_ICONS, DEFAULT_REMINDER_MINUTES } from "./const";
import { addDays, resolveFirstWeekday, startOfMonthGrid, use24HourFormat } from "./utils/datetime";
import { debounce } from "./utils/debounce";
import { filterEvents } from "./utils/filter-events";
import { collapseRecurringToNextOccurrence } from "./utils/group-events";
import { resolveLanguage, t } from "./utils/localize";
import type { HomeAssistant, LovelaceCardConfig } from "./ha-types";
import {
  DEFAULT_CONFIG,
  type Category,
  type CalendarView,
  type FamilyEvent,
  type HomeRosterCardConfig,
  type Person,
} from "./types";
import { renderAgendaView } from "./views/agenda";
import type { ViewCallbacks, ViewContext } from "./views/context";
import { renderDayView } from "./views/day";
import { renderMonthView } from "./views/month";
import { personAvatarUrl, renderFilteredEventList } from "./views/shared";
import { computeWeekDays, renderWeekView } from "./views/week";
import "./components/event-dialog";
import "./components/event-detail-dialog";
import "./components/day-detail-dialog";
import "./components/people-manager-dialog";
import "./components/category-manager-dialog";

const VIEWS: CalendarView[] = ["agenda", "day", "week", "month"];
const BUS_EVENTS = [
  "homeroster_event_created",
  "homeroster_event_updated",
  "homeroster_event_deleted",
];
// How far into the future the filtered-list (search/category) wide lookahead
// fetch reaches - see _fetchWideRangeEvents(). Matches the backend's own
// get_next_event lookahead bound (custom_components/homeroster) for
// consistency of "how far into the future do we look" reasoning across the
// project.
const WIDE_RANGE_LOOKAHEAD_DAYS = 400;

@customElement("homeroster-card")
export class HomeRosterCard extends LitElement {
  static styles = CARD_STYLES;

  @state() private _config!: HomeRosterCardConfig;
  @state() private _view: CalendarView = "week";
  @state() private _currentDate: Date = new Date();
  @state() private _events: FamilyEvent[] = [];
  // Wide (today .. today+400d) result for filtered-list mode's search/
  // category matching - see _fetchWideRangeEvents(). Only ever fetched
  // while filtered-list mode is active (see _showFlatList/updated()); empty
  // otherwise, so this stays a cheap no-op in the normal (non-filtering)
  // case.
  @state() private _wideRangeEvents: FamilyEvent[] = [];
  @state() private _people: Person[] = [];
  @state() private _categories: Category[] = [];
  @state() private _loading = true;
  @state() private _error: string | null = null;
  @state() private _connectionLost = false;
  @state() private _search = "";
  @state() private _selectedPersonIds: string[] = [];
  @state() private _selectedCategoryIds: string[] = [];
  @state() private _filtersExpanded = false;
  @state() private _canWriteEvents = true;
  @state() private _isAdmin = false;
  @state() private _requirePerson = true;
  @state() private _enableCategories = true;
  @state() private _enableStatus = true;
  @state() private _language = "auto";
  @state() private _defaultReminderMinutes = DEFAULT_REMINDER_MINUTES;
  @state() private _defaultColors: string[] = DEFAULT_COLORS;
  @state() private _defaultIcons: string[] = DEFAULT_ICONS;

  @state() private _createDraft: { date: string; time: string; allDay: boolean } | null = null;
  @state() private _editingEvent: FamilyEvent | null = null;
  @state() private _dialogError: string | null = null;
  @state() private _detailEvent: FamilyEvent | null = null;
  @state() private _dayDetail: { date: Date; events: FamilyEvent[] } | null = null;
  @state() private _peopleManagerOpen = false;
  @state() private _categoryManagerOpen = false;

  private _hass?: HomeAssistant;
  private _bootstrapped = false;
  private _unsubBus: Array<() => void> = [];
  private _fetchToken = 0;
  private _wideFetchToken = 0;

  private _debouncedSetSearch = debounce((value: string) => {
    this._search = value;
  }, 200);

  private _debouncedFetchWideRange = debounce(() => {
    void this._fetchWideRangeEvents();
  }, 200);

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._bootstrapped) {
      this._bootstrapped = true;
      void this._bootstrap();
    }
  }

  setConfig(config: LovelaceCardConfig): void {
    if (!config) {
      throw new Error("Ungültige Konfiguration");
    }
    const merged: HomeRosterCardConfig = {
      ...DEFAULT_CONFIG,
      ...(config as HomeRosterCardConfig),
      type: config.type,
    };
    const wasUnset = !this._config;
    this._config = merged;
    if (wasUnset) {
      this._view = merged.default_view ?? "week";
      this._selectedPersonIds = merged.preselected_people ?? [];
    }
  }

  getCardSize(): number {
    return this._config?.compact ? 6 : 9;
  }

  getGridOptions(): { rows: number; columns: number; min_rows: number } {
    return { rows: this._config?.compact ? 6 : 9, columns: 12, min_rows: 4 };
  }

  static getStubConfig(): HomeRosterCardConfig {
    return {
      type: "custom:homeroster-card",
      title: "Familienkalender",
      default_view: "week",
    };
  }

  static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement("homeroster-card-editor");
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const unsub of this._unsubBus) {
      unsub();
    }
    this._unsubBus = [];
  }

  private async _bootstrap(): Promise<void> {
    if (!this._hass) {
      return;
    }
    try {
      const [cfg, people, categories] = await Promise.all([
        api.getConfig(this._hass),
        api.listPeople(this._hass),
        api.listCategories(this._hass),
      ]);
      this._isAdmin = cfg.is_admin;
      this._canWriteEvents = cfg.can_write_events;
      this._requirePerson = Boolean(cfg.options.require_person ?? true);
      this._enableCategories = Boolean(cfg.options.enable_categories ?? true);
      this._enableStatus = Boolean(cfg.options.enable_status ?? true);
      const languageOpt = cfg.options.language;
      this._language =
        languageOpt === "auto" || languageOpt === "de" || languageOpt === "en" ? languageOpt : "auto";
      const reminderOpt = cfg.options.default_reminder_minutes;
      this._defaultReminderMinutes =
        typeof reminderOpt === "number" && Number.isFinite(reminderOpt) ? reminderOpt : DEFAULT_REMINDER_MINUTES;
      const colorsOpt = cfg.options.default_colors;
      this._defaultColors =
        typeof colorsOpt === "string" && colorsOpt.trim()
          ? colorsOpt
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean)
          : DEFAULT_COLORS;
      const iconsOpt = cfg.options.default_icons;
      this._defaultIcons =
        typeof iconsOpt === "string" && iconsOpt.trim()
          ? iconsOpt
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : DEFAULT_ICONS;
      this._people = people;
      this._categories = categories;
      this._error = null;
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
    await this._fetchEvents();
    this._subscribeRealtime();
  }

  private _subscribeRealtime(): void {
    if (!this._hass) {
      return;
    }
    const refresh = debounce(() => void this._fetchEvents(), 250);
    for (const eventType of BUS_EVENTS) {
      this._hass.connection
        .subscribeEvents(() => refresh(), eventType)
        .then((unsub) => this._unsubBus.push(unsub))
        .catch(() => {
          /* best-effort: card still works via manual navigation refetch */
        });
    }
    const onReady = () => {
      this._connectionLost = false;
      void this._fetchEvents();
    };
    const onLost = () => {
      this._connectionLost = true;
    };
    this._hass.connection.addEventListener("ready", onReady);
    this._hass.connection.addEventListener("disconnected", onLost);
    this._unsubBus.push(() => this._hass?.connection.removeEventListener("ready", onReady));
    this._unsubBus.push(() => this._hass?.connection.removeEventListener("disconnected", onLost));
  }

  /** The language used for every `t()` UI-string lookup in the card's own
   * templates and in every view/dialog it renders: the integration's
   * `options.language` setting ("auto" | "de" | "en") resolved against the
   * viewer's own `hass.language` (see utils/localize.ts's resolveLanguage()
   * for the "auto" = defer-to-viewer, otherwise = admin override rule). */
  private _resolvedLanguage(): string {
    return resolveLanguage(this._language, this._hass?.language ?? "de");
  }

  private _computeRange(): { start: Date; end: Date } {
    const firstWeekday = resolveFirstWeekday(this._hass!, this._config.first_weekday);
    if (this._view === "day") {
      const start = new Date(this._currentDate);
      start.setHours(0, 0, 0, 0);
      return { start, end: addDays(start, 1) };
    }
    if (this._view === "week") {
      // Must match the rolling 7-day forecast window rendered by
      // views/week.ts's computeWeekDays() - a plain 7-day span starting at
      // _currentDate, not a snap to the Mon-Sun/Sun-Sat calendar week (see
      // that file's header comment for the full rationale).
      const days = computeWeekDays(this._currentDate);
      return { start: days[0], end: addDays(days[0], 7) };
    }
    if (this._view === "month") {
      const start = startOfMonthGrid(this._currentDate, firstWeekday);
      return { start, end: addDays(start, 42) };
    }
    // agenda
    const start = new Date(this._currentDate);
    start.setHours(0, 0, 0, 0);
    return { start, end: addDays(start, this._config.agenda_days ?? 14) };
  }

  private async _fetchEvents(): Promise<void> {
    if (!this._hass) {
      return;
    }
    const token = ++this._fetchToken;
    this._loading = true;
    const { start, end } = this._computeRange();
    try {
      const events = await api.getEvents(this._hass, {
        start: start.toISOString(),
        end: end.toISOString(),
        include_cancelled: true,
      });
      if (token !== this._fetchToken) {
        return; // a newer fetch superseded this one
      }
      this._events = events;
      this._error = null;
    } catch (err) {
      if (token !== this._fetchToken) {
        return;
      }
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      if (token === this._fetchToken) {
        this._loading = false;
      }
    }
  }

  private get _filteredEvents(): FamilyEvent[] {
    return filterEvents(this._events, {
      showDoneEvents: this._config.show_done_events ?? true,
      showCancelledEvents: this._config.show_cancelled_events ?? false,
      personIds: this._selectedPersonIds,
      categoryIds: this._selectedCategoryIds,
      search: this._search,
    });
  }

  // Wide (today .. today+WIDE_RANGE_LOOKAHEAD_DAYS) fetch used only while
  // filtered-list mode (_showFlatList) is active - a deliberate exception to
  // the rest of the card's bounded-per-view-range fetch principle, so that
  // a search/category filter surfaces every upcoming match instead of just
  // whatever happens to be in the currently displayed day/week/month/agenda
  // window. category_ids is passed server-side (the websocket command
  // already supports it) since it narrows the result set the server
  // computes; there is no server-side text search, so `search` is never
  // sent here - filterEvents() below applies it (and everything else)
  // client-side exactly as it already does for the normal bounded fetch.
  private async _fetchWideRangeEvents(): Promise<void> {
    if (!this._hass) {
      return;
    }
    const token = ++this._wideFetchToken;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = addDays(start, WIDE_RANGE_LOOKAHEAD_DAYS);
    try {
      const events = await api.getEvents(this._hass, {
        start: start.toISOString(),
        end: end.toISOString(),
        category_ids: this._selectedCategoryIds.length > 0 ? this._selectedCategoryIds : undefined,
        include_cancelled: true,
      });
      if (token !== this._wideFetchToken) {
        return; // a newer wide fetch superseded this one
      }
      this._wideRangeEvents = events;
    } catch (err) {
      if (token !== this._wideFetchToken) {
        return;
      }
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  // The dataset rendered by the filtered/search list (_renderFlatList()):
  // the wide-range fetch above, filtered the same way _filteredEvents
  // filters the normal bounded fetch, then collapsed so a recurring series
  // (event.rrule set) contributes only its single soonest matching
  // occurrence - see utils/group-events.ts's collapseRecurringToNextOccurrence().
  private get _flatListEvents(): FamilyEvent[] {
    return collapseRecurringToNextOccurrence(
      filterEvents(this._wideRangeEvents, {
        showDoneEvents: this._config.show_done_events ?? true,
        showCancelledEvents: this._config.show_cancelled_events ?? false,
        personIds: this._selectedPersonIds,
        categoryIds: this._selectedCategoryIds,
        search: this._search,
      })
    );
  }

  // Searching (or selecting at least one category) replaces the normal
  // day/week/month/agenda view with a flat chronological list of matches -
  // see _renderFlatList(). Person-only filtering keeps filtering within
  // whatever view is currently active, as before.
  private get _showFlatList(): boolean {
    return this._search.trim().length > 0 || this._selectedCategoryIds.length > 0;
  }

  private get _visiblePeople(): Person[] {
    const allowlist = this._config.people;
    const active = this._people.filter((p) => p.active);
    return allowlist && allowlist.length > 0 ? active.filter((p) => allowlist.includes(p.id)) : active;
  }

  private get _visibleCategories(): Category[] {
    const allowlist = this._config.visible_categories;
    const active = this._categories.filter((c) => c.active);
    return allowlist && allowlist.length > 0 ? active.filter((c) => allowlist.includes(c.id)) : active;
  }

  private _setView(view: CalendarView): void {
    if (view === this._view) {
      return;
    }
    this._view = view;
    void this._fetchEvents();
  }

  private _navStep(direction: 1 | -1): void {
    let next = new Date(this._currentDate);
    switch (this._view) {
      case "day":
        next = addDays(next, direction);
        break;
      case "week":
        // The week view is a rolling 7-day forecast window (see
        // views/week.ts), so "next/previous" most sensibly shifts that
        // whole window by 7 days at a time - i.e. the same "next 7 days"
        // framing repeats, just starting a week later/earlier - rather
        // than, say, shifting by 1 day (which would barely change what's
        // visible) or jumping by some other interval.
        next = addDays(next, 7 * direction);
        break;
      case "month":
        next = new Date(next.getFullYear(), next.getMonth() + direction, 1);
        break;
      case "agenda":
        next = addDays(next, (this._config.agenda_days ?? 14) * direction);
        break;
      default:
        return;
    }
    this._currentDate = next;
    void this._fetchEvents();
  }

  private _navToday(): void {
    this._currentDate = new Date();
    void this._fetchEvents();
  }

  private _onSearchInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this._debouncedSetSearch(value);
  }

  private _togglePerson(id: string): void {
    this._selectedPersonIds = this._selectedPersonIds.includes(id)
      ? this._selectedPersonIds.filter((p) => p !== id)
      : [...this._selectedPersonIds, id];
  }

  private _toggleCategory(id: string): void {
    this._selectedCategoryIds = this._selectedCategoryIds.includes(id)
      ? this._selectedCategoryIds.filter((c) => c !== id)
      : [...this._selectedCategoryIds, id];
  }

  private _openCreate(date: Date, allDay: boolean): void {
    if (this._config.read_only || !this._canWriteEvents) {
      return;
    }
    const pad = (n: number) => String(n).padStart(2, "0");
    this._createDraft = {
      date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
      allDay,
    };
    this._editingEvent = null;
    this._dialogError = null;
  }

  private _openEdit(event: FamilyEvent): void {
    this._editingEvent = event;
    this._createDraft = null;
    this._dialogError = null;
    this._detailEvent = null;
  }

  private async _handleDialogSave(e: CustomEvent<api.EventCreateInput | api.EventUpdateInput>): Promise<void> {
    if (!this._hass) {
      return;
    }
    this._dialogError = null;
    try {
      if (this._editingEvent) {
        await api.updateEvent(this._hass, {
          ...(e.detail as api.EventUpdateInput),
          event_id: this._editingEvent.id,
          expected_version: this._editingEvent.version,
        });
      } else {
        await api.createEvent(this._hass, e.detail as api.EventCreateInput);
      }
      this._editingEvent = null;
      this._createDraft = null;
      await this._fetchEvents();
    } catch (err) {
      this._dialogError =
        err instanceof api.HomeRosterApiError
          ? t(this._resolvedLanguage(), `error.${err.code}`)
          : err instanceof Error
            ? err.message
            : String(err);
    }
  }

  private _closeEventDialog(): void {
    this._editingEvent = null;
    this._createDraft = null;
    this._dialogError = null;
  }

  private async _handleDelete(eventId: string, mode: "series" | "instance", occurrenceStart?: string): Promise<void> {
    if (!this._hass) {
      return;
    }
    try {
      await api.deleteEvent(this._hass, eventId, mode, occurrenceStart);
      this._detailEvent = null;
      await this._fetchEvents();
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _handleDuplicate(eventId: string): Promise<void> {
    if (!this._hass) {
      return;
    }
    try {
      await api.duplicateEvent(this._hass, eventId);
      this._detailEvent = null;
      await this._fetchEvents();
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _handleSetStatus(eventId: string, status: string): Promise<void> {
    if (!this._hass) {
      return;
    }
    try {
      await api.updateEvent(this._hass, { event_id: eventId, status: status as FamilyEvent["status"] });
      this._detailEvent = null;
      await this._fetchEvents();
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _refreshPeople(): Promise<void> {
    if (!this._hass) {
      return;
    }
    this._people = await api.listPeople(this._hass);
  }

  private async _refreshCategories(): Promise<void> {
    if (!this._hass) {
      return;
    }
    this._categories = await api.listCategories(this._hass);
  }

  private _rangeLabel(): string {
    const hass = this._hass;
    if (!hass) {
      return "";
    }
    const lang = hass.language || "de";
    if (this._view === "day") {
      return new Intl.DateTimeFormat(lang, { weekday: "long", day: "numeric", month: "long" }).format(this._currentDate);
    }
    if (this._view === "week") {
      // Matches the rolling 7-day forecast window from _computeRange()/
      // views/week.ts - the range label reflects the same [currentDate,
      // currentDate+6] span that's actually displayed, not a calendar week.
      const days = computeWeekDays(this._currentDate);
      const fmt = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short" });
      return `${fmt.format(days[0])} – ${fmt.format(days[6])}`;
    }
    if (this._view === "month") {
      return new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }).format(this._currentDate);
    }
    const fmt = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short" });
    return `${fmt.format(this._currentDate)} – ${fmt.format(addDays(this._currentDate, (this._config.agenda_days ?? 14) - 1))}`;
  }

  private _buildViewContext(): ViewContext {
    const callbacks: ViewCallbacks = {
      onEventClick: (event) => {
        this._detailEvent = event;
      },
      onSlotClick: (date, allDay) => this._openCreate(date, allDay),
      onMoreClick: (date, events) => {
        this._dayDetail = { date, events };
      },
    };
    return {
      hass: this._hass!,
      config: this._config,
      events: this._filteredEvents,
      people: this._people,
      categories: this._categories,
      currentDate: this._currentDate,
      now: new Date(),
      language: this._resolvedLanguage(),
      firstWeekday: resolveFirstWeekday(this._hass!, this._config.first_weekday),
      use24h: use24HourFormat(this._hass!, this._config.time_format),
      callbacks,
    };
  }

  private _renderView(): TemplateResult {
    const ctx = this._buildViewContext();
    switch (this._view) {
      case "day":
        return renderDayView(ctx);
      case "week":
        return renderWeekView(ctx);
      case "month":
        return renderMonthView(ctx);
      default:
        return renderAgendaView(ctx);
    }
  }

  private _renderFilterToggle(): TemplateResult | typeof nothing {
    if (!this._config.show_filters) {
      return nothing;
    }
    const lang = this._resolvedLanguage();
    const activeCount = this._selectedPersonIds.length + this._selectedCategoryIds.length;
    return html`
      <button
        type="button"
        class="fp-filter-toggle ${this._filtersExpanded ? "active" : ""}"
        title=${t(lang, "action.filter")}
        aria-expanded=${this._filtersExpanded ? "true" : "false"}
        @click=${() => (this._filtersExpanded = !this._filtersExpanded)}
      >
        <ha-icon icon="mdi:filter-variant"></ha-icon>
        <span>${t(lang, "action.filter")}</span>
        ${activeCount > 0 ? html`<span class="fp-filter-badge">${activeCount}</span>` : nothing}
        <ha-icon icon=${this._filtersExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
      </button>
    `;
  }

  private _renderFilterBar(): TemplateResult | typeof nothing {
    if (!this._config.show_filters || !this._filtersExpanded) {
      return nothing;
    }
    const lang = this._resolvedLanguage();
    return html`
      <div class="fp-filterbar">
        <button
          type="button"
          class="fp-person-chip fp-person-chip-all ${this._selectedPersonIds.length === 0 ? "active" : ""}"
          @click=${() => (this._selectedPersonIds = [])}
        >
          ${t(lang, "filter.all_people")}
        </button>
        ${this._visiblePeople.map((p) => {
          const avatar = this._hass ? personAvatarUrl(p, this._hass) : null;
          return html`
            <button
              type="button"
              class="fp-person-chip ${this._selectedPersonIds.includes(p.id) ? "active" : ""}"
              style="--fp-chip-color:${p.color}"
              @click=${() => this._togglePerson(p.id)}
            >
              ${avatar
                ? html`<img class="fp-person-chip-dot fp-person-chip-dot-img" src=${avatar} alt="" />`
                : html`<span class="fp-person-chip-dot" style="background:${p.color}"></span>`}${p.name}
            </button>
          `;
        })}
        ${this._visibleCategories.map(
          (c) => html`
            <button
              type="button"
              class="fp-category-chip ${this._selectedCategoryIds.includes(c.id) ? "active" : ""}"
              style="--fp-chip-color:${c.color}"
              @click=${() => this._toggleCategory(c.id)}
            >
              ${c.icon ? html`<ha-icon icon=${c.icon}></ha-icon>` : nothing}${c.name}
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderFlatList(): TemplateResult {
    return renderFilteredEventList({ ...this._buildViewContext(), events: this._flatListEvents });
  }

  protected updated(changed: PropertyValues): void {
    // Fetch (debounced) the wide-range dataset whenever filtered-list mode
    // is active and the search text or category selection just changed -
    // including the transition into filtered-list mode itself, since that
    // transition is always caused by one of these two state changes (see
    // _showFlatList's trigger condition). Left untouched while not in
    // filtered-list mode, per _fetchWideRangeEvents()'s doc comment.
    if ((changed.has("_search") || changed.has("_selectedCategoryIds")) && this._showFlatList) {
      this._debouncedFetchWideRange();
    }
  }

  protected render(): TemplateResult {
    if (!this._hass || !this._config) {
      return html`<ha-card><div class="fp-loading">…</div></ha-card>`;
    }
    const lang = this._resolvedLanguage();
    return html`
      <ha-card>
        ${this._connectionLost
          ? html`<div class="fp-banner fp-banner-error">${t(lang, "error.connection_lost")}</div>`
          : nothing}
        ${this._error
          ? html`<div class="fp-banner fp-banner-error">
              ${this._error}
              <button type="button" @click=${() => void this._fetchEvents()}>${t(lang, "error.reload")}</button>
            </div>`
          : nothing}
        <div class="fp-header">
          <div class="fp-header-top">
            <div class="fp-title">${this._config.title ?? "Familienkalender"}</div>
            <div class="fp-header-actions">
              ${this._isAdmin
                ? html`
                    <ha-icon-button
                      title=${t(lang, "action.manage_people")}
                      @click=${() => (this._peopleManagerOpen = true)}
                    >
                      <ha-icon icon="mdi:account-multiple"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      title=${t(lang, "action.manage_categories")}
                      @click=${() => (this._categoryManagerOpen = true)}
                    >
                      <ha-icon icon="mdi:tag-multiple"></ha-icon>
                    </ha-icon-button>
                  `
                : nothing}
              ${(this._config.show_add_button ?? true) && !this._config.read_only && this._canWriteEvents
                ? html`
                    <button
                      type="button"
                      class="fp-fab"
                      title=${t(lang, "action.add_event")}
                      aria-label=${t(lang, "action.add_event")}
                      @click=${() => this._openCreate(new Date(), false)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </button>
                  `
                : nothing}
            </div>
          </div>
          <div class="fp-header-nav">
            <div class="fp-view-switch" role="tablist">
              ${VIEWS.map(
                (v) => html`
                  <button
                    role="tab"
                    aria-selected=${this._view === v}
                    class=${this._view === v ? "active" : ""}
                    @click=${() => this._setView(v)}
                  >
                    ${t(lang, `view.${v}`)}
                  </button>
                `
              )}
            </div>
            <div class="fp-nav-arrows">
              <ha-icon-button title=${t(lang, "nav.prev")} @click=${() => this._navStep(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <button type="button" class="fp-nav-today" @click=${() => this._navToday()}>
                ${t(lang, "nav.today")}
              </button>
              <ha-icon-button title=${t(lang, "nav.next")} @click=${() => this._navStep(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="fp-range-label">${this._rangeLabel()}</div>
          </div>
          ${this._config.show_search || this._config.show_filters
            ? html`
                <div class="fp-search-row">
                  ${this._config.show_search
                    ? html`
                        <input
                          class="fp-search"
                          type="search"
                          placeholder=${t(lang, "filter.search_placeholder")}
                          @input=${(e: Event) => this._onSearchInput(e)}
                        />
                      `
                    : nothing}
                  ${this._renderFilterToggle()}
                </div>
              `
            : nothing}
          ${this._renderFilterBar()}
        </div>
        <div class="fp-body ${this._config.compact ? "fp-compact" : ""}">
          ${this._loading
            ? html`<div class="fp-loading">…</div>`
            : this._showFlatList
              ? this._renderFlatList()
              : this._renderView()}
        </div>
      </ha-card>

      ${this._createDraft || this._editingEvent
        ? html`
            <homeroster-event-dialog
              .hass=${this._hass}
              .language=${this._language}
              .config=${this._config}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._editingEvent}
              .prefill=${this._createDraft}
              .serverError=${this._dialogError}
              .requirePerson=${this._requirePerson}
              .enableCategories=${this._enableCategories}
              .enableStatus=${this._enableStatus}
              .defaultReminderMinutes=${this._defaultReminderMinutes}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-save=${(e: CustomEvent) => void this._handleDialogSave(e)}
              @fp-close=${() => this._closeEventDialog()}
            ></homeroster-event-dialog>
          `
        : nothing}
      ${this._detailEvent
        ? html`
            <homeroster-event-detail-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._detailEvent}
              .canWrite=${this._canWriteEvents && !this._config.read_only}
              @fp-edit=${(e: CustomEvent<FamilyEvent>) => this._openEdit(e.detail)}
              @fp-delete=${(e: CustomEvent<{ mode: "series" | "instance"; occurrenceStart?: string }>) =>
                void this._handleDelete(this._detailEvent!.id, e.detail.mode, e.detail.occurrenceStart)}
              @fp-duplicate=${() => void this._handleDuplicate(this._detailEvent!.id)}
              @fp-set-status=${(e: CustomEvent<string>) => void this._handleSetStatus(this._detailEvent!.id, e.detail)}
              @fp-close=${() => (this._detailEvent = null)}
            ></homeroster-event-detail-dialog>
          `
        : nothing}
      ${this._dayDetail
        ? html`
            <homeroster-day-detail-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .categories=${this._categories}
              .date=${this._dayDetail.date}
              .events=${this._dayDetail.events}
              .canWrite=${this._canWriteEvents && !this._config.read_only}
              @fp-event-click=${(e: CustomEvent<FamilyEvent>) => {
                this._dayDetail = null;
                this._detailEvent = e.detail;
              }}
              @fp-add-event=${(e: CustomEvent<{ date: Date }>) => {
                this._dayDetail = null;
                this._openCreate(e.detail.date, true);
              }}
              @fp-close=${() => (this._dayDetail = null)}
            ></homeroster-day-detail-dialog>
          `
        : nothing}
      ${this._peopleManagerOpen
        ? html`
            <homeroster-people-manager-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .defaultColors=${this._defaultColors}
              @fp-people-changed=${() => void this._refreshPeople()}
              @fp-close=${() => (this._peopleManagerOpen = false)}
            ></homeroster-people-manager-dialog>
          `
        : nothing}
      ${this._categoryManagerOpen
        ? html`
            <homeroster-category-manager-dialog
              .hass=${this._hass}
              .language=${this._language}
              .categories=${this._categories}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-categories-changed=${() => void this._refreshCategories()}
              @fp-close=${() => (this._categoryManagerOpen = false)}
            ></homeroster-category-manager-dialog>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "homeroster-card": HomeRosterCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "homeroster-card",
  name: "HomeRoster",
  description: "Lokaler Familienkalender mit Personen, Kategorien und Überlappungs-Ansicht.",
  preview: true,
});
