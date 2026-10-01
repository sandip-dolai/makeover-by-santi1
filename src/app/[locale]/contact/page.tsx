import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { BookingForm } from "@/components/ui/BookingForm";
import { Faq } from "@/components/ui/Faq";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, courses, faqs, services, t as tr } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { mailLink, telLink, whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const c = await getTranslations("cta");

  const address = `${tr(business.address.street, locale)}, ${tr(business.address.district, locale)}, ${tr(business.address.region, locale)} ${business.address.postalCode}`;

  const details = [
    { icon: MapPin, label: t("address"), value: address, href: business.mapLink },
    { icon: Phone, label: t("phone"), value: business.phoneDisplay, href: telLink },
    { icon: Mail, label: t("email"), value: business.email, href: mailLink },
    { icon: Clock, label: t("hours"), value: tr(business.hoursLabel, locale) },
  ];

  const socials = [
    { href: business.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: business.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: whatsappLink(c("messages.general")), label: "WhatsApp", Icon: WhatsAppIcon },
  ].filter((s) => s.href);

  return (
    <>
      <PageHero tag={t("tag")} title={t("title")} lead={t("lead")} image="/images/salon-interior-2.jpg" />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ul className="grid gap-4">
              {details.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blush-soft text-rose">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{label}</span>
                      <span className="mt-1 block break-words text-lg text-ink">{value}</span>
                    </span>
                  </>
                );
                const cls = "flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-line/60";
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`${cls} transition hover:-translate-y-0.5 hover:ring-gold`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{t("follow")}</p>
            <div className="mt-3 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-12 place-items-center rounded-full bg-white text-rose shadow-soft ring-1 ring-line transition hover:bg-rose hover:text-white"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <BookingForm
              groups={[
                { label: nav("services"), options: services.map((s) => tr(s.title, locale)) },
                { label: nav("academy"), options: courses.map((x) => tr(x.title, locale)) },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section aria-label={t("address")} className="h-[24rem] w-full bg-cream sm:h-[28rem]">
        <iframe
          src={business.mapEmbed}
          title={tr(business.name, locale)}
          className="size-full border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>

      <section className="section-y bg-cream">
        <div className="container-x max-w-3xl!">
          <Reveal>
            <SectionHeading title={t("faqTitle")} />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Faq items={faqs.map((f) => ({ q: tr(f.q, locale), a: tr(f.a, locale) }))} />
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: tr(f.q, locale),
              acceptedAnswer: { "@type": "Answer", text: tr(f.a, locale) },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
