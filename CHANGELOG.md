# NOVAVOX — Project Changelog

> Client: Kaushik Jayakumar | Agency: IX Ruby Agency
> Project: Novavox Production House Website
> Stack: Next.js 16 + React 19 + Tailwind CSS 4 + Tone.js
> Date: 2026-03-30

---

## v2.0 — Client Edit Implementation (Current)

Content changes based on client feedback document `NOVAVOX_v1_client_edit.pdf`.
Original spatial design preserved. Only content/copy changed per client request.

### Design Approach

- **Design preserved**: Original Space Grotesk + Inter + dark theme kept intact
- **Logo**: Client's actual NV monogram logo (black & white) added to hero
- **Interactive canvas**: Changed from "grid" to "parametric" mode for flowing curved lines
- **Layout**: Vertical scroll single-page with anchor navigation (Home, Services, Portfolio, About, Contact)
- **Scroll reveals**: Added IntersectionObserver-based reveal animations for polish

### Client Requirements → Implementation Map

| Client Request (PDF) | Screen | Implementation | File |
|----------------------|--------|----------------|------|
| "NOVAVOX WITH LOGO" | 1 | NOVAVOX wordmark in nav + hero, Playfair Display serif | `app/page.tsx` |
| "TIME NOT NEEDED" | 1 | Removed UTC clock, coordinate HUD, all spatial metadata | `app/page.tsx` |
| "CART NOT NEEDED" | 1 | Removed shopping_bag icon from nav | `app/page.tsx` |
| "MENU BUTTON — MAKE IT FUNCTIONAL" | 1 | Full-screen mobile menu overlay with smooth transitions | `components/MobileMenu.tsx` |
| Menu: Home, Services, Portfolio, About, Contact | 1 | Both desktop inline nav + mobile overlay nav | `app/page.tsx`, `MobileMenu.tsx` |
| Tagline: "WHERE IDEAS BECOME CINEMATIC REALITIES" | 1 | Below hero title with accent line ornaments | `app/page.tsx` |
| Advertising & Commercials | 2 | Service card I — exact client copy | `app/page.tsx` |
| Film & Video Production | 2 | Service card II — exact client copy | `app/page.tsx` |
| Post Production | 2 | Service card III — exact client copy | `app/page.tsx` |
| Music Videos & Audios | 3 | Service card IV — exact client copy | `app/page.tsx` |
| About — Founder bio | 4 | Kaushik Jayakumar section with 100+ projects, 15+ languages stats | `app/page.tsx` |
| OUR TEAM description | 4 | IMDB-rated, award-winning team section | `app/page.tsx` |
| Our Vision quote | 4 | Blockquote with italic serif styling | `app/page.tsx` |
| "Let's Create Something Cinematic Together" | 3→Last | Contact CTA section with gold accent buttons | `app/page.tsx` |
| [Start a Project] button | Last | mailto link to kaushik2002.22@gmail.com | `app/page.tsx` |
| [WhatsApp Us] button | Last | Direct wa.me/916282725324 link | `app/page.tsx` |
| Phone: +91 62827 25324 | Last | Clickable tel: link | `app/page.tsx` |
| Email: kaushik2002.22@gmail.com | Last | Clickable mailto: link | `app/page.tsx` |
| Supporting Emerging Artists | 6 | Dedicated section with artist roster list | `app/page.tsx` |
| Portfolio — Music, Ads, Films | 7 | Grid with category filter tabs + search bar | `app/page.tsx` |
| Search bar | 7 | Input with search icon, focus state accent | `app/page.tsx` |
| Remove studio gallery | 7 | Removed — only portfolio cards remain | `app/page.tsx` |

### Agency Creative Additions (Beyond Client Brief)

| Addition | Rationale |
|----------|-----------|
| Interactive Tone.js audio canvas (hero) | Unique differentiator — no competitor has audio-reactive visuals. Reinforces "sound + cinema" brand. |
| Film grain overlay (animated) | Cinematic texture. Subtle (3.5% opacity) but adds analog warmth. |
| Scroll-triggered reveal animations | Professional feel. IntersectionObserver-based, performant, no JS library bloat. |
| Gold accent system (`#C8A97E`) | Prestige signaling. Production houses use warm metallics, not cold whites. |
| Playfair Display serif headlines | Cinematic gravitas. Serif fonts signal authority, craft, and filmmaking heritage. |
| Warm cream text (`#E8E2D6`) | Filmic warmth. Pure white is digital/cold; cream reads as projected light. |
| Cinematic vignette on hero | Radial gradient darkening edges — mimics camera lens vignetting. |
| Staggered service cards with hover image reveal | Editorial layout pattern. Images go from B&W to color on hover — "bringing ideas to life". |
| Contact section ambient glow | Subtle gold radial gradient at top — draws eye to CTA without being aggressive. |

---

## v1.0 — Content Pivot (Archived)

Quick content swap from record label to production house. Same brutalist aesthetic.
Commit: `5f1277e`

---

## v0.0 — Original (Record Label)

Spatial 3x3 grid layout. Fictional record label "Sonic Gallery — Est. Berlin, 2019".
Prototype reference: https://novavox-stitch.vercel.app/
