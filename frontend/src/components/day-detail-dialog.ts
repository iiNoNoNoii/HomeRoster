// Shows every event of one day - opened from the month view's "+N more".
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./dialog-shell";
import { resolveEventColor } from "../utils/colors";
import { eventTimeLabel, personsForEvent, renderPersonDots } from "../views/shared";
import { resolveLanguage, t } from "../utils/localize";
import type { HomeAssistant } from "../ha-types";
import type { Category, FamilyEvent, Person } from "../types";

const STYLES = css`
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 6px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    text-align: left;
    min-height: 44px;
  }
  .bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .time {
    min-width: 48px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .title {
    flex: 1;
  }
  .add-btn {
    margin-top: 8px;
    width: 100%;
    border: 1px dashed var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px;
    background: transparent;
    color: var(--primary-text-color);
    min-height: 44px;
  }
`;

@customElement("homeroster-day-detail-dialog")
export class HomeRosterDayDetailDialog extends LitElement {
  static styles = STYLES;

  @property({ attribute: false }) hass!: HomeAssistant;
  // See event-dialog.ts's `language` property for the "auto" vs explicit
  // override contract.
  @property({ type: String }) language = "auto";
  @property({ attribute: false }) people: Person[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) date!: Date;
  @property({ attribute: false }) events: FamilyEvent[] = [];
  @property({ type: Boolean }) canWrite = true;

  private _close(): void {
    this.dispatchEvent(new CustomEvent("fp-close"));
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(this.language, this.hass?.language ?? "auto");
    // Intl-based date formatting stays keyed to the viewer's actual
    // hass.language (not the resolved t() language) - it depends on more
    // than a two-letter UI language code, unlike the plain string lookups
    // below.
    const heading = new Intl.DateTimeFormat(this.hass?.language || "de", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(this.date);
    return html`
      <homeroster-dialog-shell .heading=${heading} @fp-shell-close=${() => this._close()}>
        ${this.events.map((event) => {
          const color = resolveEventColor(event, this.people, this.categories, "person");
          const persons = personsForEvent(event, this.people);
          return html`
            <button
              type="button"
              class="item"
              @click=${() => this.dispatchEvent(new CustomEvent("fp-event-click", { detail: event }))}
            >
              <span class="bar" style="background:${color}"></span>
              <span class="time">${event.all_day ? t(lang, "event.all_day") : eventTimeLabel(event, true)}</span>
              <span class="title">${event.title}</span>
              ${renderPersonDots(persons, this.hass, 4, lang)}
            </button>
          `;
        })}
        ${this.canWrite
          ? html`
              <button
                type="button"
                class="add-btn"
                @click=${() => this.dispatchEvent(new CustomEvent("fp-add-event", { detail: { date: this.date } }))}
              >
                + ${t(lang, "action.add_event")}
              </button>
            `
          : nothing}
      </homeroster-dialog-shell>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "homeroster-day-detail-dialog": HomeRosterDayDetailDialog;
  }
}
