import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";
import { SmartMatchMockup } from "../graphics/SmartMatchMockup";

const WIPE_END = 16;

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wipeProgress = interpolate(frame, [0, WIPE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineSpring = spring({
    frame: frame - WIPE_END - 2,
    fps,
    config: { damping: 200 },
    durationInFrames: 16,
  });
  const mockupProgress = spring({
    frame: frame - WIPE_END - 10,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, overflow: "hidden" }}>
      <BackgroundAccents />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
          <div
            style={{
              opacity: interpolate(headlineSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(headlineSpring, [0, 1], [20, 0])}px)`,
              direction: "rtl",
              textAlign: "center",
              padding: "0 60px",
            }}
          >
            <div
              style={{
                fontFamily: persianFont,
                fontWeight: 800,
                fontSize: 54,
                lineHeight: 1.4,
                color: COLORS.textMain,
              }}
            >
              درسون؛ راه ساده‌تر برای
              <br />
              پیدا کردن معلم خصوصی
            </div>
          </div>
          <SmartMatchMockup progress={mockupProgress} frame={frame} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundColor: COLORS.orange,
          transform: `scaleX(${1 - wipeProgress})`,
          transformOrigin: "right center",
          opacity: wipeProgress >= 1 ? 0 : 1,
        }}
      />
    </AbsoluteFill>
  );
};
