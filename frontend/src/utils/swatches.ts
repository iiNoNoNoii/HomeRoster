// Shared quick-pick swatch rows used by the event/people/category dialogs so
// the same markup and styling only need to be defined once. Each consuming
// component still owns its own `static styles` block (per component style
// convention in this codebase) but composes it with SWATCH_STYLES rather
// than redefining the same CSS.
import { css, html, type TemplateResult } from "lit";

export const SWATCH_STYLES = css`
  .fp-swatch-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
  .fp-swatch {
    border: 2px solid var(--divider-color, #ccc);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .fp-swatch.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .fp-swatch-icon ha-icon {
    --mdc-icon-size: 18px;
  }
`;

export function renderColorSwatches(
  colors: string[],
  selected: string,
  onPick: (color: string) => void
): TemplateResult {
  return html`
    <div class="fp-swatch-row">
      ${colors.map(
        (c) => html`
          <button
            type="button"
            class="fp-swatch fp-swatch-color ${selected === c ? "selected" : ""}"
            style="background:${c}"
            title=${c}
            aria-label=${c}
            @click=${() => onPick(c)}
          ></button>
        `
      )}
    </div>
  `;
}

export function renderIconSwatches(
  icons: string[],
  selected: string,
  onPick: (icon: string) => void
): TemplateResult {
  return html`
    <div class="fp-swatch-row">
      ${icons.map(
        (i) => html`
          <button
            type="button"
            class="fp-swatch fp-swatch-icon ${selected === i ? "selected" : ""}"
            title=${i}
            aria-label=${i}
            @click=${() => onPick(i)}
          >
            <ha-icon icon=${i}></ha-icon>
          </button>
        `
      )}
    </div>
  `;
}
