"use client";

import { useState, useMemo } from "react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ReleaseCard from "@/components/cards/ReleaseCard";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { DotGrid } from "@/components/ui/DotGrid";
import { releases } from "@/lib/data";

type SortOption = "newest" | "oldest" | "title-az" | "title-za";

export default function ReleasesPage() {
  const [formatFilter, setFormatFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [artistFilter, setArtistFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const years = useMemo(() => [...new Set(releases.map((r) => String(r.year)))].sort().reverse(), []);
  const artistNames = useMemo(() => [...new Set(releases.map((r) => r.artist))].sort(), []);
  const formats = ["ALL", "PHYSICAL", "DIGITAL", "SPATIAL"];

  const filtered = useMemo(() => {
    let result = releases;
    if (formatFilter !== "ALL") result = result.filter((r) => r.format === formatFilter);
    if (yearFilter !== "ALL") result = result.filter((r) => String(r.year) === yearFilter);
    if (artistFilter !== "ALL") result = result.filter((r) => r.artist === artistFilter);

    switch (sortBy) {
      case "newest": return [...result].sort((a, b) => b.year - a.year);
      case "oldest": return [...result].sort((a, b) => a.year - b.year);
      case "title-az": return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "title-za": return [...result].sort((a, b) => b.title.localeCompare(a.title));
      default: return result;
    }
  }, [formatFilter, yearFilter, artistFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />

      <main className="relative min-h-screen">
        <DotGrid />

        <div className="pt-32 pb-24 px-8 md:px-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">
              ARCHIVE / RELEASES
            </p>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
              CATALOG
            </h1>
            <p className="text-sm text-[#919191] max-w-lg mb-12">
              The complete NOVAVOX release archive. Physical pressings, digital masters, and spatial audio experiences.
            </p>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-white/5">
              {/* Format Tabs */}
              <div className="flex items-center gap-1">
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormatFilter(f)}
                    className={`text-[9px] tracking-[0.2em] uppercase px-4 py-2 transition-colors ${
                      formatFilter === f
                        ? "bg-white text-[#1A1C1C]"
                        : "text-[#919191] hover:text-white border border-white/5 hover:border-white/20"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="hidden md:block w-px h-6 bg-white/10" />

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-transparent text-[9px] tracking-[0.2em] uppercase text-[#919191] border border-white/10 px-3 py-2 outline-none hover:border-white/20 cursor-pointer"
                aria-label="Filter by year"
              >
                <option value="ALL" className="bg-[#131313]">ALL YEARS</option>
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#131313]">{y}</option>
                ))}
              </select>

              {/* Artist Filter */}
              <select
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
                className="bg-transparent text-[9px] tracking-[0.2em] uppercase text-[#919191] border border-white/10 px-3 py-2 outline-none hover:border-white/20 cursor-pointer"
                aria-label="Filter by artist"
              >
                <option value="ALL" className="bg-[#131313]">ALL ARTISTS</option>
                {artistNames.map((a) => (
                  <option key={a} value={a} className="bg-[#131313]">{a}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-[9px] tracking-[0.2em] uppercase text-[#919191] border border-white/10 px-3 py-2 outline-none hover:border-white/20 cursor-pointer ml-auto"
                aria-label="Sort releases"
              >
                <option value="newest" className="bg-[#131313]">NEWEST FIRST</option>
                <option value="oldest" className="bg-[#131313]">OLDEST FIRST</option>
                <option value="title-az" className="bg-[#131313]">TITLE A&rarr;Z</option>
                <option value="title-za" className="bg-[#131313]">TITLE Z&rarr;A</option>
              </select>
            </div>

            {/* Results count */}
            <p className="text-[9px] tracking-[0.2em] text-[#474747] uppercase mb-8">
              {filtered.length} {filtered.length === 1 ? "RELEASE" : "RELEASES"} FOUND
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((release) => (
                  <ReleaseCard key={release.catalogNumber} release={release} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-[#474747] text-sm">No releases match the current filters.</p>
                <button
                  onClick={() => {
                    setFormatFilter("ALL");
                    setYearFilter("ALL");
                    setArtistFilter("ALL");
                  }}
                  className="text-[10px] tracking-[0.2em] uppercase text-white mt-4 border border-white/20 px-6 py-2 hover:bg-white hover:text-[#1A1C1C] transition-all"
                >
                  CLEAR FILTERS
                </button>
              </div>
            )}
          </div>
        </div>

        {/* HUD Overlays */}
        <SpatialHUD position="top-right" coordinates="CATALOG_SYS" status="ARCHIVE ONLINE" />
        <SpatialHUD position="bottom-left" coordinates="NVX-REGISTRY" status={`${filtered.length} LOADED`} />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
