import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import { BENEFIT_LEN, SCENES, STAT_INTRO, STAT_LEN, SUBJECT_LEN, TOTAL_FRAMES } from "./timeline";
import { CTA_LOGO, CTA_TAP } from "./scenes/S6CTA";

type Sfx = "marker" | "click" | "pop" | "whoosh" | "swipe" | "impact" | "ding" | "coin" | "tick" | "thud" | "boing" | "success";
// Mix: music bed sits around -14 LUFS with SFX on top; keep true peak under 0 dBFS.
const SFX_GAIN = 0.6;

type Cue = { at: number; sfx: Sfx; vol?: number };

const P = SCENES.problem.from;
const S = SCENES.solution.from;
const T = SCENES.stats.from;
const B = SCENES.benefits.from;
const U = SCENES.subjects.from;
const C = SCENES.cta.from;
const stat = (i: number) => T + STAT_INTRO + i * STAT_LEN - (i === 0 ? 12 : 0);

// Every important hit in the picture has a sound. Frames are absolute.
const CUES: Cue[] = [
  // 1 · problem
  { at: P + 2, sfx: "marker", vol: 0.55 },
  { at: P + 12, sfx: "thud", vol: 0.7 },
  { at: P + 17, sfx: "thud", vol: 0.6 },
  { at: P + 23, sfx: "thud", vol: 0.55 },
  { at: P + 18, sfx: "marker", vol: 0.4 },
  { at: P + 20, sfx: "tick", vol: 0.5 },
  { at: P + 25, sfx: "tick", vol: 0.5 },
  { at: P + 30, sfx: "tick", vol: 0.5 },
  { at: P + 27, sfx: "marker", vol: 0.5 },
  { at: P + 46, sfx: "boing", vol: 0.55 },
  { at: P + 52, sfx: "marker", vol: 0.6 },
  { at: P + 71, sfx: "thud", vol: 0.9 },
  { at: P + 72, sfx: "boing", vol: 0.5 },
  { at: P + 100, sfx: "whoosh", vol: 0.8 },
  // 2 · solution
  { at: S + 14, sfx: "impact", vol: 1 },
  { at: S + 22, sfx: "whoosh", vol: 0.6 },
  { at: S + 29, sfx: "marker", vol: 0.6 },
  { at: S + 34, sfx: "pop", vol: 0.6 },
  { at: S + 40, sfx: "swipe", vol: 0.6 },
  { at: S + 48, sfx: "pop", vol: 0.5 },
  { at: S + 50, sfx: "whoosh", vol: 0.5 },
  { at: S + 58, sfx: "tick", vol: 0.5 },
  { at: S + 64, sfx: "tick", vol: 0.5 },
  { at: S + 70, sfx: "tick", vol: 0.5 },
  { at: S + 78, sfx: "click", vol: 0.8 },
  { at: S + 83, sfx: "marker", vol: 0.6 },
  { at: S + 90, sfx: "success", vol: 0.8 },
  { at: S + 102, sfx: "whoosh", vol: 0.6 },
  { at: S + 116, sfx: "marker", vol: 0.55 },
  { at: S + 130, sfx: "marker", vol: 0.55 },
  { at: S + 142, sfx: "ding", vol: 0.6 },
  { at: S + 140, sfx: "swipe", vol: 0.6 },
  // 3 · stats
  { at: T + 2, sfx: "whoosh", vol: 0.5 },
  ...[0, 1, 2, 3, 4].flatMap((i): Cue[] => [
    { at: stat(i), sfx: "whoosh", vol: 0.45 },
    { at: stat(i) + 9, sfx: "pop", vol: 0.85 },
    { at: stat(i) + 4, sfx: "tick", vol: 0.4 },
    { at: stat(i) + 8, sfx: "tick", vol: 0.4 },
    { at: stat(i) + 14, sfx: "tick", vol: 0.4 },
  ]),
  { at: stat(1) + 6, sfx: "boing", vol: 0.35 },
  { at: stat(3) + 8, sfx: "click", vol: 0.6 },
  { at: stat(4) + 6, sfx: "ding", vol: 0.55 },
  { at: stat(4) + 12, sfx: "ding", vol: 0.45 },
  // 4 · benefits (each opened by the marker scribble)
  ...[0, 1, 2].flatMap((k): Cue[] => [
    { at: B + k * BENEFIT_LEN - 9, sfx: "marker", vol: 0.9 },
    { at: B + k * BENEFIT_LEN - 4, sfx: "whoosh", vol: 0.6 },
  ]),
  { at: B + 22, sfx: "click", vol: 0.6 },
  { at: B + 28, sfx: "click", vol: 0.6 },
  { at: B + 34, sfx: "click", vol: 0.6 },
  { at: B + BENEFIT_LEN + 18, sfx: "click", vol: 0.6 },
  { at: B + BENEFIT_LEN + 25, sfx: "click", vol: 0.6 },
  { at: B + BENEFIT_LEN + 32, sfx: "click", vol: 0.6 },
  { at: B + BENEFIT_LEN + 27, sfx: "pop", vol: 0.7 },
  { at: B + BENEFIT_LEN + 40, sfx: "success", vol: 0.6 },
  { at: B + BENEFIT_LEN * 2 + 4, sfx: "coin", vol: 0.6 },
  { at: B + BENEFIT_LEN * 2 + 8, sfx: "coin", vol: 0.6 },
  { at: B + BENEFIT_LEN * 2 + 12, sfx: "coin", vol: 0.6 },
  { at: B + BENEFIT_LEN * 2 + 22, sfx: "coin", vol: 0.5 },
  { at: B + BENEFIT_LEN * 2 + 34, sfx: "pop", vol: 0.8 },
  // 5 · subjects
  ...[0, 1, 2, 3, 4].flatMap((i): Cue[] => [
    { at: U + i * SUBJECT_LEN, sfx: "whoosh", vol: 0.55 },
    { at: U + i * SUBJECT_LEN + 4, sfx: "pop", vol: 0.75 },
  ]),
  { at: U + 4, sfx: "marker", vol: 0.5 },
  { at: U + SUBJECT_LEN + 8, sfx: "ding", vol: 0.45 },
  { at: U + SUBJECT_LEN * 3 + 8, sfx: "boing", vol: 0.35 },
  { at: U + SUBJECT_LEN * 4 + 6, sfx: "tick", vol: 0.8 },
  { at: U + SUBJECT_LEN * 4 + 18, sfx: "tick", vol: 0.8 },
  // 6 · CTA
  { at: C, sfx: "whoosh", vol: 0.8 },
  { at: C + 12, sfx: "click", vol: 0.4 },
  { at: C + 16, sfx: "click", vol: 0.4 },
  { at: C + 20, sfx: "click", vol: 0.4 },
  { at: C + 24, sfx: "click", vol: 0.4 },
  { at: C + 28, sfx: "pop", vol: 0.6 },
  { at: C + 36, sfx: "ding", vol: 0.45 },
  { at: C + 30, sfx: "pop", vol: 0.5 },
  { at: C + CTA_TAP - 1, sfx: "click", vol: 1 },
  { at: C + CTA_TAP, sfx: "success", vol: 0.8 },
  { at: C + CTA_LOGO - 4, sfx: "whoosh", vol: 0.6 },
  { at: C + CTA_LOGO + 6, sfx: "impact", vol: 1 },
  { at: C + CTA_LOGO + 16, sfx: "pop", vol: 0.6 },
  { at: C + CTA_LOGO + 22, sfx: "marker", vol: 0.5 },
];

export const Soundtrack: React.FC = () => (
  <>
    <Audio
      src={staticFile("v5/music.mp3")}
      volume={(f) => interpolate(f, [0, 6, TOTAL_FRAMES - 20, TOTAL_FRAMES], [0, 0.5, 0.5, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
    {CUES.map((c, i) => (
      <Sequence key={i} from={Math.max(0, Math.round(c.at))} durationInFrames={60} name={`sfx ${c.sfx}`}>
        <Audio src={staticFile(`v5/sfx-${c.sfx}.mp3`)} volume={() => (c.vol ?? 1) * SFX_GAIN} />
      </Sequence>
    ))}
  </>
);
