"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { DeepStringsBackground } from "@/components/ui/deep-strings";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SparklesCore } from "@/components/ui/sparkles";
import { LampContainer } from "@/components/ui/lamp";
import { MobileMenu } from "@/components/MobileMenu";
import { motion } from "motion/react";
import { artists, portfolioWorks, type PortfolioWork } from "@/lib/data";

/* ─── Animation helper ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const categories = ["ALL", "MUSIC", "ADS", "FILMS"] as const;

const sectionCoords: Record<string, { x: number; y: number }> = {
  home: { x: 0, y: 0 },
  services: { x: -100, y: 0 },
  about: { x: 0, y: -100 },
  portfolio: { x: -100, y: -100 },
  contact: { x: -100, y: -100 }, // contact is grouped with portfolio
};

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCoords, setCurrentCoords] = useState(sectionCoords.home);

  useEffect(() => {
    const handleNav = (e: Event) => {
      const target = (e as CustomEvent).detail;
      if (sectionCoords[target]) {
        setCurrentCoords(sectionCoords[target]);
      }
    };
    window.addEventListener("nav-spatial", handleNav);

    // Edge Gliding Logic
    let timeoutId: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const EDGE_THRESHOLD = 20;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCurrentCoords((prev) => {
          let target = prev;
          if (prev.x === 0 && prev.y === 0) {
            // Home
            if (clientX >= innerWidth - EDGE_THRESHOLD) target = sectionCoords.services;
            else if (clientY >= innerHeight - EDGE_THRESHOLD) target = sectionCoords.about;
          } else if (prev.x === -100 && prev.y === 0) {
            // Services
            if (clientX <= EDGE_THRESHOLD) target = sectionCoords.home;
            else if (clientY >= innerHeight - EDGE_THRESHOLD) target = sectionCoords.portfolio;
          } else if (prev.x === 0 && prev.y === -100) {
            // About
            if (clientX >= innerWidth - EDGE_THRESHOLD) target = sectionCoords.portfolio;
            else if (clientY <= EDGE_THRESHOLD) target = sectionCoords.home;
          } else if (prev.x === -100 && prev.y === -100) {
            // Portfolio
            if (clientX <= EDGE_THRESHOLD) target = sectionCoords.about;
            else if (clientY <= EDGE_THRESHOLD) target = sectionCoords.services;
          }
          return target;
        });
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("nav-spatial", handleNav);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDesktopNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (sectionCoords[target]) {
      setCurrentCoords(sectionCoords[target]);
    }
  };

  const filteredWorks = useMemo(() => {
    let works = portfolioWorks;
    if (activeCategory !== "ALL") {
      works = works.filter((w) => w.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      works = works.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q)
      );
    }
    return works;
  }, [activeCategory, searchQuery]);

  const emergingArtists = artists.filter((a) => a.status === "EMERGING");
  const activeArtistsSample = artists
    .filter((a) => a.status === "ACTIVE")
    .slice(0, 3);
  const featuredArtists = [...emergingArtists, ...activeArtistsSample];

  return (
    <div className="overflow-hidden w-[100vw] h-[100vh] bg-[#0a0a0a]">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ═══ FIXED NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 md:py-5">
          {/* Logo icon + NOVAVOX wordmark */}
          <a href="#home" className="flex items-center">
            <span className="text-lg md:text-xl font-black tracking-[0.3em] text-white font-headline uppercase drop-shadow-md">
              NOVAVOX
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 items-center">
            {[
              { label: "HOME", target: "home" },
              { label: "SERVICES", target: "services" },
              { label: "ABOUT", target: "about" },
              { label: "PORTFOLIO", target: "portfolio" },
            ].map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                onClick={(e) => handleDesktopNav(e, link.target)}
                className="nav-link text-[#919191] text-[10px] tracking-[0.2em] font-headline uppercase hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <MobileMenu />
        </div>
      </nav>

      {/* ═══ SPATIAL NAVIGATION WRAPPER ═══ */}
      <motion.div
        animate={{ x: `${currentCoords.x}vw`, y: `${currentCoords.y}vh` }}
        transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1.2 }}
        className="w-[200vw] h-[200vh] relative will-change-transform"
      >
        {/* ═══════════════════════════════════════════════════════
            SECTION 1 — HOME (Top Left: 0, 0)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          <section id="home" className="relative min-h-[100vh] overflow-hidden bg-black">
        {/* 4-Portion Animated Grid Structure */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {/* Top Left: Deep Strings */}
          <div className="relative border-r border-b border-white/5 overflow-hidden">
            <DeepStringsBackground className="absolute inset-0" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/80 pointer-events-none"
            />
          </div>
          
          {/* Top Right: Sparkles / Stars */}
          <div className="relative border-b border-white/5 overflow-hidden flex items-center justify-center">
            <SparklesCore
              background="transparent"
              minSize={0.2}
              maxSize={1.5}
              particleDensity={40}
              particleColor="#FFFFFF"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"
            />
          </div>

          {/* Bottom Left: Clean Architectural Space */}
          <div className="relative border-r border-white/5 overflow-hidden bg-gradient-to-tr from-black/80 to-transparent">
            {/* Removed smokey effect per requirements */}
          </div>

          {/* Bottom Right: Digital Noise + Fast Pan */}
          <div className="relative overflow-hidden">
            <DeepStringsBackground className="absolute inset-0 opacity-50" />
            <motion.div
              animate={{ x: ["-10%", "10%"] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="absolute inset-0 bg-white/5 blur-3xl rounded-full"
              style={{ top: '-50%', left: '-50%', width: '200%', height: '200%' }}
            />
          </div>
        </div>

        {/* Center Crosshair / HUD elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none z-10">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30 -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/30 -translate-x-1/2"></div>
        </div>

        {/* Main Content Overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pointer-events-none">
          <motion.div
            initial={{ scale: 0.85, filter: "blur(12px)", opacity: 0 }}
            animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/novavox-mark-512.png"
              alt="Novavox Logo"
              width={512}
              height={512}
              className="w-[260px] sm:w-[360px] md:w-[440px] lg:w-[500px] object-contain opacity-90 drop-shadow-2xl mix-blend-screen"
              priority
            />
          </motion.div>

          {/* Music Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-6 md:gap-12 px-6 pointer-events-auto"
          >
            {["SPOTIFY", "APPLE MUSIC", "YOUTUBE", "SOUNDCLOUD"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
              >
                {platform}
              </a>
            ))}
          </motion.div>

          {/* Spatial Edge-Gliding active (HUD Removed) */}
        </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — SERVICES (Top Right: 100vw, 0)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute top-0 left-[100vw] w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          <section id="services" className="relative min-h-[100vh]">
        <WavyBackground
          className="min-h-screen"
          containerClassName="min-h-screen bg-[#0a0a0a]"
          colors={["#1a1a2e", "#16213e", "#0f3460", "#1a1a2e", "#16213e"]}
          waveWidth={60}
          backgroundFill="#0a0a0a"
          blur={6}
          speed="slow"
          waveOpacity={0.3}
        >
          <div className="relative z-10 flex items-center justify-center min-h-screen px-6 md:px-16 py-32">
            <div className="max-w-5xl w-full">
              <Reveal>
                <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">
                  What We Do
                </span>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-10 md:mb-16">
                  Our Services
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
                {[
                  {
                    n: "001",
                    t: "Advertising & Commercials",
                    d: "Visually captivating ads with strong brand connection — crafted for digital, television, and corporate campaigns. From storyboards to final output.",
                  },
                  {
                    n: "002",
                    t: "Film & Video Production",
                    d: "Cinematic storytelling from concept to completion — including scripting, direction, cinematography, editing, and DI. Feature films, short films, branded content, documentaries.",
                  },
                  {
                    n: "003",
                    t: "Post Production",
                    d: "Premium post workflows that elevate your visuals and sound. DI, re-recording mix, spatial audio, and audio restoration.",
                  },
                  {
                    n: "004",
                    t: "Music Videos & Audios",
                    d: "High-end production for artists who want their sound to look as good as it feels. Concept creation, shooting, editing, DI, and sound mastering.",
                  },
                ].map((s, i) => (
                  <SpotlightCard key={s.n} delay={i * 0.12}>
                    <span className="font-mono text-[9px] text-white/15 block mb-3 group-hover:text-white/40 transition-colors">
                      {s.n}
                    </span>
                    <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-3">
                      {s.t}
                    </h3>
                    <p className="text-[11px] text-white/35 leading-relaxed group-hover:text-white/50 transition-colors">
                      {s.d}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </div>
        </WavyBackground>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 3 — ABOUT (Bottom Left: 0, 100vh)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute top-[100vh] left-0 w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          <section id="about" className="relative bg-[#0a0a0a] min-h-[100vh]">
        <div className="absolute inset-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={25}
            particleColor="#FFFFFF"
          />
        </div>
        <div className="relative z-10 px-6 md:px-16 py-32">
          <div className="max-w-5xl w-full mx-auto">
            {/* Header */}
            <Reveal>
              <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">
                Who We Are
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-12">
                About
              </h2>
            </Reveal>

            {/* Company + Team — 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
              <div>
                <Reveal>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    We&apos;re not just a team — we&apos;re a collective built
                    on trust, freedom, and creativity focused on Quality.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-xs text-white/35 leading-relaxed">
                    <span className="text-white/60">Novavox</span> was founded
                    by{" "}
                    <span className="text-white/60">Kaushik Jayakumar</span>, an
                    accomplished audio engineer and music producer who has worked
                    on over{" "}
                    <span className="text-white/60">
                      100+ international and Indian projects
                    </span>{" "}
                    across{" "}
                    <span className="text-white/60">15+ languages</span>. Our
                    crew includes IMDB-rated Writers, Directors, Editors and
                    DOPs, with a shared vision of delivering cinematic excellence
                    at standard prices.
                  </p>
                </Reveal>
              </div>

              <div>
                <Reveal delay={0.1}>
                  <div className="mb-8">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 mb-3 block">
                      Our Team
                    </span>
                    <p className="text-xs text-white/35 leading-relaxed">
                      IMDB-Rated, Award-Winning, and Passion-Driven. Our team
                      consists of Scriptwriters, Directors, DOP, Editors, &amp;
                      Sound engineers who have worked on acclaimed feature films
                      and international projects. Each member brings unique
                      experience from across the industry, combining creativity
                      with precision. Together, we form Novavox — not a company,
                      but a trust-built family of creators.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="border-t border-white/5 pt-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 block mb-3">
                      Our Vision
                    </span>
                    <p className="text-xs text-white/30 leading-relaxed italic">
                      &ldquo;To create a world where every creative mind —
                      artist or technician — can work freely, fearlessly, and
                      with full trust. Novavox stands for quality, creative
                      freedom, and unity in craftsmanship.&rdquo;
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Emerging Artists — bottom subsection */}
            <div className="border-t border-white/5 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20">
                <div>
                  <Reveal>
                    <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">
                      Our New Found Artists
                    </span>
                    <h3 className="font-headline text-2xl md:text-4xl font-extrabold uppercase tracking-tighter text-white mb-6">
                      Supporting Emerging Artists
                    </h3>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      At Novavox, we actively support new talent by producing,
                      developing, and releasing music — even without upfront
                      investment from the artist.
                    </p>
                    <p className="text-xs text-white/30 leading-relaxed">
                      We focus on long-term growth, helping artists build their
                      sound, identity, and revenue streams. Our model ensures
                      that creativity is not limited by budget, but driven by
                      vision.
                    </p>
                  </Reveal>
                </div>

                <div>
                  <Reveal delay={0.15}>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 mb-4 block">
                      Latest Artists
                    </span>
                    <div className="space-y-0">
                      {featuredArtists.map((a) => (
                        <div
                          key={a.slug}
                          className="group relative flex justify-between items-center py-[18px] border-b border-white/5 hover:pl-4 hover:pr-4 hover:bg-white/[0.03] transition-all duration-500 cursor-crosshair overflow-hidden"
                        >
                          {/* Deep Hover Image Reveal */}
                          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-20 opacity-0 group-hover:opacity-100 group-hover:scale-110 pointer-events-none transition-all duration-700 z-0 select-none overflow-hidden rounded-sm mix-blend-screen grayscale group-hover:grayscale-0">
                            <Image src={a.image} alt={a.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-80" />
                          </div>
                          
                          <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">
                            <span className="font-mono text-[11px] tracking-widest text-white/60 block group-hover:text-white">
                              {a.name}
                            </span>
                            <span className="font-mono text-[8px] tracking-widest text-white/20 group-hover:text-white/40">
                              {a.genre}
                            </span>
                          </div>
                          <span
                            className={`relative z-10 font-mono text-[7px] tracking-widest transition-transform duration-500 group-hover:-translate-x-2 ${
                              a.status === "EMERGING"
                                ? "text-green-400/50 group-hover:text-green-400"
                                : "text-white/15 group-hover:text-white/40"
                            }`}
                          >
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 4 — WORKS + CONTACT (Bottom Right: 100vw, 100vh)
        ═══════════════════════════════════════════════════════ */}
        <div className="absolute top-[100vh] left-[100vw] w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Portfolio half */}
          <section id="portfolio" className="relative bg-[#0a0a0a] min-h-[100vh]">
        <div className="absolute inset-0 border-t border-white/5" />
        <div className="relative z-10 w-full px-6 md:px-16 py-32">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">
                Our Work
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-10">
                Portfolio
              </h2>
            </Reveal>

            {/* Filters & Search */}
            <Reveal delay={0.12}>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
                <div className="flex gap-[1px] bg-white/5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        activeCategory === cat
                          ? "bg-white text-black"
                          : "bg-black/50 text-white/40 hover:bg-white/5 hover:text-white/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search works..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/50 border border-white/10 px-4 py-3 font-mono text-[11px] text-white/60 placeholder:text-white/20 w-full sm:w-64 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/20 text-[16px]">
                    search
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Works Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/5">
              {filteredWorks.map((work, i) => (
                <Reveal key={work.id} delay={Math.min(i * 0.06, 0.36)}>
                  <WorkCard work={work} />
                </Reveal>
              ))}
            </div>

            {filteredWorks.length === 0 && (
              <div className="text-center py-20">
                <p className="font-mono text-[11px] text-white/25 tracking-widest">
                  NO WORKS FOUND
                </p>
              </div>
            )}

            {/* About Releases */}
            <Reveal delay={0.15}>
              <div className="mt-16 border-t border-white/5 pt-8">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 mb-3 block">
                  About Our Releases
                </span>
                <p className="text-xs text-white/30 leading-relaxed max-w-2xl">
                  Every project at Novavox is treated as a cinematic experience —
                  from music videos and ad campaigns to feature films. Our
                  releases showcase the depth of our production capabilities
                  across all mediums.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact half */}
      <section id="contact" className="relative min-h-screen">
        <LampContainer className="min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center px-6"
          >
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/30 mb-4 block">
                Get In Touch
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-6">
                Let&apos;s Create
                <br />
                Something
                <br />
                Cinematic
                <br />
                Together.
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] leading-loose text-white/40 max-w-md">
                Start your project with us.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <a
                href="mailto:kaushik2002.22@gmail.com?subject=Project%20Inquiry"
                className="group relative border border-white/20 px-8 py-5 overflow-hidden text-center block"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-black transition-colors">
                  Start a Project
                </span>
              </a>
              <a
                href="https://wa.me/916282725324"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-white/20 px-8 py-5 overflow-hidden text-center block"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-black transition-colors">
                  WhatsApp Us
                </span>
              </a>
              <div className="space-y-2 pt-4">
                <a
                  href="tel:+916282725324"
                  className="font-mono text-[11px] tracking-widest text-white/30 hover:text-white transition-colors block"
                >
                  +91 62827 25324
                </a>
                <a
                  href="mailto:kaushik2002.22@gmail.com"
                  className="font-mono text-[11px] tracking-widest text-white/30 hover:text-white transition-colors block"
                >
                  kaushik2002.22@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Footer Designed By */}
          <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">
              Designed by 9RUBY
            </span>
          </div>
        </LampContainer>
            </section>
          </div>
        </motion.div>
      </div>
    );
  }

/* ─── Spotlight interaction card ─── */
function SpotlightCard({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Reveal delay={delay} className="h-full">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className={`relative h-full bg-black/50 backdrop-blur-sm p-6 md:p-8 overflow-hidden group transition-colors duration-500 hover:bg-white/5 ${className}`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            opacity,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </Reveal>
  );
}

/* ─── Portfolio work card ─── */
function WorkCard({ work }: { work: PortfolioWork }) {
  return (
    <div className="bg-black/50 group hover:bg-white/5 transition-colors duration-500 overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[8px] uppercase tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/50">
            {work.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-headline text-sm font-bold uppercase tracking-tight text-white mb-1">
          {work.title}
        </h3>
        <p className="text-[10px] text-white/30 leading-relaxed line-clamp-2">
          {work.description}
        </p>
        <span className="font-mono text-[8px] text-white/15 mt-3 block">
          {work.year}
        </span>
      </div>
    </div>
  );
}
