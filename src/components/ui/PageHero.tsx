import Image from "next/image";
import { Ornament } from "./SectionHeading";

type Props = {
  tag: string;
  title: string;
  lead?: string;
  image: string;
};

/** Compact banner used at the top of inner pages. */
export function PageHero({ tag, title, lead, image }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={60}
        className="-z-10 object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/50 to-rose-deep/60" />
      <div className="container-x flex flex-col items-center py-20 text-center sm:py-28">
        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">{tag}</span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
        <Ornament className="mt-5" />
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{lead}</p>}
      </div>
    </section>
  );
}
