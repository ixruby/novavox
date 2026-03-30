export type OrientationType =
  | "horizontal"
  | "vertical"
  | "diagonal-right"
  | "diagonal-left"
  | "grid"
  | "diagonal-grid"
  | "radial"
  | "parametric"

export type ScaleType = "pentatonic" | "major" | "minor" | "chromatic"

export interface Line {
  basePos: number
  currentPos: number
  velocity: number
  glow: number
  thickness: number
  type?: "horizontal" | "vertical" | "radial" | "diagonal-right" | "diagonal-left"
  angle?: number
  note: string
  synth: any
  isPlaying: boolean
  lastTriggerTime: number
}

export interface MouseState {
  x: number
  y: number
  prevX: number
  prevY: number
  velocityX: number
  velocityY: number
  isHovering: boolean
  lastMoveTime: number
}

export interface ControlParameters {
  lineSpacing: number
  repelDistance: number
  repelStrength: number
  springStrength: number
  damping: number
  lineOpacity: number
  lineThickness: number
  orientation: OrientationType
  volume: number
  noteDecay: number
  scaleType: ScaleType
}
