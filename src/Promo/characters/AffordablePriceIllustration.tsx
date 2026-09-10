import React from "react";
import { COLORS } from "../theme";
import { Person } from "./Person";

export const AffordablePriceIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const tagScale = Math.max(0, Math.min(1, (progress - 0.3) / 0.4));
  const pulse = 1 + Math.sin(frame / 10) * 0.03;

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div style={{ position: "absolute", left: "50%", bottom: 40, transform: "translateX(-50%)" }}>
        <Person age="adult" size={280} skinIndex={2} clothIndex={2} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: "50%",
          transform: `translateX(-50%) scale(${tagScale * pulse})`,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180">
          <path
            d="M20 90 L90 20 L160 40 L160 90 L90 160 Z"
            fill={COLORS.buttonBg}
            stroke={COLORS.buttonText}
            strokeWidth={4}
          />
          <circle cx="128" cy="52" r="12" fill={COLORS.buttonText} />
          <text
            x="95"
            y="105"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="46"
            fontWeight="800"
            fill={COLORS.buttonText}
          >
            %
          </text>
        </svg>
      </div>
    </div>
  );
};
