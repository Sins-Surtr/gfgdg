import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const saltRounds = 10

export async function registerUser(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // บันทึกข้อมูลผู้ใช้ในฐานข้อมูล
    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword, // เก็บรหัสผ่านที่เข้ารหัสแล้ว
            role: email.includes('@admin') ? 'DEVELOPER' : 'CLIENT', // กำหนด role
        }
    })

    return newUser
}
