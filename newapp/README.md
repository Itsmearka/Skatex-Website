# Skatex

Skate-culture site built with **SvelteKit + Prismic CMS + Pico CSS**.
All page content is served from a Prismic repository — nothing is hardcoded.

## Stack

| Layer     | Tech                                              |
|-----------|---------------------------------------------------|
| Framework | SvelteKit 1.x (Svelte 3, Vite 4)                  |
| CMS       | Prismic — repo `go84va8p`, public Content API     |
| Styling   | @picocss/pico                                      |
| Secrets   | Doppler — project `skatex`                         |

## Run it

```bash
cd newapp
npm install
npm run dev                 # → http://localhost:5173

# or with Doppler secrets injected:
doppler run -- npm run dev
```

Requires Node >= 18 (developed on Node 24 — expect harmless `DEP0187` noise).

## Scripts

| Command           | Purpose                      |
|-------------------|------------------------------|
| `npm run dev`     | Vite dev server (:5173)      |
| `npm run build`   | Production build             |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Prettier check               |
| `npm run format`  | Prettier write               |

## Environment & secrets (Doppler)

Secrets live in Doppler project **`skatex`** (configs `dev` / `stg` / `prd`) — never in committed `.env` files. `.env.example` documents variable names only.

| Var                   | Required | Used for                                                          |
|-----------------------|----------|--------------------------------------------------------------------|
| `PUBLIC_PRISMIC_REPO` | no       | Overrides the Prismic repo domain (defaults to `go84va8p` in code) |
| `PRISMIC_WRITE_TOKEN` | ops only | Prismic **Write APIs** (Custom Types + Migration API) — not read by the app |

### Install & login

```bash
winget install Doppler.doppler   # Windows (alt: scoop install doppler)
doppler --version

doppler login                    # browser auth — account-level, once, any directory
doppler logout                   # revoke if ever needed
```

### Project setup (one-time)

```bash
doppler projects create skatex           # create the project (run anywhere)

# interactive — prompts for project + config, binds the current directory
doppler setup

# non-interactive — same thing via flags
doppler setup -p skatex -c dev
```

`doppler setup` binds the **current directory** to a project + config — run it from `newapp/` so `doppler run` resolves here. Re-run with a different `-c` to rebind (e.g. `-c stg`).

### Set / update secrets

```bash
# bound-dir context (uses whatever config the dir is set to)
doppler secrets set PRISMIC_WRITE_TOKEN="..."
doppler secrets                          # list names + values
doppler secrets --only-names             # names only
doppler secrets get PRISMIC_WRITE_TOKEN  # show one value

# flag-wise — explicit project + config, works from any directory
doppler secrets set PRISMIC_WRITE_TOKEN="..." -p skatex -c dev
doppler secrets set PRISMIC_WRITE_TOKEN="..." -p skatex -c stg
doppler secrets set PRISMIC_WRITE_TOKEN="..." -p skatex -c prd
doppler secrets --only-names -p skatex -c prd
```

`secrets set` is also how you **update** — same command overwrites the value.

### Run with secrets injected

```bash
doppler run -- npm run dev               # bound config (dev)
doppler run -c stg -- npm run dev        # per-run config override
doppler run -p skatex -c prd -- node script.mjs
```

The app needs **no secrets at runtime** — the Prismic Content API is public. Doppler matters for write ops (custom types, migration scripts) and any future private-API/server secrets.

## Prismic

- **Repo:** `go84va8p` — public Content API (`https://go84va8p.cdn.prismic.io/api/v2`)
- **Client config:** `src/lib/prismicio.js` — repo domain (env-overridable) + route map
- **Custom type `page`** (repeatable): `uid` + `body` slice zone — model lives in `prismic-page-type.json`
- **Documents:** `homepage` (type `page`, uid `homepage`)

### Slice → component map (`src/lib/slices/index.js`)

| slice_type      | Component             | Fields consumed                                |
|-----------------|-----------------------|------------------------------------------------|
| `rainbow_text`  | `RainbowText.svelte`  | `slice_label`                                  |
| `slice`         | `Slice.svelte`        | `eyebrow_headline`, `title`, `description`     |
| `slice_1`       | `slice1.svelte`       | `title`                                        |
| `alternategrid` | `AlternateGrid.svelte`| `optional_image`, `image_side`, `description`  |

### Content ops

| Task                    | How                                                                                          |
|-------------------------|----------------------------------------------------------------------------------------------|
| Edit documents/assets   | Prismic dashboard, or the Prismic MCP server in an AI agent                                  |
| Change the `page` model | `doppler run -- bash -c 'curl -X POST https://customtypes.prismic.io/customtypes/update -H "repository: go84va8p" -H "Authorization: Bearer $PRISMIC_WRITE_TOKEN" -H "Content-Type: application/json" --data @prismic-page-type.json'` |
| Set `slice_label`       | Dashboard doc editor, or Migration API `PUT /documents/{id}` (MCP editor-shape drops labels) |

## Troubleshooting

- **`Prismic repository not found`** — `repoName`/`PUBLIC_PRISMIC_REPO` doesn't match a live repo.
- **Empty rainbow banner** — `slice_label` unset; set via dashboard or Migration API.
- **`npm warn allow-scripts`** — postinstalls for `esbuild`/`@sveltejs/kit` blocked by npm 11; harmless, dev server works.
- **Dependency vulnerabilities** — dev deps only; tracked by GitHub Dependabot.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how it all fits together.
