import { Check } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { services, t as tr } from "@/content/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Ornament } from "../ui/SectionHeading";

export async function SignatureBridal() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const c = await getTranslations("cta");
  const points = t.raw("bridalPoints") as string[];
  const bridal = services.find((s) => s.id === "bridal")!;

  return (
    <section className="section-y overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-lg">
          <div className="relative ml-auto aspect-[3/4] w-[82%] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/bridal-saree.jpg"
              alt={tr(bridal.title, locale)}
              fill
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-[-8%] left-0 aspect-square w-[46%] overflow-hidden rounded-[1.5rem] border-[6px] border-ivory shadow-soft">
            <Image
              src="/images/makeup-eyes.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 14rem, 45vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -top-6 left-[6%] font-script text-6xl text-gold/80 sm:text-7xl"
          >
            Bridal
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">{t("bridalTag")}</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{t("bridalTitle")}</h2>
          <Ornament className="mt-5" />
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("bridalText")}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-plum">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blush-soft text-rose">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(c("messages.service", { service: tr(bridal.title, locale) }))}>
              <WhatsAppIcon size={18} /> {c("book")}
            </ButtonLink>
            <ButtonLink href="/services#bridal" variant="outline">
              {c("viewPrices")}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
