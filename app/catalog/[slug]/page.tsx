import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getProductImage, localizeProduct } from "@/data/products";
import { formatBundleCount, getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";
import { formatEuro } from "@/lib/utils";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseProduct = getProductBySlug(slug);

  if (!baseProduct) {
    notFound();
  }

  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const product = localizeProduct(baseProduct, locale);
  const recommended = product.bundles.find((bundle) => bundle.recommended) || product.bundles[0];
  const previewOptions = product.options.slice(0, 6);

  return (
    <div className="content-wrap py-8 sm:py-14">
      <section className="max-w-4xl">
        <div className="flex flex-wrap gap-3">
          <Badge>{product.heroLabel}</Badge>
          {product.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
          {product.note ? <Badge className="border-ok/20 bg-ok/10 text-emerald-200">{product.note}</Badge> : null}
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{product.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/[0.58] sm:text-lg">{product.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[26px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.productPage.from}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{formatEuro(product.bundles[0].price, locale)}</div>
          </div>

          <div className="rounded-[26px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.productPage.mostPicked}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{formatBundleCount(locale, recommended.quantity)}</div>
          </div>

          <div className="rounded-[26px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.productPage.flavours}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{product.options.length}</div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <aside className="order-1 xl:order-2 xl:sticky xl:top-28 xl:h-fit">
          <AddToCartPanel product={product} />
        </aside>

        <section className="order-2 xl:order-1">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {previewOptions.map((option) => (
              <div key={option.value} className="overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.06] shadow-glass">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={getProductImage(product.slug, option.value)}
                    alt={option.value}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="font-medium text-white">{option.value}</div>
                  <div className="mt-1 text-sm text-white/[0.45]">{option.note || option.emoji || product.shortTitle}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[30px] border border-white/[0.10] bg-white/[0.06] p-5 shadow-glass backdrop-blur-2xl sm:p-6">
            <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.productPage.allOptions}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.options.map((option) => (
                <Badge key={option.value} className="max-w-full">
                  {option.value}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
