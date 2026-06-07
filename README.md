# ICT Support Agent Prototype

Dit is een statisch prototype van een ICT support agent. De app helpt gebruikers met veelvoorkomende ICT-problemen, toont oplossingen uit mock-handleidingen en maakt een TOPdesk-conceptticket.

## Bestanden

- `index.html` opent automatisch de nieuwste versie.
- `ict-support-agent-v9.html` is de huidige applicatie.
- `ict-support-agent-v9.css` bevat de Teams/Fluent-styling.
- `ict-support-agent-v9.js` bevat de chatlogica, hoofdmenu/submenu, mock-handleidingen, generieke intake, checklist, prioriteitenmatrix, ticketopbouw, interne JSON-generatie en ticketweergave voor ICT-medewerkers.
- `ict-support-agent-v1.*` en `ict-support-agent-v2.*` zijn oudere prototypeversies.
- `ict-support-agent-blauwdruk.md` bevat de functionele blauwdruk.

## Lokaal starten

Open `index.html` of `ict-support-agent-v9.html` direct in een browser. Er is geen server, installatie of buildstap nodig.

## GitHub Pages publicatie

Deze applicatie is geschikt voor GitHub Pages omdat:

- alle bestanden statisch zijn;
- er geen backend nodig is;
- alle verwijzingen relatief zijn;
- er geen externe afhankelijkheden of API-sleutels zijn.

## Publiceren via GitHub Pages

1. Maak een nieuwe GitHub-repository aan.
2. Upload alle bestanden uit deze map naar de root van de repository.
3. Ga in GitHub naar `Settings`.
4. Open `Pages`.
5. Kies bij `Source` de optie `Deploy from a branch`.
6. Kies branch `main`.
7. Kies folder `/root`.
8. Klik op `Save`.
9. Wacht tot GitHub Pages een publieke URL toont.
10. Open de URL om het prototype te testen.

De URL heeft meestal deze vorm:

```text
https://gebruikersnaam.github.io/repositorynaam/
```

## Let op

Dit prototype maakt geen echte TOPdesk-tickets aan. Het toont alleen een conceptticket op basis van de ingevulde gegevens.
