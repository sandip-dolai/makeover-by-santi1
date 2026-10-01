import { Navigation, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { business } from "@/content/site";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/BrandIcons";

/** Thumb-reachable Call · WhatsApp · Directions bar, shown on phones only. */
export async function MobileActionBar() {
  const t = await getTranslations("cta");
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 text-[0.72rem] font-medium min-h-14 transition active:scale-95";

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-12px_rgb(26_16_21/0.2)] backdrop-blur-md md:hidden"
    >
      <div className="flex items-stretch">
        <a href={telLink} className={`${item} text-plum`}>
          <Phone className="size-5" aria-hidden="true" />
          {t("call")}
        </a>
        <a
          href={whatsappLink(t("messages.general"))}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} -mt-4 mx-2 rounded-t-2xl bg-rose text-white shadow-[0_-6px_20px_-6px_rgb(181_51_78/0.6)]`}
        >
          <WhatsAppIcon size={22} />
          {t("whatsapp")}
        </a>
        <a href={business.mapLink} target="_blank" rel="noopener noreferrer" className={`${item} text-plum`}>
          <Navigation className="size-5" aria-hidden="true" />
          {t("directions")}
        </a>
      </div>
    </nav>
  );
}
