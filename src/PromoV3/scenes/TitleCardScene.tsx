import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";

export const TitleCardScene: React.FC<{ text: string; variant?: "light" | "orange" }> = ({
  text,
  variant = "light",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 13, mass: 0.5 }, durationInFrames: 14 });
  const scale = interpolate(textSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(textSpring, [0, 1], [0, 1]);

  const background = variant === "orange" ? COLORS.orange : COLORS.background;
  const color = variant === "orange" ? "#FFFFFF" : COLORS.textMain;

  return (
    <AbsoluteFill style={{ backgroundColor: background, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontFamily: persianFont,
          fontWeight: 800,
          fontSize: 76,
          color,
          direction: "rtl",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
