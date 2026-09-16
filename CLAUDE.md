# Project instructions for Claude

## Auto-commit and auto-push rule

When a requested piece of work is complete and verified (tests/lint/build
passing as applicable — backend: `pytest tests/backend`, `ruff check`;
frontend: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`),
**commit the result to git locally, then push to `origin` (→
`github.com/iiNoNoNoii/HomeRoster`), without waiting to be asked again.**
This applies equally when the work was done directly or delegated to one or
more background agents — once their results are reviewed and verified,
commit and push right away rather than waiting for an explicit instruction
each time. (Standing instruction from the user, 2026-09-16: "Push immer
gleich automatisch bitte" — push automatically every time from now on,
superseding the earlier commit-only rule.)

- Stage only the files actually part of the completed work (avoid blind
  `git add -A` if unrelated changes are present; in this repo `git add -A`
  is normally fine since `.gitignore` already excludes build/tooling
  artifacts).
- Write a clear, accurate commit message describing what changed and why,
  following the style of prior commits in this repo (`git log` for
  examples).
- Push right after committing, same turn, no separate confirmation needed.
- Never commit obviously broken/failing work just to satisfy this rule —
  verify first; if verification fails, fix or report the failure instead
  of committing/pushing.
