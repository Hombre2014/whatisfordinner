# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added in Unreleased

- `.github/prompts/fix-comments.prompt.md`: a reusable prompt that fetches the CodeRabbit review comments of a pull request through the GitHub MCP server, triages and fixes them, validates with typecheck, lint and tests, then replies to and resolves each thread. It never commits, pushes or starts a server unless the user asks.
- `.claude/commands/fix-comments.md`: a thin wrapper so Claude Code can run the same prompt as `/fix-comments <PR>`. The content stays in `.github/prompts/` so both tools share one source.

### Changed in Unreleased

- `fix-comments` prompt: allows the tests and docs a fix needs, checks that the local branch matches an explicitly given PR before editing, and defines a no-file-changes path that still replies to and resolves threads (CodeRabbit review on PR #4).
- Development plan: the M1 heading now says "done" to match its fully ticked checklist (CodeRabbit review on PR #4).

## [0.0.3] - 2026-11-27

### Added in 0.0.3

- shadcn/ui (Radix base, style `radix-nova`) with `components.json`, `lib/utils.ts` (`cn()` from the `cn` package) and the `button`, `card` and `sheet` components.
- Dark mode with `next-themes` (light, dark or system) and a theme toggle in the header.
- App shell: sticky header with main navigation (Home, Recipes, My Kitchen, Friends, Help), a slide-in mobile menu, footer, and a skip-to-content link.
- Home page with the "What can I have for dinner?" hero and three feature cards; placeholder pages for Recipes, My Kitchen, Friends, Help and Find dinner.
- Tests for every new component and page (28 tests, 100% coverage).
- A custom `highlight` theme token for the tomato accent, because shadcn's `accent` is only the subtle hover background.

### Changed in 0.0.3

- Visual design decided: the **Fresh Basil** palette (herb green primary, tomato accent, cream background, with a dark mode) and the **Rubik** (headings) + **Nunito Sans** (body) font pairing, both with the Cyrillic subset for Bulgarian. The root layout loads only these two fonts.
- `AGENTS.md`, the Copilot instructions, the component rules and the component-creation skill now list shadcn/ui and `next-themes` as installed and require theme tokens instead of raw hex colors.
- `docs/Technical_documentation.md` section 11 (UI and design system) and the development plan are updated for the implemented design.
- The spell checker knows the word "Nunito".
- `docs/Development_plan.md` now tracks progress with checkboxes: every scope item (section 2, tagged with its milestone) and every milestone deliverable (section 4, now a checklist per milestone) has a box that is ticked when the feature is implemented. M0 and M1 are ticked. The rule is added to `AGENTS.md` and the documents agent, and to the definition of done.

## [0.0.2] - 2026-11-26

### Added in 0.0.2

- Testing: Vitest, React Testing Library, jest-dom and user-event, with an 80% coverage threshold and a first smoke test.
- Git hooks: Husky with lint-staged (ESLint + Prettier on staged files) and commitlint (Conventional Commits).
- Prettier configuration and `format`, `format:check`, `typecheck`, `lint:fix`, `test`, `test:run` and `test:coverage` scripts.
- Agent setup: rewritten `AGENTS.md` and a `.github/` folder with `copilot-instructions.md`, agents (frontend, backend, tests, security, documents, git-operator), scoped instructions (components, routes, database, i18n, security) and skills (testing, component-creation).
- `docs/Roadmap.md` placeholder.
- First draft of `docs/Development_plan.md`: vision, v1 scope (accounts and profile, kitchen, recipe library, "What can I have for dinner?", languages, friends and sharing, help center), design direction, milestones M0 to M11, definition of done, risks, and open decisions.
- First draft of `docs/Technical_documentation.md`: stack, architecture, repository layout, workflow, testing, data model (tables and relationships), authentication and authorization, key flows (URL importer, ingredient matching, "What can I have for dinner?", sharing, translation, nutrition, images), external services, i18n, security, deployment, and open decisions.
- Database decision recorded: Postgres on Neon with Drizzle ORM (WebSocket `Pool` driver for transactions, Drizzle Studio for browsing data).
- `.mcp.json` configures GitHub's remote MCP server for Claude Code. The token is read from the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable and is never stored in the repo; documented in section 4.5 of `docs/Technical_documentation.md`.

### Changed in 0.0.2

- `@types/node` raised to v24 to satisfy Vitest's peer requirement.
- Agent rules now allow committing `.env.example` (placeholders only) while still forbidding secret-bearing env files.
- Changelog sub-headings are unique across the document (`Added in 0.0.2`, `Fixed in 0.0.3`, ...).
- Release procedure in the git-operator agent now pushes the release branch together with the tag, using an annotated tag and an explicit `git push origin <branch> vx.y.z` (`--follow-tags` skips lightweight tags).
- Agents must update this changelog whenever a change that matters is made.
- Code Spell Checker ignores Cyrillic text for now (`cSpell.ignoreRegExpList` in `.vscode/settings.json`); the Bulgarian dictionary is scheduled for milestone M2 in the development plan.
- `AGENTS.md` now requires documentation to be updated in the same change whenever the app changes.
- The definition of done in the development plan now limits the authentication requirement to user-facing handlers and states the webhook exception (signature verification).
- Testing skill and tests agent now cover shared-recipe reads (allowed for accepted friends, read-only) and test webhook handlers separately from user-session handlers (signature rejection, valid-signature processing, idempotent retries).
- Sharing data model: the copy link (`derived_from_recipe_id`, `derived_from_share_id`) is stored on the recipient's own copy instead of on the share record, and `recipe_shares.recipe_id` is nullable (`ON DELETE SET NULL`) so a share and its snapshot outlive the original recipe.
- Authorization rules now say shared recipes are read-only: a share never authorizes a write, and edits create or modify the recipient's own copy.
- All text now uses American English spelling (`color`, `organize`, `authorize`), and the rule is recorded in `AGENTS.md`.
- Route and security rules now exempt webhook handlers from user-session authentication and require signature verification before processing.

## [0.0.1] - 2026-11-26

### Added in 0.0.1

- Empty project skeleton (Next.js, React, TypeScript, Tailwind CSS).
- `docs/` folder with the project documentation:
  - `Development_plan.md` (placeholder)
  - `Technical_documentation.md` (placeholder)
  - `CHANGELOG.md`

[Unreleased]: https://github.com/Hombre2014/whatisfordinner/compare/v0.0.3...HEAD
[0.0.3]: https://github.com/Hombre2014/whatisfordinner/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/Hombre2014/whatisfordinner/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Hombre2014/whatisfordinner/releases/tag/v0.0.1
