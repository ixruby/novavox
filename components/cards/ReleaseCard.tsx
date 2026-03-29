import Link from "next/link";
import { Release } from "@/lib/data";

export default function ReleaseCard({ release }: { release: Release }) {
  return (
    <Link href="/releases" className="group block">
      <div className="relative overflow-hidden aspect-square bg-[#1F1F1F]">
        <img
          src={release.image}
          alt={release.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        />
        <span className="absolute top-4 left-4 text-[9px] tracking-[0.3em] text-white/60 uppercase">
          {release.catalogNumber}
        </span>
        <span className="absolute top-4 right-4 text-[8px] tracking-[0.15em] bg-white/10 px-2 py-1 text-white">
          {release.format}
        </span>
      </div>
      <div className="pt-4">
        <h3 className="font-headline text-sm tracking-wide font-medium text-[#E2E2E2]">
          {release.title}
        </h3>
        <p className="text-[10px] text-[#919191] tracking-[0.15em] uppercase mt-1">
          {release.artist}
        </p>
        <p className="text-[9px] text-[#474747] tracking-[0.15em] mt-1">
          {release.year}
        </p>
      </div>
    </Link>
  );
}
