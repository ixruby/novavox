"use client";

export default function MusicPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 hidden md:block bg-[#353535]/60 backdrop-blur-[40px] border-t border-white/5">
      <div className="h-20 px-8 flex items-center justify-between">
        {/* Track Info */}
        <div className="w-64">
          <p className="text-sm font-headline text-[#E2E2E2] truncate">
            Foundation Layer
          </p>
          <p className="text-[10px] text-[#919191] tracking-[0.15em] uppercase">
            Aura Vance
          </p>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-6">
            <button aria-label="Shuffle" className="text-[#919191] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">shuffle</span>
            </button>
            <button aria-label="Previous track" className="text-[#919191] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">skip_previous</span>
            </button>
            <button aria-label="Play" className="text-white hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-2xl">play_arrow</span>
            </button>
            <button aria-label="Next track" className="text-[#919191] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">skip_next</span>
            </button>
            <button aria-label="Repeat" className="text-[#919191] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">repeat</span>
            </button>
          </div>
          <div className="h-[2px] bg-white/10 w-full max-w-md mt-2">
            <div className="w-1/3 bg-white h-full" />
          </div>
        </div>

        {/* Volume & Time */}
        <div className="w-48 flex items-center justify-end gap-3">
          <button aria-label="Volume" className="text-[#919191] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">volume_up</span>
          </button>
          <div className="h-[2px] w-24 bg-white/10">
            <div className="w-2/3 bg-white h-full" />
          </div>
          <span className="text-[10px] text-[#919191] whitespace-nowrap">
            3:42 / 8:15
          </span>
        </div>
      </div>
    </div>
  );
}
