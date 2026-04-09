import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";

export default async function NotFound() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="content-wrap py-24">
      <div className="rounded-[34px] border border-white/[0.10] bg-white/[0.06] p-8 text-center shadow-glass backdrop-blur-2xl sm:p-12">
        <div className="text-[11px] uppercase tracking-[0.26em] text-white/[0.35]">404</div>
        <h1 className="mt-4 text-4xl font-semibold text-white">{dictionary.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/[0.55]">{dictionary.notFound.copy}</p>
        <div className="mt-8">
          <Link href="/catalog">
            <Button size="lg" className="w-full sm:w-auto">
              {dictionary.notFound.openCatalog}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
