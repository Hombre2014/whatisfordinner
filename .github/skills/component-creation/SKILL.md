---
name: component-creation
description: Scaffold a new React component for this Next.js app (Server Component by default, Tailwind, optional CVA variants, co-located test).
---

# Component Creation Skill

## Steps

1. **Search first.** Look in `components/` (and `components/ui/` for shadcn primitives) for something reusable.
2. **Choose server or client.** Default Server Component. Add `'use client'` only if it needs state, effects, event handlers or browser APIs. If only a small part is interactive, split it into a small client component.
3. **Create files** in `components/<feature>/`:
   - `Name.tsx` — the component (named export)
   - `Name.styles.ts` — only if it has visual variants (CVA)
   - `Name.test.tsx` — required
4. **Strings:** use translation keys once `next-intl` is installed (both `en-US` and `bg`).
5. **Verify:** `pnpm typecheck && pnpm lint && pnpm test:run`.

## Server component template

```tsx
// components/pantry/PantryItemRow.tsx
import { cn } from '@/lib/utils';

interface PantryItemRowProps {
  name: string;
  quantity?: string;
  className?: string;
}

/** One line in the pantry list. */
export function PantryItemRow({
  name,
  quantity,
  className,
}: PantryItemRowProps) {
  return (
    <li className={cn('flex items-center justify-between py-2', className)}>
      <span>{name}</span>
      {quantity && <span className="text-muted-foreground">{quantity}</span>}
    </li>
  );
}
```

## Client component template

```tsx
'use client';

import { useState } from 'react';

interface QuantityStepperProps {
  initial?: number;
  onChange?: (value: number) => void;
}

/** Increment / decrement control. */
export function QuantityStepper({
  initial = 1,
  onChange,
}: QuantityStepperProps) {
  const [value, setValue] = useState(initial);

  const update = (next: number) => {
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => update(Math.max(0, value - 1))}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => update(value + 1)}
      >
        +
      </button>
    </div>
  );
}
```

## CVA variants (when needed)

```ts
// Badge.styles.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'rounded-full px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      tone: {
        neutral: 'bg-muted text-foreground',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
```

> `cn()` (`lib/utils.ts`, from the `cn` package) and `class-variance-authority` came with shadcn/ui and are installed. Style with theme tokens (`bg-primary`, `text-muted-foreground`, `text-highlight`), never raw hex colors.

## Rules recap

Named exports · Tailwind only · never add custom components to `components/ui/` · accessible markup · test included.
