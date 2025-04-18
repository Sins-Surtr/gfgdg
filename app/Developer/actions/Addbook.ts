// app/developer/actios/Addbook.tsx

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id, title, authors, publisher, thumbnail } = body;

  const exists = await prisma.book.findUnique({ where: { id } });
  if (exists) {
    return NextResponse.json({ message: "Book already added." }, { status: 400 });
  }

  await prisma.book.create({
    data: {
      id,
      title,
      authors,
      publisher,
      thumbnail,
    },
  });

  return NextResponse.json({ message: "Book added to database!" });
}