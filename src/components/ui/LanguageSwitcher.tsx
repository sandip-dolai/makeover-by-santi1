"use client";

import { Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({
  className = "",
  currentLocale = "en",
  label = "Change language to Bengali",
  langText,
}: {
  className?: string;
  currentLocale?: string;
  label?: string;
  langText?: string;
}) {
  const pathname = usePathname();
  const next = currentLocale === "en" ? "bn" : "en";
  const displayText = langText ?? (next === "bn" ? "বাংলা" : "English");

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      aria-label={label}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white/70 px-3.5 text-sm font-medium text-plum transition hover:border-gold hover:text-rose-deep ${className}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={next}>{displayText}</span>
    </Link>
  );
}
