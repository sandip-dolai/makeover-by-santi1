import {
  Cormorant_Garamond,
  Dancing_Script,
  Hind_Siliguri,
  Jost,
  Noto_Serif_Bengali,
} from "next/font/google";

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-dancing",
  display: "swap",
});

// Bengali fonts are only referenced under :lang(bn), so they are not preloaded on English pages.
export const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-bn",
  display: "swap",
  preload: false,
});

export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  cormorant.variable,
  jost.variable,
  dancing.variable,
  notoSerifBengali.variable,
  hindSiliguri.variable,
].join(" ");
