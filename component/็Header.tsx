'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logoutAction } from '@/app/Developer/actions/logoutAction'

export default function Header({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'booklist' | 'bookshelf'
  setActiveTab: (tab: 'booklist' | 'bookshelf') => void
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutAction()
    router.push('/') // กลับหน้าแรก หรือจะ redirect ไป login page ก็ได้
  }

  return (
    <div>
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">ร้านหนังสือของคนข้างทาง</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition mt-2 md:mt-0"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-gray-100 shadow-md mb-6">
        <div className="container m-auto px-4 py-2 flex justify-between">
          <button
            onClick={() => setActiveTab('booklist')}
            className={`px-4 py-2 rounded ${activeTab === 'booklist' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
          >
            รายการหนังสือ
          </button>
          <button
            onClick={() => setActiveTab('bookshelf')}
            className={`px-4 py-2 rounded ${activeTab === 'bookshelf' ? 'bg-blue-600 text-white' : 'text-gray-700'}`}
          >
            ชั้นหนังสือของคุณ
          </button>
        </div>
      </nav>
    </div>
  )
}
