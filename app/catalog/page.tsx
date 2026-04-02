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

const sonicObjects = [
  { id: "SO-001", name: "MONOLITH_X1", price: 2400, desc: "Architectural speaker column. 42-driver vertical array with spatial audio processing.", specs: { height: "180cm", drivers: "42", response: "18Hz-40kHz", power: "2400W" }, image: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80" },
  { id: "SO-002", name: "VOID_RESONATOR", price: 890, desc: "Room-scale resonance amplifier. Transforms architectural spaces into instruments.", specs: { radius: "12m", modes: "128", latency: "<1ms", material: "Titanium" }, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" },
  { id: "SO-003", name: "NEBULA_ARRAY", price: 5600, desc: "Ceiling-mounted spatial audio hemisphere. 360° immersive sound field generation.", specs: { channels: "64.4", coverage: "360°", resolution: "0.1°", weight: "48kg" }, image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=800&q=80" },
  { id: "SO-004", name: "PULSE_MODULE", price: 340, desc: "Portable haptic bass transducer. Tactile low-frequency reproduction for installations.", specs: { range: "5Hz-120Hz", force: "50N", size: "22cm", battery: "12h" }, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function CatalogPage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-20 md:pb-0">
        <DotGrid />

        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Catalog" }]} />
            <Reveal>
              <div className="flex items-center gap-4 mb-4 mt-8">
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">011</span>
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Sonic Objects</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">Catalog</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs text-white/30 leading-relaxed mt-6 max-w-xl">
                Hardware instruments and spatial audio systems designed for architectural installations, live performance, and studio production.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
              {sonicObjects.map((obj, i) => (
                <Reveal key={obj.id} delay={i * 0.1}>
                  <div className="group bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={obj.image} alt={obj.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute top-4 left-4">
                        <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">{obj.id}</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="font-headline text-xl font-bold text-white">&euro;{obj.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-3">{obj.name}</h3>
                      <p className="text-[11px] text-white/30 leading-relaxed mb-6">{obj.desc}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {Object.entries(obj.specs).map(([key, val]) => (
                          <div key={key} className="border-t border-white/5 pt-3">
                            <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">{key}</span>
                            <span className="font-mono text-[11px] text-white/50">{val}</span>
                          </div>
                        ))}
                      </div>
                      <button className="font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition-all uppercase w-full text-center">REQUEST QUOTE</button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-12">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4">Custom Architecture</h3>
                <p className="text-[11px] text-white/25 leading-relaxed mb-8">Need a bespoke sonic installation? Our engineering team designs custom spatial audio systems for venues, galleries, and architectural spaces worldwide.</p>
                <Link href="/distribution" className="inline-block font-mono text-[9px] tracking-[0.25em] text-black bg-white px-8 py-4 hover:bg-white/90 transition-colors uppercase">Schedule Consultation</Link>
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
