# Trinadh Divvela — Portfolio

Personal portfolio for **Trinadh Divvela**, AI Product Manager & Builder. Live at **[trinadhdivvela.com](https://trinadhdivvela.com)**.

Built with [Next.js](https://nextjs.org) and [Once UI](https://once-ui.com), statically exported and deployed to GitHub Pages. Originally scaffolded from the [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template, then restructured into a single-page layout.

## Layout

The site is a single-page experience served at `/`:

- **Identity header** — avatar, name, role, location, social links, and a "Schedule a call" button.
- **Introduction** and **Work Experience** — the résumé content, rendered from `src/resources/content.tsx`.
- **Education**, **Skills**, and **Achievements** — driven by the same content file.
- **Projects** — a 3-up grid of case studies authored as MDX under `src/app/work/projects/`.
- **Blog** — the latest posts pulled live from Medium ([@trinadhdivvela](https://medium.com/@trinadhdivvela)) via RSS.

A fixed table of contents on the left links to each section. The header keeps a single **Home** tab plus a CV link and a theme (light/dark) toggle. The `/work` and `/blog` routes still exist for individual project and post pages, but are not shown in the nav.

## Getting started

Requires Node.js v18.17+.

```bash
npm install
npm run dev      # dev server at http://localhost:3000
```

Because the site is a static export (`output: "export"` in `next.config.mjs`), `next start` does not work. To preview the production build:

```bash
npm run build            # outputs to ./out
npx serve out            # serve the static export
```

## Editing content

| What | Where |
| --- | --- |
| Personal info, résumé, skills, achievements, social links | `src/resources/content.tsx` |
| Theme, colors, enabled routes, SEO base URL | `src/resources/once-ui.config.ts` |
| Project case studies | add a `.mdx` file to `src/app/work/projects/` |
| Blog posts | published on Medium; the home page fetches them automatically. Local `.mdx` posts under `src/app/blog/posts/` are also supported. |
| Icons | register in `src/resources/icons.ts` |

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes the `out/` directory to GitHub Pages. The custom domain is configured via `public/CNAME` (`trinadhdivvela.com`).

## Tech

- **Framework:** Next.js 16 (App Router, static export)
- **UI:** Once UI (`@once-ui-system/core`), Sass modules
- **Content:** MDX (`@next/mdx`, `next-mdx-remote`, `gray-matter`)
- **Tooling:** Biome (format), ESLint, TypeScript

## License

The underlying Magic Portfolio template is distributed under the CC BY-NC 4.0 License (attribution required, non-commercial). See [`LICENSE`](LICENSE) for details.
