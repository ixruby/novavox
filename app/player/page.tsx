import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import SideNav from "@/components/layout/SideNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

const sideNavItems = [
  { icon: "overview", label: "OVERVIEW", href: "#", active: true },
  { icon: "data_object", label: "METADATA", href: "#" },
  { icon: "tune", label: "PROCESS", href: "#" },
  { icon: "history", label: "VERSIONS", href: "#" },
];

const tracks = [
  { id: "NV-001", title: "Foundation Layer", duration: "8:42" },
  { id: "NV-002", title: "Steel Harmonic", duration: "6:15" },
  { id: "NV-003", title: "Void Chamber", duration: "11:03" },
  { id: "NV-004", title: "Architectural Decay", duration: "7:58" },
];

const structures = [
  {
    label: "STRUCTURE 01",
    title: "Brutalist Framework",
    pattern:
      "repeating-linear-gradient(45deg, #2A2A2A 0px, #2A2A2A 1px, transparent 1px, transparent 12px)",
  },
  {
    label: "STRUCTURE 02",
    title: "Organic Synthesis",
    pattern:
      "radial-gradient(circle at 30% 40%, #2A2A2A 0%, transparent 50%), radial-gradient(circle at 70% 60%, #353535 0%, transparent 40%)",
  },
  {
    label: "STRUCTURE 03",
    title: "Vector Core",
    pattern:
      "repeating-linear-gradient(0deg, #2A2A2A 0px, #2A2A2A 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, #2A2A2A 0px, #2A2A2A 1px, transparent 1px, transparent 8px)",
  },
];

const specs = [
  { label: "FORMAT", value: "Spatial Audio 7.1.4 Atmos" },
  { label: "SAMPLE RATE", value: "96kHz / 24-bit" },
  { label: "CODEC", value: "FLAC Lossless" },
  { label: "MASTER", value: "St. Agnes, Berlin" },
];

export default function PlayerPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <TopNav />
      <SideNav items={sideNavItems} />

      <main className="relative ml-20">
        <DotGrid />

        {/* ——— Hero ——— */}
        <section className="relative min-h-[80vh] bg-[#131313] overflow-hidden flex items-end">
          {/* Background pattern */}
          <div
            className="absolute inset-0 bg-[#1F1F1F] grayscale brightness-[0.3]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0px, transparent 40px, #2A2A2A 40px, #2A2A2A 41px), repeating-linear-gradient(45deg, transparent 0px, transparent 40px, #1B1B1B 40px, #1B1B1B 41px)",
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent" />

          {/* HUD */}
          <div className="absolute top-8 right-8 z-10">
            <SpatialHUD
              position="top-right"
              coordinates="52.5200°N, 13.4050°E"
              status="RENDERING"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-16 pb-20 w-full">
            {/* Status badges */}
            <div className="flex gap-4">
              <span className="text-[9px] tracking-[0.15em] uppercase border border-white/10 px-3 py-1 text-[#919191]">
                Status: Stable
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase border border-white/10 px-3 py-1 text-[#919191]">
                Node: 0x77-NB
              </span>
            </div>

            <h1 className="font-headline text-7xl md:text-8xl font-bold tracking-tighter mt-6">
              CONCRETE RESONANCE
            </h1>

            <p className="text-[11px] tracking-[0.3em] text-[#919191] mt-4 uppercase">
              NVX001 &mdash; SPATIAL AUDIO EXPERIENCE
            </p>

            <p className="text-sm text-[#919191] max-w-2xl leading-relaxed mt-6 border-l-2 border-white/10 pl-6">
              Four movements exploring the harmonic properties of brutalist
              architecture. Recorded in St. Agnes, Berlin. Mastered at
              96kHz/24-bit for spatial reproduction.
            </p>

            {/* CTAs */}
            <div className="flex gap-4 mt-8">
              <button className="bg-white text-[#1A1C1C] px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[#D4D4D4] transition">
                INITIATE SEQUENCE
              </button>
              <button className="border border-white/20 text-white px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-white/5 transition">
                DOWNLOAD DATA
              </button>
            </div>
          </div>
        </section>

        {/* ——— Track Manifest ——— */}
        <section className="px-12 py-16 max-w-[1400px]">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
            TRACK MANIFEST
          </p>

          <div className="flex flex-col">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center py-6 border-b border-white/5 hover:bg-[#1B1B1B] transition group"
              >
                <span className="w-16 text-[10px] text-[#474747] tracking-[0.15em]">
                  {track.id}
                </span>
                <span className="w-8 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#474747] group-hover:text-white transition">
                    play_arrow
                  </span>
                </span>
                <span className="flex-1 font-headline text-lg font-medium pl-4">
                  {track.title}
                </span>
                <span className="w-20 text-right text-[10px] text-[#919191] tracking-[0.15em]">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ——— System Components ——— */}
        <section className="px-12 py-24">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
            SYSTEM COMPONENTS
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {structures.map((structure) => (
              <div
                key={structure.label}
                className="group relative overflow-hidden"
              >
                {/* Image area */}
                <div className="aspect-[4/5] bg-[#1F1F1F] relative">
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundImage: structure.pattern }}
                  />

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#131313] to-transparent">
                    <span className="text-[9px] tracking-[0.3em] text-[#474747] uppercase">
                      {structure.label}
                    </span>
                    <p className="font-headline text-lg font-medium mt-1">
                      {structure.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ——— Technical Specifications ——— */}
        <section className="px-12 py-16 bg-[#0E0E0E]">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
            TECHNICAL SPECIFICATIONS
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase mb-2">
                  {spec.label}
                </span>
                <span className="text-sm text-[#E2E2E2]">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
