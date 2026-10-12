"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const next = locale === "en" ? "bn" : "en";

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      aria-label={t("languageLabel")}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white/70 px-3.5 text-sm font-medium text-plum transition hover:border-gold hover:text-rose-deep ${className}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={next}>{t("language")}</span>
    </Link>
  );
}
