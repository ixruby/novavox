'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ArrowRight, Layers, Box, Music, Share2 } from 'lucide-react';

export default function Brutalism() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-end pb-12">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/brutalist-hero/1920/1080" 
            alt="Sonic Brutalism"
            fill
            className="object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mono-label mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/30" />
              PROJECT_ID_042
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] mb-8 tracking-tighter">
              SONIC <br />
              <span className="text-white/20">BRUTALISM</span>
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <div className="mono-label text-white/40">LOCATION: NEO-BERLIN</div>
              <div className="mono-label text-white/40">COMPLETED: 2024.01.12</div>
              <div className="mono-label text-white/40">CLIENT: PRIVATE_COLLECTOR</div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold uppercase border-b border-white/10 pb-6">THE CONCEPT</h2>
            <p className="text-xl text-white/60 leading-relaxed">
              Sonic Brutalism is an architectural sound installation that explores the raw, unadorned power of concrete and frequency. 
              By utilizing the natural resonance of brutalist structures, we&apos;ve created a sonic environment that feels both ancient and futuristic.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              The project utilizes 16 MONOLITH_X1 transducers strategically placed to activate the structural nodes of the building. 
              The result is a low-frequency standing wave that permeates the entire space, creating a physical sensation of sound.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-white/5 border border-white/10 relative overflow-hidden group">
              <Image 
                src="https://picsum.photos/seed/brut-detail-1/800/800" 
                alt="Detail 1"
                fill
                className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 mono-label text-[8px]">DETAIL_01_TRANSDUCER_MOUNT</div>
            </div>
            <div className="aspect-square bg-white/5 border border-white/10 relative overflow-hidden group">
              <Image 
                src="https://picsum.photos/seed/brut-detail-2/800/800" 
                alt="Detail 2"
                fill
                className="object-cover opacity-40 group-hover:opacity-80 transition-all duration-700 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 mono-label text-[8px]">DETAIL_02_ACOUSTIC_MAP</div>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-6">SYSTEM_SPECS</h2>
            <div className="space-y-6">
              {[
                { label: 'HARDWARE', value: '16x MONOLITH_X1', icon: Box },
                { label: 'SOFTWARE', value: 'SPATIAL_ARCHITECT_V2', icon: Layers },
                { label: 'FREQUENCY', value: '12HZ - 24KHZ', icon: Music }
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-4 p-4 glass border border-white/10 group">
                  <spec.icon size={18} className="text-white/40 group-hover:text-white transition-colors" />
                  <div>
                    <div className="mono-label text-[8px] text-white/30">{spec.label}</div>
                    <div className="text-sm font-bold tracking-widest">{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-6">SHARE_PROJECT</h2>
            <div className="flex gap-4">
              <button className="flex-1 py-4 border border-white/10 hover:bg-white hover:text-black transition-all font-bold tracking-widest text-xs flex items-center justify-center gap-2">
                <Share2 size={14} /> EXPORT_DATA
              </button>
            </div>
          </div>
          
          <div className="p-8 bg-white/5 border border-white/10 space-y-4">
            <div className="mono-label">NEXT_PROJECT</div>
            <h3 className="text-2xl font-bold tracking-tighter uppercase">VOID_RESONANCE_LAB</h3>
            <button className="flex items-center gap-2 text-xs font-bold tracking-widest hover:translate-x-2 transition-transform">
              VIEW CASE STUDY <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
