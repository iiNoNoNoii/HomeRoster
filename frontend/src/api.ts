// Thin wrapper around the homeroster/* websocket commands. The backend
// is always the source of truth - nothing here is cached beyond a single
// render cycle (see homeroster-card.ts for the fetch/debounce logic).
import type { HomeAssistant } from "./ha-types";
import type { Category, FamilyEvent, HomeRosterApiErrorPayload, Person } from "./types";

export class HomeRosterApiError extends Error {
  code: string;
  current?: Record<string, unknown>;

  constructor(err: HomeRosterApiErrorPayload) {
    super(err.message);
    this.code = err.code;
    this.current = err.current;
  }
}

interface WsResult {
  success?: boolean;
  error?: HomeRosterApiErrorPayload;
}

async function callWS<T>(hass: HomeAssistant, msg: Record<string, unknown>): Promise<T> {
  const result = (await hass.callWS(msg)) as T & WsResult;
  if (result && typeof result === "object" && "error" in result && result.error) {
    throw new HomeRosterApiError(result.error as HomeRosterApiErrorPayload);
  }
  return result;
}

export interface HomeRosterConfigResult {
  options: Record<string, unknown>;
  is_admin: boolean;
  can_write_events: boolean;
}

export function getConfig(hass: HomeAssistant): Promise<HomeRosterConfigResult> {
  return callWS(hass, { type: "homeroster/config" });
}

export interface GetEventsParams {
  start: string;
  end: string;
  person_ids?: string[];
  category_ids?: string[];
  statuses?: string[];
  include_cancelled?: boolean;
}

export async function getEvents(hass: HomeAssistant, params: GetEventsParams): Promise<FamilyEvent[]> {
  const result = await callWS<{ events: FamilyEvent[] }>(hass, {
    type: "homeroster/events/get",
    ...params,
  });
  return result.events;
}

export type EventCreateInput = Partial<
  Omit<FamilyEvent, "id" | "created_at" | "updated_at" | "created_by" | "version" | "occurrence_start" | "occurrence_end" | "recurrence_id">
> & { title: string; start: string; end: string };

export async function createEvent(hass: HomeAssistant, data: EventCreateInput): Promise<FamilyEvent> {
  const result = await callWS<{ event: FamilyEvent }>(hass, {
    type: "homeroster/events/create",
    ...data,
  });
  return result.event;
}

export type EventUpdateInput = Partial<EventCreateInput> & {
  event_id: string;
  expected_version?: number;
  exdates?: string[];
};

export async function updateEvent(hass: HomeAssistant, data: EventUpdateInput): Promise<FamilyEvent> {
  const result = await callWS<{ event: FamilyEvent }>(hass, {
    type: "homeroster/events/update",
    ...data,
  });
  return result.event;
}

export async function deleteEvent(
  hass: HomeAssistant,
  eventId: string,
  mode: "series" | "instance" = "series",
  occurrenceStart?: string
): Promise<void> {
  await callWS(hass, {
    type: "homeroster/events/delete",
    event_id: eventId,
    mode,
    occurrence_start: occurrenceStart,
  });
}

export async function duplicateEvent(
  hass: HomeAssistant,
  eventId: string,
  start?: string,
  end?: string
): Promise<FamilyEvent> {
  const result = await callWS<{ event: FamilyEvent }>(hass, {
    type: "homeroster/events/duplicate",
    event_id: eventId,
    start,
    end,
  });
  return result.event;
}

export async function getNextEvent(hass: HomeAssistant, personId?: string): Promise<FamilyEvent | null> {
  const result = await callWS<{ event: FamilyEvent | null }>(hass, {
    type: "homeroster/next_event",
    person_id: personId,
  });
  return result.event;
}

export async function getTodayEvents(hass: HomeAssistant, personId?: string): Promise<FamilyEvent[]> {
  const result = await callWS<{ events: FamilyEvent[] }>(hass, {
    type: "homeroster/today_events",
    person_id: personId,
  });
  return result.events;
}

export async function listPeople(hass: HomeAssistant): Promise<Person[]> {
  const result = await callWS<{ people: Person[] }>(hass, { type: "homeroster/people/list" });
  return result.people;
}

export async function createPerson(hass: HomeAssistant, data: Partial<Person> & { name: string; color: string }): Promise<Person> {
  const result = await callWS<{ person: Person }>(hass, { type: "homeroster/people/create", ...data });
  return result.person;
}

export async function updatePerson(hass: HomeAssistant, personId: string, changes: Partial<Person>): Promise<Person> {
  const result = await callWS<{ person: Person }>(hass, {
    type: "homeroster/people/update",
    person_id: personId,
    ...changes,
  });
  return result.person;
}

export type PersonDeleteStrategy = "deactivate" | "remove_from_events" | "reassign" | "keep_unassigned";

export async function deletePerson(
  hass: HomeAssistant,
  personId: string,
  strategy: PersonDeleteStrategy,
  reassignTo?: string
): Promise<void> {
  await callWS(hass, {
    type: "homeroster/people/delete",
    person_id: personId,
    strategy,
    reassign_to: reassignTo,
  });
}

export async function reorderPeople(hass: HomeAssistant, orderedIds: string[]): Promise<Person[]> {
  const result = await callWS<{ people: Person[] }>(hass, {
    type: "homeroster/people/reorder",
    ordered_ids: orderedIds,
  });
  return result.people;
}

export async function listCategories(hass: HomeAssistant): Promise<Category[]> {
  const result = await callWS<{ categories: Category[] }>(hass, { type: "homeroster/categories/list" });
  return result.categories;
}

export async function createCategory(hass: HomeAssistant, data: Partial<Category> & { name: string; color: string }): Promise<Category> {
  const result = await callWS<{ category: Category }>(hass, { type: "homeroster/categories/create", ...data });
  return result.category;
}

export async function updateCategory(hass: HomeAssistant, categoryId: string, changes: Partial<Category>): Promise<Category> {
  const result = await callWS<{ category: Category }>(hass, {
    type: "homeroster/categories/update",
    category_id: categoryId,
    ...changes,
  });
  return result.category;
}

export async function deleteCategory(hass: HomeAssistant, categoryId: string): Promise<void> {
  await callWS(hass, { type: "homeroster/categories/delete", category_id: categoryId });
}

export async function reorderCategories(hass: HomeAssistant, orderedIds: string[]): Promise<Category[]> {
  const result = await callWS<{ categories: Category[] }>(hass, {
    type: "homeroster/categories/reorder",
    ordered_ids: orderedIds,
  });
  return result.categories;
}

export interface ImportResult {
  people_imported: number;
  categories_imported: number;
  events_imported: number;
  events_skipped: number;
  events_replaced: number;
  events_duplicated: number;
  errors: string[];
}

export function exportJson(hass: HomeAssistant): Promise<Record<string, unknown>> {
  return callWS(hass, { type: "homeroster/export_json" });
}

export function importJson(
  hass: HomeAssistant,
  payload: Record<string, unknown>,
  conflictStrategy: "skip" | "replace" | "duplicate" = "skip"
): Promise<ImportResult> {
  return callWS(hass, { type: "homeroster/import_json", payload, conflict_strategy: conflictStrategy });
}
