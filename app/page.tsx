import Link from "next/link";
import { navLinks } from "@/lib/data";

export default function LandingPage() {
  return (
    <div className="relative w-[300vw] h-[300vh] overflow-hidden">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)`,
          backgroundSize: "2px 2px",
        }}
      />

      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-12 bg-[#131313]/60 backdrop-blur-[40px] border-b border-white/5">
        <Link href="/" className="font-headline font-bold text-sm tracking-[0.3em] text-white uppercase">
          NOVAVOX
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.2em] uppercase text-[#919191] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="text-[#919191] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </Link>
          <button className="text-[#919191] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </nav>

      {/* 3x3 Spatial Canvas Grid */}
      <div
        className="grid transition-transform duration-[800ms]"
        style={{
          gridTemplateColumns: "repeat(3, 100vw)",
          gridTemplateRows: "repeat(3, 100vh)",
          transform: "translate(-33.333%, -33.333%)",
        }}
      >
        {/* Portal 1 — Top Left: Manifesto */}
        <section className="relative flex items-center justify-center bg-[#0E0E0E] overflow-hidden">
          <div className="text-center max-w-2xl px-12">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">MANIFESTO / 001</p>
            <h2 className="font-headline text-5xl font-light tracking-tight leading-tight text-white/80">
              Sound is <em className="font-normal italic">architecture</em><br />in motion.
            </h2>
            <p className="text-[10px] tracking-[0.2em] text-[#474747] uppercase mt-8">SCROLL TO NAVIGATE</p>
          </div>
        </section>

        {/* Portal 2 — Top Center: Featured Artist */}
        <section className="relative flex items-end bg-[#131313] overflow-hidden">
          <div
            className="absolute inset-0 grayscale brightness-[0.3]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/50 to-transparent" />
          <div className="relative z-10 p-16 pb-24">
            <p className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-4">FEATURED ARTIST</p>
            <h2 className="font-headline text-7xl font-bold tracking-tighter text-white">AURA VANCE</h2>
            <p className="text-[10px] tracking-[0.2em] text-[#474747] uppercase mt-4">SPATIAL AMBIENT — BERLIN, DE</p>
          </div>
        </section>

        {/* Portal 3 — Top Right: Coordinates */}
        <section className="relative flex items-center justify-center bg-[#0E0E0E]">
          <div className="text-right">
            <p className="text-[8px] tracking-[0.3em] text-[#474747] uppercase mb-2">LATITUDE</p>
            <p className="font-headline text-6xl font-light tracking-tight text-white/40">52.5200°N</p>
            <p className="text-[8px] tracking-[0.3em] text-[#474747] uppercase mt-6 mb-2">LONGITUDE</p>
            <p className="font-headline text-6xl font-light tracking-tight text-white/40">13.4050°E</p>
            <p className="text-[8px] tracking-[0.3em] text-[#474747] uppercase mt-8">BERLIN, GERMANY</p>
          </div>
        </section>

        {/* Portal 4 — Middle Left: Latest Release */}
        <section className="relative flex items-center bg-[#131313] overflow-hidden">
          <div
            className="absolute inset-0 grayscale brightness-[0.25]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] to-transparent" />
          <div className="relative z-10 p-16">
            <p className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-4">LATEST RELEASE / NVX001</p>
            <h2 className="font-headline text-5xl font-bold tracking-tight text-white mb-4">CONCRETE<br />RESONANCE</h2>
            <p className="text-sm text-[#919191] max-w-sm leading-relaxed mb-8">
              Four movements exploring the harmonic properties of brutalist architecture. Recorded in St. Agnes, Berlin.
            </p>
            <Link
              href="/releases"
              className="inline-block text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#1A1C1C] transition-all"
            >
              EXPLORE ARCHIVE
            </Link>
          </div>
        </section>

        {/* Portal 5 — Center (Main Hero) */}
        <section className="relative flex flex-col items-center justify-center bg-[#131313] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 bg-white animate-pulse" style={{ borderRadius: "9999px" }} />
              <span className="text-[9px] tracking-[0.3em] text-[#919191] uppercase">LIVE ARCHIVE ACTIVE</span>
            </div>
            <h1 className="font-headline text-[10rem] md:text-[12rem] font-bold tracking-tighter leading-none text-white">
              NOVA<br />VOX
            </h1>
            <p className="text-[11px] tracking-[0.5em] text-[#919191] uppercase mt-8">
              SONIC GALLERY — EST. BERLIN, 2019
            </p>
            <div className="mt-16 max-w-sm mx-auto">
              <p className="text-[10px] tracking-[0.3em] text-[#474747] uppercase mb-6">JOIN THE ARCHIVE</p>
              <div className="flex items-center border-b border-[#919191]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent text-sm text-white placeholder-[#474747] flex-1 py-3 outline-none"
                />
                <button className="text-white hover:opacity-70 transition-opacity pl-4">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute top-8 left-8 flex flex-col gap-0.5">
            <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">TRANS_VECTOR: READY</span>
            <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">NODE_ID: NVX-CENTRAL</span>
            <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">ENC_STATUS: AES-256-GCM</span>
          </div>
          <div className="absolute bottom-8 right-8 flex flex-col gap-0.5 text-right">
            <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">52.5200°N, 13.4050°E</span>
            <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">NAVIGATION ACTIVE</span>
          </div>
        </section>

        {/* Portal 6 — Middle Right: Tour */}
        <section className="relative flex items-center justify-center bg-[#0E0E0E]">
          <div className="text-center max-w-lg">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">GLOBAL CIRCUIT 2024</p>
            <h2 className="font-headline text-4xl font-light tracking-tight text-white mb-8">
              6 CITIES.<br />12 NODES.<br />360° SPATIAL.
            </h2>
            <div className="flex flex-col gap-4 text-left max-w-xs mx-auto">
              {["BERLIN", "TOKYO", "LONDON", "NEW YORK", "PARIS", "REYKJAVIK"].map((city) => (
                <div key={city} className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-[10px] tracking-[0.2em] text-[#919191] uppercase">{city}</span>
                  <span className="text-[8px] tracking-[0.15em] text-[#474747]">2024</span>
                </div>
              ))}
            </div>
            <Link
              href="/tours"
              className="inline-block mt-8 text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#1A1C1C] transition-all"
            >
              VIEW SCHEDULE
            </Link>
          </div>
        </section>

        {/* Portal 7 — Bottom Left: Journal */}
        <section className="relative flex items-center bg-[#131313] overflow-hidden">
          <div
            className="absolute inset-0 grayscale brightness-[0.2]"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-[#131313]/70 to-transparent" />
          <div className="relative z-10 p-16">
            <p className="text-[10px] tracking-[0.3em] text-[#919191] uppercase mb-4">SONIC JOURNAL / ISSUE 042</p>
            <h2 className="font-headline text-4xl font-light tracking-tight text-white mb-4">
              The Architecture<br />of <em className="italic font-normal">Decay</em>
            </h2>
            <p className="text-sm text-[#919191] max-w-sm leading-relaxed mb-6">
              How entropy shapes the sonic character of Berlin&apos;s abandoned industrial spaces.
            </p>
            <Link
              href="/journal"
              className="text-[10px] tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity"
            >
              READ THE STUDY →
            </Link>
          </div>
        </section>

        {/* Portal 8 — Bottom Center: Shop */}
        <section className="relative flex items-center justify-center bg-[#0E0E0E]">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">TECHNICAL OBJECTS</p>
            <h2 className="font-headline text-5xl font-light tracking-tight text-white mb-4">SONIC<br />OBJECTS</h2>
            <p className="text-[10px] tracking-[0.2em] text-[#919191] uppercase mb-8">ARCHIVAL PRESSINGS & EQUIPMENT</p>
            <Link
              href="/shop"
              className="inline-block text-[10px] tracking-[0.2em] uppercase bg-white text-[#1A1C1C] px-8 py-3 hover:bg-[#D4D4D4] transition-colors"
            >
              ENTER SHOP
            </Link>
          </div>
        </section>

        {/* Portal 9 — Bottom Right: Distribution */}
        <section className="relative flex items-center justify-center bg-[#131313]">
          <div className="text-center max-w-md">
            <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">SUBMISSIONS</p>
            <h2 className="font-headline text-3xl font-light tracking-tight text-white mb-4">
              ARCHITECTING THE<br />FUTURE OF SOUND.
            </h2>
            <p className="text-sm text-[#919191] leading-relaxed mb-8">
              NovaVox operates a sovereign distribution network. Submit your spatial audio work for consideration.
            </p>
            <Link
              href="/distribution"
              className="inline-block text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#1A1C1C] transition-all"
            >
              SUBMIT WORK
            </Link>
          </div>
        </section>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] text-[#474747] uppercase animate-pulse">
          DRAG TO EXPLORE THE ARCHIVE
        </span>
      </div>
    </div>
  );
}
