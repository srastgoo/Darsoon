import React from "react";
import { COLORS } from "../timeline";
import { FA } from "../fonts";
import { bounce, clamp01, easeIn, pop, prog } from "./anim";
import { Marker } from "./visual";

type Mode = "pop" | "drop" | "rise";

type Props = {
  text: string;
  frame: number;
  start?: number;
  size?: number;
  weight?: number;
  color?: string;
  stagger?: number;
  mode?: Mode;
  accent?: string[];
  underline?: string[];
  circle?: string[];
  highlight?: string[];
  exitAt?: number;
  lineHeight?: number;
  align?: "center" | "right";
  gap?: number;
};

/**
 * Word-by-word kinetic Persian typography. Words (never letters, so Persian
 * joining is preserved) spring in with overshoot, rotation and a speed-driven
 * smear, then can be annotated with marker underlines/circles/highlights.
 */
export const KineticText: React.FC<Props> = ({
  text,
  frame,
  start = 0,
  size = 92,
  weight = 900,
  color = COLORS.title,
  stagger = 3,
  mode = "pop",
  accent = [],
  underline = [],
  circle = [],
  highlight = [],
  exitAt,
  lineHeight = 1.32,
  align = "center",
  gap,
}) => {
  const lines = text.split("\n").map((l) => l.split(" ").filter(Boolean));
  let idx = 0;
  const exitP = exitAt === undefined ? 0 : prog(frame, exitAt, 9, easeIn);

  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        fontFamily: FA,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        color,
        letterSpacing: 0,
      }}
    >
      {lines.map((words, li) => (
        <div key={li} style={{ display: "flex", flexDirection: "row", gap: gap ?? size * 0.26, justifyContent: "center" }}>
          {words.map((w, wi) => {
            const i = idx++;
            const d = start + i * stagger;
            const clean = w.replace(/[،؛؟!.]/g, "");
            const isAccent = accent.includes(clean);

            let ty = 0;
            let sc = 1;
            let rot = 0;
            let op = 1;
            let blur = 0;
            let sx = 1;
            let sy = 1;

            if (mode === "drop") {
              const b = bounce(frame - d, 260, 6200, 0.38);
              ty = -b.y;
              op = frame >= d ? 1 : 0;
              const speed = Math.abs(b.v) / 30;
              blur = b.landed ? 0 : Math.min(speed * 0.05, 6);
              sy = (1 + (b.landed ? 0 : Math.min(speed * 0.004, 0.25))) * (1 - b.squash * 0.28);
              sx = 1 + b.squash * 0.22;
            } else {
              const s = pop(frame, d, 240, 13, 0.7);
              const sPrev = pop(frame - 1, d, 240, 13, 0.7);
              const v = Math.abs(s - sPrev);
              const from = mode === "rise" ? 1 : 0.4;
              ty = (1 - s) * size * (mode === "rise" ? 1.1 : 0.7);
              sc = mode === "rise" ? 1 : from + (1 - from) * s;
              rot = (1 - s) * (i % 2 === 0 ? -9 : 7);
              op = clamp01(s * 3);
              blur = Math.min(v * 28, 7);
              sy = 1 + Math.min(v * 2.2, 0.35);
              sx = 1 - Math.min(v * 0.8, 0.12);
            }

            if (exitAt !== undefined) {
              const e = clamp01(exitP * 1.4 - (i % 5) * 0.08);
              ty -= e * size * 2.4;
              op *= 1 - e;
              blur += e * 10;
              sy *= 1 + e * 0.5;
            }

            const annStart = start + (lines.flat().length - 1) * stagger + 8;
            const annP = prog(frame, annStart, 12);

            return (
              <span
                key={wi}
                style={{
                  position: "relative",
                  display: "inline-block",
                  transform: `translateY(${ty}px) rotate(${rot}deg) scale(${sc}) scale(${sx}, ${sy})`,
                  transformOrigin: "50% 80%",
                  opacity: op,
                  filter: blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : undefined,
                  color: isAccent ? COLORS.orange : color,
                  whiteSpace: "nowrap",
                }}
              >
                {highlight.includes(clean) ? (
                  <span
                    style={{
                      position: "absolute",
                      right: -size * 0.12,
                      top: "38%",
                      height: "46%",
                      width: `calc(${annP * 100}% + ${size * 0.24 * annP}px)`,
                      background: COLORS.ctaBg,
                      borderRadius: 10,
                      transform: "rotate(-1.5deg)",
                      zIndex: -1,
                    }}
                  />
                ) : null}
                {w}
                {underline.includes(clean) ? (
                  <svg
                    viewBox="0 0 200 30"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", left: "-4%", bottom: -size * 0.12, width: "108%", height: size * 0.32, overflow: "visible" }}
                  >
                    <Marker d="M196 14 C150 22 90 6 4 18" p={annP} width={7} />
                  </svg>
                ) : null}
                {circle.includes(clean) ? (
                  <svg
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", left: "-14%", top: "-6%", width: "128%", height: "112%", overflow: "visible" }}
                  >
                    <Marker d="M150 8 C60 -4 0 30 12 62 C26 98 170 104 192 60 C206 30 160 4 100 10" p={annP} width={5} />
                  </svg>
                ) : null}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
