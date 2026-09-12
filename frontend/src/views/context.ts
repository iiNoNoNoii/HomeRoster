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
  callbacks: ViewCallbacks;
}
