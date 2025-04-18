"use client"

import { Book } from "@prisma/client"

type Props = {
  books: Book[]
}

export default function DatabaseBookList({ books }: Props) {
  return (
    <ul className="space-y-3">
      {books.map((book) => (
        <li key={book.id} className="border rounded p-3 bg-white shadow">
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Authors:</strong> {book.authors}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Thumbnail:</strong> {book.thumbnail}</p>
        </li>
      ))}
    </ul>
  )
}
