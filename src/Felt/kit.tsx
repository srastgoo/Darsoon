import React from "react";

/**
 * Felt / knitted craft kit. Everything is flat SVG run through filters that add
 * the look of needle-felted wool: fuzzy fibrous edges, puffy stuffed shading,
 * fine fibre texture, and a soft contact shadow. Stitches are dashed "thread".
 */

export const FELT = {
  board: "#efe2d3", // felt backdrop
  boardDark: "#e2cfbb",
  skin: "#f4c9a8",
  skinShade: "#e9b48f",
  cheek: "#f29a93",
  hairBlack: "#1f1b1a",
  hairBrown: "#4a2f22",
  thread: "#fff7ef",
  orange: "#ed5f00",
  logo: "#f2744c",
  plum: "#8c3b5a",
  teal: "#2f8f86",
  blue: "#3c6fb6",
  navy: "#2c3e63",
  mustard: "#e3a83b",
  green: "#5d9a4a",
  red: "#c9443c",
  cream: "#fbf3e8",
  grey: "#8d8a88",
  sky: "#bfe0f2",
  wood: "#a5714b",
} as const;

/** Global filter + pattern definitions. Render once per composition. */
export const FeltDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      {/* the felt look: fuzzy edge, puffy shading, fibre grain */}
      <filter id="felt" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="3" result="edgeNoise" />
        <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="5" xChannelSelector="R" yChannelSelector="G" result="fuzz" />
        <feGaussianBlur in="fuzz" stdDeviation="1.4" result="halo" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="puff" />
        <feDiffuseLighting in="puff" surfaceScale="7" diffuseConstant="1.25" lightingColor="#ffffff" result="light">
          <feDistantLight azimuth="235" elevation="52" />
        </feDiffuseLighting>
        <feTurbulence type="fractalNoise" baseFrequency="1.7" numOctaves="2" seed="11" result="fibre" />
        <feColorMatrix in="fibre" type="matrix" values="0.33 0.33 0.33 0 0.55  0.33 0.33 0.33 0 0.55  0.33 0.33 0.33 0 0.55  0 0 0 0 1" result="grain" />
        <feComposite in="fuzz" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="shaded" />
        <feComposite in="shaded" in2="grain" operator="arithmetic" k1="1.12" k2="0" k3="0" k4="0" result="grained" />
        <feComposite in="grained" in2="fuzz" operator="in" result="body" />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="body" />
        </feMerge>
      </filter>
      {/* extra-hairy variant for hair and beards */}
      <filter id="feltHair" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="3" seed="5" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" result="fuzz" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="puff" />
        <feDiffuseLighting in="puff" surfaceScale="6" diffuseConstant="1.5" lightingColor="#ffffff" result="light">
          <feDistantLight azimuth="235" elevation="55" />
        </feDiffuseLighting>
        <feComposite in="fuzz" in2="light" operator="arithmetic" k1="1.1" k2="0.08" k3="0" k4="0" result="shaded" />
        <feComposite in="shaded" in2="fuzz" operator="in" result="body" />
        <feGaussianBlur in="fuzz" stdDeviation="2" result="halo" />
        <feMerge>
          <feMergeNode in="halo" />
          <feMergeNode in="body" />
        </feMerge>
      </filter>
      {/* soft shadow so pieces sit on the felt board */}
      <filter id="feltShadow" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#5a3a22" floodOpacity="0.28" />
      </filter>
      {/* knitted stitch pattern (rows of little Vs) */}
      <pattern id="knit" width="16" height="14" patternUnits="userSpaceOnUse">
        <path d="M1 1 Q4 12 8 13 M15 1 Q12 12 8 13" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M1 2 Q4 12 8 13 M15 2 Q12 12 8 13" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" strokeLinecap="round" transform="translate(0.8 1)" />
      </pattern>
      <pattern id="stripes" width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill="#f6f4f0" />
        <rect x="8" width="3" height="22" fill="#6d84a8" />
        <rect x="13" width="1.5" height="22" fill="#9fb0c8" />
      </pattern>
      <pattern id="burlap" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4 H8 M4 0 V8" stroke="rgba(120,85,55,0.10)" strokeWidth="1.5" />
      </pattern>
    </defs>
  </svg>
);

/** A felt piece: any SVG children rendered with the felt filter. */
export const Felt: React.FC<{ children: React.ReactNode; hair?: boolean; shadow?: boolean; transform?: string; opacity?: number }> = ({
  children,
  hair,
  shadow = false,
  transform,
  opacity,
}) => (
  <g transform={transform} opacity={opacity} filter={shadow ? "url(#feltShadow)" : undefined}>
    <g filter={hair ? "url(#feltHair)" : "url(#felt)"}>{children}</g>
  </g>
);

/** Dashed "thread" stitch along a path. */
export const Stitch: React.FC<{ d: string; color?: string; width?: number; dash?: string; opacity?: number }> = ({
  d,
  color = FELT.thread,
  width = 3,
  dash = "9 7",
  opacity = 0.9,
}) => <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} opacity={opacity} />;

/** Thread being sewn on progressively (reveals along the path). */
export const SewnThread: React.FC<{ d: string; p: number; color?: string; width?: number }> = ({ d, p, color = FELT.thread, width = 4 }) => (
  <>
    <mask id={`sew-${d.length}-${Math.round(width * 10)}`}>
      <path d={d} fill="none" stroke="#fff" strokeWidth={width * 3} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
    </mask>
    <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray="12 9" mask={`url(#sew-${d.length}-${Math.round(width * 10)})`} />
  </>
);

/** Black shiny button eye; sparkle = starry highlights (delighted). */
export const ButtonEye: React.FC<{ x: number; y: number; r: number; sparkle?: number; blink?: boolean; look?: number }> = ({ x, y, r, sparkle = 0, blink, look = 0 }) =>
  blink ? (
    <path d={`M${x - r} ${y} Q${x} ${y + r * 0.6} ${x + r} ${y}`} stroke="#151212" strokeWidth={r * 0.45} fill="none" strokeLinecap="round" />
  ) : (
    <g transform={`translate(${x + look * r * 0.25} ${y})`}>
      <circle r={r * (1 + sparkle * 0.25)} fill="#151212" />
      <circle cx={-r * 0.32} cy={-r * 0.34} r={r * 0.28} fill="#fff" opacity={0.9} />
      {sparkle > 0 ? (
        <g opacity={sparkle}>
          <path d={`M${r * 0.2} ${-r * 0.1} l${r * 0.12} ${r * 0.3} l${r * 0.3} ${r * 0.12} l${-r * 0.3} ${r * 0.12} l${-r * 0.12} ${r * 0.3} l${-r * 0.12} ${-r * 0.3} l${-r * 0.3} ${-r * 0.12} l${r * 0.3} ${-r * 0.12} Z`} fill="#fff" />
          <circle cx={-r * 0.3} cy={r * 0.4} r={r * 0.12} fill="#fff" />
        </g>
      ) : null}
    </g>
  );
