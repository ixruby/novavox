'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Share2, Globe, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Distribution() {
  return (
    <div className="space-y-32">
      <header className="max-w-4xl">
        <div className="mono-label mb-6">DISTRIBUTION_V1.0</div>
        <h1 className="text-7xl font-bold leading-none mb-8">ARCHITECTING THE <br /> <span className="text-white/20">FUTURE OF SOUND</span></h1>
        <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
          NOVAVOX provides a decentralized distribution network for sonic architects. 
          Share your spatial audio experiences with a global audience through our high-fidelity infrastructure.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="space-y-12">
          {[
            {
              title: 'GLOBAL REACH',
              desc: 'Deploy your sonic objects and narrative journeys to listeners across 120+ countries.',
              icon: Globe
            },
            {
              title: 'LOSSLESS STREAMING',
              desc: 'Our network supports up to 24-bit/192kHz spatial audio distribution without compromise.',
              icon: Zap
            },
            {
              title: 'SECURE LICENSING',
              desc: 'Blockchain-backed rights management ensures your architectural soundscapes are protected.',
              icon: ShieldCheck
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-8 group"
            >
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 uppercase">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative glass border border-white/10 p-12 flex flex-col justify-center space-y-8 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10 -z-10" />
          <div className="scanline" />
          
          <div className="mono-label mb-4">PARTNER_WITH_US</div>
          <h2 className="text-4xl font-bold leading-tight uppercase">JOIN THE <br /> SONIC NETWORK</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            We are looking for visionary artists and architects to help us define the next generation of spatial audio. 
            Apply to become a verified NOVAVOX distributor.
          </p>
          
          <div className="space-y-4 pt-8">
            <button className="w-full py-5 bg-white text-black font-bold tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-4">
              APPLY NOW <ArrowRight size={20} />
            </button>
            <button className="w-full py-5 border border-white/20 text-white font-bold tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-4">
              <Share2 size={18} />
              SHARE NETWORK
            </button>
          </div>
        </div>
      </div>

      {/* Network Map Mockup */}
      <section className="relative h-[400px] border border-white/10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${(i * 137) % 100}%`,
                  left: `${(i * 241) % 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: (i % 5),
                }}
              />
            ))}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="white" strokeWidth="1" />
              <line x1="40%" y1="60%" x2="80%" y2="30%" stroke="white" strokeWidth="1" />
              <line x1="80%" y1="30%" x2="20%" y2="80%" stroke="white" strokeWidth="1" />
              <line x1="20%" y1="80%" x2="10%" y2="20%" stroke="white" strokeWidth="1" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-8 left-8 mono-label text-white/40">
          LIVE_NETWORK_NODES: 1,242_ACTIVE
        </div>
      </section>
    </div>
  );
}
