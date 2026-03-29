'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Play, Share2, Heart, Music, Layers, Box } from 'lucide-react';

const releases = [
  { id: '01', title: 'BRUTALIST_ECHO', artist: 'LYRA VOID', date: '2024.03.15', image: 'https://picsum.photos/seed/rel1/800/800' },
  { id: '02', title: 'VOID_RESONANCE', artist: 'LYRA VOID', date: '2024.02.28', image: 'https://picsum.photos/seed/rel2/800/800' },
  { id: '03', title: 'KINETIC_PULSE', artist: 'LYRA VOID', date: '2024.01.10', image: 'https://picsum.photos/seed/rel3/800/800' },
  { id: '04', title: 'NEBULA_CORE', artist: 'LYRA VOID', date: '2023.12.05', image: 'https://picsum.photos/seed/rel4/800/800' },
  { id: '05', title: 'PULSE_KINETIC', artist: 'LYRA VOID', date: '2023.11.20', image: 'https://picsum.photos/seed/rel5/800/800' },
  { id: '06', title: 'SONIC_WAVE', artist: 'LYRA VOID', date: '2023.10.15', image: 'https://picsum.photos/seed/rel6/800/800' },
  { id: '07', title: 'VOID_SPACE', artist: 'LYRA VOID', date: '2023.09.28', image: 'https://picsum.photos/seed/rel7/800/800' },
  { id: '08', title: 'MONOLITH_DETAIL', artist: 'LYRA VOID', date: '2023.08.10', image: 'https://picsum.photos/seed/rel8/800/800' }
];

export default function Releases() {
  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <div className="mono-label mb-4">RELEASES_V1.0</div>
          <h1 className="text-6xl font-bold uppercase">SONIC RELEASES</h1>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-white/10 text-[10px] font-mono tracking-widest hover:bg-white hover:text-black transition-all">
            SORT_BY_DATE
          </button>
          <button className="px-6 py-2 border border-white/10 text-[10px] font-mono tracking-widest hover:bg-white hover:text-black transition-all">
            FILTER_BY_ARTIST
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {releases.map((release, i) => (
          <motion.div 
            key={release.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden relative">
              <Image 
                src={release.image} 
                alt={release.title}
                fill
                className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
              <div className="absolute top-4 left-4 mono-label bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">
                ID_{release.id}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold tracking-tighter uppercase">{release.title}</h3>
                <div className="mono-label text-white/30 mt-1">{release.artist}</div>
              </div>
              <div className="mono-label text-white/20 text-[8px]">{release.date}</div>
            </div>
            
            <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button className="text-white/30 hover:text-white transition-colors">
                <Heart size={14} />
              </button>
              <button className="text-white/30 hover:text-white transition-colors">
                <Share2 size={14} />
              </button>
              <button className="text-white/30 hover:text-white transition-colors">
                <Music size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="py-12 border-t border-white/10 flex justify-center">
        <button className="px-12 py-4 border border-white/20 font-bold tracking-widest hover:bg-white hover:text-black transition-all">
          LOAD MORE RELEASES
        </button>
      </footer>
    </div>
  );
}
