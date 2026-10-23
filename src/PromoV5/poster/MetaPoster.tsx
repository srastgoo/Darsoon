import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../timeline";
import { EN, FA } from "../fonts";
import { Card, Doodles, Marker, Paper, RoughDefs } from "../lib/visual";
import { Cutout, PhotoFill } from "../art/Photo";
import { LogoFull } from "../art/Brand";
import { MapleLeaf, StarIcon } from "../art/Icons";

export type PosterFormat = "feed" | "story";

// Frame used for the shared animated components: everything settled, at rest.
const AT_REST = 400;

const Chip: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({ children, color = COLORS.orange, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#fff",
      borderRadius: 999,
      padding: "14px 26px",
      boxShadow: "0 18px 36px -14px rgba(110,70,40,0.35)",
      fontFamily: FA,
      fontWeight: 800,
      fontSize: 32,
      color: COLORS.title,
      direction: "rtl",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <div style={{ width: 16, height: 16, borderRadius: 8, background: color, flexShrink: 0 }} />
    {children}
  </div>
);

const Stat: React.FC<{ value: string; label: string; star?: boolean }> = ({ value, label, star }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, direction: "ltr", fontFamily: FA, fontWeight: 900, fontSize: 58, color: star ? COLORS.star : COLORS.title, lineHeight: 1.1 }}>
      {star ? <StarIcon size={46} /> : null}
      {value}
    </div>
    <div style={{ fontFamily: FA, fontWeight: 700, fontSize: 28, color: COLORS.secondary }}>{label}</div>
  </div>
);

/**
 * Static Meta Ads poster built from the film's kit: logo, real tutor on a live
 * call, a real student, the verified stats and the free-intro-session CTA.
 * Laid out as a flex column so the same design fills 4:5 feed and 9:16 stories.
 */
export const MetaPoster: React.FC<{ format: PosterFormat }> = ({ format }) => {
  const story = format === "story";
  const pad = story ? 70 : 56;
  return (
    <AbsoluteFill style={{ background: COLORS.canvas, overflow: "hidden" }}>
      <RoughDefs />
      <Paper />
      <Doodles frame={AT_REST} seed={31} opacity={0.35} />
      <AbsoluteFill style={{ padding: `${story ? 150 : 48}px ${pad}px ${story ? 170 : 44}px`, display: "flex", flexDirection: "column", gap: story ? 34 : 22 }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", direction: "rtl" }}>
          <LogoFull width={story ? 300 : 250} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 999, padding: "10px 22px", boxShadow: "0 12px 26px -12px rgba(110,70,40,0.35)" }}>
            <StarIcon size={34} />
            <span style={{ fontFamily: FA, fontWeight: 900, fontSize: 34, color: COLORS.title }}>۴.۹</span>
            <span style={{ fontFamily: FA, fontWeight: 700, fontSize: 24, color: COLORS.secondary }}>امتیاز والدین</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ direction: "rtl", textAlign: "center", fontFamily: FA, color: COLORS.title, position: "relative", zIndex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: story ? 78 : 74, lineHeight: 1.3 }}>
            معلم خصوصی{" "}
            <span style={{ position: "relative", color: COLORS.orange, display: "inline-block" }}>
              مناسب
              <svg viewBox="0 0 200 30" preserveAspectRatio="none" style={{ position: "absolute", left: "-4%", bottom: -6, width: "108%", height: 22, overflow: "visible" }}>
                <Marker d="M196 14 C150 22 90 6 4 18" p={1} width={7} />
              </svg>
            </span>
            <br />
            برای درس‌های مدرسه فرزندت
          </div>
          <div style={{ marginTop: story ? 18 : 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontWeight: 700, fontSize: story ? 40 : 34, color: COLORS.secondary }}>
            <MapleLeaf size={story ? 44 : 38} />
            آشنا با برنامه درسی مدارس کانادا · کلاس آنلاین
          </div>
        </div>

        {/* hero */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "52%",
              height: "96%",
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #ffd2b3, #fcc49d)",
            }}
          />
          <div style={{ position: "absolute", left: "50%", bottom: story ? 60 : 6, transform: "translateX(-46%)" }}>
            <Cutout name="kid-laptop" height={story ? 560 : 450} frame={AT_REST} seed={2} />
          </div>
          {/* tutor on a live video call */}
          <div style={{ position: "absolute", ...(story ? { right: 0, top: 10 } : { left: 0, top: 6 }), transform: `rotate(${story ? 4 : -4}deg)` }}>
            <Card radius={26} pad={10} style={{ width: story ? 360 : 330 }}>
              <div style={{ position: "relative", height: story ? 270 : 236, borderRadius: 18, overflow: "hidden" }}>
                <PhotoFill name="negar-seyyedin" position="44% 28%" />
                <div style={{ position: "absolute", left: 12, top: 12, display: "flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 16, padding: "3px 12px", fontFamily: FA, fontWeight: 800, fontSize: 22, color: COLORS.red }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: COLORS.red }} />
                  زنده
                </div>
              </div>
              <div style={{ direction: "rtl", fontFamily: FA, padding: "10px 6px 2px" }}>
                <div style={{ fontWeight: 900, fontSize: story ? 32 : 28, color: COLORS.title }}>نگار سیدین</div>
                <div style={{ fontWeight: 700, fontSize: story ? 24 : 21, color: COLORS.secondary }}>معلم خصوصی ریاضی</div>
              </div>
            </Card>
          </div>
          {/* benefit chips */}
          <Chip style={{ position: "absolute", ...(story ? { left: 0, bottom: 250 } : { right: 0, top: 30 }), transform: `rotate(${story ? -3 : 3}deg)` }}>یادگیری شخصی‌سازی‌شده</Chip>
          <Chip color={COLORS.green} style={{ position: "absolute", ...(story ? { left: 10, bottom: 150 } : { right: 0, top: 120 }), transform: "rotate(-2deg)" }}>
            ریاضی، علوم، شیمی، فیزیک
          </Chip>
          <Chip color={COLORS.blue} style={{ position: "absolute", ...(story ? { right: 20, bottom: 90 } : { left: -6, bottom: 40 }), transform: "rotate(-3deg)" }}>
            قیمت مناسب
          </Chip>
        </div>

        {/* stats */}
        <Card radius={30} pad={story ? 26 : 18} style={{ display: "flex", direction: "rtl", alignItems: "center", position: "relative", zIndex: 1 }}>
          <Stat value="+۲۰۰٬۰۰۰" label="جلسه" />
          <div style={{ width: 2, alignSelf: "stretch", background: "#f1ebe6" }} />
          <Stat value="+۷۰۰۰" label="شاگرد" />
          <div style={{ width: 2, alignSelf: "stretch", background: "#f1ebe6" }} />
          <Stat value="+۲۵۰" label="معلم" />
          <div style={{ width: 2, alignSelf: "stretch", background: "#f1ebe6" }} />
          <Stat value="۴.۹" label="میانگین امتیاز" star />
        </Card>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: story ? 20 : 12 }}>
          <div
            style={{
              background: COLORS.orange,
              color: "#fff",
              fontFamily: FA,
              fontWeight: 900,
              fontSize: story ? 54 : 46,
              padding: story ? "30px 64px" : "24px 54px",
              borderRadius: 80,
              direction: "rtl",
              display: "flex",
              alignItems: "center",
              gap: 18,
              boxShadow: "0 14px 0 #c94f12, 0 34px 50px -20px rgba(237,95,0,0.6)",
            }}
          >
            شروع با یک جلسه معرفی رایگان
            <svg width={46} height={46} viewBox="0 0 50 50">
              <path d="M32 12 L18 25 L32 38" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ fontFamily: EN, fontWeight: 700, fontSize: story ? 40 : 34, color: COLORS.logo }}>www.darsoon.com</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MetaPosterFeed: React.FC = () => <MetaPoster format="feed" />;
export const MetaPosterStory: React.FC = () => <MetaPoster format="story" />;
