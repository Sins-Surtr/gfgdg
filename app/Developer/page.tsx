import { Book } from "@prisma/client"
import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"

export default async function DeveloperPage() {
  const books = await fetchGoogleBooks()

  async function addBook(formData: FormData) {
    "use server"

    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const authors = formData.get("authors") as string
    const publisher = formData.get("publisher") as string
    const thumbnail = formData.get("thumbnail") as string

    if (!id || !title || !authors || !publisher || !thumbnail) {
      console.error("⚠️ Missing required fields")
      return
    }

    try {
      await prisma.book.create({
        data: {
          id,
          title,
          authors,
          publisher,
          thumbnail,
        },
      })
      revalidatePath("/developer")
    } catch (error) {
      console.error("❌ Failed to insert book:", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Google Books + Add to Database</h1>

      {/* ScrollArea: แสดงข้อมูล */}
      <div className="h-[70vh] w-full overflow-y-scroll border p-4 rounded mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded shadow bg-white">
              <div className="flex gap-4">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"}
                  alt={book.volumeInfo.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="text-sm">
                  <p><strong>ID:</strong> {book.id}</p>
                  <p><strong>Title:</strong> {book.volumeInfo.title}</p>
                  <p><strong>Authors:</strong> {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
                  <p><strong>Publisher:</strong> {book.volumeInfo.publisher || "Unknown"}</p>
                  <p><strong>ThumbnailLink:</strong><br />
                    <span className="break-all text-blue-700">
                      {book.volumeInfo.imageLinks?.thumbnail || "None"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form สำหรับเพิ่มหนังสือ */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">เพิ่มหนังสือเข้า Prisma</h2>
        <form action={addBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="id" placeholder="ID" className="p-2 border rounded" required />
          <input type="text" name="title" placeholder="Title" className="p-2 border rounded" required />
          <input type="text" name="authors" placeholder="Authors (comma-separated)" className="p-2 border rounded" required />
          <input type="text" name="publisher" placeholder="Publisher" className="p-2 border rounded" required />
          <input type="text" name="thumbnail" placeholder="Thumbnail Link" className="p-2 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 col-span-full">Add Book</button>
        </form>
      </div>
    </div>
  )
}

async function fetchGoogleBooks() {
  const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20")
  const data = await res.json()
  return data.items || []
}
