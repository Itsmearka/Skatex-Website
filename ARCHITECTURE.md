# Skatex architecture

## System overview

```text
Browser
  -> SvelteKit server rendering
      -> root layout loader queries published Prismic page documents
      -> route loader fetches one page document by UID
      -> SliceZone selects a Svelte component for each slice type
  -> Prismic public Content API and image CDN

Content administration
  -> Prismic dashboard or Prismic MCP for document and release work
  -> Custom Types API for content-model changes
  -> Migration API for operations not represented by the MCP editor model
  -> PRISMIC_WRITE_TOKEN injected at command runtime by Doppler
```

The app reads public content at runtime. The Prismic write token is for administrative operations only and is not read by the SvelteKit app.

## Routes and loaders

- `src/routes/+page.server.js` fetches the `page` document with UID `homepage` for `/`.
- `src/routes/[uid]/+page.server.js` fetches a repeatable `page` document by route UID.
- Both loaders translate Prismic's exact `No documents were returned` condition into a thrown SvelteKit 404. Other errors are rethrown so API outages do not look like missing content.
- `src/routes/+layout.server.js` fetches all published documents of type `page` and returns their IDs and UIDs for the shared navigation.
- `src/routes/+error.svelte` renders the branded error experience, including a 404-specific message and a safe generic message for other failures.

Navigation labels are mapped in `src/routes/+layout.svelte`. Unknown page UIDs use the UID as their label. The homepage UID maps to `/`; other page UIDs map to `/<uid>`.

## Rendering and design system

The shared layout owns global typography, responsive header and footer, the page width, background colors, and decorative motion. CSS orbs bob at staggered tempos, while a low-opacity SVG skater follows an animated path. Both stop when reduced motion is requested. The active navigation item uses a short bounce on route changes. `src/lib/Tour.svelte` provides the compact tour launcher and keyboard-accessible walkthrough. Tour steps target elements using `data-tour` attributes in the layout and slice components. `src/lib/cursorGlow.js` tracks pointer coordinates on cards and sets CSS variables for their radial hover glow; touch input is ignored.

`@prismicio/svelte` `SliceZone` receives `document.data.body` and the component map exported by `src/lib/slices/index.js`:

| Prismic slice   | Svelte component       | Rendering responsibility                       |
| --------------- | ---------------------- | ---------------------------------------------- |
| `rainbow_text`  | `RainbowText.svelte`   | Gradient label with primary title fallback     |
| `slice`         | `Slice.svelte`         | Eyebrow, rich-text heading, and description    |
| `slice_1`       | `slice1.svelte`        | Section heading                                |
| `alternategrid` | `AlternateGrid.svelte` | Optional responsive image and descriptive text |

The image slice honours `image_side`; on narrow screens it stacks content vertically. Rich text is converted with `@prismicio/helpers` before insertion. `src/lib/typography.js` normalizes em dash characters in Prismic-rendered text and image alt text to plain hyphens, leaving published CMS content unchanged.

## Prismic content model

The `page` custom type is repeatable and contains a UID plus a `body` Slice Zone. Its checked-in model is `newapp/prismic-page-type.json`. The Prismic repository is `go84va8p`, configured for the `en-us` locale and public Content API access.

The root layout navigation only includes published documents. Draft or scheduled release content does not appear until it is published. The homepage is fixed to UID `homepage`; all other page routes are generated from their UID.

## Services and authentication

| Service            | Responsibility                                     | Authentication                                                    |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------------------- |
| Prismic `go84va8p` | Public content API, document store, image CDN      | Read access is public; write APIs require an administrative token |
| Doppler `skatex`   | Operational secrets across `dev`, `stg`, and `prd` | Doppler CLI login                                                 |
| GitHub             | Source hosting and protected `master` branch       | `gh` CLI for repository operations                                |

`PUBLIC_PRISMIC_REPO` optionally changes the public repository identifier at runtime. `PRISMIC_WRITE_TOKEN` is used only for administrative content-model or migration work. Inject it with `doppler run`; do not place it in frontend code, committed environment files, or build output.

## Repository workflow

`master` is protected. Changes are developed on feature branches, pushed to the matching remote branch, and merged through pull requests. The current rules require a PR, enforce the rules for administrators, require zero approvals, and block force pushes and branch deletion. Merge commits are allowed. Global `fetch.prune` is enabled.

## Operational notes

- Run the app from `newapp/` with `npm run dev` or `doppler run -p skatex -c dev -- npm run dev`.
- Build with `npm run build`; the project uses SvelteKit 1, Svelte 3, and Vite 4.
- The public Content API must remain public unless a read token is added through a server-only configuration path.
- The Prismic MCP editor shape does not write legacy slice labels. Set `slice_label` through the Prismic dashboard or the Migration API.
- No interactive 3D scene is included yet. If a model is supplied, prototype a Spline Viewer embed first. Use Threlte when the experience needs custom Three.js behavior and the added bundle and SSR configuration are justified.
- `adapter-auto` has no selected production adapter. Choose an adapter before deploying to a specific hosting platform.
