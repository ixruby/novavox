import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists } from "@/lib/data";

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = artists.find((a) => a.slug === params.slug);
  
  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-black/95 pointer-events-none" />
      
      {/* Nav */}
      <nav className="fixed top-0 w-full p-6 md:p-12 z-50">
        <Link href="/" className="inline-flex items-center gap-2 group hover:opacity-70 transition-opacity mix-blend-difference">
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5">Back to System</span>
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <Image 
          src={artist.image} 
          alt={artist.name} 
          fill 
          className="object-cover opacity-60 saturate-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-24 pb-12 md:pb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">
            {artist.genre} • {artist.status}
          </span>
          <h1 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-lg">
            {artist.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-24 py-20 max-w-4xl relative z-10">
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light tracking-wide">
          Experience the sonic architecture of {artist.name}. A journey through 
          {artist.genre.toLowerCase()} and experimental sound design that pushes the boundaries of standard frequency.
        </p>
        <div className="mt-16 w-32 h-[1px] bg-white/20" />
      </div>
    </div>
  );
}
