'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Music, Headphones, Layers } from 'lucide-react';
import Image from 'next/image';

const journeys = [
  {
    title: 'THE BRUTALIST ECHO',
    duration: '45:00',
    category: 'ARCHITECTURAL SONICS',
    image: 'https://picsum.photos/seed/brutalist/1200/600',
    desc: 'An immersive journey through the concrete corridors of modernist architecture. Frequency-tuned for spatial depth.'
  },
  {
    title: 'VOID RESONANCE',
    duration: '32:15',
    category: 'MINIMALIST AMBIENT',
    image: 'https://picsum.photos/seed/void/1200/600',
    desc: 'A deep exploration of silence and the space between sounds. Designed for the VOID_RESONATOR hardware.'
  },
  {
    title: 'KINETIC PULSE',
    duration: '58:40',
    category: 'RHYTHMIC ARCHITECTURE',
    image: 'https://picsum.photos/seed/kinetic/1200/600',
    desc: 'Dynamic rhythmic structures that respond to your movement through space. Best experienced with NEBULA_ARRAY.'
  }
];

export default function Narrative() {
  return (
    <div className="space-y-32">
      <header className="max-w-4xl">
        <div className="mono-label mb-6">NARRATIVE_JOURNEY_V1.0</div>
        <h1 className="text-7xl font-bold leading-none mb-8">SONIC ARCHITECTURE</h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          Experience sound as a physical journey. Our narrative experiences are meticulously crafted to guide you through virtual and physical spaces.
        </p>
      </header>

      <div className="space-y-24">
        {journeys.map((journey, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-[21/9] bg-white/5 border border-white/10 overflow-hidden relative">
              <Image 
                src={journey.image} 
                alt={journey.title}
                fill
                className="object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
              <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="mono-label bg-black/50 px-3 py-1 backdrop-blur-sm border border-white/10">
                  {journey.duration}
                </div>
                <div className="mono-label bg-black/50 px-3 py-1 backdrop-blur-sm border border-white/10">
                  {journey.category}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="max-w-xl">
                <h3 className="text-4xl font-bold mb-4 tracking-tighter">{journey.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {journey.desc}
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <button className="px-8 py-4 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-4">
                  START JOURNEY <ArrowRight size={18} />
                </button>
                <div className="flex items-center gap-4 justify-center md:justify-start text-white/30 text-[10px] font-mono tracking-widest">
                  <Headphones size={14} /> RECOMMENDED FOR SPATIAL AUDIO
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-24">
        <div className="space-y-4">
          <Music size={32} className="text-white/40" />
          <h4 className="text-xl font-bold uppercase">Dynamic Audio</h4>
          <p className="text-white/50 text-sm leading-relaxed">
            Soundscapes that adapt to your environment and movement, creating a truly personal experience.
          </p>
        </div>
        <div className="space-y-4">
          <Layers size={32} className="text-white/40" />
          <h4 className="text-xl font-bold uppercase">Spatial Depth</h4>
          <p className="text-white/50 text-sm leading-relaxed">
            Meticulously engineered for 3D audio environments, providing a sense of scale and distance.
          </p>
        </div>
        <div className="space-y-4">
          <Headphones size={32} className="text-white/40" />
          <h4 className="text-xl font-bold uppercase">Lossless Quality</h4>
          <p className="text-white/50 text-sm leading-relaxed">
            High-fidelity audio streaming at 24-bit/192kHz for the ultimate sonic clarity.
          </p>
        </div>
      </section>
    </div>
  );
}
