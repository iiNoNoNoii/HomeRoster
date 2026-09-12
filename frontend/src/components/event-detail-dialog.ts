// Read-only detail view with edit/delete/duplicate/status actions.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./dialog-shell";
import { resolveEventColor } from "../utils/colors";
import { formatTime } from "../utils/datetime";
import { resolveLanguage, t } from "../utils/localize";
import type { HomeAssistant } from "../ha-types";
import type { Category, FamilyEvent, Person } from "../types";

const STYLES = css`
  .meta-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
  }
  .meta-row ha-icon {
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .color-bar {
    width: 6px;
    border-radius: 3px;
    align-self: stretch;
    min-height: 24px;
  }
  .subtitle {
    color: var(--secondary-text-color);
  }
  .person-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .person-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 14px;
    padding: 4px 10px;
    background: var(--secondary-background-color, #eee);
  }
  .person-pill .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .status-badge {
    display: inline-block;
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    padding: 10px 16px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-danger {
    color: var(--error-color, #db4437);
    border-color: var(--error-color, #db4437);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

@customElement("homeroster-event-detail-dialog")
export class HomeRosterEventDetailDialog extends LitElement {
  static styles = STYLES;

  @property({ attribute: false }) hass!: HomeAssistant;
  // See event-dialog.ts's `language` property for the "auto" vs explicit
  // override contract.
  @property({ type: String }) language = "auto";
  @property({ attribute: false }) people: Person[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) event!: FamilyEvent;
  @property({ type: Boolean }) canWrite = true;

  @state() private _confirmingDelete = false;

  private _close(): void {
    this.dispatchEvent(new CustomEvent("fp-close"));
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(this.language, this.hass?.language ?? "auto");
    const event = this.event;
    const color = resolveEventColor(event, this.people, this.categories, "person");
    const persons = event.person_ids.map((id) => this.people.find((p) => p.id === id)).filter(Boolean) as Person[];
    const category = event.category_id ? this.categories.find((c) => c.id === event.category_id) : undefined;
    const isRecurring = Boolean(event.rrule) || Boolean(event.is_recurring_instance);

    return html`
      <homeroster-dialog-shell .heading=${event.title} @fp-shell-close=${() => this._close()}>
        <div class="meta-row">
          <span class="color-bar" style="background:${color}"></span>
          <div>
            ${event.subtitle ? html`<div class="subtitle">${event.subtitle}</div>` : nothing}
            <div>
              ${event.all_day
                ? t(lang, "event.all_day")
                : `${formatTime(new Date(event.occurrence_start), true)} – ${formatTime(new Date(event.occurrence_end), true)}`}
            </div>
            ${event.status ? html`<span class="status-badge">${t(lang, `status.${event.status}`)}</span>` : nothing}
          </div>
        </div>

        ${persons.length > 0
          ? html`
              <div class="meta-row">
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                <div class="person-list">
                  ${persons.map(
                    (p) => html`<span class="person-pill"><span class="dot" style="background:${p.color}"></span>${p.name}</span>`
                  )}
                </div>
              </div>
            `
          : nothing}

        ${event.location
          ? html`<div class="meta-row"><ha-icon icon="mdi:map-marker"></ha-icon><div>${event.location}</div></div>`
          : nothing}
        ${category
          ? html`<div class="meta-row"><ha-icon icon=${category.icon || "mdi:tag"}></ha-icon><div>${category.name}</div></div>`
          : nothing}
        ${event.description
          ? html`<div class="meta-row"><ha-icon icon="mdi:text"></ha-icon><div>${event.description}</div></div>`
          : nothing}

        ${this._confirmingDelete ? this._renderDeleteConfirm(lang, isRecurring) : this._renderActions(lang)}
      </homeroster-dialog-shell>
    `;
  }

  private _renderActions(lang: string | undefined): TemplateResult {
    if (!this.canWrite) {
      return html``;
    }
    return html`
      <div class="actions">
        <button class="btn" type="button" @click=${() => this.dispatchEvent(new CustomEvent("fp-edit", { detail: this.event }))}>
          <ha-icon icon="mdi:pencil"></ha-icon>${t(lang, "action.edit")}
        </button>
        <button class="btn" type="button" @click=${() => this.dispatchEvent(new CustomEvent("fp-duplicate"))}>
          <ha-icon icon="mdi:content-copy"></ha-icon>${t(lang, "action.duplicate")}
        </button>
        ${this.event.status !== "done"
          ? html`
              <button
                class="btn"
                type="button"
                @click=${() => this.dispatchEvent(new CustomEvent("fp-set-status", { detail: "done" }))}
              >
                <ha-icon icon="mdi:check"></ha-icon>${t(lang, "action.mark_done")}
              </button>
            `
          : nothing}
        <button class="btn btn-danger" type="button" @click=${() => (this._confirmingDelete = true)}>
          <ha-icon icon="mdi:delete"></ha-icon>${t(lang, "action.delete")}
        </button>
      </div>
    `;
  }

  private _renderDeleteConfirm(lang: string | undefined, isRecurring: boolean): TemplateResult {
    return html`
      <div class="confirm-box">
        <div>${t(lang, "dialog.confirm_delete_title")}</div>
        <div class="actions">
          ${isRecurring
            ? html`
                <button
                  class="btn btn-danger"
                  type="button"
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent("fp-delete", {
                        detail: { mode: "instance", occurrenceStart: this.event.occurrence_start },
                      })
                    )}
                >
                  ${t(lang, "dialog.confirm_delete_instance")}
                </button>
              `
            : nothing}
          <button
            class="btn btn-danger"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("fp-delete", { detail: { mode: "series" } }))}
          >
            ${isRecurring ? t(lang, "dialog.confirm_delete_series") : t(lang, "action.delete")}
          </button>
          <button class="btn" type="button" @click=${() => (this._confirmingDelete = false)}>
            ${t(lang, "action.cancel")}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "homeroster-event-detail-dialog": HomeRosterEventDetailDialog;
  }
}
