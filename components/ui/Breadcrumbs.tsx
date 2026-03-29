import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase">
      <Link href="/" className="text-[#474747] hover:text-white transition-colors">
        NOVAVOX
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-[#474747]">/</span>
          {item.href ? (
            <Link href={item.href} className="text-[#474747] hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#919191]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
