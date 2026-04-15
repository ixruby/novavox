import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0E0E0E] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative z-10 text-center px-8">
        <p className="text-[10px] tracking-[0.5em] text-[#474747] uppercase mb-8">
          ERROR / 404
        </p>
        <h1 className="font-headline text-[8rem] md:text-[12rem] font-bold tracking-tighter leading-none text-white/10">
          404
        </h1>
        <h2 className="font-headline text-3xl md:text-4xl font-light tracking-tight text-white mt-4">
          Signal Lost
        </h2>
        <p className="text-sm text-[#919191] mt-4 max-w-md mx-auto leading-relaxed">
          The frequency you&apos;re searching for doesn&apos;t exist in our archive.
          The spatial coordinates may have shifted.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/"
            className="text-[10px] tracking-[0.2em] uppercase bg-white text-[#1A1C1C] px-8 py-3 hover:bg-[#D4D4D4] transition-colors"
          >
            RETURN TO BASE
          </Link>
          <Link
            href="/artists"
            className="text-[10px] tracking-[0.2em] uppercase border border-white/20 px-8 py-3 text-white hover:bg-white hover:text-[#1A1C1C] transition-all"
          >
            BROWSE ARCHIVE
          </Link>
        </div>
        <div className="mt-16 flex flex-col gap-1">
          <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">
            NODE_STATUS: DISCONNECTED
          </span>
          <span className="text-[8px] tracking-[0.15em] text-[#474747] uppercase">
            RECOVERY_PROTOCOL: ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
