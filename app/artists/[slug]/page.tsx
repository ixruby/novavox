import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/player/MusicPlayer";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReleaseCard from "@/components/cards/ReleaseCard";
import { artists, releases } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) return { title: "Artist Not Found — NOVAVOX" };
  return {
    title: `${artist.name} — NOVAVOX`,
    description: `${artist.name} — ${artist.genre}. ${artist.bio?.slice(0, 150)}`,
    openGraph: {
      title: `${artist.name} — NOVAVOX`,
      description: `${artist.name} — ${artist.genre}`,
      images: [artist.image],
    },
  };
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artist = artists.find((a) => a.slug === slug);
  if (!artist) {
    notFound();
  }

  const artistReleases = releases.filter((r) => r.artistSlug === slug);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 grayscale brightness-[0.3]"
          style={{
            backgroundImage: `url('${artist.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-16 w-full">
          <span className="inline-block text-[9px] tracking-[0.3em] uppercase border border-white/20 px-3 py-1 text-[#919191] mb-6">
            {artist.status}
          </span>
          <h1 className="font-headline text-8xl font-bold tracking-tighter text-white">
            {artist.name}
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mt-4">
            {artist.genre}
          </p>
          <p className="text-[8px] tracking-[0.2em] text-[#474747] uppercase mt-2">
            {artist.coordinates}
          </p>
          <div className="flex items-center gap-12 mt-8">
            <div>
              <p className="font-headline text-2xl font-bold text-white">
                {artist.releases}
              </p>
              <p className="text-[9px] tracking-[0.2em] text-[#474747] uppercase mt-1">
                RELEASES
              </p>
            </div>
            <div>
              <p className="font-headline text-2xl font-bold text-white">
                {artist.listeners}
              </p>
              <p className="text-[9px] tracking-[0.2em] text-[#474747] uppercase mt-1">
                LISTENERS
              </p>
            </div>
          </div>
        </div>

        {/* HUD */}
        <SpatialHUD
          position="top-right"
          coordinates={artist.coordinates}
          status={artist.status}
        />
      </section>

      {/* Breadcrumbs + Info */}
      <div className="max-w-[1920px] mx-auto px-12 pt-12">
        <Breadcrumbs
          items={[
            { label: "Artists", href: "/artists" },
            { label: artist.name },
          ]}
        />
      </div>

      {/* Biography */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-12 py-24">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">
              BIOGRAPHY
            </p>
            <p className="text-lg text-[#919191] leading-relaxed font-body">
              {artist.bio}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Social Links */}
      {(artist.socialLinks?.instagram || artist.socialLinks?.soundcloud || artist.socialLinks?.bandcamp) && (
        <ScrollReveal delay={100}>
          <section className="max-w-3xl mx-auto px-12 pb-16">
            <div className="border-t border-white/5 pt-8">
              <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">
                CONNECT
              </p>
              <div className="flex items-center gap-6">
                {artist.socialLinks?.instagram && (
                  <a
                    href={artist.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#919191] hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase">Instagram</span>
                  </a>
                )}
                {artist.socialLinks?.soundcloud && (
                  <a
                    href={artist.socialLinks.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#919191] hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">cloud</span>
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase">SoundCloud</span>
                  </a>
                )}
                {artist.socialLinks?.bandcamp && (
                  <a
                    href={artist.socialLinks.bandcamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#919191] hover:text-white transition-colors group"
                  >
                    <span className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">album</span>
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase">Bandcamp</span>
                  </a>
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Discography */}
      <ScrollReveal delay={150}>
        <section className="px-12 py-16 max-w-[1920px] mx-auto">
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
              DISCOGRAPHY
            </p>
            {artistReleases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {artistReleases.map((release) => (
                  <div key={release.catalogNumber} className="hover-lift">
                    <ReleaseCard release={release} />

                    {/* Track Listing */}
                    {release.tracks.length > 0 && (
                      <div className="mt-4 border-t border-white/5 pt-4">
                        <p className="text-[8px] tracking-[0.3em] text-[#474747] uppercase mb-3">
                          TRACKLIST
                        </p>
                        <ul className="space-y-1">
                          {release.tracks.map((track) => (
                            <li
                              key={track.number}
                              className="flex items-center justify-between text-[10px] text-[#919191] py-1"
                            >
                              <span className="flex items-center gap-3">
                                <span className="text-[#474747] font-mono w-4 text-right">
                                  {track.number}
                                </span>
                                <span>{track.title}</span>
                              </span>
                              <span className="text-[#474747]">{track.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Streaming Links */}
                    {release.streamingLinks && release.streamingLinks.length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        {release.streamingLinks.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[8px] tracking-[0.2em] uppercase text-[#474747] hover:text-white transition-colors border border-white/10 px-3 py-1.5 hover:border-white/30"
                          >
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-[10px] tracking-[0.3em] text-[#474747] uppercase">
                  NO RELEASES IN ARCHIVE
                </p>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* HUD Overlays */}
      <div className="relative">
        <SpatialHUD position="bottom-left" status="DISCOGRAPHY_LOADED" />
      </div>

      <Footer />
      <MusicPlayer />
      <ScrollToTop />
    </div>
  );
}
