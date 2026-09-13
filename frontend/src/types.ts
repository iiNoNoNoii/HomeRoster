// Shared types mirroring the backend data model (custom_components/homeroster/models.py).

export interface Person {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  linked_person_entity_id: string | null;
  active: boolean;
  sort_order: number;
  role: "parent" | "child" | "other" | null;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  active: boolean;
  sort_order: number;
}

export type EventStatus = "planned" | "confirmed" | "tentative" | "done" | "cancelled";

// An expanded occurrence as returned by the websocket API: the stored Event
// fields plus the concrete occurrence_start/occurrence_end for this instance.
export interface FamilyEvent {
  id: string;
  title: string;
  subtitle: string | null;
  start: string;
  end: string;
  all_day: boolean;
  person_ids: string[];
  description: string | null;
  location: string | null;
  location_address: string | null;
  category_id: string | null;
  color: string | null;
  icon: string | null;
  status: EventStatus | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  reminders: number[];
  rrule: string | null;
  exdates: string[];
  version: number;
  occurrence_start: string;
  occurrence_end: string;
  recurrence_id: string | null;
  is_recurring_instance?: boolean;
}

export interface HomeRosterApiErrorPayload {
  code: string;
  message: string;
  current?: Record<string, unknown>;
}

export type CalendarView = "day" | "week" | "month" | "agenda";

export interface HomeRosterCardConfig {
  type: string;
  title?: string;
  entity?: string;
  default_view?: CalendarView;
  people?: string[];
  preselected_people?: string[];
  visible_categories?: string[];
  show_filters?: boolean;
  show_search?: boolean;
  show_add_button?: boolean;
  allow_edit?: boolean;
  show_done_events?: boolean;
  show_cancelled_events?: boolean;
  show_weekends?: boolean;
  show_week_numbers?: boolean;
  start_hour?: number;
  end_hour?: number;
  time_step?: number;
  time_format?: "12" | "24" | "auto";
  max_events_per_day?: number;
  agenda_days?: number;
  dim_past_events?: boolean;
  color_mode?: "person" | "category";
  compact?: boolean;
  height?: number | "auto";
  show_now_line?: boolean;
  highlight_today?: boolean;
  read_only?: boolean;
  first_weekday?: "monday" | "sunday";
}

export const DEFAULT_CONFIG: Required<
  Omit<HomeRosterCardConfig, "type" | "title" | "entity" | "people" | "preselected_people" | "visible_categories" | "height">
> = {
  default_view: "week",
  show_filters: true,
  show_search: true,
  show_add_button: true,
  allow_edit: true,
  show_done_events: true,
  show_cancelled_events: false,
  show_weekends: true,
  show_week_numbers: true,
  start_hour: 6,
  end_hour: 22,
  time_step: 30,
  time_format: "auto",
  max_events_per_day: 3,
  agenda_days: 14,
  dim_past_events: true,
  color_mode: "person",
  compact: false,
  show_now_line: true,
  highlight_today: true,
  read_only: false,
  first_weekday: "monday",
};
