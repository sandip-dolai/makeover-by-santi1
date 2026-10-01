import { Quote, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { testimonials, t as tr } from "@/content/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export async function Testimonials({ only }: { only?: string[] }) {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const list = only ? testimonials.filter((x) => only.includes(x.name)) : testimonials;

  return (
    <section className="section-y bg-blush-soft/60">
      <div className="container-x">
        <Reveal>
          <SectionHeading tag={t("reviewsTag")} title={t("reviewsTitle")} />
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {list.map((r, i) => (
            <li key={r.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-line/60 sm:p-8">
                  <Quote className="absolute right-6 top-6 size-10 text-blush" aria-hidden="true" />
                  <div className="flex text-gold" role="img" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-plum">
                    <p>“{tr(r.quote, locale)}”</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-rose to-rose-deep font-display text-lg font-semibold text-white">
                      {r.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{r.name}</span>
                      <span className="text-sm text-muted">{tr(r.role, locale)}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
