"use client";

import { type PropsWithChildren } from "react";
import { Toaster } from "sonner";

import type { Locale } from "@/lib/locale-config";
import { CartProvider } from "@/providers/cart-provider";
import { LocaleProvider } from "@/providers/locale-provider";

export function AppProviders({ initialLocale, children }: PropsWithChildren<{ initialLocale: Locale }>) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <CartProvider>
        {children}
        <Toaster
          position="top-center"
          richColors
          theme="dark"
          toastOptions={{
            className: "!rounded-2xl !border !border-white/10 !bg-surface/95 !text-ink !shadow-glass"
          }}
        />
      </CartProvider>
    </LocaleProvider>
  );
}
