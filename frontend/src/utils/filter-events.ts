// Pure client-side filtering pipeline applied to an already range-bounded
// event list. Kept separate from the card so it is unit-testable without a
// DOM/custom-elements environment.
import type { FamilyEvent } from "../types";

export interface EventFilterOptions {
  showDoneEvents: boolean;
  showCancelledEvents: boolean;
  personIds: string[];
  categoryIds: string[];
  search: string;
}

export function filterEvents(events: readonly FamilyEvent[], options: EventFilterOptions): FamilyEvent[] {
  let list: readonly FamilyEvent[] = events;

  if (!options.showDoneEvents) {
    list = list.filter((e) => e.status !== "done");
  }
  if (!options.showCancelledEvents) {
    list = list.filter((e) => e.status !== "cancelled");
  }
  if (options.personIds.length > 0) {
    list = list.filter((e) => e.person_ids.some((id) => options.personIds.includes(id)));
  }
  if (options.categoryIds.length > 0) {
    list = list.filter((e) => e.category_id !== null && options.categoryIds.includes(e.category_id));
  }
  const search = options.search.trim().toLowerCase();
  if (search) {
    list = list.filter((e) =>
      [e.title, e.subtitle, e.description, e.location, e.location_address]
        .filter((field): field is string => Boolean(field))
        .some((field) => field.toLowerCase().includes(search))
    );
  }
  return [...list];
}
