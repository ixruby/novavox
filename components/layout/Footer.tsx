"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { defaultSettings, type SiteSettings } from "@/lib/site-settings";

export default function Footer() {
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
          contact: { ...prev.contact, ...d.settings?.contact, buttons: d.settings?.contact?.buttons || prev.contact.buttons },
          footer: { ...prev.footer, ...d.settings?.footer },
        }));
      }
    }).catch(() => {});
  }, []);

  const phoneDigits = useMemo(() => (settings.contact.phone || "").replace(/[^\d]/g, ""), [settings.contact.phone]);
  const whatsappDigits = useMemo(() => (settings.contact.whatsapp || "").replace(/[^\d]/g, ""), [settings.contact.whatsapp]);

  const exploreLinks = useMemo(() => (
    [
      { label: "Artists", href: "/artists", key: "artists" },
      { label: "Releases", href: "/releases", key: "releases" },
      { label: "Shop", href: "/shop", key: "shop" },
      { label: "Tours", href: "/tours", key: "tours" },
      { label: "Journal", href: "/journal", key: "journal" },
    ].filter(link => settings.pages[link.key]?.visible !== false)
  ), [settings.pages]);

  const studioLinks = useMemo(() => (
    [
      { label: "Gallery", href: "/gallery", key: "gallery" },
      { label: "Distribution", href: "/distribution", key: "distribution" },
      { label: "Player", href: "/player", key: "player" },
      { label: "Catalog", href: "/catalog", key: "catalog" },
    ].filter(link => !settings.pages[link.key] || settings.pages[link.key].visible !== false)
  ), [settings.pages]);

  return (
    <footer role="contentinfo" className="w-full bg-[#080808] border-t border-white/5 px-6 md:px-12 lg:px-20 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <span className="font-headline text-sm font-bold tracking-[0.3em] text-white block mb-4">NOVAVOX</span>
            <p className="text-[10px] text-white/20 leading-relaxed max-w-[200px]">
              {settings.footer.tagline}
            </p>
          </div>

          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Explore</span>
            <div className="space-y-2.5">
              {exploreLinks.map(link => (
                <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Studio</span>
            <div className="space-y-2.5">
              {studioLinks.map(link => (
                <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Contact</span>
            <div className="space-y-2.5">
              <a href={`mailto:${settings.contact.email}`} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Email</a>
              <a href={whatsappDigits ? `https://wa.me/${whatsappDigits}` : "#"} target="_blank" rel="noopener noreferrer" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">WhatsApp</a>
              <a href={phoneDigits ? `tel:+${phoneDigits}` : "#"} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Phone</a>
              {settings.social.instagram.enabled !== false && settings.social.instagram.username ? (
                <a href={`https://instagram.com/${settings.social.instagram.username}`} target="_blank" rel="noopener noreferrer" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Instagram</a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[8px] text-white/15 tracking-widest">&copy; {new Date().getFullYear()} {settings.footer.copyright}</span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[8px] text-white/15 tracking-widest">DESIGNED BY <a href={settings.footer.creditLink} target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">{settings.footer.credit}</a></span>
            <Link href="/admin/login" className="font-mono text-[8px] text-white/30 hover:text-white/70 transition-colors tracking-widest">ADMIN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
