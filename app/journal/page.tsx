import type { Metadata } from "next";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollReveal from "@/components/ui/ScrollReveal";
import JournalCard from "@/components/cards/JournalCard";
import EmailCapture from "@/components/forms/EmailCapture";
import { journalEntries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sonic Journal — NOVAVOX",
  description: "Essays, field notes, and interviews exploring the intersection of sound, space, and architecture.",
  openGraph: {
    title: "Sonic Journal — NOVAVOX",
    description: "Essays, field notes, and interviews exploring the intersection of sound, space, and architecture.",
    siteName: "NOVAVOX",
    type: "website",
  },
};

export default function JournalPage() {
  const featuredEntry = journalEntries.find((e) => e.type === "ESSAY") ?? journalEntries[0];
  const noteEntries = journalEntries.filter((e) => e.type === "NOTE");
  const interviewEntries = journalEntries.filter((e) => e.type === "INTERVIEW");

  // Related articles — pick 3 entries that are not the featured one
  const relatedEntries = journalEntries
    .filter((e) => e.slug !== featuredEntry.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#131313] text-[#E2E2E2]">
      <TopNav />

      <main>
        {/* Breadcrumbs */}
        <div className="max-w-[1920px] mx-auto px-12 pt-32 pb-4">
          <Breadcrumbs items={[{ label: "Journal" }]} />
        </div>

        {/* Featured Article */}
        <ScrollReveal>
          <section className="pb-16 px-12 max-w-[1920px] mx-auto">
            <JournalCard entry={featuredEntry} featured />

            {/* Author bio + read time + sharing under featured */}
            <div className="mt-8 grid grid-cols-12 gap-8">
              <div className="col-span-7">
                <div className="border-t border-white/5 pt-6">
                  <div className="flex items-center gap-6">
                    <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                      {featuredEntry.readTime || "5 MIN READ"}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] text-[#474747]">|</span>
                    <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                      BY {featuredEntry.author}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#919191] leading-relaxed mt-3 max-w-md">
                    {featuredEntry.author} explores the boundaries of sonic architecture
                    through field recordings and spatial analysis.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <button aria-label="Share on X" className="text-[#474747] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">share</span>
                    </button>
                    <button aria-label="Copy link" className="text-[#474747] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[16px]">link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Archival Notes Bento */}
        <ScrollReveal delay={100}>
          <section className="px-12 py-16 max-w-[1920px] mx-auto">
            <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase block mb-8">
              ARCHIVAL NOTES
            </span>

            <div className="grid grid-cols-4 gap-6 auto-rows-[200px]">
              {noteEntries.map((entry, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;

                return (
                  <div
                    key={entry.slug}
                    className={`bg-[#1F1F1F] p-6 relative overflow-hidden hover:bg-[#2A2A2A] transition-colors group cursor-pointer ${
                      isFirst
                        ? "col-span-2 row-span-2"
                        : isSecond
                          ? "col-span-2 row-span-1"
                          : "col-span-1"
                    }`}
                  >
                    {isFirst && (
                      <>
                        <img
                          src={entry.image}
                          alt={entry.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2]"
                        />
                        <DotGrid />
                      </>
                    )}

                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] tracking-[0.2em] uppercase text-[#474747]">
                            Issue {entry.issue}
                          </span>
                          <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                            {entry.readTime || "5 MIN READ"}
                          </span>
                        </div>
                        <h3
                          className={`font-headline tracking-wide text-[#E2E2E2] mt-2 ${
                            isFirst ? "text-2xl" : "text-lg"
                          }`}
                        >
                          {entry.title}
                        </h3>
                        {isFirst && (
                          <p className="text-sm text-[#919191] mt-3 leading-relaxed line-clamp-3">
                            {entry.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                          {entry.author}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button aria-label="Share on X" className="text-[#474747] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[14px]">share</span>
                          </button>
                          <button aria-label="Copy link" className="text-[#474747] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[14px]">link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Technical Studies / Interviews */}
        <ScrollReveal delay={150}>
          <section className="px-12 py-24 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-12 gap-12">
              {/* Left — Label & Decorative */}
              <div className="col-span-4">
                <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase block mb-8">
                  TECHNICAL STUDIES
                </span>

                <div className="flex flex-col gap-1 mt-12">
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    SYS_LOG: ARCHIVE LOADED
                  </span>
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    INTERVIEW_COUNT: {interviewEntries.length}
                  </span>
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    FORMAT: AUDIO + TRANSCRIPT
                  </span>
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    ENCODING: SPATIAL_STEREO
                  </span>
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    STATUS: CLASSIFIED
                  </span>
                </div>

                <SpatialHUD position="bottom-left" />
              </div>

              {/* Right — Interviews */}
              <div className="col-span-8">
                {interviewEntries.map((entry) => {
                  const portraitMap: Record<string, string> = {
                    "Sarah Kovac": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
                    "Marcus Vane": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
                  };
                  const portraitUrl = portraitMap[entry.author];
                  return (
                  <div
                    key={entry.slug}
                    className="flex items-center gap-6 border-b border-white/5 py-8 group cursor-pointer hover:bg-[#1B1B1B]/50 transition-colors -mx-4 px-4"
                  >
                    {/* Portrait */}
                    <div className="w-16 h-16 bg-[#1F1F1F] grayscale group-hover:brightness-125 transition-all duration-500 flex-shrink-0 overflow-hidden">
                      {portraitUrl ? (
                        <img
                          src={portraitUrl}
                          alt={entry.author}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full opacity-30"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at center, #474747 0%, transparent 70%)",
                          }}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-headline text-xl tracking-wide text-[#E2E2E2] group-hover:text-white transition-colors">
                        {entry.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191]">
                          {entry.author}
                        </span>
                        <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                          {entry.readTime || "5 MIN READ"}
                        </span>
                      </div>
                    </div>

                    {/* Play Button + Duration + Share */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[10px] tracking-[0.15em] uppercase text-[#474747]">
                        {entry.duration}
                      </span>
                      <button className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1A1C1C] transition-all text-[#E2E2E2]">
                        <span className="material-symbols-outlined text-[18px]">
                          play_arrow
                        </span>
                      </button>
                      <button aria-label="Share" className="text-[#474747] hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-[16px]">share</span>
                      </button>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Related Articles */}
        <ScrollReveal delay={200}>
          <section className="px-12 py-16 max-w-[1920px] mx-auto">
            <div className="border-t border-white/5 pt-12">
              <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
                RELATED READING
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedEntries.map((entry) => (
                  <div key={entry.slug} className="group cursor-pointer hover-lift">
                    <div className="relative overflow-hidden aspect-[16/9] bg-[#1F1F1F]">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                          Issue {entry.issue}
                        </span>
                        <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
                          {entry.readTime || "5 MIN READ"}
                        </span>
                      </div>
                      <h3 className="font-headline text-lg tracking-wide text-[#E2E2E2] mt-2 group-hover:text-white transition-colors">
                        {entry.title}
                      </h3>
                      <p className="text-[11px] text-[#919191] mt-2 leading-relaxed line-clamp-2">
                        {entry.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                          {entry.author}
                        </span>
                        <div className="flex items-center gap-2">
                          <button aria-label="Share on X" className="text-[#474747] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[14px]">share</span>
                          </button>
                          <button aria-label="Copy link" className="text-[#474747] hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[14px]">link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Newsletter */}
        <section className="py-24 text-center">
          <EmailCapture />
        </section>

        <Footer />
        <MobileNav />
        <ScrollToTop />
      </main>
    </div>
  );
}
