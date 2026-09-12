import { describe, expect, it } from "vitest";
import { computeEndFromStart, isoWeekNumber, shiftDateString, startOfWeek } from "../src/utils/datetime";

describe("shiftDateString", () => {
  it("shifts a plain date forward by one day", () => {
    expect(shiftDateString("2026-09-20", 1)).toBe("2026-09-21");
  });

  it("shifts a plain date backward by one day", () => {
    expect(shiftDateString("2026-09-20", -1)).toBe("2026-09-19");
  });

  it("rolls over a month boundary", () => {
    expect(shiftDateString("2026-09-30", 1)).toBe("2026-10-01");
  });

  it("survives the European DST spring-forward boundary (2026-03-29 in Europe)", () => {
    // A naive UTC-based "add 24h" implementation would land on the wrong
    // calendar day here because 2026-03-29 02:00 local time does not exist
    // in most of Europe. Using local noon internally avoids that.
    expect(shiftDateString("2026-03-28", 1)).toBe("2026-03-29");
    expect(shiftDateString("2026-03-29", 1)).toBe("2026-03-30");
  });

  it("survives the European DST fall-back boundary (2026-10-25 in Europe)", () => {
    expect(shiftDateString("2026-10-24", 1)).toBe("2026-10-25");
    expect(shiftDateString("2026-10-25", 1)).toBe("2026-10-26");
  });
});

describe("startOfWeek", () => {
  it("resolves a Wednesday to the preceding Monday when first_weekday=monday", () => {
    const wed = new Date(2026, 8, 23); // 2026-09-23 is a Wednesday
    const start = startOfWeek(wed, "monday");
    expect(start.getDay()).toBe(1);
    expect(start.getDate()).toBe(21);
  });

  it("resolves a Wednesday to the preceding Sunday when first_weekday=sunday", () => {
    const wed = new Date(2026, 8, 23);
    const start = startOfWeek(wed, "sunday");
    expect(start.getDay()).toBe(0);
    expect(start.getDate()).toBe(20);
  });
});

describe("computeEndFromStart", () => {
  it("adds the offset within the same day", () => {
    expect(computeEndFromStart("2026-09-20", "09:00", 60)).toEqual({ date: "2026-09-20", time: "10:00" });
  });

  it("rolls over to the next day when the offset crosses midnight", () => {
    expect(computeEndFromStart("2026-09-20", "23:30", 60)).toEqual({ date: "2026-09-21", time: "00:30" });
  });

  it("rolls over a month boundary when crossing midnight", () => {
    expect(computeEndFromStart("2026-09-30", "23:45", 60)).toEqual({ date: "2026-10-01", time: "00:45" });
  });

  it("supports offsets other than 60 minutes", () => {
    expect(computeEndFromStart("2026-09-20", "08:00", 30)).toEqual({ date: "2026-09-20", time: "08:30" });
  });
});

describe("isoWeekNumber", () => {
  it("computes the correct ISO week for a known date", () => {
    // 2026-01-01 is a Thursday -> ISO week 1.
    expect(isoWeekNumber(new Date(2026, 0, 1))).toBe(1);
  });

  it("computes week 53/1 boundaries correctly around year end", () => {
    // 2025-12-31 is a Wednesday, part of ISO week 1 of 2026.
    expect(isoWeekNumber(new Date(2025, 11, 31))).toBe(1);
  });
});
