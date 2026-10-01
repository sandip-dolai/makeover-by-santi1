import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { academyPerks, courses, t as tr } from "@/content/site";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PerkIcon } from "../ui/ServiceIcon";

export async function AcademyTeaser() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const c = await getTranslations("cta");

  return (
    <section className="section-y relative isolate overflow-hidden bg-ink text-white">
      <Image
        src="/images/makeup-flatlay.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="-z-10 object-cover opacity-[0.12]"
      />
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            align="left"
            tone="dark"
            tag={t("academyTag")}
            title={t("academyTitle")}
            text={t("academyText")}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {academyPerks.map((p) => (
              <li key={p.icon} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <PerkIcon name={p.icon} className="size-5" />
                </span>
                <span>
                  <strong className="block font-display text-xl font-semibold">{tr(p.title, locale)}</strong>
                  <span className="text-sm text-white/65">{tr(p.text, locale)}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5">
          {courses.map((course, i) => (
            <Reveal key={course.id} delay={i * 0.1}>
              <article className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-gold/50 hover:bg-white/[0.07] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {tr(course.duration, locale)}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{tr(course.title, locale)}</h3>
                  </div>
                  <GraduationCap className="size-8 shrink-0 text-gold/70" aria-hidden="true" />
                </div>
                <p className="mt-3 text-white/70">{tr(course.summary, locale)}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <ButtonLink href="/academy" variant="gold" className="w-full sm:w-auto">
              {c("academy")} <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
