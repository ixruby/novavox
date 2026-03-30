import type { Line, MouseState, OrientationType } from "@/types"
import { easeOutQuad } from "@/lib/animation/easing"

interface PhysicsParams {
  repelDistance: number
  repelStrength: number
  springStrength: number
  damping: number
  lineThickness: number
  audioEnabled: boolean
  noteDecay: number
}

export function updateLinePhysics(
  line: Line,
  index: number,
  lines: Line[],
  mouse: MouseState,
  canvas: HTMLCanvasElement,
  orientation: OrientationType,
  params: PhysicsParams,
) {
  const currentTime = Date.now()

  if (mouse.isHovering) {
    let distance: number
    let direction: number
    let velocityMultiplier: number

    if (orientation === "grid") {
      if (line.type === "horizontal") {
        distance = Math.abs(mouse.y - line.currentPos)
        direction = line.currentPos < mouse.y ? -1 : 1
        velocityMultiplier = 1 + Math.abs(mouse.velocityY) * 0.02
      } else {
        distance = Math.abs(mouse.x - line.currentPos)
        direction = line.currentPos < mouse.x ? -1 : 1
        velocityMultiplier = 1 + Math.abs(mouse.velocityX) * 0.02
      }
    } else if (orientation === "diagonal-grid") {
      if (line.type === "horizontal") {
        const slope = 1
        const lineY = line.currentPos
        distance = Math.abs(mouse.y - lineY + (mouse.x - line.currentPos) * slope) / Math.sqrt(2)
        direction = mouse.y - lineY > (mouse.x - line.currentPos) * slope ? -1 : 1
        velocityMultiplier = 1 + (Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY)) * 0.01
      } else {
        const slope = -1
        const lineY = canvas.height - line.currentPos
        distance = Math.abs(mouse.y - lineY + (mouse.x - line.currentPos) * slope) / Math.sqrt(2)
        direction = mouse.y - lineY > (mouse.x - line.currentPos) * slope ? -1 : 1
        velocityMultiplier = 1 + (Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY)) * 0.01
      }
    } else if (orientation === "radial") {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const mouseAngle = Math.atan2(mouse.y - centerY, mouse.x - centerX)
      const lineAngle = line.angle || 0

      // Calculate angular distance between mouse and line
      let angleDiff = mouseAngle - lineAngle
      // Normalize to -PI to PI range
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2

      // Distance is based on how close the mouse angle is to the line angle
      const angularDistance = Math.abs(angleDiff)
      distance = angularDistance * 200 // Convert to pixel-like distance

      // Direction based on which side of the line the mouse is
      direction = angleDiff > 0 ? -1 : 1
      velocityMultiplier = 1 + (Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY)) * 0.01
    } else if (orientation === "parametric") {
      distance = Math.abs(mouse.y - line.currentPos)
      direction = line.currentPos < mouse.y ? -1 : 1
      velocityMultiplier = 1 + Math.abs(mouse.velocityY) * 0.02
    } else if (orientation === "horizontal") {
      distance = Math.abs(mouse.y - line.currentPos)
      direction = line.currentPos < mouse.y ? -1 : 1
      velocityMultiplier = 1 + Math.abs(mouse.velocityY) * 0.02
    } else if (orientation === "vertical") {
      distance = Math.abs(mouse.x - line.currentPos)
      direction = line.currentPos < mouse.x ? -1 : 1
      velocityMultiplier = 1 + Math.abs(mouse.velocityX) * 0.02
    } else {
      const slope = orientation === "diagonal-right" ? 1 : -1
      const lineY = orientation === "diagonal-right" ? line.currentPos : canvas.height - line.currentPos
      distance = Math.abs(mouse.y - lineY + (mouse.x - line.currentPos) * slope) / Math.sqrt(2)
      direction = mouse.y - lineY > (mouse.x - line.currentPos) * slope ? -1 : 1
      velocityMultiplier = 1 + (Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY)) * 0.01
    }

    if (distance < params.repelDistance) {
      const normalizedDistance = distance / params.repelDistance
      const easedForce = easeOutQuad(1 - normalizedDistance)

      const force = easedForce * params.repelStrength * direction * velocityMultiplier
      line.velocity += force

      const isMoving = currentTime - (mouse.lastMoveTime || 0) < 100
      const hasVelocity = Math.abs(mouse.velocityX) + Math.abs(mouse.velocityY) > 0.5

      if (
        params.audioEnabled &&
        !line.isPlaying &&
        currentTime - line.lastTriggerTime > 100 &&
        isMoving &&
        hasVelocity
      ) {
        if (line.synth && Math.abs(force) > 0.1) {
          line.synth.triggerAttackRelease(line.note, params.noteDecay)
          line.isPlaying = true
          line.lastTriggerTime = currentTime
          setTimeout(() => {
            line.isPlaying = false
          }, params.noteDecay * 1000)
        }
      }

      // Wave propagation to neighbors
      const neighbors = [lines[index - 1], lines[index + 1]]
      neighbors.forEach((neighbor) => {
        if (neighbor) {
          const neighborForce = force * 0.3
          neighbor.velocity += neighborForce
        }
      })

      line.glow = Math.min(1, line.glow + 0.15)
      line.thickness = params.lineThickness + easedForce * 1.5
    } else {
      line.glow = Math.max(0, line.glow - 0.05)
      line.thickness = Math.max(params.lineThickness, line.thickness - 0.1)
    }
  } else {
    line.glow = Math.max(0, line.glow - 0.1)
    line.thickness = Math.max(params.lineThickness, line.thickness - 0.15)
  }

  // Spring physics
  const displacement = line.basePos - line.currentPos
  line.velocity += displacement * params.springStrength
  line.velocity *= params.damping
  line.currentPos += line.velocity
}
