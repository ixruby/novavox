"use client"

import { useEffect, useRef } from "react"
import type { Line, MouseState, ControlParameters } from "@/types"
import { createLines } from "@/lib/lines/line-factory"
import { renderLine } from "@/lib/lines/line-renderer"
import { updateLinePhysics } from "@/lib/physics/line-physics"
import * as Tone from "tone"

interface InteractiveCanvasProps {
  params: ControlParameters
  audioEnabled: boolean
}

export function InteractiveCanvas({ params, audioEnabled }: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<MouseState>({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    velocityX: 0,
    velocityY: 0,
    isHovering: false,
    lastMoveTime: 0,
  })
  const linesRef = useRef<Line[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const initLines = () => {
      linesRef.current.forEach((line) => {
        if (line.synth) {
          line.synth.dispose()
        }
      })

      linesRef.current = createLines(
        canvas,
        params.lineSpacing,
        params.lineThickness,
        params.orientation,
        params.noteDecay,
        params.scaleType,
      )

      linesRef.current.forEach((line) => {
        if (line.synth) {
          line.synth.volume.value = Tone.gainToDb(params.volume)
        }
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initLines()
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x
      const prevY = mouseRef.current.y
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX: prevX,
        prevY: prevY,
        velocityX: e.clientX - prevX,
        velocityY: e.clientY - prevY,
        isHovering: true,
        lastMoveTime: Date.now(),
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false
      mouseRef.current.velocityX = 0
      mouseRef.current.velocityY = 0
    }
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      linesRef.current.forEach((line, index) => {
        updateLinePhysics(line, index, linesRef.current, mouseRef.current, canvas, params.orientation, {
          repelDistance: params.repelDistance,
          repelStrength: params.repelStrength,
          springStrength: params.springStrength,
          damping: params.damping,
          lineThickness: params.lineThickness,
          audioEnabled,
          noteDecay: params.noteDecay,
        })

        renderLine(ctx, line, canvas, params.orientation, params.lineOpacity)
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      linesRef.current.forEach((line) => {
        if (line.synth) {
          line.synth.dispose()
        }
      })
    }
  }, [
    params.lineSpacing,
    params.repelDistance,
    params.repelStrength,
    params.springStrength,
    params.damping,
    params.lineOpacity,
    params.lineThickness,
    params.orientation,
    audioEnabled,
    params.volume,
    params.noteDecay,
    params.scaleType,
  ])

  useEffect(() => {
    linesRef.current.forEach((line) => {
      if (line.synth) {
        line.synth.volume.value = Tone.gainToDb(params.volume)
      }
    })
  }, [params.volume])

  useEffect(() => {
    linesRef.current.forEach((line) => {
      if (line.synth) {
        line.synth.envelope.decay = params.noteDecay
      }
    })
  }, [params.noteDecay])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
