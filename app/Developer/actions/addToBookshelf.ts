// app/HomePage/actions/addToBookshelf.ts
"use server"

import { Book } from "@prisma/client"

export default async function addToBookshelf(book: Book) {
  // สมมุติว่า client เก็บไว้ใน session ฝั่ง client (ใช้ useState แทนจริง)
  console.log("เพิ่มหนังสือไปชั้นหนังสือ:", book.title)
}
