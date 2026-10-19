# english-glass

Mobile-first React / TypeScript English practice app for Cloudflare Workers.

## Current verification

- Typecheck and production build: passed locally.
- Unit/API tests: 13 passed locally (Node 24).
- Playwright: configured for mobile Chromium and desktop Chromium; local execution blocked before browser launch by sandbox `uv_interface_addresses` restriction. NOT passed.
- Real Google login, live Workers AI, D1/R2/Workflows integration, GitHub Actions and production URL: NOT verified.
- Public repository `skruuuu/english-glass` has been created. Hosted validation deployment and GitHub Actions results are being verified separately.

## Development

```
npm ci
npm test
npm run typecheck
npm run build
npx wrangler d1 migrations apply english-glass --local
npm run dev
npx playwright install --with-deps chromium
npm run test:e2e
```

Use Node 24. Tests exercise actual lesson evaluators and Hono HTTP responses. Browser tests mock Google session/history/AI for the four lesson flows; separate requests test the actual unauthenticated API. Mocked tests do not verify Google or Cloudflare production integrations.

## Production provisioning (requires account authorization)

1. Authenticate using `npx wrangler login` on a trusted interactive machine. Never put tokens in repository files.
2. Create D1: `npx wrangler d1 create english-glass`. Replace the all-zero `database_id` in `wrangler.jsonc` with the returned ID. That placeholder is deliberately NOT a provisioned resource.
3. Create the private R2 bucket: `npx wrangler r2 bucket create english-glass-feedback`. Confirm account billing requirements before enabling any paid plan.
4. Apply schema: `npx wrangler d1 migrations apply english-glass --remote`.
5. Register a Google Web OAuth client. Set its redirect URI to `https://<production-host>/auth/callback`. Configure consent, audience and publishing in Google Cloud.
6. Register `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` using `npx wrangler secret put NAME` at a private terminal. Do not paste secrets into chat. No password or session-signing key is required: sessions use random opaque tokens with SHA-256 digests stored in D1.
7. Build and deploy: `npm run deploy`. Wrangler provisions the declared Workflow with the deployed exported class. Verify bindings and API availability on the account.
8. In a properly authenticated GitHub CLI, run `gh repo create english-glass --public --source=. --remote=origin --push` after initializing and committing this directory. Review the staged files first; ignore rules exclude local secrets, build output and test traces.
9. Confirm all CI checks on the pushed commit. Run real OAuth and all four lessons on the production URL; reload and confirm history persists under the same account and remains isolated from a second account.

## Architecture choices

React + Motion retains the existing UI and transitions. Vite's Cloudflare plugin builds the SPA assets and Worker together. Hono provides small explicit API routes. D1 stores user IDs, hashed sessions and practice attempts; Google profile names/emails and student answers are not persisted. Workers AI gives brief text feedback; failures return an explicit warning while retaining the attempt. Workflows retries storing generated feedback in private R2. R2 stores AI feedback only, not audio recordings. Speaking uses browser speech recognition and Listening uses browser speech synthesis, so voice support depends on browser/OS. Text-based speaking feedback does not measure pronunciation.

OAuth uses state, PKCE, verified Google userinfo and HttpOnly Secure SameSite cookies. Mutations require matching Origin. APIs are no-store and require a valid unexpired session. A per-user hourly cap limits AI calls. Public repository content must contain no `.dev.vars`, OAuth secrets, tokens or user records.

## Remaining work before calling this production-ready

- Cloudflare account authorization, real resource IDs, OAuth client registration and live integration testing.
- Public GitHub repository creation and confirmed CI results.
- Actual mobile/desktop browser QA, microphone permission/error flows, audio playback, reduced-motion and accessibility review.
- Four introductory lessons exist, one per skill; richer curriculum and more flexible assessment remain. Writing/Speaking completion currently uses normalized reference matching, not AI grading.
- Rate limit is a non-atomic per-user practice cap, not full edge abuse protection; authenticated oversized bodies and concurrent requests need stronger limits before scaling.
- Session/attempt retention and account deletion policy need implementation; expired sessions are rejected but not automatically purged.
- R2 feedback is archived privately and shown immediately in the lesson; no historical feedback retrieval UI yet.
- Workflow dispatch failure is reported with an AI-unavailable warning; durable outbox/reconciliation is not implemented.

See `AUDIT.md` for initial findings.

## Alternate hosted build

The `sites-source.zip` archive contains the 12-lesson Sites-managed validation build, using ChatGPT sign-in and hosted D1/R2. The root project retains Google OAuth / Workers AI / Workflows for direct Cloudflare deployment. These are separate deployment targets; do not claim Google-only login or Workers AI is active in the validation build.

Hosted validation URL: https://english-glass.fitsmile4.chatgpt.site (owner-only; ChatGPT sign-in).
