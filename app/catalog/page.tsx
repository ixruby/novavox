'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Info } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const objects = [
  {
    id: '01',
    name: 'MONOLITH_X1',
    category: 'SPATIAL TRANSDUCER',
    price: '$2,400',
    image: 'https://picsum.photos/seed/monolith/800/800',
    specs: ['360° DISPERSION', 'CARBON FIBER CHASSIS', 'HAPTIC FEEDBACK']
  },
  {
    id: '02',
    name: 'VOID_RESONATOR',
    category: 'ACOUSTIC DIFFUSER',
    price: '$1,850',
    image: 'https://picsum.photos/seed/resonator/800/800',
    specs: ['PARAMETRIC DESIGN', 'SOLID ALUMINUM', 'FREQUENCY TUNED']
  },
  {
    id: '03',
    name: 'NEBULA_ARRAY',
    category: 'ATMOSPHERIC SYSTEM',
    price: '$4,200',
    image: 'https://picsum.photos/seed/nebula/800/800',
    specs: ['16-CHANNEL OUTPUT', 'AI CALIBRATION', 'MODULAR DESIGN']
  },
  {
    id: '04',
    name: 'PULSE_MODULE',
    category: 'KINETIC AUDIO',
    price: '$950',
    image: 'https://picsum.photos/seed/pulse/800/800',
    specs: ['VIBRATION ISOLATION', 'OLED DISPLAY', 'WIRELESS SYNC']
  }
];

export default function Catalog() {
  const { addToCart } = useCart();

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div>
          <div className="mono-label mb-4">CATALOG_V4.0</div>
          <h1 className="text-6xl font-bold">SONIC OBJECTS</h1>
        </div>
        <p className="text-white/50 max-w-md text-sm leading-relaxed">
          A collection of precision-engineered audio hardware designed for architectural integration and spatial sonic exploration.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {objects.map((obj, i) => (
          <motion.div 
            key={obj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden relative">
              <Image 
                src={obj.image} 
                alt={obj.name}
                fill
                className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 mono-label bg-black/50 px-2 py-1 backdrop-blur-sm">
                ID_{obj.id}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
                <button 
                  onClick={() => addToCart(obj)}
                  className="w-full py-4 bg-white text-black font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                >
                  <ShoppingCart size={16} />
                  ADD TO SYSTEM
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-start">
              <div>
                <div className="mono-label text-white/30 mb-1">{obj.category}</div>
                <h3 className="text-2xl font-bold tracking-tighter">{obj.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {obj.specs.map(spec => (
                    <span key={spec} className="text-[9px] border border-white/10 px-2 py-0.5 text-white/40 uppercase tracking-widest">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xl font-bold">{obj.price}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-white/5 p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border border-white/20 flex items-center justify-center">
            <Info size={24} className="text-white/40" />
          </div>
          <div>
            <h4 className="text-xl font-bold">CUSTOM ARCHITECTURE</h4>
            <p className="text-white/50 text-sm">Need a bespoke sonic solution for your space?</p>
          </div>
        </div>
        <button className="px-8 py-4 border border-white font-bold tracking-widest hover:bg-white hover:text-black transition-all">
          CONSULTATION
        </button>
      </section>
    </div>
  );
}
