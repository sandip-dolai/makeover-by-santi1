import { ChevronDown } from "lucide-react";

/** Native <details> accordion — accessible and works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl bg-white px-6 shadow-soft ring-1 ring-line/60 sm:px-8">
      {items.map((f, i) => (
        <details key={f.q} className="group py-5" open={i === 0}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-xl font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown
              className="size-5 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
