*[English version](README.md)*

# HomeRoster

Ein vollständig **lokaler** digitaler Familienkalender für Home Assistant –
ohne Cloud-Dienst, ohne externen Account, ohne Internetverbindung im
Normalbetrieb. HomeRoster besteht aus einer Custom Integration (Python)
als Backend und einer eigenen Lovelace-Karte (TypeScript/Lit) als Frontend.

> **Kein Google Calendar, kein iCloud, kein Cloud-Dienst eines Anbieters
> nötig.** Alle Termine, Personen und Kategorien werden ausschließlich in
> Home Assistants eigenem Storage gespeichert.

*HomeRoster ist ein unabhängiges, von der Community gepflegtes Projekt. Es
steht in keiner Verbindung zu Nabu Casa oder dem Home-Assistant-Projekt und
wird von diesen weder unterstützt noch empfohlen.*

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/iinononoii)

## Inhalt

- [Funktionsübersicht](#funktionsübersicht)
- [Screenshots](#screenshots)
- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Einrichtung](#einrichtung)
- [Kartenkonfiguration](#kartenkonfiguration)
- [Personenverwaltung](#personenverwaltung)
- [Kategorien und Status](#kategorien-und-status)
- [Wiederholende Termine](#wiederholende-termine)
- [Erinnerungen](#erinnerungen)
- [Entities, Sensoren und Services](#entities-sensoren-und-services)
- [Automationsbeispiele](#automationsbeispiele)
- [Dashboard-Zusatzkarten](#dashboard-zusatzkarten)
- [Backup, Import und Export](#backup-import-und-export)
- [Datenschutz und Berechtigungen](#datenschutz-und-berechtigungen)
- [Diagnose](#diagnose)
- [Bekannte Einschränkungen](#bekannte-einschränkungen)
- [Fehlerbehebung](#fehlerbehebung)
- [Upgrade- und Migrationshinweise](#upgrade--und-migrationshinweise)
- [Entwicklung](#entwicklung)
- [Abnahmekriterien (MVP)](#abnahmekriterien-mvp)
- [Entwicklungsphasen](#entwicklungsphasen)
- [Lizenz](#lizenz)

## Funktionsübersicht

- Eigene Kalenderkarte mit Agenda-, Tages-, Wochen- und Monatsansicht (in
  dieser Reihenfolge im Ansichten-Umschalter). Die Wochenansicht zeigt eine rollierende
  7-Tage-Vorschau ab dem aktuell ausgewählten Datum (wie bei einer
  Wetter-App) mit je einem eigenen Abschnitt pro Tag, statt einer festen
  Montag–Sonntag-Kalenderwoche.
- Termine mit Titel, Untertitel, Ort, Beschreibung, Kategorie, Farbe, Icon,
  Status, mehreren zugewiesenen Personen, Erinnerungen und optionaler
  Wiederholung.
- Mehrere Personen pro Termin – intern ein einziger Datensatz, keine
  Duplikate.
- Überlappende Termine werden nebeneinander in eigenen Spuren ("Lanes")
  dargestellt, nie verdeckt.
- Eigene Personen- und Kategorienverwaltung mit Sicherheitsabfrage beim
  Löschen von Personen (Termine gehen nie verloren).
- Standardkonforme `calendar`-Entities (Gesamtkalender + ein gefilterter
  Kalender je aktiver Person), nutzbar von jeder anderen Kalenderkarte und
  in Automationen.
- Sensoren für heutige Termine, morgige Termine, nächsten Termin, nächsten
  Geburtstag – jeweils auch pro Person – sowie ein "Termin aktiv"-
  Binärsensor.
- Services/Actions für Termin-CRUD, Abfragen und Statusänderungen, mit
  Schema und Selektoren im UI-Aktionseditor nutzbar.
- WebSocket-API für die Karte: Termine, Personen und Kategorien werden nie
  ausschließlich im Browser gehalten.
- Deutsche und englische Übersetzung, Dark Mode und mobile Darstellung über
  Home-Assistant-Theme-Variablen. Die Kartensprache kann pro Installation
  auch fest auf Deutsch oder Englisch eingestellt werden, unabhängig von
  der individuellen Spracheinstellung jedes Benutzers (siehe
  [Kartenkonfiguration](#kartenkonfiguration)).
- Optionale Push-Benachrichtigungen für Erinnerungen über die
  Home-Assistant-Begleit-App, zusätzlich zum bestehenden Erinnerungs-Event
  (siehe [Erinnerungen](#erinnerungen)).

Eine genaue Zuordnung der Funktionen zu MVP/Phase 2/Phase 3 steht am Ende
dieser README unter [Entwicklungsphasen](#entwicklungsphasen).

## Screenshots

Diese README enthält bewusst keine eingebetteten Bilddateien – es gibt
(noch) keine laufende Home-Assistant-Instanz, aus der sich für dieses
Dokumentationspaket authentische Screenshots aufnehmen ließen, und
erfundene Platzhalterbilder wären irreführend. So erstellst du eigene
Screenshots für dein Repository:

1. Karte in einem Dashboard einrichten (siehe unten) und mit ein paar
   Beispielterminen füllen.
2. Wochenansicht, Monatsansicht und den Termin-Dialog jeweils als PNG
   sichern (Browser-Screenshot oder Home-Assistant-App).
3. Dateien unter `docs/screenshots/` ablegen, z. B.
   `docs/screenshots/week-view.png`, und hier mit
   `![Wochenansicht](docs/screenshots/week-view.png)` einbinden.

## Voraussetzungen

- **Home Assistant Core 2024.10.0 oder neuer.** Diese Integration nutzt die
  Calendar-Entity-CRUD-Unterstützung (`CalendarEntityFeature.CREATE_EVENT`
  / `UPDATE_EVENT` / `DELETE_EVENT`) sowie `async_register_static_paths`
  zur automatischen Registrierung der Lovelace-Karte – beides Home-
  Assistant-APIs, die erst ab 2024 verfügbar sind. `manifest.json` setzt
  `min_ha_version` entsprechend; ältere Installationen lehnen das Laden der
  Integration kontrolliert ab.
- HACS (empfohlen) oder Zugriff auf das `custom_components`-Verzeichnis für
  eine manuelle Installation.
- Keine weiteren Cloud-Konten, keine zusätzliche Hardware.

## Installation

### Über HACS

1. HACS öffnen → **Integrationen** → Menü (⋮) → **Benutzerdefinierte
   Repositories**.
2. Repository-URL dieses Projekts eintragen, Kategorie **Integration**
   wählen, hinzufügen.
3. "HomeRoster" in HACS suchen und installieren.
4. Home Assistant neu starten.

### Manuell

1. Den Ordner `custom_components/homeroster` dieses Repositories nach
   `<config>/custom_components/homeroster` kopieren.
2. Sicherstellen, dass `custom_components/homeroster/www/homeroster-card.js`
   vorhanden ist (im Repository bereits mitgebaut; siehe
   [Entwicklung](#entwicklung), falls du die Karte selbst neu bauen willst).
3. Home Assistant neu starten.

## Einrichtung

1. **Einstellungen → Geräte & Dienste → Integration hinzufügen** → "Family
   Planner" suchen → Einrichten. Es wird kein Konto und keine externe
   Anmeldung benötigt.
2. Die Integration registriert die Lovelace-Karte automatisch (über
   `add_extra_js_url`) – in der Regel ist **kein manuelles Hinzufügen einer
   Lovelace-Ressource nötig**. Die genaue URL enthält einen Cache-Busting-Hash
   und wechselt bei jedem Update der Karte (z. B.
   `/homeroster_static/homeroster-card-<hash>.js`); die aktuell
   registrierte URL steht im Home-Assistant-Log (INFO-Meldung „Family
   Planner: Lovelace-Karte erfolgreich unter … registriert“) sowie unter
   **Einstellungen → Dashboards → Ressourcen**. Erscheint die Karte trotzdem
   nicht im Karten-Picker, füge sie dort manuell mit genau dieser URL hinzu,
   Typ „JavaScript-Modul“.
3. Über **Personen verwalten**/**Kategorien verwalten** in der Karte (oder
   in den Integrationsoptionen, siehe unten) erste Familienmitglieder
   anlegen.
4. Karte zu einem Dashboard hinzufügen (siehe nächster Abschnitt).

Administrative Grundeinstellungen (z. B. ob mindestens eine Person pro
Termin Pflicht ist, ob Nicht-Administratoren Termine bearbeiten dürfen, die
Kartensprache oder ob Erinnerungen zusätzlich per Home-Assistant-App
gesendet werden) finden sich unter **Einstellungen → Geräte & Dienste →
HomeRoster → Konfigurieren**. Dort lassen sich Personen und Kategorien
auch ohne geladene Karte anlegen, bearbeiten, umsortieren, deaktivieren und
löschen – das ist der frontend-unabhängige Fallback-Weg; im Alltag ist die
Personen-/Kategorienverwaltung direkt in der Karte komfortabler.

## Kartenkonfiguration

```yaml
type: custom:homeroster-card
title: Familienkalender
entity: calendar.homeroster
default_view: week
people:
  - anna
  - tom
  - mia
preselected_people: []
visible_categories: []
show_filters: true
show_search: true
show_add_button: true
allow_edit: true
show_done_events: true
show_cancelled_events: false
show_weekends: true
show_week_numbers: true
start_hour: 6
end_hour: 22
time_step: 30
time_format: auto
max_events_per_day: 3
agenda_days: 14
dim_past_events: true
color_mode: person
compact: false
show_now_line: true
highlight_today: true
read_only: false
first_weekday: monday
```

| Option | Beschreibung | Standard |
| --- | --- | --- |
| `title` | Kartentitel | „Familienkalender“ |
| `default_view` | `agenda` / `day` / `week` / `month` | `week` |
| `people` | Nur diese Personen-IDs als Filter/Chips anzeigen (leer = alle aktiven) | leer |
| `preselected_people` | Beim Öffnen vorausgewählte Personen-IDs | leer |
| `visible_categories` | Nur diese Kategorie-IDs anzeigen (leer = alle aktiven) | leer |
| `show_filters` / `show_search` / `show_add_button` | Filterleiste, Suchfeld, Plus-Schaltfläche ein-/ausblenden | `true` |
| `allow_edit` | Bearbeiten grundsätzlich erlauben (siehe auch `read_only`) | `true` |
| `read_only` | Kiosk-/Nur-Lesen-Modus: keine Bearbeiten-Aktionen in der UI | `false` |
| `show_done_events` / `show_cancelled_events` | Erledigte/abgesagte Termine anzeigen | `true` / `false` |
| `show_weekends` / `show_week_numbers` | Wochenenden anzeigen bzw. Kalenderwochennummern anzeigen (Letzteres wirkt sich seit der rollierenden Wochenansicht praktisch nur noch auf die Monatsansicht aus, siehe Hinweis unten) | `true` |
| `start_hour` / `end_hour` / `time_step` | Sichtbarer Zeitbereich und Zeitraster (Minuten) in der Tagesansicht (die Wochenansicht ist eine tagesweise Liste ohne Zeitraster, siehe Hinweis unten) | `6` / `22` / `30` |
| `time_format` | `auto` (aus Home-Assistant-Locale), `12`, `24` | `auto` |
| `max_events_per_day` | Max. sichtbare Termine je Tag in der Monatsansicht, Rest als „+N weitere“ | `3` |
| `agenda_days` | Zeitraum der Agenda-Ansicht in Tagen | `14` |
| `dim_past_events` | Vergangene Termine abdunkeln | `true` |
| `color_mode` | `person` oder `category` als primäre Farbquelle | `person` |
| `compact` | Kompaktere Darstellung (kleinere Zeilenhöhen) | `false` |
| `show_now_line` | Rote „Jetzt“-Linie in der Tagesansicht | `true` |
| `highlight_today` | Heutiges Datum hervorheben | `true` |
| `first_weekday` | `monday` oder `sunday` (leer = aus Home-Assistant-Locale); bestimmt den ersten Wochentag der Monatsansicht (die Wochenansicht ist seit der rollierenden 7-Tage-Vorschau nicht mehr an eine feste Kalenderwoche gebunden, siehe Hinweis unten) | `monday` |

**Hinweis zur Wochenansicht:** Die Wochenansicht zeigt keine feste
Kalenderwoche (Montag–Sonntag oder Sonntag–Samstag) mehr an, sondern immer
die 7 Tage ab dem gerade ausgewählten Datum (standardmäßig heute, oder wo
auch immer man gerade hinnavigiert hat) – ähnlich der 7-Tage-Vorschau einer
Wetter-App. Jeder Tag wird als eigener Abschnitt mit seinen tatsächlichen
Terminen aufgelistet, nicht mehr als Zeitraster nebeneinander. Dadurch
wirken sich `start_hour`, `end_hour`, `time_step` und `show_now_line` nur
noch auf die Tagesansicht aus, und `show_week_numbers`/`first_weekday`
betreffen praktisch nur noch die Monatsansicht, da die Wochenansicht nicht
mehr an eine einzelne Kalenderwoche gebunden ist. Die Tagesansicht selbst
ist unverändert ein stundenweises Zeitraster für genau einen Tag (eine
eigene „Heute“-Ansicht gibt es nicht mehr – die „Heute“-Sprungschaltfläche
in der Tages-/Wochen-/Monats-/Agenda-Navigation führt bereits genau
dorthin).

**Kartensprache:** Über die Integrationsoption „Kartensprache“
(**Einstellungen → Geräte & Dienste → HomeRoster → Konfigurieren →
Allgemeine Einstellungen**) lässt sich die Sprache der Karte fest auf
Deutsch oder Englisch einstellen, unabhängig von der individuellen
Home-Assistant-Spracheinstellung jedes einzelnen Benutzers. Der
Standardwert „Automatisch“ übernimmt weiterhin die jeweilige Sprache des
Benutzers, der die Karte gerade betrachtet. Das ist besonders für ein
gemeinsam genutztes Wandtablet-Dashboard nützlich, auf dem die Sprache
nicht je nach angemeldetem Benutzer wechseln soll.

Ein visueller Karteneditor (`ha-form`-basiert) steht im Lovelace-UI-Editor
zur Verfügung und deckt die wichtigsten Optionen ab.

## Personenverwaltung

Über das Personen-Symbol in der Kartenkopfzeile (nur für Administratoren
sichtbar) öffnet sich die Personenverwaltung: Hinzufügen, Bearbeiten,
Umsortieren (Pfeile), Deaktivieren/Aktivieren und Löschen.

Beim **Löschen** einer Person wird immer eine Strategie abgefragt:

- **Nur deaktivieren** – Person verschwindet aus Auswahllisten, bestehende
  Termine bleiben unverändert.
- **Aus Terminen entfernen** – Person wird aus allen zugewiesenen Terminen
  entfernt; die Termine selbst bleiben erhalten (ggf. ohne
  Personenzuweisung).
- **Terminen einer anderen Person zuweisen** – alle Termine der gelöschten
  Person werden einer Zielperson zugewiesen (Duplikate werden vermieden).
- **Termine ohne Personenzuweisung behalten** – technisch identisch zu
  „Aus Terminen entfernen“: Es geht nie ein Termin verloren, nur die
  Personenzuweisung wird entfernt.

Eine Person kann optional mit einer vorhandenen `person.*`-Entity verknüpft
werden (Feld „Verknüpfte Person“ in den Integrationsoptionen); das ist rein
informativ und nicht erforderlich.

Ebenfalls optional lässt sich pro Person ein **Benachrichtigungsziel**
hinterlegen (in der Personenverwaltung der Karte oder im
Personen-Bearbeitungsformular der Integrationsoptionen) – ein
Home-Assistant-`notify.*`-Service, ausgewählt über einen Standard-
Entity-Picker. Typischerweise ist das einer der Services, die die
Home-Assistant-Begleit-App automatisch pro Gerät anlegt (z. B.
`notify.mobile_app_pixels_phone`). Ist ein Ziel hinterlegt und die
Integrationsoption „Erinnerungen per Home-Assistant-App senden“ aktiv,
erhält diese Person zusätzlich Push-Benachrichtigungen für ihre
Erinnerungen (siehe [Erinnerungen](#erinnerungen)).

## Kategorien und Status

Acht Standardkategorien sind vorbelegt (Schule, Arbeit, Arzt, Freizeit,
Geburtstag, Urlaub, Haushalt, Sonstiges) und über die Kategorienverwaltung
frei anpassbar, sortierbar und deaktivierbar. Terminstatus (`planned`,
`confirmed`, `tentative`, `done`, `cancelled`) lassen sich pro Termin
setzen; abgesagte Termine werden je nach Karteneinstellung ausgeblendet
oder durchgestrichen dargestellt.

## Wiederholende Termine

Das Datenmodell unterstützt RFC-5545-RRULE-Strings (`rrule`-Feld) und ist
auf zukünftige Erweiterungen vorbereitet (`recurrence_id`, `exdates`).
**Aktuell umgesetzt (Phase 1/2):**

- Wiederholung täglich, wöchentlich, monatlich oder jährlich, mit
  optionalem Enddatum, direkt im Termin-Dialog.
- Bearbeiten/Löschen der **gesamten Serie**.
- Löschen einer **einzelnen Instanz** (fügt ein `EXDATE` hinzu, ohne die
  restliche Serie zu berühren).
- Die Expansion einer Serie ist immer auf den angefragten Zeitraum
  begrenzt (siehe [Performance](#entwicklung)) – es werden nie unbegrenzt
  viele Instanzen im Voraus materialisiert.

**Noch nicht umgesetzt (Phase 3):** Bearbeiten einer einzelnen
Serieninstanz oder „diese und folgende Instanzen“ – beim Versuch, dies über
die native `calendar.update_event`/`calendar.delete_event`-Action mit
`recurrence_range` durchzuführen, liefert die Integration eine klare
Fehlermeldung statt eines falschen Ergebnisses.

## Erinnerungen

Termine können mehrere Erinnerungs-Offsets speichern (zum Start, 5/15/30/60
Minuten vorher, 1 Tag vorher oder ein frei wählbarer Minutenwert). Die
Integration feuert bei Fälligkeit das Event `homeroster_reminder_due`,
das eine Automation auswertet (siehe
[Automationsbeispiele](#automationsbeispiele)); das entkoppelt die
Zustellung (Mobile App, TTS, Licht, …) vollständig vom Kalender.

Optional kann die Integration Erinnerungen zusätzlich automatisch als
Push-Benachrichtigung über die Home-Assistant-Begleit-App zustellen. Über
die Integrationsoption **„Erinnerungen per Home-Assistant-App senden“**
(**Einstellungen → Geräte & Dienste → HomeRoster → Konfigurieren**,
Standard: an) ruft die Integration zum jeweils konfigurierten
Erinnerungszeitpunkt automatisch den in der Personenverwaltung hinterlegten
`notify.*`-Service jeder zugewiesenen Person auf – zusätzlich zum (nicht
anstelle des) `homeroster_reminder_due`-Events, sodass bestehende
eigene Automationen unverändert weiterlaufen. Vorausgesetzt sind dafür
**beide** Bedingungen: die globale Option ist aktiv **und** die jeweilige
Person hat ein Benachrichtigungsziel hinterlegt (siehe
[Personenverwaltung](#personenverwaltung)). Ist eine der beiden Bedingungen
nicht erfüllt, ändert sich nichts am bisherigen Verhalten – es wird
weiterhin nur das Bus-Event gefeuert. Die Integration erzwingt damit
weiterhin keine Benachrichtigungen; sie sind rein optional und pro Person
einzeln aktivierbar.

Verhalten in Sonderfällen:

| Situation | Verhalten |
| --- | --- |
| Neustart kurz vor einer Erinnerung | Erinnerung wird nach dem Start regulär geprüft und ausgelöst, sobald der erste Prüf-Tick (Standard: alle 30s) läuft. |
| Neustart während ein Termin läuft | `homeroster_event_started` wird beim ersten Tick nach dem Start nachgeholt, sofern der Termin dann noch aktiv ist; die Aktiv-Sensoren zeigen den korrekten Zustand sofort nach dem Laden. |
| Bearbeiten eines Termins | Die Menge bereits ausgelöster Erinnerungen bleibt an die (Termin-ID, Instanz, Offset)-Kombination gebunden; Änderungen an Uhrzeit/Offsets können dieselbe Erinnerung erneut fällig werden lassen. |
| Löschen eines Termins | Offene, noch nicht ausgelöste Erinnerungen verfallen ersatzlos. |
| Sommer-/Winterzeitwechsel | Alle internen Zeitvergleiche laufen in UTC; die lokale Zeitzone wird nur für die Anzeige und für ganztägige Termine verwendet – DST-Wechsel verschieben keine Erinnerungszeitpunkte. |
| Verpasste Erinnerung (Home Assistant war offline) | Wird die Erinnerung innerhalb von 1 Stunde nach dem eigentlichen Fälligkeitszeitpunkt nachgeholt, feuert das Event trotzdem (einmalig). Liegt der Fälligkeitszeitpunkt weiter zurück, wird die Erinnerung als „gesehen“ markiert, aber **nicht** nachträglich gefeuert, um keine Flut veralteter Benachrichtigungen zu erzeugen. |

Ausgelöste Erinnerungen werden persistiert und nach 48 Stunden automatisch
aufgeräumt, damit die Speicherdatei nicht unbegrenzt wächst.

## Entities, Sensoren und Services

**Calendar-Entities**

- `calendar.homeroster` – alle Termine, unterstützt Erstellen/
  Bearbeiten/Löschen über die native `calendar.create_event` /
  `calendar.update_event` / `calendar.delete_event`-Action.
- `calendar.homeroster_<person>` – ein schreibgeschützter, nach Person
  gefilterter Kalender je aktiver Person (Entity-ID aus dem Personennamen
  abgeleitet, z. B. `calendar.homeroster_anna`).

**Sensoren**

- `sensor.homeroster_events_today` / `..._today_<person>` – Anzahl
  (State) und Liste (Attribut `events`, auf 20 begrenzt) der heutigen
  Termine.
- `sensor.homeroster_events_tomorrow` – Anzahl der morgigen Termine.
- `sensor.homeroster_next_event` / `..._next_event_<person>` –
  Timestamp-Sensor, State = ISO-Zeitpunkt des nächsten (oder laufenden)
  Termins bzw. `unbekannt`, Attribute inkl. Titel, Ort, Personen, Kategorie.
- `sensor.homeroster_next_reminder` / `..._next_reminder_<person>` –
  Timestamp-Sensor; State = Fälligkeitszeitpunkt der *nächsten anstehenden
  Erinnerung* – nicht zwangsläufig die Erinnerung zum nächsten Termin: Ein
  später startender Termin mit längerem Vorlauf kann früher fällig sein als
  ein früherer Termin mit kurzem Vorlauf (z. B. ist ein 15:00-Uhr-Termin mit
  60 Min. Vorlauf schon um 14:00 Uhr fällig, vor einem 14:30-Uhr-Termin mit
  nur 5 Min. Vorlauf). Für die Dashboard-Anzeige gedacht; Attribute
  enthalten Titel, Start, Ort, zugewiesene Personen (`person_names`) und
  den Vorlauf der Erinnerung (`offset_minutes`).
- `sensor.homeroster_reminder_due` / `..._reminder_due_<person>` – die
  Entity für **Benachrichtigungs-Automatisierungen**: Der State wechselt
  bei jeder tatsächlich fällig werdenden Erinnerung auf einen frischen
  Zeitstempel (bleibt nie "hängen", verpasst auch keine zweite Erinnerung
  im selben Scheduler-Tick), mit denselben Attributen wie `next_reminder`
  oben. Ein State-Trigger ohne `to:` auf dieser Entity reagiert
  zuverlässig auf jede Erinnerung – siehe [Automationsbeispiele](#automationsbeispiele)
  Nr. 6 für eine vollständige Push-Benachrichtigung. Die personenbezogene
  Variante feuert nur für Erinnerungen zu Terminen dieser Person.
- `sensor.homeroster_next_birthday` – nächster Termin der Kategorie
  „Geburtstag“, sofern vorhanden.
- `binary_sensor.homeroster_event_active` / `..._event_active_<person>`
  – an, solange mindestens ein (nicht abgesagter) Termin aktiv läuft.

Sensoren aktualisieren sich ausschließlich bei tatsächlichen Änderungen
(Termin angelegt/geändert/gelöscht, Start/Ende-Übergang, Tageswechsel) –
nicht sekündlich.

**Services/Actions** (Domain `homeroster`, siehe `services.yaml` für
alle Felder und Selektoren):

`create_event`, `update_event`, `delete_event`, `get_events`,
`get_today_events`, `get_next_event`, `duplicate_event`,
`set_event_status`, `create_backup`, `list_backups`, `restore_backup`
(siehe [Backup, Import und Export](#backup-import-und-export)).

**Events auf dem Event-Bus:** `homeroster_event_created`,
`homeroster_event_updated`, `homeroster_event_deleted`,
`homeroster_event_started`, `homeroster_event_ended`,
`homeroster_reminder_due`. Jede Nutzlast enthält mindestens
`event_id`, `title`, `start`, `end`, `all_day`, `person_ids` – bewusst
ohne Beschreibung/Ort, um keine unnötigen Inhalte auf dem Event-Bus zu
verteilen.

## Automationsbeispiele

Vollständige, kopierfertige Beispiele stehen in
[`docs/automations.yaml`](docs/automations.yaml):

1. Morgens 07:00 Uhr Zusammenfassung der heutigen Termine per
   `homeroster.get_today_events` + Benachrichtigung.
2. Erinnerung 30 Minuten vor einem Termin einer bestimmten Person über
   `homeroster_reminder_due`.
3. Reaktion auf neu erstellte/geänderte Termine (Logbuch-Eintrag).
4. LED-Hinweis bei Terminstart (`homeroster_event_started`).
5. Termin automatisch als erledigt markieren, wenn er endet
   (`homeroster_event_ended` + `homeroster.set_event_status`).
6. Push-Benachrichtigung für jede Erinnerung (Titel, wer, Vorlaufzeit, Tippen
   öffnet das Dashboard), aufgebaut auf `sensor.homeroster_reminder_due`
   statt dem Event-Bus – siehe [Entities, Sensoren und
   Services](#entities-sensoren-und-services) oben, warum dieser Sensor
   zusätzlich zu `homeroster_reminder_due` existiert.

Hinweis zum Tippen-und-öffnen: Die `clickAction` einer Benachrichtigung kann
das Dashboard/die View mit der Karte öffnen (so macht es Beispiel 6), aber
Home Assistant hat keinen eingebauten Weg, direkt zu *einem bestimmten*
Termin-Detaildialog zu springen – dafür müsste die Karte selbst eine
Termin-ID aus der URL lesen und diesen Termin beim Laden automatisch öffnen,
was sie aktuell nicht tut.

Template-Beispiele für Dashboard-Text (siehe auch
[`docs/dashboards.yaml`](docs/dashboards.yaml)):

```jinja2
Heute stehen {{ states('sensor.homeroster_events_today') }} Termine an.
```

```jinja2
{% set next = states.sensor.homeroster_next_event %}
Der nächste Termin ist {{ next.attributes.title }} um
{{ as_timestamp(next.state) | timestamp_custom('%H:%M', true) }} Uhr.
```

```jinja2
{% if states('sensor.homeroster_events_today_mia') | int(0) == 0 %}
Mia hat heute keine Termine.
{% endif %}
```

Alle Termine zwischen zwei Zeitpunkten abfragen (z. B. in einem Skript):

```yaml
- action: homeroster.get_events
  data:
    start: "2026-09-20T00:00:00+02:00"
    end: "2026-09-27T00:00:00+02:00"
  response_variable: woche
```

## Dashboard-Zusatzkarten

Statt eigener zusätzlicher Custom-Card-Typen liefert die Integration
robuste Sensor-Attribute und Beispielkonfigurationen für native Karten
(`markdown`, `tile`) – siehe [`docs/dashboards.yaml`](docs/dashboards.yaml)
für „Heute“-Kachel, „Nächster Termin“-Kachel und Personenkachel.

## Backup, Import und Export

Die regulären Daten liegen unter `<config>/.storage/homeroster_<entry_id>`
und sind damit automatisch Teil jedes vollständigen Home-Assistant-Backups.
Zusätzlich kann HomeRoster eigene, **unabhängige** Backups pflegen – reine
JSON-Momentaufnahmen unter `<config>/homeroster_backups/`, bewusst
außerhalb von `.storage/`, damit sie genau die Dinge überstehen, die
speziell dieser Integration gefährlich werden können: eine versehentliche
Entfernung/Neuinstallation, ein fehlgeschlagenes Update oder eine defekte
`.storage`-Datei.

**Einstellungen → Geräte & Dienste → HomeRoster → Konfigurieren →
Automatische Backups:**

| Einstellung | Bedeutung |
| --- | --- |
| Backups automatisch erstellen | Standardmäßig an. |
| Intervall (Tage) | Wie oft automatisch ein neues Backup erstellt wird (stündlich geprüft; eine verpasste Prüfung nach einer Downtime wird innerhalb einer Stunde nach dem nächsten Neustart nachgeholt). |
| Die letzten N Backups behalten | Ältere Backups über dieser Anzahl hinaus werden nach jedem neuen automatisch gelöscht. **0 = alle Backups für immer behalten.** |

**Aktionen auf Abruf** (Entwicklerwerkzeuge → Aktionen, eine
Automatisierung oder ein Dashboard-Button – bewusst keine Formularfelder,
da es sich um einmalige Aktionen handelt, nicht um dauerhafte
Einstellungen):

- `homeroster.create_backup` – erstellt sofort ein Backup.
- `homeroster.list_backups` – listet vorhandene Backups (Dateiname, Größe,
  Zeitstempel), neueste zuerst.
- `homeroster.restore_backup` – importiert ein Backup anhand des
  Dateinamens, mit derselben Konfliktstrategie **überspringen / ersetzen /
  duplizieren** wie unten. Funktioniert identisch für ein selbst erstelltes
  Backup *oder* eines von einer fremden HomeRoster-Instanz – dazu einfach
  deren Datei zuerst nach `homeroster_backups/` kopieren (z. B. über das
  File-Editor-Add-on, Samba oder SSH) und anschließend anhand des
  Dateinamens wiederherstellen.

Jede Wiederherstellung validiert jeden Eintrag serverseitig; fehlerhafte
Einträge werden übersprungen und im Ergebnis aufgelistet, statt den
gesamten Import abzubrechen. Bei einer Termin-ID, die bereits existiert,
entscheidet die Konfliktstrategie: **überspringen** (Standard),
**ersetzen** oder **duplizieren** (neue ID) – es wird nie stillschweigend
überschrieben.

**ICS-Import/-Export ist nicht Teil dieser Auslieferung** (siehe
[Bekannte Einschränkungen](#bekannte-einschränkungen)).

## Datenschutz und Berechtigungen

- Keine externen Requests, kein Tracking, keine Telemetrie.
- Alle WebSocket-Kommandos laufen über Home Assistants reguläre,
  authentifizierte Verbindung – es gibt keinen zusätzlichen,
  unauthentifizierten HTTP-Endpunkt.
- **Lesen** (Termine, Personen, Kategorien abfragen): jeder angemeldete
  Home-Assistant-Benutzer.
- **Termine erstellen/bearbeiten/löschen**: standardmäßig auch
  Nicht-Administratoren erlaubt; über die Integrationsoption
  „Nicht-Administratoren dürfen Termine bearbeiten“ lässt sich das auf
  Administratoren beschränken.
- **Personen, Kategorien, Import/Export**: immer nur Administratoren.
- Alle Eingaben werden serverseitig validiert (Titel/Beschreibung/Ort etc.
  werden nie ungefiltert als HTML gerendert – die Karte nutzt Lit-Templates
  mit automatischem Escaping, keine `innerHTML`-Injektion).
- Ist die optionale Push-Benachrichtigung über die Home-Assistant-App
  aktiv (siehe [Erinnerungen](#erinnerungen)), werden Terminname und ein
  Zeitbezug (z. B. „in 30 Minuten“) über Home Assistants eigenen, bereits
  authentifizierten `notify`-Service-Aufruf an das für die jeweilige
  Person hinterlegte Gerät übermittelt – genau derselbe Mechanismus, den
  auch jede andere Home-Assistant-Automation zur Benachrichtigung über die
  Begleit-App nutzt. Es wird dabei kein externer Drittanbieterdienst
  kontaktiert.

Home Assistant bietet für Custom Integrations aktuell keine feingranularere
Berechtigungssteuerung als „Administrator ja/nein“ plus generelle
Benutzeraktivität – eine Rollen-genaue Rechtevergabe (z. B. „Kind darf nur
eigene Termine sehen“) ist damit **nicht** möglich und wird hier auch nicht
vorgetäuscht.

## Diagnose

**Einstellungen → Geräte & Dienste → HomeRoster → Diagnose
herunterladen** liefert ausschließlich Metadaten: Integrationsversion,
Schema-Version, Anzahl Personen/Kategorien/Termine, frühestes/spätestes
Termindatum, letzter Speicherfehler, Migrationsstatus. **Keine**
Termintitel, Beschreibungen, Orte oder Personennamen werden exportiert.

## Bekannte Einschränkungen

- Kein Drag-and-drop zum Verschieben von Terminen (bewusst nicht
  umgesetzt, siehe Aufgabenstellung: „nur dann implementieren, wenn es
  zuverlässig funktioniert“ – für ein Wandtablet mit Touch-Bedienung ist
  das Risiko unbeabsichtigter Verschiebungen ohne ausgiebige
  Touch-Schwellenwert-Tests zu hoch).
- Bearbeiten einer einzelnen Instanz einer Wiederholungsserie (nur Löschen
  einer Instanz ist möglich; „diese und folgende“ ist nicht umgesetzt).
- ICS-Import/-Export ist nicht enthalten (Phase 3).
- Die Personen-Verwaltungs-Oberfläche in den Home-Assistant-
  Integrationsoptionen (Options-Flow) ist bewusst einfach gehalten
  (Formular statt Drag-and-drop-Liste) – die komfortable Verwaltung
  erfolgt in der Karte selbst.
- Keine feingranulare Rechteverwaltung über „Administrator“ hinaus (siehe
  [Datenschutz und Berechtigungen](#datenschutz-und-berechtigungen)).
- Sprachassistent-Integration („Welche Termine haben wir heute?“) ist nicht
  Teil dieser Auslieferung; die dafür nötigen Bausteine (Services,
  Sensoren) existieren aber bereits und können in einer eigenen
  Assist-/Intent-Integration wiederverwendet werden.

## Fehlerbehebung

| Problem | Lösung |
| --- | --- |
| Browser-Konsole zeigt `Uncaught (in promise) Error: Custom element not found: homeroster-card` | Die Karte wurde vom Browser nicht (mehr) geladen. Ursachen in der Reihenfolge ihrer Wahrscheinlichkeit: **(1)** Integration wurde vor dieser Version installiert/aktualisiert, als `http` noch nicht als `dependencies` in `manifest.json` deklariert war – Home Assistant vollständig neu starten (nicht nur die Integration neu laden), damit `hass.http` beim Setup garantiert schon bereitsteht. **(2)** Ein bereits offener Browser-Tab hat die Registrierung verpasst, weil `add_extra_js_url` nur beim (Neu-)Laden der Frontend-Startseite wirkt – Tab mit Hard-Refresh neu laden (Strg/Cmd+Shift+R) oder Dashboard neu öffnen. **(3)** `custom_components/homeroster/www/homeroster-card.js` fehlt oder ist beschädigt – Home-Assistant-Log nach `HomeRoster` durchsuchen: eine WARNING-Zeile weist auf eine fehlende Datei hin, eine ERROR-Zeile (mit vollem Traceback) auf einen unerwarteten Fehler bei der Registrierung; in beiden Fällen laufen Backend/Sensoren/Kalender trotzdem normal weiter. Eine erfolgreiche Registrierung wird als INFO-Zeile mit der tatsächlich verwendeten URL geloggt. |
| Funktioniert auf einem Gerät/Browser, zeigt aber auf einem anderen „Custom element not found“ (z. B. auf einem Handy in der Begleit-App, während es am Desktop-Browser funktioniert) | Genau dieses Gerät hat eine alte Version der Frontend-Startseite zwischengespeichert – meist nach einem Umbenennen, Update oder einer Neuinstallation der Integration, da die ausgelieferte Skript-URL einen Inhalts-Hash enthält (und vor einer Umbenennung sogar einen ganz anderen Pfad), der sich jedes Mal ändert. Lösungen, von einfach nach zuverlässig: **(1)** Begleit-App vollständig schließen und neu öffnen (nicht nur in den Hintergrund legen). **(2)** In der App: Einstellungen → Begleit-App → Fehlerbehebung (Bezeichnung je nach App-Version unterschiedlich) → nach einer „Zurücksetzen“-/„Frontend neu laden“-Aktion suchen. **(3)** Zuverlässiger Fallback (Android): Telefon-Einstellungen → Apps → Home Assistant → Speicher → **Cache leeren** (nicht „Daten löschen“ – das würde dich ausloggen) – das leert nur zwischengespeicherte Web-Dateien. Danach das Dashboard neu öffnen. |
| Karte erscheint nicht im Karten-Picker | Ressource manuell hinzufügen (siehe [Einrichtung](#einrichtung)); danach Browser-Cache leeren/Dashboard neu laden. |
| Karte zeigt „HomeRoster wird noch geladen…“ | Integration ist noch nicht vollständig gestartet; kurz warten. Bleibt der Zustand bestehen, Home-Assistant-Log auf Fehler beim Setup von `homeroster` prüfen. |
| „Verbindung zu Home Assistant verloren“-Banner | Die Karte erkennt WebSocket-Verbindungsabbrüche automatisch und lädt Termine nach Wiederherstellung der Verbindung neu; keine Aktion nötig. |
| Speichern schlägt fehl / Konfliktmeldung | Ein anderes Gerät hat denselben Termin zwischenzeitlich geändert (optimistische Sperrung anhand einer Versionsnummer). Termin neu laden und Änderung erneut vornehmen. |
| „Diese Home-Assistant-Version ist älter als 2024.10.0“ im Log | Home Assistant aktualisieren; Backend/Sensoren funktionieren trotzdem, nur die automatische Karten-Registrierung entfällt. |
| Import schlägt fehl | Fehlerliste im Ergebnis der Import-Aktion prüfen – fehlerhafte Einzeleinträge werden benannt, der Rest wird trotzdem importiert. |

## Upgrade- und Migrationshinweise

Das Speicherformat ist versioniert (`STORAGE_VERSION_MAJOR` /
`STORAGE_VERSION_MINOR` in `const.py`). Zukünftige Datenmodelländerungen
werden über `HomeRosterStore._async_migrate_func`
(`storage.py`) migriert; ein Versionssprung auf eine **neuere** Major-
Version, als die installierte Integration kennt, wird kontrolliert
abgelehnt statt Daten stillschweigend zu beschädigen. Vor größeren
Updates empfiehlt sich wie immer ein reguläres Home-Assistant-Backup.

## Entwicklung

### Vor der Veröffentlichung

`custom_components/homeroster/manifest.json`s `codeowners`,
`documentation` und `issue_tracker` verweisen bereits auf das echte
Repository (`iiNoNoNoii/HomeRoster`). `.github/workflows/` führt bei jedem
Push und Pull Request die HACS-/hassfest-Validierung sowie die
Backend-Testsuite aus. Für ein offizielles Icon im HACS-Store wäre
zusätzlich ein Pull Request an
[home-assistant/brands](https://github.com/home-assistant/brands) nötig –
für die private Nutzung als benutzerdefiniertes HACS-Repository ist das
nicht erforderlich.

### Repository-Struktur

```text
homeroster/
├── custom_components/homeroster/   # Backend (Python)
│   ├── www/homeroster-card.js      # vorgebaute Karte (siehe unten)
│   └── ...
├── frontend/                           # Frontend-Quellcode (TypeScript/Lit)
├── tests/backend/                      # pytest (Backend)
├── frontend/tests/                     # vitest (Frontend)
├── docs/                               # Beispiel-Automationen/-Dashboards
├── hacs.json, LICENSE, pyproject.toml
```

**Abweichung von der ursprünglich skizzierten Struktur:** Die
Frontend-Tests liegen unter `frontend/tests/` statt in einem
sprachübergreifenden `tests/`-Ordner, weil Vitest/TypeScript-Tooling
(Konfiguration, `tsconfig.json`) sich auf das `frontend/`-Package bezieht;
Backend-Tests liegen weiterhin im Repository-Root unter `tests/backend/`,
wie es für pytest/Home-Assistant-Custom-Component-Tests üblich ist.

### Frontend bauen

```bash
cd frontend
npm install
npm run build      # -> frontend/dist/homeroster-card.js
```

Nach jeder Änderung muss die gebaute Datei zusätzlich nach
`custom_components/homeroster/www/homeroster-card.js` kopiert
werden (im Repository ist bereits ein aktueller Build enthalten):

```bash
cp frontend/dist/homeroster-card.js custom_components/homeroster/www/
```

`npm run watch` baut bei Änderungen automatisch neu (unminifiziert, mit
Sourcemap) für die lokale Entwicklung gegen eine laufende Home-Assistant-
Instanz.

### Frontend-Tests, Typcheck, Lint

```bash
cd frontend
npm run typecheck   # tsc --noEmit
npm test            # vitest (Lane-Berechnung, Validierung, Filter, Datum/DST)
npm run lint         # eslint
```

### Backend-Tests

```bash
python -m venv .venv
# Linux/macOS: source .venv/bin/activate   |   Windows: .venv\Scripts\activate
pip install pytest-homeassistant-custom-component python-dateutil tzdata
pytest tests/backend -q
```

(`tzdata` is only required on platforms without a system IANA timezone
database, e.g. Windows.)

Die Tests laufen mit [`pytest-homeassistant-custom-component`](https://github.com/MatthewFlamm/pytest-homeassistant-custom-component)
gegen einen echten (Test-)Home-Assistant-Kern und decken ab: Migration,
CRUD, Zeitzonen/DST, überlappende Termine, mehrere Personen pro Termin,
Neustart/Persistenz, Kalenderabfragen, Sensorzustände sowie Berechtigungen
und Validierung über die echte WebSocket-API (`hass_ws_client`).

> **Hinweis zur PyPI-Version von `pytest-homeassistant-custom-component`:**
> Das zum Entwicklungszeitpunkt auf PyPI verfügbare Release pinnt
> `homeassistant==2023.7.3` – älter als das für diese Integration
> dokumentierte `min_ha_version: 2024.10.0`. Der Code selbst nutzt
> durchgehend die für 2024.10+ dokumentierten, echten APIs; an drei Stellen
> (`ServiceValidationError`, `DeviceInfo`-Importpfad,
> `CalendarEvent.status`) gibt es einen minimalen, klar kommentierten
> Kompatibilitäts-Fallback, damit sich das Backend auch mit diesem älteren
> Testkern vollständig testen lässt, ohne das Verhalten auf unterstützten
> Home-Assistant-Versionen zu verändern. Wer gegen eine aktuellere
> `homeassistant`-Version testet (z. B. `pip install
> "git+https://github.com/MatthewFlamm/pytest-homeassistant-custom-component.git"`),
> bekommt exakt dieselben Testergebnisse.

Backend-Qualität: vollständige Typannotationen, `ruff` für Linting/
Formatierung (`ruff check custom_components/homeroster tests/backend`,
`ruff format ...`), ausschließlich asynchroner, nicht-blockierender Code
gemäß Home-Assistant-Konventionen.

## Abnahmekriterien (MVP)

- [x] Integration lässt sich über die Home-Assistant-Oberfläche einrichten.
- [x] Drei Familienpersonen lassen sich lokal anlegen.
- [x] Die Custom Card lässt sich einem Dashboard hinzufügen.
- [x] Ein Termin kann über die Plus-Schaltfläche erstellt werden.
- [x] Titel, Datum, Start, Ende und mehrere Personen werden gespeichert.
- [x] Der Termin bleibt nach einem Neustart erhalten (siehe Restart-Tests).
- [x] Der Termin erscheint in der Gesamtansicht.
- [x] Der Termin erscheint in den gefilterten Ansichten aller zugewiesenen
      Personen.
- [x] Zwei zeitlich überlappende Termine können gespeichert werden.
- [x] Überlappende Termine werden sichtbar nebeneinander dargestellt
      (Lane-Layout, mit Unit-Tests abgesichert).
- [x] Ein Termin lässt sich öffnen, bearbeiten und löschen.
- [x] Ganztägige und mehrtägige Termine funktionieren korrekt
      (DST-sicher, siehe Tests).
- [x] `calendar.homeroster` ist für Home-Assistant-Automationen
      nutzbar.
- [x] Der nächste Termin ist über eine Entity oder Action abrufbar.
- [x] Die heutigen Termine sind über eine Entity oder Action abrufbar.
- [x] Eine andere Dashboard-Karte kann den nächsten Termin anzeigen
      (siehe `docs/dashboards.yaml`).
- [x] Die Lösung benötigt im normalen Betrieb keine Internetverbindung.
- [x] Deutsche Übersetzungen sind vorhanden (Backend `strings.json`/
      `translations/de.json`, Frontend `utils/localize.ts`).
- [x] Dark Mode und mobile Darstellung sind nutzbar (HA-CSS-Variablen,
      responsives CSS, `prefers-reduced-motion`).
- [x] Backend- und zentrale Frontend-Tests laufen erfolgreich durch
      (102 Backend-Tests, 33 Frontend-Tests).

## Entwicklungsphasen

**Phase 1 (MVP) – vollständig umgesetzt:** lokale Speicherung,
Personenverwaltung, Termin-CRUD, mehrere Personen pro Termin, Tag-/Woche-/
Monat-/Agenda-Ansicht, Überlappungsdarstellung, Gesamt- und
Personenkalender, Heute-/Nächster-Termin-Hooks, deutsche/englische UI,
Tests und Dokumentation.

**Phase 2 (Komfort) – umgesetzt:** Kategorien, Erinnerungs-Offsets,
Duplizieren, Status, Suche, Personen-/Kategorienfilter, JSON-Import/-
Export, Zusatzkarten-Beispiele, visueller Karteneditor, feste
Kartensprache und Push-Benachrichtigungen über die Home-Assistant-App als
optionale Ergänzung zum Erinnerungs-Event. **Nicht umgesetzt:**
Drag-and-drop (siehe [Bekannte Einschränkungen](#bekannte-einschränkungen)).

**Phase 3 (erweitert) – teilweise umgesetzt:** einfache
Wiederholungsregeln (täglich/wöchentlich/monatlich/jährlich, Löschen
einzelner Instanzen) sind vorhanden; **nicht umgesetzt:** Bearbeiten
einzelner Serieninstanzen, ICS-Interoperabilität, feinere Berechtigungen
über Administrator/Nutzer hinaus, Sprachassistent-Integration, erweiterte
Kiosk-Funktionen über den bereits vorhandenen `read_only`-Modus hinaus.
Geburtstage sind über die Kategorie „Geburtstag“ und den dedizierten
`sensor.homeroster_next_birthday` bereits nutzbar.

## Lizenz

GNU Affero General Public License v3.0 (AGPL-3.0), siehe [LICENSE](LICENSE).
Wird eine modifizierte Version über ein Netzwerk (z. B. als Teil einer
Home-Assistant-Instanz) bereitgestellt, muss der Quellcode dieser
modifizierten Version den Nutzern zugänglich gemacht werden (siehe
Abschnitt 13 der Lizenz).

Fremdsoftware, die dieses Projekt nutzt (gebündelt oder als
Laufzeit-Abhängigkeit), ist mit ihrer jeweiligen Lizenz in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) aufgeführt.
