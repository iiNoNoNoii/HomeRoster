export const REMINDER_PRESETS: number[] = [0, 5, 15, 30, 60, 1440];

// Fallback defaults used when the backend's `family_planner/config` options
// don't (yet) include default_colors / default_icons (older backend, or the
// options simply not configured). Must match the values documented for the
// `default_colors` / `default_icons` config options in
// custom_components/family_planner so behavior is identical either way.
export const DEFAULT_COLORS: string[] = [
  "#e53935",
  "#1e88e5",
  "#43a047",
  "#fb8c00",
  "#8e24aa",
  "#00acc1",
  "#fdd835",
  "#6d4c41",
  "#3949ab",
  "#d81b60",
];

export const DEFAULT_ICONS: string[] = [
  "mdi:calendar",
  "mdi:school",
  "mdi:briefcase",
  "mdi:soccer",
  "mdi:cake-variant",
  "mdi:medical-bag",
  "mdi:home",
  "mdi:airplane",
  "mdi:music",
  "mdi:star",
];

// Fallback for default_reminder_minutes when the backend option is absent.
export const DEFAULT_REMINDER_MINUTES = 60;
