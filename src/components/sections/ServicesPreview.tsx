import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { services, t as tr } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { startingPrice } from "@/lib/price";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceIcon } from "../ui/ServiceIcon";

export async function ServicesPreview() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const s = await getTranslations("services");
  const c = await getTranslations("cta");

  return (
    <section className="section-y bg-cream">
      <div className="container-x">
        <Reveal>
          <SectionHeading tag={t("servicesTag")} title={t("servicesTitle")} text={t("servicesText")} />
        </Reveal>

        {/* Swipeable row on phones, grid from tablet up */}
        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {services.map((svc, i) => {
            const from = startingPrice(svc.items);
            return (
              <li key={svc.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link
                    href={{ pathname: "/services", hash: svc.id }}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={svc.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 78vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-rose-deep backdrop-blur">
                        {tr(svc.tagline, locale)}
                      </span>
                    </div>
                    <div className="relative flex flex-1 flex-col p-6 pt-8">
                      <span className="absolute -top-6 right-6 grid size-12 place-items-center rounded-full bg-rose text-white shadow-lg ring-4 ring-white">
                        <ServiceIcon name={svc.icon} className="size-5" />
                      </span>
                      <h3 className="text-2xl font-semibold">{tr(svc.title, locale)}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                        {tr(svc.description, locale)}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                        {from && (
                          <span className="text-sm text-muted">
                            {s("from")}{" "}
                            <strong className="font-display text-xl font-semibold text-rose-deep">{from}</strong>
                          </span>
                        )}
                        <ArrowUpRight
                          className="size-5 text-gold-deep transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/services" variant="outline">
            {c("viewPrices")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
