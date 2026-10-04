import React from "react";
import { COLORS } from "../../Promo/theme";
import { Person } from "../../Promo/characters/Person";

const DIALS = [
  { x: 54, level: 0.7 },
  { x: 118, level: 0.45 },
  { x: 182, level: 0.9 },
];

const CheckRow: React.FC<{ reveal: number; width: number }> = ({ reveal, width }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 6,
        background: reveal > 0.5 ? COLORS.orange : COLORS.background,
        border: `2px solid ${COLORS.orange}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {reveal > 0.5 ? (
        <svg width="12" height="12" viewBox="0 0 24 24">
          <path d="M5 13l4 4 10-10" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </div>
    <div
      style={{
        height: 10,
        borderRadius: 5,
        background: COLORS.background,
        width: width * Math.max(0, Math.min(1, reveal)),
      }}
    />
  </div>
);

export const PersonalizedProgressIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const bob = Math.sin(frame / 15) * 5;
  const panelProgress = Math.max(0, Math.min(1, progress / 0.45));
  const dialsProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.4));
  const checkProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.5));
  const teacherProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.4));

  return (
    <div style={{ position: "relative", width: 460, height: 440 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 10,
          transform: `translateX(-50%) translateY(${bob * 0.4}px)`,
        }}
      >
        <Person age="young" size={220} skinIndex={1} clothIndex={2} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 10,
          transform: `translateX(-50%) scale(${panelProgress})`,
          transformOrigin: "bottom center",
          width: 290,
          background: "#FFFFFF",
          borderRadius: 22,
          padding: "20px 24px",
          boxShadow: "0 24px 54px rgba(69,66,66,0.14)",
          opacity: panelProgress,
        }}
      >
        <svg width="236" height="76" viewBox="0 0 236 76">
          {DIALS.map((dial, i) => {
            const level = dial.level * Math.max(0, Math.min(1, (dialsProgress - i * 0.15) / 0.5));
            const knobY = 60 - level * 42;
            return (
              <g key={i}>
                <line x1={dial.x} y1={12} x2={dial.x} y2={64} stroke={COLORS.background} strokeWidth={9} strokeLinecap="round" />
                <line x1={dial.x} y1={64} x2={dial.x} y2={knobY} stroke={COLORS.orange} strokeWidth={9} strokeLinecap="round" />
                <circle cx={dial.x} cy={knobY} r={11} fill="#FFFFFF" stroke={COLORS.orange} strokeWidth={4.5} />
              </g>
            );
          })}
        </svg>
        <CheckRow reveal={(checkProgress - 0) * 3} width={70} />
        <CheckRow reveal={(checkProgress - 0.2) * 3} width={100} />
        <CheckRow reveal={(checkProgress - 0.4) * 3} width={55} />
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 40,
          transform: `scale(${teacherProgress})`,
          transformOrigin: "bottom right",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#FFFFFF",
          borderRadius: 18,
          padding: "10px 14px",
          boxShadow: "0 14px 30px rgba(69,66,66,0.14)",
        }}
      >
        <div style={{ borderRadius: "50%", overflow: "hidden" }}>
          <Person age="adult" size={46} skinIndex={0} clothIndex={0} />
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M9 11l2 2 4-4M4 6h16v14H4z"
            stroke={COLORS.orange}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
