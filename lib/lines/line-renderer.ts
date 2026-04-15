import type { Line, OrientationType } from "@/types"

export function renderLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  canvas: HTMLCanvasElement,
  orientation: OrientationType,
  lineOpacity: number,
) {
  if (line.glow > 0.1) {
    ctx.shadowBlur = line.glow * 20
    ctx.shadowColor = `rgba(255, 255, 255, ${line.glow * 0.8})`
  } else {
    ctx.shadowBlur = 0
  }

  ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`
  ctx.lineWidth = line.thickness
  ctx.beginPath()

  if (orientation === "grid") {
    if (line.type === "horizontal") {
      ctx.moveTo(0, line.currentPos)
      ctx.lineTo(canvas.width, line.currentPos)
    } else {
      ctx.moveTo(line.currentPos, 0)
      ctx.lineTo(line.currentPos, canvas.height)
    }
  } else if (orientation === "diagonal-grid") {
    if (line.type === "horizontal") {
      const offset = line.currentPos
      if (offset < canvas.height) {
        ctx.moveTo(0, offset)
        ctx.lineTo(Math.min(canvas.width, offset + canvas.height), Math.min(canvas.height, offset + canvas.height))
      } else {
        ctx.moveTo(offset - canvas.height, 0)
        ctx.lineTo(offset, canvas.height)
      }
    } else {
      const offset = line.currentPos
      if (offset < canvas.height) {
        ctx.moveTo(0, canvas.height - offset)
        ctx.lineTo(Math.min(canvas.width, offset), Math.max(0, canvas.height - offset - canvas.width))
      } else {
        ctx.moveTo(offset - canvas.height, canvas.height)
        ctx.lineTo(offset, 0)
      }
    }
  } else if (orientation === "radial") {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const angle = line.angle!
    const x = centerX + Math.cos(angle) * line.currentPos
    const y = centerY + Math.sin(angle) * line.currentPos
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
  } else if (orientation === "parametric") {
    ctx.moveTo(0, line.currentPos)
    const segments = 50
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * canvas.width
      const waveOffset = Math.sin((i / segments) * Math.PI * 4 + line.basePos * 0.05) * 20
      ctx.lineTo(x, line.currentPos + waveOffset)
    }
  } else if (orientation === "horizontal") {
    ctx.moveTo(0, line.currentPos)
    ctx.lineTo(canvas.width, line.currentPos)
  } else if (orientation === "vertical") {
    ctx.moveTo(line.currentPos, 0)
    ctx.lineTo(line.currentPos, canvas.height)
  } else if (orientation === "diagonal-right") {
    const offset = line.currentPos
    if (offset < canvas.height) {
      ctx.moveTo(0, offset)
      ctx.lineTo(Math.min(canvas.width, offset + canvas.height), Math.min(canvas.height, offset + canvas.height))
    } else {
      ctx.moveTo(offset - canvas.height, 0)
      ctx.lineTo(offset, canvas.height)
    }
  } else {
    const offset = line.currentPos
    if (offset < canvas.height) {
      ctx.moveTo(0, canvas.height - offset)
      ctx.lineTo(Math.min(canvas.width, offset), Math.max(0, canvas.height - offset - canvas.width))
    } else {
      ctx.moveTo(offset - canvas.height, canvas.height)
      ctx.lineTo(offset, 0)
    }
  }

  ctx.stroke()
}
