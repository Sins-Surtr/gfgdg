"use client";
import { APIBook } from "@/utils/type"; // คุณสามารถย้าย type ไปไว้ในไฟล์ /types.ts เพื่อ reuse ได้
import React from "react";
import { useState } from "react";

type Props = {
  book: APIBook;
  onSuccess: (message: string) => void;
  onAddBook: (book: any) => void;
};

export default function AddBookButton({ book, onSuccess, onAddBook }: Props) {
  const addBookToDatabase = async () => {
    const payload = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(", ") || "Unknown",
      publisher: book.volumeInfo.publisher || "Unknown",
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
    };

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        onSuccess(`✅ เพิ่ม "${payload.title}" สำเร็จ`);
        onAddBook(result);
      } else {
        onSuccess(`⚠️ ไม่สามารถเพิ่ม "${payload.title}" (${result.message || "เกิดข้อผิดพลาด"})`);
      }
    } catch (err) {
      onSuccess(`❌ Network error: ${(err as Error).message}`);
    }
  };

  return (
    <button
      className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      onClick={addBookToDatabase}
    >
      Add
    </button>
  );
}
