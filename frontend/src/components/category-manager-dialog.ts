// Admin-only category manager. Deleting a category never deletes events -
// the backend simply clears category_id on any event that referenced it
// (see coordinator.py async_delete_category).
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./dialog-shell";
import * as api from "../api";
import type { HomeAssistant } from "../ha-types";
import type { Category } from "../types";
import { DEFAULT_COLORS, DEFAULT_ICONS } from "../const";
import { resolveLanguage, t } from "../utils/localize";
import { renderColorSwatches, renderIconSwatches, SWATCH_STYLES } from "../utils/swatches";

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
  input[type="color"] {
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
    gap: 8px;
    align-items: center;
  }
`;

interface DraftCategory {
  id: string | null;
  name: string;
  color: string;
  icon: string;
}

const EMPTY_DRAFT: DraftCategory = { id: null, name: "", color: "#9e9e9e", icon: "" };

@customElement("family-planner-category-manager-dialog")
export class FamilyPlannerCategoryManagerDialog extends LitElement {
  static styles = [STYLES, SWATCH_STYLES];

  @property({ attribute: false }) hass!: HomeAssistant;
  // See event-dialog.ts's `language` property for the "auto" vs explicit
  // override contract.
  @property({ type: String }) language = "auto";
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) defaultColors: string[] = DEFAULT_COLORS;
  @property({ attribute: false }) defaultIcons: string[] = DEFAULT_ICONS;

  @state() private _draft: DraftCategory = { ...EMPTY_DRAFT };
  @state() private _deletingId: string | null = null;
  @state() private _error: string | null = null;

  private _close(): void {
    this.dispatchEvent(new CustomEvent("fp-close"));
  }

  private async _save(): Promise<void> {
    if (!this._draft.name.trim()) {
      return;
    }
    try {
      const icon = this._draft.icon.trim() || null;
      if (this._draft.id) {
        await api.updateCategory(this.hass, this._draft.id, {
          name: this._draft.name.trim(),
          color: this._draft.color,
          icon,
        });
      } else {
        await api.createCategory(this.hass, { name: this._draft.name.trim(), color: this._draft.color, icon });
      }
      this._draft = { ...EMPTY_DRAFT };
      this._error = null;
      this.dispatchEvent(new CustomEvent("fp-categories-changed"));
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  private async _toggleActive(category: Category): Promise<void> {
    await api.updateCategory(this.hass, category.id, { active: !category.active });
    this.dispatchEvent(new CustomEvent("fp-categories-changed"));
  }

  private async _move(category: Category, direction: -1 | 1): Promise<void> {
    const ordered = [...this.categories].sort((a, b) => a.sort_order - b.sort_order).map((c) => c.id);
    const index = ordered.indexOf(category.id);
    const swapWith = index + direction;
    if (swapWith < 0 || swapWith >= ordered.length) {
      return;
    }
    [ordered[index], ordered[swapWith]] = [ordered[swapWith], ordered[index]];
    await api.reorderCategories(this.hass, ordered);
    this.dispatchEvent(new CustomEvent("fp-categories-changed"));
  }

  private async _confirmDelete(): Promise<void> {
    if (!this._deletingId) {
      return;
    }
    try {
      await api.deleteCategory(this.hass, this._deletingId);
      this._deletingId = null;
      this._error = null;
      this.dispatchEvent(new CustomEvent("fp-categories-changed"));
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(this.language, this.hass?.language ?? "auto");
    const sorted = [...this.categories].sort((a, b) => a.sort_order - b.sort_order);
    return html`
      <family-planner-dialog-shell .heading=${t(lang, "category.title")} @fp-shell-close=${() => this._close()}>
        ${this._error ? html`<div class="confirm-box">${this._error}</div>` : nothing}
        ${sorted.map(
          (category, index) => html`
            <div class="row">
              <span class="dot" style="background:${category.color}"></span>
              ${category.icon ? html`<ha-icon icon=${category.icon}></ha-icon>` : nothing}
              <span class="name ${category.active ? "" : "inactive"}">${category.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${index === 0} @click=${() => this._move(category, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${index === sorted.length - 1}
                @click=${() => this._move(category, 1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" @click=${() => this._toggleActive(category)}>
                <ha-icon icon=${category.active ? "mdi:eye" : "mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${t(lang, "action.edit")}
                @click=${() =>
                  (this._draft = {
                    id: category.id,
                    name: category.name,
                    color: category.color,
                    icon: category.icon ?? "",
                  })}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${t(lang, "action.delete")} @click=${() => (this._deletingId = category.id)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId === category.id
              ? html`
                  <div class="confirm-box">
                    <span>${t(lang, "action.delete")}: ${category.name}?</span>
                    <button class="btn btn-primary" type="button" @click=${() => void this._confirmDelete()}>
                      ${t(lang, "action.delete")}
                    </button>
                    <button class="btn" type="button" @click=${() => (this._deletingId = null)}>
                      ${t(lang, "action.cancel")}
                    </button>
                  </div>
                `
              : nothing}
          `
        )}

        <div class="form">
          <input
            type="text"
            placeholder=${t(lang, "category.name")}
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
          <input
            type="text"
            placeholder=${t(lang, "event.icon")}
            .value=${this._draft.icon}
            @input=${(e: Event) => (this._draft = { ...this._draft, icon: (e.target as HTMLInputElement).value })}
          />
          ${renderIconSwatches(
            this.defaultIcons,
            this._draft.icon,
            (i) => (this._draft = { ...this._draft, icon: i })
          )}
          <button class="btn btn-primary" type="button" @click=${() => void this._save()}>
            ${this._draft.id ? t(lang, "action.save") : t(lang, "category.add")}
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
}

declare global {
  interface HTMLElementTagNameMap {
    "family-planner-category-manager-dialog": FamilyPlannerCategoryManagerDialog;
  }
}
