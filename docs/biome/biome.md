Biome-kommandon vi kan använda i projektet:


# Kontrollera hela projektet
npx biome check .

# Kontrollera en specifik fil
npx biome check src/models/Review.ts

# Kontrollera och fixa automatiskt där det går
npx biome check --write .

# Kontrollera och fixa en specifik fil
npx biome check --write src/models/Review.ts

# Bara formattera hela projektet
npx biome format --write .

# Bara formattera en specifik fil
npx biome format --write src/models/Review.ts

# Bara lint-kontroll
npx biome lint .

# Bara lint-kontroll på en specifik fil
npx biome lint src/models/Review.ts


Bra rutin innan commit:

```bash
npx biome check --write .
npm run build
```

Om båda går igenom utan fel är koden formatterad, lintad och TypeScript-builden fungerar.

Biome läser reglerna från vår gemensamma `biome.json`, så alla i gruppen får samma formattering och kodstandard.
