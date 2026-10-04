import React from "react";
import { COLORS } from "../../Promo/theme";
import { Person } from "../../Promo/characters/Person";

const DIALS = [
  { x: 92, level: 0.7 },
  { x: 184, level: 0.4 },
  { x: 276, level: 0.9 },
];

export const PersonalizedLearningIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const bob = Math.sin(frame / 15) * 6;
  const panelProgress = Math.max(0, Math.min(1, progress / 0.5));
  const dialsProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.45));

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 30,
          transform: `translateX(-50%) translateY(${bob * 0.4}px)`,
        }}
      >
        <Person age="young" size={260} skinIndex={1} clothIndex={2} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 30,
          transform: `translateX(-50%) scale(${panelProgress})`,
          transformOrigin: "bottom center",
          width: 360,
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "26px 30px",
          boxShadow: "0 24px 54px rgba(69,66,66,0.14)",
          opacity: panelProgress,
        }}
      >
        <svg width="300" height="90" viewBox="0 0 300 90">
          {DIALS.map((dial, i) => {
            const level = dial.level * Math.max(0, Math.min(1, (dialsProgress - i * 0.15) / 0.5));
            const knobY = 70 - level * 50;
            return (
              <g key={i}>
                <line x1={dial.x} y1={14} x2={dial.x} y2={76} stroke={COLORS.background} strokeWidth={10} strokeLinecap="round" />
                <line x1={dial.x} y1={76} x2={dial.x} y2={knobY} stroke={COLORS.orange} strokeWidth={10} strokeLinecap="round" />
                <circle cx={dial.x} cy={knobY} r={13} fill="#FFFFFF" stroke={COLORS.orange} strokeWidth={5} />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
