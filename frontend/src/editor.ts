// Visual config editor, built on HA's own <ha-form> + schema (already part
// of the frontend bundle at runtime - not reimplemented here).
import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "./ha-types";
import { DEFAULT_CONFIG, type HomeRosterCardConfig } from "./types";

const LABELS: Record<string, string> = {
  title: "Titel",
  default_view: "Standardansicht",
  show_filters: "Filterleiste anzeigen",
  show_search: "Suchfeld anzeigen",
  show_add_button: "Plus-Schaltfläche anzeigen",
  allow_edit: "Erstellen/Bearbeiten erlauben",
  read_only: "Nur-Lesen-Modus (Kiosk)",
  show_done_events: "Erledigte Termine anzeigen",
  show_cancelled_events: "Abgesagte Termine anzeigen",
  show_weekends: "Wochenenden anzeigen",
  show_week_numbers: "Kalenderwochen anzeigen",
  start_hour: "Startstunde",
  end_hour: "Endstunde",
  time_step: "Zeitschritt (Minuten)",
  time_format: "Zeitformat",
  max_events_per_day: "Max. Termine pro Tag (Monatsansicht)",
  agenda_days: "Agenda-Zeitraum (Tage)",
  dim_past_events: "Vergangene Termine abdunkeln",
  color_mode: "Farbmodus",
  compact: "Kompakter Modus",
  show_now_line: "„Jetzt“-Linie anzeigen",
  highlight_today: "Heutiges Datum hervorheben",
  first_weekday: "Erster Wochentag",
};

const SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "default_view",
    selector: { select: { options: ["today", "day", "week", "month", "agenda"], mode: "dropdown" } },
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_filters", selector: { boolean: {} } },
      { name: "show_search", selector: { boolean: {} } },
      { name: "show_add_button", selector: { boolean: {} } },
      { name: "allow_edit", selector: { boolean: {} } },
      { name: "read_only", selector: { boolean: {} } },
      { name: "show_done_events", selector: { boolean: {} } },
      { name: "show_cancelled_events", selector: { boolean: {} } },
      { name: "show_weekends", selector: { boolean: {} } },
      { name: "show_week_numbers", selector: { boolean: {} } },
      { name: "dim_past_events", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
      { name: "show_now_line", selector: { boolean: {} } },
      { name: "highlight_today", selector: { boolean: {} } },
    ],
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "start_hour", selector: { number: { min: 0, max: 23, mode: "box" } } },
      { name: "end_hour", selector: { number: { min: 1, max: 24, mode: "box" } } },
      { name: "time_step", selector: { number: { min: 5, max: 60, step: 5, mode: "box" } } },
      { name: "max_events_per_day", selector: { number: { min: 1, max: 10, mode: "box" } } },
      { name: "agenda_days", selector: { number: { min: 1, max: 60, mode: "box" } } },
    ],
  },
  { name: "time_format", selector: { select: { options: ["auto", "12", "24"], mode: "dropdown" } } },
  { name: "color_mode", selector: { select: { options: ["person", "category"], mode: "dropdown" } } },
  { name: "first_weekday", selector: { select: { options: ["monday", "sunday"], mode: "dropdown" } } },
];

@customElement("homeroster-card-editor")
export class HomeRosterCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: HomeRosterCardConfig;

  setConfig(config: LovelaceCardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...(config as HomeRosterCardConfig), type: config.type };
  }

  private _computeLabel = (schema: { name: string }): string => LABELS[schema.name] ?? schema.name;

  private _valueChanged(e: CustomEvent<{ value: HomeRosterCardConfig }>): void {
    e.stopPropagation();
    this._config = e.detail.value;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${(e: CustomEvent) => this._valueChanged(e)}
      ></ha-form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "homeroster-card-editor": HomeRosterCardEditor;
  }
}
