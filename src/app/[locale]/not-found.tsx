import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/SectionHeading";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-script text-7xl text-gold">404</p>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
      <Ornament className="mt-5" />
      <p className="mt-5 max-w-md text-lg text-muted">{t("text")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("home")}
      </ButtonLink>
    </section>
  );
}
