'use server'

import {prisma} from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function registerUser(_: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Missing email or password', message: '' }
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: 'Email already registered', message: '' }
  }

  const role = email.includes('@admin') ? Role.DEVELOPER : Role.CLIENT

  await prisma.user.create({
    data: {
      email,
      password,
      role,
      name: '', // ค่า default name (ถ้า schema ต้องการ)
    },
  })

  return { error: '', message: 'Registration successful' }
}
