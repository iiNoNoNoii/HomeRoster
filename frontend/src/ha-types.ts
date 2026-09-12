// Minimal local typings for the subset of Home Assistant's frontend `hass`
// object this card actually uses. The full `home-assistant-frontend` types
// are not published as a standalone npm package; hand-typing the small
// surface we touch keeps the build dependency-free and avoids guessing at
// unrelated internal APIs.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface FrontendLocaleData {
  language: string;
  number_format: string;
  time_format: "12" | "24" | "language" | "system";
  first_weekday: "language" | "monday" | "tuesday" | "sunday";
}

export interface HassConnection {
  sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
  subscribeEvents<T>(callback: (ev: T) => void, eventType: string): Promise<() => void>;
  addEventListener(type: "ready" | "disconnected" | "reconnect-error", cb: () => void): void;
  removeEventListener(type: "ready" | "disconnected" | "reconnect-error", cb: () => void): void;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connection: HassConnection;
  language: string;
  locale: FrontendLocaleData;
  themes: { darkMode?: boolean };
  user?: { id: string; name: string; is_admin: boolean };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<unknown>;
  localize?: (key: string, ...args: unknown[]) => string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HTMLElementTagNameMap {
    "ha-form": HTMLElement & {
      hass?: HomeAssistant;
      data?: Record<string, unknown>;
      schema?: unknown[];
      computeLabel?: (schema: { name: string }) => string;
    };
  }
}
