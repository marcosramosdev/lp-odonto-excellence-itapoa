// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      provider: fontProviders.google(),
      weights: [500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
  ],
  vite: { build: { cssTarget: "safari15.4" } },
});
