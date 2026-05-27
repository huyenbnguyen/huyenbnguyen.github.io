# Personal Site — Backend Engineer

A clean, terminal-inspired personal website with **Resume**, **Projects**, and **Blog** sections. Built with TanStack Start + React + Tailwind v4. Designed to be edited as code and deployed for free on GitHub Pages.

## Editing your content

All content lives in plain TypeScript files — no CMS, no markdown loader, no magic:

| File | What's in it |
| --- | --- |
| `src/data/profile.ts` | Name, role, bio, experience, skills, education, social links |
| `src/data/projects.ts` | Side projects list |
| `src/data/posts.ts` | Blog posts (title, date, tags, body) |

Add a new blog post by appending an entry to the `posts` array — the route `/blog/:slug` picks it up automatically. Same for projects.

Post bodies support paragraphs, simple bullet lists (lines starting with `- `), and fenced code blocks (\`\`\`...\`\`\`).

## Local development

```bash
bun install
bun run dev
```

## Project structure

```
src/
  components/      Reusable UI (header, footer, section)
  data/            Your content lives here — edit these
  routes/          One file per page (TanStack Start file-based routing)
  styles.css       Design tokens (colors, fonts, radius)
```

## Deploying to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`. To enable it:

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow builds a fully-static site (`NITRO_PRESET=static`) and publishes `.output/public`.

If your repo is served from a sub-path (e.g. `username.github.io/my-site`), set the base path before building by adding to `vite.config.ts`:

```ts
export default defineConfig({
  vite: { base: "/my-site/" },
  tanstackStart: { server: { entry: "server" } },
});
```

Custom domain? Drop a `public/CNAME` file with your domain.

## Design

- Dark, terminal-inspired palette with a mint accent
- JetBrains Mono for code/labels, Inter for prose
- All colors are semantic tokens in `src/styles.css` — change the palette in one place

## License

MIT — make it yours.
