# Loft Shop

Loft Shop is a Next.js storefront for browsing flavour collections, building bundles and sending orders through a checkout form.

## Included pages
- Home
- Catalog
- Product page
- Cart
- Checkout
- Success page

## Main features
- RU / EN language switcher with persisted locale
- Bundle-based product selection
- Cart saved in local storage
- Telegram Mini App support for user data and main button integration
- Order submission through the `/api/order` route with optional Discord webhook delivery

## Environment
Copy `.env.example` and set the values you need:

- `NEXT_PUBLIC_SITE_URL` — public site URL used in webhook assets
- `DISCORD_WEBHOOK_URL` — optional Discord webhook for incoming orders

If no Discord webhook is configured, orders are still logged locally in `.loft/orders.json`.
