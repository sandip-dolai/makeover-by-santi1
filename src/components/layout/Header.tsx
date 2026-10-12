import { Clock, MapPin, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { business, t as tr } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { buttonClass } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { BrandMark } from "./BrandMark";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/academy", key: "academy" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export async function Header({ locale: propLocale }: { locale?: string } = {}) {
  const locale = propLocale ?? (await getLocale());
  const t = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "cta" });
  const brand = await getTranslations({ locale, namespace: "brand" });

  const localizedLinks = navLinks.map((l) => ({
    href: l.href,
    label: t(l.key),
  }));

  const isBn = locale === "bn";
  const whatsappAria = isBn ? "হোয়াটসঅ্যাপে বুক করুন" : "Book appointment on WhatsApp";
  const callAria = isBn ? `ফোন করুন ${business.phoneDisplay}` : `Call ${business.phoneDisplay}`;
  const mapAria = isBn ? "গুগল ম্যাপে সান্তি'স মেকওভারের ঠিকানা দেখুন" : "View Santi's Makeover location on Google Maps";
  const whatsappHref = whatsappLink(tc("messages.general"));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-rose px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        {t("skip")}
      </a>

      {/* Slim info bar (desktop only) */}
      <div className="hidden bg-rose-deep text-[0.8rem] text-white/85 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" /> {tr(business.hoursLabel, locale)}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={business.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
              aria-label={mapAria}
            >
              <MapPin className="size-3.5" aria-hidden="true" /> {tr(business.address.street, locale)}, {tr(business.address.region, locale)}
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-1.5 hover:text-white"
              aria-label={callAria}
            >
              <Phone className="size-3.5" aria-hidden="true" /> {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/60 bg-ivory/95 shadow-[0_4px_24px_-12px_rgb(26_16_21/0.12)] backdrop-blur-md">
        <div className="container-x flex h-16 md:h-20 items-center justify-between gap-4">
          <BrandMark subtitle={brand("sub")} />

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="relative rounded-full px-3.5 py-2 text-[0.95rem] text-plum transition-colors hover:text-rose-deep"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              className="max-sm:hidden"
              currentLocale={locale}
              label={t("languageLabel")}
              langText={t("language")}
            />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary", "sm", "max-md:hidden")}
              aria-label={whatsappAria}
            >
              <WhatsAppIcon size={17} /> {tc("bookShort")}
            </a>
            <MobileNav
              locale={locale}
              links={localizedLinks}
              brandSubtitle={brand("sub")}
              menuLabel={t("menu")}
              closeLabel={t("close")}
              bookLabel={tc("book")}
              phoneDisplay={business.phoneDisplay}
              telLink={telLink}
              whatsappHref={whatsappHref}
              whatsappAriaLabel={whatsappAria}
              callAriaLabel={callAria}
              langLabel={t("languageLabel")}
              langText={t("language")}
            />
          </div>
        </div>
      </header>
    </>
  );
}
