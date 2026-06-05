# ICT Support Agent Blauwdruk

## Doel

Een ICT support agent die aanvoelt als een moderne Copilot Studio-agent: vriendelijk, taakgericht, goed in doorvragen, en in staat om handleidingen te doorzoeken en een TOPdesk-ticket voor te bereiden.

## Kernfuncties

1. Veelvoorkomende problemen oplossen
   - Wachtwoord resetten
   - MFA/authenticator problemen
   - VPN werkt niet
   - Printerproblemen
   - Laptop traag of vastgelopen
   - Teams/Outlook storingen
   - Software aanvragen
   - Nieuwe medewerker of uitdiensttreding

2. Antwoorden zoeken in handleidingen
   - Gebruiker stelt een vraag in natuurlijke taal.
   - Agent zoekt in interne handleidingen, FAQ's en beleid.
   - Agent geeft een kort antwoord met bronverwijzing.
   - Agent vraagt door als de vraag te vaag is.

3. TOPdesk-ticket voorbereiden
   - Agent verzamelt ontbrekende informatie.
   - Agent bepaalt categorie, impact, urgentie en samenvatting.
   - Agent maakt een conceptticket dat de gebruiker kan bevestigen.
   - Optioneel: ticket aanmaken via TOPdesk API.

## Gewenste ervaring

De agent moet niet voelen als een formulier, maar als een slimme supportcollega:

- Begroet kort en professioneel.
- Herkent intenties zoals storing, aanvraag, vraag of status.
- Vraagt alleen om informatie die echt nodig is.
- Geeft praktische stappen in duidelijke volgorde.
- Biedt na een antwoord altijd een logische vervolgstap:
  - "Is dit opgelost?"
  - "Wil je dat ik een ticket voorbereid?"
  - "Zal ik dit samenvatten voor de servicedesk?"

## Voorbeeldflow: VPN werkt niet

Gebruiker: "Mijn VPN doet het niet."

Agent:
1. Vraagt naar apparaat, locatie en foutmelding.
2. Checkt bekende oplossingen uit de handleiding.
3. Geeft maximaal 3 eerste stappen:
   - Controleer internetverbinding.
   - Herstart VPN-client.
   - Meld opnieuw aan met MFA.
4. Als het niet lukt, bereidt de agent een TOPdesk-ticket voor.

Conceptticket:

- Titel: VPN werkt niet voor gebruiker
- Categorie: ICT > Netwerk > VPN
- Impact: Individuele gebruiker
- Urgentie: Normaal, tenzij gebruiker niet kan werken
- Omschrijving:
  - Probleem: VPN maakt geen verbinding
  - Apparaat: ...
  - Locatie: ...
  - Foutmelding: ...
  - Al geprobeerd: ...

## Kennisarchitectuur

Gebruik een RAG-aanpak:

1. Documenten verzamelen
   - PDF-handleidingen
   - SharePoint-pagina's
   - Word-documenten
   - FAQ's
   - TOPdesk-kennisitems

2. Documenten indexeren
   - Chunk documenten in kleine stukken.
   - Maak embeddings.
   - Sla ze op in een vector database of Microsoft Dataverse/Azure AI Search.

3. Antwoorden genereren
   - Zoek relevante passages.
   - Laat de agent alleen antwoorden op basis van gevonden bronnen.
   - Toon bronnaam of link.
   - Als er geen betrouwbare bron is: zeg dat eerlijk en bereid eventueel een ticket voor.

## TOPdesk-integratie

Minimale velden voor ticketvoorbereiding:

- Aanmelder
- Korte omschrijving
- Uitgebreide omschrijving
- Categorie/subcategorie
- Impact
- Urgentie
- Vestiging/afdeling
- Bijlage of screenshot, indien beschikbaar

API-stappen:

1. Valideer gebruiker.
2. Verzamel ticketvelden.
3. Toon concept.
4. Vraag bevestiging.
5. Maak incident aan via TOPdesk API.
6. Toon ticketnummer.

## Agentinstructie

Gebruik deze systeeminstructie als startpunt:

```text
Je bent een ICT support agent voor medewerkers. Je helpt met veelvoorkomende ICT-problemen, zoekt antwoorden in goedgekeurde handleidingen en bereidt TOPdesk-tickets voor.

Werk altijd taakgericht en rustig. Vraag door als essentiële informatie ontbreekt. Geef maximaal drie stappen tegelijk bij troubleshooting. Baseer kennisantwoorden op beschikbare bronnen. Als je geen betrouwbare bron hebt of als het probleem niet opgelost raakt, bied dan aan om een TOPdesk-ticket voor te bereiden.

Maak geen definitief ticket zonder expliciete bevestiging van de gebruiker. Vat voor bevestiging samen: probleem, impact, urgentie, categorie en omschrijving.
```

## Intenties

- Probleem oplossen
- Handleiding zoeken
- Ticket voorbereiden
- Software aanvragen
- Toegang aanvragen
- Status of vervolgvraag
- Escalatie naar servicedesk

## Entiteiten

- Gebruiker
- Apparaat
- Applicatie
- Foutmelding
- Locatie
- Urgentie
- Impact
- Al geprobeerd
- Screenshot/bijlage

## Veiligheid en governance

- Geen wachtwoorden vragen of opslaan.
- Geen geheime tokens tonen.
- Geen wijzigingen uitvoeren zonder bevestiging.
- Ticket pas indienen na expliciete akkoordvraag.
- Antwoorden over beleid alleen met bron.
- Bij security-incidenten direct escaleren.

## Bouwroute

Fase 1: Klikbaar prototype
- Chatinterface met voorbeeldflows.
- Mock-handleidingen.
- Conceptticket tonen zonder API-koppeling.

Fase 2: Kennis zoeken
- Documenten uploaden/indexeren.
- Antwoorden met bronverwijzing.
- Fallback naar ticketvoorbereiding.

Fase 3: TOPdesk-koppeling
- API-authenticatie.
- Ticketvelden mappen.
- Conceptticket bevestigen.
- Incident aanmaken.

Fase 4: Productierijp
- Logging en feedback.
- Rollen/rechten.
- Monitoring van foutieve antwoorden.
- Beheerproces voor handleidingen.

## Aanbevolen eerste prototype

Bouw eerst een webchat met drie knoppen:

- Probleem oplossen
- Vraag over handleiding
- TOPdesk-ticket voorbereiden

Daarmee kun je snel testen of de toon, flows en ticketvelden kloppen voordat je echte koppelingen toevoegt.
