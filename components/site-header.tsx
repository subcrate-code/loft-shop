"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { dictionary } = useLocale();

  const nav = [
    { href: "/", label: dictionary.header.nav.home },
    { href: "/catalog", label: dictionary.header.nav.catalog }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/75 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6 lg:px-8" style={{ paddingTop: "max(0.75rem, var(--tg-safe-top))" }}>
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.10] text-sm font-semibold text-white shadow-glass transition group-hover:scale-[1.03] group-hover:bg-white/[0.14] sm:size-11">
              LS
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-[0.18em] text-white">Loft Shop</div>
              <div className="truncate text-xs text-white/[0.45]">{dictionary.header.tagline}</div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-2">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm text-white/[0.60] transition hover:bg-white/[0.06] hover:text-white",
                      active && "bg-white/[0.10] text-white shadow-inset"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <LocaleSwitcher />
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block md:hidden">
              <LocaleSwitcher />
            </div>
            <Link href="/cart">
              <Button variant="secondary" size="sm" className="relative">
                <ShoppingBag className="size-4" />
                {dictionary.header.cart}
                {cartCount > 0 ? (
                  <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[11px] font-semibold text-slate-900">
                    {cartCount}
                  </span>
                ) : null}
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 md:hidden">
          <nav className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto pb-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white/[0.60] transition",
                    active && "border-white/[0.16] bg-white/[0.10] text-white shadow-inset"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="sm:hidden">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
