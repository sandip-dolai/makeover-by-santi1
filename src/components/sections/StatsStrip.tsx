import { getLocale } from "next-intl/server";
import { stats, t as tr } from "@/content/site";

export async function StatsStrip() {
  const locale = await getLocale();
  return (
    <section aria-label="Highlights" className="bg-rose-deep text-white">
      <div className="container-x grid grid-cols-2 divide-white/15 py-10 md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <div key={s.value} className="flex flex-col items-center px-4 py-3 text-center">
            <span className="font-display text-4xl font-semibold text-gold-soft sm:text-5xl">{s.value}</span>
            <span className="mt-1 text-xs uppercase tracking-[0.18em] text-white/75">{tr(s.label, locale)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
