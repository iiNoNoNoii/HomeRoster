import { describe, expect, it } from "vitest";
import { validateEventForm, type EventFormInput } from "../src/utils/validation";

const base: EventFormInput = {
  title: "Zahnarzt",
  allDay: false,
  startDate: "2026-09-20",
  startTime: "14:00",
  endDate: "2026-09-20",
  endTime: "15:00",
  personIds: ["anna"],
  requirePerson: true,
};

describe("validateEventForm", () => {
  it("accepts a valid timed event", () => {
    expect(validateEventForm(base).valid).toBe(true);
  });

  it("rejects an empty title", () => {
    const result = validateEventForm({ ...base, title: "   " });
    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("title_required");
  });

  it("rejects an end time equal to the start time", () => {
    const result = validateEventForm({ ...base, endTime: "14:00" });
    expect(result.valid).toBe(false);
    expect(result.errors.end).toBe("end_before_start");
  });

  it("rejects an end time before the start time", () => {
    const result = validateEventForm({ ...base, endTime: "13:00" });
    expect(result.valid).toBe(false);
    expect(result.errors.end).toBe("end_before_start");
  });

  it("allows a multi-day timed event", () => {
    const result = validateEventForm({ ...base, endDate: "2026-09-22", endTime: "09:00" });
    expect(result.valid).toBe(true);
  });

  it("allows a single-day all-day event (inclusive UI end date equal to start date)", () => {
    const result = validateEventForm({ ...base, allDay: true, endDate: base.startDate });
    expect(result.valid).toBe(true);
  });

  it("rejects an all-day event whose end date is before its start date", () => {
    const result = validateEventForm({ ...base, allDay: true, startDate: "2026-09-20", endDate: "2026-09-18" });
    expect(result.valid).toBe(false);
    expect(result.errors.end).toBe("end_before_start");
  });

  it("requires at least one person when requirePerson is true", () => {
    const result = validateEventForm({ ...base, personIds: [] });
    expect(result.valid).toBe(false);
    expect(result.errors.personIds).toBe("person_required");
  });

  it("allows zero people when requirePerson is false", () => {
    const result = validateEventForm({ ...base, personIds: [], requirePerson: false });
    expect(result.valid).toBe(true);
  });
});
