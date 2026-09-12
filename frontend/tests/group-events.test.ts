import { describe, expect, it } from "vitest";
import { groupEventsByDay, overlapsDay, uniqueSortedDays } from "../src/utils/group-events";
import type { FamilyEvent } from "../src/types";

function makeEvent(overrides: Partial<FamilyEvent>): FamilyEvent {
  return {
    id: overrides.id ?? "e1",
    title: "Zahnarzt",
    subtitle: null,
    start: "2026-09-20T14:00:00+02:00",
    end: "2026-09-20T15:00:00+02:00",
    all_day: false,
    person_ids: ["anna"],
    description: null,
    location: null,
    category_id: null,
    color: null,
    icon: null,
    status: null,
    created_at: "2026-01-01T00:00:00+00:00",
    updated_at: "2026-01-01T00:00:00+00:00",
    created_by: null,
    reminders: [],
    rrule: null,
    exdates: [],
    version: 1,
    occurrence_start: "2026-09-20T14:00:00+02:00",
    occurrence_end: "2026-09-20T15:00:00+02:00",
    recurrence_id: null,
    ...overrides,
  };
}

describe("overlapsDay", () => {
  it("is true for an all-day event spanning multiple days", () => {
    // Offsets match the rest of the suite (Central European time) so the
    // resulting local calendar days are deterministic regardless of the
    // machine timezone the tests happen to run in.
    const event = makeEvent({
      all_day: true,
      occurrence_start: "2026-09-20T00:00:00+02:00",
      occurrence_end: "2026-09-23T00:00:00+02:00",
    });
    expect(overlapsDay(event, new Date(2026, 8, 20))).toBe(true);
    expect(overlapsDay(event, new Date(2026, 8, 22))).toBe(true);
    expect(overlapsDay(event, new Date(2026, 8, 23))).toBe(false);
    expect(overlapsDay(event, new Date(2026, 8, 19))).toBe(false);
  });
});

describe("groupEventsByDay", () => {
  it("produces one group per day, including days with zero events", () => {
    const days = [new Date(2026, 8, 20), new Date(2026, 8, 21), new Date(2026, 8, 22)];
    const events = [makeEvent({ id: "a", occurrence_start: "2026-09-20T14:00:00+02:00", occurrence_end: "2026-09-20T15:00:00+02:00" })];
    const groups = groupEventsByDay(events, days);
    expect(groups).toHaveLength(3);
    expect(groups[0].events.map((e) => e.id)).toEqual(["a"]);
    expect(groups[1].events).toEqual([]);
    expect(groups[2].events).toEqual([]);
  });

  it("sorts all-day events before timed events, then timed events chronologically", () => {
    const day = new Date(2026, 8, 20);
    const events = [
      makeEvent({ id: "late", occurrence_start: "2026-09-20T18:00:00+02:00", occurrence_end: "2026-09-20T19:00:00+02:00" }),
      makeEvent({
        id: "allday",
        all_day: true,
        occurrence_start: "2026-09-20T00:00:00+00:00",
        occurrence_end: "2026-09-21T00:00:00+00:00",
      }),
      makeEvent({ id: "early", occurrence_start: "2026-09-20T08:00:00+02:00", occurrence_end: "2026-09-20T09:00:00+02:00" }),
    ];
    const groups = groupEventsByDay(events, [day]);
    expect(groups[0].events.map((e) => e.id)).toEqual(["allday", "early", "late"]);
  });

  it("matches a timed event only to the day of its occurrence_start", () => {
    const events = [makeEvent({ id: "a", occurrence_start: "2026-09-20T14:00:00+02:00", occurrence_end: "2026-09-20T15:00:00+02:00" })];
    const groups = groupEventsByDay(events, [new Date(2026, 8, 21)]);
    expect(groups[0].events).toEqual([]);
  });
});

describe("uniqueSortedDays", () => {
  it("returns the distinct days present among events, sorted chronologically", () => {
    const events = [
      makeEvent({ id: "a", occurrence_start: "2026-09-22T10:00:00+02:00", occurrence_end: "2026-09-22T11:00:00+02:00" }),
      makeEvent({ id: "b", occurrence_start: "2026-09-20T10:00:00+02:00", occurrence_end: "2026-09-20T11:00:00+02:00" }),
      makeEvent({ id: "c", occurrence_start: "2026-09-20T16:00:00+02:00", occurrence_end: "2026-09-20T17:00:00+02:00" }),
    ];
    const days = uniqueSortedDays(events);
    expect(days).toHaveLength(2);
    expect(days[0].getDate()).toBe(20);
    expect(days[1].getDate()).toBe(22);
  });

  it("returns an empty array for no events", () => {
    expect(uniqueSortedDays([])).toEqual([]);
  });
});
