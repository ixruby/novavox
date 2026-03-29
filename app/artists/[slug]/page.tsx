import { notFound } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/player/MusicPlayer";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import ReleaseCard from "@/components/cards/ReleaseCard";
import { artists, releases } from "@/lib/data";

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

      {/* Biography */}
      <section className="max-w-3xl mx-auto px-12 py-24">
        <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">
          BIOGRAPHY
        </p>
        <p className="text-lg text-[#919191] leading-relaxed font-body">
          {artist.bio}
        </p>
      </section>

      {/* Discography */}
      <section className="px-12 py-16 max-w-[1920px] mx-auto">
        <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
          DISCOGRAPHY
        </p>
        {artistReleases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {artistReleases.map((release) => (
              <ReleaseCard key={release.catalogNumber} release={release} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[10px] tracking-[0.3em] text-[#474747] uppercase">
              NO RELEASES IN ARCHIVE
            </p>
          </div>
        )}
      </section>

      {/* HUD Overlays */}
      <div className="relative">
        <SpatialHUD position="bottom-left" status="DISCOGRAPHY_LOADED" />
      </div>

      <Footer />
      <MusicPlayer />
    </div>
  );
}
