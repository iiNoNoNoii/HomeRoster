// A minimal, self-contained modal shell (backdrop, Escape-to-close, focus
// handling) shared by every Family Planner dialog. Deliberately not built on
// HA's <ha-dialog> so behaviour is identical in and out of Home Assistant
// (including in the vitest test environment) and fully within our control
// for accessibility.
import { LitElement, css, html, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("family-planner-dialog-shell")
export class FamilyPlannerDialogShell extends LitElement {
  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 500;
      padding: 16px;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--ha-dialog-border-radius, 12px);
      width: 100%;
      max-width: 480px;
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .dialog.wide {
      max-width: 720px;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 8px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .dialog-title {
      font-size: 1.15rem;
      font-weight: 500;
    }
    .dialog-close {
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-close:focus-visible,
    .dialog-close:hover {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    }
    .dialog-body {
      padding: 12px 16px 16px;
      overflow-y: auto;
    }
    @media (max-width: 500px) {
      .backdrop {
        padding: 0;
        align-items: flex-end;
      }
      .dialog {
        max-width: 100%;
        max-height: 92vh;
        border-radius: 12px 12px 0 0;
      }
    }
  `;

  @property() heading = "";
  @property({ type: Boolean }) wide = false;

  private _previouslyFocused: HTMLElement | null = null;
  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this._requestClose();
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._onKeydown);
    this._previouslyFocused = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => this._focusFirst());
  }

  disconnectedCallback(): void {
    document.removeEventListener("keydown", this._onKeydown);
    this._previouslyFocused?.focus?.();
    super.disconnectedCallback();
  }

  private _focusFirst(): void {
    const focusable = this.querySelector<HTMLElement>(
      "[autofocus], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])"
    );
    focusable?.focus();
  }

  private _requestClose(): void {
    this.dispatchEvent(new CustomEvent("fp-shell-close"));
  }

  protected render(): TemplateResult {
    return html`
      <div
        class="backdrop"
        @click=${(e: MouseEvent) => {
          if (e.target === e.currentTarget) {
            this._requestClose();
          }
        }}
      >
        <div class="dialog ${this.wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-label=${this.heading}>
          <div class="dialog-header">
            <div class="dialog-title">${this.heading}</div>
            <button class="dialog-close" type="button" aria-label="Close" @click=${() => this._requestClose()}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-body"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "family-planner-dialog-shell": FamilyPlannerDialogShell;
  }
}
