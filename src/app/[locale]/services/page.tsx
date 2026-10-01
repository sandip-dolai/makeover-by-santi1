import { Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services, t as tr } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { startingPrice } from "@/lib/price";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const c = await getTranslations("cta");

  return (
    <>
      <PageHero tag={t("tag")} title={t("title")} lead={t("lead")} image="/images/salon-interior.jpg" />

      {/* Category jump bar */}
      <nav
        aria-label={t("jump")}
        className="sticky top-16 z-30 border-b border-line bg-ivory/90 backdrop-blur-md"
      >
        <ul className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3 lg:justify-center">
          {services.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-plum ring-1 ring-line transition hover:text-rose-deep hover:ring-gold"
              >
                <ServiceIcon name={s.icon} className="size-4 text-gold-deep" />
                {tr(s.title, locale)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x section-y space-y-20 sm:space-y-28">
        {services.map((svc, idx) => {
          const title = tr(svc.title, locale);
          const from = startingPrice(svc.items);
          const flip = idx % 2 === 1;
          return (
            <section key={svc.id} id={svc.id} aria-labelledby={`${svc.id}-title`} className="scroll-mt-36">
              <div className={`grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Reveal className="lg:sticky lg:top-36">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift lg:aspect-[4/5]">
                    <Image
                      src={svc.image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 34rem, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 pt-20 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">{tr(svc.tagline, locale)}</p>
                      {from && (
                        <p className="mt-1 font-display text-2xl">
                          {t("from")} <span className="text-gold-soft">{from}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <span className="grid size-12 place-items-center rounded-full bg-blush-soft text-rose">
                    <ServiceIcon name={svc.icon} className="size-5" />
                  </span>
                  <h2 id={`${svc.id}-title`} className="mt-4 text-3xl font-semibold sm:text-4xl">
                    {title}
                  </h2>
                  <Ornament className="mt-4" />
                  <p className="mt-4 text-lg leading-relaxed text-muted">{tr(svc.description, locale)}</p>

                  <ul className="mt-8 divide-y divide-line rounded-3xl bg-white px-5 shadow-soft ring-1 ring-line/60 sm:px-7">
                    {svc.items.map((item) => {
                      const name = tr(item.name, locale);
                      return (
                        <li key={item.name.en} className="flex items-center gap-3 py-4">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-ink">{name}</p>
                            {item.note && <p className="text-xs text-muted">{tr(item.note, locale)}</p>}
                          </div>
                          <span className="hidden flex-1 border-b border-dotted border-gold/50 sm:block" aria-hidden="true" />
                          <span className="whitespace-nowrap font-display text-xl font-semibold text-rose-deep">
                            <span className="sr-only">{t("from")} </span>
                            {item.price}
                          </span>
                          <a
                            href={whatsappLink(c("messages.service", { service: name }))}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${c("bookThis")}: ${name}`}
                            className="grid size-10 shrink-0 place-items-center rounded-full bg-blush-soft text-rose transition hover:bg-rose hover:text-white"
                          >
                            <WhatsAppIcon size={17} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              </div>
            </section>
          );
        })}

        <p className="mx-auto flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
          {t("note")}
        </p>
      </div>

      <CtaBanner />
    </>
  );
}
