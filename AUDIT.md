# Audit and change record

## Initial findings

1. `/auth/google` always returned 501; Google credentials were unused.
2. AI feedback endpoint was unauthenticated and never called from the UI.
3. Progress used localStorage, with no D1 schema or user isolation.
4. No R2 or Workflows integration or bindings.
5. Worker D1 types missing; no dependency lockfile.
6. Tests asserted source strings rather than behavior; CI omitted explicit type and browser checks.
7. Only one fixed lesson per skill. Speaking is browser recognition, not pronunciation assessment.
8. No actual E2E or production verification evidence.

## Implemented in this revision

Google OAuth authorization-code flow with PKCE/state; server-side hashed opaque sessions; authenticated API; origin checks; D1 schema; server-side attempt persistence; AI feedback wired to lesson submission; Workflow archive to private R2; dependency lock; behavioral tests; CI and Playwright configuration; visible AI failure feedback; keyboard focus and motion refinements.

## Verification boundary

13 tests passed locally. Production build/typecheck passed. Playwright could not start the dev server due to a host restriction (`uv_interface_addresses`). No Cloudflare credentials were present (`wrangler whoami`: unauthenticated). GitHub connector identified the account, but exposes no repository-create capability, and `gh` was absent. A public GitHub repository has since been created; subsequent pushes, CI, and the alternate hosted deployment are tracked separately. Direct Cloudflare deployment remains blocked by authorization. No secret was requested in chat or committed.
