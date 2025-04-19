'use client'

import { useFormState } from 'react-dom'
import { registerUser } from '../Developer/actions/registerUser'
import Link from 'next/link'

const initialState = { error: '', message: '' }

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form action={formAction} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {state.error && <p className="text-red-500 text-sm mb-4">{state.error}</p>}
        {state.message && <p className="text-green-500 text-sm mb-4">{state.message}</p>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>

          <Link
            href="/"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}
