// app/api/books/route.ts
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/db'

export async function GET() {
  try {
    const books = await prisma.book.findMany()
    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}
