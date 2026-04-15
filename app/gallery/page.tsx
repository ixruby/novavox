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

const galleryItems = [
  { id: "G-001", title: "BRUTALIST RESONANCE", category: "INSTALLATION", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", span: "col-span-2 row-span-2" },
  { id: "G-002", title: "VOID CHAMBER", category: "STUDIO", image: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=800&q=80", span: "" },
  { id: "G-003", title: "SPATIAL ARRAY", category: "LIVE", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", span: "" },
  { id: "G-004", title: "CONCRETE MASS", category: "ARCHITECTURE", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f92?w=800&q=80", span: "col-span-2" },
  { id: "G-005", title: "FREQUENCY PRISM", category: "EQUIPMENT", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", span: "" },
  { id: "G-006", title: "ACOUSTIC MAP", category: "DATA", image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=800&q=80", span: "" },
  { id: "G-007", title: "STEEL MERIDIAN LIVE", category: "PERFORMANCE", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", span: "" },
  { id: "G-008", title: "MONOLITH SETUP", category: "STUDIO", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", span: "col-span-2 row-span-2" },
  { id: "G-009", title: "TOKYO VAULT SESSION", category: "LIVE", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", span: "" },
  { id: "G-010", title: "BERLIN CATHEDRAL", category: "VENUE", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80", span: "" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function GalleryPage() {
  return (
    <>
      <TopNav />
      <MobileNav />
      <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-20 md:pb-0">
        <DotGrid />

        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Gallery" }]} />
            <Reveal>
              <div className="flex items-center gap-4 mb-4 mt-8">
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">010</span>
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Visual Archive</span>
              </div>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[0.9]">Gallery</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs text-white/30 leading-relaxed mt-6 max-w-xl">
                Behind the scenes, live performances, studio sessions, and architectural installations — a visual archive of the Novavox ecosystem.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] auto-rows-[200px] md:auto-rows-[260px]">
              {galleryItems.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i * 0.04, 0.3)} className={item.span}>
                  <div className="group relative h-full overflow-hidden cursor-pointer">
                    <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-mono text-[7px] tracking-widest text-white/40 block">{item.category}</span>
                      <span className="font-headline text-xs font-bold uppercase tracking-tight text-white">{item.title}</span>
                    </div>
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-2 py-1 text-white/40">{item.id}</span>
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-white mb-2">Want to see more?</h3>
                  <p className="text-[11px] text-white/25">Follow us on social media for behind-the-scenes content.</p>
                </div>
                <div className="flex gap-3">
                  <a href="https://instagram.com/novavox" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition-all uppercase">Instagram</a>
                  <Link href="/journal" className="font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white hover:text-black transition-all uppercase">Journal</Link>
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
