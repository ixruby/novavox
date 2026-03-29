"use client";

import { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { FilterTabs } from "@/components/ui/FilterTabs";
import ReleaseCard from "@/components/cards/ReleaseCard";
import { releases } from "@/lib/data";

type ReleaseFilter = "ALL" | "PHYSICAL" | "DIGITAL" | "SPATIAL";

export default function ReleasesPage() {
  const [activeFilter, setActiveFilter] = useState<ReleaseFilter>("ALL");

  const filteredReleases =
    activeFilter === "ALL"
      ? releases
      : releases.filter((r) => r.format === activeFilter);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />

      <main className="relative min-h-screen">
        <DotGrid />

        {/* Hero */}
        <section className="pt-32 pb-16 px-12 max-w-[1920px] mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
            CATALOG
          </p>
          <h1 className="font-headline text-7xl font-bold tracking-tighter text-white">
            RELEASES
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-[#919191] uppercase mt-4 mb-8">
            {releases.length} ENTRIES &mdash; NVX001-NVX012
          </p>
          <FilterTabs
            filters={["ALL", "PHYSICAL", "DIGITAL", "SPATIAL"]}
            active={activeFilter}
            onChange={(f) => setActiveFilter(f as ReleaseFilter)}
          />
        </section>

        {/* Release Grid */}
        <section className="px-12 pb-24 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            {filteredReleases.map((release) => (
              <ReleaseCard key={release.catalogNumber} release={release} />
            ))}
          </div>
        </section>

        {/* HUD Overlays */}
        <SpatialHUD position="top-right" coordinates="CATALOG_SYS" status="ARCHIVE ONLINE" />
        <SpatialHUD position="bottom-left" coordinates="NVX-REGISTRY" status={`${filteredReleases.length} LOADED`} />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
