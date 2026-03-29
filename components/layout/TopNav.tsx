"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#131313]/60 backdrop-blur-[40px] border-b border-white/5">
      <div className="flex items-center justify-between h-full px-4 sm:px-12">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className="font-headline font-bold tracking-[0.3em] text-sm text-white"
        >
          NOVAVOX
        </Link>

        {/* Center Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[10px] tracking-[0.2em] uppercase font-body transition-colors duration-300 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-[#919191] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#919191] hover:text-white transition-colors duration-300"
            aria-label="Shopping bag"
          >
            <span className="material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
          </button>
          <button
            type="button"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#919191] hover:text-white transition-colors duration-300 md:hidden"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
