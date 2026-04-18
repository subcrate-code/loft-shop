"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type LocalizedProduct, getProductImage } from "@/data/products";
import { formatBundleCount, formatFlavourCount, replaceTemplate } from "@/lib/i18n";
import { getBundlePerUnit, getBundleSavings } from "@/lib/pricing";
import { triggerTelegramHaptic } from "@/lib/telegram";
import { formatEuro } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

function getDefaultSelections(product: LocalizedProduct, quantity: number) {
  return product.options.slice(0, quantity).map((entry) => entry.value);
}

export function AddToCartPanel({ product }: { product: LocalizedProduct }) {
  const { locale, dictionary } = useLocale();
  const defaultBundle = product.bundles.find((bundle) => bundle.recommended) || product.bundles[0];
  const [activeBundleQty, setActiveBundleQty] = useState(defaultBundle.quantity);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => getDefaultSelections(product, defaultBundle.quantity));
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  const activeBundle = useMemo(
    () => product.bundles.find((bundle) => bundle.quantity === activeBundleQty) || defaultBundle,
    [activeBundleQty, defaultBundle, product.bundles]
  );

  const savings = getBundleSavings(product, activeBundle);
  const filteredOptions = useMemo(() => {
    if (!search) return product.options;
    return product.options.filter((option) => option.value.toLowerCase().includes(search.toLowerCase()));
  }, [product.options, search]);

  useEffect(() => {
    setSelectedOptions((current) => {
      const next = current.slice(0, activeBundle.quantity);
      if (next.length === activeBundle.quantity) return next;
      const fallback = getDefaultSelections(product, activeBundle.quantity);
      return [...next, ...fallback.slice(next.length, activeBundle.quantity)];
    });
  }, [activeBundle.quantity, product]);

  useEffect(() => {
    if (activeSlot === null) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [activeSlot]);

  const allSlotsFilled = selectedOptions.length === activeBundle.quantity && selectedOptions.every(Boolean);

  function chooseBundle(quantity: number) {
    setActiveBundleQty(quantity);
    setSearch("");
  }

  function updateSlot(value: string) {
    if (activeSlot === null) return;
    setSelectedOptions((current) => {
      const next = [...current];
      next[activeSlot] = value;
      return next;
    });
    setActiveSlot(null);
    setSearch("");
  }

  function handleAdd() {
    if (!allSlotsFilled) {
      toast.error(replaceTemplate(dictionary.addToCart.selectFirst, { count: formatFlavourCount(locale, activeBundle.quantity) }));
      return;
    }

    addItem({
      productSlug: product.slug,
      productTitle: product.title,
      bundleQuantity: activeBundle.quantity,
      bundlePrice: activeBundle.price,
      selectedOptions
    });

    triggerTelegramHaptic("medium");
    toast.success(replaceTemplate(dictionary.addToCart.added, { title: product.title }), {
      description: replaceTemplate(dictionary.addToCart.addedDescription, {
        count: formatBundleCount(locale, activeBundle.quantity),
        amount: formatEuro(activeBundle.price, locale)
      })
    });
  }

  return (
    <div className="space-y-6 rounded-[30px] border border-white/10 bg-white/6 p-4 shadow-glass backdrop-blur-2xl sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{product.heroLabel}</Badge>
        {product.note ? <Badge className="border-ok/20 bg-ok/10 text-emerald-200">{product.note}</Badge> : null}
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">{dictionary.addToCart.bundles}</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {product.bundles.map((bundle) => {
            const isActive = bundle.quantity === activeBundle.quantity;
            const bundleSavings = getBundleSavings(product, bundle);

            return (
              <button
                key={bundle.quantity}
                type="button"
                onClick={() => chooseBundle(bundle.quantity)}
                className={`rounded-[24px] border p-4 text-left transition ${
                  isActive
                    ? "border-white/20 bg-white/10 shadow-inset"
                    : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/6"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{formatBundleCount(locale, bundle.quantity)}</div>
                    <div className="mt-1 text-xs text-white/45">{dictionary.addToCart.buildBundle}</div>
                  </div>

                  {bundle.recommended ? (
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-950">{dictionary.addToCart.hit}</span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="text-3xl font-semibold text-white">{formatEuro(bundle.price, locale)}</div>
                  <div className="text-right text-sm text-white/50">
                    <div>{replaceTemplate(dictionary.addToCart.perItem, { amount: formatEuro(getBundlePerUnit(bundle), locale) })}</div>
                    {bundleSavings > 0 ? <div>{replaceTemplate(dictionary.addToCart.save, { amount: formatEuro(bundleSavings, locale) })}</div> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">{dictionary.addToCart.composition}</div>
            <div className="mt-1 text-sm text-white/50">
              {replaceTemplate(dictionary.addToCart.chooseFlavours, { count: formatFlavourCount(locale, activeBundle.quantity) })}
            </div>
          </div>

          <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80">
            <Sparkles className="size-4" />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: activeBundle.quantity }).map((_, index) => {
            const option = product.options.find((entry) => entry.value === selectedOptions[index]);
            const image = getProductImage(product.slug, selectedOptions[index] || product.options[index]?.value || product.options[0].value);

            return (
              <button
                type="button"
                key={index}
                onClick={() => setActiveSlot(index)}
                className="group flex items-center gap-4 rounded-[22px] border border-white/8 bg-white/4 p-3 text-left transition hover:border-white/15 hover:bg-white/8"
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/6 sm:h-[72px] sm:w-16">
                  <img
                    src={image}
                    alt={option?.value || dictionary.addToCart.chooseFlavour}
                    className="h-full w-full object-contain p-1"
                    loading="eager"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                    {replaceTemplate(dictionary.addToCart.position, { index: index + 1 })}
                  </div>
                  <div className="mt-1 truncate text-sm font-medium text-white">{option?.value || dictionary.addToCart.chooseFlavour}</div>
                  <div className="mt-1 text-xs text-white/45">{option?.note || option?.emoji || dictionary.addToCart.tapToReplace}</div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/8 px-2 py-1 text-[11px] text-white/60 transition group-hover:text-white/80">
                  {dictionary.addToCart.change}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 rounded-[24px] border border-white/8 bg-white/5 p-4 sm:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">{dictionary.addToCart.total}</div>
          <div className="mt-2 text-3xl font-semibold text-white">{formatEuro(activeBundle.price, locale)}</div>
          <div className="mt-1 text-sm text-white/55">
            {formatFlavourCount(locale, activeBundle.quantity)} • {replaceTemplate(dictionary.addToCart.perItem, {
              amount: formatEuro(getBundlePerUnit(activeBundle), locale)
            })}
          </div>

          {savings > 0 ? (
            <div className="mt-3 inline-flex rounded-full bg-ok/15 px-3 py-1 text-xs font-medium text-emerald-200">
              {replaceTemplate(dictionary.addToCart.save, { amount: formatEuro(savings, locale) })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[20px] border border-white/8 bg-black/20 p-4">
          <div>
            <div className="text-sm text-white/55">{dictionary.addToCart.selected}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedOptions.map((option, index) => (
                <Badge key={`${option}-${index}`}>{option}</Badge>
              ))}
            </div>
          </div>

          <Button size="lg" onClick={handleAdd} disabled={!allSlotsFilled} className="w-full">
            {replaceTemplate(dictionary.addToCart.addToCart, { amount: formatEuro(activeBundle.price, locale) })}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {activeSlot !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSlot(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[88svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[30px] border border-white/10 bg-[#0c1018] shadow-glow"
            >
              <div className="sticky top-0 z-10 border-b border-white/8 bg-[#0c1018]/95 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-3">
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {replaceTemplate(dictionary.addToCart.chooseForSlot, { index: activeSlot + 1 })}
                    </div>
                    <div className="mt-1 text-sm text-white/45">{dictionary.addToCart.modalCopy}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSlot(null)}
                    className="rounded-full border border-white/10 bg-white/6 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4">
                    <Search className="size-4 text-white/35" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={dictionary.addToCart.searchPlaceholder}
                      className="h-12 w-full bg-transparent text-base text-white outline-none placeholder:text-white/30 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {filteredOptions.map((option) => {
                  const selected = selectedOptions[activeSlot] === option.value;
                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => updateSlot(option.value)}
                      className={`flex items-center gap-4 rounded-[22px] border p-3 text-left transition ${
                        selected
                          ? "border-white/20 bg-white/10 shadow-inset"
                          : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/8"
                      }`}
                    >
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-[72px] sm:w-16">
                        <img
                          src={getProductImage(product.slug, option.value)}
                          alt={option.value}
                          className="h-full w-full object-contain p-1"
                          loading="eager"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-white">{option.value}</div>
                        <div className="mt-1 text-xs text-white/45">{option.note || option.emoji || product.shortTitle}</div>
                      </div>

                      {selected ? (
                        <div className="flex size-8 items-center justify-center rounded-full bg-white text-slate-950">
                          <Check className="size-4" />
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
