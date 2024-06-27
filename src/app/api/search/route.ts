import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { books } from "~/server/db/schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ message: "No query found." }, { status: 500 });
  }
  const regexPattern = `%${query}%`;
  const nameMatches = await db
    .select()
    .from(books)
    .where(sql`${books.name} ~~* ${regexPattern}`);
  const authorMatches = await db
    .select()
    .from(books)
    .where(sql`${books.author} ~~* ${regexPattern}`);
  console.log({ nameMatches, authorMatches });
  return NextResponse.json({ nameMatches, authorMatches });
}
