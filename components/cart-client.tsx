"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { CatalogEmpty } from "@/components/catalog-empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBundleCount, replaceTemplate } from "@/lib/i18n";
import { formatEuro } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

export function CartClient() {
  const { locale, dictionary } = useLocale();
  const { items, hydrated, cartTotal, cartUnits, updateQuantity, removeItem, clearCart } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (!items.length) {
    return <CatalogEmpty title={dictionary.cart.emptyTitle} copy={dictionary.cart.emptyCopy} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-4 shadow-glass backdrop-blur-2xl sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative h-28 w-full overflow-hidden rounded-[24px] border border-white/8 bg-black/20 sm:w-32">
                <Image src={item.previewImage} alt={item.productTitle} fill className="object-cover" sizes="128px" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xl font-semibold text-white">{item.productTitle}</div>
                    <div className="mt-1 text-sm text-white/50">
                      {replaceTemplate(dictionary.cart.perBundle, {
                        count: formatBundleCount(locale, item.bundleQuantity),
                        amount: formatEuro(item.bundlePrice, locale)
                      })}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-sm text-white/45">{dictionary.cart.amount}</div>
                    <div className="mt-1 text-2xl font-semibold text-white">{formatEuro(item.bundlePrice * item.quantity, locale)}</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.selectedOptions.map((option, index) => (
                    <Badge key={`${item.id}-${index}`}>{option}</Badge>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <Minus className="size-4" />
                    </button>

                    <div className="min-w-10 text-center text-sm font-medium text-white">{item.quantity}</div>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-red-200"
                  >
                    <Trash2 className="size-4" /> {dictionary.cart.remove}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-[30px] border border-white/10 bg-white/6 p-5 shadow-glass backdrop-blur-2xl sm:sticky sm:top-28 sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">{dictionary.cart.total}</div>
        <h2 className="mt-3 text-2xl font-semibold text-white">{dictionary.header.cart}</h2>

        <div className="mt-6 space-y-4 rounded-[24px] border border-white/8 bg-black/20 p-4">
          <div className="flex items-center justify-between text-sm text-white/55">
            <span>{dictionary.cart.bundles}</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-white/55">
            <span>{dictionary.cart.units}</span>
            <span>{cartUnits}</span>
          </div>

          <div className="flex items-center justify-between border-t border-white/8 pt-4 text-white">
            <span className="text-sm text-white/55">{dictionary.cart.grandTotal}</span>
            <span className="text-3xl font-semibold">{formatEuro(cartTotal, locale)}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link href="/checkout">
            <Button size="lg" className="w-full">
              {dictionary.cart.toCheckout}
            </Button>
          </Link>

          <Button variant="secondary" size="lg" className="w-full" onClick={clearCart}>
            {dictionary.cart.clearCart}
          </Button>
        </div>
      </aside>
    </div>
  );
}
