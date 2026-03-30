"use client";

import { useEffect, useRef } from "react";

export function VantaHalo() {
  const ref = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || vantaRef.current) return;

    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      // @ts-expect-error - vanta has no types
      const HALO = (await import("vanta/dist/vanta.halo.min")).default;

      if (cancelled || !ref.current) return;

      vantaRef.current = HALO({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        baseColor: 0x1a1a2e,
        backgroundColor: 0x080808,
        amplitudeFactor: 1.5,
        size: 1.8,
      });
    })();

    return () => {
      cancelled = true;
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
