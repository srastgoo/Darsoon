import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";

export const ContentScene: React.FC<{
  headline: string;
  tint?: boolean;
  illustrationScale?: number;
  renderIllustration: (progress: number, frame: number) => React.ReactNode;
}> = ({ headline, tint, illustrationScale = 1.1, renderIllustration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const illustrationProgress = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });

  const headlineSpring = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 16 });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);
  const headlineY = interpolate(headlineSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: tint ? "#FEF5EE" : COLORS.background }}>
      <BackgroundAccents opacity={0.8} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
              direction: "rtl",
              textAlign: "center",
              padding: "0 68px",
            }}
          >
            <div
              style={{
                fontFamily: persianFont,
                fontWeight: 800,
                fontSize: 54,
                lineHeight: 1.4,
                color: COLORS.textMain,
                whiteSpace: "pre-line",
              }}
            >
              {headline}
            </div>
          </div>
          <div style={{ transform: `scale(${illustrationScale})`, transformOrigin: "top center" }}>
            {renderIllustration(illustrationProgress, frame)}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
