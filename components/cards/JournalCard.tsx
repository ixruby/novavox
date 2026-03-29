import Link from "next/link";
import { JournalEntry } from "@/lib/data";

export default function JournalCard({
  entry,
  featured = false,
}: {
  entry: JournalEntry;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link href={`/journal/${entry.slug}`} className="group block">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-7 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.2em] text-[#919191] uppercase">
              Issue {entry.issue}
            </span>
            <h2 className="font-headline text-5xl font-light tracking-wide text-[#E2E2E2] mt-4">
              {entry.title}
            </h2>
            <p className="text-sm text-[#919191] mt-4 leading-relaxed">
              {entry.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[10px] tracking-[0.2em] text-[#919191] uppercase">
                {entry.author}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#474747] uppercase">
                {entry.duration}
              </span>
            </div>
            <span className="mt-6 inline-block text-[10px] tracking-[0.2em] text-[#E2E2E2] uppercase border-b border-white/20 pb-1">
              Read the Study
            </span>
          </div>
          <div className="col-span-5">
            <div className="relative overflow-hidden aspect-[4/5] bg-[#1F1F1F]">
              <img
                src={entry.image}
                alt={entry.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${entry.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-[16/9] bg-[#1F1F1F]">
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        />
      </div>
      <div className="pt-4">
        <span className="text-[10px] tracking-[0.2em] text-[#919191] uppercase">
          Issue {entry.issue}
        </span>
        <h3 className="font-headline text-lg tracking-wide text-[#E2E2E2] mt-2">
          {entry.title}
        </h3>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] text-[#919191] uppercase">
            {entry.author}
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[#474747] uppercase">
            {entry.duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
