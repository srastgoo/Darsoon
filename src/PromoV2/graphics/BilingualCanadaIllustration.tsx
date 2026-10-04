import React from "react";
import { COLORS } from "../../Promo/theme";
import { persianFont, latinFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

export const BilingualCanadaIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const bob = Math.sin(frame / 16) * 6;
  const badgeA = Math.max(0, Math.min(1, (progress - 0.3) / 0.35));
  const badgeB = Math.max(0, Math.min(1, (progress - 0.48) / 0.35));
  const leafProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 40,
          transform: `translateX(-50%) translateY(${bob * 0.4}px)`,
        }}
      >
        <Person age="adult" size={280} skinIndex={2} clothIndex={0} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 20,
          top: 50,
          transform: `scale(${badgeA}) rotate(${-6 + (1 - badgeA) * 16}deg)`,
          opacity: badgeA,
        }}
      >
        <div
          style={{
            width: 110,
            height: 72,
            borderRadius: 18,
            background: "#FFFFFF",
            boxShadow: "0 16px 34px rgba(69,66,66,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: latinFont,
            fontWeight: 700,
            fontSize: 30,
            color: COLORS.orange,
          }}
        >
          EN
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 10,
          top: 110,
          transform: `scale(${badgeB}) rotate(${6 - (1 - badgeB) * 16}deg)`,
          opacity: badgeB,
        }}
      >
        <div
          style={{
            width: 110,
            height: 72,
            borderRadius: 18,
            background: COLORS.orange,
            boxShadow: "0 16px 34px rgba(237,95,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: persianFont,
            fontWeight: 700,
            fontSize: 30,
            color: "#FFFFFF",
          }}
        >
          فا
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 20,
          transform: `translateX(-50%) scale(${leafProgress})`,
        }}
      >
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: `3px solid ${COLORS.orange}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 26px rgba(237,95,0,0.16)",
            fontFamily: latinFont,
            fontWeight: 800,
            fontSize: 26,
            color: COLORS.orange,
          }}
        >
          CA
        </div>
      </div>
    </div>
  );
};
