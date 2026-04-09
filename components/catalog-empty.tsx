"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/providers/locale-provider";

export function CatalogEmpty({ title, copy }: { title: string; copy: string }) {
  const { dictionary } = useLocale();

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/6 p-8 text-center shadow-glass backdrop-blur-2xl">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/55">{copy}</p>
      <div className="mt-6">
        <Link href="/catalog">
          <Button className="w-full sm:w-auto">{dictionary.notFound.openCatalog}</Button>
        </Link>
      </div>
    </div>
  );
}
