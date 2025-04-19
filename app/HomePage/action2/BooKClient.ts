'use server'

import { prisma } from '@/lib/db'
import { getSessionUserId } from '@/utils/getSessionUserId'

export default async function BookClient(formData: FormData) {
  const bookId = formData.get('bookId') as string

  
  const userId = await getSessionUserId()
  if (!userId) {
    return { success: false, error: 'Unauthorized' }
  }
  console.log('userId:', userId)  // ตรวจสอบว่าได้ userId หรือไม่

  try {
    await prisma.bookshelf.create({
      data: {
        userId,
        bookId,
      },
    })

    return { success: true, message: 'เพิ่มเข้าชั้นหนังสือแล้ว' }
  } catch (error) {
    console.error(error)
    return { success: false, error: 'เกิดข้อผิดพลาด' }
  }
}
