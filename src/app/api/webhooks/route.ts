import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "~/helper/stripe";
import dotenv from "dotenv";
import { db } from "~/server/db";
import { order } from "~/server/db/schema";
import { sql } from "drizzle-orm";

dotenv.config();

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    const sign = headers().get("stripe-signature");
    console.log(body);
    console.log(signature);
    console.log(sign);

    if (!signature) {
      return new Response("Invalid Signature.", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("checkout.session.completed");

      const { userId, orderId } = session.metadata ?? {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("no userId or orderId found.");
      }

      const billingAdress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address!;
      console.log(shippingAddress);

      await db
        .update(order)
        .set({
          address: JSON.stringify(shippingAddress),
          paymentStatus: true,
        })
        .where(sql`${order.id} = ${orderId}`);
      return NextResponse.json({ event: event, ok: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false, error: error },
      { status: 500 }
    );
  }
}
