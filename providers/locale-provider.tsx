"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import { getDictionary } from "@/lib/i18n";
import { LOCALE_COOKIE, isLocale, type Locale } from "@/lib/locale-config";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: ReturnType<typeof getDictionary>;
} | null>(null);

const oneYearInSeconds = 60 * 60 * 24 * 365;

function persistLocale(locale: Locale) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYearInSeconds}; samesite=lax`;
  window.localStorage.setItem(LOCALE_COOKIE, locale);
}

export function LocaleProvider({ initialLocale, children }: PropsWithChildren<{ initialLocale: Locale }>) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = typeof window === "undefined" ? null : window.localStorage.getItem(LOCALE_COOKIE);

    if (isLocale(stored) && stored !== initialLocale) {
      setLocaleState(stored);
      persistLocale(stored);
      router.refresh();
      return;
    }

    persistLocale(initialLocale);
  }, [initialLocale, router]);

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      setLocaleState(nextLocale);
      persistLocale(nextLocale);
      router.refresh();
    },
    [locale, router]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dictionary: getDictionary(locale)
    }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
