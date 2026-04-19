"use client";

import { useState } from "react";

const menuLinks = [
  { href: "#home", label: "HOME" },
  { href: "#services", label: "SERVICES" },
  { href: "#portfolio", label: "PORTFOLIO" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = href.replace("#", "");
    window.dispatchEvent(new CustomEvent("nav-spatial", { detail: target }));
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white shadow-2xl hover:bg-white/20 transition-all z-[60] relative cursor-pointer"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="material-symbols-outlined text-[24px]">
          {open ? "close" : "menu"}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[55] bg-[#0e0e0e]/95 backdrop-blur-xl flex flex-col items-center justify-center h-[100dvh]">
          <nav className="flex flex-col items-center justify-center gap-10 w-full h-full pb-20">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-2xl sm:text-3xl font-headline font-bold tracking-[0.15em] text-white/70 hover:text-white transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <a href="tel:+916282725324" className="text-[10px] tracking-[0.15em] text-[#474747] hover:text-white transition-colors">
              +91 6282 725 324
            </a>
            <a href="mailto:novavoxofficial@gmail.com" className="text-[10px] tracking-[0.15em] text-[#474747] hover:text-white transition-colors">
              novavoxofficial@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}
