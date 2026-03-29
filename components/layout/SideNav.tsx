"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavItem {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

interface SideNavProps {
  items: SideNavItem[];
}

export default function SideNav({ items }: SideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="group/nav fixed left-0 top-16 bottom-0 z-40 w-20 hover:w-64 transition-all duration-500 bg-[#0E0E0E] border-r border-white/5 overflow-hidden">
      <nav className="flex flex-col pt-4">
        {items.map((item) => {
          const isActive =
            item.active ??
            (pathname === item.href || pathname.startsWith(item.href + "/"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 py-4 px-6 transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-[#919191] hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">
                {item.icon}
              </span>
              <span className="text-[10px] tracking-[0.15em] uppercase whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
