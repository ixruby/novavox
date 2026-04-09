'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Play, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function Player() {
  const pathname = usePathname();
  const { config } = useSiteConfig();

  if (pathname?.startsWith('/admin')) return null;
  if (!config.player.visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 p-4 md:left-64">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/10">
            <div className="w-6 h-6 bg-white/20 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest">{config.player.currentTrack}</div>
            <div className="mono-label">{config.player.currentArtist}</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white transition-colors"><Shuffle size={16} /></button>
            <button className="text-white/40 hover:text-white transition-colors"><SkipBack size={20} fill="currentColor" /></button>
            <button className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full hover:scale-110 transition-transform">
              <Play size={20} fill="currentColor" />
            </button>
            <button className="text-white/40 hover:text-white transition-colors"><SkipForward size={20} fill="currentColor" /></button>
            <button className="text-white/40 hover:text-white transition-colors"><Repeat size={16} /></button>
          </div>
          <div className="w-full max-w-md flex items-center gap-3">
            <span className="mono-label">02:45</span>
            <div className="flex-1 h-1 bg-white/10 relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: '40%' }}
                animate={{ width: '65%' }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
            <span className="mono-label">04:12</span>
          </div>
        </div>

        <div className="flex items-center gap-4 min-w-[200px] justify-end">
          <Volume2 size={16} className="text-white/40" />
          <div className="w-24 h-1 bg-white/10 relative">
            <div className="absolute inset-y-0 left-0 w-3/4 bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
