import React from "react";
import { COLORS } from "../../Promo/theme";
import { persianFont, latinFont } from "../../Promo/fonts";
import { Person } from "../../Promo/characters/Person";

const BooksIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 24 24">
    <rect x="3" y="15" width="18" height="4" rx="1" fill={COLORS.orange} />
    <rect x="4" y="10" width="16" height="4" rx="1" fill="#FFFFFF" stroke={COLORS.orange} strokeWidth={1.4} />
    <rect x="5" y="5" width="14" height="4" rx="1" fill={COLORS.buttonBg} />
  </svg>
);

export const CanadianClassroomIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const bob = Math.sin(frame / 16) * 5;
  const boardProgress = Math.max(0, Math.min(1, progress / 0.4));
  const badgeA = Math.max(0, Math.min(1, (progress - 0.32) / 0.3));
  const badgeB = Math.max(0, Math.min(1, (progress - 0.48) / 0.3));
  const booksProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));

  return (
    <div style={{ position: "relative", width: 480, height: 440 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 10,
          transform: `translateX(-50%) scale(${boardProgress})`,
          transformOrigin: "top center",
          width: 300,
          height: 170,
          borderRadius: 20,
          background: COLORS.textMain,
          boxShadow: "0 22px 46px rgba(69,66,66,0.2)",
          opacity: boardProgress,
        }}
      >
        <svg width="300" height="170" viewBox="0 0 300 170">
          <path
            d="M30 110 Q 80 70 130 95 T 230 80"
            fill="none"
            stroke={COLORS.cream}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.8}
          />
          <path d="M210 60 l14 14 l-14 14" fill="none" stroke={COLORS.orange} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 20,
          transform: `translateX(-50%) translateY(${bob * 0.3}px)`,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Person age="adult" size={230} skinIndex={0} clothIndex={0} />
        <div style={{ marginRight: -36 }}>
          <Person age="young" size={190} skinIndex={2} clothIndex={2} />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 20,
          top: 130,
          transform: `scale(${booksProgress}) rotate(${-8 * (1 - booksProgress)}deg)`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#FFFFFF",
            boxShadow: "0 14px 28px rgba(69,66,66,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BooksIcon />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 10,
          top: 200,
          transform: `scale(${badgeA}) rotate(${-6 + (1 - badgeA) * 14}deg)`,
          opacity: badgeA,
        }}
      >
        <div
          style={{
            width: 96,
            height: 64,
            borderRadius: 16,
            background: "#FFFFFF",
            boxShadow: "0 14px 30px rgba(69,66,66,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: latinFont,
            fontWeight: 700,
            fontSize: 26,
            color: COLORS.orange,
          }}
        >
          EN
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 6,
          top: 230,
          transform: `scale(${badgeB}) rotate(${6 - (1 - badgeB) * 14}deg)`,
          opacity: badgeB,
        }}
      >
        <div
          style={{
            width: 96,
            height: 64,
            borderRadius: 16,
            background: COLORS.orange,
            boxShadow: "0 14px 30px rgba(237,95,0,0.26)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: persianFont,
            fontWeight: 700,
            fontSize: 26,
            color: "#FFFFFF",
          }}
        >
          فا
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 50,
          top: 150,
          transform: `scale(${badgeA})`,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: `3px solid ${COLORS.orange}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: latinFont,
            fontWeight: 800,
            fontSize: 20,
            color: COLORS.orange,
          }}
        >
          CA
        </div>
      </div>
    </div>
  );
};
