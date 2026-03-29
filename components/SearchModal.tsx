'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const searchResults = [
  { title: 'MONOLITH_X1', category: 'HARDWARE', path: '/catalog' },
  { title: 'BRUTALIST_ECHO', category: 'NARRATIVE', path: '/narrative' },
  { title: 'LYRA VOID', category: 'ARTIST', path: '/artist' },
  { title: 'SPATIAL_ARCHITECT', category: 'SYSTEM', path: '/integration' },
];

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = React.useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center pt-32 px-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-4 text-white/40 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-3xl space-y-12">
            <div className="relative">
              <SearchIcon size={32} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH_SYSTEM..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/10 py-8 pl-16 text-4xl font-bold focus:outline-none focus:border-white transition-colors uppercase tracking-tighter"
              />
            </div>

            <div className="space-y-8">
              <div className="mono-label text-white/20">QUICK_RESULTS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((result, i) => (
                  <Link 
                    key={i}
                    href={result.path}
                    onClick={onClose}
                    className="group p-6 glass border border-white/10 hover:bg-white hover:text-black transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="mono-label text-white/30 group-hover:text-black/40 transition-colors">{result.category}</div>
                      <div className="text-xl font-bold tracking-tighter">{result.title}</div>
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex justify-between items-center text-white/20">
              <div className="text-[10px] font-mono tracking-widest uppercase">ESC_TO_CLOSE</div>
              <div className="text-[10px] font-mono tracking-widest uppercase">SYSTEM_SEARCH_ACTIVE</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
