import { business } from "@/content/site";

/** wa.me deep link, optionally with a pre-filled message. */
export function whatsappLink(text?: string) {
  const base = `https://wa.me/${business.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const telLink = `tel:${business.phone}`;
export const mailLink = `mailto:${business.email}`;
