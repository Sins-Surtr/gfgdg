'use client'

import { useEffect, useState } from 'react'
import Header from '@/component/็Header'
import Footer from '@/component/Footer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        const data = await res.json()
        setBooks(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchBooks()
  }, [])

  const handleAddBook = (book: Book) => {
    const alreadyInShelf = bookshelf.find((b) => b.id === book.id)
    if (alreadyInShelf) {
      toast.warning('หนังสือถูกเพิ่มไว้แล้ว')
      return
    }

    setBookshelf([...bookshelf, book])
    toast.success('เพิ่มเข้าชั้นหนังสือแล้ว!')
  }

  const handleRemoveBook = (id: string) => {
    const updatedShelf = bookshelf.filter((book) => book.id !== id)
    setBookshelf(updatedShelf)
    toast.info('ลบหนังสือแล้ว')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToastContainer />

      <div className="flex-grow p-6">
        {/* Book List */}
        {activeTab === 'booklist' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">รายการหนังสือ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {books.map((book) => (
                <div key={book.id} className="border rounded shadow p-4 flex gap-4">
                  <img
                    src={book.thumbnail || '/placeholder.jpg'}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{book.title}</h2>
                    <p>ผู้แต่ง: {book.authors}</p>
                    <p>สำนักพิมพ์: {book.publisher}</p>
                    <button
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleAddBook(book)}
                    >
                      เพิ่มเข้าชั้นหนังสือ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookshelf */}
        {activeTab === 'bookshelf' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">ชั้นหนังสือของคุณ</h1>
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
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">{book.title}</h2>
                      <p>ผู้แต่ง: {book.authors}</p>
                      <p>สำนักพิมพ์: {book.publisher}</p>
                      <button
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleRemoveBook(book.id)}
                      >
                        ลบ
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
