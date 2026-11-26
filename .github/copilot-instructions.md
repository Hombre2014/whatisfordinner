---
applyTo: '**'
---

# whatisfordinner — Copilot Instructions

The full, authoritative project rules are in [AGENTS.md](../AGENTS.md). Read it first; this file only summarises the essentials.

**Project:** personal recipe app (recipe library, kitchen/fridge/pantry, "What can I have for dinner?"), English (US) + Bulgarian. Free services only.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · pnpm · Vitest + React Testing Library · shadcn/ui, Clerk, Neon Postgres, next-intl (planned, not yet installed).

## Essentials

- Next.js 16 differs from older versions: read `node_modules/next/dist/docs/` before writing Next.js code. `params`/`searchParams` are Promises; `middleware` is now `proxy.ts`.
- Server Components by default; `'use client'` only when needed. External API calls and secrets stay on the server.
- No `any`. Validate all external input with Zod.
- Check auth **and ownership** in every user-facing Server Action / Route Handler. Webhooks have no session: verify the signature before processing.
- Tailwind only; shadcn/ui components live in `components/ui/` (generated, do not add custom ones there).
- Tests with every change (Vitest, ≥ 80% coverage). Query by role/label.
- Conventional Commits; never bypass Husky hooks; never commit secret-bearing `.env*` files (`.env.example` with placeholders is committed).
- When the version in `docs/CHANGELOG.md` changes, update `package.json` `version` too.
- Design first: do not create unrequested features or files.

## More detail

- Agents: [.github/agents/](agents/)
- Scoped instructions: [.github/instructions/](instructions/)
- Skills: [.github/skills/](skills/)
- Docs: [docs/](../docs/)
