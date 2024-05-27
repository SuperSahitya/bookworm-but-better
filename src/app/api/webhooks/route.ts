import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "~/helper/stripe";
import dotenv from "dotenv";
import { db } from "~/server/db";
import { books, order } from "~/server/db/schema";
import { eq, sql } from "drizzle-orm";

dotenv.config();

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Invalid Signature.", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { userId, orderId } = session.metadata ?? {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("no userId or orderId found.");
      }

      const billingAdress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address!;

      const myOrder = await db
  .update(order)
  .set({
    address: JSON.stringify(shippingAddress),
    paymentStatus: true,
  })
  .where(sql`${order.id} = ${orderId}`)
  .returning();

interface Item {
  bookName: string;
  bookId: string;
  quantity: number;
  unit_price: number;
}

if (myOrder.length > 0 && typeof myOrder[0]!.items === 'string') {
  const itemOrder: Item[] = JSON.parse(myOrder[0]!.items) as Item[];
  for (const item of itemOrder) {
    const booksArray = await db.select().from(books).where(eq(books.id, Number(item.bookId)));
    if (booksArray.length > 0) {
      const book = booksArray[0];
      await db
        .update(books)
        .set({ stock: (book!.stock - item.quantity) })
        .where(eq(books.id, Number(item.bookId)));
    }
  }
}
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
