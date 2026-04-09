import "server-only";

import { cookies, headers } from "next/headers";

import { LOCALE_COOKIE, isLocale, type Locale } from "@/lib/locale-config";

function detectLocaleFromHeader(value?: string | null): Locale {
  const normalized = (value || "").toLowerCase();
  return normalized.includes("ru") ? "ru" : "en";
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return detectLocaleFromHeader(headerStore.get("accept-language"));
}
