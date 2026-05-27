# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal website (Resume / Projects / Blog) built with **TanStack Start** (React 19), **Vite 7**, **Tailwind v4**, and **shadcn/ui**. Deployed as a fully static site to GitHub Pages. **Bun** is the package manager.

## Commands

```bash
bun install          # install deps (lockfile is bun.lock)
bun run dev          # dev server
bun run build        # build (set NITRO_PRESET=static for the GitHub Pages static output)
bun run preview      # preview a production build
bun run lint         # eslint .
bun run format       # prettier --write .
```

There is no test runner configured.

## Architecture

- **Content is code, not a CMS.** All page content lives in plain TypeScript in `src/data/` — `profile.ts`, `projects.ts`, `posts.ts`. Add a blog post by appending to the `posts` array; the `/blog/$slug` route resolves it via its loader by `slug`. Blog post `body` is plain text rendered by a tiny custom renderer in `src/routes/blog.$slug.tsx` (paragraphs, `- ` bullet lists, and ```` ``` ```` fenced code blocks — no markdown library).

- **File-based routing** in `src/routes/`. See `src/routes/README.md` for conventions (dynamic = bare `$`, splat = `$.tsx` read via `_splat`, optional = `{-$x}`). `src/routes/routeTree.gen.ts` is **auto-generated — never edit it by hand**. `__root.tsx` is the app shell (html/head/body + header/footer + QueryClientProvider); preserve its `<Outlet />`. Do not introduce Next.js/Remix conventions (`src/pages/`, `app/layout.tsx`).

- **Custom server entry for SSR error handling.** `vite.config.ts` redirects TanStack Start's server entry to `src/server.ts`, which wraps the real handler to convert catastrophic SSR failures (including h3-swallowed 500s) into a branded error page (`src/lib/error-page.ts`). `src/start.ts` adds request middleware that does the same for thrown errors. Keep error handling working when touching these.

## Critical constraints

- **Do NOT add Vite plugins manually in `vite.config.ts`.** It uses `@lovable.dev/vite-tanstack-config`, which already bundles `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`, the `@` path alias, env injection, and the dev component tagger. Adding any of these again breaks the build with duplicate plugins. Pass extra options through `defineConfig({ vite: { ... } })`.

- **Server-only code:** put reused server logic in a `*.server.ts` file (e.g. `src/lib/config.server.ts`) — the suffix keeps it out of the client bundle. Use `createServerFn` for client-callable server handlers (see `src/lib/api/example.functions.ts`). The Next.js `server-only` package is forbidden (enforced by an ESLint `no-restricted-imports` rule).

- **Env vars:** read `process.env` **inside** a function/handler, never at module scope (Cloudflare binds env per-request). Public values use the `VITE_` prefix via `import.meta.env`; never put secrets there since they ship to the browser.

- **Imports:** use the `@/*` alias for `src/*`. Add shadcn/ui components to `src/components/ui/` (new-york style, configured in `components.json`).

- **Adding dependencies:** `bunfig.toml` enforces a 24h supply-chain guard (`minimumReleaseAge`) that blocks packages published less than a day ago. Confirm with the user before adding a package to `minimumReleaseAgeExcludes`.

## Styling

Dark, terminal-inspired theme. All colors are semantic CSS variable tokens (oklch) in `src/styles.css` — change the palette there, not in component files. Fonts: JetBrains Mono (mono/labels), Inter (prose).

## Deployment

`.github/workflows/deploy.yml` builds with `NITRO_PRESET=static` (nitro prerenders all routes into `.output/public`) and publishes to GitHub Pages on push to `main`. If served from a sub-path, set `vite: { base: "/sub-path/" }` in `vite.config.ts` before building.
