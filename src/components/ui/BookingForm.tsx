"use client";

import { useId, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./BrandIcons";
import { buttonClass } from "./Button";

export type OptionGroup = { label: string; options: string[] };

export type BookingFormLabels = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  required: string;
  phone: string;
  phonePlaceholder: string;
  interest: string;
  interestPlaceholder: string;
  other: string;
  date: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  greetingTemplate: string;
  interestTemplate: string;
  phoneTemplate: string;
  dateTemplate: string;
  messageTemplate: string;
};

type Props = {
  groups: OptionGroup[];
  defaultInterest?: string;
  title?: string;
  showDate?: boolean;
  labels: BookingFormLabels;
};

/** Collects details and opens WhatsApp with a ready-to-send message. No data is stored. */
export function BookingForm({ groups, defaultInterest = "", title, showDate = true, labels }: Props) {
  const id = useId();
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    if (!name) {
      setError(true);
      e.currentTarget.querySelector<HTMLInputElement>("input[name=name]")?.focus();
      return;
    }
    setError(false);

    const interest = get("interest");
    const phone = get("phone");
    const date = get("date");
    const message = get("message");

    const lines = [
      labels.greetingTemplate.replace("{name}", name),
      interest && labels.interestTemplate.replace("{value}", interest),
      phone && labels.phoneTemplate.replace("{value}", phone),
      date && labels.dateTemplate.replace("{value}", date),
      message && labels.messageTemplate.replace("{value}", message),
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-2 block w-full min-h-12 rounded-xl border border-line bg-ivory px-4 text-base text-ink placeholder:text-muted/60 transition focus:border-rose focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose/10";
  const label = "text-sm font-medium text-plum";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line/60 sm:p-8"
    >
      <h2 className="text-2xl font-semibold sm:text-3xl">{title ?? labels.title}</h2>
      <p className="mt-1 text-sm text-muted">{labels.subtitle}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor={`${id}-name`} className={label}>
            {labels.name} <span className="text-rose">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            aria-invalid={error || undefined}
            aria-describedby={error ? `${id}-err` : undefined}
            className={`${field} ${error ? "border-rose ring-4 ring-rose/10" : ""}`}
          />
          {error && (
            <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-rose">
              {labels.required}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            {labels.phone}
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={labels.phonePlaceholder}
            className={field}
          />
        </div>
        <div className={showDate ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-interest`} className={label}>
            {labels.interest}
          </label>
          <select id={`${id}-interest`} name="interest" defaultValue={defaultInterest} className={field}>
            <option value="">{labels.interestPlaceholder}</option>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </optgroup>
            ))}
            <option>{labels.other}</option>
          </select>
        </div>
        {showDate && (
          <div>
            <label htmlFor={`${id}-date`} className={label}>
              {labels.date}
            </label>
            <input id={`${id}-date`} name="date" type="date" className={field} />
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            {labels.message}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            placeholder={labels.messagePlaceholder}
            className={`${field} min-h-28 resize-y py-3`}
          />
        </div>
      </div>

      <button type="submit" className={buttonClass("primary", "lg", "mt-6 w-full")}>
        <WhatsAppIcon size={19} /> {labels.submit}
      </button>
    </form>
  );
}
