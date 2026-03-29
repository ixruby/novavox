'use client';

import React, { useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'motion/react';

// Stable particle data generated once at module load
const STATIC_PARTICLES = [...Array(15)].map(() => ({
  x: (Math.random() * 100).toFixed(2) + '%',
  y: (Math.random() * 100).toFixed(2) + '%',
  zStart: Math.random() * -500,
  zEnd: Math.random() * 500,
  duration: 10 + Math.random() * 20,
  delay: Math.random() * 5
}));

export function SpatialBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none perspective-container">
      <motion.div 
        style={{ rotateX, rotateY, scale: 1.1 }}
        className="absolute inset-[-10%] grid-bg opacity-20"
      />
      
      {/* Floating particles/nodes for extra depth */}
      <div className="absolute inset-0">
        {STATIC_PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            initial={{ 
              x: p.x, 
              y: p.y,
              z: p.zStart
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              z: [p.zStart, p.zEnd]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
    </div>
  );
}
