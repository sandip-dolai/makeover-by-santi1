import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { gallery, t as tr } from "@/content/site";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const picks = [
  "/images/hero-bride.jpg",
  "/images/hair-styling.jpg",
  "/images/nails-nude.jpg",
  "/images/facial-mask.jpg",
  "/images/salon-interior-2.jpg",
];

export async function GalleryPreview() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const c = await getTranslations("cta");
  const items = picks.map((src) => gallery.find((g) => g.src === src)!).filter(Boolean);

  // Bento layout: first image is the large feature tile
  const tile = [
    "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal>
          <SectionHeading tag={t("galleryTag")} title={t("galleryTitle")} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-4 sm:gap-4">
            {items.map((g, i) => (
              <div key={g.src} className={`relative overflow-hidden rounded-2xl ${tile[i]}`}>
                <Image
                  src={g.src}
                  alt={tr(g.alt, locale)}
                  fill
                  sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/gallery" variant="outline">
            {c("gallery")} <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
