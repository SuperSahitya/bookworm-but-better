import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";
import { db } from "~/server/db";
import { books } from "~/server/db/schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const book = await db.select().from(books).where(eq(books.id, id));
  return NextResponse.json(book);
}
