import { HeartHandshake, ShieldCheck, Sparkles, Lightbulb } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament, SectionHeading } from "@/components/ui/SectionHeading";
import { business, milestones, t as tr } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "about");
}

const valueIcons = [ShieldCheck, Sparkles, HeartHandshake, Lightbulb];

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const c = await getTranslations("cta");
  const values = t.raw("values") as { title: string; text: string }[];

  return (
    <>
      <PageHero tag={t("tag")} title={t("title")} image="/images/salon-interior-3.jpg" />

      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -inset-3 -z-10 translate-x-5 translate-y-5 rounded-[2rem] bg-gold-soft/60" />
            {/* TODO: replace /images/founder.jpg with a real photo of Santi Dolai */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/images/founder.jpg"
                alt={`${tr(business.founder, locale)} — ${t("founderRole")}`}
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-center shadow-soft">
              <p className="font-display text-2xl font-semibold text-rose-deep">{tr(business.founder, locale)}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">{t("founderRole")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
              {tr(business.name, locale)} · {business.foundedYear}
            </span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{t("meet")}</h2>
            <Ornament className="mt-5" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services">{c("explore")}</ButtonLink>
              <ButtonLink href="/academy" variant="outline">
                {c("academy")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsStrip />

      {/* Values */}
      <section className="section-y bg-cream">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={t("valuesTitle")} />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <li key={v.title}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <div className="h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line/60">
                      <span className="grid size-12 place-items-center rounded-full bg-blush-soft text-rose">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-2xl font-semibold">{v.title}</h3>
                      <p className="mt-2 text-muted">{v.text}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y">
        <div className="container-x max-w-3xl!">
          <Reveal>
            <SectionHeading title={t("journey")} />
          </Reveal>
          <ol className="relative mt-12 space-y-10 border-l border-gold/50 pl-8 sm:pl-10">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative">
                <Reveal delay={i * 0.08}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.55rem] top-1.5 size-4 rotate-45 border-2 border-gold bg-ivory sm:-left-[3.05rem]"
                  />
                  <p className="font-display text-3xl font-semibold text-rose">
                    {m.year === "Today" && locale === "bn" ? "আজ" : m.year}
                  </p>
                  <p className="mt-1 text-lg text-plum">{tr(m.text, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
