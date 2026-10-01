"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type GalleryItem = { src: string; alt: string; category: string; tall?: boolean };

type Props = {
  items: GalleryItem[];
  filters: { id: string; label: string }[];
  labels: { all: string; close: string; prev: string; next: string };
};

export function GalleryGrid({ items, filters, labels }: Props) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  // Basic swipe support for phones
  const touchX = useRef<number | null>(null);

  const chip = (on: boolean) =>
    `min-h-10 shrink-0 rounded-full px-5 text-sm font-medium transition ${on ? "bg-rose text-white shadow-md" : "bg-white text-plum ring-1 ring-line hover:ring-gold"}`;

  const current = active !== null ? visible[active] : null;

  return (
    <>
      <div role="toolbar" aria-label="Filter" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {[{ id: "all", label: labels.all }, ...filters].map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={chip(filter === f.id)}>
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, i) => (
          <li key={item.src} className={item.tall ? "row-span-2" : ""}>
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setActive(i);
              }}
              className="group relative block size-full overflow-hidden rounded-2xl bg-blush-soft"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-3 bottom-3 translate-y-2 text-left text-sm text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <figure className="relative h-[78vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={85} className="object-contain" />
            <figcaption className="absolute -bottom-10 inset-x-0 text-center text-sm text-white/75">
              {current.alt} · {active! + 1}/{visible.length}
            </figcaption>
          </figure>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={labels.prev}
            className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={labels.next}
            className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
