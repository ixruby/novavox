import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Philosophy — NOVAVOX",
  description:
    "A comprehensive guide to the NOVAVOX design system. Understanding the architecture, philosophy, and intention behind every visual decision.",
};

const colorTokens = [
  {
    name: "Background",
    hex: "#131313",
    meaning:
      "The void. Total creative absence that lets sound exist without visual noise. Like the silence before a performance — it makes everything else matter.",
  },
  {
    name: "Surface Lowest",
    hex: "#0E0E0E",
    meaning:
      "The deepest layer. Used for footers and grounding elements. Represents the foundation — the concrete floor of a Berlin warehouse where the music lives.",
  },
  {
    name: "Surface Low",
    hex: "#1B1B1B",
    meaning:
      "Secondary panels. A barely-there elevation that creates depth without brightness. Like the walls of a recording booth — present but invisible.",
  },
  {
    name: "Surface",
    hex: "#1F1F1F",
    meaning:
      "Card surfaces. The primary container for content. Think of it as the vinyl sleeve — it holds the art without competing with it.",
  },
  {
    name: "Surface High",
    hex: "#2A2A2A",
    meaning:
      "Elevated interactive elements. Buttons, hover states. Represents engagement — when the listener reaches out to touch the controls.",
  },
  {
    name: "Surface Highest",
    hex: "#353535",
    meaning:
      "Glass panels and overlays. The highest elevation. Like looking through a studio window — you can see through it, but you know the glass is there.",
  },
  {
    name: "Outline",
    hex: "#919191",
    meaning:
      "Secondary text and subtle borders. The whisper of the interface — information that's available but doesn't demand attention.",
  },
  {
    name: "Outline Variant",
    hex: "#474747",
    meaning:
      "The faintest structural lines. Dividers between sections. Like the grooves on a vinyl record — functional, invisible until you look closely.",
  },
  {
    name: "Primary",
    hex: "#FFFFFF",
    meaning:
      "Pure signal. Used only for headlines and primary actions. White on black = maximum contrast = maximum authority. This is the voice of NOVAVOX.",
  },
  {
    name: "On Primary",
    hex: "#1A1C1C",
    meaning:
      "Text on white elements. The inversion — when NOVAVOX speaks through action buttons, the dark text carries the weight of commitment.",
  },
  {
    name: "Error",
    hex: "#FFB4AB",
    meaning:
      "The only warm tone in the entire system. A deliberate disruption — like feedback in a quiet room. It demands correction.",
  },
];

const typographySystem = [
  {
    font: "Space Grotesk",
    role: "Headlines & Display",
    weights: "300 — 700",
    why: "Geometric sans-serif with architectural DNA. The letterforms are built on grids and mathematical precision — exactly how NOVAVOX approaches sound design. The wide weight range allows whisper-light titles (300) and commanding statements (700).",
  },
  {
    font: "Inter",
    role: "Body & Interface",
    weights: "300 — 600",
    why: "Designed specifically for screens. Inter is the most legible sans-serif at small sizes — critical because NOVAVOX uses 8-10px labels extensively. It disappears when you read it, which is exactly the point.",
  },
  {
    font: "Material Symbols",
    role: "Iconography",
    weights: "Outlined",
    why: "Google's variable icon system. Outlined style matches the wireframe aesthetic of the site — icons as blueprints, not illustrations. They suggest function without decorating.",
  },
];

const designRules = [
  {
    rule: "Zero Border Radius",
    visual: "border-radius: 0",
    explanation:
      "Every element is sharp-cornered. No rounded buttons, no soft cards, no friendly pills. This is brutalist architecture applied to UI — raw concrete, exposed steel, uncompromising edges. Rounded corners signal approachability. NOVAVOX signals precision.",
  },
  {
    rule: "Grayscale Photography",
    visual: "filter: grayscale(100%)",
    explanation:
      "All imagery is desaturated. Color is stripped away because NOVAVOX is about sound, not sight. The absence of color forces viewers to focus on form, texture, and composition — the visual equivalent of isolating a frequency.",
  },
  {
    rule: "Extreme Size Contrast",
    visual: "8px labels vs 12rem headlines",
    explanation:
      "The typography scale spans from near-invisible (8px system labels) to dominating (12rem hero text). This mirrors audio dynamics — from a barely audible whisper to a wall of sound. The contrast creates visual tension and hierarchy.",
  },
  {
    rule: "Wide Letter Tracking",
    visual: "tracking: 0.1em — 0.5em",
    explanation:
      "All labels are uppercase with extreme letter-spacing. This transforms words into visual patterns — they become architectural elements rather than just text. Each letter breathes, occupying space like sound fills a room.",
  },
  {
    rule: "Crosshair Cursor",
    visual: "cursor: crosshair",
    explanation:
      "The cursor is a targeting reticle, not an arrow or pointer. It says: you are navigating a spatial environment, not browsing a website. Every click is a coordinate, every movement is a vector.",
  },
  {
    rule: "Glass Morphism Panels",
    visual: "backdrop-blur: 40px",
    explanation:
      "The navigation bar and overlays use frosted glass effects — you can see through them but not clearly. This creates layers of depth, simulating the experience of looking through a studio control room window at the performers beyond.",
  },
  {
    rule: "Dot Grid Backgrounds",
    visual: "80px radial-gradient grid",
    explanation:
      "Subtle dot patterns create an underlying grid structure — like graph paper or a mixing console's LED matrix. It implies precision, measurement, and the mathematical foundation beneath the art.",
  },
  {
    rule: "Noise Texture Overlay",
    visual: "5% opacity grain",
    explanation:
      "A fine grain overlay across the entire site simulates the texture of analog equipment — like tape hiss or vinyl surface noise. It's the visual equivalent of analog warmth in a digital environment.",
  },
];

const pages = [
  {
    name: "Landing — 360 Spatial Canvas",
    route: "/",
    concept:
      "A 3x3 grid of viewport-sized portals. The visitor doesn't scroll — they navigate a spatial environment. Each portal is a window into a different aspect of NOVAVOX: manifesto, featured artist, coordinates, latest release, the central identity, tour circuit, journal, shop, and submissions.",
    intention:
      "This isn't a landing page — it's a territory. The oversized grid forces exploration over consumption. There is no 'fold' because there is no linear path. The visitor discovers NOVAVOX the way you discover a city: by wandering.",
    keyElements: [
      "9 portals arranged in a 3x3 spatial grid (300vw x 300vh)",
      "Central hero with 12rem NOVAVOX logotype",
      "Pulsing 'LIVE ARCHIVE ACTIVE' status indicator",
      "HUD overlays showing coordinates, encryption status, node IDs",
      "Email capture with minimal underline input design",
      "Berlin coordinates (52.5200N, 13.4050E) as identity markers",
    ],
  },
  {
    name: "Artist Roster",
    route: "/artists",
    concept:
      "A grid of artist portraits treated as archival specimens. Each card shows name, genre classification, geographic coordinates, and operational status (ACTIVE / ARCHIVED / EMERGING).",
    intention:
      "Artists aren't presented as personalities — they're presented as signal sources. The clinical treatment (coordinates, status codes, catalog numbers) elevates them from performers to architects of sound. The grayscale imagery strips away superficial identity.",
    keyElements: [
      "Responsive grid (1-4 columns) with hover-lift interaction",
      "Each artist card: grayscale image, name, genre, coordinates, status badge",
      "Status indicators: ACTIVE (white), ARCHIVED (muted), EMERGING (accent)",
      "Spatial HUD showing total roster count and registry status",
    ],
  },
  {
    name: "Artist Detail",
    route: "/artists/[slug]",
    concept:
      "A full immersion into a single artist's sonic world. Hero image spans full width, biography reads like a technical dossier, and the discography is presented as a catalog archive with track-level detail.",
    intention:
      "Each artist page is a standalone document — a dossier that treats the artist's work with archival seriousness. Track listings, credits, and streaming links are presented as technical data, not marketing content.",
    keyElements: [
      "Full-bleed hero with grayscale artist image",
      "Bio section with listener count and release statistics",
      "Social links (Instagram, SoundCloud, Bandcamp)",
      "Complete discography with expandable track listings",
      "Streaming platform links per release",
      "Integrated music player at bottom",
    ],
  },
  {
    name: "Releases Catalog",
    route: "/releases",
    concept:
      "The complete NOVAVOX output, cataloged and filterable. Every release has a catalog number (NVX001-NVX012), format classification, genre tag, and year. The interface enables precise retrieval.",
    intention:
      "A record label's catalog is its DNA. This page treats releases as specimens in an archive — searchable, sortable, classifiable. The multi-dimensional filtering (format + year + artist + sort) gives the visitor control over how they explore the archive.",
    keyElements: [
      "Format filter tabs: ALL / PHYSICAL / DIGITAL / SPATIAL",
      "Year and artist dropdown filters",
      "Sort options: newest, oldest, A-Z, Z-A",
      "Dynamic results count",
      "Empty state with clear-filters action",
      "4-column responsive grid with hover-lift cards",
    ],
  },
  {
    name: "Technical Objects Shop",
    route: "/shop",
    concept:
      "Products are 'technical objects' — not merchandise. Vinyl pressings are 'archival editions.' Equipment is 'spatial apparatus.' Everything is presented with engineering-grade specifications.",
    intention:
      "Commerce, but elevated. The shop doesn't sell products — it offers artifacts. The language of materials science (titanium alloy, borosilicate glass, anodized aluminum) transforms consumer goods into collectible instruments.",
    keyElements: [
      "Product cards with SKU numbers and material specifications",
      "Series classification system",
      "Technical specifications section",
      "Price display in EUR with clean typography",
      "'ADD TO ARCHIVE' as the call-to-action (not 'Add to Cart')",
    ],
  },
  {
    name: "Global Circuit",
    route: "/tours",
    concept:
      "Tour dates presented as a global network — nodes in a spatial circuit. The map visualization shows cities as connected signal points, not pins on a map.",
    intention:
      "A tour isn't a series of concerts — it's a network deployment. Each city is a 'node' in the NOVAVOX spatial network. The language (RESERVE vs. SOLD OUT, spatial features like '360 SPATIAL' and 'HAPTIC BASS') frames live events as technological experiences.",
    keyElements: [
      "Abstract network map with pulsing city nodes",
      "Schedule table with date, venue, features, and status",
      "RESERVE / SOLD OUT status badges",
      "Feature tags: 360 SPATIAL, HAPTIC BASS, IMMERSIVE",
      "Editorial section with tour photography",
    ],
  },
  {
    name: "Distribution & Submissions",
    route: "/distribution",
    concept:
      "The intake portal for new artists. NOVAVOX operates a 'sovereign distribution network' — it's not just a submission form, it's an application to join an institution.",
    intention:
      "By framing distribution as 'sovereign' and submissions as applications, NOVAVOX positions itself as a gatekeeper of quality. The bento grid layout presents capabilities and requirements as a technical specification document.",
    keyElements: [
      "Bento grid layout showing network capabilities",
      "Submission form with genre selection",
      "Technical guide carousel explaining the process",
      "Network map visualization",
      "Spatial HUD with system status indicators",
    ],
  },
  {
    name: "Sonic Journal",
    route: "/journal",
    concept:
      "Long-form essays and interviews about the intersection of sound, space, and architecture. Content is categorized as ESSAY, NOTE, or INTERVIEW — each with a different visual treatment.",
    intention:
      "The journal isn't a blog — it's a publication. Essays have issue numbers (ISSUE 042, 043...), read times, and author credits. The editorial treatment signals that NOVAVOX produces thought leadership, not content marketing.",
    keyElements: [
      "Featured article with large hero treatment",
      "Read time indicators on all entries",
      "Bento grid for archival notes (asymmetric layout)",
      "Interview section with portrait photography",
      "Social sharing and copy-link buttons",
      "Related articles recommendation engine",
      "Author bio snippets",
    ],
  },
  {
    name: "Payment Protocol",
    route: "/checkout",
    concept:
      "Checkout as a 'payment protocol' — not a shopping cart. The 3-column layout presents the transaction as a systematic process with clear stages.",
    intention:
      "Even commerce is treated as architecture. The checkout stepper (IDENTIFICATION > SHIPPING > PAYMENT > CONFIRMATION) and the clinical form layout make purchasing feel like authorizing a system operation, not shopping.",
    keyElements: [
      "3-column layout: stepper / form / summary",
      "4-stage checkout protocol",
      "Order summary with product thumbnails",
      "Clean form inputs with minimal borders",
      "Security indicators (AES-256 encryption reference)",
    ],
  },
  {
    name: "Spatial Player",
    route: "/player",
    concept:
      "A full-page audio player interface designed like a mixing console control panel. Track manifests, system components, and technical specifications are displayed as an instrument dashboard.",
    intention:
      "The player isn't embedded — it's the entire page. This frames listening as an intentional act, not background consumption. The technical HUD elements (bitrate, spatial channels, encoding) make the listener aware of the engineering behind the sound.",
    keyElements: [
      "Full-height hero with album artwork",
      "Track manifest with duration and catalog numbers",
      "System component grid (DAC, amplifier, spatial engine)",
      "Technical specifications panel",
      "Playback controls styled as hardware buttons",
    ],
  },
];

const hudElements = [
  {
    element: "Coordinates (52.5200N, 13.4050E)",
    meaning:
      "Berlin's exact GPS coordinates. Repeated throughout the site as an identity anchor. NOVAVOX doesn't just say it's from Berlin — it proves it with mathematical precision. The coordinates are a stamp of origin, like 'Made in Germany' but more granular.",
  },
  {
    element: "TRANS_VECTOR: READY",
    meaning:
      "A fictional system status. 'Transfer vector' implies data is ready to move — sound is ready to transmit. It frames the website as a live system, not a static document.",
  },
  {
    element: "NODE_ID: NVX-CENTRAL",
    meaning:
      "The website identifies itself as a node in a larger network. This implies NOVAVOX is distributed — it exists in multiple locations simultaneously, like a spatial audio signal.",
  },
  {
    element: "ENC_STATUS: AES-256-GCM",
    meaning:
      "References military-grade encryption. It suggests that NOVAVOX's audio and data are protected with the same technology used by intelligence agencies. The message: this content is valuable enough to encrypt.",
  },
  {
    element: "LIVE ARCHIVE ACTIVE",
    meaning:
      "The archive is always running. Content isn't published and forgotten — it's maintained, updated, alive. The pulsing indicator reinforces that this is a living system.",
  },
  {
    element: "Catalog Numbers (NVX001-NVX012)",
    meaning:
      "Every release has a unique identifier in the NOVAVOX cataloging system. This is standard for serious record labels — it implies institutional permanence and organizational rigor.",
  },
];

export default function DesignGuidePage() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 sm:px-12 bg-[#131313]/60 backdrop-blur-[40px] border-b border-white/5">
        <Link
          href="/"
          className="font-headline font-bold text-sm tracking-[0.3em] text-white uppercase"
        >
          NOVAVOX
        </Link>
        <span className="text-[9px] tracking-[0.3em] text-[#474747] uppercase">
          DESIGN PHILOSOPHY
        </span>
      </nav>

      <div className="pt-32 pb-24 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="mb-32">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
            DOCUMENT / 001
          </p>
          <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
            DESIGN
            <br />
            PHILOSOPHY
          </h1>
          <p className="text-sm sm:text-base text-[#919191] max-w-2xl mt-8 leading-relaxed">
            Every visual decision in NOVAVOX is intentional. This document explains the
            reasoning behind each design choice — from the color of a pixel to the
            architecture of a page. Nothing is decorative. Everything is structural.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <span
              className="w-1.5 h-1.5 bg-white animate-pulse"
              style={{ borderRadius: "9999px" }}
            />
            <span className="text-[9px] tracking-[0.3em] text-[#919191] uppercase">
              ARCHITECTURAL BRIEF — MARCH 2026
            </span>
          </div>
        </section>

        {/* Section 1: The Philosophy */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              01 / PHILOSOPHY
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-8">
              International Modernist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-sm text-[#919191] leading-relaxed mb-6">
                  NOVAVOX follows the <strong className="text-white">International Modernist</strong> design
                  philosophy — a movement rooted in Bauhaus architecture, Swiss typography,
                  and brutalist construction. The core belief: <em>form follows function, and
                  beauty emerges from precision.</em>
                </p>
                <p className="text-sm text-[#919191] leading-relaxed mb-6">
                  Every element serves a purpose. There are no decorative flourishes, no
                  gratuitous animations, no visual noise. The dark monochrome palette removes
                  color as a distraction. The severe typography commands attention. The spatial
                  layouts create an environment, not a page.
                </p>
                <p className="text-sm text-[#919191] leading-relaxed">
                  The result is a website that feels like walking into a contemporary art
                  gallery in Berlin — austere, intentional, and deeply considered. The visitor
                  doesn&apos;t consume content; they inhabit a space.
                </p>
              </div>
              <div className="space-y-6">
                <div className="border border-white/5 p-6">
                  <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-3">
                    DESIGN LINEAGE
                  </p>
                  <div className="space-y-3">
                    {[
                      "Bauhaus (1919) — Form follows function",
                      "Swiss Style (1950s) — Grid systems, clean typography",
                      "Brutalism (1960s) — Raw materials, exposed structure",
                      "International Typographic Style — Objective clarity",
                      "Berlin Techno Visual Culture — Dark, industrial, spatial",
                    ].map((item) => (
                      <p
                        key={item}
                        className="text-[10px] tracking-[0.15em] text-[#919191] border-b border-white/5 pb-3"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Color System */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              02 / COLOR SYSTEM
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              Monochrome Only
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              NOVAVOX uses zero chromatic color. The entire palette lives between pure black
              (#000000) and pure white (#FFFFFF). This is not a limitation — it&apos;s a statement.
              Sound has no color. Neither should its visual representation.
            </p>
            <div className="space-y-4">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className="grid grid-cols-1 sm:grid-cols-[120px_80px_1fr] gap-4 items-start border-b border-white/5 pb-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 border border-white/10 flex-shrink-0"
                      style={{ backgroundColor: token.hex }}
                    />
                    <span className="text-[10px] tracking-[0.2em] text-white uppercase">
                      {token.name}
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.15em] text-[#474747] font-mono">
                    {token.hex}
                  </span>
                  <p className="text-sm text-[#919191] leading-relaxed">{token.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Typography */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              03 / TYPOGRAPHY
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              Two Voices
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              NOVAVOX speaks with two typefaces. One commands. One informs. Together they
              create the full frequency range of visual communication — from a whisper to a
              shout.
            </p>
            <div className="space-y-8">
              {typographySystem.map((type) => (
                <div
                  key={type.font}
                  className="border border-white/5 p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h3
                      className={`text-2xl sm:text-3xl text-white ${
                        type.font === "Space Grotesk" ? "font-headline" : ""
                      }`}
                    >
                      {type.font}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                        {type.role}
                      </span>
                      <span className="text-[9px] tracking-[0.15em] text-[#474747]">
                        {type.weights}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[#919191] leading-relaxed">{type.why}</p>
                </div>
              ))}
            </div>

            {/* Typography Scale Demo */}
            <div className="mt-12 border border-white/5 p-6 sm:p-8">
              <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-8">
                SIZE SPECTRUM — FROM WHISPER TO WALL OF SOUND
              </p>
              <div className="space-y-6">
                <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    8px
                  </span>
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase">
                    SYSTEM STATUS — BARELY AUDIBLE. METADATA FOR THOSE WHO LOOK CLOSELY.
                  </span>
                </div>
                <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    10px
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase">
                    LABELS AND CATEGORIES — THE WORKHORSE. PRESENT BUT NOT DEMANDING.
                  </span>
                </div>
                <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    14px
                  </span>
                  <span className="text-sm text-[#919191]">
                    Body text. Readable, comfortable, informational. The frequency range where
                    most content lives.
                  </span>
                </div>
                <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    3rem
                  </span>
                  <span className="font-headline text-3xl font-light tracking-tight text-white">
                    Section Headings
                  </span>
                </div>
                <div className="flex items-end gap-4 border-b border-white/5 pb-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    5rem
                  </span>
                  <span className="font-headline text-5xl font-bold tracking-tighter text-white">
                    Page Titles
                  </span>
                </div>
                <div className="flex items-end gap-4">
                  <span className="text-[8px] tracking-[0.3em] text-[#474747] uppercase w-16 flex-shrink-0">
                    12rem
                  </span>
                  <span className="font-headline text-7xl sm:text-8xl font-bold tracking-tighter text-white/20">
                    HERO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Design Rules */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              04 / DESIGN RULES
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              The Eight Principles
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              These rules govern every pixel. They are non-negotiable — breaking any one of
              them would compromise the architectural integrity of the entire system.
            </p>
            <div className="space-y-6">
              {designRules.map((rule, i) => (
                <div key={rule.rule} className="border border-white/5 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] tracking-[0.2em] text-[#474747]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-headline text-xl font-medium text-white">
                        {rule.rule}
                      </h3>
                    </div>
                    <code className="text-[9px] tracking-[0.1em] text-[#474747] mt-2 sm:mt-0">
                      {rule.visual}
                    </code>
                  </div>
                  <p className="text-sm text-[#919191] leading-relaxed">{rule.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Spatial HUD System */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              05 / SPATIAL HUD
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              The Interface Language
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              Throughout the site, small text overlays display system information — coordinates,
              encryption status, node identifiers. These aren&apos;t functional readouts. They&apos;re a
              design language that frames NOVAVOX as a living system, not a static website.
            </p>
            <div className="space-y-4">
              {hudElements.map((hud) => (
                <div
                  key={hud.element}
                  className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 border-b border-white/5 pb-4"
                >
                  <code className="text-[10px] tracking-[0.15em] text-[#474747] font-mono">
                    {hud.element}
                  </code>
                  <p className="text-sm text-[#919191] leading-relaxed">{hud.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Page Architecture */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              06 / PAGE ARCHITECTURE
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              10 Spaces, 10 Intentions
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              Each page is designed as a distinct architectural space with its own purpose,
              layout logic, and emotional tone. Together, they form a complete environment.
            </p>
            <div className="space-y-12">
              {pages.map((page, i) => (
                <div key={page.route} className="border border-white/5 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] tracking-[0.2em] text-[#474747]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-headline text-xl sm:text-2xl font-medium text-white">
                        {page.name}
                      </h3>
                    </div>
                    <Link
                      href={page.route}
                      className="text-[9px] tracking-[0.2em] text-[#474747] hover:text-white transition-colors uppercase mt-2 sm:mt-0"
                    >
                      {page.route} →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-3">
                        CONCEPT
                      </p>
                      <p className="text-sm text-[#919191] leading-relaxed mb-6">
                        {page.concept}
                      </p>
                      <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-3">
                        INTENTION
                      </p>
                      <p className="text-sm text-[#919191] leading-relaxed">{page.intention}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-3">
                        KEY ELEMENTS
                      </p>
                      <div className="space-y-2">
                        {page.keyElements.map((el) => (
                          <div
                            key={el}
                            className="flex items-start gap-3 border-b border-white/5 pb-2"
                          >
                            <span className="text-[#474747] mt-0.5">+</span>
                            <span className="text-[10px] tracking-[0.1em] text-[#919191]">
                              {el}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Technical Decisions */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              07 / TECHNICAL FOUNDATION
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              Built for Performance
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              The technical stack is as considered as the visual design. Every framework and
              tool was chosen for a specific architectural reason.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  tech: "Next.js 16",
                  reason:
                    "Static generation for instant page loads. Server components for SEO. App Router for modern routing patterns. The fastest React framework for production.",
                },
                {
                  tech: "Tailwind CSS 4",
                  reason:
                    "Utility-first CSS that compiles to the smallest possible stylesheet. Zero runtime overhead. Every class is meaningful, nothing is wasted.",
                },
                {
                  tech: "TypeScript",
                  reason:
                    "Type safety across the entire codebase. Every artist, release, product, and tour event is typed — preventing data errors before they reach the browser.",
                },
                {
                  tech: "Static Data Architecture",
                  reason:
                    "No database, no CMS, no API calls. All content is compiled at build time, resulting in zero-latency page loads and perfect reliability. The site is its own archive.",
                },
                {
                  tech: "Vercel Edge Network",
                  reason:
                    "Deployed globally on Vercel's CDN. Every visitor gets content from their nearest data center. Sub-100ms load times worldwide.",
                },
                {
                  tech: "Intersection Observer Animations",
                  reason:
                    "Scroll-triggered animations use the browser's native IntersectionObserver API — no JavaScript animation libraries, no layout thrashing, no jank.",
                },
              ].map((item) => (
                <div key={item.tech} className="border border-white/5 p-6">
                  <h3 className="font-headline text-lg text-white mb-3">{item.tech}</h3>
                  <p className="text-sm text-[#919191] leading-relaxed">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Accessibility */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              08 / ACCESSIBILITY
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              Precision for Everyone
            </h2>
            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mb-12">
              Brutalist design doesn&apos;t mean inaccessible design. NOVAVOX implements comprehensive
              accessibility features that make the spatial experience available to all users.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { feature: "Skip Navigation", detail: "Keyboard shortcut to bypass nav and reach content instantly" },
                { feature: "ARIA Labels", detail: "Every interactive element is labeled for screen readers" },
                { feature: "Focus Indicators", detail: "2px white outline on all focusable elements for keyboard users" },
                { feature: "Image Alt Text", detail: "Meaningful descriptions on all images, not just filenames" },
                { feature: "Semantic HTML", detail: "Proper heading hierarchy (h1-h6), landmarks, and roles" },
                { feature: "44px Touch Targets", detail: "All buttons and links meet minimum size for mobile interaction" },
                { feature: "Keyboard Navigation", detail: "Full site traversal without a mouse" },
                { feature: "Color Contrast", detail: "White on dark backgrounds exceeds WCAG AA 4.5:1 ratio" },
                { feature: "Responsive Design", detail: "Adapts from 390px mobile to 2560px ultrawide displays" },
              ].map((item) => (
                <div key={item.feature} className="border border-white/5 p-4">
                  <p className="text-[10px] tracking-[0.2em] text-white uppercase mb-2">
                    {item.feature}
                  </p>
                  <p className="text-[11px] text-[#919191] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: SEO & Discoverability */}
        <section className="mb-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              09 / DISCOVERABILITY
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              Found, Not Searched
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { feature: "Per-Page Meta Tags", detail: "Unique title and description for every route — 10 pages, 10 distinct search results." },
                { feature: "Open Graph Protocol", detail: "Rich previews when shared on Twitter, LinkedIn, Slack, Discord. Every share looks intentional." },
                { feature: "XML Sitemap", detail: "22 URLs submitted to search engines (10 pages + 12 artist routes). Auto-generated, always current." },
                { feature: "Dynamic Artist SEO", detail: "Each artist page generates its own meta tags from their data — name, genre, bio, and image." },
              ].map((item) => (
                <div key={item.feature} className="border border-white/5 p-6">
                  <p className="text-[10px] tracking-[0.2em] text-white uppercase mb-3">
                    {item.feature}
                  </p>
                  <p className="text-sm text-[#919191] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="border-t border-white/5 pt-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
              CONCLUSION
            </p>
            <h2 className="font-headline text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight mb-8">
              Every pixel is a <em className="italic font-normal">decision</em>.
              <br />
              Every decision is <em className="italic font-normal">architecture</em>.
            </h2>
            <p className="text-sm text-[#919191] leading-relaxed mb-6">
              NOVAVOX is not a website — it is an environment. The monochrome palette, the
              brutalist typography, the spatial HUD overlays, the zero-radius geometry — these
              are not aesthetic preferences. They are the visual translation of what NOVAVOX
              does with sound: strip away the unnecessary, expose the structure, and let the
              architecture speak.
            </p>
            <p className="text-sm text-[#919191] leading-relaxed mb-12">
              The site is designed to be lived in, not looked at. Every interaction, from
              filtering releases to navigating the spatial canvas, reinforces the core
              proposition: NOVAVOX is where sound becomes architecture.
            </p>
            <Link
              href="/"
              className="inline-block text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#1A1C1C] transition-all"
            >
              ENTER THE ARCHIVE
            </Link>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/5 mt-24 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-[8px] tracking-[0.2em] text-[#474747] uppercase">
            NOVAVOX DESIGN DOCUMENT — V1.0
          </span>
          <span className="text-[8px] tracking-[0.2em] text-[#474747] uppercase">
            PREPARED BY IX RUBY AGENCY
          </span>
        </div>
      </div>
    </div>
  );
}
