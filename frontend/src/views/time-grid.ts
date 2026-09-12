// Shared absolute-positioned time grid used by both the day and week views.
// Overlapping timed events are laid out side-by-side via assignLanes() so
// nothing is ever hidden behind another event.
import { html, nothing, type TemplateResult } from "lit";
import { assignLanes } from "../utils/lanes";
import { isSameDay } from "../utils/datetime";
import { t } from "../utils/localize";
import type { ViewContext } from "./context";
import { renderEventChip } from "./shared";

const ROW_HEIGHT_PX = { compact: 32, normal: 48 };

function minutesOfDay(d: Date): number {
  return d.getHours() * 60 + d.getMinutes();
}

export function renderTimeGrid(ctx: ViewContext, days: Date[]): TemplateResult {
  const startHour = ctx.config.start_hour ?? 6;
  const endHour = ctx.config.end_hour ?? 22;
  const step = ctx.config.time_step ?? 30;
  const rowHeight = ctx.config.compact ? ROW_HEIGHT_PX.compact : ROW_HEIGHT_PX.normal;
  const totalMinutes = (endHour - startHour) * 60;
  const gridHeight = (totalMinutes / step) * rowHeight;

  const hourMarks: number[] = [];
  for (let h = startHour; h <= endHour; h++) {
    hourMarks.push(h);
  }

  const allDayEvents = ctx.events.filter((e) => e.all_day && days.some((d) => isSameDay(d, new Date(e.occurrence_start))));
  const hasAllDay = allDayEvents.length > 0;

  const toOffsetPct = (date: Date): number => {
    const mins = Math.min(Math.max(minutesOfDay(date) - startHour * 60, 0), totalMinutes);
    return (mins / totalMinutes) * 100;
  };

  const now = ctx.now;

  return html`
    <div class="fp-timegrid" style="--fp-row-height:${rowHeight}px">
      <div class="fp-timegrid-header">
        <div class="fp-time-gutter"></div>
        ${days.map(
          (day) => html`
            <div class="fp-day-header ${isSameDay(day, now) ? "fp-today" : ""}">
              <div class="fp-day-header-weekday">${t(ctx.language, `weekday.short.${day.getDay()}`)}</div>
              <div class="fp-day-header-date">${day.getDate()}.${day.getMonth() + 1}.</div>
            </div>
          `
        )}
      </div>
      ${hasAllDay
        ? html`
            <div class="fp-allday-row">
              <div class="fp-time-gutter fp-time-gutter-label">${t(ctx.language, "event.all_day")}</div>
              ${days.map((day) => {
                const dayEvents = allDayEvents.filter((e) => isSameDay(day, new Date(e.occurrence_start)));
                return html`
                  <div class="fp-allday-cell" @click=${() => ctx.callbacks.onSlotClick(day, true)}>
                    ${dayEvents.map((e) => renderEventChip(ctx, e, { compact: true }))}
                  </div>
                `;
              })}
            </div>
          `
        : nothing}
      <div class="fp-timegrid-scroll">
        <div class="fp-time-gutter-col" style="height:${gridHeight}px">
          ${hourMarks.map(
            (h) => html`<div class="fp-hour-label" style="height:${rowHeight * (60 / step)}px">
              ${String(h).padStart(2, "0")}:00
            </div>`
          )}
        </div>
        ${days.map((day) => {
          const timedEvents = ctx.events.filter(
            (e) => !e.all_day && isSameDay(day, new Date(e.occurrence_start))
          );
          const laned = assignLanes(
            timedEvents.map((e) => ({
              event: e,
              start: new Date(e.occurrence_start).getTime(),
              end: new Date(e.occurrence_end).getTime(),
            }))
          );
          const isToday = isSameDay(day, now);
          const nowOffset = isToday ? toOffsetPct(now) : null;
          return html`
            <div
              class="fp-day-col"
              style="height:${gridHeight}px"
              @click=${(e: MouseEvent) => {
                const target = e.currentTarget as HTMLElement;
                const rect = target.getBoundingClientRect();
                const relY = e.clientY - rect.top;
                const minutes = Math.round(((relY / gridHeight) * totalMinutes) / step) * step + startHour * 60;
                const clicked = new Date(day);
                clicked.setHours(0, minutes, 0, 0);
                ctx.callbacks.onSlotClick(clicked, false);
              }}
            >
              ${hourMarks.slice(0, -1).map(
                (_, i) => html`<div class="fp-hour-line" style="top:${i * (60 / step) * rowHeight}px"></div>`
              )}
              ${laned.map(({ item, lane, laneCount }) => {
                const startPct = toOffsetPct(new Date(item.event.occurrence_start));
                const endPct = toOffsetPct(new Date(item.event.occurrence_end));
                const heightPct = Math.max(endPct - startPct, 3);
                const widthPct = 100 / laneCount;
                return html`
                  <div
                    class="fp-timed-event-slot"
                    style="top:${startPct}%;height:${heightPct}%;left:${lane * widthPct}%;width:${widthPct}%"
                  >
                    ${renderEventChip(ctx, item.event)}
                  </div>
                `;
              })}
              ${nowOffset !== null && (ctx.config.show_now_line ?? true)
                ? html`<div class="fp-now-line" style="top:${nowOffset}%"></div>`
                : nothing}
            </div>
          `;
        })}
      </div>
    </div>
  `;
}
