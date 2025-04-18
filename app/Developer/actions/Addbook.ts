'use server'

import { prisma } from "@/lib/prisma"

export async function addBook(bookData: {
  id: string
  title: string
  authors: string
  publisher: string
  thumbnail: string
}) {
  try {
    await prisma.book.create({
      data: bookData
    })
  } catch (error) {
    console.error("Error adding book:", error)
    throw error
  }
}
