"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { artists as defaultArtists, releases as defaultReleases, portfolioWorks as defaultPortfolioWorks, tourEvents as defaultTourEvents, journalEntries as defaultJournalEntries, products as defaultProducts } from "@/lib/data";
import type { Artist, Release, PortfolioWork, TourEvent, JournalEntry, Product } from "@/lib/data";
import { defaultSettings, type SiteSettings } from "@/lib/site-settings";

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.04), transparent 40%)` }}
    />
  );
}

/* ─── Reveal on scroll ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">{number}</span>
      <div className="w-12 h-[1px] bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">{label}</span>
    </div>
  );
}

/* ─── Stats counter ─── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="font-headline text-3xl md:text-5xl font-bold text-white tracking-tight">{value}</span>
      <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/25 mt-2">{label}</span>
    </div>
  );
}

function extractScriptSrcs(embedCode: string): string[] {
  const urls: string[] = [];
  const re = /<script[^>]*\ssrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi;
  let match: RegExpExecArray | null = null;
  while ((match = re.exec(embedCode))) {
    const url = match[1]?.trim();
    if (url && !urls.includes(url)) urls.push(url);
  }
  return urls;
}

function stripScriptTags(embedCode: string): string {
  return embedCode.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

function InstagramWidgetEmbed({ embedCode }: { embedCode: string }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render on changes.
    setKey((k) => k + 1);
  }, [embedCode]);

  useEffect(() => {
    const srcs = extractScriptSrcs(embedCode);
    srcs.forEach((src) => {
      if (document.querySelector(`script[data-novavox-ig-widget="1"][src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.defer = true;
      s.setAttribute("data-novavox-ig-widget", "1");
      document.body.appendChild(s);
    });
  }, [embedCode]);

  const html = stripScriptTags(embedCode);
  if (!html) return null;

  return (
    <div key={key} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

type InstagramPost = {
  id: string;
  shortcode: string;
  displayUrl: string;
  thumbnailUrl: string;
  isVideo: boolean;
  caption: string;
  timestamp: number;
};

function InstagramPostsGrid({ username, limit }: { username: string; limit: number }) {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPosts(null);
    setError(null);

    const u = (username || "").trim();
    if (!u) {
      setPosts([]);
      return;
    }

    fetch(`/api/instagram/posts?username=${encodeURIComponent(u)}&limit=${encodeURIComponent(String(limit || 12))}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.error) {
          setError(String(d.error));
          setPosts([]);
          return;
        }
        setPosts(Array.isArray(d?.posts) ? d.posts : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e));
        setPosts([]);
      });

    return () => {
      cancelled = true;
    };
  }, [username, limit]);

  if (!posts) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 gap-[1px] bg-white/5">
        {Array.from({ length: Math.min(limit || 12, 12) }).map((_, i) => (
          <div key={i} className="aspect-square bg-white/[0.03] animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10">
        <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase">Instagram feed unavailable</div>
        <div className="mt-2 text-[11px] text-white/20 font-mono break-words">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-[1px] bg-white/5">
      {posts.slice(0, limit || 12).map((p) => (
        <a
          key={p.id}
          href={`https://www.instagram.com/p/${p.shortcode}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500"
          aria-label="Open Instagram post"
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={p.thumbnailUrl || p.displayUrl}
              alt={p.caption || "Instagram post"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            {p.isVideo && (
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5">
                <span className="font-mono text-[7px] tracking-widest text-white/40">VIDEO</span>
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
export default function LandingPage() {
  const [artists, setArtists] = useState<Artist[]>(defaultArtists);
  const [releases, setReleases] = useState<Release[]>(defaultReleases);
  const [portfolioWorks, setPortfolioWorks] = useState<PortfolioWork[]>(defaultPortfolioWorks);
  const [tourEvents, setTourEvents] = useState<TourEvent[]>(defaultTourEvents);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(defaultJournalEntries);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(d => {
      if (d.artists) setArtists(d.artists);
      if (d.releases) setReleases(d.releases);
      if (d.portfolioWorks) setPortfolioWorks(d.portfolioWorks);
      if (d.tourEvents) setTourEvents(d.tourEvents);
      if (d.journalEntries) setJournalEntries(d.journalEntries);
      if (d.products) setProducts(d.products);
      if (d.settings) setSettings(prev => ({
        ...prev,
        ...d.settings,
        pages: { ...prev.pages, ...d.settings?.pages },
        navigation: d.settings?.navigation || prev.navigation,
        social: {
          ...prev.social,
          ...d.settings?.social,
          instagram: { ...prev.social.instagram, ...d.settings?.social?.instagram },
        },
        contact: { ...prev.contact, ...d.settings?.contact, buttons: d.settings?.contact?.buttons || prev.contact.buttons },
        footer: { ...prev.footer, ...d.settings?.footer },
        seo: { ...prev.seo, ...d.settings?.seo },
      }));
    }).catch(() => {});
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  const activeArtists = artists.filter(a => a.status === "ACTIVE");
  const featuredReleases = releases.slice(0, 6);
  const featuredWorks = portfolioWorks.slice(0, 8);
  const upcomingTours = tourEvents.filter(t => t.status === "RESERVE");

  const phoneDigits = (settings.contact.phone || "").replace(/[^\d]/g, "");
  const whatsappDigits = (settings.contact.whatsapp || "").replace(/[^\d]/g, "");

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <CursorGlow />

      {/* ═══ NOISE OVERLAY ═══ */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ═══ FIXED NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/novavox-mark-512.png" alt="Novavox" width={28} height={28} className="opacity-80" />
            <span className="text-sm font-black tracking-[0.3em] text-white font-headline uppercase">NOVAVOX</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {settings.navigation.filter(link => {
              if (!link.visible) return false;
              const pageKey = link.href.replace(/^[#/]/, '');
              return !settings.pages[pageKey] || settings.pages[pageKey].visible !== false;
            }).map(link => (
              <Link key={link.label} href={link.href} className="nav-link font-mono text-[9px] tracking-[0.25em] text-white/40 hover:text-white transition-colors uppercase">
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="#contact" className="hidden md:block font-mono text-[9px] tracking-[0.25em] text-white/60 border border-white/15 px-5 py-2.5 hover:bg-white hover:text-black transition-all uppercase">
            START A PROJECT
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — Full viewport cinematic intro
      ═══════════════════════════════════════════ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video-like gradient animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)", backgroundSize: "200% 200%" }}
          />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "120px 120px" }} />
          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/40" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/40" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ scale: 0.8, filter: "blur(20px)", opacity: 0 }} animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}>
            <Image src="/novavox-mark-512.png" alt="Novavox" width={512} height={512} className="w-[220px] sm:w-[300px] md:w-[380px] mx-auto opacity-90 drop-shadow-2xl" priority />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.5em] text-white/30 mt-8 uppercase"
          >
            Where Ideas Become Cinematic Realities
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center gap-8 md:gap-14 mt-12"
          >
            {["FILM", "ADVERTISING", "POST PRODUCTION", "MUSIC"].map((s) => (
              <span key={s} className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/20">{s}</span>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[8px] tracking-[0.4em] text-white/20 uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-[1px] h-6 bg-white/20" />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          STATS BAR — Credibility at a glance
      ═══════════════════════════════════════════ */}
      <section className="border-y border-white/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-white/5">
              {settings.stats.map((s, i) => (
                <div key={i} className="md:px-10 first:md:pl-0 last:md:pr-0">
                  <Stat value={s.value} label={s.label} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — What we do
      ═══════════════════════════════════════════ */}
      <section id="services" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="001" label="What We Do" />
            <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9] mb-16">
              Our<br />Services
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
            {[
              { n: "001", t: "Advertising & Commercials", d: "Visually captivating ads with strong brand connection — crafted for digital, television, and corporate campaigns. From storyboards to final output.", icon: "campaign" },
              { n: "002", t: "Film & Video Production", d: "Cinematic storytelling from concept to completion — including scripting, direction, cinematography, editing, and DI. Feature films, short films, branded content.", icon: "movie" },
              { n: "003", t: "Post Production", d: "Premium post workflows that elevate your visuals and sound. DI, re-recording mix, spatial audio, and audio restoration.", icon: "tune" },
              { n: "004", t: "Music Videos & Audio", d: "High-end production for artists who want their sound to look as good as it feels. Concept creation, shooting, editing, DI, and sound mastering.", icon: "music_note" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="group bg-black/40 p-8 md:p-10 hover:bg-white/[0.03] transition-colors duration-500 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-[9px] text-white/15 tracking-[0.2em]">{s.n}</span>
                    <span className="material-symbols-outlined text-white/10 text-[28px] group-hover:text-white/25 transition-colors">{s.icon}</span>
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4">{s.t}</h3>
                  <p className="text-[12px] text-white/30 leading-relaxed group-hover:text-white/45 transition-colors">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTFOLIO — Our work
      ═══════════════════════════════════════════ */}
      {settings.pages.portfolio?.visible !== false && (
      <section id="portfolio" className="py-24 md:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="002" label="Selected Work" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Portfolio
              </h2>
              <Link href="/work/m-001" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                VIEW ALL WORK <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          {/* Featured large work */}
          <Reveal>
            <Link href={`/work/${featuredWorks[0].id}`} className="group block relative aspect-[21/9] overflow-hidden mb-[1px]">
              <Image src={featuredWorks[0].image} alt={featuredWorks[0].title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/40 mb-3 block">{featuredWorks[0].category} — {featuredWorks[0].year}</span>
                <h3 className="font-headline text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">{featuredWorks[0].title}</h3>
                <p className="text-[11px] text-white/35 mt-2 max-w-xl">{featuredWorks[0].description}</p>
              </div>
            </Link>
          </Reveal>

          {/* Grid of works */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5">
            {featuredWorks.slice(1, 7).map((work, i) => (
              <Reveal key={work.id} delay={Math.min(i * 0.06, 0.3)}>
                <Link href={`/work/${work.id}`} className="group block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={work.image} alt={work.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[7px] uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/50">{work.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-headline text-sm font-bold uppercase tracking-tight text-white mb-1">{work.title}</h3>
                    <p className="text-[10px] text-white/25 line-clamp-2 group-hover:text-white/40 transition-colors">{work.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          ARTISTS — Featured roster
      ═══════════════════════════════════════════ */}
      {settings.pages.artists?.visible !== false && (
      <section className="py-24 md:py-36 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="003" label="Artist Roster" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Artists
              </h2>
              <Link href="/artists" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                VIEW ALL {artists.length} ARTISTS <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          {/* Artist feature rows */}
          <div className="border-t border-white/5">
            {activeArtists.slice(0, 8).map((artist, i) => (
              <Reveal key={artist.slug} delay={Math.min(i * 0.05, 0.3)}>
                <Link href={`/artist/${artist.slug}`} className="group flex items-center justify-between py-5 md:py-6 border-b border-white/5 hover:bg-white/[0.02] hover:px-4 transition-all duration-500">
                  <div className="flex items-center gap-5 md:gap-8">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden flex-shrink-0">
                      <Image src={artist.image} alt={artist.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="64px" />
                    </div>
                    <div>
                      <span className="font-headline text-sm md:text-base font-bold uppercase tracking-tight text-white block group-hover:translate-x-1 transition-transform duration-500">{artist.name}</span>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">{artist.genre}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="hidden md:block font-mono text-[9px] text-white/15 tracking-widest">{artist.coordinates}</span>
                    <span className="font-mono text-[9px] text-white/20 tracking-widest">{artist.listeners}</span>
                    <span className="material-symbols-outlined text-white/15 text-[16px] group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-500">arrow_forward</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          RELEASES — Latest catalog
      ═══════════════════════════════════════════ */}
      {settings.pages.releases?.visible !== false && (
      <section className="py-24 md:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="004" label="Latest Releases" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Releases
              </h2>
              <Link href="/releases" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                FULL CATALOG <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-white/5">
            {featuredReleases.map((release, i) => (
              <Reveal key={release.catalogNumber} delay={Math.min(i * 0.06, 0.3)}>
                <Link href="/releases" className="group block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={release.image} alt={release.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 16vw" />
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-white/40">{release.catalogNumber}</span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-white/30">{release.format}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-headline text-[11px] font-bold uppercase tracking-tight text-white truncate">{release.title}</h3>
                    <span className="font-mono text-[8px] text-white/20 tracking-widest">{release.artist}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          INSTAGRAM — Social feed embed
      ═══════════════════════════════════════════ */}
      {settings.social?.instagram?.enabled !== false && (
      <section className="py-24 md:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="004" label="Instagram" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Instagram
              </h2>
              <a
                href={`https://www.instagram.com/${settings.social.instagram.username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group"
              >
                OPEN PROFILE <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </Reveal>

          <div className="border border-white/10 bg-black/40 overflow-hidden">
            {settings.social.instagram.embedMode === "posts" ? (
              <InstagramPostsGrid username={settings.social.instagram.username} limit={settings.social.instagram.postsLimit || 12} />
            ) : (
              <div className="aspect-[16/9] md:aspect-[21/9]">
                {settings.social.instagram.embedMode === "widget" && settings.social.instagram.widgetEmbedCode ? (
                  <div className="w-full h-full p-6 md:p-10">
                    <InstagramWidgetEmbed embedCode={settings.social.instagram.widgetEmbedCode} />
                  </div>
                ) : (
                  <iframe
                    title="NOVAVOX Instagram"
                    src={`https://www.instagram.com/${settings.social.instagram.username}/embed`}
                    className="w-full h-full"
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture; fullscreen"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          ABOUT — Who we are
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-36 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="005" label="Who We Are" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white leading-[0.9] mb-10">
                  About<br />Novavox
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  We&apos;re not just a team — we&apos;re a collective built on trust, freedom, and creativity focused on Quality.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-xs text-white/30 leading-relaxed mb-8">
                  <span className="text-white/50">Novavox</span> was founded by{" "}
                  <span className="text-white/50">Kaushik Jayakumar</span>, an accomplished audio engineer and music producer who has worked on over{" "}
                  <span className="text-white/50">100+ international and Indian projects</span> across{" "}
                  <span className="text-white/50">15+ languages</span>. Our crew includes IMDB-rated Writers, Directors, Editors and DOPs, with a shared vision of delivering cinematic excellence at standard prices.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Founded", value: "2025" },
                    { label: "Team Size", value: "12+" },
                    { label: "Languages", value: "15+" },
                    { label: "Projects", value: "100+" },
                  ].map(s => (
                    <div key={s.label} className="border-t border-white/5 pt-4">
                      <span className="font-headline text-xl font-bold text-white">{s.value}</span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.3em] text-white/20 mt-1">{s.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <div className="mb-10">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15 mb-4 block">Our Team</span>
                  <p className="text-xs text-white/30 leading-relaxed">
                    IMDB-Rated, Award-Winning, and Passion-Driven. Our team consists of Scriptwriters, Directors, DOP, Editors, &amp; Sound engineers who have worked on acclaimed feature films and international projects. Each member brings unique experience from across the industry, combining creativity with precision.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="border-t border-white/5 pt-8 mb-10">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15 block mb-4">Our Vision</span>
                  <p className="text-xs text-white/25 leading-relaxed italic">
                    &ldquo;To create a world where every creative mind — artist or technician — can work freely, fearlessly, and with full trust. Novavox stands for quality, creative freedom, and unity in craftsmanship.&rdquo;
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="border-t border-white/5 pt-8">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/15 block mb-4">Capabilities</span>
                  <div className="flex flex-wrap gap-2">
                    {["Scripting", "Direction", "Cinematography", "Editing", "DI", "Spatial Audio", "Sound Design", "Mastering", "Motion Graphics", "VFX"].map(cap => (
                      <span key={cap} className="font-mono text-[8px] tracking-widest text-white/25 border border-white/5 px-3 py-1.5 hover:border-white/15 hover:text-white/40 transition-colors">{cap.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOURS — Upcoming events
      ═══════════════════════════════════════════ */}
      {settings.pages.tours?.visible !== false && (
      <section className="py-24 md:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="006" label="Live Events" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Tours
              </h2>
              <Link href="/tours" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                ALL EVENTS <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <div className="border-t border-white/5">
            {tourEvents.slice(0, 4).map((event, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 hover:bg-white/[0.02] hover:px-4 transition-all duration-500">
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-headline text-2xl md:text-3xl font-bold text-white w-28 md:w-32">{event.date}</span>
                    <div>
                      <span className="font-headline text-sm md:text-base font-bold uppercase tracking-tight text-white">{event.city}, {event.country}</span>
                      <span className="block font-mono text-[9px] text-white/20 tracking-widest mt-1">{event.venue}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 md:mt-0">
                    <div className="flex gap-2">
                      {event.features.map(f => (
                        <span key={f} className="font-mono text-[7px] tracking-widest text-white/20 border border-white/5 px-2 py-1">{f.toUpperCase()}</span>
                      ))}
                    </div>
                    <span className={`font-mono text-[9px] tracking-[0.2em] px-4 py-2 ${event.status === "SOLD OUT" ? "text-white/30 border border-white/10" : "bg-white text-black"}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          JOURNAL — Latest editorial
      ═══════════════════════════════════════════ */}
      {settings.pages.journal?.visible !== false && (
      <section className="py-24 md:py-36 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="007" label="Editorial" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Journal
              </h2>
              <Link href="/journal" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                READ ALL <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5">
            {journalEntries.slice(0, 3).map((entry, i) => (
              <Reveal key={entry.slug} delay={i * 0.1}>
                <Link href="/journal" className="group block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={entry.image} alt={entry.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">{entry.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[8px] text-white/15 tracking-widest block mb-2">ISSUE {entry.issue}</span>
                    <h3 className="font-headline text-base font-bold uppercase tracking-tight text-white mb-2">{entry.title}</h3>
                    <p className="text-[10px] text-white/25 line-clamp-2 group-hover:text-white/40 transition-colors">{entry.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="font-mono text-[8px] text-white/15 tracking-widest">{entry.author}</span>
                      <span className="font-mono text-[8px] text-white/10 tracking-widest">{entry.readTime}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          SHOP — Featured products
      ═══════════════════════════════════════════ */}
      {settings.pages.shop?.visible !== false && (
      <section className="py-24 md:py-36 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Reveal>
            <SectionLabel number="008" label="Merchandise" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">
                Shop
              </h2>
              <Link href="/shop" className="font-mono text-[10px] tracking-[0.25em] text-white/30 hover:text-white transition-colors uppercase group">
                BROWSE ARCHIVE <span className="inline-block group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/5">
            {products.slice(0, 3).map((product, i) => (
              <Reveal key={product.sku} delay={i * 0.1}>
                <div className="group bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 33vw" />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">{product.badge.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-headline text-sm font-bold uppercase tracking-tight text-white mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-white/20 tracking-widest">{product.material}</span>
                      <span className="font-headline text-sm font-bold text-white">&euro;{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════
          CONTACT — Get in touch
      ═══════════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-36 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal>
                <SectionLabel number="009" label="Get In Touch" />
                <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-8">
                  {settings.contact.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xs text-white/30 leading-relaxed max-w-md mb-10">
                  {settings.contact.description}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="space-y-3">
                  <a href={phoneDigits ? `tel:+${phoneDigits}` : "#"} className="font-mono text-[11px] tracking-widest text-white/25 hover:text-white transition-colors block">{settings.contact.phone}</a>
                  <a href={`mailto:${settings.contact.email}`} className="font-mono text-[11px] tracking-widest text-white/25 hover:text-white transition-colors block">{settings.contact.email}</a>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-5 justify-center">
              {settings.contact.buttons.filter(b => b.visible !== false).map((btn, i) => {
                const resolvedHref = btn.href
                  .replaceAll("{email}", settings.contact.email)
                  .replaceAll("{phone}", settings.contact.phone)
                  .replaceAll("{whatsapp}", whatsappDigits)
                  .replaceAll("{tel}", phoneDigits ? `+${phoneDigits}` : "");
                const isExternal = resolvedHref.startsWith("http");
                return (
                  <Reveal key={`${btn.label}-${btn.href}`} delay={0.1 + i * 0.05}>
                    <a
                      href={resolvedHref}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" as const } : {})}
                      className="group relative border border-white/15 px-8 py-6 overflow-hidden text-center block"
                    >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-black transition-colors">{btn.label}</span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span className="font-headline text-sm font-black tracking-[0.3em] text-white uppercase block mb-4">NOVAVOX</span>
              <p className="text-[10px] text-white/20 leading-relaxed max-w-[200px]">Where ideas become cinematic realities. Film, music, and sound — crafted with precision.</p>
            </div>

            {/* Explore */}
            <div>
              <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Explore</span>
              <div className="space-y-2.5">
                {[
                  { label: "Artists", href: "/artists", key: "artists" },
                  { label: "Releases", href: "/releases", key: "releases" },
                  { label: "Shop", href: "/shop", key: "shop" },
                  { label: "Tours", href: "/tours", key: "tours" },
                  { label: "Journal", href: "/journal", key: "journal" },
                ].filter(link => settings.pages[link.key]?.visible !== false).map(link => (
                  <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">{link.label.toUpperCase()}</Link>
                ))}
              </div>
            </div>

            {/* Studio */}
            <div>
              <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Studio</span>
              <div className="space-y-2.5">
                {[
                  { label: "Gallery", href: "/gallery" },
                  { label: "Distribution", href: "/distribution" },
                  { label: "Player", href: "/player" },
                  { label: "Catalog", href: "/catalog" },
                ].map(link => (
                  <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">{link.label.toUpperCase()}</Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Contact</span>
              <div className="space-y-2.5">
                <a href={`mailto:${settings.contact.email}`} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">EMAIL</a>
                <a href={whatsappDigits ? `https://wa.me/${whatsappDigits}` : "#"} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">WHATSAPP</a>
                <a href={phoneDigits ? `tel:+${phoneDigits}` : "#"} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest">PHONE</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[8px] text-white/15 tracking-widest">&copy; {new Date().getFullYear()} <Link href="/admin/login" className="hover:text-white/40 transition-colors">NOVAVOX</Link>. ALL RIGHTS RESERVED.</span>
            <span className="font-mono text-[8px] text-white/15 tracking-widest">DESIGNED BY <Link href="https://9ruby.com" className="hover:text-white/40 transition-colors">9RUBY</Link></span>
          </div>
        </div>
      </footer>

      {/* ═══ Mobile Bottom Nav ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5">
        <div className="flex justify-around items-center py-3">
          {[
            { icon: "home", label: "Home", href: "/", key: "" },
            { icon: "album", label: "Releases", href: "/releases", key: "releases" },
            { icon: "group", label: "Artists", href: "/artists", key: "artists" },
            { icon: "shopping_bag", label: "Shop", href: "/shop", key: "shop" },
            { icon: "menu", label: "More", href: "/tours", key: "tours" },
          ].filter(item => !item.key || settings.pages[item.key]?.visible !== false).map(item => (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-white/30 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-mono text-[7px] tracking-widest uppercase">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
