---
description: Triage, fix, answer and resolve CodeRabbit review comments for a pull request
argument-hint: '[PR number or URL] [push]'
---

Run the `fix-comments` prompt with these arguments: $ARGUMENTS

The first number or URL is the pull request. If none is given, use the pull request of the current branch. The full instructions are in @.github/prompts/fix-comments.prompt.md (the single source of truth, shared with Copilot Chat). Follow them exactly, ignoring only the YAML front matter at the top of that file.

**The word `push` in the arguments is my explicit permission to commit and push for this run only.** With it, commit the fixes (one commit, commitlint-safe message), push, then reply to and resolve the threads, all in this run. Without it, never commit or push: give me the `git add` and `git commit` commands instead.

Other rules from [AGENTS.md](../../AGENTS.md) still apply in every case: never tag, never bypass hooks with `--no-verify`, and never start a server.
