---
name: testing
description: Vitest + React Testing Library patterns for this Next.js app: configuration, templates for components, hooks, forms, and server logic.
---

# Testing Skill

## Setup (already in the repo)

- `vitest.config.mts` — jsdom, globals, `tsconfigPaths`, coverage thresholds (80%).
- `vitest.setup.ts` — loads `@testing-library/jest-dom/vitest` matchers.
- Scripts: `pnpm test` · `pnpm test:run` · `pnpm test:coverage`.

## File locations

```text
components/recipes/RecipeCard.tsx
components/recipes/RecipeCard.test.tsx   # co-located
lib/parse-ingredient.ts
lib/parse-ingredient.test.ts
__tests__/home.test.tsx                  # page / cross-cutting
```

## Component test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FavoriteButton } from './FavoriteButton';

describe('FavoriteButton', () => {
  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn();
    render(<FavoriteButton favorite={false} onToggle={onToggle} />);

    await userEvent.click(screen.getByRole('button', { name: /favorite/i }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
```

## Pure logic test (preferred for business rules)

```ts
import { describe, expect, it } from 'vitest';
import { extractRecipe } from './extract-recipe';

describe('extractRecipe', () => {
  it('finds a Recipe inside @graph', () => {
    const jsonLd = {
      '@graph': [{ '@type': 'WebPage' }, { '@type': 'Recipe', name: 'Soup' }],
    };
    expect(extractRecipe(jsonLd)?.name).toBe('Soup');
  });

  it('handles @type given as an array', () => {
    expect(
      extractRecipe({ '@type': ['Recipe', 'Thing'], name: 'Pie' })?.name
    ).toBe('Pie');
  });

  it('returns null when there is no Recipe', () => {
    expect(extractRecipe({ '@type': 'Article' })).toBeNull();
  });
});
```

## Mocking

```ts
// module
vi.mock('@/lib/db', () => ({ db: { query: vi.fn() } }));

// Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/',
}));

// time
vi.useFakeTimers();
```

Auth (Clerk) and `fetch` must be mocked the same way — never call the network. Reset with `vi.clearAllMocks()` in `afterEach` when needed.

## Server Actions / Route Handlers

Test as plain async functions with the auth helper, the DB and external services mocked.

**User-facing actions and handlers** — always cover:

- unauthenticated → rejected;
- invalid input → field errors;
- owner → happy path;
- non-owner, no share → read and write rejected;
- **shared recipe:** a recipient with an accepted friendship and a share record **can read the snapshot** (authorized read case);
- **shared recipe, write:** a recipient's attempt to modify the original or the share record → rejected; an edit creates or modifies the recipient's **own copy** instead;
- share without an accepted friendship, or a pending or rejected friendship → read rejected.

**Webhook handlers** (for example Clerk) have no user session, so do **not** test them for "unauthenticated → rejected". Test them separately:

- missing or invalid signature → rejected, and nothing is processed;
- valid signature on the raw body → processed;
- invalid payload with a valid signature → rejected by Zod;
- the same event delivered twice (a retry) → processed idempotently, with no duplicate rows or side effects.

## Limits

- **Async Server Components** can't be rendered by Vitest. Move logic into functions in `lib/` and test those; cover the full page with E2E later.
- `next/font` and `next/image` need no special handling for logic tests; avoid asserting on their output.

## Checklist

- [ ] Query by role / label / text
- [ ] `userEvent`, not `fireEvent`
- [ ] Loading, empty and error states covered
- [ ] No network, no real DB, no real clock
- [ ] Coverage ≥ 80% for new code
