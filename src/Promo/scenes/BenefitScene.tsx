import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { BackgroundAccents } from "../components/BackgroundAccents";

export const BenefitScene: React.FC<{
  headline: string;
  index: number;
  total: number;
  renderIllustration: (progress: number, frame: number) => React.ReactNode;
}> = ({ headline, index, total, renderIllustration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const illustrationProgress = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 40 });

  const headlineSpring = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const headlineOpacity = interpolate(headlineSpring, [0, 1], [0, 1]);
  const headlineY = interpolate(headlineSpring, [0, 1], [24, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: index % 2 === 0 ? COLORS.background : "#FEF5EE" }}>
      <BackgroundAccents opacity={0.8} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 46 }}>
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
              direction: "rtl",
              textAlign: "center",
              padding: "0 72px",
            }}
          >
            <div
              style={{
                fontFamily: persianFont,
                fontWeight: 800,
                fontSize: 60,
                lineHeight: 1.4,
                color: COLORS.textMain,
              }}
            >
              {headline}
            </div>
          </div>
          <div style={{ transform: "scale(1.4)", transformOrigin: "top center" }}>
            {renderIllustration(illustrationProgress, frame)}
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 90 }}>
        <div style={{ display: "flex", gap: 12 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 34 : 10,
                height: 10,
                borderRadius: 6,
                background: i === index ? COLORS.orange : "rgba(69,66,66,0.18)",
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
