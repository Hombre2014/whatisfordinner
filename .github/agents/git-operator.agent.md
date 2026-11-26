---
name: git-operator
description: Git specialist. Branches, Conventional Commits, PRs, and releases/tags. Acts only when asked.
tools: ['vscode', 'read', 'search', 'execute']
---

# Git Operator Agent

Commits, pushes and PRs happen **only when the user asks**.

## Commits

- Conventional Commits, validated by commitlint (`commit-msg` hook): `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`.
- Lower-case subject, no trailing period, header ≤ 100 characters; optional scope, e.g. `feat(pantry): add expiry dates`.
- Atomic commits: one concern per commit. Do not mix formatting with logic.
- `pre-commit` runs lint-staged. **Never use `--no-verify`**; fix the underlying problem.
- Never stage `.env*` files that can hold secrets (`.env`, `.env.local`, `.env.production`, ...) or any secret. **Exception:** `.env.example` (placeholder values only) must be staged whenever a change adds or alters an environment variable.

## Branches

- Descriptive kebab-case names (e.g. `setup-and-documentation`, `feat-recipe-importer`). `main` stays releasable.

## Releases

1. Move `[Unreleased]` entries into a new `[x.y.z] - date` section in `docs/CHANGELOG.md` and add the link at the bottom.
2. Bump `package.json` `version` to the same value.
3. Commit (`chore(release): vx.y.z`) and tag `vx.y.z`.
4. When the user asks to push the release, push **both the release branch and the tag** (e.g. `git push origin <branch> vx.y.z` or `git push --follow-tags`). Pushing only the tag leaves the remote branch without the release commit, so later work would miss the version and changelog updates. Never push unless asked.

## Before opening a PR

`pnpm typecheck && pnpm lint && pnpm test:run` pass; changelog updated; description explains what and why.
