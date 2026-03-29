import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" className="w-full bg-[#0E0E0E] border-t border-white/5 px-12 py-16">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left - Brand */}
        <div>
          <h2 className="font-headline text-lg tracking-[0.3em] font-bold text-white mb-4">
            NOVAVOX
          </h2>
          <p className="text-[10px] text-[#919191] tracking-[0.15em] uppercase">
            Architectural Rigor. Built in Berlin.
          </p>
        </div>

        {/* Right - Link Columns */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <Link
              href="/privacy"
              className="text-[10px] text-[#919191] hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] text-[#919191] hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/press"
              className="text-[10px] text-[#919191] hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Press
            </Link>
            <Link
              href="/contact"
              className="text-[10px] text-[#919191] hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Contact
            </Link>
            <a
              href="https://instagram.com/novavox"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="NOVAVOX on Instagram"
              className="text-[10px] text-[#919191] hover:text-white tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/5 mt-12 pt-8">
        <p className="text-[9px] text-[#474747] tracking-[0.2em]">
          &copy; 2024 NOVAVOX. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
