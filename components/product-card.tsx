"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { type LocalizedProduct, getProductImage } from "@/data/products";
import { formatBundleCount, replaceTemplate } from "@/lib/i18n";
import { getBundleByQuantity, getBundleSavings, getCatalogStartingPrice } from "@/lib/pricing";
import { cn, formatEuro } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

export function ProductCard({ product }: { product: LocalizedProduct }) {
  const { locale, dictionary } = useLocale();
  const recommended = product.bundles.find((bundle) => bundle.recommended) || product.bundles[product.bundles.length - 1];
  const savings = getBundleSavings(product, recommended);
  const preview = product.options.slice(0, 3);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
      <Link
        href={`/catalog/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-4 shadow-glass backdrop-blur-2xl transition hover:border-white/15 hover:bg-white/8 sm:p-5"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.26em] text-white/40">{product.heroLabel}</div>
            <h3 className="text-xl font-semibold text-white">{product.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">{product.subtitle}</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/8 p-2 text-white/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {preview.map((option, index) => (
            <div
              key={option.value}
              className={cn("overflow-hidden rounded-2xl border border-white/8 bg-black/20", index === 2 && "hidden sm:block")}
            >
              <Image
                src={getProductImage(product.slug, option.value)}
                alt={option.value}
                width={320}
                height={360}
                className="aspect-[4/5] h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.badges.slice(0, 3).map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/8 bg-white/5 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">{dictionary.productCard.from}</div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatEuro(getCatalogStartingPrice(product), locale)}</div>
            </div>
            <div className="text-right text-sm text-white/55">
              <div>{dictionary.productCard.popularBundle}</div>
              <div className="text-white/80">
                {formatBundleCount(locale, recommended.quantity)} • {formatEuro(getBundleByQuantity(product, recommended.quantity)?.price || recommended.price, locale)}
              </div>
            </div>
          </div>

          {savings > 0 ? (
            <div className="mt-3 inline-flex rounded-full bg-ok/15 px-3 py-1 text-xs font-medium text-emerald-200">
              {replaceTemplate(dictionary.productCard.savingsOnBundle, { amount: formatEuro(savings, locale) })}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
