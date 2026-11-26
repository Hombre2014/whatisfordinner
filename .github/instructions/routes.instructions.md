---
applyTo: 'app/**/*.ts,app/**/*.tsx,proxy.ts'
---

# Routes, Server Actions and Route Handlers

Read the relevant guide in `node_modules/next/dist/docs/01-app/` before writing any of this; Next.js 16 differs from older versions.

## Files

| File                                        | Notes                                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `page.tsx`, `layout.tsx`                    | Server Components by default. `params` and `searchParams` are **Promises** — `await` them.               |
| `loading.tsx`, `error.tsx`, `not-found.tsx` | Provide for every data-driven route segment. `error.tsx` is a Client Component.                          |
| `route.ts`                                  | Route Handler (HTTP API). Use for webhooks and external callbacks.                                       |
| `proxy.ts`                                  | Replaces deprecated `middleware.ts`. Project root. Keep it light (redirects, auth gate); no heavy logic. |

## Server Actions and Route Handlers

Every one must, in this order:

1. **Authenticate** — get the current user; reject with 401 / redirect if missing.
2. **Validate** input with Zod (`safeParse`); return field errors, never throw raw Zod errors to the client.
3. **Authorise** — confirm the user owns the resource (or has been shared it) before reading/writing.
4. Do the work; scope all DB queries by user id.
5. Revalidate affected paths/tags; return a typed result (`{ ok: true, data } | { ok: false, error }`).

## Rules

- Organise by feature: `app/[locale]/recipes/...` once i18n exists; group with route groups `(auth)`, `(app)`.
- Fetch data in Server Components, not in `useEffect`.
- Third-party calls (Spoonacular, TheMealDB, Edamam, Azure Translator, recipe URL import) happen only on the server, with timeouts, response-size limits and Zod validation of the response. Cache results to respect free-tier quotas.
- URL importer: allow only `http`/`https`, block private and loopback addresses (SSRF), cap redirects, size and time.
- Secrets come from `process.env` on the server; add every new variable to `.env.example`.
- Route Handlers and Server Actions need tests with the data layer and external services mocked.
