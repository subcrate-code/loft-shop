"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag } from "lucide-react";

import { formatEuro } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

export function FloatingCart() {
  const pathname = usePathname();
  const { locale, dictionary } = useLocale();
  const { cartCount, cartTotal, pulseKey } = useCart();

  if (!cartCount || pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/success")) {
    return null;
  }

  return (
    <motion.div
      key={pulseKey}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: [1, 1.02, 1] }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 z-50 sm:inset-x-auto sm:right-6"
      style={{ bottom: "calc(1rem + var(--tg-safe-bottom))" }}
    >
      <Link
        href="/cart"
        className="flex w-full items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-white/[0.1] px-4 py-3 text-white shadow-glass backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white/[0.14] sm:w-auto"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-white text-slate-900">
            <ShoppingBag className="size-4" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">{dictionary.floatingCart.title}</div>
            <div className="font-medium">
              {cartCount} • {formatEuro(cartTotal, locale)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-white/70">
          <span className="hidden sm:inline">{dictionary.floatingCart.open}</span>
          <ChevronRight className="size-4" />
        </div>
      </Link>
    </motion.div>
  );
}
