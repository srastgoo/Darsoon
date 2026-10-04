import React from "react";
import { COLORS } from "../../Promo/theme";

const BARS = [0.35, 0.52, 0.42, 0.68, 0.58, 0.82, 0.72, 1];

export const GrowthBars: React.FC<{ progress: number; width?: number; height?: number }> = ({
  progress,
  width = 320,
  height = 130,
}) => {
  const barWidth = width / BARS.length - 8;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, width, height }}>
      {BARS.map((h, i) => {
        const reveal = Math.max(0, Math.min(1, (progress - i * 0.06) / 0.4));
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: height * h * reveal,
              borderRadius: 6,
              background: i === BARS.length - 1 ? COLORS.orange : "rgba(237,95,0,0.28)",
              alignSelf: "flex-end",
            }}
          />
        );
      })}
    </div>
  );
};
