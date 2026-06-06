import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Stable number formatting for SSR + client (avoids locale hydration mismatches). */
export function formatNumber(value, locale = "en-US") {
  return Number(value).toLocaleString(locale);
}
