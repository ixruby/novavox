import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import SideNav from "@/components/layout/SideNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TourEventRow from "@/components/cards/TourEventRow";
import { getSiteData } from "@/lib/get-data";

const sideNavItems = [
  { icon: "event", label: "UPCOMING", href: "#schedule", active: true },
  { icon: "public", label: "LOCATIONS", href: "#map" },
  { icon: "map", label: "CARTOGRAPHY", href: "#" },
  { icon: "card_membership", label: "MEMBERSHIP", href: "#" },
];

export const metadata: Metadata = {
  title: "Global Circuit — NOVAVOX",
  description: "NOVAVOX world tour. Spatial audio experiences across six continents.",
  openGraph: {
    title: "Global Circuit — NOVAVOX",
    description: "NOVAVOX world tour. Spatial audio experiences across six continents.",
    siteName: "NOVAVOX",
    type: "website",
  },
};

export default async function ToursPage() {
  const { tourEvents } = await getSiteData();
  return (
    <div className="min-h-screen bg-[#131313] text-[#E2E2E2]">
      <TopNav />
      <SideNav items={sideNavItems} />

      <main className="ml-0 md:ml-20">
        {/* Hero Map Section */}
        <section
          id="map"
          className="relative aspect-[21/9] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] bg-[#0E0E0E] overflow-hidden"
        >
          <DotGrid />

          {/* Grid pattern simulating a map */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, #2A2A2A 1px, transparent 1px), linear-gradient(to bottom, #2A2A2A 1px, transparent 1px)",
              backgroundSize: "120px 80px",
            }}
          />

          {/* Horizontal scan line */}
          <div
            className="absolute left-0 right-0 h-px bg-white/10"
            style={{ top: "45%" }}
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-white/10"
            style={{ left: "50%" }}
          />

          {/* Berlin Node */}
          <div
            className="absolute flex flex-col items-center gap-2"
            style={{ left: "42%", top: "30%" }}
          >
            <span className="w-2 h-2 bg-white animate-pulse" style={{ borderRadius: "9999px" }} />
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#919191]">
              BERLIN
            </span>
          </div>

          {/* Tokyo Node */}
          <div
            className="absolute flex flex-col items-center gap-2"
            style={{ left: "78%", top: "38%" }}
          >
            <span className="w-2 h-2 bg-white animate-pulse" style={{ borderRadius: "9999px" }} />
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#919191]">
              TOKYO
            </span>
          </div>

          {/* Overlay Stats */}
          <div className="absolute top-8 left-8 flex flex-col gap-1">
            <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
              ACTIVE NODES: 12
            </span>
            <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
              SIGNAL STRENGTH: 0.98%
            </span>
          </div>

          {/* Frequency Indicator */}
          <div className="absolute bottom-8 left-8">
            <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
              SCANNING: 432HZ / 528HZ
            </span>
          </div>

          {/* Status Indicator */}
          <div className="absolute bottom-8 right-8">
            <StatusIndicator label="SPATIAL NETWORK" active />
          </div>

          <SpatialHUD position="top-right" />
        </section>

        {/* Breadcrumbs */}
        <div className="px-6 sm:px-12 pt-8">
          <Breadcrumbs items={[{ label: "Tours" }]} />
        </div>

        {/* Schedule Section */}
        <section id="schedule" className="px-6 sm:px-12 py-16 max-w-[1400px]">
          <h2 className="font-headline text-3xl tracking-wide text-[#E2E2E2] mb-12">
            SCHEDULE.2024
          </h2>
          <ScrollReveal>
            <div>
              {tourEvents.map((event) => (
                <TourEventRow key={event.city} event={event} />
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Editorial Section */}
        <section className="px-6 sm:px-12 py-24">
          <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left — Image */}
            <div className="md:col-span-5 group">
              <div className="relative aspect-[4/5] bg-[#1F1F1F] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80"
                  alt="Brutalist architecture"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right — Philosophy */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <blockquote className="font-headline text-4xl font-light italic text-[#E2E2E2] leading-snug mb-12">
                &ldquo;Architecture is Frozen Music.<br />
                NovaVox is the thaw.&rdquo;
              </blockquote>

              <div className="flex gap-12">
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191]">
                    360&deg; SPATIAL
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191]">
                    WFS / ATMOS
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191]">
                    IMMERSIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        <Footer />
        <ScrollToTop />
      </main>
    </div>
  );
}
