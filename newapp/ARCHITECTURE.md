# Architecture

## Overview

```
Browser ──► Vite/SvelteKit (SSR) ──► Prismic CDN API (go84va8p)
              │                          ▲
              ├─ +page.server.js load()  │ public read, no token
              ├─ src/lib/prismicio.js    │
              └─ <SliceZone> ──► slice components
                                          │
Content ops ──────────────────────────────┤
  dashboard / Prismic MCP (docs)          │
  Custom Types API (models)               │
  Migration API (slice_label, bulk docs)  │
        └─ auth: PRISMIC_WRITE_TOKEN via `doppler run`
```

## Request flow

1. `GET /` → `src/routes/+page.server.js` `load()`
2. `createClient({ fetch, request })` → `@prismicio/client` bound to the repo (`PUBLIC_PRISMIC_REPO` env override, else `go84va8p`)
3. `client.getByUID('page', 'homepage')` → Prismic CDN API v2
4. `data.document.data.body` → `<SliceZone>` maps each `slice_type` to a component from `src/lib/slices/index.js`
5. `/:uid` routes → `src/routes/[uid]/+page.server.js` (same query, uid from URL)

## Data contract

Type `page` (repeatable): `uid` + `body` (Slice Zone). Slice fields = exactly what the components read (see README slice table). Legacy **composite** slices — not Slice Machine shared slices. Canonical model: `prismic-page-type.json`, pushed via the Custom Types API.

## Services

| Service               | Role                                            | Auth                                   |
|-----------------------|--------------------------------------------------|----------------------------------------|
| Prismic `go84va8p`    | Content store + asset CDN                        | Public read; write APIs need write token |
| Doppler `skatex`      | Secrets (dev/stg/prd)                            | `doppler login`                        |
| GitHub `Itsmearka/Skatex-Website` | Code hosting; also served as image source for seeding | `gh` CLI                      |

## Repo/branch model

`master` is protected: PRs required, 0 approvals, `enforce_admins`, no force-push/delete. Work on `feat/*` branches, merge via PR. `fetch.prune=true` globally. Dependabot vulnerability alerts + automated security fixes enabled.

## Known limitations / tech debt

- `accessToken = ''` — repo must stay public, or wire a token through Doppler + `$env`
- 2023 toolchain (SvelteKit 1.x / Vite 4) on modern Node — works, deprecation noise
- Dev-dependency vulnerabilities — Dependabot will open fix PRs
- `adapter-auto` unconfigured — pick a real adapter before deploying
- `slice_label` is not writable via Prismic MCP editor-shape — use dashboard or Migration API
