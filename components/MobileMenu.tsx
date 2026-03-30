"use client";

import { useState } from "react";

const menuLinks = [
  { href: "#home", label: "HOME" },
  { href: "#services", label: "SERVICES" },
  { href: "#portfolio", label: "PORTFOLIO" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="text-[#919191] hover:text-white transition-colors z-[60] relative"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="material-symbols-outlined text-[20px]">
          {open ? "close" : "menu"}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[55] bg-[#0e0e0e]/95 backdrop-blur-xl flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl sm:text-3xl font-headline font-bold tracking-[0.15em] text-white/70 hover:text-white transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <a href="tel:+916282725324" className="text-[10px] tracking-[0.15em] text-[#474747] hover:text-white transition-colors">
              +91 62827 25324
            </a>
            <a href="mailto:kaushik2002.22@gmail.com" className="text-[10px] tracking-[0.15em] text-[#474747] hover:text-white transition-colors">
              kaushik2002.22@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
