import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS, HOOK_FREEZE, MOTION_FRAMES, MOTION_FROM, SCENES, toOut } from "./timeline";
import "./fonts";
import { RoughDefs } from "./lib/visual";
import { S1Problem } from "./scenes/S1Problem";
import { S2Solution } from "./scenes/S2Solution";
import { S3Stats } from "./scenes/S3Stats";
import { S4Benefits } from "./scenes/S4Benefits";
import { S5Subjects } from "./scenes/S5Subjects";
import { S6CTA } from "./scenes/S6CTA";
import { Soundtrack } from "./Soundtrack";
import { MarkerWipe } from "./lib/MarkerWipe";
import { BENEFIT_LEN } from "./timeline";
import { HookClip, PaperToss } from "./scenes/S0Hook";

/** The motion-graphics film on its own (story time slowed by SPEED). */
export const DarsoonMotion: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.canvas, overflow: "hidden" }}>
    <RoughDefs />
    <Sequence from={toOut(SCENES.problem.from)} durationInFrames={toOut(SCENES.problem.from + SCENES.problem.dur) - toOut(SCENES.problem.from)} name="1 · Problem">
      <S1Problem />
    </Sequence>
    <Sequence from={toOut(SCENES.solution.from)} durationInFrames={toOut(SCENES.solution.from + SCENES.solution.dur) - toOut(SCENES.solution.from)} name="2 · Solution">
      <S2Solution />
    </Sequence>
    <Sequence from={toOut(SCENES.stats.from)} durationInFrames={toOut(SCENES.stats.from + SCENES.stats.dur) - toOut(SCENES.stats.from)} name="3 · Stats">
      <S3Stats />
    </Sequence>
    <Sequence from={toOut(SCENES.benefits.from)} durationInFrames={toOut(SCENES.benefits.from + SCENES.benefits.dur) - toOut(SCENES.benefits.from)} name="4 · Benefits">
      <S4Benefits />
    </Sequence>
    <Sequence from={toOut(SCENES.subjects.from)} durationInFrames={toOut(SCENES.subjects.from + SCENES.subjects.dur) - toOut(SCENES.subjects.from)} name="5 · Subjects">
      <S5Subjects />
    </Sequence>
    <Sequence from={toOut(SCENES.cta.from)} durationInFrames={toOut(SCENES.cta.from + SCENES.cta.dur) - toOut(SCENES.cta.from)} name="6 · CTA">
      <S6CTA />
    </Sequence>
    <Soundtrack />

    {/* marker-scribble transitions (cut happens under full cover) */}
    {[0, 1, 2].map((k) => (
      <Sequence key={k} from={toOut(SCENES.benefits.from + k * BENEFIT_LEN - 9)} durationInFrames={toOut(20)} name={`Marker wipe ${k + 1}`}>
        <MarkerWipe color={k === 1 ? COLORS.title : COLORS.orange} reverse={k === 1} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

/** Full ad: the client's talking-head hook, the paper-toss hand-off, then the motion film. */
export const DarsoonLaunch: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.canvas, overflow: "hidden" }}>
    <Sequence durationInFrames={HOOK_FREEZE} name="0 · Hook clip">
      <HookClip />
    </Sequence>
    <Sequence from={MOTION_FROM} durationInFrames={MOTION_FRAMES} name="Motion film">
      <DarsoonMotion />
    </Sequence>
    <Sequence from={HOOK_FREEZE} durationInFrames={90} name="Paper toss">
      <PaperToss />
    </Sequence>
  </AbsoluteFill>
);
