import React from "react";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

const ChromeDots: React.FC = () => (
  <div style={{ display: "flex", gap: 8 }}>
    {["#E8A87C", "#F2C98A", "#9BC9A9"].map((c, i) => (
      <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
    ))}
  </div>
);

export const AppMockup: React.FC<{ progress: number; frame: number }> = ({ progress, frame }) => {
  const float = Math.sin(frame / 22) * 8;
  const tilt = Math.sin(frame / 30) * 1.4;
  const cardScale = 0.88 + progress * 0.12;
  const cardOpacity = Math.max(0, Math.min(1, progress / 0.6));

  const studentProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.45));
  const linkProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

  return (
    <div style={{ position: "relative", width: 640, height: 560 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 20,
          transform: `translateX(-50%) translateY(${float}px) rotate(${tilt}deg) scale(${cardScale})`,
          opacity: cardOpacity,
          width: 560,
          borderRadius: 32,
          background: "#FFFFFF",
          boxShadow: "0 40px 90px rgba(69,66,66,0.16)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 28px",
            borderBottom: `1px solid ${COLORS.background}`,
          }}
        >
          <ChromeDots />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              direction: "rtl",
              fontFamily: persianFont,
              fontWeight: 700,
              fontSize: 22,
              color: COLORS.textMain,
            }}
          >
            درسون
            <div style={{ width: 16, height: 16, borderRadius: 5, background: COLORS.orange }} />
          </div>
        </div>

        <div style={{ padding: "32px 32px 36px", direction: "rtl" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: COLORS.background,
                    width: 92,
                    height: 92,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Person age="adult" size={92} skinIndex={0} clothIndex={0} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#3FB873",
                    border: "3px solid #FFFFFF",
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: persianFont, fontWeight: 800, fontSize: 30, color: COLORS.textMain }}>
                  معلم ریاضی
                </div>
                <div style={{ fontFamily: persianFont, fontWeight: 600, fontSize: 22, color: "#3FB873", marginTop: 4 }}>
                  آنلاین
                </div>
              </div>
            </div>
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: COLORS.orange,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 16px 30px rgba(237,95,0,0.3)",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              background: COLORS.background,
              borderRadius: 18,
              padding: "20px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: persianFont, fontWeight: 700, fontSize: 24, color: COLORS.textMain }}>
              جلسه بعدی
            </div>
            <div style={{ fontFamily: persianFont, fontWeight: 700, fontSize: 24, color: COLORS.orange }}>
              امروز، ۵:۰۰
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          transform: `scale(${0.7 + studentProgress * 0.3}) translateY(${(1 - studentProgress) * 24}px)`,
          opacity: studentProgress,
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxShadow: "0 24px 50px rgba(69,66,66,0.14)",
        }}
      >
        <div style={{ borderRadius: "50%", overflow: "hidden", width: 64, height: 64 }}>
          <Person age="child" size={64} skinIndex={2} clothIndex={1} />
        </div>
        <div style={{ direction: "rtl", fontFamily: persianFont, fontWeight: 700, fontSize: 20, color: COLORS.textMain }}>
          یادگیری از خانه
        </div>
      </div>

      <svg
        width="640"
        height="560"
        viewBox="0 0 640 560"
        style={{ position: "absolute", inset: 0, opacity: linkProgress, pointerEvents: "none" }}
      >
        <path
          d="M140 470 C 260 420, 320 340, 360 240"
          fill="none"
          stroke={COLORS.orange}
          strokeOpacity={0.35}
          strokeWidth={4}
          strokeDasharray="2 16"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
