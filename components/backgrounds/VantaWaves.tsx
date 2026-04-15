"use client";

import { useEffect, useRef } from "react";

export function VantaWaves() {
  const ref = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || vantaRef.current) return;

    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      // @ts-expect-error - vanta has no types
      const WAVES = (await import("vanta/dist/vanta.waves.min")).default;

      if (cancelled || !ref.current) return;

      vantaRef.current = WAVES({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        color: 0x1a1a2e,
        shininess: 35,
        waveHeight: 20,
        waveSpeed: 0.8,
        zoom: 0.65,
      });
    })();

    return () => {
      cancelled = true;
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
