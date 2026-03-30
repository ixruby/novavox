import * as Tone from "tone"
import type { Line, OrientationType } from "@/types"
import { getNoteForLine } from "@/lib/audio/scales"

export function createLines(
  canvas: HTMLCanvasElement,
  lineSpacing: number,
  lineThickness: number,
  orientation: OrientationType,
  noteDecay: number,
  scaleType: any,
): Line[] {
  const lines: Line[] = []

  if (orientation === "grid") {
    // Create horizontal lines
    const horizontalCount = Math.floor(canvas.height / lineSpacing)
    for (let i = 0; i < horizontalCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "horizontal",
        note: getNoteForLine(i, horizontalCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
    // Create vertical lines
    const verticalCount = Math.floor(canvas.width / lineSpacing)
    for (let i = 0; i < verticalCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "vertical",
        note: getNoteForLine(i, verticalCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else if (orientation === "diagonal-grid") {
    const lineCount = Math.floor((Math.max(canvas.width, canvas.height) * 1.4) / lineSpacing)
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "horizontal",
        note: getNoteForLine(i, lineCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "vertical",
        note: getNoteForLine(i + lineCount, lineCount * 2, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else if (orientation === "radial") {
    const radialCount = 24
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY)

    for (let i = 0; i < radialCount; i++) {
      const angle = (i / radialCount) * Math.PI * 2
      lines.push({
        basePos: maxRadius,
        currentPos: maxRadius,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        angle: angle,
        type: "radial",
        note: getNoteForLine(i, radialCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else if (orientation === "parametric") {
    const waveCount = Math.floor(canvas.height / (lineSpacing / 2))
    for (let i = 0; i < waveCount; i++) {
      lines.push({
        basePos: i * (lineSpacing / 2),
        currentPos: i * (lineSpacing / 2),
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        note: getNoteForLine(i, waveCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else if (orientation === "horizontal") {
    const lineCount = Math.floor(canvas.height / lineSpacing)
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "horizontal",
        note: getNoteForLine(i, lineCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else if (orientation === "vertical") {
    const lineCount = Math.floor(canvas.width / lineSpacing)
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: "vertical",
        note: getNoteForLine(i, lineCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  } else {
    // diagonal-right or diagonal-left
    const lineCount = Math.floor((Math.max(canvas.width, canvas.height) * 1.4) / lineSpacing)
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        basePos: i * lineSpacing + lineSpacing / 2,
        currentPos: i * lineSpacing + lineSpacing / 2,
        velocity: 0,
        glow: 0,
        thickness: lineThickness,
        type: orientation,
        note: getNoteForLine(i, lineCount, scaleType),
        synth: new Tone.Synth({
          oscillator: { type: "sine" },
          envelope: { attack: 0.005, decay: noteDecay, sustain: 0.1, release: 0.1 },
        }).toDestination(),
        isPlaying: false,
        lastTriggerTime: 0,
      })
    }
  }

  return lines
}
