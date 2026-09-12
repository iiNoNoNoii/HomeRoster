// Week view: unlike the day view (which still uses the hour-by-hour time
// grid in time-grid.ts), the week view stacks each day vertically as its
// own header + day-grouped event list - see the project owner's feedback in
// the "week view" work item for the reasoning (7 empty time-grid columns
// wasted space and most cells were never clicked).
//
// This is a rolling "7-day forecast" window starting at whatever day is
// currently selected, e.g. days [today, today+1, ..., today+6] right after
// the "Heute"/"Today" nav button resets the current date - not a snap to
// the Mon-Sun/Sun-Sat calendar week the old implementation used. That old
// behavior could show several already-past days whenever "today" wasn't a
// Monday (or Sunday, depending on first_weekday). homeroster-card.ts's
// _computeRange() ("week" case) and _rangeLabel() ("week" case) must stay in
// sync with the day window computed here - see computeWeekDays() below,
// which both this view and the card's range/label logic are built on.
import { html, nothing, type TemplateResult } from "lit";
import { addDays, isSameDay, isoWeekNumber } from "../utils/datetime";
import type { DayEventGroup } from "../utils/group-events";
import { groupEventsByDay } from "../utils/group-events";
import { t } from "../utils/localize";
import type { ViewContext } from "./context";
import { renderEventListItem } from "./shared";

/** Pure computation of the rolling 7-day forecast window's day list, given
 * the window's start date (any time-of-day; only the calendar date matters).
 * Always exactly 7 consecutive days - `show_weekends` does NOT trim this
 * list (see the comment in renderWeekView() for why). Extracted as a pure
 * function so the date arithmetic is unit-testable without rendering. */
export function computeWeekDays(currentDate: Date): Date[] {
  const start = new Date(currentDate);
  start.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }
  return days;
}

export function renderWeekView(ctx: ViewContext): TemplateResult {
  const days = computeWeekDays(ctx.currentDate);

  // `show_weekends` was designed for the old fixed 7-column calendar-week
  // grid, where hiding Saturday/Sunday cleanly reduces it to a 5-column
  // workweek grid. That doesn't translate to a rolling 7-day window: hiding
  // weekend days here would leave a variable number of visible days (5, 6,
  // or 7, depending on which weekday the window happens to start on), which
  // reads oddly for a "next 7 days" forecast. We deliberately always show
  // all 7 consecutive days in this view and ignore show_weekends here.
  const groups = groupEventsByDay(ctx.events, days);

  return html`
    <div class="fp-view fp-view-week">
      ${(ctx.config.show_week_numbers ?? true) ? renderWeekNumberLabel(ctx, days[0]) : nothing}
      ${groups.map((group) => renderWeekDaySection(ctx, group))}
    </div>
  `;
}

/** The rolling window rarely aligns to ISO week boundaries and can span two
 * different ISO weeks. We simply show the ISO week number of the window's
 * *start* day, unconditionally - still meaningful orientation info ("we're
 * roughly in week X") - rather than a conditional "only when the window
 * fits in one ISO week" rule, which would make the label disappear/reappear
 * in a way that's harder to explain than just always showing the start. */
function renderWeekNumberLabel(ctx: ViewContext, start: Date): TemplateResult {
  return html`<div class="fp-week-number">${t(ctx.language, "calendar_week_short")} ${isoWeekNumber(start)}</div>`;
}

function renderWeekDaySection(ctx: ViewContext, group: DayEventGroup): TemplateResult {
  const isToday = isSameDay(group.day, ctx.now);
  return html`
    <div class="fp-week-day-section">
      <div class="fp-day-header fp-week-day-header ${isToday ? "fp-today" : ""}">
        <span class="fp-day-header-weekday">${t(ctx.language, `weekday.short.${group.day.getDay()}`)}</span>
        <span class="fp-day-header-date">${group.day.getDate()}.${group.day.getMonth() + 1}.</span>
        <button
          type="button"
          class="fp-week-day-add"
          title=${t(ctx.language, "action.add_event")}
          aria-label=${t(ctx.language, "action.add_event")}
          @click=${() => ctx.callbacks.onSlotClick(defaultCreateTime(group.day, ctx.now), false)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${group.events.length > 0
        ? html`<div class="fp-agenda-items fp-week-day-items">${group.events.map((event) => renderEventListItem(ctx, event))}</div>`
        : html`<div class="fp-week-day-empty">${t(ctx.language, "empty.no_events_short")}</div>`}
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
