import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/locale-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuro(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2
  }).format(value);
}

export function slugifyImageName(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeTelegramUsername(value: string) {
  return value.trim().replace(/^@+/, "").toLowerCase();
}

export function isValidTelegramUsername(value: string) {
  const username = normalizeTelegramUsername(value);
  return /^[a-z0-9_]{3,32}$/i.test(username);
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const map = new Map<string, T>();

  for (const item of items) {
    map.set(getKey(item), item);
  }

  return Array.from(map.values());
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
