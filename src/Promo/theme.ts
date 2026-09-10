export const COLORS = {
  orange: "#ED5F00",
  background: "#FCF9F7",
  textMain: "#454242",
  textSecondary: "#7B7877",
  buttonBg: "#FCE3D0",
  buttonText: "#CC7033",
  star: "#F76808",
  cream: "#FFF8F1",
} as const;

export const FPS = 30;

export const DURATIONS = {
  hook: 6 * FPS,
  stats: 10 * FPS,
  benefit: 4 * FPS,
  cta: 5 * FPS,
  transition: 18,
} as const;

export const BENEFIT_COUNT = 4;

export const TOTAL_DURATION_IN_FRAMES =
  DURATIONS.hook +
  DURATIONS.stats +
  DURATIONS.benefit * BENEFIT_COUNT +
  DURATIONS.cta -
  DURATIONS.transition * (2 + BENEFIT_COUNT);
