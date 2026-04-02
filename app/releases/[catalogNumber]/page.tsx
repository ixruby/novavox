import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { releases, artists } from "@/lib/data";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default async function ReleasePage({ params }: { params: Promise<{ catalogNumber: string }> }) {
  const { catalogNumber } = await params;
  const release = releases.find((r) => r.catalogNumber.toLowerCase() === catalogNumber.toLowerCase());

  if (!release) {
    notFound();
  }

  const artist = artists.find((a) => a.slug === release.artistSlug);
  const otherReleases = releases.filter((r) => r.catalogNumber !== release.catalogNumber).slice(0, 4);

  const totalDuration = release.tracks.reduce((acc, t) => {
    const [min, sec] = t.duration.split(":").map(Number);
    return acc + min * 60 + sec;
  }, 0);
  const totalMin = Math.floor(totalDuration / 60);
  const totalSec = totalDuration % 60;

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">

        {/* Hero — Album art + metadata */}
        <section className="px-6 md:px-12 lg:px-20 pt-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={[{ label: "Releases", href: "/releases" }, { label: release.title }]} />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 mt-10">
              {/* Album Cover */}
              <div className="relative aspect-square overflow-hidden">
                <Image src={release.image} alt={release.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 45vw" priority />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[8px] tracking-widest bg-black/60 backdrop-blur-sm px-2.5 py-1 text-white/50">{release.catalogNumber}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="font-mono text-[8px] tracking-widest bg-black/60 backdrop-blur-sm px-2.5 py-1 text-white/40">{release.format}</span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[8px] tracking-widest text-white/20 block mb-3">{release.genre} — {release.year}</span>
                  <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">{release.title}</h1>

                  <Link href={`/artist/${release.artistSlug}`} className="inline-flex items-center gap-2 group mb-8">
                    {artist && (
                      <div className="relative w-8 h-8 overflow-hidden">
                        <Image src={artist.image} alt={artist.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" sizes="32px" />
                      </div>
                    )}
                    <span className="font-mono text-[11px] tracking-widest text-white/40 group-hover:text-white transition-colors">{release.artist}</span>
                  </Link>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-6 border-t border-b border-white/5 py-6 mb-8">
                    <div>
                      <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">Tracks</span>
                      <span className="font-headline text-xl font-bold text-white">{release.tracks.length}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">Duration</span>
                      <span className="font-headline text-xl font-bold text-white">{totalMin}:{String(totalSec).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[7px] tracking-widest text-white/15 uppercase block">Format</span>
                      <span className="font-headline text-xl font-bold text-white">{release.format}</span>
                    </div>
                  </div>

                  {release.credits && (
                    <p className="text-[11px] text-white/25 leading-relaxed mb-8">{release.credits}</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="space-y-2">
                  {release.streamingLinks?.map((link) => (
                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 px-4 border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group">
                      <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">{link.platform}</span>
                      <span className="material-symbols-outlined text-white/15 text-[16px] group-hover:text-white/40 transition-colors">open_in_new</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Listing */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-8">Track Listing</span>
            <div className="border-t border-white/5">
              {release.tracks.map((track, i) => (
                <div key={track.number} className="flex items-center justify-between py-5 border-b border-white/[0.04] group hover:bg-white/[0.01] hover:px-3 transition-all">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[11px] text-white/15 w-8 text-center">{String(i + 1).padStart(2, "0")}</span>
                    <div className="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white/30 text-[18px]">play_arrow</span>
                    </div>
                    <div>
                      <span className="font-headline text-sm font-semibold text-white group-hover:text-white transition-colors block">{track.title}</span>
                      <span className="font-mono text-[8px] text-white/15 tracking-widest">{track.number}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-white/20">{track.duration}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <span className="font-mono text-[9px] text-white/15 tracking-widest">{release.tracks.length} TRACKS</span>
              <span className="font-mono text-[9px] text-white/15 tracking-widest">TOTAL: {totalMin}:{String(totalSec).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        {/* More Releases */}
        <section className="px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase">More Releases</span>
              <Link href="/releases" className="font-mono text-[9px] tracking-[0.25em] text-white/20 hover:text-white transition-colors uppercase">Full Catalog &rarr;</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
              {otherReleases.map((r) => (
                <Link key={r.catalogNumber} href={`/releases/${r.catalogNumber}`} className="group block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={r.image} alt={r.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[7px] tracking-widest bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-white/40">{r.catalogNumber}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-headline text-[11px] font-bold uppercase tracking-tight text-white truncate">{r.title}</h3>
                    <span className="font-mono text-[8px] text-white/20 tracking-widest">{r.artist}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
}
