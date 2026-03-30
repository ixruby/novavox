import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { InteractiveHeroBackground } from "@/components/InteractiveHeroBackground";

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)`,
          backgroundSize: "2px 2px",
        }}
      />

      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 sm:px-8 md:px-12 bg-[#0a0a0a]/80 backdrop-blur-[40px] border-b border-white/5">
        <Link href="/" className="font-headline font-bold text-sm tracking-[0.3em] text-white uppercase">
          NOVAVOX
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#home", label: "HOME" },
            { href: "#services", label: "SERVICES" },
            { href: "#portfolio", label: "PORTFOLIO" },
            { href: "#about", label: "ABOUT" },
            { href: "#contact", label: "CONTACT" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.2em] uppercase text-[#919191] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        <MobileMenu />
      </nav>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════ */}
      <section id="home" className="relative h-screen overflow-hidden">
        <InteractiveHeroBackground>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-center px-4">
              <h1 className="font-headline text-[4rem] sm:text-[7rem] md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-none text-white">
                NOVA<br />VOX
              </h1>
              <p className="text-[11px] sm:text-sm tracking-[0.4em] text-[#919191] uppercase mt-6 sm:mt-8 max-w-lg mx-auto">
                WHERE IDEAS BECOME CINEMATIC REALITIES
              </p>
              <a
                href="#services"
                className="inline-block mt-12 sm:mt-16 text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#0a0a0a] transition-all pointer-events-auto"
              >
                EXPLORE OUR WORK
              </a>
            </div>
          </div>
        </InteractiveHeroBackground>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — SERVICES
          ═══════════════════════════════════════════════ */}
      <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">WHAT WE DO</p>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-16 sm:mb-24">
            OUR<br />SERVICES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {/* Advertising & Commercials */}
            <div className="bg-[#0a0a0a] p-8 sm:p-12 md:p-16 group hover:bg-[#111] transition-colors duration-500">
              <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-6">001</p>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                Advertising &<br />Commercials
              </h3>
              <p className="text-sm text-[#919191] leading-relaxed mb-4">
                Visually captivating ads with strong brand connection — crafted for digital, television, and corporate campaigns.
              </p>
              <p className="text-xs text-[#474747] leading-relaxed">
                From storyboards to final output.
              </p>
            </div>

            {/* Film & Video Production */}
            <div className="bg-[#0a0a0a] p-8 sm:p-12 md:p-16 group hover:bg-[#111] transition-colors duration-500">
              <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-6">002</p>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                Film & Video<br />Production
              </h3>
              <p className="text-sm text-[#919191] leading-relaxed mb-4">
                Cinematic storytelling from concept to completion — including scripting, direction, cinematography, editing, and DI.
              </p>
              <p className="text-xs text-[#474747] leading-relaxed">
                Feature films, short films, branded content, documentaries.
              </p>
            </div>

            {/* Post Production */}
            <div className="bg-[#0a0a0a] p-8 sm:p-12 md:p-16 group hover:bg-[#111] transition-colors duration-500">
              <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-6">003</p>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                Post<br />Production
              </h3>
              <p className="text-sm text-[#919191] leading-relaxed mb-4">
                Premium post workflows that elevate your visuals and sound.
              </p>
              <p className="text-xs text-[#474747] leading-relaxed">
                DI, re-recording mix, spatial audio, and audio restoration.
              </p>
            </div>

            {/* Music Videos & Audios */}
            <div className="bg-[#0a0a0a] p-8 sm:p-12 md:p-16 group hover:bg-[#111] transition-colors duration-500">
              <p className="text-[9px] tracking-[0.3em] text-[#474747] uppercase mb-6">004</p>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                Music Videos<br />& Audios
              </h3>
              <p className="text-sm text-[#919191] leading-relaxed mb-4">
                High-end production for artists who want their sound to look as good as it feels.
              </p>
              <p className="text-xs text-[#474747] leading-relaxed">
                Concept creation, shooting, editing, DI, and sound mastering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — PORTFOLIO
          ═══════════════════════════════════════════════ */}
      <section id="portfolio" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">OUR WORK</p>
              <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">
                PORTFOLIO
              </h2>
            </div>
            {/* Search Bar */}
            <div className="flex items-center border-b border-[#474747] w-full sm:w-72">
              <span className="material-symbols-outlined text-[18px] text-[#474747] mr-2">search</span>
              <input
                type="text"
                placeholder="Search works..."
                className="bg-transparent text-sm text-white placeholder-[#474747] flex-1 py-3 outline-none"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {["ALL", "MUSIC", "ADS", "FILMS"].map((tab, i) => (
              <button
                key={tab}
                className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2 border transition-all ${
                  i === 0
                    ? "border-white text-white"
                    : "border-white/10 text-[#919191] hover:border-white/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Brand Campaign — Spatial Audio", category: "ADS", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" },
              { title: "Short Film — Silent Architecture", category: "FILMS", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80" },
              { title: "Music Video — Concrete Resonance", category: "MUSIC", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80" },
              { title: "Corporate — Tech Summit 2024", category: "ADS", image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80" },
              { title: "Documentary — Sound of the City", category: "FILMS", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80" },
              { title: "Music Video — Orbital Silence", category: "MUSIC", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" },
            ].map((work) => (
              <div key={work.title} className="group relative aspect-[4/3] overflow-hidden bg-[#131313] cursor-pointer">
                <div
                  className="absolute inset-0 grayscale group-hover:grayscale-0 brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-700"
                  style={{
                    backgroundImage: `url('${work.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[8px] tracking-[0.3em] text-[#919191] uppercase mb-2">{work.category}</p>
                  <p className="text-sm font-medium text-white leading-tight">{work.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — ABOUT
          ═══════════════════════════════════════════════ */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">WHO WE ARE</p>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-12 sm:mb-16">
            ABOUT
          </h2>

          <div className="space-y-12">
            {/* Founder Statement */}
            <div className="max-w-3xl">
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8">
                We&apos;re not just a team — we&apos;re a collective built on trust, freedom, and creativity focused on Quality.
              </p>
              <p className="text-sm text-[#919191] leading-relaxed mb-6">
                <span className="text-white font-medium">&quot;Novavox&quot;</span> was founded by{" "}
                <span className="text-white font-medium">Kaushik Jayakumar</span>, an accomplished audio engineer and music producer
                who has worked on over <span className="text-white">100+ international and Indian projects</span> across{" "}
                <span className="text-white">15+ languages</span>. Our crew includes{" "}
                <span className="text-white">IMDB-rated Writers, Directors, Editors and DOPs</span>, with a shared vision of delivering{" "}
                <span className="text-white">cinematic excellence at standard prices</span>.
              </p>
            </div>

            {/* Team */}
            <div className="border-t border-white/5 pt-12">
              <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">OUR TEAM</p>
              <p className="text-sm text-[#919191] leading-relaxed max-w-3xl mb-8">
                <span className="text-white font-medium">IMDB-Rated, Award-Winning, and Passion-Driven</span> : Our team consists of{" "}
                <span className="text-white">Scriptwriters, Directors, DOP, Editors, & Sound engineers</span> who have worked on acclaimed{" "}
                <span className="text-white">feature films and international projects</span>. Each member brings unique experience from across the industry,
                combining creativity with precision. Together, we form Novavox — not a company, but a{" "}
                <span className="text-white font-medium">trust-built family of creators</span>.
              </p>
            </div>

            {/* Vision */}
            <div className="border-t border-white/5 pt-12">
              <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-6">OUR VISION</p>
              <blockquote className="text-lg sm:text-xl text-white/70 leading-relaxed italic max-w-3xl">
                &ldquo;To create a world where every creative mind — artist or technician — can work freely, fearlessly, and with full trust.
                Novavox stands for quality, creative freedom, and unity in craftsmanship.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — SUPPORTING EMERGING ARTISTS
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-white/5 bg-[#0E0E0E]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-4">ARTIST DEVELOPMENT</p>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-12 sm:mb-16">
            SUPPORTING<br />EMERGING ARTISTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6">
              <p className="text-sm text-[#919191] leading-relaxed">
                At Novavox, we actively support new talent by producing, developing, and releasing music — even without upfront investment from the artist.
              </p>
              <p className="text-sm text-[#919191] leading-relaxed">
                We focus on long-term growth, helping artists build their sound, identity, and revenue streams.
              </p>
              <p className="text-sm text-[#919191] leading-relaxed">
                Our model ensures that creativity is not limited by budget, but driven by vision.
              </p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#474747] uppercase mb-6">LATEST ARTISTS</p>
              <div className="flex flex-col gap-4">
                {["AURA VANCE", "KAEL DRIFT", "NOVA ECHO", "CIPHER WAVE", "ORBITAL SILENCE"].map((artist) => (
                  <div key={artist} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs tracking-[0.15em] text-white uppercase">{artist}</span>
                    <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — CONTACT / CTA
          ═══════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-16 lg:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            LET&apos;S CREATE SOMETHING<br />
            <em className="italic font-light">CINEMATIC</em> TOGETHER
          </h2>
          <p className="text-sm text-[#919191] mb-12 sm:mb-16">
            Start your project with us.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:kaushik2002.22@gmail.com?subject=Project%20Inquiry"
              className="w-full sm:w-auto text-[10px] tracking-[0.2em] uppercase bg-white text-[#0a0a0a] px-10 py-4 hover:bg-[#D4D4D4] transition-colors text-center"
            >
              START A PROJECT
            </a>
            <a
              href="https://wa.me/916282725324"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-[10px] tracking-[0.2em] uppercase border border-white/20 px-10 py-4 text-white hover:bg-white hover:text-[#0a0a0a] transition-all text-center"
            >
              WHATSAPP US
            </a>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href="tel:+916282725324"
              className="text-sm text-[#919191] hover:text-white transition-colors"
            >
              +91 62827 25324
            </a>
            <a
              href="mailto:kaushik2002.22@gmail.com"
              className="text-sm text-[#919191] hover:text-white transition-colors"
            >
              kaushik2002.22@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
            &copy; {new Date().getFullYear()} NOVAVOX. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[9px] tracking-[0.2em] text-[#474747] uppercase">
            WHERE IDEAS BECOME CINEMATIC REALITIES
          </span>
        </div>
      </footer>
    </div>
  );
}
