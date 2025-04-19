'use client'

import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/Developer/actions/logoutAction'

export default function LogoutPage() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await logoutAction()

    // หาก logout สำเร็จ ให้ทำการ redirect ไปที่หน้าอื่น (เช่นหน้า login หรือหน้า home)
    if (result.message === "Logout Success") {
      // ใช้ router.push เพื่อไปหน้า login หรือ home
      router.replace('/')  // สามารถเปลี่ยน path ได้ตามต้องการ
    }
  }

  return (
    <div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}
