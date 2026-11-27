---
applyTo: 'components/**/*.tsx,components/**/*.ts'
---

# Component Instructions

## Structure

```text
components/
├── ui/                    # shadcn/ui ONLY (generated). Never add custom components here.
└── <feature>/             # recipes/, pantry/, kitchen/, friends/, layout/, ...
    ├── RecipeCard.tsx
    ├── RecipeCard.styles.ts   # CVA variants + prop types (only if the component has variants)
    ├── RecipeCard.test.tsx    # co-located test (required)
    └── index.ts               # optional barrel export
```

Add a new feature folder when introducing a distinct feature area.

## Rules

- **Server Component by default.** Add `'use client'` only for state, effects, event handlers or browser APIs, and keep client components small and low in the tree. Pass server-fetched data down as props.
- Named exports. PascalCase file and component names.
- Type props with an interface or type; no `any`.
- Tailwind only. Merge classes with `cn()` from `@/lib/utils` (created with shadcn/ui). Use CVA (`*Variants`) when a component has more than one visual variant.
- Do not edit generated shadcn/ui files in `components/ui/`; compose them. Blocks borrowed from third-party shadcn libraries go in a feature folder, restyled to our theme and with their strings moved to i18n.
- Accessibility: semantic elements, labeled controls, visible focus, keyboard operable, meaningful `alt` text for recipe photos.
- No hardcoded user-facing strings once `next-intl` is installed.
- Use `next/image` for images (Cloudinary host must be allowed in `next.config.ts`).

## Template

```tsx
// components/recipes/RecipeCard.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  totalMinutes?: number;
  className?: string;
}

/** Compact recipe tile used in lists and search results. */
export function RecipeCard({
  title,
  imageUrl,
  totalMinutes,
  className,
}: RecipeCardProps) {
  return (
    <article className={cn('overflow-hidden rounded-xl border', className)}>
      <Image src={imageUrl} alt={title} width={400} height={300} />
      <h3 className="p-3 font-semibold">{title}</h3>
      {totalMinutes !== undefined && (
        <p className="px-3 pb-3">{totalMinutes} min</p>
      )}
    </article>
  );
}
```

Every component needs a test: see [../skills/testing/SKILL.md](../skills/testing/SKILL.md).
