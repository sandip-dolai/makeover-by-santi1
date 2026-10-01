import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function BrandMark({ tone = "dark", onClick }: { tone?: "dark" | "light"; onClick?: () => void }) {
  const t = useTranslations("brand");
  const light = tone === "light";
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="Santi's Makeover — Home">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full ring-1 transition ${light ? "bg-white/95 ring-white/30" : "bg-white ring-gold/40 group-hover:ring-gold"}`}
      >
        <Image src="/images/logo-mark.png" alt="" width={30} height={30} className="size-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span lang="en" className={`font-[family-name:var(--font-cormorant)] whitespace-nowrap text-[1.35rem] font-semibold ${light ? "text-white" : "text-rose-deep"}`}>
          Santi&apos;s Makeover
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] ${light ? "text-gold-soft" : "text-gold-deep"}`}
        >
          {t("sub")}
        </span>
      </span>
    </Link>
  );
}
