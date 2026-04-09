'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchModal } from './SearchModal';

export function TopNav() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { totalItems } = useCart();
  const { config } = useSiteConfig();
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith('/admin')) return null;

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6 transition-all duration-500 md:left-64",
        isScrolled ? "glass border-b border-white/10 py-4" : "bg-transparent"
      )}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            {config.systemVersion}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setIsSearchOpen(true)} className="text-white/50 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button className="text-white/50 hover:text-white transition-colors">
            <User size={18} />
          </button>
          <Link href="/checkout" className="relative text-white/50 hover:text-white transition-colors">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black text-[8px] font-bold flex items-center justify-center rounded-full"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
