'use client'

import { useState, useTransition } from 'react'
import BookClient from '@/app/HomePage/action2/BooKClient'

interface BookClientFormProps {
  bookId: string
}

export default function BookClientForm({ bookId }: BookClientFormProps) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    const result = await BookClient(formData)
    if (result.success) {
      setSuccess(true)
      setError('')
    } else {
      setError(result.error || 'ไม่สามารถเพิ่มหนังสือได้')
      setSuccess(false)
    }
  }

  return (
    <form
      action={(formData) => {
        startTransition(() => handleSubmit(formData))
      }}
    >
      <input type="hidden" name="bookId" value={bookId} />
      <button
        type="submit"
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'กำลังเพิ่ม...' : 'เพิ่มเข้าชั้นหนังสือ'}
      </button>

      {success && <p className="text-green-500 text-sm mt-1">✅ เพิ่มแล้ว</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  )
}
