import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { cart, user } from "~/server/db/schema";
import { eq } from "drizzle-orm";

interface CartItem {
  userId?: string;
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
  const cartItems = await db.select().from(cart).where(eq(cart, id));
  return NextResponse.json(cartItems);
}

export async function POST(request: NextRequest) {
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

  if (cartArray && id) {
    await db.insert(cart).values(cartArray);
  }
}
