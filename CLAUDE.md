# Project instructions for Claude

## Auto-commit rule

When a requested piece of work is complete and verified (tests/lint/build
passing as applicable — backend: `pytest tests/backend`, `ruff check`;
frontend: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`),
**commit the result to git locally without waiting to be asked again.**
This applies equally when the work was done directly or delegated to one or
more background agents — once their results are reviewed and verified,
commit right away rather than waiting for an explicit "commit" instruction
each time.

- Stage only the files actually part of the completed work (avoid blind
  `git add -A` if unrelated changes are present; in this repo `git add -A`
  is normally fine since `.gitignore` already excludes build/tooling
  artifacts).
- Write a clear, accurate commit message describing what changed and why,
  following the style of prior commits in this repo (`git log` for
  examples).
- Do **not** push automatically. Pushing to the remote (`origin` →
  `github.com/iiNoNoNoii/HomeRoster`) always requires a separate, explicit
  instruction from the user for that specific push.
- Never commit obviously broken/failing work just to satisfy this rule —
  verify first; if verification fails, fix or report the failure instead
  of committing.
