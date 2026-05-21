# Projekt: Friseursalon Schnittpunkt — Website

## Salon-Daten
| Feld | Wert |
|---|---|
| Name | Friseursalon Schnittpunkt |
| Inhaberin | Michaela Köppl |
| Adresse | Viechtacherstr. 1, 94262 Kollnburg |
| Telefon | 09942-801584 |
| Facebook | https://www.facebook.com/profile.php?id=100054458979662 |
| GitHub | https://github.com/smeurer-ai/Friseur_Schnittpunkt |

## Design
- **Hintergrund:** `#0a0a0a` (Schwarz)
- **Akzent Pink:** `#e91e8c`
- **Akzent Blau:** `#1e90e9`
- **Flächen:** `#1a1a1a`
- **Schriften:** Montserrat (Überschriften) + Inter (Text) — lokal via WOFF2, DSGVO-konform
- **Stil:** Modern, minimalistisch, Mobile First

## Technologie
- Reines HTML5 / CSS3 / Vanilla JS — kein Framework, kein CMS
- Karte: OpenStreetMap + Leaflet.js (lokal unter `/leaflet/`, DSGVO-konform)
- Schriften: lokal unter `/fonts/` (4× WOFF2)
- Hosting: statischer Hoster (GitHub Pages, Netlify, IONOS)

## Dateistruktur
```
index.html          — One-Pager (8 Sektionen)
styles.css          — Stylesheet (Mobile First, CSS-Variablen)
main.js             — JS: Hamburger, Tabs, Lightbox, Leaflet, Scroll-Animationen
buchen.html         — Buchungsseite (iframe-Platzhalter)
impressum.html      — Impressum (TMG)
datenschutz.html    — Datenschutzerklärung (DSGVO)
fonts/              — Montserrat + Inter als WOFF2
leaflet/            — Leaflet 1.9.4 vollständig lokal
images/
  galerie/          — Galeriefotos (noch leer, Platzhalter im HTML)
  hochzeit/         — Hochzeitsfotos (noch leer, Platzhalter im HTML)
```

## Sektionen (index.html)
1. **Navigation** — sticky, Hamburger-Menü für Mobile
2. **Hero** — „Ihr Stil. Unser Handwerk.", 2 CTA-Buttons
3. **Leistungen** — 3 Karten mit SVG-Icons: Schere (Damen), Bartkamm (Herren), Ball (Kinder)
4. **Hochzeit & Anlässe** — Foto-Grid, Button „Hochzeitstermin anfragen"
5. **Über uns** — Michaela Köppl, Team, Weiterbildungshinweis (Barber-Kurs bei Hasan)
6. **Galerie** — „Unsere Arbeiten", 12-Bild-Grid mit Lightbox
7. **Preise** — Tabs (Damen / Herren / Kinder / Hochzeit), alle Preise noch Platzhalter
8. **Öffnungszeiten** — Karte mit Platzhalter-Uhrzeiten
9. **Kontakt** — Telefon, Adresse, OpenStreetMap-Karte, Footer

## Noch fehlende Inhalte (von Inhaberin)
| Was | Platzhalter |
|---|---|
| Öffnungszeiten | `[UHRZEIT]` in Öffnungszeiten-Sektion |
| Preisliste Damen | `[PREIS]` in Preistabelle |
| Preisliste Herren | `[PREIS]` in Preistabelle |
| Preisliste Kinder | `[PREIS]` in Preistabelle |
| Preisliste Hochzeit & Anlässe | `[PREIS]` in Preistabelle |
| E-Mail-Adresse | `[EMAIL@BEISPIEL.DE]` im Kontaktbereich |
| Hero-Bild | `[FOTO_HERO.jpg]` |
| Portrait Michaela Köppl | `[FOTO_INHABERIN.jpg]` |
| Teamfoto | `[FOTO_TEAM.jpg]` |
| Hochzeits-Hauptbild | `[FOTO_HOCHZEIT_HAUPT.jpg]` |
| Hochzeitsfotos (6 Stück) | `images/hochzeit/` — noch leer |
| Galeriefotos (12 Stück) | `images/galerie/` — noch leer |
| Gründungsjahr | `[JAHR]` im Über-uns-Text |
| Online-Buchungstool | iframe in `buchen.html` (Empfehlung: Timify) |
| Impressum (vollständig) | Handwerkskammer-Nr., USt-IdNr. fehlen |

## Wichtige Hinweise
- **DSGVO:** Keine externen CDNs — alle Schriften und Leaflet lokal gehostet
- **Hasan:** Externer Barber-Trainer (Fortbildungskurs), kein Mitarbeiter
- **Buchung:** Nur nach Terminvereinbarung (kein Walk-in)
- **Bilder:** Können von der Facebook-Seite entnommen werden (mit Genehmigung der Inhaberin)
