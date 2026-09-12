// Small render helpers shared by all calendar views (day/week/month/agenda).
import { html, nothing, type TemplateResult } from "lit";
import { contrastTextColor, resolveEventColor } from "../utils/colors";
import { formatTime, isSameDay } from "../utils/datetime";
import { groupEventsByDay, uniqueSortedDays } from "../utils/group-events";
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
      ${persons.length > 1 ? renderPersonDots(persons, 3, ctx.language) : nothing}
    </button>
  `;
}

export function statusLabel(status: string | null, language?: string): string {
  return status ? t(language, `status.${status}`) : "";
}

/** A single "day-grouped event list" row: colored bar, time, title,
 * location, status and person dots. Shared by the agenda view, the week
 * view's per-day sections, and the flat search/category results list so
 * the three call sites render events identically instead of each keeping
 * their own near-duplicate item template. */
export function renderEventListItem(ctx: ViewContext, event: FamilyEvent): TemplateResult {
  const color = resolveEventColor(event, ctx.people, ctx.categories, ctx.config.color_mode ?? "person");
  const persons = personsForEvent(event, ctx.people);
  return html`
    <button
      type="button"
      class="fp-agenda-item ${event.status === "cancelled" ? "fp-cancelled" : ""}"
      @click=${() => ctx.callbacks.onEventClick(event)}
    >
      <span class="fp-agenda-item-bar" style="background:${color}"></span>
      <span class="fp-agenda-item-time"
        >${event.all_day ? t(ctx.language, "event.all_day") : eventTimeLabel(event, ctx.use24h)}</span
      >
      <span class="fp-agenda-item-title">${event.title}</span>
      ${event.location
        ? html`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${event.location}</span>`
        : nothing}
      ${event.status ? html`<span class="fp-agenda-item-status">${statusLabel(event.status, ctx.language)}</span>` : nothing}
      ${renderPersonDots(persons, 4, ctx.language)}
    </button>
  `;
}

/** A day-header label + list of `renderEventListItem` rows, in the visual
 * style already used by the agenda view. Shared by the agenda view and the
 * flat search/category results list (see `renderFilteredEventList` below) -
 * the week view renders its own day headers since it needs a quick-create
 * affordance and must show a header even for empty days. */
function renderDayGroup(ctx: ViewContext, day: Date, events: FamilyEvent[]): TemplateResult {
  return html`
    <div class="fp-agenda-group">
      <div class="fp-agenda-daylabel ${isSameDay(day, ctx.now) ? "fp-today" : ""}">
        ${t(ctx.language, `weekday.short.${day.getDay()}`)} ${day.getDate()}.${day.getMonth() + 1}.
      </div>
      <div class="fp-agenda-items">${events.map((event) => renderEventListItem(ctx, event))}</div>
    </div>
  `;
}

/** Renders `ctx.events` (already filtered/range-bounded by the card) as a
 * flat, day-grouped chronological list - used in place of the normal
 * day/week/month/agenda view whenever the user has entered search text or
 * selected at least one category (see family-planner-card.ts). Unlike the
 * agenda view, there is no fixed date range to group against: only days
 * that actually contain a matching event are shown. */
export function renderFilteredEventList(ctx: ViewContext): TemplateResult {
  const days = uniqueSortedDays(ctx.events);
  const groups = groupEventsByDay(ctx.events, days).filter((g) => g.events.length > 0);

  if (groups.length === 0) {
    return html`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-search-outline"></ha-icon>
        <div class="fp-empty-title">${t(ctx.language, "empty.no_matches")}</div>
      </div>
    `;
  }

  return html`
    <div class="fp-view fp-view-list">${groups.map((group) => renderDayGroup(ctx, group.day, group.events))}</div>
  `;
}
