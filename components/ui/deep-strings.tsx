"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function DeepStringsBackground({ children, className = "" }: { children?: React.ReactNode, className?: string }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0a0a0a",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab", // Creates the feeling of deep strings pulling to the cursor
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 250,
            links: {
              opacity: 0.3,
            },
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 160,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: true,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 120, // Dense enough to look like strings
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className={`relative ${className}`}>
      {init && (
        <Particles
          id="tsparticles-deep-strings"
          options={options}
          className="absolute inset-0 z-0 h-full w-full pointer-events-auto"
        />
      )}
      <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>
    </div>
  );
}
