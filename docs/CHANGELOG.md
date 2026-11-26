# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2026-11-26

### Added in 0.0.2

- Testing: Vitest, React Testing Library, jest-dom and user-event, with an 80% coverage threshold and a first smoke test.
- Git hooks: Husky with lint-staged (ESLint + Prettier on staged files) and commitlint (Conventional Commits).
- Prettier configuration and `format`, `format:check`, `typecheck`, `lint:fix`, `test`, `test:run` and `test:coverage` scripts.
- Agent setup: rewritten `AGENTS.md` and a `.github/` folder with `copilot-instructions.md`, agents (frontend, backend, tests, security, documents, git-operator), scoped instructions (components, routes, database, i18n, security) and skills (testing, component-creation).
- `docs/Roadmap.md` placeholder.
- Database decision recorded: Postgres on Neon with Drizzle ORM (WebSocket `Pool` driver for transactions, Drizzle Studio for browsing data).

### Changed in 0.0.2

- `@types/node` raised to v24 to satisfy Vitest's peer requirement.
- Agent rules now allow committing `.env.example` (placeholders only) while still forbidding secret-bearing env files.
- Changelog sub-headings are unique across the document (`Added in 0.0.2`, `Fixed in 0.0.3`, ...).
- Release procedure in the git-operator agent now pushes the release branch together with the tag.
- Agents must update this changelog whenever a change that matters is made.
- All text now uses American English spelling (`color`, `organize`, `authorize`), and the rule is recorded in `AGENTS.md`.
- Route and security rules now exempt webhook handlers from user-session authentication and require signature verification before processing.

## [0.0.1] - 2026-11-26

### Added in 0.0.1

- Empty project skeleton (Next.js, React, TypeScript, Tailwind CSS).
- `docs/` folder with the project documentation:
  - `Development_plan.md` (placeholder)
  - `Technical_documentation.md` (placeholder)
  - `CHANGELOG.md`

[Unreleased]: https://github.com/Hombre2014/whatisfordinner/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/Hombre2014/whatisfordinner/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Hombre2014/whatisfordinner/releases/tag/v0.0.1
