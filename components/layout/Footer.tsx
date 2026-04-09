import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" className="w-full bg-[#080808] border-t border-white/5 px-6 md:px-12 lg:px-20 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section — 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-headline text-sm font-bold tracking-[0.3em] text-white block mb-4">NOVAVOX</span>
            <p className="text-[10px] text-white/20 leading-relaxed max-w-[200px]">
              Where ideas become cinematic realities. Film, music, and sound — crafted with precision.
            </p>
          </div>

          {/* Explore */}
          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Explore</span>
            <div className="space-y-2.5">
              {[
                { label: "Artists", href: "/artists" },
                { label: "Releases", href: "/releases" },
                { label: "Shop", href: "/shop" },
                { label: "Tours", href: "/tours" },
                { label: "Journal", href: "/journal" },
              ].map(link => (
                <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Studio */}
          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Studio</span>
            <div className="space-y-2.5">
              {[
                { label: "Gallery", href: "/gallery" },
                { label: "Distribution", href: "/distribution" },
                { label: "Player", href: "/player" },
                { label: "Catalog", href: "/catalog" },
              ].map(link => (
                <Link key={link.label} href={link.href} className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase block mb-4">Contact</span>
            <div className="space-y-2.5">
              <a href="mailto:kaushik2002.22@gmail.com" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Email</a>
              <a href="https://wa.me/916282725324" target="_blank" rel="noopener noreferrer" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">WhatsApp</a>
              <a href="tel:+916282725324" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Phone</a>
              <a href="https://instagram.com/novavox" target="_blank" rel="noopener noreferrer" className="block font-mono text-[10px] text-white/20 hover:text-white transition-colors tracking-widest uppercase">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[8px] text-white/15 tracking-widest">&copy; {new Date().getFullYear()} NOVAVOX. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[8px] text-white/15 tracking-widest">DESIGNED BY <a href="https://9ruby.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">9RUBY</a></span>
            <Link href="/admin/login" className="font-mono text-[8px] text-white/[0.06] hover:text-white/20 transition-colors tracking-widest">ADMIN</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
