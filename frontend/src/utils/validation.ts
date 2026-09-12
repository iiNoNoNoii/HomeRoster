// Pure client-side form validation for the event create/edit dialog. This is
// a UX convenience layer only - the backend re-validates everything
// server-side regardless (see custom_components/homeroster/models.py).

export interface EventFormInput {
  title: string;
  allDay: boolean;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM, ignored when allDay
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:MM, ignored when allDay
  personIds: string[];
  requirePerson: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<"title" | "end" | "personIds", string>>;
}

function toComparable(date: string, time: string, allDay: boolean): number {
  if (allDay) {
    return new Date(`${date}T00:00:00`).getTime();
  }
  return new Date(`${date}T${time || "00:00"}:00`).getTime();
}

export function validateEventForm(input: EventFormInput): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!input.title || !input.title.trim()) {
    errors.title = "title_required";
  }

  if (!input.startDate || !input.endDate) {
    errors.end = "end_before_start";
  } else {
    const start = toComparable(input.startDate, input.startTime, input.allDay);
    const end = toComparable(input.endDate, input.endTime, input.allDay);
    if (input.allDay) {
      // All-day end is exclusive: a single-day event has end === start date
      // in the UI (inclusive), which the caller converts to start+1 day
      // before calling the API. Here we only need end >= start (same day OK).
      if (end < start) {
        errors.end = "end_before_start";
      }
    } else if (end <= start) {
      errors.end = "end_before_start";
    }
  }

  if (input.requirePerson && input.personIds.length === 0) {
    errors.personIds = "person_required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
