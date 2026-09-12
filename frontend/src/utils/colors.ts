// Color helpers: event color resolution (explicit > person/category derived)
// and WCAG-ish contrast text color so labels stay readable on any hue.
import type { Category, FamilyEvent, Person } from "../types";

export function hexToRgb(hex: string): [number, number, number] | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) {
    return null;
  }
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

/** Returns "#000000" or "#ffffff", whichever contrasts better against `hex`. */
export function contrastTextColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return "#000000";
  }
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.42 ? "#000000" : "#ffffff";
}

export function resolveEventColor(
  event: Pick<FamilyEvent, "color" | "category_id" | "person_ids">,
  people: Person[],
  categories: Category[],
  colorMode: "person" | "category"
): string {
  if (event.color) {
    return event.color;
  }
  if (colorMode === "category" && event.category_id) {
    const category = categories.find((c) => c.id === event.category_id);
    if (category) {
      return category.color;
    }
  }
  if (event.person_ids.length > 0) {
    const person = people.find((p) => p.id === event.person_ids[0]);
    if (person) {
      return person.color;
    }
  }
  if (event.category_id) {
    const category = categories.find((c) => c.id === event.category_id);
    if (category) {
      return category.color;
    }
  }
  return "var(--primary-color, #03a9f4)";
}
