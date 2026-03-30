"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";

interface Section {
  id: string;
  label: string;
  children: ReactNode;
}

export function SpatialNavigator({ sections }: { sections: Section[] }) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isTransitioning = useRef(false);

  const cols = 2;
  const rows = Math.ceil(sections.length / cols);

  const getPos = (idx: number) => ({
    col: idx % cols,
    row: Math.floor(idx / cols),
  });

  const navigate = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      setTimeout(() => (isTransitioning.current = false), 800);

      const { col, row } = getPos(current);
      let newCol = col;
      let newRow = row;

      if (dir === "left" && col > 0) newCol--;
      if (dir === "right" && col < cols - 1) newCol++;
      if (dir === "up" && row > 0) newRow--;
      if (dir === "down" && row < rows - 1) newRow++;

      const newIdx = newRow * cols + newCol;
      if (newIdx >= 0 && newIdx < sections.length && newIdx !== current) {
        setCurrent(newIdx);
      }
    },
    [current, sections.length, rows]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate("left");
      if (e.key === "ArrowRight") navigate("right");
      if (e.key === "ArrowUp") { e.preventDefault(); navigate("up"); }
      if (e.key === "ArrowDown") { e.preventDefault(); navigate("down"); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // Mouse wheel navigation
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          navigate(e.deltaX > 0 ? "right" : "left");
        } else {
          navigate(e.deltaY > 0 ? "down" : "up");
        }
      }, 50);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  // Touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      const threshold = 50;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        navigate(dx > 0 ? "left" : "right");
      } else if (Math.abs(dy) > threshold) {
        navigate(dy > 0 ? "up" : "down");
      }
      touchStart.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);

  const { col, row } = getPos(current);
  const translateX = -(col * 100);
  const translateY = -(row * 100);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Spatial canvas */}
      <div
        className="absolute"
        style={{
          width: `${cols * 100}vw`,
          height: `${rows * 100}vh`,
          transform: `translate(${translateX}vw, ${translateY}vh)`,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {sections.map((section, i) => {
          const pos = getPos(i);
          return (
            <div
              key={section.id}
              id={section.id}
              className="absolute overflow-hidden"
              style={{
                width: "100vw",
                height: "100vh",
                left: `${pos.col * 100}vw`,
                top: `${pos.row * 100}vh`,
              }}
            >
              {section.children}
            </div>
          );
        })}
      </div>

      {/* Radar / minimap */}
      <div className="fixed bottom-6 left-6 z-50 w-[70px] h-[70px] md:w-[90px] md:h-[90px] border border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="relative w-full h-full">
          {/* Grid lines */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/10" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
          {/* Active indicator */}
          <div
            className="absolute bg-white/80 transition-all duration-500"
            style={{
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
            }}
          />
          {/* Clickable quadrants */}
          {sections.map((_, i) => {
            const p = getPos(i);
            return (
              <button
                key={i}
                className="absolute hover:bg-white/10 transition-colors"
                style={{
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  left: `${(p.col / cols) * 100}%`,
                  top: `${(p.row / rows) * 100}%`,
                }}
                onClick={() => {
                  if (!isTransitioning.current) {
                    isTransitioning.current = true;
                    setTimeout(() => (isTransitioning.current = false), 800);
                    setCurrent(i);
                  }
                }}
                aria-label={`Navigate to ${sections[i].label}`}
              />
            );
          })}
        </div>
      </div>

      {/* Section label */}
      <div className="fixed bottom-6 right-6 z-50 text-right">
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20 mb-1">
          SECTOR: {sections[current]?.label}
        </p>
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/15">
          {String(col).padStart(2, "0")}.{String(row).padStart(2, "0")}
        </p>
      </div>

      {/* Nav hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/15 animate-pulse">
          SWIPE OR SCROLL TO NAVIGATE
        </p>
      </div>
    </div>
  );
}
