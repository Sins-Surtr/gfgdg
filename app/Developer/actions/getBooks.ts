// app/HomePage/actions/getBooks.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function GET() {
  const books = await prisma.book.findMany()
  return NextResponse.json(books)
}
