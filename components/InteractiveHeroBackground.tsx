"use client";

import { useState } from "react";
import * as Tone from "tone";
import type { ControlParameters } from "@/types";
import { InteractiveCanvas } from "@/components/interactive-canvas";
import { Volume2, VolumeX } from "lucide-react";

// Parametric mode creates flowing wave-like curves instead of rigid grid lines
const HERO_PARAMS: ControlParameters = {
  lineSpacing: 50,
  repelDistance: 200,
  repelStrength: 0.7,
  springStrength: 0.03,
  damping: 0.92,
  lineOpacity: 0.1,
  lineThickness: 0.5,
  orientation: "parametric",
  volume: 0.08,
  noteDecay: 2.2,
  scaleType: "pentatonic",
};

export function InteractiveHeroBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const toggleAudio = async () => {
    if (!audioInitialized) {
      await Tone.start();
      setAudioInitialized(true);
      setAudioEnabled(true);
    } else {
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <InteractiveCanvas params={HERO_PARAMS} audioEnabled={audioEnabled} />
      {children}
      <button
        onClick={toggleAudio}
        className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] tracking-[0.2em] uppercase text-[#919191] hover:text-white backdrop-blur-sm transition-all duration-300"
        title={audioEnabled ? "Mute spatial audio" : "Enable spatial audio"}
      >
        {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        {audioEnabled ? "SPATIAL AUDIO" : "ENABLE AUDIO"}
      </button>
    </div>
  );
}
