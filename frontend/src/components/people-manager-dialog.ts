// Admin-only people manager: create, edit, reorder, deactivate/delete with
// the mandatory data-loss-safe deletion strategy (see coordinator.py
// async_delete_person). All mutations go straight through the websocket API
// and the card is notified via `fp-people-changed` to refresh its own list.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./dialog-shell";
import * as api from "../api";
import type { HomeAssistant } from "../ha-types";
import type { Person } from "../types";
import { DEFAULT_COLORS } from "../const";
import { resolveLanguage, t } from "../utils/localize";
import { renderColorSwatches, SWATCH_STYLES } from "../utils/swatches";

const STYLES = css`
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .name {
    flex: 1;
  }
  .name.inactive {
    opacity: 0.5;
  }
  .iconbtn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .iconbtn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  }
  input[type="text"],
  input[type="color"],
  select {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 8px 10px;
    min-height: 40px;
    font: inherit;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn {
    border-radius: 8px;
    padding: 8px 14px;
    min-height: 40px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
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
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

interface DraftPerson {
  id: string | null;
  name: string;
  color: string;
  role: string;
}

const EMPTY_DRAFT: DraftPerson = { id: null, name: "", color: "#3f51b5", role: "" };

@customElement("family-planner-people-manager-dialog")
export class FamilyPlannerPeopleManagerDialog extends LitElement {
  static styles = [STYLES, SWATCH_STYLES];

  @property({ attribute: false }) hass!: HomeAssistant;
  // See event-dialog.ts's `language` property for the "auto" vs explicit
  // override contract.
  @property({ type: String }) language = "auto";
  @property({ attribute: false }) people: Person[] = [];
  @property({ attribute: false }) defaultColors: string[] = DEFAULT_COLORS;

  @state() private _draft: DraftPerson = { ...EMPTY_DRAFT };
  @state() private _deletingId: string | null = null;
  @state() private _deleteStrategy = "deactivate";
  @state() private _reassignTo = "";
  @state() private _error: string | null = null;

  private _close(): void {
    this.dispatchEvent(new CustomEvent("fp-close"));
  }

  private async _save(): Promise<void> {
    if (!this._draft.name.trim()) {
      return;
    }
    try {
      if (this._draft.id) {
        await api.updatePerson(this.hass, this._draft.id, {
          name: this._draft.name.trim(),
          color: this._draft.color,
          role: (this._draft.role || null) as Person["role"],
        });
      } else {
        await api.createPerson(this.hass, {
          name: this._draft.name.trim(),
          color: this._draft.color,
          role: (this._draft.role || null) as Person["role"],
        });
      }
      this._draft = { ...EMPTY_DRAFT };
      this._error = null;
      this.dispatchEvent(new CustomEvent("fp-people-changed"));
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _toggleActive(person: Person): Promise<void> {
    await api.updatePerson(this.hass, person.id, { active: !person.active });
    this.dispatchEvent(new CustomEvent("fp-people-changed"));
  }

  private async _move(person: Person, direction: -1 | 1): Promise<void> {
    const ordered = [...this.people].sort((a, b) => a.sort_order - b.sort_order).map((p) => p.id);
    const index = ordered.indexOf(person.id);
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= ordered.length) {
      return;
    }
    [ordered[index], ordered[swapWith]] = [ordered[swapWith], ordered[index]];
    await api.reorderPeople(this.hass, ordered);
    this.dispatchEvent(new CustomEvent("fp-people-changed"));
  }

  private async _confirmDelete(): Promise<void> {
    if (!this._deletingId) {
      return;
    }
    try {
      await api.deletePerson(
        this.hass,
        this._deletingId,
        this._deleteStrategy as api.PersonDeleteStrategy,
        this._reassignTo || undefined
      );
      this._deletingId = null;
      this._error = null;
      this.dispatchEvent(new CustomEvent("fp-people-changed"));
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(this.language, this.hass?.language ?? "auto");
    const sorted = [...this.people].sort((a, b) => a.sort_order - b.sort_order);
    return html`
      <family-planner-dialog-shell .heading=${t(lang, "people.title")} @fp-shell-close=${() => this._close()}>
        ${this._error ? html`<div class="confirm-box">${this._error}</div>` : nothing}
        ${sorted.map(
          (person, index) => html`
            <div class="row">
              <span class="dot" style="background:${person.color}"></span>
              <span class="name ${person.active ? "" : "inactive"}">${person.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${index === 0} @click=${() => this._move(person, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${index === sorted.length - 1}
                @click=${() => this._move(person, 1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" title=${t(lang, "people.active")} @click=${() => this._toggleActive(person)}>
                <ha-icon icon=${person.active ? "mdi:eye" : "mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${t(lang, "action.edit")}
                @click=${() =>
                  (this._draft = { id: person.id, name: person.name, color: person.color, role: person.role ?? "" })}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${t(lang, "action.delete")} @click=${() => (this._deletingId = person.id)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId === person.id ? this._renderDeleteConfirm(lang, person) : nothing}
          `
        )}

        <div class="form">
          <input
            type="text"
            placeholder=${t(lang, "people.name")}
            .value=${this._draft.name}
            @input=${(e: Event) => (this._draft = { ...this._draft, name: (e.target as HTMLInputElement).value })}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${(e: Event) => (this._draft = { ...this._draft, color: (e.target as HTMLInputElement).value })}
          />
          ${renderColorSwatches(
            this.defaultColors,
            this._draft.color,
            (c) => (this._draft = { ...this._draft, color: c })
          )}
          <select
            .value=${this._draft.role}
            @change=${(e: Event) => (this._draft = { ...this._draft, role: (e.target as HTMLSelectElement).value })}
          >
            <option value="">-</option>
            <option value="parent" ?selected=${this._draft.role === "parent"}>${t(lang, "people.role.parent")}</option>
            <option value="child" ?selected=${this._draft.role === "child"}>${t(lang, "people.role.child")}</option>
            <option value="other" ?selected=${this._draft.role === "other"}>${t(lang, "people.role.other")}</option>
          </select>
          <button class="btn btn-primary" type="button" @click=${() => void this._save()}>
            ${this._draft.id ? t(lang, "action.save") : t(lang, "people.add")}
          </button>
          ${this._draft.id
            ? html`<button class="btn" type="button" @click=${() => (this._draft = { ...EMPTY_DRAFT })}>
                ${t(lang, "action.cancel")}
              </button>`
            : nothing}
        </div>
      </family-planner-dialog-shell>
    `;
  }

  private _renderDeleteConfirm(lang: string | undefined, person: Person): TemplateResult {
    const others = this.people.filter((p) => p.id !== person.id);
    return html`
      <div class="confirm-box">
        <div>${t(lang, "people.delete_title")} (${person.name})</div>
        <select
          .value=${this._deleteStrategy}
          @change=${(e: Event) => (this._deleteStrategy = (e.target as HTMLSelectElement).value)}
        >
          <option value="deactivate">${t(lang, "people.delete_strategy.deactivate")}</option>
          <option value="remove_from_events">${t(lang, "people.delete_strategy.remove_from_events")}</option>
          <option value="reassign">${t(lang, "people.delete_strategy.reassign")}</option>
          <option value="keep_unassigned">${t(lang, "people.delete_strategy.keep_unassigned")}</option>
        </select>
        ${this._deleteStrategy === "reassign"
          ? html`
              <select .value=${this._reassignTo} @change=${(e: Event) => (this._reassignTo = (e.target as HTMLSelectElement).value)}>
                <option value="">${t(lang, "people.reassign_to")}</option>
                ${others.map((p) => html`<option value=${p.id}>${p.name}</option>`)}
              </select>
            `
          : nothing}
        <div class="form">
          <button class="btn btn-primary" type="button" @click=${() => void this._confirmDelete()}>
            ${t(lang, "action.delete")}
          </button>
          <button class="btn" type="button" @click=${() => (this._deletingId = null)}>${t(lang, "action.cancel")}</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "family-planner-people-manager-dialog": FamilyPlannerPeopleManagerDialog;
  }
}
