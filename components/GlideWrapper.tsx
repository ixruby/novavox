'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export function GlideWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 0, 
          rotateY: 15, 
          z: -500,
          scale: 0.9,
          x: 100
        }}
        animate={{ 
          opacity: 1, 
          rotateY: 0, 
          z: 0,
          scale: 1,
          x: 0
        }}
        exit={{ 
          opacity: 0, 
          rotateY: -15, 
          z: -500,
          scale: 0.9,
          x: -100
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for "glide" feel
        }}
        className="glide-content min-h-screen w-full flex flex-col"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
