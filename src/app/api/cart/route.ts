import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { cart, user } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const hello = [
    ["hello", 4],
    ["hello", 4],
  ];
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    throw new Error("Email is undefined");
  }
  const userData = await db.query.user.findFirst({
    where: (table, funcs) => funcs.eq(table.email, email),
  });
  const id: string = userData!.id;
  const cart = await db.query.cart.findMany({
    where: (table, funcs) => funcs.eq(table.id, id),
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const cartArray: (string | number)[][] = (await request.json()) as (
    | string
    | number
  )[][];
  const email = session?.user?.email;
  if (!email) {
    throw new Error("Email is undefined");
  }
  const userData = await db.query.user.findFirst({
    where: (table, funcs) => funcs.eq(table.email, email),
  });
  const id: string = userData!.id;

  if (cartArray) {
    await Promise.all(
      cartArray.map(async (element) => {
        await db.insert(cart).values({
          id: id,
          book_id: element[0] as string,
          quantity: element[1] as number,
        });
      })
    );
  }
}
