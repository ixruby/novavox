"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { defaultSettings, type SiteSettings } from "@/lib/site-settings";

const mobileNavItems = [
  { icon: "home", href: "/", label: "Home" },
  { icon: "grid_view", href: "/releases", label: "Releases" },
  { icon: "person", href: "/artists", label: "Artists" },
  { icon: "shopping_bag", href: "/shop", label: "Shop" },
];

export default function MobileNav() {
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

  const visibleItems = mobileNavItems.filter((item) => {
    if (item.href === "/") return true;
    const pageKey = item.href.replace(/^\//, "");
    const page = settings.pages?.[pageKey];
    if (page && page.visible === false) return false;
    return true;
  });

  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-[60] block md:hidden bg-[#131313]/80 backdrop-blur-[40px] border-t border-white/5">
      <div className="flex justify-around items-center py-3">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center transition-colors duration-300 ${
                isActive ? "text-white" : "text-[#919191]"
              }`}
              aria-label={item.label}
              {...(isActive ? { "aria-current": "page" as const } : {})}
            >
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
