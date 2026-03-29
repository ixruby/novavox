"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { icon: "home", href: "/", label: "Home" },
  { icon: "grid_view", href: "/releases", label: "Releases" },
  { icon: "person", href: "/artists", label: "Artists" },
  { icon: "shopping_bag", href: "/shop", label: "Shop" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-[#131313]/80 backdrop-blur-[40px] border-t border-white/5">
      <div className="flex justify-around items-center py-3">
        {mobileNavItems.map((item) => {
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
