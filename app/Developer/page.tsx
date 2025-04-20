"use client"

import { useEffect, useState } from "react"
import { Book } from "@prisma/client"
import GoogleBookList from "@/component/GoogleBookList"
import { addBook } from "./actions/Addbook"

export default function DeveloperPage() {
  const [googleBooks, setGoogleBooks] = useState<any[]>([])
  const [dbBooks, setDbBooks] = useState<Book[]>([])

  useEffect(() => {
    fetchGoogleBooks()
    fetchBooksInDB()
  }, [])

  async function fetchGoogleBooks() {
    const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20")
    const data = await res.json()
    setGoogleBooks(data.items || [])
  }

  async function fetchBooksInDB() {
    const res = await fetch("/api/books")
    const books = await res.json()
    setDbBooks(books)
  }

  // ฟังก์ชันนี้จะถูกส่งไปให้ component
  async function addBookToDB(bookData: any) {
    try {
      await addBook(bookData)
      alert("✅ Book added successfully")
      fetchBooksInDB()
    } catch (error) {
      alert("❌ Failed to add book")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Google Books + Add to Database</h1>
        <GoogleBookList books={googleBooks} addBookToDB={addBookToDB} />

        <h2 className="text-xl font-bold mt-8 mb-4">รายชื่อหนังสือในฐานข้อมูล</h2>
        <ul className="space-y-3">
          {dbBooks.map((book) => (
            
              <li key={book.id} className="border rounded p-3 bg-white shadow">
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Authors:</strong> {book.authors}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Thumbnail:</strong> {book.thumbnail}</p>
              </li>
            
          ))}
        </ul>
      </div>
    </div>
  )
}
