import Image from "next/image";
import { InteractiveHeroBackground } from "@/components/InteractiveHeroBackground";
import { MobileMenu } from "@/components/MobileMenu";

export default function LandingPage() {
  return (
    <div className="selection:bg-white selection:text-black">
      {/* Noise overlay */}
      <div
        className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl border-b border-[#474747]/15">
        <div className="flex justify-between items-center w-full px-6 md:px-12 lg:px-24 py-4 md:py-6">
          <a href="#home" className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white font-headline">NOVAVOX</a>
          <div className="hidden md:flex gap-8 items-center font-headline uppercase tracking-[0.1em] text-sm">
            <a href="#home" className="nav-link text-[#919191] hover:text-white transition-colors">Home</a>
            <a href="#services" className="nav-link text-[#919191] hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="nav-link text-[#919191] hover:text-white transition-colors">Portfolio</a>
            <a href="#about" className="nav-link text-[#919191] hover:text-white transition-colors">About</a>
            <a href="#contact" className="nav-link text-[#919191] hover:text-white transition-colors">Contact</a>
          </div>
          <MobileMenu />
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
          HERO — NV Logo + Interactive Instrument
          ═══════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <InteractiveHeroBackground>
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-100"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "100px 100px",
              }}
            />

            <div className="relative text-center px-6 md:px-8 max-w-7xl pt-24">
              {/* NV Logo */}
              <div className="mb-6 md:mb-8">
                <Image
                  src="/novavox-logo-cropped.png"
                  alt="Novavox — Where Ideas Become Cinematic Realities"
                  width={628}
                  height={579}
                  className="mx-auto w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  priority
                />
              </div>

              <div className="mt-12 md:mt-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full justify-between max-w-4xl mx-auto">
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs gap-4">
                  <div className="w-12 h-[1px] bg-white hidden md:block" />
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed text-white/50">
                    Film &amp; video production, advertising, post production, and music — cinematic excellence at standard prices.
                  </p>
                </div>
                <a
                  href="#services"
                  className="group relative border border-white/20 px-10 md:px-16 py-4 md:py-6 overflow-hidden active:scale-95 transition-transform inline-block pointer-events-auto"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] group-hover:text-black transition-colors">
                    Explore Our Work
                  </span>
                </a>
              </div>
            </div>
          </div>
        </InteractiveHeroBackground>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES — Same layout as "Latest Coordinates"
          ═══════════════════════════════════════════════ */}
      <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6 md:gap-8">
            <div>
              <span className="font-mono uppercase tracking-[0.5em] text-[9px] md:text-[10px] text-white/30 mb-2 md:mb-4 block">What We Do</span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter">Our Services</h2>
            </div>
            <div className="h-[1px] flex-grow bg-white/5 hidden md:block mx-12 mb-4" />
          </div>

          {/* Service Cards — 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5">
            {[
              {
                num: "001",
                title: "Advertising & Commercials",
                desc: "Visually captivating ads with strong brand connection — crafted for digital, television, and corporate campaigns.",
                detail: "From storyboards to final output.",
                img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
              },
              {
                num: "002",
                title: "Film & Video Production",
                desc: "Cinematic storytelling from concept to completion — including scripting, direction, cinematography, editing, and DI.",
                detail: "Feature films, short films, branded content, documentaries.",
                img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
              },
              {
                num: "003",
                title: "Post Production",
                desc: "Premium post workflows that elevate your visuals and sound.",
                detail: "DI, re-recording mix, spatial audio, and audio restoration.",
                img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
              },
              {
                num: "004",
                title: "Music Videos & Audios",
                desc: "High-end production for artists who want their sound to look as good as it feels.",
                detail: "Concept creation, shooting, editing, DI, and sound mastering.",
                img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
              },
            ].map((svc) => (
              <div key={svc.num} className="bg-[#0e0e0e] relative group overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 grayscale brightness-[0.15] transition-all duration-700 bg-cover bg-center"
                  style={{ backgroundImage: `url('${svc.img}')` }}
                />
                <div className="relative z-10 p-8 md:p-12 min-h-[260px] md:min-h-[300px] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] md:text-[10px] opacity-20 block mb-4 md:mb-8">{svc.num}</span>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 md:mb-6 leading-none">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-body max-w-sm">{svc.desc}</p>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mt-6">{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PORTFOLIO — Same layout as Artist Roster
          ═══════════════════════════════════════════════ */}
      <section id="portfolio" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.8em] uppercase text-white/30 mb-4 md:mb-6 block">Our Work</span>
            <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-12">PORT<br />FOLIO</h2>

            {/* Search */}
            <div className="flex items-center border-b border-white/10 mb-8 group focus-within:border-white/30 transition-colors">
              <span className="material-symbols-outlined text-lg text-white/30 mr-3">search</span>
              <input
                type="text"
                placeholder="SEARCH WORKS..."
                className="w-full bg-transparent border-0 py-4 font-mono tracking-widest text-[10px] md:text-[11px] uppercase placeholder:text-white/20 focus:ring-0 text-white outline-none"
              />
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["ALL", "MUSIC", "ADS", "FILMS"].map((tab, i) => (
                <button
                  key={tab}
                  className={`font-mono text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${
                    i === 0
                      ? "border-white/30 text-white"
                      : "border-white/10 text-white/30 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Work list */}
            <div className="space-y-1">
              {[
                { title: "Brand Campaign — Spatial Audio", cat: "ADS" },
                { title: "Short Film — Silent Architecture", cat: "FILM" },
                { title: "Music Video — Concrete Resonance", cat: "MUSIC" },
                { title: "Corporate — Tech Summit 2024", cat: "ADS" },
                { title: "Documentary — Sound of the City", cat: "FILM" },
              ].map((work) => (
                <div key={work.title} className="group border-b border-white/10 py-4 md:py-6 flex justify-between items-center cursor-pointer hover:bg-white/5 px-4 transition-all">
                  <div>
                    <span className="font-headline text-lg md:text-xl uppercase tracking-wide block">{work.title}</span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-1 block">{work.cat}</span>
                  </div>
                  <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spotlight image */}
          <div className="lg:col-span-7 aspect-[4/5] bg-[#131313] relative overflow-hidden group">
            <img
              alt="Portfolio spotlight"
              className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-1000 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12">
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-white/40 mb-2 block">Featured Work</span>
              <h3 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter">CINEMATIC VISION</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT — Same layout as Releases section
          ═══════════════════════════════════════════════ */}
      <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-6">
            <div>
              <span className="font-mono uppercase tracking-[0.5em] text-[9px] md:text-[10px] text-white/30 mb-2 md:mb-4 block">Who We Are</span>
              <h2 className="font-headline text-4xl md:text-6xl font-extrabold uppercase tracking-tighter">About Novavox</h2>
            </div>
            <div className="h-[1px] flex-grow bg-white/5 hidden md:block mx-12 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:min-h-[500px]">
            {/* Main about text */}
            <div className="md:col-span-8 bg-[#131313] border border-white/5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-headline font-light">
                  We&apos;re not just a team — we&apos;re a collective built on trust, freedom, and creativity focused on Quality.
                </p>
                <p className="text-xs text-white/40 leading-relaxed font-body mb-6">
                  <span className="text-white/70 font-medium">&quot;Novavox&quot;</span> was founded by{" "}
                  <span className="text-white/70 font-medium">Kaushik Jayakumar</span>, an accomplished audio engineer and music producer
                  who has worked on over <span className="text-white/70">100+ international and Indian projects</span> across{" "}
                  <span className="text-white/70">15+ languages</span>. Our crew includes{" "}
                  <span className="text-white/70">IMDB-rated Writers, Directors, Editors and DOPs</span>, with a shared vision of delivering{" "}
                  <span className="text-white/70">cinematic excellence at standard prices</span>.
                </p>
              </div>
              <div className="border-t border-white/5 pt-6 mt-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 block mb-4">Our Team</span>
                <p className="text-xs text-white/40 leading-relaxed font-body">
                  <span className="text-white/70 font-medium">IMDB-Rated, Award-Winning, and Passion-Driven</span> : Our team consists of{" "}
                  <span className="text-white/70">Scriptwriters, Directors, DOP, Editors, & Sound engineers</span> who have worked on acclaimed{" "}
                  <span className="text-white/70">feature films and international projects</span>. Together, we form Novavox — not a company, but a{" "}
                  <span className="text-white/70 font-medium">trust-built family of creators</span>.
                </p>
              </div>
            </div>

            {/* Vision + Artists sidebar */}
            <div className="md:col-span-4 bg-[#131313] border border-white/5 p-8 md:p-12 flex flex-col justify-between gap-8">
              <div>
                <span className="font-mono text-[9px] md:text-[10px] opacity-20 block mb-4 md:mb-8">VISION</span>
                <p className="text-xs text-white/40 leading-relaxed font-body italic">
                  &ldquo;To create a world where every creative mind — artist or technician — can work freely, fearlessly, and with full trust.
                  Novavox stands for quality, creative freedom, and unity in craftsmanship.&rdquo;
                </p>
              </div>
              <div className="border-t border-white/5 pt-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/20 block mb-4">Emerging Artists</span>
                <p className="text-xs text-white/40 leading-relaxed font-body mb-4">
                  We actively support new talent — producing, developing, and releasing music even without upfront investment.
                </p>
                <div className="space-y-2">
                  {["AURA VANCE", "KAEL DRIFT", "NOVA ECHO", "CIPHER WAVE", "ORBITAL SILENCE"].map((a) => (
                    <div key={a} className="flex justify-between items-center py-1.5 border-b border-white/5">
                      <span className="font-mono text-[9px] tracking-widest text-white/50">{a}</span>
                      <span className="font-mono text-[7px] tracking-widest text-white/15">ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CONTACT CTA — Same layout as "Enter the Monolith"
          ═══════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white text-black">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4">
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] block text-black/40">Get In Touch</span>
                <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black">
                  LET&apos;S CREATE<br />SOMETHING<br />CINEMATIC.
                </h2>
              </div>
              <p className="font-body text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] leading-loose max-w-md text-black/70">
                Start your project with us. From concept to final cut — we bring your vision to life with cinematic precision.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:gap-12">
              {/* CTA Buttons */}
              <a
                href="mailto:kaushik2002.22@gmail.com?subject=Project%20Inquiry"
                className="group relative border-2 border-black/20 px-10 py-6 overflow-hidden text-center active:scale-95 transition-transform block"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.5em] group-hover:text-white transition-colors text-black">
                  Start a Project
                </span>
              </a>
              <a
                href="https://wa.me/916282725324"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border-2 border-black/20 px-10 py-6 overflow-hidden text-center active:scale-95 transition-transform block"
              >
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.5em] group-hover:text-white transition-colors text-black">
                  WhatsApp Us
                </span>
              </a>

              {/* Contact details */}
              <div className="space-y-3 pt-4">
                <a href="tel:+916282725324" className="font-mono text-[11px] tracking-widest text-black/40 hover:text-black transition-colors block">
                  +91 62827 25324
                </a>
                <a href="mailto:kaushik2002.22@gmail.com" className="font-mono text-[11px] tracking-widest text-black/40 hover:text-black transition-colors block">
                  kaushik2002.22@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER — Same as prototype ═══ */}
      <footer className="bg-[#0e0e0e] w-full pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <a href="#home" className="text-white font-headline font-bold text-2xl tracking-[0.25em] mb-8 block">NOVAVOX</a>
            <p className="text-[10px] tracking-widest uppercase text-neutral-500 leading-loose max-w-xs">
              Film &amp; video production, advertising, post production, and music.
              Cinematic excellence at standard prices.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-headline text-[10px] text-white tracking-[0.2em] uppercase mb-2">Navigate</p>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="#home">Home</a>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="#services">Services</a>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="#portfolio">Portfolio</a>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="#about">About</a>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-headline text-[10px] text-white tracking-[0.2em] uppercase mb-2">Connect</p>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="#contact">Contact</a>
              <a className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors" href="https://wa.me/916282725324" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="flex flex-col justify-end md:items-end text-left md:text-right">
            <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-600 leading-loose">
              &copy; {new Date().getFullYear()} NOVAVOX.<br />WHERE IDEAS BECOME<br />CINEMATIC REALITIES.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
