import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag, Sparkles } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCTS, getProductImage, localizeProduct } from "@/data/products";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";
import { getStoreOptionCount } from "@/lib/pricing";

export default async function HomePage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const featured = localizeProduct(PRODUCTS[1], locale);
  const secondary = localizeProduct(PRODUCTS[2], locale);
  const localizedProducts = PRODUCTS.map((product) => localizeProduct(product, locale));

  const highlights = [
    { label: dictionary.home.stats.collections, value: PRODUCTS.length },
    { label: dictionary.home.stats.flavours, value: getStoreOptionCount() },
    { label: dictionary.home.stats.checkout, value: dictionary.home.statsValue.checkout }
  ];

  return (
    <div className="content-wrap py-8 sm:py-14 lg:py-16">
      <section className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {dictionary.home.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {dictionary.home.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.58] sm:text-lg">{dictionary.home.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalog">
              <Button size="lg" className="w-full sm:w-auto">
                {dictionary.home.openCatalog} <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <ShoppingBag className="size-4" />
                {dictionary.home.openCart}
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight.label} className="rounded-[24px] border border-white/[0.10] bg-white/[0.06] p-4 shadow-glass transition duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.08]">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{highlight.label}</div>
                <div className="mt-3 text-3xl font-semibold text-white">{highlight.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:pt-4">
          <div className="relative rounded-[34px] border border-white/[0.10] bg-white/[0.06] p-4 shadow-glass backdrop-blur-2xl sm:p-5">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="grid gap-4 sm:grid-cols-[1.08fr_0.92fr]">
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/20">
                <Image
                  src={getProductImage(featured.slug, featured.options[1]?.value || featured.options[0].value)}
                  alt={featured.title}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/[0.65] via-black/5 to-transparent p-5">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.45]">{dictionary.home.spotlightKicker}</div>
                  <div className="mt-2 text-xl font-semibold text-white">{featured.title}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/20">
                  <Image
                    src={getProductImage(secondary.slug, secondary.options[0].value)}
                    alt={secondary.title}
                    width={700}
                    height={900}
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                </div>

                <div className="col-span-2 rounded-[28px] border border-white/[0.08] bg-white/[0.06] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.08] sm:col-span-1">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">{dictionary.home.spotlightKicker}</div>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-white/[0.65]">
                    {dictionary.home.spotlightFeatures.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-4 shrink-0 text-white/90" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-24">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">{dictionary.home.catalogKicker}</div>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{dictionary.home.catalogTitle}</h2>
          </div>
          <Link href="/catalog" className="text-sm text-white/[0.70] transition hover:text-white">
            {dictionary.home.viewAllCollections} →
          </Link>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {localizedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[34px] border border-white/[0.10] bg-white/[0.06] p-6 shadow-glass backdrop-blur-2xl sm:mt-24 sm:p-8">
        <Reveal>
          <div className="section-kicker">{dictionary.home.stepsKicker}</div>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">{dictionary.home.stepsTitle}</h2>
            <div className="flex size-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.08] text-white">
              <Sparkles className="size-5" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {dictionary.home.steps.map((step, index) => (
              <div key={step.title} className="rounded-[28px] border border-white/[0.08] bg-black/20 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.04]">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/[0.35]">0{index + 1}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/[0.55]">{step.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
