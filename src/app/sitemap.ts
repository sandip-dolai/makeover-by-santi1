import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, pagePaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(pagePaths).flatMap(([page, path]) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  );
}
