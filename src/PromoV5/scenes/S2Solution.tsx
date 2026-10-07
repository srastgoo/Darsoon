import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { FA } from "../fonts";
import { bounce, clamp01, easeInOut, easeOut, lerp, pop, prog, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Cutout, PhotoFill, type PersonPhoto } from "../art/Photo";
import { CheckBadge, DarsoonMark } from "../art/Icons";
import { Classroom } from "../art/Classroom";

const TUTORS = [
  { name: "خانم احمدی", sub: "زیست‌شناسی", photo: "tutor-bio" as PersonPhoto, pos: "50% 30%" },
  { name: "خانم رضایی", sub: "ریاضی", photo: "tutor-math" as PersonPhoto, pos: "50% 30%" },
  { name: "آقای کریمی", sub: "ریاضی · پایه ۹", photo: "tutor-chem" as PersonPhoto, pos: "45% 30%" },
];

const ProfileCard: React.FC<{ frame: number; name: string; sub: string; children: React.ReactNode; tint: string }> = ({ name, sub, children, tint }) => (
  <Card radius={36} pad={0} style={{ width: 410, height: 560, overflow: "hidden", position: "relative" }}>
    <div style={{ height: 370, background: tint, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
    <div style={{ padding: "22px 26px", direction: "rtl", fontFamily: FA }}>
      <div style={{ fontWeight: 900, fontSize: 46, color: COLORS.title }}>{name}</div>
      <div style={{ fontWeight: 600, fontSize: 34, color: COLORS.secondary, marginTop: 4 }}>{sub}</div>
    </div>
  </Card>
);

export const S2Solution: React.FC = () => {
  const frame = useCurrentFrame();

  // 1) orange iris collapses into the logo square, with squash/stretch landing
  const collapse = prog(frame, 0, 16, easeInOut);
  const settle = pop(frame, 14, 260, 9, 0.6);
  const logoSize = lerp(2400, 230, collapse);
  const squash = frame >= 14 ? wobble(frame - 14, 0.22, 3.2, 6) : 0;
  const glyph = prog(frame, 12, 8);

  // 2) lockup moves up to the header
  const up = prog(frame, 40, 16, easeInOut);
  const lockY = lerp(820, 250, up);
  const lockScale = lerp(1, 0.55, up);

  // wordmark drops in with physics
  const wm = bounce(frame - 18, 320, 7000, 0.35);

  // 3) match slot machine
  const matchIn = pop(frame, 50, 170, 15);
  const slot = interpolate(frame, [56, 82], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  const slotPrev = interpolate(frame - 1, [56, 82], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  const slotSpeed = Math.abs(slot - slotPrev) * 560;
  const link = prog(frame, 82, 10);
  const badge = pop(frame, 90, 260, 10);

  // 4) the matched card blooms into the live classroom
  const bloom = prog(frame, 102, 16, easeInOut);
  const classP = pop(frame, 104, 150, 16);
  const outro = prog(frame, 138, 12, easeInOut);

  return (
    <AbsoluteFill>
      <Paper />
      <Doodles frame={frame + 120} seed={2} opacity={0.35} />

      {/* headline */}
      <div style={{ position: "absolute", top: 380, left: 0, right: 0, opacity: 1 - outro }}>
        <KineticText
          text={"درسون؛ راه ساده‌تر برای\nپیدا کردن معلم خصوصی"}
          frame={frame}
          start={44}
          size={82}
          stagger={3}
          accent={["ساده‌تر", "درسون؛"]}
          underline={["ساده‌تر"]}
        />
      </div>

      {/* match panel */}
      {frame >= 50 && bloom < 1 ? (
        <div
          style={{
            position: "absolute",
            top: 760,
            left: 0,
            right: 0,
            height: 700,
            display: "flex",
            justifyContent: "center",
            gap: 90,
            transform: `scale(${matchIn * (1 - bloom * 0.2)})`,
            opacity: 1 - bloom,
          }}
        >
          {/* tutor slot (left) */}
          <div style={{ width: 410, height: 560, overflow: "hidden", borderRadius: 36, position: "relative" }}>
            <div style={{ transform: `translateY(${-slot * 560}px)`, filter: slotSpeed > 3 ? `blur(${Math.min(slotSpeed * 0.15, 8)}px)` : undefined }}>
              {TUTORS.map((t, i) => (
                <ProfileCard key={i} frame={frame} name={t.name} sub={t.sub} tint={i === 2 ? COLORS.ctaBg : "#eef3f6"}>
                  <PhotoFill name={t.photo} position={t.pos} />
                </ProfileCard>
              ))}
            </div>
          </div>
          {/* student (right) */}
          <ProfileCard frame={frame} name="آرمان" sub="ریاضی · پایه ۹" tint="#e7f0fb">
            <div style={{ position: "absolute", left: -20, bottom: -6 }}>
              <Cutout name="kid-laptop" height={330} frame={frame} seed={2} outline={false} />
            </div>
          </ProfileCard>

          <svg width={1080} height={600} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none" }}>
            <Marker d="M592 280 C 570 262 556 300 540 280 C 524 260 510 298 488 280" p={link} width={10} />
          </svg>
          <div style={{ position: "absolute", left: 540 - 56, top: 224, transform: `scale(${badge})` }}>
            <CheckBadge size={112} p={prog(frame, 92, 8)} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 540 - 160,
              top: 610,
              width: 320,
              textAlign: "center",
              transform: `scale(${badge}) rotate(${wobble(frame - 90, 6)}deg)`,
              background: COLORS.orange,
              color: "#fff",
              borderRadius: 40,
              padding: "10px 0",
              fontFamily: FA,
              fontWeight: 900,
              fontSize: 46,
              direction: "rtl",
              boxShadow: "0 16px 30px -10px rgba(237,95,0,0.6)",
            }}
          >
            ۹۸٪ تطابق
          </div>
        </div>
      ) : null}
      <Burst frame={frame - 90} x={540} y={1040} seed={9} count={22} power={26} />

      {/* classroom */}
      {frame >= 102 ? (
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 760,
            transformOrigin: "50% 40%",
            transform: `translateY(${(1 - classP) * 200 + outro * 50}px) scale(${lerp(0.4, 1, bloom) * (1 - outro * 0.62)})`,
            opacity: clamp01(bloom * 2),
          }}
        >
          <Classroom frame={frame - 108} />
        </div>
      ) : null}

      {/* logo iris → lockup */}
      {frame < 140 ? (
        <div
          style={{
            position: "absolute",
            left: 540,
            top: lockY,
            transform: `translate(-50%, -50%) scale(${lockScale * (1 - outro)})`,
            display: "flex",
            alignItems: "center",
            gap: 30,
            direction: "rtl",
            opacity: 1 - outro,
          }}
        >
          <div
            style={{
              width: logoSize,
              height: logoSize * (frame < 16 ? 1.8 - collapse * 0.8 : 1),
              borderRadius: lerp(0, 70, collapse),
              background: COLORS.orange,
              transform: `scale(${(1 + squash) * (0.85 + settle * 0.15)}, ${1 - squash})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ opacity: glyph, transform: `scale(${0.5 + glyph * 0.5})` }}>
              <DarsoonMark size={230} />
            </div>
          </div>
          <div
            style={{
              opacity: frame >= 18 ? 1 : 0,
              fontFamily: FA,
              fontWeight: 900,
              fontSize: 170,
              color: COLORS.title,
              transform: `translateY(${-wm.y}px) scale(${1 + wm.squash * 0.2}, ${1 - wm.squash * 0.25})`,
              transformOrigin: "50% 100%",
              lineHeight: 1,
            }}
          >
            درسون
          </div>
        </div>
      ) : null}
      <Shockwave frame={frame - 15} x={540 + 225} y={820} max={520} life={22} />
      <Burst frame={frame - 15} x={540 + 225} y={820} seed={4} count={26} power={34} />
    </AbsoluteFill>
  );
};
