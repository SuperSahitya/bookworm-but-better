"use server";
import "dotenv";
import { db } from "~/server/db";
import { cart, order, user } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { stripe } from "~/helper/stripe";

export const createCheckoutSession = async ({ ird }: { ird: string }) => {
  interface Items {
    bookId: string;
    quantity: number;
  }

  interface Order {
    userId: string;
    id?: string;
    items: Items[];
    paymentStatus: boolean;
    orderedAt?: Date;
  }

  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (id) {
    try {
      const cartItems = await db.select().from(cart).where(eq(cart.userId, id));
      if (cartItems) {
        let price = 0;
        const orderIdArray: Items[] = [];
        const length = cartItems.length;
        for (let i = 0; i < length; i++) {
          price = price + cartItems[i]!.price * cartItems[i]!.quantity;
          orderIdArray.push({
            bookId: cartItems[i]!.id,
            quantity: cartItems[i]!.quantity,
          });
        }

        // const orderDetails = await db
        //   .select()
        //   .from(order)
        //   .where(and(eq(order.userId, id)));

        const orderDetails: Order = {
          userId: id,
          items: orderIdArray,
          paymentStatus: false,
        };

        console.log(orderDetails);
        // await db.insert(order).values({
        //   ...orderDetails,
        //   items: JSON.stringify(orderDetails.items),
        // });

        const product = await stripe.products.create({
          name: "Books",
          default_price_data: {
            currency: "USD",
            unit_amount: price,
          },
        });

        const stripeProducts = await Promise.all(
          orderIdArray.map(async (item) => {
            const product = await stripe.products.create({
              name: `Book ${item.bookId}`,
            });

            const price = await stripe.prices.create({
              unit_amount: item.quantity * 100,
              currency: "inr",
              product: product.id,
            });

            return {
              price: price.id,
              quantity: item.quantity,
            };
          })
        );

        const stripeSession = await stripe.checkout.sessions.create({
          success_url: "http://localhost:3000/thank-you",
          cancel_url: "http://localhost:3000/",
          payment_method_types: ["card"],
          mode: "payment",
          shipping_address_collection: { allowed_countries: ["IN"] },
          metadata: {
            userId: id,
          },
          line_items: stripeProducts,
        });
        console.log(stripeSession.url);
        return { url: stripeSession.url };
      }
    } catch (e) {
      console.log(e);
    }
  }
};
