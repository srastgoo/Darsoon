import React from "react";
import { COLORS } from "../theme";
import { Person } from "./Person";

const PINS = [
  { x: 0.18, y: 0.12, age: "adult" as const, skinIndex: 0 },
  { x: 0.82, y: 0.08, age: "senior" as const, skinIndex: 2 },
  { x: 0.86, y: 0.62, age: "young" as const, skinIndex: 1 },
];

export const GlobalTeachersIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const globeScale = Math.max(0, Math.min(1, progress / 0.4));
  const rotate = frame * 0.5;

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 40,
          transform: `translateX(-50%) scale(${globeScale})`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #FFE3CC 0%, #FCE3D0 55%, #F3C79E 100%)",
          boxShadow: "0 24px 60px rgba(237,95,0,0.16)",
          overflow: "hidden",
        }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300" style={{ transform: `rotate(${rotate}deg)` }}>
          <circle cx="150" cy="150" r="125" fill="none" stroke={COLORS.orange} strokeOpacity={0.32} strokeWidth={4} />
          <line x1="25" y1="150" x2="275" y2="150" stroke={COLORS.orange} strokeOpacity={0.3} strokeWidth={4} />
          <path
            d="M150 25 a191.25 191.25 0 0 1 50 125 a191.25 191.25 0 0 1 -50 125 a191.25 191.25 0 0 1 -50 -125 a191.25 191.25 0 0 1 50 -125 z"
            fill="none"
            stroke={COLORS.orange}
            strokeOpacity={0.3}
            strokeWidth={4}
          />
        </svg>
      </div>
      {PINS.map((pin, i) => {
        const pinProgress = Math.max(0, Math.min(1, (progress - 0.3 - i * 0.12) / 0.35));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${pin.x * 100}%`,
              top: `${pin.y * 100}%`,
              transform: `scale(${pinProgress})`,
              transformOrigin: "center",
              borderRadius: "50%",
              background: "#FFFFFF",
              padding: 6,
              boxShadow: "0 10px 24px rgba(69,66,66,0.18)",
            }}
          >
            <Person age={pin.age} size={92} skinIndex={pin.skinIndex} />
          </div>
        );
      })}
    </div>
  );
};
