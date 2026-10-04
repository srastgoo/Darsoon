export const HOOK_VIDEO_FRAMES = 216;

export const DURATIONS_V3 = {
  hook: HOOK_VIDEO_FRAMES,
  intro: 90,
  canada: 85,
  personalized: 85,
  subjects: 100,
  affordable: 80,
  cta: 115,
  transition: 10,
} as const;

export const STATS_HEADER_FRAMES = 16;
export const STATS_SLOT_FRAMES = 40;
export const STATS_COUNT = 5;
export const STATS_RECAP_FRAMES = 44;
export const STATS_SCENE_FRAMES =
  STATS_HEADER_FRAMES + STATS_SLOT_FRAMES * STATS_COUNT + STATS_RECAP_FRAMES;

const SCENE_COUNT_AFTER_HOOK = 7;

const continuationFrames =
  DURATIONS_V3.intro +
  STATS_SCENE_FRAMES +
  DURATIONS_V3.canada +
  DURATIONS_V3.personalized +
  DURATIONS_V3.subjects +
  DURATIONS_V3.affordable +
  DURATIONS_V3.cta -
  DURATIONS_V3.transition * (SCENE_COUNT_AFTER_HOOK - 1);

export const CONTINUATION_FRAMES = continuationFrames;
export const TOTAL_DURATION_V3 = DURATIONS_V3.hook + continuationFrames;
