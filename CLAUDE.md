@AGENTS.md

# NovaVox

Music/audio creative platform with AI integration. Large surface area — many content-focused routes.

## Quick Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # next build
npm run start        # Production server
npm run lint         # ESLint
```

## Stack

- **Framework:** Next.js 16.2.1, React 19.2.4, TypeScript 5
- **Styling:** Tailwind CSS 4
- **AI:** Google Gemini API

## Architecture

```
app/                 # Root app directory (NOT src/app/)
  artist/            # Single artist page
  artists/           # Artists listing
  brutalism/         # Brutalist design showcase
  catalog/           # Music catalog
  checkout/          # Purchase flow
  design/            # Design showcase
  distribution/      # Distribution info
  gallery/           # Visual gallery
  integration/       # Integration info
  journal/           # Blog/journal
  narrative/         # Story/narrative content
  player/            # Audio player
  releases/          # Music releases
  shop/              # Merchandise shop
  tours/             # Tour dates/info
  sitemap.ts         # Dynamic sitemap
lib/                 # Shared utilities (root level)
```

## Key Files

- `app/layout.tsx` — Root layout
- `app/sitemap.ts` — Dynamic sitemap generation
- `lib/` — Utility functions and Gemini API helpers

## Conventions

- Path alias: `@/*` maps to `./*` (project root, not src/)
- Uses root `app/` directory — there is no `src/` folder
- Minimal dependencies — mostly Next.js + Tailwind
- Content-heavy routes — each route is a distinct content section

## Environment Variables

```env
GEMINI_API_KEY=      # Google Gemini API key for AI features
APP_URL=             # Application URL (used in sitemap, meta tags)
```

## Gotchas

- Uses root `app/` NOT `src/app/` — imports use `@/lib/` resolving to `./lib/`
- Gemini API key required for AI features — app may partially work without it
- Large route surface area (15+ routes) — check existing routes before adding new ones
- `sitemap.ts` at app root generates dynamic sitemap — update when adding routes
- No database configured — content is static or API-driven
