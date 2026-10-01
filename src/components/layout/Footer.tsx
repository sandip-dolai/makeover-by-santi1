import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { business, services, t as tr } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { mailLink, telLink, whatsappLink } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { BrandMark } from "./BrandMark";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const socials = [
    { href: business.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: business.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: whatsappLink(), label: "WhatsApp", Icon: WhatsAppIcon },
  ].filter((s) => s.href);

  const heading = "mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold";
  const link = "text-white/70 transition hover:text-white";

  return (
    <footer className="bg-ink pb-24 text-white md:pb-0">
      <div className="h-1 bg-gradient-to-r from-rose-deep via-gold to-rose-deep" />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{t("about")}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className={heading}>{t("explore")}</h2>
          <ul className="space-y-3 text-sm">
            {(["services", "academy", "gallery", "about", "contact"] as const).map((k) => (
              <li key={k}>
                <Link href={`/${k}`} className={link}>
                  {nav(k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{t("services")}</h2>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={{ pathname: "/services", hash: s.id }} className={link}>
                  {tr(s.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{t("visit")}</h2>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className={link}>
                {tr(business.address.street, locale)}, {tr(business.address.district, locale)},{" "}
                {tr(business.address.region, locale)} {business.address.postalCode}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={telLink} className={link}>
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={mailLink} className={`${link} break-all`}>
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              {tr(business.hoursLabel, locale)}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {tr(business.name, locale)}. {t("rights")}
          </span>
          <span>
            {t("credit")}{" "}
            <a
              href="https://in.linkedin.com/in/sandipdolai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/75 hover:text-gold"
            >
              Sandip Dolai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
