import type { Locale } from "@/lib/locale-config";
import { slugifyImageName, uniqueBy } from "@/lib/utils";

export type LocalizedText = {
  ru: string;
  en: string;
};

export type ProductOption = {
  value: string;
  emoji?: string;
  note?: string | LocalizedText;
};

export type LocalizedProductOption = Omit<ProductOption, "note"> & {
  note?: string;
};

export type BundlePrice = {
  quantity: number;
  price: number;
  recommended?: boolean;
};

export type Product = {
  slug: "elfliq-30ml-50mg" | "elfliq-10ml-20mg" | "crystal-clear" | "ebcreate-40000";
  title: string;
  shortTitle: string;
  subtitle: LocalizedText;
  description: LocalizedText;
  badges: LocalizedText[];
  bundles: BundlePrice[];
  options: ProductOption[];
  note?: LocalizedText;
  heroLabel: LocalizedText;
};

export type LocalizedProduct = Omit<Product, "subtitle" | "description" | "badges" | "note" | "heroLabel" | "options"> & {
  subtitle: string;
  description: string;
  badges: string[];
  options: LocalizedProductOption[];
  note?: string;
  heroLabel: string;
};

const commonOptions = [
  "Tobacco",
  "Banana ice",
  "Menthol",
  "Cola",
  "Rinbo",
  "Kiwi passion fruit guava",
  "Pineapple ice",
  "Blueberry sour raspberry",
  "Pink lemonade",
  "Apple blackcurrant",
  "Gami",
  "Pink grapefruit",
  "Peach ice",
  "Mango",
  "Cherry",
  "Blueberry",
  "Pineapple mango orange",
  "Spearmint",
  "Triple melon",
  "Ellfturbo ice",
  "Blue razz lemonade",
  "Grape berry",
  "Blackcurrant aniseed",
  "Strawberry ice",
  "Grape",
  "Cherry cola",
  "Sour apple",
  "Rhubarb snoow",
  "Peace mint",
  "Strawberry kiwi",
  "Lemon lime",
  "Apple peach",
  "Strawberry raspberry cherry ice"
].map((value) => ({ value }));

const elf10Extra = [
  ["Sour watermelon gummy", "🍉"],
  ["Watermelon cherry", "🍉🍒"],
  ["Raspberry lychee", "🍓🥭"],
  ["Green grape rose", "🍇🌹"],
  ["Grape cherry", "🍇🍒"],
  ["Cherry lemon peach", "🍒🍋🍑"],
  ["Blueberry rose mint", "🫐🌹🌿"],
  ["Blueberry raspberry pomegranate", "🫐🍓🍎"],
  ["Strawberry raspberry cherry ice", "🍓🍒❄️"],
  ["Strawberry kiwi", "🍓🥝"],
  ["Strawberry ice", "🍓❄️"],
  ["Pina colada", "🍍🥥"],
  ["Kiwi passion fruit guava", "🥝🥭🍈"],
  ["Elf bull ice", "🧝‍♂️🐂❄️"],
  ["Cherry", "🍒"],
  ["Blueberry sour raspberry", "🫐🍓😋"],
  ["Blue razz lemonade", "🫐🍋🥤"],
  ["Blackcurrant aniseed", "🍇🌿"],
  ["Pink grapefruit", "🍊💗"],
  ["Pink lemonade", "🍋💗"],
  ["Apple peach", "🍏🍑"],
  ["Pink lemonade soda", "🍋💗🥤"],
  ["Peach ice", "🍑❄️"],
  ["Apple pear", "🍏🍐"],
  ["Watermelon", "🍉"],
  ["Grape", "🍇"],
  ["Blue razz ice", "🫐❄️"],
  ["Strawberry banana", "🍓🍌"],
  ["Sour apple", "🍏😋"]
].map(([value, emoji]) => ({ value, emoji }));

const crystalClearCore = [
  { value: "Juicy grape", note: { ru: "20 шт.", en: "20 pcs" } },
  { value: "Gummy bear", note: { ru: "20 шт.", en: "20 pcs" } },
  { value: "Lemon lime", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Caribbean crush", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Pineapple lemon burst", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Berry breeze", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Kiwi passionfruit guava", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Summer dream", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Blueberry sour raspberry", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Fizzy cherry", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Strawberry watermelon bubblegum", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Tropical sour ice blast", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Xtreme sour apple", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Strawberry raspberry cherry fusion", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Pineapple peach mango", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Tropical kiwi blast", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "White peach razz", note: { ru: "10 шт.", en: "10 pcs" } },
  { value: "Strawberry kiwi", note: { ru: "10 шт.", en: "10 pcs" } }
];

const elf10Options = uniqueBy([...commonOptions, ...elf10Extra], (option) => option.value.toLowerCase());
const crystalOptions = crystalClearCore;

const ebcreateOptions = [
  "AURORA BERRIES",
  "BLACK MIN",
  "BLACKBERRY GRAPE",
  "BLUE RAZZ ICE",
  "GRAPE TWIST",
  "PINEAPPLE POM",
  "SOUR APPLE ICE",
  "SOUR FUKING FAB",
  "STRAWBERRY BLEND",
  "STRAWBERRY KIWI",
  "STRAWBERRY RASPBERRY FROST",
  "TOASTED PINEAPPLE",
  "TRIPLE BERRY",
  "WATERMELON ICE",
  "WATERMELON PEACH FROST",
  "WINTER MINT"
].map((value) => ({ value }));


export const PRODUCTS: Product[] = [
  {
    slug: "elfliq-30ml-50mg",
    title: "Elfliq 30 ml 50 mg",
    shortTitle: "Elfliq 30",
    subtitle: {
      ru: "Более насыщенный формат для тех, кто любит брать любимые вкусы впрок.",
      en: "A richer format for those who like to stock up on favourite flavours."
    },
    description: {
      ru: "Коллекция 30 ml с плотным вкусом и спокойным оформлением заказа. Подходит тем, кто хочет взять крупный формат без лишней суеты.",
      en: "A 30 ml collection with a fuller taste and a calm checkout flow. A good fit for anyone who wants a larger format without extra hassle."
    },
    badges: [
      { ru: "50 mg", en: "50 mg" },
      { ru: "30 ml", en: "30 ml" },
      { ru: "Насыщенный вкус", en: "Rich flavour" }
    ],
    bundles: [
      { quantity: 1, price: 14 },
      { quantity: 3, price: 40, recommended: true }
    ],
    options: commonOptions,
    heroLabel: { ru: "Коллекция 01", en: "Collection 01" }
  },
  {
    slug: "elfliq-10ml-20mg",
    title: "Elfliq 10 ml 20 mg",
    shortTitle: "Elfliq 10",
    subtitle: {
      ru: "Компактный формат с самым широким выбором вкусов в магазине.",
      en: "A compact format with the widest flavour range in the store."
    },
    description: {
      ru: "Удобная линейка для тех, кто любит пробовать новое, собирать наборы и сочетать вкусы без перегруженного интерфейса.",
      en: "A flexible line for anyone who likes to try new mixes, build bundles and combine flavours without an overloaded interface."
    },
    badges: [
      { ru: "20 mg", en: "20 mg" },
      { ru: "Много вкусов", en: "Many flavours" },
      { ru: "Хит для наборов", en: "Best for bundles" }
    ],
    bundles: [
      { quantity: 1, price: 6 },
      { quantity: 5, price: 25, recommended: true }
    ],
    options: elf10Options,
    heroLabel: { ru: "Коллекция 02", en: "Collection 02" }
  },
  {
    slug: "crystal-clear",
    title: "Crystal Clear",
    shortTitle: "Crystal Clear",
    subtitle: {
      ru: "Линейка Crystal Clear с актуальными вкусами и быстрым выбором без лишних позиций.",
      en: "The Crystal Clear line with the current flavours and a faster selection flow without extra options."
    },
    description: {
      ru: "В коллекции оставлены только актуальные вкусы Crystal Clear, чтобы выбор был чище, быстрее и удобнее на любом экране.",
      en: "Only the current Crystal Clear flavours remain in this collection so the selection feels cleaner, faster and easier on any screen."
    },
    badges: [
      { ru: "Чистая линейка", en: "Clean line" },
      { ru: "Набор 5 шт.", en: "5-piece set" },
      { ru: "Свежий выбор", en: "Fresh picks" }
    ],
    bundles: [
      { quantity: 1, price: 6 },
      { quantity: 5, price: 25, recommended: true }
    ],
    options: crystalOptions,
    note: { ru: "С четверга", en: "From Thursday" },
    heroLabel: { ru: "Коллекция 03", en: "Collection 03" }
  },
  {
    slug: "ebcreate-40000",
    title: "Ebcreate 40000",
    shortTitle: "Ebcreate 40000",
    subtitle: {
      ru: "Формат с большой автономностью и заметной выгодой при наборе.",
      en: "A format with long-lasting use and visible savings when you take a set."
    },
    description: {
      ru: "Подходит тем, кто хочет взять сразу несколько устройств, закрыть вопрос надолго и получить более выгодную цену за комплект.",
      en: "A good pick if you want several devices at once, longer coverage and a better price for the full bundle."
    },
    badges: [
      { ru: "Выгодно набором", en: "Better in a bundle" },
      { ru: "3 шт. дешевле", en: "3 pcs save more" },
      { ru: "Премиум формат", en: "Premium format" }
    ],
    bundles: [
      { quantity: 1, price: 23 },
      { quantity: 3, price: 60, recommended: true }
    ],
    options: ebcreateOptions,
    heroLabel: { ru: "Коллекция 04", en: "Collection 04" }
  }
];

export function localizeText(locale: Locale, value: LocalizedText | undefined) {
  if (!value) return undefined;
  return value[locale];
}

function localizeOption(option: ProductOption, locale: Locale): LocalizedProductOption {
  const note = typeof option.note === "string" ? option.note : option.note?.[locale];

  return {
    ...option,
    note
  };
}

export function localizeProduct(product: Product, locale: Locale): LocalizedProduct {
  return {
    ...product,
    subtitle: product.subtitle[locale],
    description: product.description[locale],
    badges: product.badges.map((badge) => badge[locale]),
    options: product.options.map((option) => localizeOption(option, locale)),
    note: localizeText(locale, product.note),
    heroLabel: product.heroLabel[locale]
  };
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductImage(productSlug: Product["slug"], optionName: string) {
  const option_slug = slugifyImageName(optionName);
  const ebcreate_flavour_image_map = new Map<string, string>([
    ["aurora-berries", "blueberry"],
    ["black-min", "menthol"],
    ["blackberry-grape", "grape-berry"],
    ["blue-razz-ice", "blue-razz-lemonade"],
    ["grape-twist", "grape"],
    ["pineapple-pom", "pineapple-mango-orange"],
    ["sour-apple-ice", "sour-apple"],
    ["sour-fuking-fab", "rhubarb-snoow"],
    ["strawberry-blend", "strawberry-ice"],
    ["strawberry-kiwi", "strawberry-kiwi"],
    ["strawberry-raspberry-frost", "strawberry-raspberry-cherry-ice"],
    ["toasted-pineapple", "pineapple-ice"],
    ["triple-berry", "blueberry-sour-raspberry"],
    ["watermelon-ice", "strawberry-ice"],
    ["watermelon-peach-frost", "peach-ice"],
    ["winter-mint", "peace-mint"]
  ]);

  if (productSlug === "ebcreate-40000") {
    const mapped_option_slug = ebcreate_flavour_image_map.get(option_slug);
    if (mapped_option_slug) {
      return `/products/ebcreate-40000/${mapped_option_slug}.png`;
    }
  }

  return `/products/${productSlug}/${option_slug}.png`;
}
