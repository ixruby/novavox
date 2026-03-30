"use client";

import Image from "next/image";
import { SpatialNavigator } from "@/components/SpatialNavigator";
import { InteractiveHeroBackground } from "@/components/InteractiveHeroBackground";
import { VantaWaves } from "@/components/backgrounds/VantaWaves";
import { VantaHalo } from "@/components/backgrounds/VantaHalo";
import { VantaNet } from "@/components/backgrounds/VantaNet";
import { ParticleNetwork } from "@/components/backgrounds/ParticleNetwork";
import { FlowingWaveform } from "@/components/backgrounds/FlowingWaveform";
import { MobileMenu } from "@/components/MobileMenu";

export default function LandingPage() {
  const sections = [
    /* ═══ SECTION 0 — HERO (Top Left) ═══ */
    {
      id: "home",
      label: "HOME",
      children: (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
          <InteractiveHeroBackground>
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {/* Grid bg */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
                  backgroundSize: "100px 100px",
                }}
              />
              <div className="relative text-center px-6 max-w-5xl">
                <Image
                  src="/novavox-logo.jpg"
                  alt="Novavox"
                  width={500}
                  height={281}
                  className="mx-auto w-[260px] sm:w-[360px] md:w-[440px] object-contain"
                  priority
                />
                <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-center">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white/40 max-w-xs text-center md:text-left">
                    Film &amp; video production, advertising, post production, and music.
                  </p>
                  <a
                    href="#"
                    className="group relative border border-white/20 px-10 py-4 overflow-hidden pointer-events-auto"
                    onClick={(e) => { e.preventDefault(); }}
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.5em] group-hover:text-black transition-colors">
                      Explore
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </InteractiveHeroBackground>
        </div>
      ),
    },

    /* ═══ SECTION 1 — SERVICES (Top Right) ═══ */
    {
      id: "services",
      label: "SERVICES",
      children: (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
          <VantaWaves />
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16">
            <div className="max-w-5xl w-full">
              <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">What We Do</span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-10 md:mb-16">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
                {[
                  { n: "001", t: "Advertising & Commercials", d: "Visually captivating ads for digital, television, and corporate campaigns." },
                  { n: "002", t: "Film & Video Production", d: "Cinematic storytelling — scripting, direction, cinematography, editing, and DI." },
                  { n: "003", t: "Post Production", d: "DI, re-recording mix, spatial audio, and audio restoration." },
                  { n: "004", t: "Music Videos & Audios", d: "Concept creation, shooting, editing, DI, and sound mastering." },
                ].map((s) => (
                  <div key={s.n} className="bg-black/40 backdrop-blur-sm p-6 md:p-8 hover:bg-white/5 transition-colors">
                    <span className="font-mono text-[9px] text-white/15 block mb-3">{s.n}</span>
                    <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-3">{s.t}</h3>
                    <p className="text-[11px] text-white/35 leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },

    /* ═══ SECTION 2 — ABOUT (Bottom Left) ═══ */
    {
      id: "about",
      label: "ABOUT",
      children: (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
          <VantaNet />
          <div className="absolute inset-0 z-10 flex items-center px-6 md:px-16 overflow-y-auto">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 py-20">
              <div>
                <span className="font-mono uppercase tracking-[0.5em] text-[9px] text-white/25 mb-4 block">Who We Are</span>
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter text-white mb-8">About</h2>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  We&apos;re not just a team — we&apos;re a collective built on trust, freedom, and creativity focused on Quality.
                </p>
                <p className="text-xs text-white/35 leading-relaxed mb-6">
                  <span className="text-white/60">Novavox</span> was founded by <span className="text-white/60">Kaushik Jayakumar</span>,
                  an accomplished audio engineer and music producer who has worked on over <span className="text-white/60">100+ international and Indian projects</span> across{" "}
                  <span className="text-white/60">15+ languages</span>.
                </p>
                <div className="border-t border-white/5 pt-6 mt-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 block mb-3">Vision</span>
                  <p className="text-xs text-white/30 leading-relaxed italic">
                    &ldquo;To create a world where every creative mind can work freely, fearlessly, and with full trust.&rdquo;
                  </p>
                </div>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/15 mb-4 block">Emerging Artists</span>
                <p className="text-xs text-white/30 leading-relaxed mb-6">
                  We actively support new talent — producing, developing, and releasing music even without upfront investment.
                </p>
                <div className="space-y-0">
                  {["AURA VANCE", "KAEL DRIFT", "NOVA ECHO", "CIPHER WAVE", "ORBITAL SILENCE"].map((a) => (
                    <div key={a} className="flex justify-between items-center py-3 border-b border-white/5 group hover:bg-white/5 px-3 transition-colors">
                      <span className="font-mono text-[10px] tracking-widest text-white/50">{a}</span>
                      <span className="font-mono text-[7px] tracking-widest text-white/15">ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    /* ═══ SECTION 3 — CONTACT (Bottom Right) ═══ */
    {
      id: "contact",
      label: "CONTACT",
      children: (
        <div className="relative w-full h-full bg-[#0a0a0a] text-black overflow-hidden">
          <VantaHalo />
          <FlowingWaveform />
          <div className="absolute inset-0 z-10 bg-white/90 flex items-center justify-center px-6 md:px-16">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-black/30 mb-4 block">Get In Touch</span>
                <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-black mb-6">
                  LET&apos;S CREATE<br />SOMETHING<br />CINEMATIC.
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] leading-loose text-black/50 max-w-md">
                  Start your project with us. From concept to final cut.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <a
                  href="mailto:kaushik2002.22@gmail.com?subject=Project%20Inquiry"
                  className="group relative border-2 border-black/15 px-8 py-5 overflow-hidden text-center block"
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                    Start a Project
                  </span>
                </a>
                <a
                  href="https://wa.me/916282725324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border-2 border-black/15 px-8 py-5 overflow-hidden text-center block"
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                    WhatsApp Us
                  </span>
                </a>
                <div className="space-y-2 pt-4">
                  <a href="tel:+916282725324" className="font-mono text-[11px] tracking-widest text-black/30 hover:text-black transition-colors block">
                    +91 62827 25324
                  </a>
                  <a href="mailto:kaushik2002.22@gmail.com" className="font-mono text-[11px] tracking-widest text-black/30 hover:text-black transition-colors block">
                    kaushik2002.22@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fixed Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/50 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 md:py-5">
          <span className="text-lg md:text-xl font-bold tracking-[0.2em] text-white font-headline">NOVAVOX</span>
          <div className="hidden md:flex gap-8 items-center font-headline uppercase tracking-[0.1em] text-sm">
            <span className="text-[#919191] text-[10px] tracking-[0.2em]">HOME</span>
            <span className="text-[#919191] text-[10px] tracking-[0.2em]">SERVICES</span>
            <span className="text-[#919191] text-[10px] tracking-[0.2em]">ABOUT</span>
            <span className="text-[#919191] text-[10px] tracking-[0.2em]">CONTACT</span>
          </div>
          <MobileMenu />
        </div>
      </nav>

      <SpatialNavigator sections={sections} />
    </>
  );
}
