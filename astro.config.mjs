// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

if (new URL(SITE_URL).hostname === "example.com") {
  console.warn(
    "[site] SITE_URL ainda é provisório (src/consts.ts). Defina o domínio final antes de publicar.",
  );
}

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    {
      name: "Poppins",
      cssVariable: "--font-poppins",
      provider: fontProviders.google(),
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
  ],
  build: { inlineStylesheets: "always" },
  vite: { build: { cssTarget: "safari15.4" } },
});
