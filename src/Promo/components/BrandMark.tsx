import React from "react";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";

export const BrandMark: React.FC<{
  size?: number;
  color?: string;
  opacity?: number;
}> = ({ size = 34, color = COLORS.textMain, opacity = 1 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.32,
        opacity,
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.32,
          background: COLORS.orange,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: persianFont,
          fontWeight: 800,
          fontSize: size * 0.95,
          color,
          letterSpacing: 0,
        }}
      >
        درسون
      </span>
    </div>
  );
};
