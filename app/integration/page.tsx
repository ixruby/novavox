"use client";

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

const features = [
  { id: "F-001", title: "ACOUSTIC MAPPING", desc: "Real-time 3D acoustic analysis of any architectural space. Generate frequency response maps, identify modal resonances, and optimize speaker placement.", icon: "map", specs: ["200+ sample points", "Sub-Hz resolution", "3D visualization"] },
  { id: "F-002", title: "REAL-TIME OPTIMIZATION", desc: "AI-driven room correction and spatial audio processing. Adaptive algorithms that respond to changing acoustic conditions in real-time.", icon: "tune", specs: ["<1ms latency", "Machine learning", "96kHz processing"] },
  { id: "F-003", title: "MODULAR EXPANSION", desc: "Connect unlimited nodes to build custom signal chains. Each module is independently configurable with full parameter automation.", icon: "hub", specs: ["128 channels", "OSC/MIDI/DMX", "Plugin hosting"] },
  { id: "F-004", title: "SPATIAL RENDERING", desc: "Full Ambisonics, binaural, and object-based audio rendering. Support for up to 7th-order Ambisonics with head-tracked binaural decode.", icon: "surround_sound", specs: ["7th order HOA", "HRTF database", "Object-based"] },
];

export default function IntegrationPage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-20 md:pb-0">
        <DotGrid />

        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Integration" }]} />
            <Reveal>
              <div className="flex items-center gap-4 mb-4 mt-8">
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">013</span>
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Software Suite</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">Spatial<br />Architect</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mt-6">
                <span className="font-mono text-[9px] tracking-widest text-white/20 border border-white/10 px-3 py-1">V2.1</span>
                <span className="font-mono text-[9px] tracking-widest text-white/20">macOS / Windows / Linux</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed mt-4 max-w-xl">
                Professional spatial audio design software for architects, sound designers, and installation artists. Map, simulate, and render immersive audio environments.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Interactive Visualization Mockup */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="relative aspect-[21/9] bg-[#080808] border border-white/5 overflow-hidden">
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                {/* Floating elements */}
                <motion.div animate={{ x: [0, 20, 0], y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-24 h-24 border border-white/10" />
                <motion.div animate={{ x: [0, -15, 0], y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-1/3 w-16 h-16 border border-white/5 rotate-45" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 left-1/2 w-32 h-32 border border-white/5 rounded-full" />
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase block">Spatial Architect V2.1</span>
                    <span className="font-mono text-[8px] tracking-widest text-white/10 block mt-2">ENVIRONMENT SCANNING ACTIVE</span>
                  </div>
                </div>
                {/* Corner HUD elements */}
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[7px] tracking-widest text-white/15">LATENCY: 0.4ms</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[7px] tracking-widest text-white/15">48CH ACTIVE</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[7px] tracking-widest text-white/15">96kHz / 32-BIT</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="font-mono text-[7px] tracking-widest text-white/15">GPU: NOMINAL</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-12">Core Features</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
              {features.map((feat, i) => (
                <Reveal key={feat.id} delay={i * 0.08}>
                  <div className="group bg-black/40 p-8 md:p-10 hover:bg-white/[0.03] transition-colors duration-500 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-mono text-[8px] text-white/15 tracking-widest">{feat.id}</span>
                      <span className="material-symbols-outlined text-white/10 text-[24px] group-hover:text-white/25 transition-colors">{feat.icon}</span>
                    </div>
                    <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-white mb-3">{feat.title}</h3>
                    <p className="text-[11px] text-white/30 leading-relaxed mb-6">{feat.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {feat.specs.map(spec => (
                        <span key={spec} className="font-mono text-[7px] tracking-widest text-white/20 border border-white/5 px-2 py-1">{spec}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Specs */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
            <Reveal>
              <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-white mb-8">System Requirements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Minimum CPU", value: "8-core / Apple M2" },
                  { label: "RAM", value: "16GB (32GB recommended)" },
                  { label: "GPU", value: "Metal / Vulkan compatible" },
                  { label: "Storage", value: "2GB + project data" },
                ].map(s => (
                  <div key={s.label} className="border-t border-white/5 pt-4">
                    <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block mb-1">{s.label}</span>
                    <span className="font-mono text-[11px] text-white/40">{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="bg-[#080808] border border-white/5 p-10 md:p-16 text-center">
                <h3 className="font-headline text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-4">Download Spatial Architect</h3>
                <p className="text-[11px] text-white/25 mb-8 max-w-md mx-auto">30-day free trial. No credit card required. Full feature access for evaluation.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="font-mono text-[9px] tracking-[0.25em] bg-white text-black px-8 py-4 hover:bg-white/90 transition-colors uppercase">Download V2.1</button>
                  <Link href="/distribution" className="font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-8 py-4 hover:bg-white/5 transition-colors uppercase">Request Demo</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
}
