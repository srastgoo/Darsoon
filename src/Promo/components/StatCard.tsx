import React from "react";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { Stars } from "./Stars";

export const StatCard: React.FC<{
  entrance: number;
  countProgress: number;
  targetValue: number;
  formatValue: (current: number) => string;
  label: string;
  showStars?: boolean;
  compact?: boolean;
}> = ({ entrance, countProgress, targetValue, formatValue, label, showStars, compact }) => {
  const current = targetValue * countProgress;
  const scale = 0.82 + entrance * 0.18;
  const translateY = (1 - entrance) * 36;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 10 : 18,
        opacity: entrance,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: "#FFFFFF",
        borderRadius: compact ? 28 : 40,
        padding: compact ? "36px 20px" : "64px 48px",
        boxShadow: "0 18px 60px rgba(69, 66, 66, 0.08)",
        width: compact ? "100%" : "auto",
        minWidth: compact ? undefined : 620,
      }}
    >
      <div
        style={{
          fontFamily: persianFont,
          fontWeight: 800,
          fontSize: compact ? 58 : 128,
          color: COLORS.orange,
          direction: "ltr",
          lineHeight: 1,
        }}
      >
        {formatValue(current)}
      </div>
      {showStars ? (
        <Stars rating={4.9} progress={Math.min(1, countProgress * 1.4)} size={compact ? 30 : 52} gap={compact ? 6 : 12} />
      ) : null}
      <div
        style={{
          fontFamily: persianFont,
          fontWeight: 600,
          fontSize: compact ? 30 : 52,
          color: COLORS.textSecondary,
          direction: "rtl",
        }}
      >
        {label}
      </div>
    </div>
  );
};
