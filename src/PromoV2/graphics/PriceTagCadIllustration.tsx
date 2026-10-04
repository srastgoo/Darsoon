import React from "react";
import { COLORS } from "../../Promo/theme";
import { latinFont, persianFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

export const PriceTagCadIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const tagScale = Math.max(0, Math.min(1, (progress - 0.25) / 0.45));
  const pulse = 1 + Math.sin(frame / 10) * 0.03;

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div style={{ position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)" }}>
        <Person age="adult" size={270} skinIndex={3} clothIndex={1} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: `translateX(-50%) scale(${tagScale * pulse}) rotate(-6deg)`,
        }}
      >
        <div
          style={{
            background: COLORS.buttonBg,
            border: `4px solid ${COLORS.buttonText}`,
            borderRadius: 26,
            padding: "22px 34px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 46px rgba(204,112,51,0.22)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: latinFont, fontWeight: 800, fontSize: 56, color: COLORS.buttonText }}>
              $10
            </span>
          </div>
          <span
            style={{
              fontFamily: persianFont,
              fontWeight: 700,
              fontSize: 24,
              color: COLORS.buttonText,
              marginTop: 2,
            }}
          >
            دلار کانادا
          </span>
        </div>
      </div>
    </div>
  );
};
