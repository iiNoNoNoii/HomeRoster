import { html, type TemplateResult } from "lit";
import type { ViewContext } from "./context";
import { renderTimeGrid } from "./time-grid";

export function renderDayView(ctx: ViewContext): TemplateResult {
  return html`<div class="fp-view fp-view-day">${renderTimeGrid(ctx, [ctx.currentDate])}</div>`;
}
