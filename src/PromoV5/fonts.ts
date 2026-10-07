import { continueRender, delayRender, staticFile } from "remotion";

// Brand font: آذرمهر (AzarMehr). It is not distributed via Google Fonts/npm, so
// drop the licensed files here and they are picked up automatically:
//   public/fonts/AzarMehr-Regular.ttf  (used for weights 400-600)
//   public/fonts/AzarMehr-Bold.ttf     (used for weights 700-900)
// Until then the film falls back to the self-hosted Vazirmatn (OFL), which keeps
// the layout stable. All fonts are local so rendering needs no network.
type Face = { family: string; file: string; weight: string; optional?: boolean };

const FACES: Face[] = [
  { family: "AzarMehr", file: "fonts/AzarMehr-Regular.ttf", weight: "400 600", optional: true },
  { family: "AzarMehr", file: "fonts/AzarMehr-Bold.ttf", weight: "700 900", optional: true },
  { family: "V5Vazirmatn", file: "v5/fonts/Vazirmatn-Variable.woff2", weight: "100 900" },
  { family: "V5Rubik", file: "v5/fonts/Rubik-500.woff2", weight: "400 600" },
  { family: "V5Rubik", file: "v5/fonts/Rubik-700.woff2", weight: "700" },
  { family: "V5Rubik", file: "v5/fonts/Rubik-800.woff2", weight: "800 900" },
];

if (typeof document !== "undefined" && typeof FontFace !== "undefined") {
  for (const { family, file, weight, optional } of FACES) {
    const handle = delayRender(`Loading font ${file}`);
    fetch(staticFile(file))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then((buf) => new FontFace(family, buf, { weight }).load())
      .then((loaded) => document.fonts.add(loaded))
      .catch((err) => {
        if (!optional) console.error(`Font ${file} failed to load`, err);
      })
      .finally(() => continueRender(handle));
  }
}

export const FA = `"AzarMehr", "V5Vazirmatn", sans-serif`;
export const EN = `"V5Rubik", sans-serif`;
