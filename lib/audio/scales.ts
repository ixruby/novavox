import type { ScaleType } from "@/types"

export const scales: Record<ScaleType, string[]> = {
  pentatonic: ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"],
  major: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  minor: ["C3", "D3", "Eb3", "F3", "G3", "Ab3", "Bb3", "C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"],
  chromatic: ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4"],
}

export function getNoteForLine(index: number, totalLines: number, scaleType: ScaleType): string {
  const scale = scales[scaleType]
  const scaleIndex = Math.floor((index / totalLines) * scale.length)
  return scale[Math.min(scaleIndex, scale.length - 1)]
}
