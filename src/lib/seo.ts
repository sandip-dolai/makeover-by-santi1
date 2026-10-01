import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { business } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";

export type PageKey = "home" | "services" | "academy" | "gallery" | "about" | "contact";

export const pagePaths: Record<PageKey, string> = {
  home: "",
  services: "/services",
  academy: "/academy",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
};

export const absoluteUrl = (locale: string, path = "") =>
  `${business.siteUrl}/${locale}${path}`;

/** Per-page metadata with canonical + hreflang alternates for en/bn. */
export async function pageMetadata(locale: Locale, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = pagePaths[page];

  const title = page === "home" ? t("siteTitle") : t(page);
  const description =
    page === "home" ? t("siteDescription") : t(`${page}Description` as "servicesDescription");

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
        "x-default": absoluteUrl(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: business.name.en,
      locale: locale === "bn" ? "bn_IN" : "en_IN",
      type: "website",
    },
  };
}
