import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AcademyTeaser } from "@/components/sections/AcademyTeaser";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { SignatureBridal } from "@/components/sections/SignatureBridal";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsStrip />
      <SignatureBridal />
      <ServicesPreview />
      <AcademyTeaser />
      <GalleryPreview />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
