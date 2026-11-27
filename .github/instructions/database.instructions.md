---
applyTo: 'lib/db/**,drizzle/**,prisma/**,**/*schema*.ts'
---

# Database Instructions

> **Status:** Decided — **Postgres on Neon with Drizzle ORM** (`drizzle-orm` + `drizzle-kit`). Neither is installed yet: until `package.json` contains them, do not write ORM code. Read the current Drizzle and Neon docs before wiring the connection.

## Connection and tooling

- Use Neon's **WebSocket `Pool` driver** (`@neondatabase/serverless`) so interactive transactions work. The Neon **HTTP driver does not support interactive transactions**; use it only for single-statement reads where that is acceptable.
- Use Neon's pooled connection string in `DATABASE_URL` (server only); put a direct, non-pooled URL in a separate variable for migrations if Neon's docs require it.
- Define tables in TypeScript (`lib/db/schema.ts`); type the recipe column with `schema-dts` via `.$type<Recipe>()`; derive Zod schemas with `drizzle-zod` where useful.
- Generate migrations with `drizzle-kit generate` and commit them. Inspect data with `drizzle-kit studio` (Drizzle Studio) in development.
- Neon branches can be used to test migrations without touching real data.

## Design decisions (from the project plan)

- Recipes are stored as **schema.org `Recipe`** JSON-LD (`data jsonb`) plus extracted columns for lists/filters (`name`, `source_url`, `origin`, `favorite`, `image`, timestamps, prep/cook/total minutes).
- **Parsed ingredients** live in a separate table (`recipe_ingredients`: original text, canonical ingredient, quantity, unit). Pantry matching uses the canonical ingredient, never free text.
- A **canonical `ingredients` dictionary** with names per locale (`en`, `bg`) makes matching language-independent.
- Per-user data: users (mirror of Clerk id), profile (all fields optional), kitchen equipment, fridge items, pantry items, recipes, friendships (pending/accepted/rejected), shares.
- **Sharing = copy on edit.** A share stores a snapshot of the recipe at share time; the recipient's save/edit creates their own recipe, and the link back (`derived_from_recipe_id`, `derived_from_share_id`) is stored **on that copy**, never on the share record. `recipe_shares.recipe_id` is nullable (`ON DELETE SET NULL`) so a share and its snapshot outlive the original. The original and the share record are never modified by recipients.
- **Translations** are stored per recipe and language (`recipe_translations`), generated on demand and cached; the original is never overwritten.
- Nutrition is stored in the schema.org `nutrition` field.

## Rules

- All schema changes go through migrations committed to git; never edit the database by hand.
- Every user-owned table has a `user_id` (FK, indexed); every query filters by it.
- Use transactions for multi-step writes (save recipe + ingredients, accept friendship).
- Use `timestamptz` for timestamps; `created_at`/`updated_at` on every table.
- Keep the Neon connection string in `DATABASE_URL` (server only); use the pooled connection for serverless.
- Mind the free tier (storage and compute limits): no unbounded tables, paginate lists, avoid storing large blobs (images go to Cloudinary).
- Tests mock the data layer or use a throwaway database; never run tests against real user data.
