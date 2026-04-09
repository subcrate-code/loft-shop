import type { Locale } from "@/lib/locale-config";
import { getProductBySlug, type Product } from "@/data/products";
import { computeLineTotal, getBundleByQuantity, getBundleSavings } from "@/lib/pricing";
import {
  getFulfillmentFee,
  isFulfillmentMethod,
  STORE_ADDRESS,
  STORE_CONTACT_WINDOW_MINUTES,
  STORE_HOURS_LABEL,
  type FulfillmentMethod
} from "@/lib/storefront";
import { appendOrderLog } from "@/lib/storage/orders";
import { formatEuro, getBaseUrl, isValidTelegramUsername, normalizeTelegramUsername } from "@/lib/utils";

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  telegramUsername: string;
  fulfillmentMethod: FulfillmentMethod;
  address?: string;
  needsDelivery?: boolean;
};

export type CheckoutPayload = {
  locale?: Locale;
  customer: CheckoutCustomer;
  cart: Array<{
    id: string;
    productSlug: Product["slug"];
    bundleQuantity: number;
    quantity: number;
    selectedOptions: string[];
  }>;
};

export type NormalizedOrderItem = {
  id: string;
  productSlug: Product["slug"];
  productTitle: string;
  bundleQuantity: number;
  bundlePrice: number;
  quantity: number;
  selectedOptions: string[];
  lineTotal: number;
};

export type NormalizedOrder = {
  id: string;
  createdAt: string;
  locale: Locale;
  customer: CheckoutCustomer;
  fulfillment: {
    method: FulfillmentMethod;
    address: string;
    deliveryFee: number;
  };
  items: NormalizedOrderItem[];
  subtotal: number;
  total: number;
};

const validationMessages = {
  ru: {
    emptyCart: "Корзина пуста.",
    firstName: "Введите имя.",
    lastName: "Введите фамилию.",
    phone: "Введите телефон.",
    email: "Введите корректный email.",
    telegram: "Введите корректный Telegram username.",
    method: "Выберите доставку или самовывоз.",
    address: "Введите адрес доставки.",
    productMissing: "Один из товаров больше недоступен.",
    invalidBundle: (title: string) => `Неверный набор для ${title}.`,
    invalidQuantity: (title: string) => `Неверное количество для ${title}.`,
    invalidOptionsCount: (title: string, quantity: number) => `Выберите ${quantity} вариант(а) для ${title}.`,
    invalidOption: (option: string, title: string) => `Вариант ${option} недоступен для ${title}.`
  },
  en: {
    emptyCart: "The cart is empty.",
    firstName: "Enter the first name.",
    lastName: "Enter the last name.",
    phone: "Enter the phone number.",
    email: "Enter a valid email.",
    telegram: "Enter a valid Telegram username.",
    method: "Choose delivery or pickup.",
    address: "Enter the delivery address.",
    productMissing: "One of the products is no longer available.",
    invalidBundle: (title: string) => `Invalid bundle for ${title}.`,
    invalidQuantity: (title: string) => `Invalid quantity for ${title}.`,
    invalidOptionsCount: (title: string, quantity: number) => `Choose ${quantity} option(s) for ${title}.`,
    invalidOption: (option: string, title: string) => `${option} is not available for ${title}.`
  }
} as const;

function notEmpty(value: string) {
  return value.trim().length > 0;
}

function normalizeAddress(value?: string) {
  return (value || "").trim();
}

function resolveFulfillmentMethod(customer: CheckoutCustomer) {
  if (isFulfillmentMethod(customer.fulfillmentMethod)) {
    return customer.fulfillmentMethod;
  }

  return customer.needsDelivery ? "delivery" : "pickup";
}

function validateCustomer(customer: CheckoutCustomer, locale: Locale) {
  const messages = validationMessages[locale];
  const method = resolveFulfillmentMethod(customer);

  if (!notEmpty(customer.firstName)) return messages.firstName;
  if (!notEmpty(customer.lastName)) return messages.lastName;
  if (!notEmpty(customer.phone)) return messages.phone;
  if (!/.+@.+\..+/.test(customer.email.trim())) return messages.email;
  if (!isValidTelegramUsername(customer.telegramUsername)) return messages.telegram;
  if (!isFulfillmentMethod(method)) return messages.method;
  if (method === "delivery" && !notEmpty(customer.address || "")) return messages.address;
  return null;
}

export async function normalizeOrderPayload(payload: CheckoutPayload): Promise<NormalizedOrder> {
  const locale = payload.locale === "en" ? "en" : "ru";
  const messages = validationMessages[locale];

  if (!payload || !Array.isArray(payload.cart) || payload.cart.length === 0) {
    throw new Error(messages.emptyCart);
  }

  const customerError = validateCustomer(payload.customer, locale);
  if (customerError) {
    throw new Error(customerError);
  }

  const items: NormalizedOrderItem[] = [];

  for (const line of payload.cart) {
    const product = getProductBySlug(line.productSlug);

    if (!product) {
      throw new Error(messages.productMissing);
    }

    const bundle = getBundleByQuantity(product, line.bundleQuantity);

    if (!bundle) {
      throw new Error(messages.invalidBundle(product.title));
    }

    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 25) {
      throw new Error(messages.invalidQuantity(product.title));
    }

    if (!Array.isArray(line.selectedOptions) || line.selectedOptions.length !== bundle.quantity) {
      throw new Error(messages.invalidOptionsCount(product.title, bundle.quantity));
    }

    for (const option of line.selectedOptions) {
      const exists = product.options.some((entry) => entry.value === option);
      if (!exists) {
        throw new Error(messages.invalidOption(option, product.title));
      }
    }

    items.push({
      id: line.id,
      productSlug: product.slug,
      productTitle: product.title,
      bundleQuantity: bundle.quantity,
      bundlePrice: bundle.price,
      quantity: line.quantity,
      selectedOptions: line.selectedOptions,
      lineTotal: computeLineTotal(bundle, line.quantity)
    });
  }

  const method = resolveFulfillmentMethod(payload.customer);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryFee = getFulfillmentFee(method);
  const deliveryAddress = method === "delivery" ? normalizeAddress(payload.customer.address) : STORE_ADDRESS;

  return {
    id: `LOFT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    locale,
    customer: {
      ...payload.customer,
      telegramUsername: normalizeTelegramUsername(payload.customer.telegramUsername),
      fulfillmentMethod: method,
      address: method === "delivery" ? deliveryAddress : undefined
    },
    fulfillment: {
      method,
      address: deliveryAddress,
      deliveryFee
    },
    items,
    subtotal,
    total: subtotal + deliveryFee
  };
}

function buildOrderEmbed(order: NormalizedOrder) {
  const itemsValue = order.items
    .map((item) => {
      const product = getProductBySlug(item.productSlug)!;
      const bundle = getBundleByQuantity(product, item.bundleQuantity)!;
      const savings = getBundleSavings(product, bundle);
      const options = item.selectedOptions.map((entry, index) => `${index + 1}. ${entry}`).join("\n");

      return [
        `**${item.productTitle}**`,
        `Bundle: ${item.bundleQuantity} pcs • ${formatEuro(item.bundlePrice, order.locale)}${savings > 0 ? ` • save ${formatEuro(savings, order.locale)}` : ""}`,
        `Sets: ${item.quantity}`,
        `Options:\n${options}`,
        `Line total: ${formatEuro(item.lineTotal, order.locale)}`
      ].join("\n");
    })
    .join("\n\n");

  const fulfillmentLabel = order.fulfillment.method === "delivery" ? "Delivery" : "Pickup";
  const description =
    order.locale === "ru"
      ? "Новый заказ Loft Shop готов к обработке."
      : "A new Loft Shop order is ready to be processed.";

  return {
    username: "Loft Shop Orders",
    avatar_url: `${getBaseUrl()}/brand-mark.png`,
    embeds: [
      {
        title: `New order • ${order.id}`,
        color: 5793266,
        timestamp: order.createdAt,
        description,
        fields: [
          {
            name: "Customer",
            value: [
              `${order.customer.firstName} ${order.customer.lastName}`,
              `Phone: ${order.customer.phone}`,
              `Email: ${order.customer.email}`,
              `Telegram: @${order.customer.telegramUsername}`
            ].join("\n"),
            inline: false
          },
          {
            name: "Fulfilment",
            value: [
              `Method: ${fulfillmentLabel}`,
              `Address: ${order.fulfillment.address}`,
              `Fee: ${order.fulfillment.method === "delivery" ? formatEuro(order.fulfillment.deliveryFee, order.locale) : "Free"}`
            ].join("\n"),
            inline: false
          },
          {
            name: "Store timing",
            value: [`Hours: ${STORE_HOURS_LABEL}`, `Follow-up: within ${STORE_CONTACT_WINDOW_MINUTES} min`].join("\n"),
            inline: false
          },
          {
            name: "Locale",
            value: order.locale.toUpperCase(),
            inline: true
          },
          {
            name: "Subtotal",
            value: formatEuro(order.subtotal, order.locale),
            inline: true
          },
          {
            name: "Total",
            value: formatEuro(order.total, order.locale),
            inline: true
          },
          {
            name: "Products",
            value: itemsValue.slice(0, 1024),
            inline: false
          }
        ],
        footer: {
          text: "Loft Shop • Discord webhook"
        }
      }
    ],
    allowed_mentions: {
      parse: []
    }
  };
}

export async function finalizeOrder(order: NormalizedOrder) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  await appendOrderLog(order as unknown as Record<string, unknown>);

  if (!webhookUrl) {
    console.warn("[Loft Shop] DISCORD_WEBHOOK_URL is not configured. Order logged locally only.");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildOrderEmbed(order))
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Discord webhook error: ${response.status} ${message}`);
  }
}
