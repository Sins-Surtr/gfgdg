'use client'

import { useEffect, useState } from 'react'

interface Book {
  id: number
  title: string
  authors: string
  publisher: string
  thumbnail: string
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'booklist' | 'bookshelf'>('booklist')
  const [books, setBooks] = useState<Book[]>([])

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

  return (
    <div className="p-6">
      {/* Taskbar */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'booklist' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('booklist')}
        >
          รายการหนังสือ
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'bookshelf' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('bookshelf')}
        >
          ชั้นหนังสือ
        </button>
      </div>

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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookshelf Placeholder */}
      {activeTab === 'bookshelf' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">ชั้นหนังสือของคุณ</h1>
          <p className="text-gray-500">ยังไม่มีหนังสือในชั้นหนังสือ</p>
        </div>
      )}
    </div>
  )
}
