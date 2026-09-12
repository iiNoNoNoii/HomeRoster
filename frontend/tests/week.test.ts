import { describe, expect, it } from "vitest";
import { computeWeekDays } from "../src/views/week";

describe("computeWeekDays", () => {
  it("returns 7 consecutive days starting at the given date, regardless of weekday", () => {
    // 2026-09-23 is a Wednesday - a rolling forecast window must start
    // exactly there, not snap back to the preceding Monday/Sunday.
    const wed = new Date(2026, 8, 23, 14, 30);
    const days = computeWeekDays(wed);
    expect(days).toHaveLength(7);
    expect(days.map((d) => d.getDate())).toEqual([23, 24, 25, 26, 27, 28, 29]);
    expect(days[0].getDay()).toBe(3); // Wednesday
  });

  it("normalizes the start day to midnight", () => {
    const withTime = new Date(2026, 8, 23, 23, 59);
    const days = computeWeekDays(withTime);
    expect(days[0].getHours()).toBe(0);
    expect(days[0].getMinutes()).toBe(0);
  });

  it("rolls over a month boundary", () => {
    const days = computeWeekDays(new Date(2026, 8, 28));
    expect(days.map((d) => `${d.getMonth() + 1}-${d.getDate()}`)).toEqual([
      "9-28",
      "9-29",
      "9-30",
      "10-1",
      "10-2",
      "10-3",
      "10-4",
    ]);
  });
});
