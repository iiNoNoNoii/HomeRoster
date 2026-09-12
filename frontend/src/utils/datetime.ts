// Date/time helpers. All-day dates are handled as plain YYYY-MM-DD strings
// (never converted through UTC) so they can never drift to the wrong day;
// timed values always carry an explicit local UTC offset.
import type { HomeAssistant } from "../ha-types";

const pad = (n: number): string => String(n).padStart(2, "0");

export function dateOnly(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function toIsoWithOffset(d: Date): string {
  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const offH = pad(Math.floor(Math.abs(offsetMin) / 60));
  const offM = pad(Math.abs(offsetMin) % 60);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}${sign}${offH}:${offM}`
  );
}

function localDateTime(date: string, time: string): Date {
  const [h, m] = (time || "00:00").split(":").map(Number);
  const [y, mo, da] = date.split("-").map(Number);
  return new Date(y, (mo || 1) - 1, da || 1, h || 0, m || 0, 0);
}

export function combineLocalDateTime(date: string, time: string): string {
  return toIsoWithOffset(localDateTime(date, time));
}

/** Formats a Date as a "HH:MM" string suitable for an <input type="time"> value. */
export function toTimeInput(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Computes the date/time `offsetMinutes` after the given local start
 * date/time, formatted for <input type="date"> / <input type="time">
 * values. Correctly rolls the date forward (or further) when the offset
 * crosses one or more midnights, e.g. a 23:30 start with a 60 minute
 * offset lands on 00:30 the next day rather than an invalid time. */
export function computeEndFromStart(
  startDate: string,
  startTime: string,
  offsetMinutes: number
): { date: string; time: string } {
  const end = localDateTime(startDate, startTime);
  end.setMinutes(end.getMinutes() + offsetMinutes);
  return { date: dateOnly(end), time: toTimeInput(end) };
}

/** Shifts a YYYY-MM-DD string by `days`, using local noon internally so a
 * DST transition at midnight can never push the result onto the wrong day. */
export function shiftDateString(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const noon = new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);
  noon.setDate(noon.getDate() + days);
  return dateOnly(noon);
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function startOfWeek(d: Date, firstWeekday: "monday" | "sunday"): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  const dow = copy.getDay(); // 0=Sun..6=Sat
  const diff = firstWeekday === "monday" ? (dow === 0 ? 6 : dow - 1) : dow;
  return addDays(copy, -diff);
}

export function startOfMonthGrid(d: Date, firstWeekday: "monday" | "sunday"): Date {
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  return startOfWeek(first, firstWeekday);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  );
}

export function use24HourFormat(hass: HomeAssistant, configFormat?: "12" | "24" | "auto"): boolean {
  if (configFormat === "24") {
    return true;
  }
  if (configFormat === "12") {
    return false;
  }
  const fmt = hass.locale?.time_format;
  if (fmt === "24") {
    return true;
  }
  if (fmt === "12") {
    return false;
  }
  try {
    const parts = new Intl.DateTimeFormat(hass.language || "en", { hour: "numeric" }).formatToParts(
      new Date(2000, 0, 1, 13)
    );
    return !parts.some((p) => p.type === "dayPeriod");
  } catch {
    return true;
  }
}

export function formatTime(d: Date, use24h: boolean): string {
  if (use24h) {
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  const hours12 = d.getHours() % 12 || 12;
  const suffix = d.getHours() < 12 ? "AM" : "PM";
  return `${hours12}:${pad(d.getMinutes())} ${suffix}`;
}

export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7; // Monday=1..Sunday=7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function resolveFirstWeekday(
  hass: HomeAssistant,
  configured?: "monday" | "sunday"
): "monday" | "sunday" {
  if (configured) {
    return configured;
  }
  const locale = hass.locale?.first_weekday;
  if (locale === "monday" || locale === "sunday") {
    return locale;
  }
  return "monday";
}
