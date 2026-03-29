import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import ArtistCard from "@/components/cards/ArtistCard";
import { artists } from "@/lib/data";

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />

      <main className="relative">
        <DotGrid />

        {/* Hero */}
        <section className="py-32 px-12 max-w-[1920px] mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
            ARTIST ROSTER
          </p>
          <h1 className="font-headline text-7xl font-bold tracking-tighter text-white">
            SPATIAL ARCHIVE
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-[#919191] uppercase mt-4">
            42 ENTITIES &mdash; GLOBAL NETWORK
          </p>
          <div className="mt-6">
            <StatusIndicator label="ARCHIVE ACTIVE" active />
          </div>
        </section>

        {/* Artist Grid */}
        <section className="max-w-[1920px] mx-auto px-12 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artists.map((artist) => (
              <ArtistCard key={artist.slug} artist={artist} />
            ))}
          </div>
        </section>

        {/* HUD Overlays */}
        <SpatialHUD position="top-right" coordinates="52.5200°N, 13.4050°E" status="ROSTER_ACTIVE" />
        <SpatialHUD position="bottom-left" coordinates="GLOBAL_NET" status="12 NODES ONLINE" />
      </main>

      <Footer />
    </div>
  );
}
