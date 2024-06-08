"use server";
import dotenv from "dotenv";
import { db } from "~/server/db";
import { cart, order, user } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { stripe } from "~/helper/stripe";

dotenv.config();

export const createCheckoutSession = async () => {
  interface Items {
    bookId: string;
    bookName: string;
    unit_price: number;
    quantity: number;
  }

  interface Order {
    userId: string;
    id?: string;
    items: Items[];
    paymentStatus: boolean;
    orderedAt?: Date;
    address?: string;
  }

  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (id) {
    try {
      const cartItems = await db.select().from(cart).where(eq(cart.userId, id));
      if (cartItems && cartItems.length > 0) {
        let price = 0;
        const orderIdArray: Items[] = [];
        const length = cartItems.length;
        for (let i = 0; i < length; i++) {
          price = price + cartItems[i]!.price * cartItems[i]!.quantity;
          orderIdArray.push({
            bookName: cartItems[i]!.name,
            bookId: cartItems[i]!.id,
            quantity: cartItems[i]!.quantity,
            unit_price: cartItems[i]!.price,
          });
        }

        const orderDetails: Order = {
          userId: id,
          items: orderIdArray,
          paymentStatus: false,
        };

        const savedOrder = await db
          .insert(order)
          .values({
            ...orderDetails,
            items: JSON.stringify(orderDetails.items),
          })
          .returning();

        const stripeProducts = await Promise.all(
          orderIdArray.map(async (item) => {
            const product = await stripe.products.create({
              name: item.bookName,
            });

            const price = await stripe.prices.create({
              unit_amount: item.unit_price * 100,
              currency: "inr",
              product: product.id,
            });

            return {
              price: price.id,
              quantity: item.quantity,
            };
          })
        );

        if (savedOrder && savedOrder.length > 0) {
          const stripeSession = await stripe.checkout.sessions.create({
            success_url: `https://bookworm-cyan.vercel.app/orders?id=${
              savedOrder[0]!.id
            }`,
            cancel_url: "https://bookworm-cyan.vercel.app/",
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: { allowed_countries: ["IN"] },
            metadata: {
              userId: id,
              orderId: savedOrder[0]!.id,
            },
            line_items: stripeProducts,
          });
          return { url: stripeSession.url };
        }
      } else {
        throw new Error("Cart is empty");
      }
    } catch (e) {
      console.error(e);
    }
  }
};
