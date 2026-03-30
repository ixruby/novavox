'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, MessageCircle, Camera, Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="mt-32 py-16 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            NOVAVOX
          </Link>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">
            International Modernist Sonic Architecture. 
            High contrast, monochrome, sharp edges, cinematic, architectural.
          </p>
          <div className="flex gap-4">
            <button className="text-white/30 hover:text-white transition-colors">
              <MessageCircle size={18} />
            </button>
            <button className="text-white/30 hover:text-white transition-colors">
              <Camera size={18} />
            </button>
            <button className="text-white/30 hover:text-white transition-colors">
              <Globe size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="mono-label">EXPLORE</div>
          <nav className="flex flex-col gap-4">
            <Link href="/catalog" className="text-xs font-medium text-white/50 hover:text-white transition-colors">CATALOG</Link>
            <Link href="/integration" className="text-xs font-medium text-white/50 hover:text-white transition-colors">INTEGRATION</Link>
            <Link href="/narrative" className="text-xs font-medium text-white/50 hover:text-white transition-colors">NARRATIVE</Link>
            <Link href="/gallery" className="text-xs font-medium text-white/50 hover:text-white transition-colors">GALLERY</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="mono-label">SYSTEM</div>
          <nav className="flex flex-col gap-4">
            <Link href="/artist" className="text-xs font-medium text-white/50 hover:text-white transition-colors">ARTIST PROFILE</Link>
            <Link href="/checkout" className="text-xs font-medium text-white/50 hover:text-white transition-colors">CHECKOUT</Link>
            <Link href="/distribution" className="text-xs font-medium text-white/50 hover:text-white transition-colors">DISTRIBUTION</Link>
            <Link href="/releases" className="text-xs font-medium text-white/50 hover:text-white transition-colors">RELEASES</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="mono-label">NEWSLETTER</div>
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                placeholder="EMAIL_ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 text-xs focus:outline-none focus:border-white transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={16} className="text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mail"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Mail size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              {isSubscribed ? "SUBSCRIPTION_CONFIRMED" : "JOIN THE SONIC NETWORK FOR UPDATES."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="mono-label text-white/20">© 2026 NOVAVOX_LABS. ALL_RIGHTS_RESERVED.</div>
        <div className="flex gap-8">
          <Link href="#" className="mono-label text-white/20 hover:text-white transition-colors">PRIVACY_POLICY</Link>
          <Link href="#" className="mono-label text-white/20 hover:text-white transition-colors">TERMS_OF_SERVICE</Link>
          <Link href="#" className="mono-label text-white/20 hover:text-white transition-colors">SYSTEM_STATUS</Link>
        </div>
      </div>
    </footer>
  );
}
