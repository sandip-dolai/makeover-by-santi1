"use client";

import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { business, t as tr } from "@/content/site";
import { Link, usePathname } from "@/i18n/navigation";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { buttonClass } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/academy", key: "academy" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("cta");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, focus close button and listen for Escape while drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const trigger = menuBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const isBn = locale === "bn";
  const mapAria = isBn ? "গুগল ম্যাপে সান্তি'স মেকওভারের ঠিকানা দেখুন" : "View Santi's Makeover location on Google Maps";
  const callAria = isBn ? `ফোন করুন ${business.phoneDisplay}` : `Call ${business.phoneDisplay}`;
  const whatsappAria = isBn ? "হোয়াটসঅ্যাপে বুক করুন" : "Book appointment on WhatsApp";
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

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-ivory/95 shadow-[0_6px_30px_-12px_rgb(26_16_21/0.18)] backdrop-blur-md" : "bg-ivory"}`}
      >
        <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-16" : "h-[4.5rem] md:h-20"}`}>
          <BrandMark />

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.95rem] transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-rose-deep hover:after:scale-x-100 ${isActive(l.href) ? "text-rose-deep after:scale-x-100" : "text-plum"}`}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher className="max-sm:hidden" />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary", "sm", "max-md:hidden")}
              aria-label={whatsappAria}
            >
              <WhatsAppIcon size={17} /> {tc("bookShort")}
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="grid size-11 place-items-center rounded-full text-ink transition hover:bg-blush-soft lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop (direct child of root fragment so it covers entire viewport) */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer sliding panel (direct child of root fragment) */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={`fixed inset-y-0 right-0 z-[80] flex w-[min(22rem,88vw)] flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
          <BrandMark onClick={() => setOpen(false)} />
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
            className="grid size-11 place-items-center rounded-full hover:bg-blush-soft"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-14 items-center border-b border-line/70 font-display text-2xl ${isActive(l.href) ? "text-rose" : "text-ink"}`}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher className="mt-6" />
        </nav>

        <div className="grid gap-3 border-t border-line p-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "lg", "w-full")}
            aria-label={whatsappAria}
          >
            <WhatsAppIcon size={18} /> {tc("book")}
          </a>
          <a
            href={telLink}
            className={buttonClass("outline", "lg", "w-full")}
            aria-label={callAria}
          >
            <Phone className="size-4" aria-hidden="true" /> {business.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
