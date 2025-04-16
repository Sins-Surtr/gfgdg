"use client";
import STYLE from "@/constants/style"
import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"
import Link from "next/link"

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    await fetch(`/api/delete-guitar?id=${id}`, { method: "DELETE" });
    window.location.reload(); // Refresh the page after deletion
  }

  return (
    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={handleDelete}>
      Delete
    </button>
  );
}
