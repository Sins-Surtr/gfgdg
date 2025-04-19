'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} ร้านหนังสือของคนข้างทาง |{' '}
          <Link href="./HomePage/TeamService" className="underline hover:text-yellow-300">
            Team Service
          </Link>
        </p>
      </div>
    </footer>
  )
}
