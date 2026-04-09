import { CartClient } from "@/components/cart-client";
import { getDictionary } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/locale";

export default async function CartPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="content-wrap py-10 sm:py-16">
      <div className="mb-10 max-w-3xl">
        <div className="section-kicker">{dictionary.cartPage.kicker}</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{dictionary.cartPage.title}</h1>
        <p className="mt-4 text-sm leading-7 text-white/[0.55] sm:text-base">{dictionary.cartPage.copy}</p>
      </div>

      <CartClient />
    </div>
  );
}
