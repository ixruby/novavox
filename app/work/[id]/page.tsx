import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioWorks } from "@/lib/data";

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = portfolioWorks.find((w) => w.id === params.id);
  
  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 w-full p-6 md:p-12 z-50">
        <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-70 transition-opacity mix-blend-difference">
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5">Back to System</span>
        </Link>
      </nav>

      <div className="relative w-full h-[70vh]">
        <Image 
          src={work.image} 
          alt={work.title} 
          fill 
          className="object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 md:px-24 pb-12 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">
              {work.category} • {work.year}
            </span>
            <h1 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tight max-w-4xl">
              {work.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-24 py-20 max-w-3xl">
        <p className="text-sm md:text-lg text-white/50 leading-loose">
          {work.description}
        </p>
      </div>
    </div>
  );
}
