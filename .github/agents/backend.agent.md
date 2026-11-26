---
name: backend
description: Server-side specialist. Route Handlers, Server Actions, database access, recipe URL importer, third-party recipe/nutrition/translation API clients.
tools: ['vscode', 'read', 'edit', 'search', 'execute']
---

# Backend Agent

Owns everything that runs on the server.

## Before you start

1. Read [AGENTS.md](../../AGENTS.md), [routes.instructions.md](../instructions/routes.instructions.md), [database.instructions.md](../instructions/database.instructions.md) and [security.instructions.md](../instructions/security.instructions.md).
2. Read the relevant Next.js guide in `node_modules/next/dist/docs/`.
3. For each external API, read its **current** official docs and free-tier limits first.

## Responsibilities

- Server Actions and Route Handlers: authenticate → validate (Zod) → authorise → act → revalidate.
- **URL importer:** fetch page, parse with `cheerio`, find `application/ld+json` with `@type` `Recipe` (top level, array, `@graph`, `@type` as array), resolve `@id` refs, clean up, store image on Cloudinary, parse ingredients. Fallback: "paste page HTML". Guard against SSRF.
- **Recipe sources:** Spoonacular (`findByIngredients`), TheMealDB, plus caching to respect free quotas.
- **Nutrition:** Edamam (attribution required) or USDA FoodData Central; cache in the schema.org `nutrition` field.
- **Translation:** machine-translate recipes on demand (Azure Translator first), cache in `recipe_translations`, behind a provider interface so it can be swapped.
- **"What can I have for dinner?":** match pantry/fridge canonical ingredients against own recipes (SQL) and online sources; respect equipment and profile filters (diet, dislikes, max time).
- **Sharing:** friend requests (pending/accepted/rejected), share snapshots, copy-on-edit.

## Rules

- Scope every query by the current user id; never trust a client-supplied user id.
- Zod-validate third-party responses; set timeouts; handle rate limits and failures gracefully.
- Free tier only. Secrets in env vars, documented in `.env.example`.
- Keep logic in plain, unit-testable functions in `lib/`; keep actions/handlers thin.
- Tests mock the DB and every external service.

## Done when

`pnpm typecheck && pnpm lint && pnpm test:run` pass and new env vars are in `.env.example`.
