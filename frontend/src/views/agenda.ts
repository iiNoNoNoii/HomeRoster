import { html, nothing, type TemplateResult } from "lit";
import { addDays, isSameDay } from "../utils/datetime";
import { t } from "../utils/localize";
import type { FamilyEvent } from "../types";
import type { ViewContext } from "./context";
import { eventTimeLabel, personsForEvent, renderPersonDots, statusLabel } from "./shared";
import { resolveEventColor } from "../utils/colors";

export function renderAgendaView(ctx: ViewContext): TemplateResult {
  const days = ctx.config.agenda_days ?? 14;
  const dayList: Date[] = [];
  for (let i = 0; i < days; i++) {
    dayList.push(addDays(ctx.currentDate, i));
  }

  const groups = dayList
    .map((day) => ({
      day,
      events: ctx.events
        .filter((e) => isSameDay(new Date(e.occurrence_start), day) || (e.all_day && overlapsDay(e, day)))
        .sort((a, b) => new Date(a.occurrence_start).getTime() - new Date(b.occurrence_start).getTime()),
    }))
    .filter((g) => g.events.length > 0);

  if (groups.length === 0) {
    return html`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <div class="fp-empty-title">${t(ctx.hass.language, "empty.no_events")}</div>
        <div class="fp-empty-hint">${t(ctx.hass.language, "empty.no_events_hint")}</div>
      </div>
    `;
  }

  return html`
    <div class="fp-view fp-view-agenda">
      ${groups.map(
        (group) => html`
          <div class="fp-agenda-group">
            <div class="fp-agenda-daylabel ${isSameDay(group.day, ctx.now) ? "fp-today" : ""}">
              ${t(ctx.hass.language, `weekday.short.${group.day.getDay()}`)} ${group.day.getDate()}.${group.day.getMonth() + 1}.
            </div>
            <div class="fp-agenda-items">
              ${group.events.map((event) => renderAgendaItem(ctx, event))}
            </div>
          </div>
        `
      )}
    </div>
  `;
}

function overlapsDay(event: FamilyEvent, day: Date): boolean {
  const start = new Date(event.occurrence_start);
  const end = new Date(event.occurrence_end);
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const dayEnd = addDays(dayStart, 1);
  return start < dayEnd && end > dayStart;
}

function renderAgendaItem(ctx: ViewContext, event: FamilyEvent): TemplateResult {
  const color = resolveEventColor(event, ctx.people, ctx.categories, ctx.config.color_mode ?? "person");
  const persons = personsForEvent(event, ctx.people);
  return html`
    <button
      type="button"
      class="fp-agenda-item ${event.status === "cancelled" ? "fp-cancelled" : ""}"
      @click=${() => ctx.callbacks.onEventClick(event)}
    >
      <span class="fp-agenda-item-bar" style="background:${color}"></span>
      <span class="fp-agenda-item-time">${event.all_day ? t(ctx.hass.language, "event.all_day") : eventTimeLabel(event, ctx.use24h)}</span>
      <span class="fp-agenda-item-title">${event.title}</span>
      ${event.location ? html`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${event.location}</span>` : nothing}
      ${event.status ? html`<span class="fp-agenda-item-status">${statusLabel(event.status, ctx.hass.language)}</span>` : nothing}
      ${renderPersonDots(persons, 4, ctx.hass.language)}
    </button>
  `;
}
