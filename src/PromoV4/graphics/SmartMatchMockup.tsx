import React from "react";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

const SearchIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" fill="none" stroke={COLORS.textSecondary} strokeWidth={2.2} />
    <line x1="16.2" y1="16.2" x2="21" y2="21" stroke={COLORS.textSecondary} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <path d="M5 13l4 4 10-10" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PARTICLES = [
  { x: -1, y: -0.6 },
  { x: 1, y: -0.8 },
  { x: -1.1, y: 0.5 },
  { x: 1.1, y: 0.6 },
  { x: 0, y: -1.1 },
  { x: 0, y: 1.1 },
];

export const SmartMatchMockup: React.FC<{ progress: number; frame: number }> = ({ progress, frame }) => {
  const frameScale = Math.max(0, Math.min(1, progress / 0.35));
  const scanProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.35));
  const matchPop = Math.max(0, Math.min(1, (progress - 0.62) / 0.25));
  const matchBounce = matchPop > 0 ? 1 + Math.max(0, (1 - matchPop) * 0.5) * Math.sin(matchPop * 10) : 0;
  const particleSpread = Math.max(0, Math.min(1, (progress - 0.62) / 0.3));
  const float = Math.sin(frame / 20) * 4;

  return (
    <div
      style={{
        width: 600,
        borderRadius: 30,
        background: "#FFFFFF",
        boxShadow: "0 36px 80px rgba(69,66,66,0.16)",
        overflow: "hidden",
        transform: `scale(${frameScale}) translateY(${float * 0.3}px)`,
        opacity: frameScale,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "18px 24px" }}>
        {["#E8A87C", "#F2C98A", "#9BC9A9"].map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
        ))}
      </div>

      <div style={{ padding: "4px 28px 34px", direction: "rtl" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: COLORS.background,
            borderRadius: 16,
            padding: "14px 18px",
          }}
        >
          <SearchIcon />
          <span style={{ fontFamily: persianFont, fontWeight: 600, fontSize: 20, color: COLORS.textMain }}>
            معلم ریاضی
          </span>
        </div>

        <div
          style={{
            position: "relative",
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ borderRadius: "50%", overflow: "hidden", boxShadow: "0 10px 24px rgba(69,66,66,0.14)" }}>
            <Person age="young" size={100} skinIndex={2} clothIndex={2} />
          </div>

          <svg width="220" height="50" viewBox="0 0 220 50" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
            <line
              x1="20"
              y1="25"
              x2="200"
              y2="25"
              stroke={COLORS.orange}
              strokeWidth={3}
              strokeDasharray="220"
              strokeDashoffset={220 - 220 * scanProgress}
              strokeLinecap="round"
            />
          </svg>

          <div style={{ borderRadius: "50%", overflow: "hidden", boxShadow: "0 10px 24px rgba(69,66,66,0.14)" }}>
            <Person age="adult" size={100} skinIndex={0} clothIndex={0} />
          </div>

          {matchPop > 0 ? (
            <>
              {PARTICLES.map((p, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS.star,
                    opacity: 1 - particleSpread,
                    transform: `translate(${p.x * 60 * particleSpread - 4}px, ${p.y * 60 * particleSpread - 4}px)`,
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) scale(${matchBounce})`,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: COLORS.orange,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 16px 30px rgba(237,95,0,0.3)",
                }}
              >
                <CheckIcon />
              </div>
            </>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 26,
            textAlign: "center",
            opacity: matchPop,
            transform: `translateY(${(1 - matchPop) * 10}px)`,
            fontFamily: persianFont,
            fontWeight: 700,
            fontSize: 22,
            color: COLORS.orange,
          }}
        >
          تطبیق هوشمند انجام شد
        </div>
      </div>
    </div>
  );
};
