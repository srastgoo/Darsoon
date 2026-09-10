import React from "react";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";

export const CTAButton: React.FC<{
  label: string;
  scale?: number;
  opacity?: number;
}> = ({ label, scale = 1, opacity = 1 }) => {
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: COLORS.buttonBg,
        color: COLORS.buttonText,
        borderRadius: 999,
        padding: "34px 76px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        direction: "rtl",
        boxShadow: "0 20px 50px rgba(237, 95, 0, 0.18)",
      }}
    >
      <span
        style={{
          fontFamily: persianFont,
          fontWeight: 800,
          fontSize: 44,
          color: COLORS.buttonText,
        }}
      >
        {label}
      </span>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 6l-6 6 6 6"
          stroke={COLORS.buttonText}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
