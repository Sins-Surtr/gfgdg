'use client'

import { useFormState } from 'react-dom'
import { login } from './Developer/actions/login'

const initialState = { error: '', message: '' }

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState)

  return (
    <form action={formAction} className="flex flex-col space-y-4 max-w-sm mx-auto mt-10">
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <input name="password" type="password" placeholder="Password" required className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white py-2">Login</button>

      {state.error && <p className="text-red-500">{state.error}</p>}
    </form>
  )
}
 