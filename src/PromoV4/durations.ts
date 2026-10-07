import { STATS_SCENE_FRAMES } from "../PromoV3/durations";

export const DURATIONS_V4 = {
  problem: 110,
  solution: 120,
  canada: 85,
  personalized: 85,
  pricing: 85,
  subjects: 95,
  cta: 120,
  transition: 8,
} as const;

export const STATS_SCENE_FRAMES_V4 = STATS_SCENE_FRAMES;

// 8 segments, but problem->solution is a hard cut (no Transition), so only 6 of the
// 7 adjacent pairs actually overlap.
const TRANSITION_COUNT = 6;

const totalFrames =
  DURATIONS_V4.problem +
  DURATIONS_V4.solution +
  STATS_SCENE_FRAMES_V4 +
  DURATIONS_V4.canada +
  DURATIONS_V4.personalized +
  DURATIONS_V4.pricing +
  DURATIONS_V4.subjects +
  DURATIONS_V4.cta -
  DURATIONS_V4.transition * TRANSITION_COUNT;

export const TOTAL_DURATION_V4 = totalFrames;
