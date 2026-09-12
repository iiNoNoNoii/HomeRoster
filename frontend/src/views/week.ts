import { html, nothing, type TemplateResult } from "lit";
import { addDays, isoWeekNumber, startOfWeek } from "../utils/datetime";
import { t } from "../utils/localize";
import type { ViewContext } from "./context";
import { renderTimeGrid } from "./time-grid";

export function renderWeekView(ctx: ViewContext): TemplateResult {
  const weekStart = startOfWeek(ctx.currentDate, ctx.firstWeekday);
  const showWeekends = ctx.config.show_weekends ?? true;
  const dayCount = showWeekends ? 7 : 5;
  const days: Date[] = [];
  for (let i = 0, added = 0; added < dayCount && i < 7; i++) {
    const day = addDays(weekStart, i);
    const dow = day.getDay();
    if (!showWeekends && (dow === 0 || dow === 6)) {
      continue;
    }
    days.push(day);
    added++;
  }
  return html`
    <div class="fp-view fp-view-week">
      ${(ctx.config.show_week_numbers ?? true)
        ? html`<div class="fp-week-number">${t(ctx.hass.language, "calendar_week_short")} ${isoWeekNumber(weekStart)}</div>`
        : nothing}
      ${renderTimeGrid(ctx, days)}
    </div>
  `;
}
