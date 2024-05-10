import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { cart, user } from "~/server/db/schema";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const email = session!.user.email;
  return NextResponse.json({ email });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const cartArray = request.json();
  if (!session || !session.user) {
    throw new Error("Session or user is undefined");
  }
  const email = session.user.email;
  if (!email) {
    throw new Error("Email is undefined");
  }

  const result = await db.query.user.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });

  const newEmail: string = result!.email;
  await db.insert(cart).values({ email: newEmail, cart: cartArray });
  return NextResponse.json(email);
}
