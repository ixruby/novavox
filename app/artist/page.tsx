'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Play, Share2, Heart, Music, Layers, Box } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

const equipIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MONOLITH_X1: Box, VOID_RESONATOR: Layers, NEBULA_ARRAY: Music,
};

export default function Artist() {
  const { config } = useSiteConfig();
  const visibleTracks = config.tracks.filter(t => t.visible);

  return (
    <div className="space-y-32">
      <section className="relative h-[60vh] flex flex-col justify-end pb-12">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={config.artist.heroImage}
            alt={`${config.artist.name} ${config.artist.nameFaded}`}
            fill
            className="object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mono-label mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/30" />
              {config.artist.label}
            </div>
            <h1 className="text-8xl md:text-[12rem] font-bold leading-[0.8] mb-8 tracking-tighter">
              {config.artist.name} <br />
              <span className="text-white/20">{config.artist.nameFaded}</span>
            </h1>
            <div className="flex flex-wrap gap-8 items-center">
              <button className="px-12 py-5 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all flex items-center gap-4">
                <Play size={20} fill="currentColor" />
                PLAY DISCOGRAPHY
              </button>
              <div className="flex gap-4">
                <button className="p-4 glass border border-white/10 hover:bg-white/10 transition-colors"><Heart size={20} /></button>
                <button className="p-4 glass border border-white/10 hover:bg-white/10 transition-colors"><Share2 size={20} /></button>
              </div>
              <div className="mono-label text-white/40">{config.artist.monthlyListeners}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <h2 className="text-3xl font-bold">POPULAR RELEASES</h2>
            <div className="mono-label text-white/30">VIEW ALL</div>
          </div>

          <div className="space-y-2">
            {visibleTracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group flex items-center gap-8 p-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5"
              >
                <div className="mono-label text-white/20 w-8">{track.id}</div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Play size={16} className="opacity-0 group-hover:opacity-100" />
                  <Music size={16} className="group-hover:hidden" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold tracking-widest">{track.title}</div>
                  <div className="mono-label text-white/30 mt-1">SONIC ARCHITECTURE</div>
                </div>
                <div className="mono-label text-white/30 hidden md:block">{track.plays} PLAYS</div>
                <div className="mono-label text-white/30">{track.duration}</div>
                <button className="text-white/20 hover:text-white transition-colors"><Heart size={14} /></button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-6">BIOGRAPHY</h2>
            <p className="text-white/50 text-sm leading-relaxed">{config.artist.biography}</p>
            <div className="flex flex-wrap gap-4">
              {config.artist.tags.map(tag => (
                <span key={tag} className="text-[10px] border border-white/10 px-3 py-1 text-white/40 tracking-widest">{tag}</span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-b border-white/10 pb-6">EQUIPMENT</h2>
            <div className="space-y-4">
              {config.artist.equipment.map((name, i) => {
                const Icon = equipIcons[name] || Box;
                return (
                  <div key={i} className="flex items-center gap-4 p-4 glass border border-white/10 hover:bg-white/5 transition-colors group">
                    <Icon size={18} className="text-white/40 group-hover:text-white transition-colors" />
                    <div className="mono-label">{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
