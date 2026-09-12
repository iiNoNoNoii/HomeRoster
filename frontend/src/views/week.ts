// Week view: unlike the day view (which still uses the hour-by-hour time
// grid in time-grid.ts), the week view stacks each day vertically as its
// own header + day-grouped event list - see the project owner's feedback in
// the "week view" work item for the reasoning (7 empty time-grid columns
// wasted space and most cells were never clicked).
import { html, nothing, type TemplateResult } from "lit";
import { addDays, isSameDay, isoWeekNumber, startOfWeek } from "../utils/datetime";
import type { DayEventGroup } from "../utils/group-events";
import { groupEventsByDay } from "../utils/group-events";
import { t } from "../utils/localize";
import type { ViewContext } from "./context";
import { renderEventListItem } from "./shared";

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
  const groups = groupEventsByDay(ctx.events, days);

  return html`
    <div class="fp-view fp-view-week">
      ${(ctx.config.show_week_numbers ?? true)
        ? html`<div class="fp-week-number">${t(ctx.hass.language, "calendar_week_short")} ${isoWeekNumber(weekStart)}</div>`
        : nothing}
      ${groups.map((group) => renderWeekDaySection(ctx, group))}
    </div>
  `;
}

function renderWeekDaySection(ctx: ViewContext, group: DayEventGroup): TemplateResult {
  const isToday = isSameDay(group.day, ctx.now);
  return html`
    <div class="fp-week-day-section">
      <div class="fp-day-header fp-week-day-header ${isToday ? "fp-today" : ""}">
        <span class="fp-day-header-weekday">${t(ctx.hass.language, `weekday.short.${group.day.getDay()}`)}</span>
        <span class="fp-day-header-date">${group.day.getDate()}.${group.day.getMonth() + 1}.</span>
        <button
          type="button"
          class="fp-week-day-add"
          title=${t(ctx.hass.language, "action.add_event")}
          aria-label=${t(ctx.hass.language, "action.add_event")}
          @click=${() => ctx.callbacks.onSlotClick(defaultCreateTime(group.day, ctx.now), false)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${group.events.length > 0
        ? html`<div class="fp-agenda-items fp-week-day-items">${group.events.map((event) => renderEventListItem(ctx, event))}</div>`
        : html`<div class="fp-week-day-empty">${t(ctx.hass.language, "empty.no_events_short")}</div>`}
    </div>
  `;
}

/** Default time prefilled when quick-creating an event from a week day
 * section's "+" button (there's no clicked time slot anymore, unlike the
 * old time-grid). Today: rounds up to the next full/half hour from now.
 * Any other day: a fixed, unobtrusive default of 09:00. */
function defaultCreateTime(day: Date, now: Date): Date {
  const result = new Date(day);
  if (isSameDay(day, now)) {
    const roundedUpToHalfHour = now.getMinutes() < 30 ? 30 : 60;
    result.setHours(now.getHours(), 0, 0, 0);
    result.setMinutes(roundedUpToHalfHour);
  } else {
    result.setHours(9, 0, 0, 0);
  }
  return result;
}
