import type { Locale } from "@/lib/locale-config";

const dictionaries = {
  ru: {
    header: {
      nav: {
        home: "Главная",
        catalog: "Каталог"
      },
      tagline: "Коллекции вкусов и оформление без лишнего шума",
      cart: "Корзина"
    },
    footer: {
      copy: "Собирайте свой набор, сохраняйте корзину и возвращайтесь к заказу без лишних шагов.",
      links: {
        catalog: "Каталог",
        cart: "Корзина",
        checkout: "Оформление"
      }
    },
    home: {
      badges: ["Коллекции вкусов", "Чистый каталог", "Быстрый заказ"],
      title: "Loft Shop — коллекции с понятным выбором и спокойным оформлением.",
      description: "Открывайте линейки, собирайте наборы и переходите к заказу без лишних блоков, навязанных секций и путаницы в корзине.",
      openCatalog: "Открыть каталог",
      openCart: "Открыть корзину",
      stats: {
        collections: "Коллекции",
        flavours: "Вкусы",
        checkout: "Оформление"
      },
      statsValue: {
        checkout: "≈1 мин"
      },
      spotlightKicker: "Избранное",
      spotlightFeatures: [
        "Фиксированные наборы с понятной ценой.",
        "Любимые вкусы можно сочетать в одном заказе.",
        "Корзина сохраняет состав и итоговую сумму."
      ],
      spotlightPills: ["Новые вкусы", "Сеты со скидкой", "Аккуратная корзина"],
      catalogKicker: "Каталог",
      catalogTitle: "Коллекции Loft Shop",
      viewAllCollections: "Смотреть все коллекции",
      stepsKicker: "Как заказать",
      stepsTitle: "Три простых шага до готового заказа.",
      steps: [
        {
          title: "Откройте коллекцию",
          copy: "Выберите нужную линейку и посмотрите доступные вкусы без лишних переходов."
        },
        {
          title: "Соберите набор",
          copy: "Выберите размер набора, замените вкусы и сразу увидьте итоговую сумму."
        },
        {
          title: "Подтвердите заказ",
          copy: "Оставьте контакты, при необходимости добавьте доставку и отправьте заказ одним действием."
        }
      ]
    },
    catalogPage: {
      kicker: "Каталог",
      title: "Выберите коллекцию и соберите свой набор.",
      copy: "У каждой коллекции — свой список вкусов, понятные наборы и аккуратный конфигуратор без лишней перегрузки."
    },
    productPage: {
      from: "От",
      mostPicked: "Чаще берут",
      flavours: "Вкусы",
      allOptions: "Все варианты"
    },
    productCard: {
      from: "От",
      popularBundle: "Популярный набор",
      savingsOnBundle: "Экономия {amount} на наборе"
    },
    addToCart: {
      bundles: "Наборы",
      buildBundle: "Соберите свой набор",
      hit: "Хит",
      composition: "Состав набора",
      chooseFlavours: "Выберите {count} для этого набора.",
      position: "Позиция {index}",
      chooseFlavour: "Выберите вкус",
      tapToReplace: "Нажмите, чтобы заменить",
      change: "Изменить",
      total: "Итого",
      selected: "Выбрано",
      addToCart: "В корзину • {amount}",
      chooseForSlot: "Выберите вкус для позиции {index}",
      modalCopy: "Один список, один скролл и быстрый поиск по всем доступным вкусам.",
      searchPlaceholder: "Найти вкус",
      save: "Вы экономите {amount}",
      perItem: "{amount}/шт.",
      selectFirst: "Сначала выберите {count}.",
      added: "{title} добавлен в корзину",
      addedDescription: "{count} • {amount}"
    },
    cartPage: {
      kicker: "Корзина",
      title: "Проверьте наборы перед оформлением.",
      copy: "Здесь сохраняются выбранные вкусы, размер набора и количество, поэтому к оформлению можно перейти без повторной сборки."
    },
    cart: {
      emptyTitle: "Корзина пока пустая",
      emptyCopy: "Откройте любую коллекцию, соберите свой набор и вернитесь сюда — состав и цена сохранятся автоматически.",
      perBundle: "{count} • {amount} за набор",
      amount: "Сумма",
      remove: "Удалить",
      total: "Итого",
      bundles: "Наборы",
      units: "Всего единиц",
      grandTotal: "Общая сумма",
      toCheckout: "Перейти к оформлению",
      clearCart: "Очистить корзину"
    },
    checkoutPage: {
      kicker: "Оформление",
      title: "Оформление с доставкой или бесплатным самовывозом.",
      copy: "Выберите удобный способ получения заказа, проверьте контакты и отправьте форму. Мы работаем ежедневно с 10:00 до 22:00 и обычно связываемся в течение 30 минут."
    },
    checkout: {
      fastCheckout: "Быстрое оформление",
      noAccount: "Без регистрации",
      fields: {
        firstName: "Имя",
        lastName: "Фамилия",
        phone: "Телефон",
        email: "Email",
        telegram: "Telegram",
        address: "Адрес доставки"
      },
      placeholders: {
        firstName: "Алексей",
        lastName: "Иванов",
        phone: "+370...",
        email: "you@example.com",
        telegram: "username",
        address: "Улица, дом, город, индекс"
      },
      fulfillmentTitle: "Как получить заказ",
      fulfillmentCopy: "Доставка стоит 3 €, самовывоз — бесплатно.",
      deliveryTitle: "Доставка курьером",
      deliveryCopy: "Фиксированная стоимость по городу. Укажите полный адрес, и мы подтвердим детали после заказа.",
      deliveryPrice: "3 €",
      pickupTitle: "Самовывоз",
      pickupCopy: "Заберите заказ бесплатно по адресу Baltijos pr. 101. Ниже можно сразу открыть маршрут.",
      pickupPrice: "Бесплатно",
      selected: "Выбрано",
      addressHint: "Укажите полный адрес для доставки.",
      pickupAddressLabel: "Адрес самовывоза",
      pickupAddressValue: "Baltijos pr. 101, Klaipėda, 94116 Klaipėdos m. sav.",
      mapTitle: "Точка самовывоза",
      mapBadge: "Карта",
      mapCopy: "Небольшая карта и быстрый переход в навигацию.",
      routeGoogle: "Google Maps",
      routeWaze: "Waze",
      routeApple: "Apple Maps",
      workingHoursTitle: "Рабочее время",
      workingHoursValue: "Ежедневно, 10:00–22:00",
      responseTitle: "Связь после заказа",
      responseValue: "Свяжемся в течение 30 минут",
      summaryMethod: "Способ получения",
      summarySubtotal: "Товары",
      summaryDelivery: "Доставка",
      summaryPickup: "Самовывоз",
      summaryFree: "Бесплатно",
      summaryAddress: "Адрес",
      reviewCopy: "Проверьте контакты и способ получения. После отправки мы увидим заказ и свяжемся по указанным данным.",
      sending: "Отправляем...",
      submit: "Отправить заказ • {amount}",
      yourOrder: "Ваш заказ",
      almostReady: "Осталось подтвердить детали",
      beforeSubmit: "Что важно проверить",
      bulletPhone: "Телефон и Telegram должны быть актуальными для быстрой связи.",
      bulletMix: "Проверьте вкусы и количество перед отправкой.",
      bulletAddress: "Для доставки укажите полный адрес, для самовывоза можно сразу открыть маршрут.",
      backToCart: "← Вернуться в корзину",
      emptyTitle: "Пока нечего оформлять",
      emptyCopy: "Добавьте хотя бы один набор в корзину — после этого здесь появится форма и итоговая сумма.",
      sent: "Заказ отправлен",
      sendFailed: "Не удалось отправить заказ."
    },
    success: {
      kicker: "Заказ принят",
      title: "Спасибо, заказ уже у нас.",
      copy: "Мы получили выбранные товары и ваши контакты. Работаем ежедневно с 10:00 до 22:00 и обычно связываемся в течение 30 минут.",
      details: {
        hoursTitle: "Рабочее время",
        hoursValue: "10:00–22:00 ежедневно",
        responseTitle: "Связь",
        responseValue: "До 30 минут"
      },
      backCatalog: "Вернуться в каталог",
      backHome: "На главную"
    },
    floatingCart: {
      title: "Корзина",
      open: "Открыть"
    },
    notFound: {
      title: "Страница не найдена",
      copy: "Похоже, нужная коллекция была перемещена или ссылка ведёт не туда.",
      openCatalog: "Открыть каталог"
    }
  },
  en: {
    header: {
      nav: {
        home: "Home",
        catalog: "Catalog"
      },
      tagline: "Flavour collections and checkout without the clutter",
      cart: "Cart"
    },
    footer: {
      copy: "Build your set, keep the cart saved and come back to checkout without extra steps.",
      links: {
        catalog: "Catalog",
        cart: "Cart",
        checkout: "Checkout"
      }
    },
    home: {
      badges: ["Flavour collections", "Clean catalog", "Fast checkout"],
      title: "Loft Shop — collections with clear choice and calm checkout.",
      description: "Browse product lines, build bundles and move to checkout without extra blocks, forced sections or cart confusion.",
      openCatalog: "Open catalog",
      openCart: "Open cart",
      stats: {
        collections: "Collections",
        flavours: "Flavours",
        checkout: "Checkout"
      },
      statsValue: {
        checkout: "≈1 min"
      },
      spotlightKicker: "Featured",
      spotlightFeatures: [
        "Fixed bundles with clear pricing.",
        "Favourite flavours can be mixed in one order.",
        "The cart keeps the composition and total amount saved."
      ],
      spotlightPills: ["New flavours", "Bundle offers", "Clean cart"],
      catalogKicker: "Catalog",
      catalogTitle: "Loft Shop collections",
      viewAllCollections: "View all collections",
      stepsKicker: "How to order",
      stepsTitle: "Three simple steps to a ready order.",
      steps: [
        {
          title: "Open a collection",
          copy: "Choose the product line you need and review the available flavours without extra detours."
        },
        {
          title: "Build your set",
          copy: "Pick the bundle size, swap flavours and instantly see the final amount."
        },
        {
          title: "Confirm the order",
          copy: "Leave your contact details, add delivery if needed and send the order in one action."
        }
      ]
    },
    catalogPage: {
      kicker: "Catalog",
      title: "Choose a collection and build your set.",
      copy: "Each collection has its own flavour list, bundle options and a clean configurator without unnecessary clutter."
    },
    productPage: {
      from: "From",
      mostPicked: "Most picked",
      flavours: "Flavours",
      allOptions: "All options"
    },
    productCard: {
      from: "From",
      popularBundle: "Popular bundle",
      savingsOnBundle: "Save {amount} on this bundle"
    },
    addToCart: {
      bundles: "Bundles",
      buildBundle: "Build your set",
      hit: "Top pick",
      composition: "Bundle composition",
      chooseFlavours: "Choose {count} for this bundle.",
      position: "Slot {index}",
      chooseFlavour: "Choose a flavour",
      tapToReplace: "Tap to replace",
      change: "Change",
      total: "Total",
      selected: "Selected",
      addToCart: "Add to cart • {amount}",
      chooseForSlot: "Choose a flavour for slot {index}",
      modalCopy: "One list, one scroll and quick search across every available flavour.",
      searchPlaceholder: "Search flavour",
      save: "You save {amount}",
      perItem: "{amount}/pc",
      selectFirst: "Choose {count} first.",
      added: "{title} added to cart",
      addedDescription: "{count} • {amount}"
    },
    cartPage: {
      kicker: "Cart",
      title: "Review your bundles before checkout.",
      copy: "Your selected flavours, bundle size and quantity stay here, so you can move to checkout without rebuilding the order."
    },
    cart: {
      emptyTitle: "Your cart is empty",
      emptyCopy: "Open any collection, build your set and come back here — the composition and price will stay saved automatically.",
      perBundle: "{count} • {amount} per bundle",
      amount: "Amount",
      remove: "Remove",
      total: "Total",
      bundles: "Bundles",
      units: "Total units",
      grandTotal: "Grand total",
      toCheckout: "Go to checkout",
      clearCart: "Clear cart"
    },
    checkoutPage: {
      kicker: "Checkout",
      title: "Checkout with delivery or free pickup.",
      copy: "Choose the order method that suits you, confirm your contact details and send the form. We work daily from 10:00 to 22:00 and usually get back within 30 minutes."
    },
    checkout: {
      fastCheckout: "Fast checkout",
      noAccount: "No sign-up",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone",
        email: "Email",
        telegram: "Telegram",
        address: "Delivery address"
      },
      placeholders: {
        firstName: "Alex",
        lastName: "Johnson",
        phone: "+370...",
        email: "you@example.com",
        telegram: "username",
        address: "Street, house, city, ZIP code"
      },
      fulfillmentTitle: "How would you like to receive the order?",
      fulfillmentCopy: "Delivery is €3, pickup is free.",
      deliveryTitle: "Courier delivery",
      deliveryCopy: "A fixed city fee. Add the full address and we will confirm the details after the order is placed.",
      deliveryPrice: "€3",
      pickupTitle: "Pickup",
      pickupCopy: "Collect the order for free at Baltijos pr. 101. You can open navigation right below.",
      pickupPrice: "Free",
      selected: "Selected",
      addressHint: "Enter the full delivery address.",
      pickupAddressLabel: "Pickup address",
      pickupAddressValue: "Baltijos pr. 101, Klaipėda, 94116 Klaipėdos m. sav.",
      mapTitle: "Pickup point",
      mapBadge: "Map",
      mapCopy: "A compact map with quick navigation shortcuts.",
      routeGoogle: "Google Maps",
      routeWaze: "Waze",
      routeApple: "Apple Maps",
      workingHoursTitle: "Working hours",
      workingHoursValue: "Daily, 10:00–22:00",
      responseTitle: "After you order",
      responseValue: "We reply within 30 minutes",
      summaryMethod: "Method",
      summarySubtotal: "Products",
      summaryDelivery: "Delivery",
      summaryPickup: "Pickup",
      summaryFree: "Free",
      summaryAddress: "Address",
      reviewCopy: "Check your contact details and fulfilment method. Once you send the form, we will receive the order and contact you using the provided details.",
      sending: "Sending...",
      submit: "Send order • {amount}",
      yourOrder: "Your order",
      almostReady: "Just confirm the details",
      beforeSubmit: "Before you send",
      bulletPhone: "Your phone and Telegram should be up to date for quick follow-up.",
      bulletMix: "Check the flavours and quantity before sending.",
      bulletAddress: "For delivery, add the full address. For pickup, you can open the route right away.",
      backToCart: "← Back to cart",
      emptyTitle: "Nothing to checkout yet",
      emptyCopy: "Add at least one bundle to the cart and this page will show the form and the final total.",
      sent: "Order sent",
      sendFailed: "Failed to send the order."
    },
    success: {
      kicker: "Order received",
      title: "Thank you, the order is already with us.",
      copy: "We received your selected items and contact details. We work daily from 10:00 to 22:00 and usually get back within 30 minutes.",
      details: {
        hoursTitle: "Working hours",
        hoursValue: "Daily, 10:00–22:00",
        responseTitle: "Reply time",
        responseValue: "Up to 30 minutes"
      },
      backCatalog: "Back to catalog",
      backHome: "Home"
    },
    floatingCart: {
      title: "Cart",
      open: "Open"
    },
    notFound: {
      title: "Page not found",
      copy: "Looks like the collection was moved or the link points to the wrong place.",
      openCatalog: "Open catalog"
    }
  }
} as const;

export type Dictionary = (typeof dictionaries)["ru"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

function pluralRu(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function formatBundleCount(locale: Locale, count: number) {
  return locale === "ru" ? `${count} шт.` : `${count} pcs`;
}

export function formatFlavourCount(locale: Locale, count: number) {
  return locale === "ru"
    ? `${count} ${pluralRu(count, "вкус", "вкуса", "вкусов")}`
    : `${count} ${count === 1 ? "flavour" : "flavours"}`;
}

export function replaceTemplate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
