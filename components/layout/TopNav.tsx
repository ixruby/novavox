"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { defaultSettings, type SiteSettings } from "@/lib/site-settings";

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
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(d => {
      if (d.settings) {
        setSettings((prev) => ({
          ...prev,
          ...d.settings,
          pages: { ...prev.pages, ...d.settings?.pages },
          navigation: d.settings?.navigation || prev.navigation,
          social: {
            ...prev.social,
            ...d.settings?.social,
            instagram: { ...prev.social.instagram, ...d.settings?.social?.instagram },
          },
        }));
      }
    }).catch(() => {});
  }, []);

  const visibleLinks = mainLinks.filter((link) => {
    const pageKey = link.href.replace(/^\//, "");
    const page = settings.pages?.[pageKey];
    if (page && page.visible === false) return false;

    const navItem = settings.navigation?.find((n) => n.href === link.href);
    if (navItem && navItem.visible === false) return false;

    return true;
  });

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
          {visibleLinks.map((link) => {
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
