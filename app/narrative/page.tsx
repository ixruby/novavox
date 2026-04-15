"use client";

import Image from "next/image";
import { motion } from "motion/react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { DotGrid } from "@/components/ui/DotGrid";

const journeys = [
  { id: "NR-001", title: "THE ARCHITECTURE OF SILENCE", duration: "45:00", category: "IMMERSIVE", desc: "A guided sonic journey through abandoned concrete structures. Binaural recording captures the resonant frequencies of decaying industrial architecture.", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", chapters: 7 },
  { id: "NR-002", title: "ELECTROMAGNETIC PILGRIMAGE", duration: "32:15", category: "FIELD RECORDING", desc: "Following electromagnetic anomalies across Roman ruins. Each site reveals a unique sonic signature hidden in the infrastructure of ancient civilization.", image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80", chapters: 5 },
  { id: "NR-003", title: "ORBITAL MEDITATION", duration: "58:40", category: "GENERATIVE", desc: "Real-time satellite telemetry data translated into contemplative soundscapes. A continuously evolving composition that never repeats.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", chapters: 9 },
  { id: "NR-004", title: "VOLCANIC FREQUENCY", duration: "41:20", category: "NATURAL", desc: "Deep recordings from the volcanic landscapes of Iceland. Subterranean vibrations and glacial drift captured at the threshold of human perception.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80", chapters: 6 },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function NarrativePage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-20 md:pb-0">
        <DotGrid />

        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Narrative" }]} />
            <Reveal>
              <div className="flex items-center gap-4 mb-4 mt-8">
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">012</span>
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Sonic Journeys</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">Narrative<br />Experiences</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs text-white/30 leading-relaxed mt-6 max-w-xl">
                Long-form sonic compositions that tell stories through sound. Each narrative is a curated journey — designed to be experienced from beginning to end, in spatial audio.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto space-y-[1px]">
            {journeys.map((journey, i) => (
              <Reveal key={journey.id} delay={i * 0.1}>
                <div className="group bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
                    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                      <Image src={journey.image} alt={journey.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:scale-110 transition-all duration-500">
                          <span className="material-symbols-outlined text-white/40 text-[28px] group-hover:text-white/80 transition-colors">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-mono text-[7px] tracking-widest text-white/20">{journey.id}</span>
                          <span className="font-mono text-[7px] tracking-widest text-white/20 border border-white/5 px-2 py-0.5">{journey.category}</span>
                        </div>
                        <h3 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-white mb-4">{journey.title}</h3>
                        <p className="text-[11px] text-white/30 leading-relaxed mb-6">{journey.desc}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div>
                            <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">Duration</span>
                            <span className="font-mono text-sm text-white/50">{journey.duration}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">Chapters</span>
                            <span className="font-mono text-sm text-white/50">{journey.chapters}</span>
                          </div>
                        </div>
                        <button className="font-mono text-[9px] tracking-[0.2em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition-all uppercase">Start Journey</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
            <Reveal>
              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: "SPATIAL", label: "Dynamic Audio" },
                  { value: "360\u00B0", label: "Spatial Depth" },
                  { value: "24-BIT", label: "Lossless Quality" },
                ].map(s => (
                  <div key={s.label}>
                    <span className="font-headline text-2xl md:text-4xl font-bold text-white">{s.value}</span>
                    <span className="block font-mono text-[8px] uppercase tracking-[0.3em] text-white/20 mt-2">{s.label}</span>
                  </div>
                ))}
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
