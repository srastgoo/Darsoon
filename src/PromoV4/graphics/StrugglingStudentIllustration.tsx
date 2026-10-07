import React from "react";
import { COLORS } from "../../Promo/theme";
import { Person } from "../../Promo/characters/Person";

const EquationSnippet: React.FC<{ text: string; rotate: number; strike?: boolean }> = ({
  text,
  rotate,
  strike,
}) => (
  <div
    style={{
      position: "relative",
      background: "#FFFFFF",
      borderRadius: 12,
      padding: "8px 14px",
      boxShadow: "0 10px 22px rgba(69,66,66,0.12)",
      transform: `rotate(${rotate}deg)`,
      fontFamily: "Georgia, serif",
      fontWeight: 700,
      fontSize: 24,
      color: COLORS.textMain,
    }}
  >
    {text}
    {strike ? (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <line x1="4" y1="34" x2="96" y2="6" stroke="#D9453A" strokeWidth={3} strokeLinecap="round" />
      </svg>
    ) : null}
  </div>
);

export const StrugglingStudentIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const shake = Math.sin(frame / 9) * 1.4;
  const studentProgress = Math.max(0, Math.min(1, progress / 0.4));
  const bubbleProgress = Math.max(0, Math.min(1, (progress - 0.35) / 0.3));
  const bubblePulse = 1 + Math.sin(Math.max(0, frame - 20) / 8) * 0.06;
  const eq1 = Math.max(0, Math.min(1, (progress - 0.5) / 0.3));
  const eq2 = Math.max(0, Math.min(1, (progress - 0.62) / 0.3));
  const bookProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.35));

  return (
    <div style={{ position: "relative", width: 480, height: 460 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 20,
          transform: `translateX(-50%) rotate(${4 + shake}deg) scale(${studentProgress})`,
          transformOrigin: "bottom center",
          opacity: studentProgress,
        }}
      >
        <Person age="young" size={230} skinIndex={1} clothIndex={1} mood="worried" />
      </div>

      <div
        style={{
          position: "absolute",
          left: "48%",
          bottom: 0,
          transform: `translateX(-50%) scale(${bookProgress})`,
          transformOrigin: "bottom center",
        }}
      >
        <div
          style={{
            width: 170,
            height: 26,
            borderRadius: 6,
            background: COLORS.orange,
            boxShadow: "0 8px 18px rgba(69,66,66,0.18)",
          }}
        />
        <div
          style={{
            width: 150,
            height: 24,
            marginTop: -8,
            marginRight: 14,
            borderRadius: 6,
            background: "#FFFFFF",
            border: `2px solid ${COLORS.orange}`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: "18%",
          top: 10,
          transform: `scale(${bubbleProgress * bubblePulse})`,
          transformOrigin: "bottom right",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: `3px solid ${COLORS.textSecondary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Georgia, serif",
            fontWeight: 800,
            fontSize: 34,
            color: COLORS.textSecondary,
            boxShadow: "0 14px 28px rgba(69,66,66,0.14)",
          }}
        >
          ؟
        </div>
      </div>

      <div style={{ position: "absolute", left: 4, top: 60, opacity: eq1, transform: `scale(${0.7 + eq1 * 0.3})` }}>
        <EquationSnippet text="x² + y =" rotate={-9} strike />
      </div>

      <div style={{ position: "absolute", right: 0, top: 150, opacity: eq2, transform: `scale(${0.7 + eq2 * 0.3})` }}>
        <EquationSnippet text="H₂O + CO₂" rotate={7} />
      </div>
    </div>
  );
};
