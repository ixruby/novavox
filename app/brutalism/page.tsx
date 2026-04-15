"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { DotGrid } from "@/components/ui/DotGrid";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function BrutalismPage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-20 md:pb-0">
        <DotGrid />

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Case Studies", href: "/gallery" }, { label: "Sonic Brutalism" }]} />
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&q=80" alt="Sonic Brutalism Installation" fill className="object-cover grayscale" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="font-mono text-[8px] tracking-widest text-white/30 block mb-3">CASE STUDY — PROJECT NVX-CS-001</span>
                  <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">Sonic<br />Brutalism</h1>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Project Details */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-16">
              {/* Main Content */}
              <div>
                <Reveal>
                  <div className="grid grid-cols-3 gap-6 mb-12 border-b border-white/5 pb-8">
                    {[
                      { label: "Location", value: "Berlin, DE" },
                      { label: "Completed", value: "October 2024" },
                      { label: "Client", value: "St. Agnes Gallery" },
                    ].map(d => (
                      <div key={d.label}>
                        <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block mb-1">{d.label}</span>
                        <span className="font-headline text-sm font-bold text-white">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6">The Concept</h2>
                  <p className="text-sm text-white/40 leading-relaxed mb-6">
                    Sonic Brutalism is an immersive installation that transforms raw concrete into a resonating instrument. Using precisely calibrated transducers embedded within the walls, floors, and ceiling of St. Agnes — a brutalist church converted into a contemporary art space — the installation renders the building itself as the primary sound source.
                  </p>
                  <p className="text-xs text-white/25 leading-relaxed mb-10">
                    The piece consists of 48 channels of spatial audio, distributed across 96 transducers. Each channel processes environmental input — wind, traffic, visitor movement — through a custom algorithmic composition engine that generates real-time harmonic content based on the building&apos;s natural resonant frequencies. The result is a living soundscape that evolves with its environment, never repeating, always in dialogue with the architecture it inhabits.
                  </p>
                </Reveal>

                {/* Detail Images */}
                <Reveal delay={0.15}>
                  <div className="grid grid-cols-2 gap-[2px] mb-10">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1509114397022-ed747cca3f92?w=800&q=80" alt="Transducer mount detail" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" sizes="50vw" />
                      <div className="absolute bottom-3 left-3">
                        <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">TRANSDUCER MOUNT</span>
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=800&q=80" alt="Acoustic mapping" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" sizes="50vw" />
                      <div className="absolute bottom-3 left-3">
                        <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">ACOUSTIC MAP</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6">The Process</h2>
                  <p className="text-xs text-white/25 leading-relaxed mb-6">
                    Development spanned 8 months — beginning with extensive acoustic mapping of the venue using impulse response measurements at 200+ positions. This data informed the transducer placement algorithm, which optimized for maximum modal excitation while minimizing destructive interference patterns.
                  </p>
                  <p className="text-xs text-white/25 leading-relaxed">
                    The composition engine runs on a custom FPGA array, processing 48 channels of input at 96kHz/32-bit with sub-millisecond latency. Each channel independently tracks room resonance modes and generates harmonic content that reinforces the building&apos;s natural acoustic character.
                  </p>
                </Reveal>
              </div>

              {/* Sidebar — Specs */}
              <div>
                <Reveal delay={0.1}>
                  <div className="sticky top-24 space-y-8">
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-4">System Specs</span>
                      <div className="space-y-4">
                        {[
                          { label: "Channels", value: "48" },
                          { label: "Transducers", value: "96" },
                          { label: "Sample Rate", value: "96kHz" },
                          { label: "Bit Depth", value: "32-bit" },
                          { label: "Latency", value: "<1ms" },
                          { label: "Processing", value: "Custom FPGA" },
                          { label: "Power", value: "12kW" },
                        ].map(s => (
                          <div key={s.label} className="flex justify-between border-b border-white/5 pb-3">
                            <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">{s.label}</span>
                            <span className="font-mono text-[11px] text-white/50">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-4">Team</span>
                      <div className="space-y-3">
                        {[
                          { role: "Sound Design", name: "Kaushik Jayakumar" },
                          { role: "Acoustic Eng.", name: "Elias Thorne" },
                          { role: "FPGA Design", name: "Sarah Kovac" },
                          { role: "Installation", name: "Marcus Vane" },
                        ].map(t => (
                          <div key={t.role}>
                            <span className="font-mono text-[7px] text-white/15 tracking-widest uppercase block">{t.role}</span>
                            <span className="font-mono text-[10px] text-white/40">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/gallery" className="block font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition-all uppercase text-center">
                      View Gallery
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Next Project */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
            <Reveal>
              <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-6">Next Case Study</span>
              <Link href="/narrative" className="group block">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline text-2xl md:text-4xl font-bold uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">Narrative Experiences</h3>
                  <span className="material-symbols-outlined text-white/20 text-[28px] group-hover:text-white/60 group-hover:translate-x-2 transition-all duration-500">arrow_forward</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
}
