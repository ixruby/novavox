'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Maximize2, Share2, Heart } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export default function Gallery() {
  const { config } = useSiteConfig();
  const visibleItems = config.galleryItems.filter(g => g.visible);

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <div className="mono-label mb-4">GALLERY_V1.0</div>
          <h1 className="text-6xl font-bold">THE SONIC GALLERY</h1>
        </div>
        <p className="text-white/50 max-w-md text-sm leading-relaxed">
          A visual exploration of the intersection between sound, architecture, and modernist design principles.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[1200px]">
        {visibleItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`${item.span} relative group overflow-hidden bg-white/5 border border-white/10`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="mono-label bg-black/50 px-2 py-1 backdrop-blur-sm border border-white/10">
                  {item.category}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 glass border border-white/10 hover:bg-white/10 transition-colors">
                    <Heart size={14} />
                  </button>
                  <button className="p-2 glass border border-white/10 hover:bg-white/10 transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold tracking-tighter">{item.title}</h3>
                  <div className="mono-label text-white/40 mt-1">ID_00{item.id}</div>
                </div>
                <button className="p-3 bg-white text-black hover:scale-110 transition-transform">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="py-12 border-t border-white/10 flex justify-center">
        <button className="px-12 py-4 border border-white/20 font-bold tracking-widest hover:bg-white hover:text-black transition-all">
          LOAD MORE ASSETS
        </button>
      </footer>
    </div>
  );
}
