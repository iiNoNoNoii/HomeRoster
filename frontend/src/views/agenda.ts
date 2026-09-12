import { html, type TemplateResult } from "lit";
import { addDays, isSameDay } from "../utils/datetime";
import { groupEventsByDay } from "../utils/group-events";
import { t } from "../utils/localize";
import type { ViewContext } from "./context";
import { renderEventListItem } from "./shared";

export function renderAgendaView(ctx: ViewContext): TemplateResult {
  const days = ctx.config.agenda_days ?? 14;
  const dayList: Date[] = [];
  for (let i = 0; i < days; i++) {
    dayList.push(addDays(ctx.currentDate, i));
  }

  const groups = groupEventsByDay(ctx.events, dayList).filter((g) => g.events.length > 0);

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
            <div class="fp-agenda-items">${group.events.map((event) => renderEventListItem(ctx, event))}</div>
          </div>
        `
      )}
    </div>
  `;
}
