'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Layers, Box, Music } from 'lucide-react';
import Link from 'next/link';
import { useSiteConfig } from '@/context/SiteConfigContext';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Box, Layers, Music };

export default function Home() {
  const { config } = useSiteConfig();

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-center perspective-container">
        <div className="absolute inset-0 grid-bg opacity-20 -z-10" />
        <div className="scanline" />

        <div className="max-w-4xl glide-content">
          <motion.div
            initial={{ opacity: 0, y: 20, z: -100 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mono-label mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-white/30" />
              {config.hero.label}
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] mb-8 tracking-tighter">
              {config.hero.headline} <br />
              <span className="text-white/20">{config.hero.headlineFaded}</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-12 leading-relaxed">
              {config.hero.description}
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href={config.hero.ctaPrimaryLink}
                className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all"
              >
                {config.hero.ctaPrimary}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-4 px-8 py-4 border border-white/20 font-bold tracking-widest hover:bg-white/5 transition-all">
                <Play size={18} fill="currentColor" />
                {config.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements with 3D Parallax */}
        {config.hero.showDecorativeElements && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block perspective-container">
            <div className="relative w-96 h-96 glide-content">
              <motion.div
                className="absolute inset-0 border border-white/10"
                animate={{ rotate: 360, z: [0, 50, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 border border-white/20"
                animate={{ rotate: -360, z: [0, -50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-16 border border-white/40"
                animate={{ rotate: 180, z: [0, 100, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-32 bg-white/20" />
                <div className="w-32 h-1 bg-white/20 absolute" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 border border-white/10">
        {config.features.items.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Box;
          return (
            <Link
              key={i}
              href={feature.link}
              className="group bg-black p-12 hover:bg-white/5 transition-all duration-500"
            >
              <Icon size={32} className="mb-8 text-white/40 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {feature.desc}
              </p>
              <div className="mono-label group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                VIEW DETAILS <ArrowRight size={10} />
              </div>
            </Link>
          );
        })}
      </section>

      {/* Quote Section */}
      <section className="py-32 border-y border-white/10 flex flex-col items-center text-center">
        <div className="mono-label mb-8">{config.manifesto.label}</div>
        <blockquote className="text-4xl md:text-6xl font-bold max-w-5xl leading-tight tracking-tighter italic">
          &quot;{config.manifesto.quote}&quot;
        </blockquote>
        <div className="mt-12 text-white/40 font-mono text-sm">{config.manifesto.attribution}</div>
      </section>
    </div>
  );
}
