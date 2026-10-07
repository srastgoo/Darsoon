import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { DURATIONS_V4, STATS_SCENE_FRAMES_V4 } from "./durations";

const problem = 0;
const solution = DURATIONS_V4.problem;
const stats = solution + DURATIONS_V4.solution - DURATIONS_V4.transition;
const canada = stats + STATS_SCENE_FRAMES_V4 - DURATIONS_V4.transition;
const personalized = canada + DURATIONS_V4.canada - DURATIONS_V4.transition;
const pricing = personalized + DURATIONS_V4.personalized - DURATIONS_V4.transition;
const subjects = pricing + DURATIONS_V4.pricing - DURATIONS_V4.transition;
const cta = subjects + DURATIONS_V4.subjects - DURATIONS_V4.transition;

type Cue = { at: number; file: string; volume?: number };

const CUES: Cue[] = [
  { at: problem + 6, file: "sfx-scratch.mp3", volume: 0.8 },
  { at: problem + 18, file: "sfx-pop.mp3", volume: 0.6 },

  { at: solution + 0, file: "sfx-whoosh.mp3" },
  { at: solution + 54, file: "sfx-pop.mp3", volume: 0.7 },

  { at: stats + 16, file: "sfx-click.mp3" },
  { at: stats + 56, file: "sfx-click.mp3" },
  { at: stats + 96, file: "sfx-click.mp3" },
  { at: stats + 136, file: "sfx-click.mp3" },
  { at: stats + 176, file: "sfx-click.mp3" },
  { at: stats + 216, file: "sfx-pop.mp3", volume: 0.65 },

  { at: canada + 0, file: "sfx-whoosh.mp3" },
  { at: canada + 14, file: "sfx-pop.mp3", volume: 0.6 },

  { at: personalized + 0, file: "sfx-whoosh.mp3" },
  { at: personalized + 16, file: "sfx-click.mp3" },
  { at: personalized + 19, file: "sfx-click.mp3" },
  { at: personalized + 22, file: "sfx-click.mp3" },

  { at: pricing + 0, file: "sfx-whoosh.mp3" },
  { at: pricing + 11, file: "sfx-pop.mp3", volume: 0.6 },
  { at: pricing + 18, file: "sfx-click.mp3" },

  { at: subjects + 0, file: "sfx-whoosh.mp3" },
  { at: subjects + 22, file: "sfx-click.mp3" },
  { at: subjects + 29, file: "sfx-click.mp3" },
  { at: subjects + 36, file: "sfx-click.mp3" },
  { at: subjects + 43, file: "sfx-click.mp3" },
  { at: subjects + 50, file: "sfx-click.mp3" },

  { at: cta + 0, file: "sfx-whoosh.mp3" },
  { at: cta + 0, file: "sfx-impact.mp3" },
  { at: cta + 34, file: "sfx-click.mp3" },
];

export const SfxLayer: React.FC = () => (
  <>
    {CUES.map((cue, i) => (
      <Sequence key={i} from={Math.round(cue.at)}>
        <Audio src={staticFile(cue.file)} volume={() => cue.volume ?? 1} />
      </Sequence>
    ))}
  </>
);
