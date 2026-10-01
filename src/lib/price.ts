import type { ServiceItem } from "@/content/site";

/** Lowest listed price in a category, e.g. "₹300". */
export function startingPrice(items: ServiceItem[]) {
  const values = items
    .map((i) => Number(i.price.replace(/[^\d]/g, "")))
    .filter((n) => n > 0);
  if (!values.length) return null;
  return `₹${Math.min(...values).toLocaleString("en-IN")}`;
}
