import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../Promo/theme";
import { persianFont } from "../../Promo/fonts";
import { BackgroundAccents } from "../../Promo/components/BackgroundAccents";
import { SUBJECTS, SubjectBadge } from "../graphics/SubjectIcons";

const ROWS = [
  [0, 1, 2],
  [3, 4],
];

export const SubjectsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineSpring = spring({ frame: frame - 2, fps, config: { damping: 200 }, durationInFrames: 14 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <BackgroundAccents />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
          <div
            style={{
              opacity: interpolate(headlineSpring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(headlineSpring, [0, 1], [18, 0])}px)`,
              fontFamily: persianFont,
              fontWeight: 800,
              fontSize: 50,
              color: COLORS.textMain,
              direction: "rtl",
              textAlign: "center",
            }}
          >
            در هر موضوع درسی، کنار شماییم
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
            {ROWS.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 40 }}>
                {row.map((idx) => {
                  const subject = SUBJECTS[idx];
                  const itemSpring = spring({
                    frame: frame - 14 - idx * 7,
                    fps,
                    config: { damping: 11, mass: 0.6 },
                    durationInFrames: 20,
                  });
                  const scale = interpolate(itemSpring, [0, 1], [0.3, 1]);
                  const rotate = interpolate(itemSpring, [0, 1], [-20, 0]);
                  return (
                    <div
                      key={subject.kind}
                      style={{
                        opacity: itemSpring,
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <SubjectBadge kind={subject.kind} />
                      <span
                        style={{
                          fontFamily: persianFont,
                          fontWeight: 700,
                          fontSize: 26,
                          color: COLORS.textMain,
                          direction: "rtl",
                        }}
                      >
                        {subject.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
