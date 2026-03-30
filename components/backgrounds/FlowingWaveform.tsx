"use client";

import { useEffect, useRef } from "react";

export function FlowingWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: 0.5, y: 0.5 };
    let t = 0;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / canvas.width;
      mouse.y = (e.clientY - r.top) / canvas.height;
    });

    const animate = () => {
      t += 0.006;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numWaves = 14;
      for (let w = 0; w < numWaves; w++) {
        ctx.beginPath();
        const baseY = canvas.height * (0.15 + (w / numWaves) * 0.7);
        const amp = 25 + mouse.y * 45 + w * 2.5;
        const freq = 0.004 + mouse.x * 0.007;
        const phase = t + w * 0.35;
        const opacity = 0.03 + (w / numWaves) * 0.05;

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            baseY +
            Math.sin(x * freq + phase) * amp +
            Math.sin(x * freq * 2.1 + phase * 1.4) * amp * 0.25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
