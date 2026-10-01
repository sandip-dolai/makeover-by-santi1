import { Award, CalendarDays, Check, GraduationCap, IndianRupee } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { BookingForm } from "@/components/ui/BookingForm";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PerkIcon } from "@/components/ui/ServiceIcon";
import { academyPerks, business, courses, faqs, t as tr, testimonials } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }: PageProps<"/[locale]/academy">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "academy");
}

export default async function AcademyPage({ params }: PageProps<"/[locale]/academy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("academy");
  const c = await getTranslations("cta");

  const story = testimonials.find((x) => x.name === "Moumita Manna")!;
  const courseFaqs = faqs.slice(3).map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }));

  const courseJsonLd = courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title.en,
    description: course.summary.en,
    url: absoluteUrl(locale, "/academy"),
    provider: { "@type": "EducationalOrganization", name: business.name.en, sameAs: business.siteUrl },
    offers: { "@type": "Offer", category: "Paid", priceCurrency: "INR", price: course.fee.replace(/[^\d]/g, "") },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Onsite", location: business.address.locality.en },
  }));

  const facts = (course: (typeof courses)[number]) => [
    { icon: CalendarDays, label: t("duration"), value: tr(course.duration, locale) },
    { icon: GraduationCap, label: t("level"), value: tr(course.level, locale) },
    { icon: IndianRupee, label: t("fee"), value: course.fee },
    { icon: Award, label: t("certificate"), value: t("certificateValue") },
  ];

  return (
    <>
      <PageHero tag={t("tag")} title={t("title")} lead={t("lead")} image="/images/makeup-brushes.jpg" />

      {/* Courses side by side */}
      <section className="section-y">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {courses.map((course, i) => {
            const title = tr(course.title, locale);
            return (
              <Reveal key={course.id} delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-line/60">
                  <div className="relative aspect-[16/9]">
                    <Image src={course.image} alt="" fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
                    <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft backdrop-blur">
                      {tr(course.duration, locale)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="mt-3 text-muted">{tr(course.summary, locale)}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-3">
                      {facts(course).map(({ icon: Icon, label, value }) => (
                        <div key={label} className="rounded-2xl bg-cream p-4">
                          <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                            <Icon className="size-3.5 text-gold-deep" aria-hidden="true" /> {label}
                          </dt>
                          <dd className="mt-1 font-medium text-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <h3 className="mt-8 text-xl font-semibold">{t("learn")}</h3>
                    <ul className="mt-4 grid flex-1 gap-2.5 sm:grid-cols-2">
                      {course.syllabus.map((s) => (
                        <li key={s.en} className="flex items-start gap-2.5 text-[0.95rem] text-plum">
                          <Check className="mt-1 size-4 shrink-0 text-rose" aria-hidden="true" />
                          {tr(s, locale)}
                        </li>
                      ))}
                    </ul>

                    <ButtonLink
                      href={whatsappLink(c("messages.course", { course: title }))}
                      className="mt-8 w-full"
                      size="lg"
                    >
                      <WhatsAppIcon size={18} /> {c("enquire")}
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Perks */}
      <section className="section-y bg-ink text-white">
        <div className="container-x">
          <Reveal>
            <SectionHeading tone="dark" tag={t("tag")} title={t("perksTitle")} />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {academyPerks.map((p, i) => (
              <li key={p.icon}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center">
                    <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold/15 text-gold">
                      <PerkIcon name={p.icon} className="size-6" />
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold">{tr(p.title, locale)}</h3>
                    <p className="mt-2 text-sm text-white/65">{tr(p.text, locale)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Student story + enquiry */}
      <section className="section-y bg-cream">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">{t("storyTag")}</span>
            <blockquote className="mt-4 font-display text-3xl leading-snug text-ink sm:text-4xl">
              “{tr(story.quote, locale)}”
            </blockquote>
            <p className="mt-6 font-semibold text-rose-deep">
              {story.name} <span className="font-normal text-muted">· {tr(story.role, locale)}</span>
            </p>
            <div className="mt-10">
              <Faq items={courseFaqs} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingForm
              title={t("formTitle")}
              showDate={false}
              groups={[{ label: t("tag"), options: courses.map((x) => tr(x.title, locale)) }]}
              defaultInterest={tr(courses[0].title, locale)}
            />
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
