import React from "react";
import { COLORS } from "../../Promo/theme";
import { Person } from "../../Promo/characters/Person";

const HeartIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24">
    <path
      d="M12 20s-7-4.4-9.5-8.8C.8 7.8 2.4 4 6 4c2 0 3.4 1 4 2.2.6-1.2 2-2.2 4-2.2 3.6 0 5.2 3.8 3.5 7.2C19 15.6 12 20 12 20z"
      fill={COLORS.orange}
    />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 24 24">
    <path d="M5 13l4 4 10-10" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2.5l2.9 6.16 6.6.72-4.94 4.6 1.32 6.52L12 17.3l-5.88 3.2 1.32-6.52-4.94-4.6 6.6-.72L12 2.5z"
      fill={COLORS.star}
    />
  </svg>
);

export const SmartPricingIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const tagScale = Math.max(0, Math.min(1, progress / 0.4));
  const pulse = 1 + Math.sin(frame / 10) * 0.03;
  const heartProgress = Math.max(0, Math.min(1, (progress - 0.45) / 0.35));
  const star1 = Math.max(0, Math.min(1, (progress - 0.6) / 0.3));
  const star2 = Math.max(0, Math.min(1, (progress - 0.72) / 0.3));

  return (
    <div style={{ position: "relative", width: 460, height: 440 }}>
      <div style={{ position: "absolute", left: "50%", bottom: 30, transform: "translateX(-50%)" }}>
        <Person age="adult" size={260} skinIndex={2} clothIndex={1} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 108,
          top: 108,
          transform: `scale(${heartProgress})`,
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
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: COLORS.buttonBg,
            border: `5px solid ${COLORS.buttonText}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 44px rgba(204,112,51,0.22)",
          }}
        >
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: COLORS.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 60, top: 60, transform: `scale(${star1})` }}>
        <StarIcon />
      </div>
      <div style={{ position: "absolute", right: 50, top: 90, transform: `scale(${star2})` }}>
        <StarIcon size={18} />
      </div>
    </div>
  );
};
