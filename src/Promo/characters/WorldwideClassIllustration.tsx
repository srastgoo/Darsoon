import React from "react";
import { COLORS } from "../theme";
import { Person } from "./Person";

const PINS = [
  { x: 0.2, y: 0.18 },
  { x: 0.78, y: 0.14 },
  { x: 0.82, y: 0.7 },
  { x: 0.16, y: 0.68 },
];

export const WorldwideClassIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const laptopScale = Math.max(0, Math.min(1, progress / 0.35));

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      {PINS.map((pin, i) => {
        const pulse = Math.max(0, Math.min(1, (progress - 0.25 - i * 0.1) / 0.3));
        const wave = (Math.sin(frame / 16 + i) + 1) / 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${pin.x * 100}%`,
              top: `${pin.y * 100}%`,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: COLORS.star,
              opacity: pulse * (0.6 + wave * 0.4),
              transform: `scale(${pulse * (0.9 + wave * 0.3)})`,
              boxShadow: `0 0 ${16 + wave * 10}px rgba(247,104,8,0.5)`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) scale(${laptopScale})`,
        }}
      >
        <Person age="young" size={220} skinIndex={0} clothIndex={1} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 70,
          transform: `translateX(-50%) scale(${laptopScale})`,
        }}
      >
        <svg width="220" height="140" viewBox="0 0 220 140">
          <rect x="20" y="10" width="180" height="110" rx="12" fill="#FFFFFF" stroke={COLORS.textSecondary} strokeWidth={3} />
          <rect x="34" y="24" width="152" height="82" rx="6" fill={COLORS.background} />
          <circle cx="110" cy="65" r="26" fill="none" stroke={COLORS.orange} strokeWidth={4} />
          <path d="M84 65 h52 M110 39 v52" stroke={COLORS.orange} strokeWidth={3} opacity={0.5} />
        </svg>
      </div>
    </div>
  );
};
