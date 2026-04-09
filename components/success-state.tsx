"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Clock3, MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { useLocale } from "@/providers/locale-provider";

export function SuccessState() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const { dictionary } = useLocale();
  const orderId = searchParams.get("order");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl rounded-[34px] border border-white/[0.10] bg-white/[0.06] p-6 text-center shadow-glass backdrop-blur-2xl sm:p-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex size-20 items-center justify-center rounded-full border border-ok/20 bg-ok/[0.15] text-emerald-200"
      >
        <Check className="size-10" />
      </motion.div>

      <div className="mt-6 text-[11px] uppercase tracking-[0.26em] text-white/[0.40]">{dictionary.success.kicker}</div>
      <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">{dictionary.success.title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/[0.55]">{dictionary.success.copy}</p>

      {orderId ? (
        <div className="mt-6 inline-flex rounded-full border border-white/[0.10] bg-white/[0.08] px-4 py-2 text-sm text-white">
          {orderId}
        </div>
      ) : null}

      <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
        <InfoCard
          icon={<Clock3 className="size-4" />}
          title={dictionary.success.details.hoursTitle}
          value={dictionary.success.details.hoursValue}
        />
        <InfoCard
          icon={<MessageCircleMore className="size-4" />}
          title={dictionary.success.details.responseTitle}
          value={dictionary.success.details.responseValue}
        />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/catalog">
          <Button size="lg" className="w-full sm:w-auto">
            {dictionary.success.backCatalog}
          </Button>
        </Link>
        <Link href="/">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            {dictionary.success.backHome}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/[0.10] bg-black/20 p-4 text-left">
      <div className="flex items-center gap-2 text-sm text-white/[0.45]">
        <span className="text-white/[0.35]">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
    </div>
  );
}
