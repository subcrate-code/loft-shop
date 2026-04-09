"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPinned,
  MessageCircleMore,
  Phone,
  Sparkles,
  Store,
  Truck,
  User
} from "lucide-react";
import { toast } from "sonner";

import { CatalogEmpty } from "@/components/catalog-empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { formatBundleCount, replaceTemplate } from "@/lib/i18n";
import {
  getAppleMapsDirectionsUrl,
  getFulfillmentFee,
  getGoogleMapsDirectionsUrl,
  getPickupMapEmbedUrl,
  getWazeDirectionsUrl,
  type FulfillmentMethod
} from "@/lib/storefront";
import { cn, formatEuro } from "@/lib/utils";
import { getTelegramUser, getTelegramWebApp, triggerTelegramHaptic } from "@/lib/telegram";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

const panelTransition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1]
} as const;

export function CheckoutForm() {
  const router = useRouter();
  const { locale, dictionary } = useLocale();
  const { items, hydrated, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    telegramUsername: "",
    fulfillmentMethod: "delivery" as FulfillmentMethod,
    address: ""
  });

  const deliveryFee = getFulfillmentFee(form.fulfillmentMethod);
  const grandTotal = cartTotal + deliveryFee;
  const isPickup = form.fulfillmentMethod === "pickup";
  const methodLabel = isPickup ? dictionary.checkout.pickupTitle : dictionary.checkout.deliveryTitle;
  const addressLabel = isPickup ? dictionary.checkout.pickupAddressValue : form.address.trim() || dictionary.checkout.addressHint;

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (!telegramUser) return;

    setForm((current) => ({
      ...current,
      firstName: current.firstName || telegramUser.first_name || "",
      lastName: current.lastName || telegramUser.last_name || "",
      telegramUsername: current.telegramUsername || telegramUser.username || ""
    }));
  }, []);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (!webApp?.MainButton || !hydrated || !items.length) return;

    const handleClick = () => formRef.current?.requestSubmit();
    webApp.MainButton.setText(replaceTemplate(dictionary.checkout.submit, { amount: formatEuro(grandTotal, locale) }));
    webApp.MainButton.show();
    webApp.MainButton.enable();
    webApp.MainButton.onClick(handleClick);

    return () => {
      webApp.MainButton?.offClick(handleClick);
      webApp.MainButton?.hide();
    };
  }, [dictionary.checkout.submit, grandTotal, hydrated, items.length, locale]);

  const orderPreview = useMemo(
    () => items.map((item) => `${item.productTitle} • ${formatBundleCount(locale, item.bundleQuantity)} × ${item.quantity}`).join("\n"),
    [items, locale]
  );

  const routeLinks = useMemo(
    () => [
      {
        label: dictionary.checkout.routeGoogle,
        href: getGoogleMapsDirectionsUrl()
      },
      {
        label: dictionary.checkout.routeWaze,
        href: getWazeDirectionsUrl()
      },
      {
        label: dictionary.checkout.routeApple,
        href: getAppleMapsDirectionsUrl()
      }
    ],
    [dictionary.checkout.routeApple, dictionary.checkout.routeGoogle, dictionary.checkout.routeWaze]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;

    setLoading(true);
    getTelegramWebApp()?.MainButton?.showProgress();

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale,
          customer: {
            ...form,
            address: form.fulfillmentMethod === "delivery" ? form.address : ""
          },
          cart: items.map((item) => ({
            id: item.id,
            productSlug: item.productSlug,
            bundleQuantity: item.bundleQuantity,
            quantity: item.quantity,
            selectedOptions: item.selectedOptions
          }))
        })
      });

      const data = (await response.json()) as { orderId?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || dictionary.checkout.sendFailed);
      }

      triggerTelegramHaptic("heavy");
      toast.success(dictionary.checkout.sent, { description: `#${data.orderId}` });
      router.push(`/success?order=${data.orderId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : dictionary.checkout.sendFailed;
      toast.error(message);
      getTelegramWebApp()?.HapticFeedback?.notificationOccurred("error");
    } finally {
      setLoading(false);
      getTelegramWebApp()?.MainButton?.hideProgress();
    }
  }

  if (!hydrated) {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="h-[760px]" />
        <Skeleton className="h-[520px]" />
      </div>
    );
  }

  if (!items.length) {
    return <CatalogEmpty title={dictionary.checkout.emptyTitle} copy={dictionary.checkout.emptyCopy} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={panelTransition}
        className="rounded-[30px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass backdrop-blur-2xl sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{dictionary.checkout.fastCheckout}</Badge>
          <Badge className="border-white/[0.08] bg-white/[0.04] text-white/[0.55]">{dictionary.checkout.noAccount}</Badge>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label={dictionary.checkout.fields.firstName} icon={<User className="size-4" />}>
            <Input
              value={form.firstName}
              onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
              placeholder={dictionary.checkout.placeholders.firstName}
              required
            />
          </Field>

          <Field label={dictionary.checkout.fields.lastName} icon={<User className="size-4" />}>
            <Input
              value={form.lastName}
              onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
              placeholder={dictionary.checkout.placeholders.lastName}
              required
            />
          </Field>

          <Field label={dictionary.checkout.fields.phone} icon={<Phone className="size-4" />}>
            <Input
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              placeholder={dictionary.checkout.placeholders.phone}
              required
            />
          </Field>

          <Field label={dictionary.checkout.fields.email} icon={<Mail className="size-4" />}>
            <Input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder={dictionary.checkout.placeholders.email}
              required
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label={dictionary.checkout.fields.telegram} icon={<Sparkles className="size-4" />}>
              <Input
                value={form.telegramUsername}
                onChange={(event) => setForm((current) => ({ ...current, telegramUsername: event.target.value.replace(/^@+/, "") }))}
                placeholder={dictionary.checkout.placeholders.telegram}
                required
              />
            </Field>
          </div>
        </div>

        <motion.section
          layout
          className="mt-6 rounded-[28px] border border-white/[0.08] bg-black/20 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{dictionary.checkout.fulfillmentTitle}</div>
              <div className="mt-1 text-sm text-white/[0.45]">{dictionary.checkout.fulfillmentCopy}</div>
            </div>

            <div className="grid gap-2 sm:min-w-[360px] sm:grid-cols-2">
              <InfoPill icon={<Clock3 className="size-4" />} label={dictionary.checkout.workingHoursTitle} value={dictionary.checkout.workingHoursValue} />
              <InfoPill
                icon={<MessageCircleMore className="size-4" />}
                label={dictionary.checkout.responseTitle}
                value={dictionary.checkout.responseValue}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <FulfillmentCard
              selected={form.fulfillmentMethod === "delivery"}
              title={dictionary.checkout.deliveryTitle}
              copy={dictionary.checkout.deliveryCopy}
              price={dictionary.checkout.deliveryPrice}
              icon={<Truck className="size-5" />}
              onClick={() => setForm((current) => ({ ...current, fulfillmentMethod: "delivery" }))}
              selectedLabel={dictionary.checkout.selected}
            />
            <FulfillmentCard
              selected={form.fulfillmentMethod === "pickup"}
              title={dictionary.checkout.pickupTitle}
              copy={dictionary.checkout.pickupCopy}
              price={dictionary.checkout.pickupPrice}
              icon={<Store className="size-5" />}
              onClick={() => setForm((current) => ({ ...current, fulfillmentMethod: "pickup" }))}
              selectedLabel={dictionary.checkout.selected}
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {isPickup ? (
              <motion.div
                key="pickup"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={panelTransition}
                className="mt-4 space-y-4"
              >
                <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.checkout.pickupAddressLabel}</div>
                      <div className="mt-2 text-sm leading-7 text-white">{dictionary.checkout.pickupAddressValue}</div>
                    </div>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.08] text-white/90 shadow-inset animate-pulseSoft">
                      <MapPinned className="size-5" />
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.04] shadow-glass">
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{dictionary.checkout.mapTitle}</div>
                      <div className="mt-1 text-xs text-white/[0.45]">{dictionary.checkout.mapCopy}</div>
                    </div>
                    <div className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/[0.45]">
                      {dictionary.checkout.mapBadge}
                    </div>
                  </div>

                  <div className="relative h-[190px] w-full overflow-hidden bg-black/30">
                    <iframe
                      title={dictionary.checkout.mapTitle}
                      src={getPickupMapEmbedUrl()}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      className="h-full w-full opacity-90"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09101a] via-[#09101a]/40 to-transparent" />
                  </div>

                  <div className="grid gap-2 p-3 sm:grid-cols-3">
                    {routeLinks.map((link) => (
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between rounded-2xl border border-white/[0.10] bg-white/[0.05] px-4 py-3 text-sm text-white transition hover:border-white/[0.18] hover:bg-white/[0.08]"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="size-4 text-white/[0.55]" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={panelTransition}
                className="mt-4"
              >
                <Field label={dictionary.checkout.fields.address} icon={<Truck className="size-4" />}>
                  <Textarea
                    value={form.address}
                    onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                    placeholder={dictionary.checkout.placeholders.address}
                    required={form.fulfillmentMethod === "delivery"}
                  />
                </Field>
                <div className="mt-3 text-sm leading-6 text-white/[0.45]">{dictionary.checkout.addressHint}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <div className="mt-6 flex flex-col gap-4">
          <p className="text-sm leading-6 text-white/[0.45]">{dictionary.checkout.reviewCopy}</p>

          <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto sm:self-start">
            {loading ? dictionary.checkout.sending : replaceTemplate(dictionary.checkout.submit, { amount: formatEuro(grandTotal, locale) })}
          </Button>
        </div>
      </motion.form>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...panelTransition, delay: 0.05 }}
        className="space-y-4"
      >
        <div className="rounded-[30px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass backdrop-blur-2xl sm:p-6">
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.40]">{dictionary.checkout.yourOrder}</div>
          <h2 className="mt-3 text-2xl font-semibold text-white">{dictionary.checkout.almostReady}</h2>

          <div className="mt-5 whitespace-pre-line rounded-[24px] border border-white/[0.08] bg-black/20 p-4 text-sm leading-7 text-white/[0.70]">
            {orderPreview}
          </div>

          <div className="mt-5 rounded-[24px] border border-white/[0.08] bg-black/20 p-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/[0.45]">{dictionary.checkout.summaryMethod}</span>
              <span className="max-w-[60%] text-right text-white">{methodLabel}</span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <span className="text-white/[0.45]">{dictionary.checkout.summaryAddress}</span>
              <span className="max-w-[60%] text-right leading-6 text-white/[0.75]">{addressLabel}</span>
            </div>
            <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4">
              <div className="flex items-center justify-between gap-4 text-white/[0.65]">
                <span>{dictionary.checkout.summarySubtotal}</span>
                <span>{formatEuro(cartTotal, locale)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-white/[0.65]">
                <span>{isPickup ? dictionary.checkout.summaryPickup : dictionary.checkout.summaryDelivery}</span>
                <span>{isPickup ? dictionary.checkout.summaryFree : formatEuro(deliveryFee, locale)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4 text-white">
                <span className="text-sm text-white/[0.45]">{dictionary.cart.grandTotal}</span>
                <span className="text-3xl font-semibold">{formatEuro(grandTotal, locale)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass backdrop-blur-2xl sm:p-6">
          <div className="text-sm font-semibold text-white">{dictionary.checkout.beforeSubmit}</div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/[0.55]">
            <li>• {dictionary.checkout.bulletPhone}</li>
            <li>• {dictionary.checkout.bulletMix}</li>
            <li>• {dictionary.checkout.bulletAddress}</li>
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoTile icon={<Clock3 className="size-4" />} title={dictionary.checkout.workingHoursTitle} value={dictionary.checkout.workingHoursValue} />
            <InfoTile
              icon={<MessageCircleMore className="size-4" />}
              title={dictionary.checkout.responseTitle}
              value={dictionary.checkout.responseValue}
            />
          </div>

          <div className="mt-5">
            <Link href="/cart" className="text-sm text-white transition hover:text-white/[0.70]">
              {dictionary.checkout.backToCart}
            </Link>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function Field({
  label,
  icon,
  children
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2 text-sm text-white/[0.65]">
        <span className="text-white/[0.35]">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </label>
  );
}

function FulfillmentCard({
  selected,
  title,
  copy,
  price,
  icon,
  onClick,
  selectedLabel
}: {
  selected: boolean;
  title: string;
  copy: string;
  price: string;
  icon: React.ReactNode;
  onClick: () => void;
  selectedLabel: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={cn(
        "rounded-[24px] border p-4 text-left transition",
        selected
          ? "border-white/[0.20] bg-white/[0.10] shadow-inset"
          : "border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14] hover:bg-white/[0.06]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.08] text-white/90">
          {icon}
        </div>
        <div className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1 text-xs font-medium text-white/[0.70]">{price}</div>
      </div>

      <div className="mt-4 text-base font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/[0.55]">{copy}</div>

      <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/[0.35]">{selected ? selectedLabel : ""}</div>
    </motion.button>
  );
}

function InfoPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.04] px-3 py-3">
      <div className="flex items-center gap-2 text-xs text-white/[0.42]">
        <span className="text-white/[0.32]">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function InfoTile({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-black/20 p-4">
      <div className="flex items-center gap-2 text-sm text-white/[0.45]">
        <span className="text-white/[0.35]">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
    </div>
  );
}
