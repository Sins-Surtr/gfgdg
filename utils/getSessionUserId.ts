import { cookies } from 'next/headers'

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value

  console.log('userId:', userId) // ตรวจสอบค่าที่ได้จาก cookies

  if (!userId) return "1"

  return userId
}
export async function setSessionUserId(userId: string) {
    const cookieStore = await cookies()
    cookieStore.set('userId', userId, { httpOnly: true, path: '/' })
  }