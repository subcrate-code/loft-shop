import { PRODUCTS, type BundlePrice } from "@/data/products";

type ProductWithBundles = {
  bundles: BundlePrice[];
  options?: Array<unknown>;
};

export type CartLineInput = {
  productSlug: (typeof PRODUCTS)[number]["slug"];
  bundleQuantity: number;
  quantity: number;
  selectedOptions: string[];
};

export function getBundleByQuantity(product: ProductWithBundles, quantity: number) {
  return product.bundles.find((bundle) => bundle.quantity === quantity);
}

export function getBundleSavings(product: ProductWithBundles, bundle: BundlePrice) {
  const single = product.bundles.find((entry) => entry.quantity === 1);

  if (!single || bundle.quantity <= 1) {
    return 0;
  }

  return single.price * bundle.quantity - bundle.price;
}

export function getBundlePerUnit(bundle: BundlePrice) {
  return Number((bundle.price / bundle.quantity).toFixed(2));
}

export function computeLineTotal(bundle: BundlePrice, quantity: number) {
  return bundle.price * quantity;
}

export function computeCartTotals(items: Array<{ bundlePrice: number; quantity: number }>) {
  const subtotal = items.reduce((sum, item) => sum + item.bundlePrice * item.quantity, 0);
  return {
    subtotal,
    grandTotal: subtotal
  };
}

export function getCatalogStartingPrice(product: ProductWithBundles) {
  return Math.min(...product.bundles.map((bundle) => bundle.price));
}

export function getStoreOptionCount() {
  return PRODUCTS.reduce((sum, product) => sum + product.options.length, 0);
}
