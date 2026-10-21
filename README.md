# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

## DarsoonLaunch — 30s launch film (`src/PromoV5`)

1080×1920, 30 fps, 900 frames, no voiceover. Six scenes: problem → solution
(smart match + live class) → five stat moments → three benefit scenes →
five subjects → CTA. Timing lives in `src/PromoV5/timeline.ts`; every SFX cue
is listed in `src/PromoV5/Soundtrack.tsx`.

**Brand font (آذرمهر):** add the licensed files as
`public/fonts/AzarMehr-Regular.ttf` and `public/fonts/AzarMehr-Bold.ttf`.
They are picked up automatically; until then the film falls back to the
bundled Vazirmatn. All fonts load locally, so renders need no network.

**Audio:** the music bed and SFX in `public/v5/` are synthesized from code
(original, license-free). Regenerate with `python3 scripts/film5_audio.py`.

```console
npx remotion render DarsoonLaunch out/DarsoonLaunch.mp4 --crf=18   # hook clip + motion film (~42s)
npx remotion render DarsoonMotion out/DarsoonMotion.mp4 --crf=18   # motion film only (~34s)
npx remotion render DarsoonChemistry out/DarsoonChemistry.mp4 --crf=18   # 10s chemistry spot
npx remotion still DarsoonPosterFeed renders/DarsoonPoster-Feed.png     # Meta Ads poster 1080x1350
npx remotion still DarsoonPosterStory renders/DarsoonPoster-Story.png   # Meta Ads stories 1080x1920
```

## DarsoonFeltFrench — 44s felt stop-motion ad (`src/Felt`)

A silent (music-only) story in needle-felt style for Meta Ads, 1080×1920:
an Iranian family packs up in Tehran, flies across a knitted globe to
Toronto, the daughter struggles in French immersion, sees Darsoon's online
French class on a phone, then learns happily with her tutor on a laptop.
The felt look is pure SVG filters (`src/Felt/kit.tsx`); the family rig is
in `src/Felt/characters.tsx`; animation runs "on twos" for a stop-motion
feel. Music/SFX come from `scripts/film5_audio.py` (`felt-music.mp3`).

```console
npx remotion render DarsoonFeltFrench out/DarsoonFeltFrench.mp4 --crf=18
```
