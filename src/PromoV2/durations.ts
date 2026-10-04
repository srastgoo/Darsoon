import { FPS } from "../Promo/theme";

export const HOOK_VIDEO_FRAMES = 216;

export const DURATIONS_V2 = {
  hook: HOOK_VIDEO_FRAMES,
  intro: 5 * FPS,
  stats: 10 * FPS,
  advantage: 4 * FPS,
  cta: 5.5 * FPS,
  transition: 18,
} as const;

export const ADVANTAGE_COUNT = 3;

const continuationFrames =
  DURATIONS_V2.intro +
  DURATIONS_V2.stats +
  DURATIONS_V2.advantage * ADVANTAGE_COUNT +
  DURATIONS_V2.cta -
  DURATIONS_V2.transition * (1 + ADVANTAGE_COUNT + 1);

export const TOTAL_DURATION_V2 = DURATIONS_V2.hook + continuationFrames;
