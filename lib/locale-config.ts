export type Locale = "ru" | "en";

export const LOCALE_COOKIE = "loft_locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "en";
}
