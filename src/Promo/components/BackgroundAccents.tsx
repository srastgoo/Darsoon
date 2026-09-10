import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

type Dot = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  driftX: number;
  driftY: number;
  speed: number;
};

const DOTS: Dot[] = [
  { x: 0.12, y: 0.1, size: 120, color: COLORS.orange, opacity: 0.07, driftX: 14, driftY: 10, speed: 0.9 },
  { x: 0.88, y: 0.16, size: 70, color: COLORS.star, opacity: 0.1, driftX: -10, driftY: 12, speed: 1.3 },
  { x: 0.85, y: 0.82, size: 160, color: COLORS.orange, opacity: 0.08, driftX: -16, driftY: -10, speed: 0.7 },
  { x: 0.1, y: 0.86, size: 90, color: COLORS.buttonText, opacity: 0.09, driftX: 12, driftY: -8, speed: 1.1 },
  { x: 0.5, y: 0.06, size: 50, color: COLORS.orange, opacity: 0.12, driftX: 8, driftY: 8, speed: 1.6 },
];

export const BackgroundAccents: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      {DOTS.map((dot, i) => {
        const t = frame * 0.02 * dot.speed;
        const x = dot.x * 1080 + Math.sin(t + i) * dot.driftX;
        const y = dot.y * 1920 + Math.cos(t + i) * dot.driftY;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - dot.size / 2,
              top: y - dot.size / 2,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: dot.color,
              opacity: dot.opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
