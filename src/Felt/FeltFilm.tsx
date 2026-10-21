import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import "../PromoV5/fonts";
import { FeltDefs, FELT } from "./kit";
import { ClothWipe, ZipperPull, zipperOpen } from "./common";
import { SceneGlobe, SceneNight, SceneOnline, ScenePhone, SceneConfident, SceneSchool, SceneTakeoff, SceneTehran, SceneToronto } from "./scenes";
import { SceneLogo, TAP_AT } from "./SceneLogo";

// 30 fps, music at 90 BPM: 1 bar = 80 frames. Story beats land on bars.
export const FELT_FPS = 30;
export const FELT_FRAMES = 1320; // 44 s
const S = {
  tehran: [0, 160],
  takeoff: [160, 240],
  globe: [240, 400],
  toronto: [400, 480],
  school: [480, 640],
  night: [640, 800],
  phone: [800, 960],
  online: [960, 1120],
  confident: [1120, 1200],
  logo: [1200, 1320],
} as const;

type Cue = { at: number; sfx: string; vol: number };
const CUES: Cue[] = [
  // packing
  ...[18, 35, 52, 69].map((a): Cue => ({ at: a, sfx: "pop", vol: 0.45 })),
  ...[32, 49, 66, 83].map((a): Cue => ({ at: a, sfx: "thud", vol: 0.35 })),
  { at: 88, sfx: "boing", vol: 0.55 },
  { at: 104, sfx: "thud", vol: 0.5 },
  { at: 136, sfx: "thud", vol: 0.7 },
  { at: 144, sfx: "boing", vol: 0.6 },
  { at: 150, sfx: "zipper", vol: 0.9 },
  // takeoff + globe
  { at: 162, sfx: "plane", vol: 0.7 },
  { at: 232, sfx: "whoosh", vol: 0.5 },
  { at: 244, sfx: "pop", vol: 0.5 },
  { at: 256, sfx: "marker", vol: 0.45 },
  { at: 300, sfx: "marker", vol: 0.35 },
  { at: 360, sfx: "pop", vol: 0.6 },
  { at: 362, sfx: "ding", vol: 0.45 },
  { at: 392, sfx: "whoosh", vol: 0.6 },
  // Toronto
  { at: 408, sfx: "pop", vol: 0.5 },
  { at: 430, sfx: "boing", vol: 0.35 },
  // school
  { at: 474, sfx: "whoosh", vol: 0.5 },
  { at: 484, sfx: "bell", vol: 0.6 },
  { at: 502, sfx: "pop", vol: 0.5 },
  { at: 520, sfx: "pop", vol: 0.5 },
  { at: 538, sfx: "pop", vol: 0.5 },
  { at: 560, sfx: "pop", vol: 0.4 },
  // night
  { at: 634, sfx: "whoosh", vol: 0.45 },
  { at: 648, sfx: "pop", vol: 0.35 },
  { at: 726, sfx: "pop", vol: 0.4 },
  // phone
  { at: 804, sfx: "buzz", vol: 0.8 },
  { at: 836, sfx: "whoosh", vol: 0.5 },
  { at: 846, sfx: "success", vol: 0.7 },
  { at: 850, sfx: "ding", vol: 0.45 },
  // online class
  { at: 954, sfx: "whoosh", vol: 0.5 },
  { at: 988, sfx: "pop", vol: 0.45 },
  { at: 1000, sfx: "ding", vol: 0.5 },
  { at: 1010, sfx: "pop", vol: 0.45 },
  { at: 1030, sfx: "ding", vol: 0.5 },
  { at: 1036, sfx: "pop", vol: 0.45 },
  { at: 1060, sfx: "ding", vol: 0.5 },
  { at: 1080, sfx: "success", vol: 0.5 },
  // confident + logo
  { at: 1114, sfx: "whoosh", vol: 0.5 },
  { at: 1150, sfx: "success", vol: 0.6 },
  { at: 1186, sfx: "whoosh", vol: 0.6 },
  { at: 1214, sfx: "impact", vol: 0.9 },
  { at: 1222, sfx: "whoosh", vol: 0.5 },
  { at: 1228, sfx: "marker", vol: 0.5 },
  { at: 1252, sfx: "pop", vol: 0.5 },
  { at: 1260, sfx: "pop", vol: 0.5 },
  { at: 1268, sfx: "pop", vol: 0.5 },
  { at: 1200 + TAP_AT - 1, sfx: "click", vol: 1 },
  { at: 1200 + TAP_AT, sfx: "success", vol: 0.7 },
];

const Scene: React.FC<{ span: readonly [number, number]; name: string; children: React.ReactNode; tail?: number }> = ({ span, name, children, tail = 12 }) => (
  <Sequence from={span[0]} durationInFrames={span[1] - span[0] + tail} name={name}>
    {children}
  </Sequence>
);

/** Zipper transition: the takeoff scene is revealed through the opening zip. */
const ZippedTakeoff: React.FC = () => {
  const f = Math.floor(useCurrentFrame() / 2) * 2;
  const z = zipperOpen(f, 22);
  return (
    <AbsoluteFill style={{ clipPath: z.done ? undefined : z.clip }}>
      <SceneTakeoff />
    </AbsoluteFill>
  );
};

export const FeltFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const f = Math.floor(frame / 2) * 2;
  return (
    <AbsoluteFill style={{ background: FELT.board, overflow: "hidden" }}>
      <FeltDefs />
      <Scene span={S.tehran} name="1 · Tehran, packing" tail={24}>
        <SceneTehran />
      </Scene>
      <Sequence from={S.takeoff[0] - 10} durationInFrames={S.takeoff[1] - S.takeoff[0] + 22} name="2 · Takeoff (zipper)">
        <ZippedTakeoff />
      </Sequence>
      <Sequence from={S.takeoff[0] - 10} durationInFrames={24} name="Zipper pull">
        <AbsoluteFill>
          <ZipperPullFrame />
        </AbsoluteFill>
      </Sequence>
      <Scene span={S.globe} name="3 · Knitted globe">
        <SceneGlobe />
      </Scene>
      <Scene span={S.toronto} name="4 · Toronto">
        <SceneToronto />
      </Scene>
      <Scene span={S.school} name="5 · French immersion">
        <SceneSchool />
      </Scene>
      <Scene span={S.night} name="6 · The worried night">
        <SceneNight />
      </Scene>
      <Scene span={S.phone} name="7 · The phone">
        <ScenePhone />
      </Scene>
      <Scene span={S.online} name="8 · Online French class">
        <SceneOnline />
      </Scene>
      <Scene span={S.confident} name="9 · Confident at school" tail={0}>
        <SceneConfident />
      </Scene>
      <Scene span={S.logo} name="10 · Logo + CTA" tail={0}>
        <SceneLogo />
      </Scene>

      {/* felt-curtain transitions (cut happens under full cover) */}
      <ClothWipe f={f - (S.takeoff[1] - 10)} color="#fbf8f3" dir={1} dur={20} />
      <ClothWipe f={f - (S.globe[1] - 9)} color={FELT.cream} dir={-1} />
      <ClothWipe f={f - (S.toronto[1] - 9)} color={FELT.mustard} dir={1} />
      <ClothWipe f={f - (S.school[1] - 9)} color="#2a3352" dir={-1} />
      <ClothWipe f={f - (S.phone[1] - 9)} color={FELT.orange} dir={1} />
      <ClothWipe f={f - (S.online[1] - 9)} color={FELT.teal} dir={-1} />

      <Audio src={staticFile("v5/felt-music.mp3")} volume={(fr) => (fr < FELT_FRAMES - 30 ? 0.75 : 0.75 * Math.max(0, (FELT_FRAMES - fr) / 30))} />
      {CUES.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} name={`sfx ${c.sfx}`}>
          <Audio src={staticFile(`v5/sfx-${c.sfx}.mp3`)} volume={() => c.vol * 0.8} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const ZipperPullFrame: React.FC = () => {
  const f = Math.floor(useCurrentFrame() / 2) * 2;
  return <ZipperPull f={f} dur={22} />;
};
