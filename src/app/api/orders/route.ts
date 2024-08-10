import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { order } from "~/server/db/schema";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.id) {
    try {
      const orders = await db
        .select()
        .from(order)
        .where(
          and(eq(order.userId, session.user.id), eq(order.paymentStatus, true))
        );
      // console.log(orders);
      console.log(orders[0]?.items);
      console.log(session.user.id);
      return NextResponse.json(orders);
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.json({ test: "true" });
}
