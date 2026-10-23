import React from "react";
import { Cutout } from "./Photo";

/**
 * Sara (the girl from the client photos) studying: her cut-out with an open
 * spiral notebook under her hands, so the pencil she holds rests on paper
 * instead of floating. The notebook sits behind the cut-out so her hands lie on it.
 */
export const SaraStudying: React.FC<{ height: number; frame: number; seed?: number }> = ({ height, frame, seed = 5 }) => {
  const w = (height * 268) / 360; // kid-girl.webp is 268×360
  return (
    <div style={{ position: "relative", width: w, height }}>
      <svg
        viewBox="0 0 320 150"
        style={{ position: "absolute", left: -0.36 * w, top: 0.6 * height, width: 0.9 * w, height: 0.42 * w, overflow: "visible", transform: "rotate(-7deg)", filter: "drop-shadow(0 10px 14px rgba(90,50,20,0.28))" }}
      >
        {/* open notebook in slight perspective */}
        <path d="M14 22 L156 10 L156 140 L4 146 Z" fill="#fffdf8" stroke="#e3d8cc" strokeWidth={2} />
        <path d="M164 10 L306 22 L316 146 L164 140 Z" fill="#fffdf8" stroke="#e3d8cc" strokeWidth={2} />
        {new Array(6).fill(0).map((_, k) => (
          <g key={k}>
            <path d={`M${18 - k * 2} ${42 + k * 18} L150 ${32 + k * 18}`} stroke="#bcd2ea" strokeWidth={2} />
            <path d={`M170 ${32 + k * 18} L${302 + k * 2} ${42 + k * 18}`} stroke="#bcd2ea" strokeWidth={2} />
          </g>
        ))}
        <path d="M40 30 L40 142" stroke="#f2b3b3" strokeWidth={2} />
        {/* a few handwritten strokes (her geometry work) */}
        <path d="M190 70 L230 40 L262 76 Z M196 112 a18 18 0 1 0 0.1 0" fill="none" stroke="#6b6f86" strokeWidth={2.5} />
        <path d="M60 60 q20 -10 40 0 t40 0 M60 96 q16 -8 34 0" fill="none" stroke="#6b6f86" strokeWidth={2.5} />
        {/* spiral binding */}
        {new Array(9).fill(0).map((_, k) => (
          <ellipse key={k} cx={160} cy={18 + k * 15} rx={7} ry={4} fill="none" stroke="#8d8a88" strokeWidth={3} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Cutout name="kid-girl" height={height} frame={frame} seed={seed} />
      </div>
    </div>
  );
};
