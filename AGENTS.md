<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## whatisfordinner — Agent Instructions

Personal recipe app for friends and family: a recipe library (own, imported from URLs, found via APIs), per-user kitchen (equipment, fridge, pantry), and a "What can I have for dinner?" search. UI in English (US) and Bulgarian (BG). **All services must be free or have a good free tier. No paid services.**

Plan and design: [docs/Development_plan.md](docs/Development_plan.md) · How it works: [docs/Technical_documentation.md](docs/Technical_documentation.md) · Ideas: [docs/Roadmap.md](docs/Roadmap.md) · History: [docs/CHANGELOG.md](docs/CHANGELOG.md)

## Working agreement

- **Design first.** Discuss and agree on a design before building. Do not create features, files or projects the user has not asked for.
- Before multi-file changes, give a short step-by-step overview. When asked to fix code, explain the problem first. When asked for tests, say what will be tested first.
- Do not commit, push or open PRs unless asked.
- **Changelog upkeep:** whenever you create, update or delete files in a way that matters (features, fixes, config, dependencies, docs, agent rules), add an entry to `docs/CHANGELOG.md` in the same change; skip trivial edits (typos, formatting only). Sub-headings must be unique per version: `### Added in 0.0.2`, never a bare `### Added`; use `### Added in Unreleased` for unreleased work.
- **Docs stay in sync with the code:** everything built must be documented, and when documented behavior changes, update `docs/Technical_documentation.md` (and `docs/Development_plan.md` if scope or milestones change) in the same change. Mark items Planned, Implemented or Open accurately.
- **Versioning:** whenever a version is added to `docs/CHANGELOG.md`, update `version` in `package.json` to the same value, and add the matching compare/release link at the bottom of the changelog.

## Stack

| Area               | Choice                                                                    | Status    |
| ------------------ | ------------------------------------------------------------------------- | --------- |
| Framework          | Next.js 16 (App Router), React 19, TypeScript (strict)                    | installed |
| Styling            | Tailwind CSS v4                                                           | installed |
| Package manager    | pnpm                                                                      | installed |
| Tests              | Vitest + React Testing Library + jest-dom + user-event                    | installed |
| Git hooks          | Husky + lint-staged + commitlint (Conventional Commits)                   | installed |
| Lint / format      | ESLint (`eslint-config-next`), Prettier                                   | installed |
| UI library         | shadcn/ui (+ blocks borrowed from third-party shadcn libraries if needed) | planned   |
| Auth               | Clerk (email/password, magic link or code, social)                        | planned   |
| Database           | Postgres on Neon + Drizzle ORM (WebSocket `Pool` driver for transactions) | planned   |
| i18n               | `next-intl`, locales `en-US` and `bg`                                     | planned   |
| Images             | Cloudinary free plan                                                      | planned   |
| Recipe translation | Machine translation (Azure Translator first), cached in DB                | planned   |
| Forms / validation | React Hook Form + Zod                                                     | planned   |
| Hosting            | Vercel (Hobby, non-commercial)                                            | planned   |

"Planned" packages are **not installed**. Check `package.json` before importing anything; never assume a package, component or file exists.

## Layout

Files live at the repo root (no `src/` folder); the `@/*` alias points to the root.

```text
app/                 # routes, layouts, route handlers (App Router)
components/
  ui/                # shadcn/ui ONLY (generated; do not add custom components)
  <feature>/         # custom components, grouped by feature (recipes, pantry, ...)
hooks/               # custom hooks (useXxx.ts)
lib/                 # utilities, server helpers, API clients
__tests__/           # cross-cutting / page tests (unit tests are co-located)
docs/                # project documentation
.github/             # agents, instructions, skills (see below)
```

## Next.js 16 rules (verify in `node_modules/next/dist/docs/`)

- Components are **Server Components by default**. Add `'use client'` only for state, effects, event handlers or browser APIs, and push it as far down the tree as possible.
- `params` and `searchParams` are **Promises**; `await` them.
- The `middleware` file is deprecated and renamed **`proxy.ts`** (project root, next to `app/`).
- Fetch external data and call external APIs **only on the server** (Server Components, Route Handlers, Server Actions). API keys never reach the browser.
- Use `next/image` for images and `next/link` for navigation.
- Async Server Components cannot be unit tested with Vitest; test them with E2E (later) and keep logic in plain functions that can be unit tested.

## Conventions

| Element                    | Convention                 | Example                     |
| -------------------------- | -------------------------- | --------------------------- |
| Component files            | PascalCase                 | `RecipeCard.tsx`            |
| Hook files                 | camelCase, `use` prefix    | `usePantry.ts`              |
| Other files                | kebab-case                 | `parse-ingredient.ts`       |
| Route folders              | kebab-case                 | `app/recipes/[id]/page.tsx` |
| Constants                  | UPPER_SNAKE_CASE           | `MAX_PREP_MINUTES`          |
| Types / interfaces / enums | PascalCase                 | `RecipeSummary`             |
| Env vars                   | document in `.env.example` | `CLERK_SECRET_KEY`          |

- **Language: American English (en-US) everywhere** — code, comments, docs, commit messages, UI source strings. Write `color`, `organize`, `authorize`, `behavior`, `canceled`, not the British spellings.
- Named exports for components, hooks and utilities. Default exports only where Next requires them (`page`, `layout`, `route`, ...).
- Tailwind only (no CSS modules, inline styles or styled-components). Use `cn()` for conditional classes and CVA for component variants.
- Only export what other files use. Do not add to the global namespace.
- JSDoc comments on exported functions, types and non-obvious logic; comment the _why_, not the _what_.
- Small components, one responsibility. DRY, but do not abstract before the third use.
- Formatting is enforced by Prettier (single quotes, 2 spaces, semicolons, 80 columns); do not hand-format.

### TypeScript

- `strict` is on. No `any` and no `as any`; use specific types or `unknown` and narrow.
- `const` by default; `let` only when reassigned. Prefer arrow functions, `async/await`, and `??` over `||` for defaults.
- Validate every external input (forms, route handlers, Server Actions, third-party API responses, imported recipe JSON-LD) with **Zod** before use. Infer types from schemas.
- Use `schema-dts` types for schema.org `Recipe` data (when installed).

### React

- Functional components and hooks only; follow the Rules of Hooks.
- Prefer deriving values during render to `useEffect`. Use `useMemo`/`useCallback` only when profiling or referential equality requires it.
- Accessibility is required: semantic HTML, labels, keyboard support, alt text, sufficient contrast (WCAG 2.1 AA).
- Never hardcode user-facing strings once i18n is installed; use translation keys for both `en-US` and `bg`.

## Testing (required)

- **Every feature and bug fix ships with tests.** Target **≥ 80%** coverage (statements, branches, functions, lines) — enforced by `pnpm test:coverage`.
- Co-locate unit tests: `Foo.tsx` → `Foo.test.tsx`. Cross-cutting and page tests go in `__tests__/`.
- Query by role/label/text (`getByRole`, `getByLabelText`), not by CSS class. Use `userEvent`, not `fireEvent`. Use `findBy*`/`waitFor` for async.
- Use `vi.fn()`, `vi.mock()` (Vitest, **not Jest**). Mock external services (Clerk, DB, third-party APIs); never hit the network in tests.
- Tests must be independent and deterministic.
- Details: [.github/skills/testing/SKILL.md](.github/skills/testing/SKILL.md).

## Git

- Conventional Commits, enforced by commitlint on `commit-msg`: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`. Lower-case subject, no trailing period, header ≤ 100 characters.
- Atomic commits, one concern each. Branch names are descriptive kebab-case (e.g. `setup-and-documentation`).
- `pre-commit` runs lint-staged (ESLint + Prettier on staged files). Never bypass hooks with `--no-verify`; fix the cause.
- Never commit secret-bearing env files (`.env`, `.env.local`, `.env.production`, ...) or secrets. **Do** commit `.env.example` (placeholder values only) whenever you add an environment variable.

## Security red lines

**Never:** commit secrets; trust client input without Zod validation; use `dangerouslySetInnerHTML` without sanitizing (imported recipe HTML is untrusted); expose server env vars to the client (only `NEXT_PUBLIC_*` is public); log tokens, passwords or personal data; fetch arbitrary user-supplied URLs without SSRF protection (block private/loopback IPs, limit size and time, only http/https).

**Always:** check authentication **and ownership** in every user-facing Server Action and Route Handler (a user may only read and write their own recipes, kitchen and pantry; recipes shared with them are **read-only**, and edits create the recipient's own copy); webhook handlers have no user session, so verify the provider's signature before processing instead; scope every DB query by the current user; respect API rate limits and terms (Spoonacular, Edamam); run `pnpm audit` before releases.

More: [.github/instructions/security.instructions.md](.github/instructions/security.instructions.md).

## Commands

| Command                             | Purpose                      |
| ----------------------------------- | ---------------------------- |
| `pnpm dev`                          | dev server                   |
| `pnpm build` / `pnpm start`         | production build / serve     |
| `pnpm lint` / `pnpm lint:fix`       | ESLint                       |
| `pnpm format` / `pnpm format:check` | Prettier                     |
| `pnpm typecheck`                    | `tsc --noEmit`               |
| `pnpm test`                         | Vitest watch                 |
| `pnpm test:run`                     | Vitest single run (CI)       |
| `pnpm test:coverage`                | coverage with 80% thresholds |

Before finishing a change: `pnpm typecheck && pnpm lint && pnpm test:run` must pass.

## Anti-hallucination

1. Search the repo before suggesting a pattern; read the file before editing it.
2. Confirm a dependency is in `package.json` before importing it.
3. For Next.js APIs, read `node_modules/next/dist/docs/` — do not rely on memory.
4. For third-party APIs (Spoonacular, Edamam, TheMealDB, Clerk, Cloudinary, Azure), check the current official docs; free-tier limits change.
5. Do not invent DB columns or API fields; read the schema or the API docs.

## Agents, instructions and skills

- **Agents** (`.github/agents/`): `frontend`, `backend`, `tests`, `security`, `documents`, `git-operator`.
- **Instructions** (`.github/instructions/`, scoped by file glob): components, routes, database, i18n, security.
- **Skills** (`.github/skills/`): `component-creation`, `testing`.
- Also surfaced to GitHub Copilot via [.github/copilot-instructions.md](.github/copilot-instructions.md).
- Add instructions/skills for a technology (database, auth, i18n) **when that technology is installed**, not before.
