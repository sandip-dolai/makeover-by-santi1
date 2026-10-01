import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "outline" | "light" | "gold" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-rose text-white shadow-[0_8px_24px_-8px_rgb(181_51_78/0.55)] hover:bg-rose-deep hover:-translate-y-0.5",
  outline:
    "border border-rose/40 text-rose-deep hover:border-rose hover:bg-rose hover:text-white",
  light:
    "bg-white text-rose-deep shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
  gold: "bg-gold text-ink hover:bg-gold-soft hover:-translate-y-0.5",
  ghost: "text-rose-deep hover:text-rose underline-offset-4 hover:underline px-0!",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-8 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className">;

/** Internal routes use the locale-aware Link; external / tel / mailto use a plain anchor. */
export function ButtonLink({ href, variant, size, className = "", children, ...rest }: Props) {
  const cls = buttonClass(variant, size, className);
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
