import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS } from "../timeline";
import { FA } from "../fonts";
import { clamp01, easeInOut, easeOut, lerp, pop, prog, wobble } from "../lib/anim";
import { Burst, Card, Doodles, Marker, Paper, Shockwave } from "../lib/visual";
import { KineticText } from "../lib/KineticText";
import { Cutout, PhotoFill, type PersonPhoto } from "../art/Photo";
import { CheckBadge } from "../art/Icons";
import { Classroom } from "../art/Classroom";

const TUTORS = [
  { name: "سارا احمدی", sub: "زیست‌شناسی", photo: "tutor-bio" as PersonPhoto, pos: "50% 30%" },
  { name: "مریم رضایی", sub: "ریاضی", photo: "tutor-math" as PersonPhoto, pos: "50% 30%" },
  { name: "علی یوسفی", sub: "ریاضی · پایه ۹", photo: "tutor-chem" as PersonPhoto, pos: "45% 30%" },
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

  // 1) logo-coloured iris collapses into the round ن icon
  const collapse = prog(frame, 0, 14, easeInOut);
  const squash = frame >= 14 ? wobble(frame - 14, 0.18, 3.2, 6) : 0;
  const glyph = prog(frame, 10, 6);

  // 2) the ن icon flies onto the ن of the full logo while the wordmark wipes in
  const toNun = prog(frame, 22, 12, easeInOut);
  const reveal = prog(frame, 28, 12, easeOut);
  const iconFade = prog(frame, 36, 6);
  const LOGO_W = 760;
  const k = LOGO_W / 1537; // logo-full.png is 1537x625
  const logoLeft = 540 - LOGO_W / 2;
  const logoTop = 820 - (625 * k) / 2;
  const iconD = lerp(lerp(2600, 380, collapse), 530 * k, toNun);
  const iconX = lerp(540, logoLeft + 143 * k, toNun);
  const iconY = lerp(820, logoTop + 172 * k, toNun);

  // 3) full logo moves up to become the header
  const up = prog(frame, 42, 14, easeInOut);
  const lockY = lerp(820, 250, up);
  const lockScale = lerp(1, 0.62, up);

  // 4) match slot machine
  const matchIn = pop(frame, 50, 170, 15);
  const slot = interpolate(frame, [56, 82], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  const slotPrev = interpolate(frame - 1, [56, 82], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
  const slotSpeed = Math.abs(slot - slotPrev) * 560;
  const link = prog(frame, 82, 10);
  const badge = pop(frame, 90, 260, 10);

  // 5) the matched card blooms into the live classroom
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
          start={48}
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
          <ProfileCard frame={frame} name="رایان" sub="ریاضی · پایه ۹" tint="#e7f0fb">
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

      {/* full Darsoon logo (Persian + English) */}
      {frame < 140 ? (
        <div
          style={{
            position: "absolute",
            left: 540,
            top: lockY,
            width: LOGO_W,
            transform: `translate(-50%, -50%) scale(${lockScale * (1 - outro)})`,
            opacity: 1 - outro,
          }}
        >
          <Img src={staticFile("v5/brand/logo-full.png")} style={{ width: LOGO_W, display: "block", WebkitMaskImage: `linear-gradient(to right, #000 ${reveal * 110 - 10}%, transparent ${reveal * 110}%)`, maskImage: `linear-gradient(to right, #000 ${reveal * 110 - 10}%, transparent ${reveal * 110}%)` }} />
        </div>
      ) : null}

      {/* ن icon: born from the iris, then lands on the logo's ن */}
      {iconFade < 1 ? (
        <div
          style={{
            position: "absolute",
            left: iconX - iconD / 2,
            top: iconY - iconD / 2,
            width: iconD,
            height: iconD,
            transform: `scale(${1 + squash}, ${1 - squash})`,
            opacity: 1 - iconFade,
          }}
        >
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: COLORS.logo, opacity: 1 - glyph }} />
          <Img src={staticFile("v5/brand/logo-icon.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
      ) : null}
      <Shockwave frame={frame - 15} x={540} y={820} color={COLORS.logo} max={520} life={22} />
      <Burst frame={frame - 15} x={540} y={820} seed={4} count={26} power={34} />
    </AbsoluteFill>
  );
};
