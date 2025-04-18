import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: เพิ่มหนังสือใหม่
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, authors, publisher, thumbnail } = body;

    const existing = await prisma.book.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json({ message: 'Book already exists' }, { status: 400 });
    }

    const newBook = await prisma.book.create({
      data: { id, title, authors, publisher, thumbnail },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// ✅ GET: ดึงรายการหนังสือทั้งหมดจาก Prisma
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
