import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // ค้นหาผู้ใช้จาก email
    const user = await prisma.user.findFirst({
        where: { email }
    })

    // ตรวจสอบว่าไม่พบผู้ใช้
    if (!user) {
        return {
            error: "User not found",
            message: ""
        }
    }

    // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสที่เก็บในฐานข้อมูล
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return {
            error: "Invalid password",
            message: ""
        }
    }

    // คืนค่า role ของผู้ใช้
    return {
        error: "",
        message: "User logged in successfully",
        role: user.role
    }
}
