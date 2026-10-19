# Current status — 2026-10-20 (Japan)

Validation URL: https://english-glass.fitsmile4.chatgpt.site
Public source: https://github.com/skruuuu/english-glass

The hosted validation build uses ChatGPT sign-in and Sites-managed Cloudflare Workers, D1 and R2. It is owner-only. The exact hosted source is in sites-source.zip. The root project is the separate direct Cloudflare target for Google OAuth, Workers AI and Workflows; it is not the deployed validation build.

## Verified

- Hosted build: 17 local unit tests, typecheck and production build passed.
- Direct Cloudflare target: 13 local unit/API tests, typecheck and build passed.
- Deployed application: successful ChatGPT authentication; all four skill answer flows; incorrect Writing answer followed by an accepted alternative answer; saved feedback; lesson completion; records retained after reload. Speaking was tested through typed fallback. Listening play control entered the playing state; sound quality was not assessed.
- History export initiated a browser download. Downloaded bytes were unavailable for content inspection.
- Desktop viewport: no horizontal overflow at 1363px.
- All source files were saved to the Public repository through GitHub UI after the connector rejected writes.

## Pending

- GitHub Actions runs were created but remained queued/starting with no step results when checked. No CI or mobile E2E pass is claimed.
- Mobile device layout and real microphone permission/recognition checks.
- Google-only login, live generated AI feedback and Workflows on the direct Cloudflare target. The validation app uses curated reference feedback, not AI.
- Pronunciation scoring, broader curriculum, account data deletion and retention controls, stronger edge rate limiting.

## Selection reasons

React preserves the existing UI and supports compact mobile interactions. Motion/CSS provide transitions and reduced-motion handling. Hono keeps the direct Worker API small. D1 stores user-scoped attempts. R2 archives downloadable history in the hosted build. The Sites deployment route removes the blocking Cloudflare account login while preserving a separate direct Cloudflare implementation for the original stack.
