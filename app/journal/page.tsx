import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import JournalCard from "@/components/cards/JournalCard";
import EmailCapture from "@/components/forms/EmailCapture";
import { journalEntries } from "@/lib/data";

export default function JournalPage() {
  const featuredEntry = journalEntries.find((e) => e.type === "ESSAY") ?? journalEntries[0];
  const noteEntries = journalEntries.filter((e) => e.type === "NOTE");
  const interviewEntries = journalEntries.filter((e) => e.type === "INTERVIEW");

  return (
    <div className="min-h-screen bg-[#131313] text-[#E2E2E2]">
      <TopNav />

      <main>
        {/* Featured Article */}
        <section className="pt-32 pb-16 px-12 max-w-[1920px] mx-auto">
          <JournalCard entry={featuredEntry} featured />
        </section>

        {/* Archival Notes Bento */}
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
                  {isFirst && <DotGrid />}

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#474747]">
                        Issue {entry.issue}
                      </span>
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
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                      {entry.author}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Studies / Interviews */}
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
              {interviewEntries.map((entry) => (
                <div
                  key={entry.slug}
                  className="flex items-center gap-6 border-b border-white/5 py-8 group cursor-pointer hover:bg-[#1B1B1B]/50 transition-colors -mx-4 px-4"
                >
                  {/* Portrait Placeholder */}
                  <div className="w-16 h-16 bg-[#1F1F1F] grayscale flex-shrink-0 overflow-hidden">
                    <div
                      className="w-full h-full opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at center, #474747 0%, transparent 70%)",
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-headline text-xl tracking-wide text-[#E2E2E2] group-hover:text-white transition-colors">
                      {entry.title}
                    </h3>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mt-1 block">
                      {entry.author}
                    </span>
                  </div>

                  {/* Play Button + Duration */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#474747]">
                      {entry.duration}
                    </span>
                    <button className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1A1C1C] transition-all text-[#E2E2E2]">
                      <span className="material-symbols-outlined text-[18px]">
                        play_arrow
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 text-center">
          <EmailCapture />
        </section>

        <Footer />
      </main>
    </div>
  );
}
