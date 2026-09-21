# Gruppkontrakt – JAL Book Club 📚

## Gruppmedlemmar

* Alexander Johansson
* Jennie
* Lottie

---

## Mål med projektet 🎯


---

## Våra viktigaste risker ⚠️

Vi vill framför allt undvika:

* 
* 
* 
* 
* 
* 

---

# Arbetssätt

Vi arbetar med ett enkelt agilt arbetssätt baserat på:

* GitHub Issues
* GitHub Project Board
* Feature branches
* Pull Requests
* Code review
* Daily standups
* Löpande dokumentation

---

## GitHub Project Board 🗂️

Vi använder följande statusar:

1. `Backlog`
2. `Ready`
3. `In Progress`
4. `Review`
5. `Done`

Varje arbetsuppgift ska i möjligaste mån representeras av en GitHub Issue.

Issues ska vara tillräckligt små för att kunna genomföras och granskas utan att innehålla ett helt ansvarsområde.

Exempel:

* Create Book model
* Add GET /api/books
* Add login endpoint
* Create review form
* Protect admin routes

---

## Uppgiftsfördelning 👩‍💻👨‍💻

Projektet består huvudsakligen av tre ansvarsområden:

### Ansvarsområde 1

Users och Authentication.

### Ansvarsområde 2

Books.

### Ansvarsområde 3

Reviews.

Huvudansvar för respektive område bestäms gemensamt.

Varje person äger sina huvudsakliga uppgifter, men gruppen hjälper varandra vid behov.

Gemensamma delar, exempelvis projektstruktur, authentication-flöde, gemensam styling eller tekniska beslut, kan arbetas med tillsammans.

---

## Daily standup ⏰

Vi genomför en kort daily varje vardag när projektarbete pågår.

**Tid:** Bestäms gemensamt.

Varje person svarar kort på:

1. Vad har jag gjort sedan sist?
2. Vad arbetar jag med nu?
3. Är jag blockerad eller behöver hjälp?

Daily dokumenteras i:

```text
/docs/dailys/
```

med en fil per datum:

```text
2026-09-08.md
2026-09-09.md
2026-09-10.md
```

---

## Möten 📅

Utöver daily bokar vi möten vid behov för:

* planering
* backlog refinement
* gemensamma tekniska beslut
* integration
* felsökning
* sluttest

Vi undviker möten som inte fyller ett tydligt syfte.

---

# Kommunikation ☎️

## Primär kanal

Vi använder:

* ??
* Teams vid behov av skärmdelning eller gemensam genomgång

## Tillgänglighet

Normal kommunikation sker främst under:

** på vardagar.**

Ingen förväntas vara konstant tillgänglig, men viktiga frågor ska besvaras inom rimlig tid.

## Förhinder

Om någon inte kan delta enligt plan meddelas gruppen så tidigt som möjligt.

Om någon blir blockerad tekniskt ska personen inte sitta fast ensam under lång tid utan att kommunicera detta till gruppen.

---

# Git och GitHub 🌳

## Main branch

Vi arbetar inte direkt på `main`.

`main` ska innehålla fungerande och granskad kod.

---

## Feature branches

Varje uppgift eller feature utvecklas på en separat branch.

Exempel:

```text
feature/user-login
feature/book-crud
feature/review-form
fix/book-validation
```

Branchens namn ska beskriva arbetet som utförs.

---

## Pull Requests

När en uppgift är klar:

1. Pushas branchen till GitHub.
2. En Pull Request skapas.
3. Eventuella problem åtgärdas.
4. Pull Request mergas till `main`.
5. GitHub Issuen flyttas till `Done`.

---

## Commit-meddelanden

Vi använder **Conventional Commits**.

Exempel:

```text
feat: add book model
feat: add login endpoint
fix: handle missing book id
docs: update project readme
refactor: simplify auth middleware
```

Commit-meddelanden ska beskriva vad förändringen gör.

---

# Definition of Done ✅

En Issue räknas som klar när:

* Funktionaliteten är implementerad
* Koden fungerar
* Relevanta fel hanteras
* Funktionaliteten är testad
* Koden är pushad till GitHub
* Pull Request är skapad
* En annan gruppmedlem har granskat eller testat förändringen
* Pull Request är mergad
* Issuen är flyttad till `Done`

---

# Kodstandard 💻

## Språk

Kod, variabelnamn, filnamn och GitHub Issues skrivs huvudsakligen på engelska.

Dokumentation och gruppkommunikation skrivs på **Språk**

## Namngivning

Vi följer projektets befintliga kodstandard och lärarens starter-template.

Generellt:

* `camelCase` för variabler och funktioner
* `PascalCase` för modeller, typer och klasser där det är relevant
* tydliga och beskrivande namn

## Formatter / linting

Vi använder samma formattering och konfiguration för hela projektet.

---

# Gemensamma tekniska beslut 🧩

Förändringar som påverkar hela projektet diskuteras med gruppen innan implementation.

Exempel:

* 
* 
* 

Mindre implementationer inom ett eget ansvarsområde behöver inte diskuteras i förväg.

---

# Hjälp och code review 🤝

Vi förväntas kunna hjälpa varandra även om varje person har ett eget huvudsakligt ansvarsområde.

Vid problem kan vi:

* 
* 
* 

Att hjälpa någon annan innebär inte att man tar över personens ansvarsområde.

Det ska fortfarande framgå i GitHub vem som huvudsakligen har arbetat med respektive del.

---

# Dokumentation 📝

Vi dokumenterar arbetet löpande.

Struktur:

```text
docs/
├── dailys/
│   ├── 2026-09-08.md
│   ├── 2026-09-09.md
│   └── ...
└── gruppkontrakt.md
```

Varje gruppmedlem ansvarar för att den egna insatsen framgår i dokumentationen.

Vi försöker undvika att skriva hela projektets dagbok i efterhand.

---

# Tidsplan ⏳

Officiell deadline:

**18 september 2026 kl. 23:59**

Gruppredovisning:

**18 september 2026 kl. 08:00–10:30**

Vår interna målsättning är att ha en fungerande version färdig senast:

** DATUM **

Den sista tiden används främst till:

*
* 
* 

---

# Om samarbetet inte fungerar

Om någon inte kan genomföra sitt arbete enligt plan ska detta kommuniceras till gruppen så tidigt som möjligt.

Gruppen försöker först lösa situationen tillsammans genom:

1. 
2. 
3. 

Om en gruppmedlem upprepade gånger inte deltar, inte går att nå eller inte utför överenskomna uppgifter tar gruppen kontakt med läraren.

---

# Förväntningar på varandra

Vi förväntar oss att varje gruppmedlem:

---

# Individuella styrkor och utvecklingsområden

Detta fyller vi i tillsammans vid projektstart.

## Alex

**Styrkor:**

* Struktur
* Planering
* Sätta sig in i problem
* Samarbete

**Vill utveckla:**

* API-utveckling
* Authentication och säkerhet

## Jennie

**Styrkor:**

*

**Vill utveckla:**

*

## Lottie

**Styrkor:**

*

**Vill utveckla:**

*

---

# Underskrifter ✍️

Genom att lägga till vårt namn nedan bekräftar vi att vi gemensamt har gått igenom gruppkontraktet.

* [Alexander Johansson](https://github.com/AlexJCodes)
* Jennie
* Lottie
