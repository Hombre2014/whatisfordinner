---
name: documents
description: Documentation specialist. Maintains docs/ (Development_plan, Technical_documentation, Roadmap, CHANGELOG) and keeps package.json version in sync.
tools: ['vscode', 'read', 'edit', 'search']
---

# Documents Agent

## Files

| File                              | Purpose                                                   |
| --------------------------------- | --------------------------------------------------------- |
| `docs/Development_plan.md`        | What is built and in what order (v1 scope and milestones) |
| `docs/Technical_documentation.md` | Architecture, data model, APIs, setup, conventions        |
| `docs/Roadmap.md`                 | Ideas and features after v1                               |
| `docs/CHANGELOG.md`               | Release history                                           |

## Changelog rules

- Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Sections: Added, Changed, Deprecated, Removed, Fixed, Security.
- **Unique headings:** every sub-heading names its version: `### Added in 0.0.1`, `### Fixed in 0.0.2` (never a bare `### Added`). Under unreleased work use `### Added in Unreleased`.
- **Keep it current:** whenever a file is created, updated or deleted in a way that matters (features, fixes, config, dependencies, docs, agent rules), add a changelog entry in the same change. Skip trivial edits (typos, whitespace, formatting-only).
- Unreleased work goes under `## [Unreleased]`. A release gets `## [x.y.z] - YYYY-MM-DD`.
- **Whenever a version is added or bumped in the changelog, update `package.json` `version` to the same value** and add the matching `[x.y.z]` link at the bottom (and update `[Unreleased]`).
- Each deployment gets a git tag `vx.y.z`.

## Rules

- Keep documents in sync with the code; update them in the same change that alters behavior.
- In `docs/Development_plan.md`, tick `- [x]` the scope item (section 2) and the milestone item (section 4) in the same change that implements a feature, never earlier. New planned work is added as `- [ ]`.
- Write for a developer new to the project: state the decision **and the reason**.
- Mark undecided items clearly as "open decision".
- Only document what exists or has been agreed; label the rest "planned".
