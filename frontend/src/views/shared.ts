// Small render helpers shared by all calendar views (day/week/month/agenda).
import { html, nothing, type TemplateResult } from "lit";
import { contrastTextColor, resolveEventColor } from "../utils/colors";
import { formatTime } from "../utils/datetime";
import { t } from "../utils/localize";
import type { Category, FamilyEvent, Person } from "../types";
import type { ViewContext } from "./context";

export function personsForEvent(event: FamilyEvent, people: Person[]): Person[] {
  return event.person_ids
    .map((id) => people.find((p) => p.id === id))
    .filter((p): p is Person => Boolean(p));
}

export function categoryForEvent(event: FamilyEvent, categories: Category[]): Category | undefined {
  return event.category_id ? categories.find((c) => c.id === event.category_id) : undefined;
}

/** Small stacked avatar dots identifying every assigned person (color + initial). */
export function renderPersonDots(persons: Person[], max = 4, language?: string): TemplateResult {
  const shown = persons.slice(0, max);
  const overflow = persons.length - shown.length;
  return html`
    <span class="fp-person-dots" role="img" aria-label=${persons.map((p) => p.name).join(", ") || t(language, "event.no_people")}>
      ${shown.map(
        (p) => html`<span class="fp-person-dot" style="background:${p.color}" title=${p.name}>${p.name.slice(0, 1)}</span>`
      )}
      ${overflow > 0 ? html`<span class="fp-person-dot fp-person-dot-more">+${overflow}</span>` : nothing}
    </span>
  `;
}

export function eventTimeLabel(event: FamilyEvent, use24h: boolean): string {
  if (event.all_day) {
    return "";
  }
  return formatTime(new Date(event.occurrence_start), use24h);
}

export function isPastEvent(event: FamilyEvent, now: Date): boolean {
  return new Date(event.occurrence_end).getTime() < now.getTime();
}

/** A single event "chip" used in month cells and all-day rows. */
export function renderEventChip(ctx: ViewContext, event: FamilyEvent, options?: { compact?: boolean }): TemplateResult {
  const color = resolveEventColor(event, ctx.people, ctx.categories, ctx.config.color_mode ?? "person");
  const textColor = contrastTextColor(color);
  const persons = personsForEvent(event, ctx.people);
  const past = (ctx.config.dim_past_events ?? true) && isPastEvent(event, ctx.now);
  const cancelled = event.status === "cancelled";
  const classes = ["fp-chip", past ? "fp-past" : "", cancelled ? "fp-cancelled" : ""].filter(Boolean).join(" ");
  return html`
    <button
      type="button"
      class=${classes}
      style="background:${color};color:${textColor}"
      title=${event.title}
      @click=${(e: Event) => {
        e.stopPropagation();
        ctx.callbacks.onEventClick(event);
      }}
    >
      ${event.icon ? html`<ha-icon icon=${event.icon} class="fp-chip-icon"></ha-icon>` : nothing}
      ${!event.all_day && !options?.compact
        ? html`<span class="fp-chip-time">${eventTimeLabel(event, ctx.use24h)}</span>`
        : nothing}
      <span class="fp-chip-title">${event.title}</span>
      ${persons.length > 1 ? renderPersonDots(persons, 3, ctx.hass.language) : nothing}
    </button>
  `;
}

export function statusLabel(status: string | null, language?: string): string {
  return status ? t(language, `status.${status}`) : "";
}
