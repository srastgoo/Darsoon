import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { easeIn, easeOut, prog } from "./anim";

// Zig-zag scribble wide enough (stroke 600px) to blanket the 1080x1920 frame.
const ZIGZAG = "M-320 60 L1400 -140 L-320 640 L1400 440 L-320 1220 L1400 1020 L-320 1800 L1400 1600 L-320 2380";

/**
 * Transition: a giant marker scribbles over the frame, then its tail wipes off,
 * revealing the next scene. The cut happens underneath at `cover` frames.
 * Place in a Sequence starting `cover` frames before the cut.
 */
export const MarkerWipe: React.FC<{ cover?: number; reveal?: number; color?: string; reverse?: boolean }> = ({
  cover = 9,
  reveal = 9,
  color = COLORS.orange,
  reverse,
}) => {
  const frame = useCurrentFrame();
  const head = prog(frame, 0, cover, easeIn);
  const tail = prog(frame, cover, reveal, easeOut);
  if (frame > cover + reveal) return null;
  const len = head - tail;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", transform: reverse ? "scaleX(-1)" : undefined }}>
      <svg width={1080} height={1920} style={{ overflow: "visible" }}>
        <path
          d={ZIGZAG}
          pathLength={1}
          fill="none"
          stroke={color}
          strokeWidth={600}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${Math.max(0.0001, len)} 2`}
          strokeDashoffset={-tail}
        />
      </svg>
    </AbsoluteFill>
  );
};
