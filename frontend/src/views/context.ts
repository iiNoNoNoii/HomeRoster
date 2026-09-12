import type { HomeAssistant } from "../ha-types";
import type { Category, FamilyEvent, FamilyPlannerCardConfig, Person } from "../types";

export interface ViewCallbacks {
  onEventClick: (event: FamilyEvent) => void;
  onSlotClick: (date: Date, allDay: boolean) => void;
  onMoreClick: (date: Date, events: FamilyEvent[]) => void;
}

export interface ViewContext {
  hass: HomeAssistant;
  config: FamilyPlannerCardConfig;
  events: FamilyEvent[];
  people: Person[];
  categories: Category[];
  currentDate: Date;
  now: Date;
  firstWeekday: "monday" | "sunday";
  use24h: boolean;
  /** The language to use for all `t()` UI-string lookups: resolved once in
   * family-planner-card.ts's _buildViewContext() from the integration's
   * `options.language` setting ("auto" | "de" | "en") and the viewer's own
   * `hass.language` (see utils/localize.ts's resolveLanguage()). Views should
   * use this - not `hass.language` - for every `t()` call; `hass.language`/
   * `hass.locale` remain the right source for Intl-based date/number
   * formatting, which depends on more than a two-letter UI language code. */
  language: string;
  callbacks: ViewCallbacks;
}
