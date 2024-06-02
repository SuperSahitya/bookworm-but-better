import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { cart, user } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

interface CartItem {
  userId?: string | null;
  id: string;
  name: string;
  author: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    throw new Error("Email is undefined");
  }
  const userData = await db.query.user.findFirst({
    where: (table, funcs) => funcs.eq(table.email, email),
  });
  const id: string = userData!.id;
  const cartItems = await db.select().from(cart).where(eq(cart.userId, id));
  return NextResponse.json(cartItems);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartArray: CartItem[] = (await request.json()) as CartItem[];
    const email = session?.user?.email;
    if (!email) {
      throw new Error("Email is undefined");
    }
    const userData = await db.query.user.findFirst({
      where: (table, funcs) => funcs.eq(table.email, email),
    });
    const id: string = userData!.id;

    const response = await db.select().from(cart).where(eq(cart.userId, id));
    const alreadyPresentArray: CartItem[] = response;
    if (alreadyPresentArray && session && email) {
      const length: number = cartArray.length;
      // use entire cartArray ?
      for (let i = 0; i < length; i++) {
        const repeat = cartArray[i];
        if (repeat) {
          await db
            .insert(cart)
            .values(repeat)
            .onConflictDoUpdate({
              target: cart.id,
              set: { quantity: cartArray[i]?.quantity },
            });
        }
      }
    }
    return NextResponse.json(
      await db.select().from(cart).where(eq(cart.userId, id))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      "An error occurred while processing the request : ",
      {
        status: 500,
      }
    );
  }
}

interface idToBeDeleted {
  id: string;
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const deletedCart: idToBeDeleted = (await request.json()) as idToBeDeleted;
    const email = session?.user?.email;
    if (!email) {
      throw new Error("Email is undefined");
    }
    const userData = await db.query.user.findFirst({
      where: (table, funcs) => funcs.eq(table.email, email),
    });
    const id: string = userData!.id;

    if (deletedCart && session && user && email) {
      await db
        .delete(cart)
        .where(and(eq(cart.id, deletedCart.id), eq(cart.userId, id)));
    }
    return NextResponse.json(deletedCart);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      "An error occurred while processing the request : ",
      {
        status: 500,
      }
    );
  }
}
