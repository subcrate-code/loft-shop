"use client";

import { useLocale } from "@/providers/locale-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale-config";

const locales: Locale[] = ["ru", "en"];

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-inset">
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/45 transition",
            locale === item && "bg-white text-slate-950 shadow-sm"
          )}
          aria-pressed={locale === item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
