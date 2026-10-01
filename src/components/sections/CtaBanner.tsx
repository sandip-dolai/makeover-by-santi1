import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { business } from "@/content/site";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Ornament } from "../ui/SectionHeading";

export async function CtaBanner() {
  const t = await getTranslations("home");
  const c = await getTranslations("cta");

  return (
    <section className="px-4 py-16 sm:py-20">
      <Reveal>
        <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose via-rose-deep to-[#5e1428] px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-gold/30" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full border border-gold/20" />
          <h2 className="text-3xl font-semibold sm:text-5xl">{t("ctaTitle")}</h2>
          <Ornament className="mx-auto mt-5 w-fit" />
          <p className="mx-auto mt-5 max-w-xl text-white/80 sm:text-lg">{t("ctaText")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink(c("messages.general"))} variant="light" size="lg">
              <WhatsAppIcon size={19} className="text-[#25D366]" /> {c("book")}
            </ButtonLink>
            <ButtonLink
              href={telLink}
              size="lg"
              variant="outline"
              className="border-white/40! text-white! hover:bg-white/10!"
            >
              <Phone className="size-4" aria-hidden="true" /> {business.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
