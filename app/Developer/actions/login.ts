'use server'

import {prisma} from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function login(_: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Missing email or password', message: '' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.password !== password) {
    return { error: 'Incorrect email or password', message: '' }
  }

  // redirect ตาม role
  if (user.role === 'DEVELOPER') {
    redirect('/Developer')
  } else {
    redirect('/HomePage')
  }
}
