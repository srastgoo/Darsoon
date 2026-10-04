import React from "react";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

const HouseIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <path d="M3 11l9-7 9 7" stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9h14v-9" stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LiveLessonMockup: React.FC<{ progress: number; frame: number }> = ({ progress, frame }) => {
  const frameScale = Math.max(0, Math.min(1, progress / 0.45));
  const scribble = Math.max(0, Math.min(1, (progress - 0.4) / 0.5));
  const studentPop = Math.max(0, Math.min(1, (progress - 0.3) / 0.4));
  const float = Math.sin(frame / 20) * 5;

  return (
    <div
      style={{
        width: 620,
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

      <div style={{ position: "relative", padding: "0 24px 26px", direction: "rtl" }}>
        <div
          style={{
            background: COLORS.textMain,
            borderRadius: 20,
            padding: "26px 24px 70px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ borderRadius: "50%", overflow: "hidden", background: "#FFFFFF" }}>
              <Person age="adult" size={64} skinIndex={0} clothIndex={0} />
            </div>
            <div>
              <div style={{ fontFamily: persianFont, fontWeight: 700, fontSize: 22, color: "#FFFFFF" }}>
                معلم ریاضی
              </div>
              <div style={{ fontFamily: persianFont, fontWeight: 500, fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
                در حال توضیح درس
              </div>
            </div>
          </div>

          <svg width="100%" height="56" viewBox="0 0 460 56" style={{ marginTop: 16, display: "block" }}>
            <path
              d="M10 40 Q 60 10, 110 32 T 220 26 T 330 36 T 440 20"
              fill="none"
              stroke={COLORS.orange}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="520"
              strokeDashoffset={520 - 520 * scribble}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              left: 18,
              bottom: 18,
              transform: `scale(${studentPop})`,
              transformOrigin: "bottom left",
              background: "#FFFFFF",
              borderRadius: 16,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 14px 30px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ borderRadius: "50%", overflow: "hidden" }}>
              <Person age="child" size={44} skinIndex={2} clothIndex={1} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: COLORS.orange,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HouseIcon />
              </div>
              <span style={{ fontFamily: persianFont, fontWeight: 600, fontSize: 15, color: COLORS.textMain }}>
                از خانه
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
