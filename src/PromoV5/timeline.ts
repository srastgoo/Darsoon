// 30 fps, 120 BPM music: 1 beat = 15 frames, 1 bar = 60 frames.
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const SCENES = {
  problem: { from: 0, dur: 120 },
  solution: { from: 120, dur: 150 },
  stats: { from: 270, dur: 180 },
  benefits: { from: 450, dur: 180 },
  subjects: { from: 630, dur: 150 },
  cta: { from: 780, dur: 120 },
} as const;

export const TOTAL_FRAMES = 900; // the motion-graphics film on its own

// Full ad = client's 7s talking-head hook, a paper-toss hand-off, then the motion film.
export const HOOK_FREEZE = 210; // hook clip plays to 7.0s, then freezes (she smiles at the lens)
export const TOSS_LEN = 22; // freeze → polaroid → crumple, before the motion film starts
export const MOTION_FROM = HOOK_FREEZE + TOSS_LEN;
export const FILM_FRAMES = MOTION_FROM + TOTAL_FRAMES;

// Each stat is its own 30-frame moment after a 30-frame dashboard build.
export const STAT_INTRO = 30;
export const STAT_LEN = 30;
export const BENEFIT_LEN = 60;
export const SUBJECT_INTRO = 0;
export const SUBJECT_LEN = 30;

export const COLORS = {
  canvas: "#fcf9f7",
  orange: "#ed5f00",
  logo: "#f2744c", // exact colour of the supplied Darsoon logo files
  title: "#454242",
  secondary: "#7b7877",
  ctaBg: "#fce3d0",
  ctaText: "#cc7033",
  star: "#f76808",
  paperLine: "#ece4dd",
  ink: "#2f2c2c",
  white: "#ffffff",
  // supporting accents for subject identities (kept warm/muted to sit with the brand)
  blue: "#3b7dd8",
  teal: "#16a394",
  green: "#3fa34d",
  purple: "#8a5cd1",
  red: "#e5484d",
  yellow: "#f5b419",
} as const;
