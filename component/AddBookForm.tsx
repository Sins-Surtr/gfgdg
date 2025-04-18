"use client"

import { useState } from "react"

interface AddBookFormProps {
  addBookToDB: (bookData: any) => void
}

const AddBookForm = ({ addBookToDB }: AddBookFormProps) => {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [authors, setAuthors] = useState('')
  const [publisher, setPublisher] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const handleAddBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!id || !title || !authors || !publisher || !thumbnail) {
      alert("⚠️ Missing required fields")
      return
    }

    const bookData = {
      id,
      title,
      authors,
      publisher,
      thumbnail
    }

    // เรียกฟังก์ชัน addBookToDB ที่ถูกส่งเข้ามา
    addBookToDB(bookData)

    // รีเซ็ตฟอร์มหลังจากเพิ่มข้อมูล
    setId('')
    setTitle('')
    setAuthors('')
    setPublisher('')
    setThumbnail('')
  }

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">เพิ่มหนังสือเข้า Prisma</h2>
      <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="authors"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder="Authors (comma-separated)"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder="Publisher"
          className="p-2 border rounded"
          required
        />
        <input type="text"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Thumbnail Link"
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 col-span-full">Add Book</button>
      </form>
    </div>
  )
}

export default AddBookForm
