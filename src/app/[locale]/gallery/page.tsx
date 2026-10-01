import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { PageHero } from "@/components/ui/PageHero";
import { business, gallery, galleryCategories, t as tr } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "gallery");
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <>
      <PageHero tag={t("tag")} title={t("title")} lead={t("lead")} image="/images/makeup-palette.jpg" />
      <section className="section-y">
        <div className="container-x">
          <GalleryGrid
            items={gallery.map((g) => ({ src: g.src, alt: tr(g.alt, locale), category: g.category, tall: g.tall }))}
            filters={galleryCategories.map((c) => ({ id: c.id, label: tr(c.label, locale) }))}
            labels={{ all: t("all"), close: t("close"), prev: t("prev"), next: t("next") }}
          />
          <div className="mt-12 flex justify-center">
            <ButtonLink href={business.social.facebook} variant="outline">
              <FacebookIcon size={17} /> {t("more")}
            </ButtonLink>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
