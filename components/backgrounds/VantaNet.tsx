"use client";

import { useEffect, useRef } from "react";

export function VantaNet() {
  const ref = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || vantaRef.current) return;

    let cancelled = false;

    (async () => {
      const THREE = await import("three");
      // @ts-expect-error - vanta has no types
      const NET = (await import("vanta/dist/vanta.net.min")).default;

      if (cancelled || !ref.current) return;

      vantaRef.current = NET({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        color: 0x3a3a5c,
        backgroundColor: 0x0a0a0a,
        points: 10,
        maxDistance: 22,
        spacing: 18,
        showDots: true,
      });
    })();

    return () => {
      cancelled = true;
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
