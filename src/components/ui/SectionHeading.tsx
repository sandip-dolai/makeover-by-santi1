import type { ReactNode } from "react";

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path d="M5 0 10 5 5 10 0 5Z" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

type Props = {
  tag?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  tag,
  title,
  text,
  align = "center",
  tone = "light",
  as: Tag = "h2",
  className = "",
}: Props) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`${center ? "mx-auto text-center items-center" : "items-start"} flex max-w-2xl flex-col ${className}`}>
      {tag && (
        <span
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${dark ? "text-gold-soft" : "text-gold-deep"}`}
        >
          {tag}
        </span>
      )}
      <Tag
        className={`${Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl"} font-semibold leading-[1.1] ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </Tag>
      <Ornament className="mt-5" />
      {text && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}
