'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Grid, 
  Box, 
  Layers, 
  User, 
  ShoppingBag, 
  Share2, 
  Music,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  { name: 'HOME', path: '/', icon: Home },
  { name: 'CATALOG', path: '/catalog', icon: Box },
  { name: 'INTEGRATION', path: '/integration', icon: Layers },
  { name: 'NARRATIVE', path: '/narrative', icon: Music },
  { name: 'GALLERY', path: '/gallery', icon: Grid },
  { name: 'ARTIST', path: '/artist', icon: User },
  { name: 'RELEASES', path: '/releases', icon: Share2 },
  { name: 'CHECKOUT', path: '/checkout', icon: ShoppingBag },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 p-2 glass rounded-none md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/10 transition-transform duration-500 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-8">
          <div className="mb-12">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              NOVAVOX
            </Link>
            <div className="mono-label mt-1">SONIC ARCHITECTURE</div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 text-xs font-medium tracking-widest transition-all duration-300 group",
                    isActive ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={16} className={cn(isActive ? "text-black" : "text-white/30 group-hover:text-white")} />
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="ml-auto w-1 h-4 bg-black"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="mono-label mb-4">SYSTEM STATUS</div>
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              CORE ENGINE ONLINE
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
