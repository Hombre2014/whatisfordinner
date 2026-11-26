---
applyTo: '**'
---

# Security Instructions

## Threat model (private app for friends and family, internet-facing)

- Authenticated users must not see or change each other's recipes, kitchen, pantry or profile — except items explicitly shared (accepted friendship + share record).
- Imported recipe pages, API responses and user-entered text are **untrusted**.
- The URL importer makes server-side requests to user-supplied URLs (SSRF risk).

## Rules

### Authentication and authorisation

- Auth is provided by Clerk (when installed). Never roll your own password or session handling.
- Check auth in `proxy.ts` for page gating **and again** inside every user-facing Server Action / Route Handler — never rely on the proxy alone. Webhook handlers are the exception: they have no user session and are authenticated by **signature verification** instead.
- Authorisation = ownership check on every read/write. Scope DB queries with the current user id; never accept a user id from the client.
- Friend sharing: only accepted friends may receive shares; recipients get read access to the snapshot, edits operate on their own copy.

### Input and output

- Validate everything with Zod at the boundary (forms, actions, route handlers, third-party responses, JSON-LD).
- Parameterised queries only (via the ORM); no string-built SQL.
- Never use `dangerouslySetInnerHTML` with imported or user content. If rich text is unavoidable, sanitise with DOMPurify first.
- Validate uploaded images (type, size) and upload through signed Cloudinary uploads.

### Secrets and configuration

- No secrets in code, logs or the client bundle. Only `NEXT_PUBLIC_*` variables are browser-visible; never prefix a secret with it.
- Real env files (`.env*`) are git-ignored, except `.env.example`, which is committed and documents each variable with a placeholder only.

### Outbound requests

- Allow `http`/`https` only; resolve and block private, loopback and link-local IPs; limit redirects, response size and time; send a clear User-Agent.
- Respect third-party rate limits and terms (Spoonacular caching limits, Edamam attribution).

### Webhooks

- Verify signatures (e.g. Clerk webhooks) before processing; make handlers idempotent.

### Hygiene

- Do not log tokens, passwords, emails or other personal data.
- Run `pnpm audit` before releases; keep dependencies current.
- After generating code, re-read it for the issues above.
