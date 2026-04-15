import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/get-data";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { artists, releases } = await getSiteData();
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = releases.filter((r) => r.artistSlug === artist.slug);
  const relatedArtists = artists.filter((a) => a.slug !== artist.slug && a.status === "ACTIVE").slice(0, 4);

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-[#0a0a0a] text-white pt-16">

        {/* Hero Image */}
        <div className="relative w-full h-[50vh] md:h-[70vh]">
          <Image src={artist.image} alt={artist.name} fill className="object-cover opacity-50 saturate-50" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-20 pb-10 md:pb-16">
            <div className="max-w-7xl mx-auto">
              <Breadcrumbs items={[{ label: "Artists", href: "/artists" }, { label: artist.name }]} />
              <div className="flex items-center gap-3 mt-6 mb-4">
                <span className="font-mono text-[8px] tracking-widest text-white/30 border border-white/10 px-2 py-0.5">{artist.genre}</span>
                <span className={`font-mono text-[8px] tracking-widest px-2 py-0.5 ${artist.status === "ACTIVE" ? "text-green-400/60 border border-green-400/20" : artist.status === "EMERGING" ? "text-blue-400/60 border border-blue-400/20" : "text-white/20 border border-white/5"}`}>{artist.status}</span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">{artist.name}</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.35fr] gap-16 lg:gap-24">
              {/* Left — Bio + Releases */}
              <div>
                {/* Bio */}
                <section className="mb-16">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-4">Biography</span>
                  <p className="text-base md:text-lg text-white/50 leading-relaxed mb-6">{artist.bio}</p>
                  <p className="text-xs text-white/25 leading-relaxed">
                    Based at coordinates {artist.coordinates}, {artist.name.split(" ")[0].toLowerCase()} continues to push the boundaries of {artist.genre.toLowerCase()} through experimental sound design, live installations, and collaborative projects with Novavox.
                  </p>
                </section>

                {/* Discography */}
                {artistReleases.length > 0 && (
                  <section className="mb-16">
                    <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-6">Discography</span>
                    <div className="space-y-[1px]">
                      {artistReleases.map((release) => (
                        <Link key={release.catalogNumber} href="/releases" className="group flex items-center gap-6 bg-black/30 hover:bg-white/[0.03] transition-colors duration-500 p-4">
                          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                            <Image src={release.image} alt={release.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" sizes="64px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-headline text-sm font-bold uppercase tracking-tight text-white truncate">{release.title}</h3>
                            <span className="font-mono text-[9px] text-white/20 tracking-widest">{release.genre} — {release.year}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-[8px] text-white/15 tracking-widest hidden md:block">{release.catalogNumber}</span>
                            <span className="font-mono text-[7px] text-white/20 border border-white/5 px-2 py-0.5">{release.format}</span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Track listing for first release */}
                    {artistReleases[0] && (
                      <div className="mt-8 border-t border-white/5 pt-8">
                        <span className="font-mono text-[8px] tracking-[0.3em] text-white/15 uppercase block mb-4">Track Listing — {artistReleases[0].title}</span>
                        <div className="space-y-0">
                          {artistReleases[0].tracks.map((track) => (
                            <div key={track.number} className="flex items-center justify-between py-3 border-b border-white/[0.03] group hover:bg-white/[0.01] transition-colors">
                              <div className="flex items-center gap-4">
                                <span className="font-mono text-[9px] text-white/15 w-12">{track.number}</span>
                                <span className="font-mono text-[11px] text-white/40 group-hover:text-white/60 transition-colors">{track.title}</span>
                              </div>
                              <span className="font-mono text-[10px] text-white/15">{track.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}
              </div>

              {/* Right — Stats + Links */}
              <div>
                <div className="sticky top-24 space-y-10">
                  {/* Stats */}
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-6">Stats</span>
                    <div className="space-y-5">
                      {[
                        { label: "Monthly Listeners", value: artist.listeners },
                        { label: "Releases", value: String(artist.releases) },
                        { label: "Coordinates", value: artist.coordinates },
                        { label: "Genre", value: artist.genre },
                      ].map(s => (
                        <div key={s.label} className="flex justify-between border-b border-white/5 pb-4">
                          <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">{s.label}</span>
                          <span className="font-mono text-[11px] text-white/50 text-right">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  {artist.socialLinks && (
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase block mb-4">Listen</span>
                      <div className="space-y-2">
                        {Object.entries(artist.socialLinks).map(([platform, url]) => (
                          <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-white/[0.02] hover:px-2 transition-all">
                            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">{platform}</span>
                            <span className="material-symbols-outlined text-white/15 text-[14px]">open_in_new</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Streaming Buttons */}
                  <div className="space-y-2">
                    <button className="font-mono text-[9px] tracking-[0.25em] bg-white text-black px-5 py-3 hover:bg-white/90 transition-colors uppercase w-full text-center">Play on Spotify</button>
                    <button className="font-mono text-[9px] tracking-[0.25em] text-white/40 border border-white/10 px-5 py-3 hover:bg-white/5 transition-colors uppercase w-full text-center">Apple Music</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Artists */}
            <section className="mt-24 border-t border-white/5 pt-16">
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase">Related Artists</span>
                <Link href="/artists" className="font-mono text-[9px] tracking-[0.25em] text-white/20 hover:text-white transition-colors uppercase">View All &rarr;</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5">
                {relatedArtists.map((a) => (
                  <Link key={a.slug} href={`/artist/${a.slug}`} className="group block bg-black/40 hover:bg-white/[0.03] transition-colors duration-500">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image src={a.image} alt={a.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="font-headline text-sm font-bold uppercase tracking-tight text-white block">{a.name}</span>
                        <span className="font-mono text-[8px] text-white/25 tracking-widest">{a.genre}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <ScrollToTop />
      </div>
      <Footer />
    </>
  );
}
