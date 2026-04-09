"use client";

import Link from "next/link";

import { useLocale } from "@/providers/locale-provider";

export function SiteFooter() {
  const { dictionary } = useLocale();

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-xl">
          <div className="font-medium text-white">Loft Vape Shop</div>
          <div className="mt-2 text-sm leading-6 text-white/[0.45]">{dictionary.footer.copy}</div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/[0.55]">
          <Link href="/catalog" className="transition hover:text-white">
            {dictionary.footer.links.catalog}
          </Link>
          <Link href="/cart" className="transition hover:text-white">
            {dictionary.footer.links.cart}
          </Link>
          <Link href="/checkout" className="transition hover:text-white">
            {dictionary.footer.links.checkout}
          </Link>
        </div>
      </div>
    </footer>
  );
}
