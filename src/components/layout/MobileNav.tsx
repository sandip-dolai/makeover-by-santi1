"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { buttonClass } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { BrandMark } from "./BrandMark";

export type NavLinkItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  locale: string;
  links: readonly NavLinkItem[];
  brandSubtitle: string;
  menuLabel: string;
  closeLabel: string;
  bookLabel: string;
  phoneDisplay: string;
  telLink: string;
  whatsappHref: string;
  whatsappAriaLabel: string;
  callAriaLabel: string;
  langLabel: string;
  langText: string;
};

export function MobileNav({
  locale,
  links,
  brandSubtitle,
  menuLabel,
  closeLabel,
  bookLabel,
  phoneDisplay,
  telLink,
  whatsappHref,
  whatsappAriaLabel,
  callAriaLabel,
  langLabel,
  langText,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

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

  return (
    <>
      <button
        ref={menuBtn}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid size-11 place-items-center rounded-full text-ink transition hover:bg-blush-soft lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={menuLabel}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[80] flex w-[min(22rem,88vw)] flex-col bg-ivory shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
          <BrandMark subtitle={brandSubtitle} onClick={() => setOpen(false)} />
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
            className="grid size-11 place-items-center rounded-full hover:bg-blush-soft"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-14 items-center border-b border-line/70 font-display text-2xl ${isActive(l.href) ? "text-rose" : "text-ink"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher
            className="mt-6"
            currentLocale={locale}
            label={langLabel}
            langText={langText}
          />
        </nav>

        <div className="grid gap-3 border-t border-line p-5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary", "lg", "w-full")}
            aria-label={whatsappAriaLabel}
          >
            <WhatsAppIcon size={18} /> {bookLabel}
          </a>
          <a
            href={telLink}
            className={buttonClass("outline", "lg", "w-full")}
            aria-label={callAriaLabel}
          >
            <Phone className="size-4" aria-hidden="true" /> {phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
