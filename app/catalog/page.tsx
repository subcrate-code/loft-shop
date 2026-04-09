import { ProductCard } from "@/components/product-card";
import { PRODUCTS, localizeProduct } from "@/data/products";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";

export default async function CatalogPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const products = PRODUCTS.map((product) => localizeProduct(product, locale));

  return (
    <div className="content-wrap py-10 sm:py-16">
      <div className="max-w-3xl">
        <div className="section-kicker">{dictionary.catalogPage.kicker}</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{dictionary.catalogPage.title}</h1>
        <p className="mt-4 text-sm leading-7 text-white/[0.55] sm:text-base">{dictionary.catalogPage.copy}</p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
