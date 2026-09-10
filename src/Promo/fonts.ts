import { loadFont as loadVazirmatn } from "@remotion/google-fonts/Vazirmatn";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";

const vazirmatn = loadVazirmatn("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["arabic"],
});

const rubik = loadRubik("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

export const persianFont = vazirmatn.fontFamily;
export const latinFont = rubik.fontFamily;

export const fontsLoaded = Promise.all([
  vazirmatn.waitUntilDone(),
  rubik.waitUntilDone(),
]);
