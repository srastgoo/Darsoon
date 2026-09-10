import React from "react";
import { COLORS } from "../theme";
import { persianFont } from "../fonts";
import { Person } from "./Person";

export const FreeSessionIllustration: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const badgeScale = Math.max(0, Math.min(1, (progress - 0.35) / 0.4));
  const bob = Math.sin(frame / 14) * 6;

  return (
    <div style={{ position: "relative", width: 460, height: 460 }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 40,
          transform: `translateX(-50%) translateY(${bob * 0.4}px)`,
        }}
      >
        <Person age="young" size={280} skinIndex={1} clothIndex={0} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 10,
          transform: `scale(${badgeScale}) rotate(${-8 + (1 - badgeScale) * 20}deg)`,
          opacity: badgeScale,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            width: 168,
            height: 168,
            borderRadius: "50%",
            background: COLORS.orange,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 40px rgba(237,95,0,0.28)",
            border: `6px dashed ${COLORS.cream}`,
          }}
        >
          <span
            style={{
              fontFamily: persianFont,
              fontWeight: 800,
              fontSize: 40,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            رایگان
          </span>
        </div>
      </div>
    </div>
  );
};
