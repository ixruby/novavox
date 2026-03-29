'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Layers, Maximize, Settings, Zap } from 'lucide-react';

export default function Integration() {
  return (
    <div className="space-y-32">
      <header className="max-w-3xl">
        <div className="mono-label mb-6">SPATIAL_ARCHITECT_V2.1</div>
        <h1 className="text-7xl font-bold leading-none mb-8">SONIC INTEGRATION</h1>
        <p className="text-xl text-white/60 leading-relaxed">
          The Spatial Architect is a proprietary software suite designed to map, simulate, and optimize sonic environments in real-time. 
          Integrate NOVAVOX hardware with your physical space for unparalleled acoustic precision.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Interactive Visualizer Mockup */}
        <div className="relative aspect-square glass border border-white/10 overflow-hidden group">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-64 h-64 border-2 border-white/40 relative"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />
              
              <motion.div 
                className="absolute inset-8 border border-white/20"
                animate={{ rotate: -720 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
          
          <div className="absolute top-8 left-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              SCANNING_ENVIRONMENT...
            </div>
            <div className="text-[10px] font-mono text-white/20">X: 45.23 | Y: 12.89 | Z: 0.00</div>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-4">
            <button className="p-3 glass border border-white/10 hover:bg-white/10 transition-colors">
              <Maximize size={16} />
            </button>
            <button className="p-3 glass border border-white/10 hover:bg-white/10 transition-colors">
              <Settings size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-12">
          {[
            {
              title: 'ACOUSTIC MAPPING',
              desc: 'Utilize LiDAR and ultrasonic sensors to create a high-fidelity 3D map of your space.',
              icon: Layers
            },
            {
              title: 'REAL-TIME OPTIMIZATION',
              desc: 'Dynamic frequency adjustment based on room occupancy and environmental noise.',
              icon: Zap
            },
            {
              title: 'MODULAR EXPANSION',
              desc: 'Seamlessly add new SONIC OBJECTS to your existing architectural network.',
              icon: Settings
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-8 group"
            >
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-8">
            <button className="w-full py-5 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all">
              DOWNLOAD SUITE
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specs Section */}
      <section className="border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { label: 'LATENCY', value: '< 1.2MS' },
            { label: 'CHANNELS', value: 'UP TO 128' },
            { label: 'PRECISION', value: '0.01MM' },
            { label: 'COMPATIBILITY', value: 'OSX / WIN' }
          ].map((stat, i) => (
            <div key={i} className="p-12 text-center space-y-2">
              <div className="mono-label text-white/30">{stat.label}</div>
              <div className="text-3xl font-bold tracking-tighter">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
