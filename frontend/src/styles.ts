import { css } from "lit";

// Every color comes from Home Assistant's theme CSS variables (with sane
// fallbacks) so the card stays readable in light, dark, and custom themes -
// no colors are hard-coded except per-person/category hues chosen by users.
export const CARD_STYLES = css`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  .fp-loading {
    padding: 32px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .fp-banner {
    padding: 8px 16px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .fp-banner-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
  }
  .fp-banner button {
    background: none;
    border: 1px solid currentColor;
    border-radius: 4px;
    color: inherit;
    padding: 2px 10px;
  }

  .fp-header {
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fp-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .fp-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .fp-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .fp-fab {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .fp-fab:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .fp-header-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .fp-view-switch {
    display: flex;
    background: var(--secondary-background-color, #f0f0f0);
    border-radius: 8px;
    padding: 2px;
    gap: 2px;
  }
  .fp-view-switch button {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    min-height: 32px;
  }
  .fp-view-switch button.active {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .fp-nav-arrows {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fp-nav-today {
    border: 1px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--primary-text-color);
    border-radius: 6px;
    padding: 6px 10px;
    min-height: 32px;
  }

  .fp-range-label {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    margin-left: auto;
  }

  .fp-search {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 8px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 0.9rem;
    min-height: 40px;
  }

  .fp-search-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .fp-search-row .fp-search {
    flex: 1;
    min-width: 160px;
  }
  .fp-filter-toggle {
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 8px;
    padding: 8px 12px;
    min-height: 40px;
    font-size: 0.85rem;
  }
  .fp-filter-toggle.active {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  .fp-filter-badge {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-radius: 999px;
    font-size: 0.65rem;
    line-height: 1;
    min-width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }

  .fp-filterbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  /* Chip background always mixes in a bit of --divider-color rather than
     relying on --secondary-background-color/--card-background-color alone,
     which can end up matching the surrounding surface (and thus be
     invisible) in some themes - see the dark-theme contrast fixes in the
     event dialog's FORM_STYLES for the same reasoning applied there. */
  .fp-person-chip,
  .fp-category-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 12px;
    min-height: 36px;
    font-size: 0.85rem;
  }
  .fp-person-chip.active,
  .fp-category-chip.active {
    border-color: var(--fp-chip-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-chip-color, var(--primary-color)) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }
  .fp-person-chip-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .fp-person-chip-dot-img {
    object-fit: cover;
  }
  .fp-person-chip-all.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }

  .fp-body {
    flex: 1;
    overflow: auto;
    padding: 8px 12px 16px;
  }

  /* ---- empty state ---- */
  .fp-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 48px 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .fp-empty-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--disabled-text-color);
  }
  .fp-empty-title {
    font-size: 1.1rem;
    color: var(--primary-text-color);
  }

  /* ---- shared chip (month cells / all-day row) ---- */
  .fp-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 3px 6px;
    font-size: 0.78rem;
    text-align: left;
    overflow: hidden;
    min-height: 22px;
  }
  .fp-chip-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .fp-chip-time {
    font-weight: 600;
    opacity: 0.85;
  }
  .fp-chip-icon {
    --mdc-icon-size: 14px;
  }
  .fp-chip.fp-past {
    opacity: 0.5;
  }
  .fp-chip.fp-cancelled {
    text-decoration: line-through;
  }

  .fp-person-dots {
    display: inline-flex;
    margin-left: auto;
  }
  .fp-person-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: #fff;
    margin-left: -6px;
    border: 1px solid var(--card-background-color, #fff);
    text-transform: uppercase;
  }
  .fp-person-dot:first-child {
    margin-left: 0;
  }
  .fp-person-dot-more {
    background: var(--disabled-text-color, #9e9e9e);
  }
  /* A person linked to a HA person.* entity with a picture set (see
     views/shared.ts's personAvatarUrl()) renders that picture here instead
     of the colored initial-letter dot - same size/shape, just an <img>. */
  .fp-person-dot-img {
    object-fit: cover;
    background: var(--card-background-color, #fff);
  }

  /* ---- month view ---- */
  .fp-view-month {
    display: flex;
    flex-direction: column;
    min-width: 640px;
  }
  .fp-month-headerrow,
  .fp-month-week {
    display: grid;
  }
  .fp-month-week {
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-month-weekday {
    padding: 6px 4px;
    text-align: center;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }
  .fp-month-weeknum-header {
    grid-column: 1;
  }
  .fp-month-weeknum {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 6px;
    font-size: 0.65rem;
    color: var(--disabled-text-color);
  }
  .fp-month-cell {
    min-height: 84px;
    border-right: 1px solid var(--divider-color, #e0e0e0);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
  }
  .fp-month-cell:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.02));
  }
  .fp-month-cell-date {
    font-size: 0.8rem;
    color: var(--primary-text-color);
    align-self: flex-end;
  }
  .fp-month-cell.fp-today .fp-month-cell-date {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fp-month-cell.fp-outside-month {
    opacity: 0.4;
  }
  .fp-month-cell-events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .fp-month-more {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
    text-align: left;
    padding: 2px 4px;
  }

  /* ---- time grid (day/week) ---- */
  .fp-timegrid {
    min-width: 480px;
  }
  .fp-timegrid-header,
  .fp-allday-row {
    display: flex;
  }
  .fp-time-gutter {
    width: 52px;
    flex-shrink: 0;
  }
  .fp-time-gutter-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
  }
  .fp-day-header {
    flex: 1;
    text-align: center;
    padding: 4px 2px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-day-header-weekday {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }
  .fp-day-header-date {
    font-size: 0.95rem;
    color: var(--primary-text-color);
  }
  .fp-day-header.fp-today .fp-day-header-date {
    color: var(--primary-color);
    font-weight: 700;
  }
  .fp-allday-row {
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    padding: 2px 0;
  }
  .fp-allday-cell {
    flex: 1;
    min-height: 24px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 2px;
    cursor: pointer;
  }
  .fp-timegrid-scroll {
    display: flex;
    position: relative;
  }
  .fp-time-gutter-col {
    width: 52px;
    flex-shrink: 0;
    position: relative;
  }
  .fp-hour-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    border-top: 1px solid var(--divider-color, #eee);
    padding-left: 4px;
    box-sizing: border-box;
  }
  .fp-day-col {
    flex: 1;
    position: relative;
    border-left: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-hour-line {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px solid var(--divider-color, #eee);
  }
  .fp-timed-event-slot {
    position: absolute;
    padding: 0 1px;
  }
  .fp-timed-event-slot .fp-chip {
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
  .fp-now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--error-color, #db4437);
    z-index: 2;
  }
  .fp-now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color, #db4437);
  }

  .fp-week-number {
    font-size: 0.75rem;
    color: var(--disabled-text-color);
    padding: 0 0 4px 52px;
  }

  /* ---- week view (vertically stacked day sections) ---- */
  .fp-view-week {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fp-week-day-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .fp-week-day-header {
    display: flex;
    flex: none;
    align-items: center;
    gap: 8px;
    text-align: left;
    padding: 4px 4px;
  }
  .fp-week-day-header .fp-day-header-weekday {
    font-weight: 600;
  }
  .fp-week-day-header .fp-day-header-date {
    color: var(--secondary-text-color);
  }
  .fp-week-day-header.fp-today .fp-day-header-weekday,
  .fp-week-day-header.fp-today .fp-day-header-date {
    color: var(--primary-color);
    font-weight: 700;
  }
  .fp-week-day-add {
    margin-left: auto;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fp-week-day-add:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .fp-week-day-empty {
    color: var(--disabled-text-color);
    font-size: 0.82rem;
    padding: 0 4px 6px;
  }
  .fp-week-day-items {
    padding: 0 4px;
  }

  /* ---- agenda view ---- */
  .fp-agenda-group {
    margin-bottom: 12px;
  }
  .fp-agenda-daylabel {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    padding: 4px 0;
    position: sticky;
    top: 0;
    background: var(--card-background-color, #fff);
  }
  .fp-agenda-daylabel.fp-today {
    color: var(--primary-color);
  }
  .fp-agenda-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .fp-agenda-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    border-radius: 8px;
    padding: 10px 12px;
    min-height: 44px;
    text-align: left;
  }
  .fp-agenda-item.fp-cancelled .fp-agenda-item-title {
    text-decoration: line-through;
    color: var(--disabled-text-color);
  }
  .fp-agenda-item-bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .fp-agenda-item-time {
    font-variant-numeric: tabular-nums;
    min-width: 52px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .fp-agenda-item-title {
    flex: 1;
    color: var(--primary-text-color);
  }
  .fp-agenda-item-location {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
  }
  .fp-agenda-item-location ha-icon {
    --mdc-icon-size: 14px;
  }
  /* Location text is a tappable Google Maps link (see
     views/shared.ts's renderLocationLink()) but should still read as a
     plain label, not a default blue/underlined link - only :hover and
     :focus-visible reveal that it's interactive, matching the affordance
     already used elsewhere in the card (e.g. .fp-fab:focus-visible above). */
  .fp-location-link {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: inherit;
    text-decoration: none;
    border-radius: 4px;
  }
  .fp-location-link:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
  .fp-location-link:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
  .fp-agenda-item-status {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 1px 6px;
  }

  .fp-compact .fp-agenda-item {
    padding: 6px 10px;
    min-height: 32px;
  }

  @media (max-width: 600px) {
    .fp-header-top {
      flex-wrap: wrap;
    }
    .fp-range-label {
      margin-left: 0;
      width: 100%;
      order: 3;
    }
    .fp-month-cell {
      min-height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }
`;
