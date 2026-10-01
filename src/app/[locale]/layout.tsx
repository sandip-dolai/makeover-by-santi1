import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { business } from "@/content/site";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#8c1f3a",
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(business.siteUrl),
    title: { default: t("siteTitle"), template: `%s | ${business.shortName.en}` },
    description: t("siteDescription"),
    applicationName: business.name.en,
    keywords: [
      "beauty salon Debra",
      "bridal makeup Debra Bazaar",
      "makeup artist Paschim Medinipur",
      "beautician course West Bengal",
      "ISO certified beauty academy",
      "hair spa Debra",
      "keratin treatment Medinipur",
      "Santi's Makeover",
    ],
    formatDetection: { telephone: true },
  };
}

function salonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${business.siteUrl}/#salon`,
    name: business.name.en,
    alternateName: [business.name.bn, "Makeover by Santi"],
    url: business.siteUrl,
    image: `${business.siteUrl}/images/salon-interior.jpg`,
    logo: `${business.siteUrl}/images/logo-mark.png`,
    telephone: business.phone,
    email: business.email,
    priceRange: "₹₹",
    foundingDate: String(business.foundedYear),
    founder: { "@type": "Person", name: business.founder.en },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street.en,
      addressLocality: business.address.locality.en,
      addressRegion: business.address.region.en,
      postalCode: business.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.mapLink,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: business.hours.open,
        closes: business.hours.close,
      },
    ],
    sameAs: [business.social.facebook, business.social.instagram].filter(Boolean),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
