'use client'

import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '@/component/็Header'
import Footer from '@/component/Footer'

interface Book {
  id: string
  title: string
  authors: string
  publisher: string
  thumbnail: string
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'booklist' | 'bookshelf'>('booklist')
  const [books, setBooks] = useState<Book[]>([])
  const [bookshelf, setBookshelf] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/books')
        if (!res.ok) throw new Error('Failed to fetch books')
        const data = await res.json()
        setBooks(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchBooks()
  }, [])

  const addToBookshelf = (book: Book) => {
    if (bookshelf.some((b) => b.id === book.id)) {
      toast.error('หนังสือเล่มนี้อยู่ในชั้นหนังสือแล้ว')
      return
    }

    setBookshelf((prev) => [...prev, book])
    toast.success('เพิ่มสำเร็จ')
  }

  const removeFromBookshelf = (bookId: string) => {
    setBookshelf((prev) => prev.filter((b) => b.id !== bookId))
    toast.success('ลบหนังสือออกจากชั้นหนังสือแล้ว')
  }

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <ToastContainer />

      <div className="p-6">
        {activeTab === 'booklist' && (
          <div>
            <h2 className="text-xl font-bold mb-4">รายการหนังสือ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {books.map((book) => (
                <div key={book.id} className="border rounded shadow p-4 flex gap-4">
                  <img
                    src={book.thumbnail || '/placeholder.jpg'}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p>ผู้แต่ง: {book.authors}</p>
                    <p>สำนักพิมพ์: {book.publisher}</p>
                    <button
                      onClick={() => addToBookshelf(book)}
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                    >
                      เพิ่มเข้าชั้นหนังสือ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookshelf' && (
          <div>
            <h2 className="text-xl font-bold mb-4">ชั้นหนังสือของคุณ</h2>
            {bookshelf.length === 0 ? (
              <p className="text-gray-500">ยังไม่มีหนังสือในชั้นหนังสือ</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookshelf.map((book) => (
                  <div key={book.id} className="border rounded shadow p-4 flex gap-4">
                    <img
                      src={book.thumbnail || '/placeholder.jpg'}
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{book.title}</h3>
                      <p>ผู้แต่ง: {book.authors}</p>
                      <p>สำนักพิมพ์: {book.publisher}</p>
                      <button
                        onClick={() => removeFromBookshelf(book.id)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                      >
                        ลบออกจากชั้นหนังสือ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
