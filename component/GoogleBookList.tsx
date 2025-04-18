"use client"

interface GoogleBookListProps {
  books: any[];
  addBookToDB: (bookData: any) => void; // ฟังก์ชันที่รับข้อมูลเพื่อเพิ่มหนังสือใน DB
}

const GoogleBookList = ({ books, addBookToDB }: GoogleBookListProps) => {
  return (
    <div className="h-[60vh] w-full overflow-y-scroll border p-4 rounded mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow bg-white">
            <div className="flex gap-4">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg"} // placeholder ถ้าไม่มี thumbnail
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
                <button
                  onClick={() => addBookToDB({
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors?.join(", ") || "Unknown",
                    publisher: book.volumeInfo.publisher || "Unknown",
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
                  })}
                  className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 mt-2"
                >
                  Add to DB
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleBookList;
