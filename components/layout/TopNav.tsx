"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const mainLinks = [
  { href: "/artists", label: "ARTISTS" },
  { href: "/releases", label: "RELEASES" },
  { href: "/shop", label: "SHOP" },
  { href: "/tours", label: "TOURS" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/distribution", label: "DISTRIBUTION" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5">
      <div className="flex items-center justify-between h-full px-4 sm:px-8 md:px-12 lg:px-20">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2.5">
          <Image src="/novavox-mark-512.png" alt="" width={22} height={22} className="opacity-80" />
          <span className="font-headline font-bold tracking-[0.3em] text-sm text-white whitespace-nowrap">NOVAVOX</span>
        </Link>

        {/* Center Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/35 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right — CTA + Cart */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/30 hover:text-white transition-colors duration-300"
            aria-label="Shop"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
