# Skatex

A skate-culture website built with SvelteKit and Prismic. The site brings together practical skate guides, gear notes, and stories from the park, with a dark visual system, soft ambient orbs, and responsive layouts.

The application lives in [`newapp/`](newapp/). This root README is the project overview shown on the GitHub repository home page.

## Run locally

Requires Node.js 18 or later and npm.

```powershell
cd newapp
npm install
npm run dev
```

Open `http://localhost:5173`. If that port is already in use, Vite selects the next available port and prints its URL.

The app reads content from the public Prismic repository `go84va8p`, so local development requires an internet connection but no Prismic read token. To inject Doppler variables into the process:

```powershell
doppler run -p skatex -c dev -- npm run dev
```

## Application routes

| Route           | Content                                              |
| --------------- | ---------------------------------------------------- |
| `/`             | The `page` document with UID `homepage`              |
| `/:uid`         | A published Prismic `page` document matching the UID |
| `/take-a-tour`  | Redirects to `/` and auto-opens the guided tour      |
| `/sitemap.xml`  | XML sitemap generated from published pages           |
| `/robots.txt`   | Crawler rules that point to the sitemap              |
| Any missing UID | Branded not-found page with HTTP 404                 |

The navigation is built from published Prismic `page` documents. Add and publish a page in Prismic to make it appear in the navigation.

## Stack

| Area               | Technology                                                |
| ------------------ | --------------------------------------------------------- |
| Framework          | SvelteKit 1, Svelte 3, Vite 4                             |
| Content            | Prismic Content API and custom type `page`                |
| UI                 | Pico CSS with project-specific Svelte styles              |
| Operations secrets | Doppler project `skatex`, configs `dev`, `stg`, and `prd` |
| Source hosting     | GitHub, repository `Itsmearka/Skatex-Website`             |

## Scripts

Run these from `newapp/`.

| Command           | Purpose                               |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start Vite development server         |
| `npm run build`   | Build the production bundle           |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint`    | Check formatting with Prettier        |
| `npm run format`  | Format supported source files         |

## Doppler setup and commands

Doppler stores operational credentials outside the repository. Never commit real credentials in `.env`, source code, or documentation. The checked-in `newapp/.env.example` contains variable names and safe defaults only.

### Install and log in

On Windows:

```powershell
winget install Doppler.doppler
doppler --version
doppler login
```

`doppler login` opens browser authentication and is account-wide. Use `doppler logout` to revoke the local CLI session.

### Select a project and config

The project is `skatex`; its configs are `dev`, `stg`, and `prd`. Create the project only when setting up a new Doppler workspace:

```powershell
doppler projects create skatex
```

Interactive setup prompts for a project and config and binds the current directory:

```powershell
cd newapp
doppler setup
```

Non-interactive setup selects them directly:

```powershell
doppler setup -p skatex -c dev
```

Setup is directory-scoped. Run it in `newapp/`. Rebind by running it again with `-c stg` or `-c prd`.

### Add or update secrets

Use a config-specific command from any directory. `secrets set` creates a secret or updates its value:

```powershell
doppler secrets set PRISMIC_WRITE_TOKEN="<token>" -p skatex -c dev
doppler secrets set PRISMIC_WRITE_TOKEN="<token>" -p skatex -c stg
doppler secrets set PRISMIC_WRITE_TOKEN="<token>" -p skatex -c prd
```

Prefer entering or rotating credentials through the Doppler dashboard when practical. A token typed directly into a shell command can be retained in shell history. Never paste its value into chat or commit it.

Inspect names without revealing values:

```powershell
doppler secrets --only-names -p skatex -c dev
```

To inspect or retrieve a value, use the Doppler dashboard rather than printing secrets into terminal logs.

### Run commands with secrets injected

```powershell
cd newapp
doppler run -p skatex -c dev -- npm run dev
doppler run -p skatex -c stg -- npm run dev
doppler run -p skatex -c prd -- node .\path\to\admin-script.mjs
```

The public website does not use `PRISMIC_WRITE_TOKEN`. It is reserved for administrative Prismic APIs. `PUBLIC_PRISMIC_REPO` is an optional public repository identifier, not a credential.

## Prismic content

- Repository: `go84va8p`
- API visibility: public
- Locale: `en-us`
- Custom type: repeatable `page`, with a UID and `body` slice zone
- Local model: [`newapp/prismic-page-type.json`](newapp/prismic-page-type.json)
- Prismic client and routes: [`newapp/src/lib/prismicio.js`](newapp/src/lib/prismicio.js)

The app currently uses four legacy composite slices:

| Slice type      | Component              | Fields used                                 |
| --------------- | ---------------------- | ------------------------------------------- |
| `rainbow_text`  | `RainbowText.svelte`   | `slice_label`, with a title fallback        |
| `slice`         | `Slice.svelte`         | `eyebrow_headline`, `title`, `description`  |
| `slice_1`       | `slice1.svelte`        | `title`                                     |
| `alternategrid` | `AlternateGrid.svelte` | optional image, `image_side`, `description` |

Slice component registration is in [`newapp/src/lib/slices/index.js`](newapp/src/lib/slices/index.js). `AlternateGrid` supports missing images and both image positions. Content edits happen in the Prismic dashboard or through the authenticated Prismic MCP integration. Custom type changes use the Custom Types API. Administrative tokens must be injected with Doppler and remain server-side or CLI-only.

## Design and error handling

The shared layout provides responsive navigation, a dark layered background, softly animated ambient orbs, a skating SVG trail, and reduced-motion support. The active navigation pill bounces when the route changes. Content cards show a subtle cursor-following glow on hover. A pulsing **Take a tour** button opens a six-step guided walkthrough of navigation, Prismic slices, responsive features, motion, and Doppler's secure handling of administrative credentials. The tour supports keyboard navigation and can be skipped at any time. Page content remains CMS-driven. The custom SvelteKit error page presents a branded recovery path for missing pages and a generic message for other errors without exposing internal error details. Prismic punctuation is normalized at render time so em dash characters do not appear in visible page copy.

## Deploy to Vercel

The app uses `@sveltejs/adapter-vercel` with the `nodejs20.x` function runtime, configured in [`newapp/svelte.config.js`](newapp/svelte.config.js). The public site reads published Prismic content and needs no environment variables at deploy time.

CLI flow, run from `newapp/`:

```powershell
vercel login         # browser authentication, one time
vercel link          # create and link the project (name it "skatex")
vercel git connect   # link the GitHub repo; sets root directory to newapp automatically
vercel --prod        # build and deploy to production
```

If the Vercel CLI is not installed globally, install it once with `npm i -g vercel` or prefix the commands with `npx`. Running `vercel` instead of `vercel --prod` deploys a preview URL instead of production. After `vercel git connect`, pushes to `master` deploy to production and pushes to feature branches create preview deployments, so `vercel --prod` is only needed for manual deploys.

Useful follow-up commands:

```powershell
vercel ls                        # list deployments
vercel inspect <url> --logs      # build and runtime logs
vercel rollback                  # revert to the previous deployment
```

Dashboard alternative: choose **Add New > Project** in Vercel, import `Itsmearka/Skatex-Website`, set **Root Directory** to `newapp`, and keep the auto-detected **SvelteKit** preset.

After the first deploy, `https://<project>.vercel.app/take-a-tour` opens the homepage and starts the tour automatically, which is a convenient link for sharing the site.

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for request flow, rendering structure, and operational boundaries.
