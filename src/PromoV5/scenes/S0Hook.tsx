import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { COLORS, HOOK_FREEZE, TOSS_LEN } from "../timeline";
import { clamp01, easeIn, easeInOut, lerp, prog, wobble } from "../lib/anim";
import { Paper } from "../lib/visual";

/** The client's talking-head clip, with a punch-in on her final smile. */
export const HookClip: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = prog(frame, HOOK_FREEZE - 16, 16, easeIn);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${1 + punch * 0.18})`, transformOrigin: "50% 30%" }}>
        <OffthreadVideo src={staticFile("tutor-hook-video.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Paper-ball flight: thrown up and right, bounces once on the floor, leaves frame.
const ballAt = (t: number) => {
  let x = 540;
  let y = 880;
  let vx = 26;
  let vy = -46;
  const g = 3.4;
  const floor = 1840;
  for (let i = 0; i < t; i++) {
    vy += g;
    x += vx;
    y += vy;
    if (y > floor) {
      y = floor;
      vy *= -0.5;
      vx *= 0.8;
    }
  }
  return { x, y };
};

/**
 * Hand-off from the hook to the motion film: the frozen frame becomes a
 * polaroid lying on the notebook page, gets scrunched into a paper ball and
 * is tossed away with real gravity and a bounce, clearing the page.
 * Starts at HOOK_FREEZE; runs past the start of the motion film.
 */
export const PaperToss: React.FC = () => {
  const t = useCurrentFrame();
  const shrink = prog(t, 0, 11, easeInOut);
  const crumple = prog(t, 11, TOSS_LEN - 11, easeInOut);
  const flying = t >= TOSS_LEN;
  const ball = ballAt(t - TOSS_LEN);

  const w = lerp(1080, 560, shrink);
  const border = lerp(0, 22, shrink);
  const rot = lerp(0, -7, shrink) + wobble(t - 11, 3, 3, 6);
  const crunch = 1 - crumple * 0.8; // ends ≈ the paper ball's size
  const jitter = crumple > 0 ? Math.sin(t * 3.1) * 6 * crumple : 0;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* paper page appears behind the freeze while it shrinks */}
      {!flying ? (
        <AbsoluteFill style={{ opacity: clamp01(shrink * 3) }}>
          <Paper />
        </AbsoluteFill>
      ) : null}
      {!flying ? (
        <div
          style={{
            position: "absolute",
            left: 540,
            top: lerp(960, 900, shrink),
            transform: `translate(-50%, -50%) rotate(${rot + jitter}deg) scale(${crunch * (1 - crumple * 0.1)}, ${crunch * (1 + crumple * 0.08)})`,
            background: "#fff",
            padding: `${border}px ${border}px ${border * 4}px`,
            boxShadow: `0 ${30 * shrink}px ${60 * shrink}px -20px rgba(80,40,10,${0.45 * shrink})`,
            borderRadius: crumple * 200,
            overflow: "hidden",
            filter: crumple > 0.05 ? `contrast(${1 + crumple * 0.3}) brightness(${1 - crumple * 0.15})` : undefined,
          }}
        >
          <Img src={staticFile("v5/hook-freeze.jpg")} style={{ width: w - border * 2, height: ((w - border * 2) * 1920) / 1080, objectFit: "cover", display: "block", transform: `scale(${lerp(1.18, 1, shrink)})`, transformOrigin: "50% 30%" }} />
          {/* creases appear as it's scrunched */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: crumple }}>
            <path d="M5 20 L40 35 L30 60 L70 75 L95 55 M20 90 L45 55 L80 30 L60 5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={1.5} />
          </svg>
        </div>
      ) : (
        <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
          <g transform={`translate(${ball.x} ${ball.y}) rotate(${(t - TOSS_LEN) * 24})`}>
            <circle r={58} fill="#fff" stroke="#d8ccc2" strokeWidth={4} />
            <path d="M-40 -20 L-6 -8 L-18 22 L20 30 M-10 -46 L8 -14 L42 -18 M-44 18 L-20 6" fill="none" stroke="#c9bbb0" strokeWidth={4} strokeLinejoin="round" />
            <path d="M-30 -40 Q0 -54 30 -40" fill="none" stroke={COLORS.logo} strokeWidth={6} opacity={0.6} />
          </g>
        </svg>
      )}
      <Sequence durationInFrames={20}>
        <Audio src={staticFile("v5/sfx-scratch.mp3")} volume={() => 0.55} />
      </Sequence>
      <Sequence from={11} durationInFrames={20}>
        <Audio src={staticFile("v5/sfx-crumple.mp3")} volume={() => 0.8} />
      </Sequence>
      <Sequence from={TOSS_LEN} durationInFrames={20}>
        <Audio src={staticFile("v5/sfx-whoosh.mp3")} volume={() => 0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};
