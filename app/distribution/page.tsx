import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import SideNav from "@/components/layout/SideNav";
import { DotGrid } from "@/components/ui/DotGrid";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import SubmissionForm from "@/components/forms/SubmissionForm";

const sideNavItems = [
  { icon: "spatial_audio", label: "SPATIAL AUDIO", href: "#" },
  { icon: "data_object", label: "TECHNICAL DATA", href: "#", active: true },
  { icon: "graphic_eq", label: "FREQUENCIES", href: "#" },
  { icon: "inventory_2", label: "ARCHIVE", href: "#" },
];

export default function DistributionPage() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#E2E2E2]">
      <TopNav />
      <SideNav items={sideNavItems} />

      <main className="ml-20">
        {/* Hero */}
        <section className="pt-32 pb-16 px-12">
          <div className="grid grid-cols-12 gap-12">
            {/* Text */}
            <div className="col-span-7 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-6">
                DISTRIBUTION NETWORK
              </span>
              <h1 className="font-headline text-5xl font-bold tracking-tight text-[#E2E2E2] mb-6">
                ARCHITECTING THE<br />
                FUTURE OF SOUND.
              </h1>
              <p className="text-sm text-[#919191] leading-relaxed max-w-xl">
                NovaVox operates a sovereign distribution network spanning 4
                continents. Every release is mastered for spatial audio, encoded
                with lossless fidelity, and delivered through our proprietary
                low-latency infrastructure. We do not distribute sound. We
                architect its arrival.
              </p>
            </div>

            {/* Image */}
            <div className="col-span-5">
              <div className="relative aspect-[4/5] bg-[#1F1F1F] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, transparent 0%, #0E0E0E 100%)",
                  }}
                />
                <SpatialHUD position="bottom-left" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#474747]">
                    Reference: Studio V1-B (Berlin)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="px-12 py-16">
          <div className="grid grid-cols-4 gap-6">
            {/* Large Card — Network Map */}
            <div className="col-span-3 relative bg-[#1F1F1F] h-[500px] overflow-hidden">
              <DotGrid />

              {/* Grid lines simulating network map */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #474747 1px, transparent 1px), linear-gradient(to bottom, #474747 1px, transparent 1px)",
                  backgroundSize: "100px 60px",
                }}
              />

              {/* Title */}
              <div className="absolute top-8 left-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#919191]">
                  GLOBAL NETWORK
                </span>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-8 left-8 flex gap-8">
                <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                  LATENCY: 2.4ms
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                  UPTIME: 99.9%
                </span>
              </div>

              <div className="absolute bottom-8 right-8">
                <button className="border border-white/20 text-[10px] tracking-[0.2em] px-6 py-3 text-[#E2E2E2] uppercase hover:bg-white hover:text-[#1A1C1C] transition-all">
                  VIEW HUB MAP
                </button>
              </div>

              <StatusIndicator label="NETWORK ONLINE" active />
            </div>

            {/* Stats Sidebar */}
            <div className="col-span-1 bg-[#1B1B1B] p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mb-6">
                  TIER 1 PARTNERS
                </h3>
                <ul className="space-y-4">
                  {["Berlin", "Tokyo", "London", "NYC"].map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-3 text-sm text-[#E2E2E2]"
                    >
                      <span
                        className="w-1.5 h-1.5 bg-white"
                        style={{ borderRadius: "9999px" }}
                      />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#919191] mb-4">
                  DATA FLOW
                </h3>
                <p className="font-headline text-2xl font-light text-[#E2E2E2]">
                  840 TB/mo
                </p>
                <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                  Processing
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Submission Section */}
        <section className="px-12 py-24">
          <div className="grid grid-cols-2 gap-16">
            {/* Left — Info Panel */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-6">
                SUBMISSION PROTOCOL
              </span>
              <h2 className="font-headline text-3xl tracking-wide text-[#E2E2E2] mb-8">
                SUBMIT YOUR WORK
              </h2>
              <p className="text-sm text-[#919191] leading-relaxed mb-8">
                All submissions are reviewed by the NovaVox curatorial board
                within 14 days. We accept spatial audio mixes (Dolby Atmos, WFS,
                Ambisonics), lossless stereo masters, and technical demos. Files
                must meet our minimum specifications: 24-bit / 96kHz, WAV or
                FLAC format.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 border border-white/5 p-4">
                  <span className="material-symbols-outlined text-[18px] text-[#919191]">
                    lock
                  </span>
                  <div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#E2E2E2] block">
                      AES-256 ENCRYPTED
                    </span>
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                      End-to-end encryption on all uploads
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 border border-white/5 p-4">
                  <span className="material-symbols-outlined text-[18px] text-[#919191]">
                    cloud_upload
                  </span>
                  <div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#E2E2E2] block">
                      COLD STORAGE ARCHIVE
                    </span>
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#474747]">
                      All submissions permanently archived
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <SubmissionForm />
            </div>
          </div>
        </section>

        {/* Technical Guide Carousel */}
        <section className="px-12 py-16">
          <span className="text-[10px] tracking-[0.3em] text-[#919191] uppercase block mb-8">
            TECHNICAL GUIDE
          </span>

          <div
            className="flex overflow-x-auto gap-8 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              { chapter: "01", title: "SPATIAL MAPPING" },
              { chapter: "02", title: "FREQUENCY DYNAMICS" },
              { chapter: "03", title: "CORE ARCHITECTURE" },
            ].map((guide) => (
              <div
                key={guide.chapter}
                className="w-[400px] flex-shrink-0 relative aspect-[3/4] bg-[#1F1F1F] overflow-hidden group hover:bg-[#2A2A2A] transition-colors"
              >
                <DotGrid />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="font-headline text-8xl font-bold text-white/5 absolute top-8 right-8">
                    {guide.chapter}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#474747] mb-2">
                    Ch {guide.chapter}
                  </span>
                  <h3 className="font-headline text-2xl tracking-wide text-[#E2E2E2]">
                    {guide.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
