import { describe, expect, it } from "vitest";
import { filterEvents } from "../src/utils/filter-events";
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
    location_address: null,
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

const baseOptions = {
  showDoneEvents: true,
  showCancelledEvents: true,
  personIds: [] as string[],
  categoryIds: [] as string[],
  search: "",
};

describe("filterEvents", () => {
  it("returns everything when no filters are active", () => {
    const events = [makeEvent({ id: "a" }), makeEvent({ id: "b" })];
    expect(filterEvents(events, baseOptions)).toHaveLength(2);
  });

  it("hides done events when showDoneEvents is false", () => {
    const events = [makeEvent({ id: "a", status: "done" }), makeEvent({ id: "b", status: "planned" })];
    const result = filterEvents(events, { ...baseOptions, showDoneEvents: false });
    expect(result.map((e) => e.id)).toEqual(["b"]);
  });

  it("hides cancelled events when showCancelledEvents is false", () => {
    const events = [makeEvent({ id: "a", status: "cancelled" }), makeEvent({ id: "b", status: "confirmed" })];
    const result = filterEvents(events, { ...baseOptions, showCancelledEvents: false });
    expect(result.map((e) => e.id)).toEqual(["b"]);
  });

  it("filters by selected person ids (event matches if ANY assigned person is selected)", () => {
    const events = [
      makeEvent({ id: "a", person_ids: ["anna"] }),
      makeEvent({ id: "b", person_ids: ["tom"] }),
      makeEvent({ id: "c", person_ids: ["anna", "tom"] }),
    ];
    const result = filterEvents(events, { ...baseOptions, personIds: ["tom"] });
    expect(result.map((e) => e.id).sort()).toEqual(["b", "c"]);
  });

  it("filters by selected category ids", () => {
    const events = [
      makeEvent({ id: "a", category_id: "school" }),
      makeEvent({ id: "b", category_id: "work" }),
      makeEvent({ id: "c", category_id: null }),
    ];
    const result = filterEvents(events, { ...baseOptions, categoryIds: ["school"] });
    expect(result.map((e) => e.id)).toEqual(["a"]);
  });

  it("searches case-insensitively across title, subtitle, description and location", () => {
    const events = [
      makeEvent({ id: "a", title: "Zahnarzt Mia" }),
      makeEvent({ id: "b", title: "Fußballtraining", location: "Sportplatz Nord" }),
      makeEvent({ id: "c", title: "Geburtstag", description: "Kuchen für den Zahnarzt mitbringen" }),
    ];
    const result = filterEvents(events, { ...baseOptions, search: "zahnarzt" });
    expect(result.map((e) => e.id).sort()).toEqual(["a", "c"]);
  });

  it("searches the location_address field too", () => {
    const events = [
      makeEvent({ id: "a", title: "Geburtstag", location: "Oma & Opa", location_address: "Musterstraße 1, 12345 Musterstadt" }),
      makeEvent({ id: "b", title: "Zahnarzt" }),
    ];
    const result = filterEvents(events, { ...baseOptions, search: "musterstadt" });
    expect(result.map((e) => e.id)).toEqual(["a"]);
  });

  it("combines person, category and search filters (AND semantics)", () => {
    const events = [
      makeEvent({ id: "a", person_ids: ["anna"], category_id: "school", title: "Elternabend" }),
      makeEvent({ id: "b", person_ids: ["anna"], category_id: "work", title: "Elternabend" }),
      makeEvent({ id: "c", person_ids: ["tom"], category_id: "school", title: "Elternabend" }),
    ];
    const result = filterEvents(events, {
      ...baseOptions,
      personIds: ["anna"],
      categoryIds: ["school"],
      search: "eltern",
    });
    expect(result.map((e) => e.id)).toEqual(["a"]);
  });
});
