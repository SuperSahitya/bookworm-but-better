import bookList from "books";
import { PgTable, TableConfig } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { books } from "~/server/db/schema";

export async function GET(request: NextRequest) {
  const result = await db.query.books.findMany();
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    await db.insert(books).values(bookList);
    const result = await db.query.books.findMany();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}
