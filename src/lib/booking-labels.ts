import { getTranslations } from "next-intl/server";
import type { BookingFormLabels } from "@/components/ui/BookingForm";

export async function getBookingFormLabels(): Promise<BookingFormLabels> {
  const f = await getTranslations("form");
  return {
    title: f("title"),
    subtitle: f("subtitle"),
    name: f("name"),
    namePlaceholder: f("namePlaceholder"),
    required: f("required"),
    phone: f("phone"),
    phonePlaceholder: f("phonePlaceholder"),
    interest: f("interest"),
    interestPlaceholder: f("interestPlaceholder"),
    other: f("other"),
    date: f("date"),
    message: f("message"),
    messagePlaceholder: f("messagePlaceholder"),
    submit: f("submit"),
    greetingTemplate: f("greeting", { name: "{name}" }),
    interestTemplate: f("lineInterest", { value: "{value}" }),
    phoneTemplate: f("linePhone", { value: "{value}" }),
    dateTemplate: f("lineDate", { value: "{value}" }),
    messageTemplate: f("lineMessage", { value: "{value}" }),
  };
}
