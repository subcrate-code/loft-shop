import { NextResponse } from "next/server";

import { finalizeOrder, normalizeOrderPayload, type CheckoutPayload } from "@/lib/order";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: CheckoutPayload | null = null;

  try {
    payload = (await request.json()) as CheckoutPayload;
    const order = await normalizeOrderPayload(payload);
    await finalizeOrder(order);

    return NextResponse.json({
      ok: true,
      orderId: order.id
    });
  } catch (error) {
    const fallback = payload?.locale === "en" ? "Failed to process the order." : "Не удалось обработать заказ.";
    const message = error instanceof Error ? error.message : fallback;
    const status = message.startsWith("Discord webhook error") ? 502 : 400;

    return NextResponse.json(
      {
        ok: false,
        error: message
      },
      { status }
    );
  }
}
