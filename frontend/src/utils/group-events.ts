// Pure day-grouping logic for the "day-grouped event list" views (the week
// view's per-day sections, the agenda view, and the flat search/category
// results list in homeroster-card.ts) - kept dependency-free from Lit so
// it can be unit tested directly, mirroring utils/filter-events.ts.
import type { FamilyEvent } from "../types";
import { addDays, isSameDay } from "./datetime";

export interface DayEventGroup {
  day: Date;
  events: FamilyEvent[];
}

/** True if `event` (using its expanded `occurrence_start`/`occurrence_end`)
 * overlaps the given calendar day at all - used for all-day events, which
 * may span multiple days. */
export function overlapsDay(event: Pick<FamilyEvent, "occurrence_start" | "occurrence_end">, day: Date): boolean {
  const start = new Date(event.occurrence_start);
  const end = new Date(event.occurrence_end);
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const dayEnd = addDays(dayStart, 1);
  return start < dayEnd && end > dayStart;
}

/** Groups `events` by calendar day, producing one group per entry in `days`
 * (in the given order, including days with zero matching events - callers
 * decide whether to render an empty state for those, e.g. the week view's
 * day sections). Within each day, all-day events sort first, then timed
 * events chronologically. */
export function groupEventsByDay(events: readonly FamilyEvent[], days: readonly Date[]): DayEventGroup[] {
  return days.map((day) => ({
    day,
    events: events
      .filter((e) => (e.all_day ? overlapsDay(e, day) : isSameDay(new Date(e.occurrence_start), day)))
      .sort((a, b) => {
        if (a.all_day !== b.all_day) {
          return a.all_day ? -1 : 1;
        }
        return new Date(a.occurrence_start).getTime() - new Date(b.occurrence_start).getTime();
      }),
  }));
}

/** Returns the distinct calendar days present among `events` (via each
 * timed event's `occurrence_start`, or the day an all-day event starts on),
 * sorted chronologically. Used by the flat search/category results list,
 * which has no fixed date range to group against - unlike the agenda/week
 * views, it only shows days that actually have matching events. */
export function uniqueSortedDays(events: readonly FamilyEvent[]): Date[] {
  const byKey = new Map<string, Date>();
  for (const e of events) {
    const d = new Date(e.occurrence_start);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!byKey.has(key)) {
      byKey.set(key, new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  }
  return [...byKey.values()].sort((a, b) => a.getTime() - b.getTime());
}
