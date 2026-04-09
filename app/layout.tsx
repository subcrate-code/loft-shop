import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { FloatingCart } from "@/components/floating-cart";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TelegramBoot } from "@/components/telegram-boot";
import { getRequestLocale } from "@/lib/locale";
import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Loft Shop",
  description: "Loft Shop — collections with clear pricing, flavour bundles and fast checkout.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} data-device="mobile" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg text-ink antialiased`}>
        <Script src="https://telegram.org/js/telegram-web-app.js?62" strategy="beforeInteractive" />
        <AppProviders initialLocale={locale}>
          <TelegramBoot />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <FloatingCart />
        </AppProviders>
      </body>
    </html>
  );
}
