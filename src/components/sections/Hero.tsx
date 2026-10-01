import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { gallery, t as tr } from "@/content/site";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { ButtonLink } from "../ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("hero");
  const c = await getTranslations("cta");

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* soft background glow */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 size-[38rem] rounded-full bg-blush/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-10 size-[30rem] rounded-full bg-gold-soft/50 blur-3xl"
      />

      <div className="container-x grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            <span className="size-1.5 rounded-full bg-rose" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1 className="text-[2.75rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-[4.6rem]">
            {t("title")}{" "}
            <em className="font-medium italic text-rose">{t("titleAccent")}</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("lead")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(c("messages.general"))} size="lg">
              <WhatsAppIcon size={19} /> {c("book")}
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              {c("explore")} <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-plum">
            <span className="inline-flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              {t("rating")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-5 text-rose" aria-hidden="true" />
              {t("badge")}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] animate-rise [animation-delay:150ms] sm:max-w-md lg:mr-0">
          {/* gold offset arch */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-3xl border border-gold/70"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl bg-blush-soft shadow-lift">
            <Image
              src="/images/hero-bride.jpg"
              alt={tr(gallery[0].alt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:-left-10">
            <span className="grid size-10 place-items-center rounded-full bg-rose text-sm font-bold text-white">
              ISO
            </span>
            <span className="text-sm leading-tight">
              <strong className="block font-display text-lg text-ink">{t("isoTitle")}</strong>
              <span className="text-muted">{t("isoSub")}</span>
            </span>
          </div>
          <div className="absolute -right-2 top-10 rounded-2xl bg-ink px-4 py-3 text-center text-white shadow-soft sm:-right-6">
            <span className="block font-display text-3xl font-semibold leading-none text-gold">15+</span>
            <span className="text-[0.7rem] uppercase tracking-[0.15em] text-white/70">{t("years")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
