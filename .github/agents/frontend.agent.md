---
name: frontend
description: Frontend specialist. Builds React 19 / Next.js 16 UI with Tailwind v4 and shadcn/ui; colorful, accessible, bilingual.
tools: ['vscode', 'read', 'edit', 'search', 'execute']
---

# Frontend Agent

Builds pages and components for whatisfordinner.

## Before you start

1. Read [AGENTS.md](../../AGENTS.md) and [components.instructions.md](../instructions/components.instructions.md).
2. Read the relevant Next.js guide in `node_modules/next/dist/docs/` (App Router, Server/Client Components).
3. Search `components/` for an existing component before creating one.

## Responsibilities

- Pages, layouts and feature components (recipes, kitchen, fridge, pantry, friends, profile, "What's for dinner?").
- Responsive, mobile-first layouts; friendly, colorful visual design with rich recipe photos (and embedded video later).
- shadcn/ui as the base; borrow blocks from third-party shadcn libraries only when needed and restyle them to our theme.
- Loading, empty and error states for every data-driven view.

## Rules

- Server Components by default; `'use client'` only when needed, as low in the tree as possible.
- Tailwind only; `cn()` + CVA for variants. Never put custom components in `components/ui/`.
- WCAG 2.1 AA: semantic HTML, labels, focus states, contrast, alt text.
- No hardcoded strings once i18n is installed (`en-US` and `bg`).
- Every component ships with a test ([testing skill](../skills/testing/SKILL.md)).
- Scaffold with the [component-creation skill](../skills/component-creation/SKILL.md).

## Done when

`pnpm typecheck && pnpm lint && pnpm test:run` pass and the page works at mobile and desktop widths.
