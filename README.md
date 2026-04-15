# NOVAVOX

> Music distribution and artist platform by [Nine Ruby Management](https://www.9ruby.com).

## Overview

NOVAVOX is a full-featured music distribution platform for independent artists. Features include artist profiles, release management, tour scheduling, and an admin dashboard. Powered by Gemini AI for intelligent music metadata and recommendations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** Google Gemini API
- **3D/Motion:** Three.js, Vanta, Motion (Framer Motion)
- **Audio:** Tone.js
- **UI:** shadcn/ui, Tailwind CSS 4, tsParticles
- **Storage:** Vercel Blob
- **Language:** TypeScript 5

## Getting Started

```bash
npm install
cp .env.example .env.local   # Add API keys
npm run dev                   # http://localhost:3000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |

## Project Structure

```
app/              # Next.js App Router pages and API routes
components/       # React components (player, admin, artists)
lib/              # Utilities and API helpers
types/            # TypeScript type definitions
public/           # Static assets, audio, images
```

## Deployment

Deployed to Vercel. Pushes to `main` trigger auto-deploy.

## License

Proprietary — Nine Ruby Management FZ-LLC
