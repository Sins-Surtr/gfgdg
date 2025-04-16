'use client'

import React, { useEffect, useState } from 'react';

type Book = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=10');
      const data = await res.json();
      const booksData: Book[] = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title || 'No Title',
        authors: item.volumeInfo.authors || ['Unknown Author'],
        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      }));
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 รายการหนังสือ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border rounded-xl p-4 shadow-md">
            {book.thumbnail && (
              <img src={book.thumbnail} alt={book.title} className="w-full h-60 object-cover rounded-md mb-2" />
            )}
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">👤 ผู้เขียน: {book.authors.join(', ')}</p>
            <p className="text-sm text-gray-600">🏢 ผู้จัดจำหน่าย: {book.publisher}</p>
            <p className="text-xs text-gray-400 mt-1">🆔 ID: {book.id}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
