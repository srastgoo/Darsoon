import React from "react";
import { COLORS } from "../../Promo/theme";
import { latinFont, persianFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

const CalendarIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke={COLORS.buttonText} strokeWidth={2} />
    <path d="M3 10h18M8 3v4M16 3v4" stroke={COLORS.buttonText} strokeWidth={2} strokeLinecap="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill={COLORS.orange} />
    <path d="M7 12.5l3 3 7-7" stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path
      d="M12 20s-7-4.4-9.5-8.8C.8 7.8 2.4 4 6 4c2 0 3.4 1 4 2.2.6-1.2 2-2.2 4-2.2 3.6 0 5.2 3.8 3.5 7.2C19 15.6 12 20 12 20z"
      fill={COLORS.orange}
    />
  </svg>
);

export const AffordableBookingIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const tagScale = Math.max(0, Math.min(1, progress / 0.4));
  const pulse = 1 + Math.sin(frame / 10) * 0.03;
  const bookingProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.4));
  const heartProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));

  return (
    <div style={{ position: "relative", width: 460, height: 440 }}>
      <div style={{ position: "absolute", left: "50%", bottom: 20, transform: "translateX(-50%)" }}>
        <Person age="adult" size={250} skinIndex={2} clothIndex={1} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 110,
          top: 110,
          transform: `scale(${heartProgress})`,
          transformOrigin: "center",
        }}
      >
        <HeartIcon />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translateX(-50%) scale(${tagScale * pulse}) rotate(-6deg)`,
        }}
      >
        <div
          style={{
            background: COLORS.buttonBg,
            border: `4px solid ${COLORS.buttonText}`,
            borderRadius: 24,
            padding: "18px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 18px 40px rgba(204,112,51,0.2)",
          }}
        >
          <span style={{ fontFamily: latinFont, fontWeight: 800, fontSize: 46, color: COLORS.buttonText }}>
            $10
          </span>
          <span style={{ fontFamily: persianFont, fontWeight: 700, fontSize: 18, color: COLORS.buttonText, marginTop: 2 }}>
            دلار کانادا
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 10,
          bottom: 60,
          transform: `scale(${bookingProgress})`,
          transformOrigin: "bottom right",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#FFFFFF",
          borderRadius: 18,
          padding: "12px 16px",
          boxShadow: "0 16px 34px rgba(69,66,66,0.14)",
        }}
      >
        <CalendarIcon />
        <svg width="18" height="10" viewBox="0 0 18 10">
          <path d="M1 5h14M10 1l5 4-5 4" stroke={COLORS.textSecondary} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <CheckIcon />
      </div>
    </div>
  );
};
