# DAO Ships — Marketing, Docs & Education Site

The front door to **DAO Ships**, the DAO launchpad for Quai Network. Turns curious
visitors into founders, members, and builders, then funnels them into the dapp.

See [`PLAN.md`](./PLAN.md) for the full strategy, sitemap, content outline, and roadmap.

## Stack

- **Next.js 16** (App Router, Turbopack build) · **React 19.2** · **TypeScript**
- **Tailwind CSS 3.4** — design tokens ported from `daoships-app` (indigo/cyan helm system,
  with Quai-red ecosystem accents)
- **Light + dark themes** — `dao-*` palette is channel-based CSS vars that flip on a `.dark`
  class. Defaults to the user's system preference (no-flash inline script in `app/layout.tsx`),
  with a single toggle in the nav (`components/ThemeToggle.tsx`) that persists to `localStorage`.
- **Framer Motion** for scroll reveals · **lucide-react** icons
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- Live stats via the DAO Ships **Supabase** indexer (graceful fallback when unconfigured)
- Deploys on **Vercel**

> Security: on **Next 16.2.7** with a `postcss` override (`^8.5.15`) — `npm audit` reports
> **0 vulnerabilities**. MDX remark/rehype plugins are configured by **string name** (not
> imported functions) so the pipeline is serializable for Turbopack.

## Develop

```bash
npm install
cp .env.example .env.local   # optional: wire up live stats + app URL
npm run dev                  # http://localhost:3000
npm run build && npm run start
```

## Status (Phases 0–5 complete)

- ✅ Project scaffold, design tokens, fonts, brand assets
- ✅ Site shell: sticky nav + ecosystem footer
- ✅ Landing page: hero, explainer, why, treasury differentiator, use-case selector,
  security strip, builders strip, CTA — with live indexer stat strip
- ✅ `/why` (vs Moloch/Baal/Zodiac comparison) and `/security` (audit + hardening) pages
- ✅ `/use-cases` (interactive template selector)
- ✅ **MDX docs system** — sidebar nav, breadcrumb, prev/next pager, `Callout` component,
  themed prose. 17 pages across Concepts (7), Guides (5), Developers (5), and FAQ.
  Source-accurate contract addresses pulled from `deployment-addresses.json`.
- ✅ **`/learn` — "Take the Helm"**: scroll-driven, interactive explainers in 3 chapters
  (crew & tokens with live delegation; proposal lifecycle with an interactive vote/quorum
  demo; treasury flow + ragequit with a retention floor). Sticky visuals, chapter-progress
  nav, cross-linked to the concept docs. `components/learn/*`.
- ✅ **`/features`** — full product tour (Governance · Treasury · Navigators · Transparency),
  with the 8 proposal types and doc links.
- ✅ **Use-case sub-pages** — `/use-cases/[template]` (startup, community, protocol, investment,
  agent), SSG-prerendered from `lib/templates.ts` (the single source of truth, also feeding the
  selector): governance table, suggested navigators, key decisions, and pre-filled launch links.

All planned pages are now real content. No placeholders remain.
- ✅ **Polish**: docs code **syntax highlighting** (shiki / `rehype-pretty-code`), docs
  **Cmd-K search** (`components/docs/DocsSearch.tsx`, index in `lib/docs.ts`), **SEO**
  (`app/sitemap.ts`, `app/robots.ts`, dynamic `app/opengraph-image.tsx`, `app/manifest.ts`,
  theme-color), **accessibility** (skip link + `main` landmark, `aria-current` nav, `aria-live`
  on interactive visuals), and a reduced-motion-aware **hero starfield** (`components/landing/Starfield.tsx`).

## Docs

Pages live as `app/docs/<section>/<slug>/page.mdx`. Navigation/order is defined once in
`lib/docs.ts` (drives sidebar, breadcrumbs, and pager). Shared MDX rendering + the `<Callout>`
component are wired through `mdx-components.tsx`; prose is themed via `.prose-dao` in
`app/globals.css`. To add a page: create the `.mdx` file and add it to `lib/docs.ts`.

## Remaining / optional

- Wire **live indexer stats** — set `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` (hook in `lib/stats.ts`).
- Point CTAs at the real app/docs hosts via `NEXT_PUBLIC_APP_URL`.
- Optional: a **blog** (MDX), analytics, and a deeper interactive `/learn` sandbox (the original
  "Take the Helm" simulator — outline preserved in `PLAN.md` §4).

## Project structure

```
app/            routes (landing + why/security/use-cases + outline pages)
components/     Nav, Footer, Logo, PageHeader, Reveal, ComingSoon, landing/*
lib/            site config, marketing content, indexer stats fetcher
public/logos/   ship's-helm brand assets (from daoships-app)
```
