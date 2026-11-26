---
applyTo: 'lib/db/**,drizzle/**,prisma/**,**/*schema*.ts'
---

# Database Instructions

> **Status:** Postgres on Neon is chosen. The ORM (Drizzle or Prisma) is **not decided yet** — until `package.json` contains one, do not write ORM code. Update this file when it is chosen.

## Design decisions (from the project plan)

- Recipes are stored as **schema.org `Recipe`** JSON-LD (`data jsonb`) plus extracted columns for lists/filters (`name`, `source_url`, `origin`, `favorite`, `image`, timestamps, prep/cook/total minutes).
- **Parsed ingredients** live in a separate table (`recipe_ingredients`: original text, canonical ingredient, quantity, unit). Pantry matching uses the canonical ingredient, never free text.
- A **canonical `ingredients` dictionary** with names per locale (`en`, `bg`) makes matching language-independent.
- Per-user data: users (mirror of Clerk id), profile (all fields optional), kitchen equipment, fridge items, pantry items, recipes, friendships (pending/accepted/rejected), shares.
- **Sharing = copy on edit.** A share stores a snapshot of the recipe at share time; the recipient's save/edit creates their own recipe with `derived_from` pointing at the original. The original is never modified by recipients.
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
