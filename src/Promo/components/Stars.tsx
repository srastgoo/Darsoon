import React from "react";
import { COLORS } from "../theme";

const StarShape: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path
      d="M12 2.5l2.9 6.16 6.6.72-4.94 4.6 1.32 6.52L12 17.3l-5.88 3.2 1.32-6.52-4.94-4.6 6.6-.72L12 2.5z"
      fill={color}
    />
  </svg>
);

const SingleStar: React.FC<{ size: number; fill: number; gap: number }> = ({ size, fill }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "absolute", inset: 0, opacity: 0.25 }}>
      <StarShape size={size} color={COLORS.textSecondary} />
    </div>
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        width: `${Math.max(0, Math.min(1, fill)) * 100}%`,
      }}
    >
      <StarShape size={size} color={COLORS.star} />
    </div>
  </div>
);

export const Stars: React.FC<{
  rating: number;
  progress: number;
  size?: number;
  gap?: number;
}> = ({ rating, progress, size = 48, gap = 10 }) => {
  const stars = [0, 1, 2, 3, 4];

  return (
    <div style={{ display: "flex", gap, direction: "ltr" }}>
      {stars.map((i) => {
        const starReveal = Math.max(0, Math.min(1, progress * 5 - i));
        const fullFill = Math.max(0, Math.min(1, rating - i));
        const fill = fullFill * starReveal;
        const scale = 0.4 + starReveal * 0.6;
        return (
          <div
            key={i}
            style={{
              transform: `scale(${scale})`,
              opacity: starReveal > 0 ? 1 : 0,
            }}
          >
            <SingleStar size={size} fill={fill} gap={gap} />
          </div>
        );
      })}
    </div>
  );
};
