import { html, nothing, type TemplateResult } from "lit";
import { addDays, isSameDay, isoWeekNumber, startOfMonthGrid } from "../utils/datetime";
import { t } from "../utils/localize";
import type { FamilyEvent } from "../types";
import type { ViewContext } from "./context";
import { renderEventChip } from "./shared";

const WEEKS_IN_GRID = 6;

export function renderMonthView(ctx: ViewContext): TemplateResult {
  const showWeekends = ctx.config.show_weekends ?? true;
  const showWeekNumbers = ctx.config.show_week_numbers ?? true;
  const maxPerDay = ctx.config.max_events_per_day ?? 3;
  const gridStart = startOfMonthGrid(ctx.currentDate, ctx.firstWeekday);
  const currentMonth = ctx.currentDate.getMonth();

  const weeks: Date[][] = [];
  let cursor = gridStart;
  for (let w = 0; w < WEEKS_IN_GRID; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const dow = cursor.getDay();
      if (showWeekends || (dow !== 0 && dow !== 6)) {
        week.push(cursor);
      }
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }

  const weekdayHeaders = weeks[0].map((d) => t(ctx.hass.language, `weekday.short.${d.getDay()}`));
  const gridTemplateColumns = `${showWeekNumbers ? "32px " : ""}repeat(${weeks[0].length}, 1fr)`;

  const eventsForDay = (day: Date): FamilyEvent[] =>
    ctx.events
      .filter((e) => {
        const start = new Date(e.occurrence_start);
        const end = new Date(e.occurrence_end);
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        const dayEnd = addDays(dayStart, 1);
        return start < dayEnd && end > dayStart;
      })
      .sort((a, b) => {
        if (a.all_day !== b.all_day) {
          return a.all_day ? -1 : 1;
        }
        return new Date(a.occurrence_start).getTime() - new Date(b.occurrence_start).getTime();
      });

  return html`
    <div class="fp-view fp-view-month">
      <div class="fp-month-headerrow" style="grid-template-columns:${gridTemplateColumns}">
        ${showWeekNumbers ? html`<div class="fp-month-weeknum-header"></div>` : nothing}
        ${weekdayHeaders.map((label) => html`<div class="fp-month-weekday">${label}</div>`)}
      </div>
      ${weeks.map(
        (week) => html`
          <div class="fp-month-week" style="grid-template-columns:${gridTemplateColumns}">
            ${showWeekNumbers
              ? html`<div class="fp-month-weeknum">${t(ctx.hass.language, "calendar_week_short")}${isoWeekNumber(week[0])}</div>`
              : nothing}
            ${week.map((day) => {
              const dayEvents = eventsForDay(day);
              const visible = dayEvents.slice(0, maxPerDay);
              const overflow = dayEvents.length - visible.length;
              const inMonth = day.getMonth() === currentMonth;
              return html`
                <div
                  class="fp-month-cell ${inMonth ? "" : "fp-outside-month"} ${isSameDay(day, ctx.now) && (ctx.config.highlight_today ?? true) ? "fp-today" : ""}"
                  @click=${() => ctx.callbacks.onSlotClick(day, true)}
                >
                  <div class="fp-month-cell-date">${day.getDate()}</div>
                  <div class="fp-month-cell-events">
                    ${visible.map((e) => renderEventChip(ctx, e, { compact: true }))}
                    ${overflow > 0
                      ? html`<button
                          type="button"
                          class="fp-month-more"
                          @click=${(ev: Event) => {
                            ev.stopPropagation();
                            ctx.callbacks.onMoreClick(day, dayEvents);
                          }}
                        >
                          ${t(ctx.hass.language, "month.more", { count: overflow })}
                        </button>`
                      : nothing}
                  </div>
                </div>
              `;
            })}
          </div>
        `
      )}
    </div>
  `;
}
