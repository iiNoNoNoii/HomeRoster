// Create/edit dialog for a single event. Client-side validation only - the
// backend re-validates everything (see custom_components/family_planner/models.py).
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./dialog-shell";
import type { EventCreateInput, EventUpdateInput } from "../api";
import type { HomeAssistant } from "../ha-types";
import type { Category, EventStatus, FamilyEvent, FamilyPlannerCardConfig, Person } from "../types";
import { DEFAULT_COLORS, DEFAULT_ICONS, DEFAULT_REMINDER_MINUTES, REMINDER_PRESETS } from "../const";
import { combineLocalDateTime, computeEndFromStart, dateOnly, shiftDateString, toTimeInput } from "../utils/datetime";
import { t } from "../utils/localize";
import { validateEventForm, type ValidationResult } from "../utils/validation";
import { renderColorSwatches, renderIconSwatches, SWATCH_STYLES } from "../utils/swatches";

const FORM_STYLES = css`
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
  }
  label {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select,
  textarea {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
    min-height: 44px;
  }
  textarea {
    min-height: 72px;
    resize: vertical;
  }
  .row {
    display: flex;
    gap: 12px;
  }
  .row > .field {
    flex: 1;
  }
  .switch-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .switch-row input {
    width: 22px;
    height: 22px;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  /* Chip background always mixes in a bit of --divider-color rather than
     relying on --secondary-background-color/--card-background-color alone,
     which can end up matching the dialog surface (and thus be invisible) in
     some themes - the same fixed-contrast formula is used for the filter
     bar's equivalent .fp-person-chip/.fp-category-chip in styles.ts, and
     for .reminder-chip below, so every pill/chip in this dialog follows the
     same rule. */
  .person-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 8px 12px;
    min-height: 40px;
    font: inherit;
  }
  .person-chip .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .person-chip.selected {
    border-color: var(--fp-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-color, var(--primary-color)) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }
  .reminder-chip {
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 10px;
    min-height: 36px;
  }
  .reminder-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .hint {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }
  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.78rem;
  }
  .server-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 12px;
    font-size: 0.85rem;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
  .btn {
    border-radius: 8px;
    padding: 10px 18px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
  }
`;

@customElement("family-planner-event-dialog")
export class FamilyPlannerEventDialog extends LitElement {
  static styles = [FORM_STYLES, SWATCH_STYLES];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: FamilyPlannerCardConfig;
  @property({ attribute: false }) people: Person[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) event: FamilyEvent | null = null;
  @property({ attribute: false }) prefill: { date: string; time: string; allDay: boolean } | null = null;
  @property({ attribute: false }) serverError: string | null = null;
  @property({ type: Boolean }) requirePerson = true;
  @property({ type: Boolean }) enableCategories = true;
  @property({ type: Boolean }) enableStatus = true;
  @property({ type: Number }) defaultReminderMinutes = DEFAULT_REMINDER_MINUTES;
  @property({ attribute: false }) defaultColors: string[] = DEFAULT_COLORS;
  @property({ attribute: false }) defaultIcons: string[] = DEFAULT_ICONS;

  @state() private _title = "";
  @state() private _subtitle = "";
  @state() private _allDay = false;
  @state() private _startDate = "";
  @state() private _startTime = "09:00";
  @state() private _endDate = "";
  @state() private _endTime = "10:00";
  @state() private _personIds: string[] = [];
  @state() private _description = "";
  @state() private _location = "";
  @state() private _categoryId = "";
  @state() private _color = "";
  @state() private _icon = "";
  @state() private _status = "";
  @state() private _reminders: number[] = [];
  @state() private _customReminder = "";
  @state() private _repeatFreq = "";
  @state() private _repeatUntil = "";
  @state() private _errors: ValidationResult["errors"] = {};
  @state() private _confirmingDiscard = false;
  @state() private _submitting = false;

  private _dirty = false;
  private _initialized = false;
  // Whether the user has deliberately edited the end date/time themselves.
  // While false, the end date/time auto-follows the start (same day,
  // +1h) as the user edits the start fields. New events start out
  // false (nothing deliberate has been set yet); editing an existing
  // event starts out true, since that event's stored end was deliberately
  // set (possibly to a different duration) and editing the start should
  // not silently overwrite it.
  private _endTouchedByUser = false;

  protected willUpdate(changed: PropertyValues): void {
    if (!this._initialized && (this.event || this.prefill)) {
      this._initFromProps();
      this._initialized = true;
    }
    void changed;
  }

  private _initFromProps(): void {
    if (this.event) {
      const e = this.event;
      this._title = e.title;
      this._subtitle = e.subtitle ?? "";
      this._allDay = e.all_day;
      if (e.all_day) {
        this._startDate = e.start;
        this._endDate = shiftDateString(e.end, -1);
      } else {
        const start = new Date(e.start);
        const end = new Date(e.end);
        this._startDate = dateOnly(start);
        this._startTime = toTimeInput(start);
        this._endDate = dateOnly(end);
        this._endTime = toTimeInput(end);
      }
      // The stored end was deliberately set (possibly to a duration other
      // than +1h) - don't let editing the start silently overwrite it.
      this._endTouchedByUser = true;
      this._personIds = [...e.person_ids];
      this._description = e.description ?? "";
      this._location = e.location ?? "";
      this._categoryId = e.category_id ?? "";
      this._color = e.color ?? "";
      this._icon = e.icon ?? "";
      this._status = e.status ?? "";
      this._reminders = [...e.reminders];
      if (e.rrule) {
        const freqMatch = /FREQ=([A-Z]+)/.exec(e.rrule);
        this._repeatFreq = freqMatch ? freqMatch[1] : "";
        const untilMatch = /UNTIL=(\d{8})/.exec(e.rrule);
        if (untilMatch) {
          const v = untilMatch[1];
          this._repeatUntil = `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
        }
      }
    } else if (this.prefill) {
      this._allDay = this.prefill.allDay;
      this._startDate = this.prefill.date;
      this._startTime = this.prefill.time;
      // Brand-new event: nothing deliberate has been set for the end yet,
      // so let it auto-follow the start (same day, +1h).
      this._endTouchedByUser = false;
      this._recomputeEndIfNotTouched();
      this._personIds = [];
      this._reminders = [this.defaultReminderMinutes];
    }
  }

  /** Recomputes the end date/time as start+1h (same day, rolling to the
   * next day if that crosses midnight) unless the user has deliberately
   * edited the end fields themselves - see `_endTouchedByUser`. */
  private _recomputeEndIfNotTouched(): void {
    if (this._endTouchedByUser) {
      return;
    }
    const { date, time } = computeEndFromStart(this._startDate, this._startTime, 60);
    this._endDate = date;
    this._endTime = time;
  }

  private _markDirty(): void {
    this._dirty = true;
  }

  private _togglePerson(id: string): void {
    this._personIds = this._personIds.includes(id)
      ? this._personIds.filter((p) => p !== id)
      : [...this._personIds, id];
    this._markDirty();
  }

  private _toggleReminder(offset: number): void {
    this._reminders = this._reminders.includes(offset)
      ? this._reminders.filter((r) => r !== offset)
      : [...this._reminders, offset].sort((a, b) => a - b);
    this._markDirty();
  }

  private _addCustomReminder(): void {
    const minutes = parseInt(this._customReminder, 10);
    if (!Number.isNaN(minutes) && minutes >= 0 && !this._reminders.includes(minutes)) {
      this._reminders = [...this._reminders, minutes].sort((a, b) => a - b);
      this._customReminder = "";
      this._markDirty();
    }
  }

  private _buildRrule(): string | null {
    if (!this._repeatFreq) {
      return null;
    }
    let rule = `FREQ=${this._repeatFreq}`;
    if (this._repeatUntil) {
      rule += `;UNTIL=${this._repeatUntil.replace(/-/g, "")}T000000Z`;
    }
    return rule;
  }

  private _validate(): ValidationResult {
    const result = validateEventForm({
      title: this._title,
      allDay: this._allDay,
      startDate: this._startDate,
      startTime: this._startTime,
      endDate: this._endDate,
      endTime: this._endTime,
      personIds: this._personIds,
      requirePerson: this.requirePerson,
    });
    this._errors = result.errors;
    return result;
  }

  private _handleSave(): void {
    const result = this._validate();
    if (!result.valid) {
      return;
    }
    const start = this._allDay ? this._startDate : combineLocalDateTime(this._startDate, this._startTime);
    const end = this._allDay ? shiftDateString(this._endDate, 1) : combineLocalDateTime(this._endDate, this._endTime);

    const draft: EventCreateInput | EventUpdateInput = {
      title: this._title.trim(),
      subtitle: this._subtitle.trim() || null,
      start,
      end,
      all_day: this._allDay,
      person_ids: this._personIds,
      description: this._description.trim() || null,
      location: this._location.trim() || null,
      category_id: this._categoryId || null,
      color: this._color.trim() || null,
      icon: this._icon.trim() || null,
      status: (this._status || null) as EventStatus | null,
      reminders: this._reminders,
      rrule: this._buildRrule(),
    };
    this._submitting = true;
    this.dispatchEvent(new CustomEvent("fp-save", { detail: draft }));
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("serverError") && this.serverError) {
      this._submitting = false;
    }
  }

  private _requestClose(): void {
    if (this._dirty && !this._confirmingDiscard) {
      this._confirmingDiscard = true;
      return;
    }
    this.dispatchEvent(new CustomEvent("fp-close"));
  }

  protected render(): TemplateResult {
    const lang = this.hass?.language;
    const heading = this.event ? t(lang, "event.edit_title") : t(lang, "event.new_title");
    return html`
      <family-planner-dialog-shell .heading=${heading} wide @fp-shell-close=${() => this._requestClose()}>
        ${this.serverError ? html`<div class="server-error">${this.serverError}</div>` : nothing}
        ${this._confirmingDiscard
          ? html`
              <div class="confirm-box">
                <p>${t(lang, "dialog.unsaved_changes_message")}</p>
                <div class="actions">
                  <button class="btn" type="button" @click=${() => (this._confirmingDiscard = false)}>
                    ${t(lang, "dialog.keep_editing")}
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click=${() => this.dispatchEvent(new CustomEvent("fp-close"))}
                  >
                    ${t(lang, "dialog.discard")}
                  </button>
                </div>
              </div>
            `
          : this._renderForm(lang)}
      </family-planner-dialog-shell>
    `;
  }

  private _renderForm(lang: string | undefined): TemplateResult {
    // Native date/time input chrome (the calendar/clock icon) is drawn by
    // the browser and otherwise renders dark-on-dark in a dark HA theme -
    // color-scheme tells the browser which chrome variant to use so the
    // icon stays visible regardless of theme, without a hacky filter:invert
    // that would look wrong in light mode.
    const colorScheme = this.hass?.themes?.darkMode ? "dark" : "light";
    return html`
      <div class="field">
        <label for="fp-title">${t(lang, "event.title")} *</label>
        <input
          id="fp-title"
          type="text"
          autofocus
          .value=${this._title}
          @input=${(e: Event) => {
            this._title = (e.target as HTMLInputElement).value;
            this._markDirty();
          }}
        />
        ${this._errors.title ? html`<span class="error-text">${t(lang, "validation.title_required")}</span>` : nothing}
      </div>

      <div class="field">
        <label for="fp-subtitle">${t(lang, "event.subtitle")}</label>
        <input
          id="fp-subtitle"
          type="text"
          .value=${this._subtitle}
          @input=${(e: Event) => {
            this._subtitle = (e.target as HTMLInputElement).value;
            this._markDirty();
          }}
        />
      </div>

      <div class="switch-row">
        <input
          id="fp-allday"
          type="checkbox"
          .checked=${this._allDay}
          @change=${(e: Event) => {
            this._allDay = (e.target as HTMLInputElement).checked;
            this._markDirty();
          }}
        />
        <label for="fp-allday">${t(lang, "event.all_day")}</label>
      </div>

      <div class="row">
        <div class="field">
          <label for="fp-start-date">${t(lang, "event.start_date")}</label>
          <input
            id="fp-start-date"
            type="date"
            style="color-scheme:${colorScheme}"
            .value=${this._startDate}
            @input=${(e: Event) => {
              this._startDate = (e.target as HTMLInputElement).value;
              this._recomputeEndIfNotTouched();
              this._markDirty();
            }}
          />
        </div>
        ${!this._allDay
          ? html`
              <div class="field">
                <label for="fp-start-time">${t(lang, "event.start_time")}</label>
                <input
                  id="fp-start-time"
                  type="time"
                  style="color-scheme:${colorScheme}"
                  .value=${this._startTime}
                  @input=${(e: Event) => {
                    this._startTime = (e.target as HTMLInputElement).value;
                    this._recomputeEndIfNotTouched();
                    this._markDirty();
                  }}
                />
              </div>
            `
          : nothing}
      </div>
      <div class="row">
        <div class="field">
          <label for="fp-end-date">${t(lang, "event.end_date")}</label>
          <input
            id="fp-end-date"
            type="date"
            style="color-scheme:${colorScheme}"
            .value=${this._endDate}
            @input=${(e: Event) => {
              this._endTouchedByUser = true;
              this._endDate = (e.target as HTMLInputElement).value;
              this._markDirty();
            }}
          />
        </div>
        ${!this._allDay
          ? html`
              <div class="field">
                <label for="fp-end-time">${t(lang, "event.end_time")}</label>
                <input
                  id="fp-end-time"
                  type="time"
                  style="color-scheme:${colorScheme}"
                  .value=${this._endTime}
                  @input=${(e: Event) => {
                    this._endTouchedByUser = true;
                    this._endTime = (e.target as HTMLInputElement).value;
                    this._markDirty();
                  }}
                />
              </div>
            `
          : nothing}
      </div>
      ${this._errors.end ? html`<span class="error-text">${t(lang, "validation.end_before_start")}</span>` : nothing}

      <div class="field">
        <label>${t(lang, "event.people")}${this.requirePerson ? " *" : ""}</label>
        <div class="chip-row">
          ${this.people
            .filter((p) => p.active)
            .map(
              (p) => html`
                <button
                  type="button"
                  class="person-chip ${this._personIds.includes(p.id) ? "selected" : ""}"
                  style="--fp-color:${p.color}"
                  @click=${() => this._togglePerson(p.id)}
                >
                  <span class="dot" style="background:${p.color}"></span>${p.name}
                </button>
              `
            )}
        </div>
        ${this._errors.personIds ? html`<span class="error-text">${t(lang, "validation.person_required")}</span>` : nothing}
      </div>

      <div class="field">
        <label for="fp-description">${t(lang, "event.description")}</label>
        <textarea
          id="fp-description"
          .value=${this._description}
          @input=${(e: Event) => {
            this._description = (e.target as HTMLTextAreaElement).value;
            this._markDirty();
          }}
        ></textarea>
      </div>

      <div class="field">
        <label for="fp-location">${t(lang, "event.location")}</label>
        <input
          id="fp-location"
          type="text"
          .value=${this._location}
          @input=${(e: Event) => {
            this._location = (e.target as HTMLInputElement).value;
            this._markDirty();
          }}
        />
      </div>

      ${this.enableCategories
        ? html`
            <div class="field">
              <label for="fp-category">${t(lang, "event.category")}</label>
              <select
                id="fp-category"
                .value=${this._categoryId}
                @change=${(e: Event) => {
                  this._categoryId = (e.target as HTMLSelectElement).value;
                  this._markDirty();
                }}
              >
                <option value="">${t(lang, "category.none")}</option>
                ${this.categories
                  .filter((c) => c.active)
                  .map((c) => html`<option value=${c.id} ?selected=${c.id === this._categoryId}>${c.name}</option>`)}
              </select>
            </div>
          `
        : nothing}

      <div class="row">
        <div class="field">
          <label>${t(lang, "event.color")}</label>
          ${renderColorSwatches(this.defaultColors, this._color, (c) => {
            // Tapping the already-selected swatch clears it, returning to
            // "derive the color from the assigned person/category" (see
            // resolveEventColor) - the only way to reach that state now
            // that there's no free-text field to blank out.
            this._color = this._color === c ? "" : c;
            this._markDirty();
          })}
          <span class="hint">${t(lang, "event.palette_hint")}</span>
        </div>
        <div class="field">
          <label>${t(lang, "event.icon")}</label>
          ${renderIconSwatches(this.defaultIcons, this._icon, (i) => {
            this._icon = this._icon === i ? "" : i;
            this._markDirty();
          })}
          <span class="hint">${t(lang, "event.palette_hint")}</span>
        </div>
      </div>

      ${this.enableStatus
        ? html`
            <div class="field">
              <label for="fp-status">${t(lang, "event.status")}</label>
              <select
                id="fp-status"
                .value=${this._status}
                @change=${(e: Event) => {
                  this._status = (e.target as HTMLSelectElement).value;
                  this._markDirty();
                }}
              >
                <option value="">-</option>
                ${(["planned", "confirmed", "tentative", "done", "cancelled"] as const).map(
                  (s) => html`<option value=${s} ?selected=${s === this._status}>${t(lang, `status.${s}`)}</option>`
                )}
              </select>
            </div>
          `
        : nothing}

      <div class="field">
        <label>${t(lang, "event.reminders")}</label>
        <div class="chip-row">
          ${REMINDER_PRESETS.map(
            (offset) => html`
              <button
                type="button"
                class="reminder-chip ${this._reminders.includes(offset) ? "selected" : ""}"
                @click=${() => this._toggleReminder(offset)}
              >
                ${offset === 0 ? t(lang, "reminder.at_start") : t(lang, `reminder.${offset}`) || `${offset} min`}
              </button>
            `
          )}
        </div>
        <div class="row" style="margin-top:6px">
          <input
            type="number"
            min="0"
            placeholder=${t(lang, "reminder.custom")}
            .value=${this._customReminder}
            @input=${(e: Event) => (this._customReminder = (e.target as HTMLInputElement).value)}
          />
          <button class="btn" type="button" @click=${() => this._addCustomReminder()}>+</button>
        </div>
      </div>

      <div class="field">
        <label for="fp-repeat">${t(lang, "event.repeat")}</label>
        <select
          id="fp-repeat"
          .value=${this._repeatFreq}
          @change=${(e: Event) => {
            this._repeatFreq = (e.target as HTMLSelectElement).value;
            this._markDirty();
          }}
        >
          <option value="">${t(lang, "event.repeat_none")}</option>
          <option value="DAILY" ?selected=${this._repeatFreq === "DAILY"}>Täglich / Daily</option>
          <option value="WEEKLY" ?selected=${this._repeatFreq === "WEEKLY"}>Wöchentlich / Weekly</option>
          <option value="MONTHLY" ?selected=${this._repeatFreq === "MONTHLY"}>Monatlich / Monthly</option>
          <option value="YEARLY" ?selected=${this._repeatFreq === "YEARLY"}>Jährlich / Yearly</option>
        </select>
        ${this._repeatFreq
          ? html`
              <input
                type="date"
                .value=${this._repeatUntil}
                @input=${(e: Event) => (this._repeatUntil = (e.target as HTMLInputElement).value)}
              />
            `
          : nothing}
      </div>

      <div class="actions">
        <button class="btn" type="button" @click=${() => this._requestClose()}>${t(lang, "action.cancel")}</button>
        <button class="btn btn-primary" type="button" ?disabled=${this._submitting} @click=${() => this._handleSave()}>
          ${t(lang, "action.save")}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "family-planner-event-dialog": FamilyPlannerEventDialog;
  }
}
