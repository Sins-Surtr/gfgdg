import { PrismaClient, Role } from '@prisma/client';
import { error } from 'console';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password} = body;

    if (!name || !email || !password) {
        return NextResponse.json({ error: 'กรุณาใส่ข้อมูลให้ครบถ้วน' }, {status: 400});
    }

    const exitingUser = await prisma.user.findUnique({ where: { email}});
    if (exitingUser) {
        return NextResponse.json({ error: 'มีอีเมลนี้ในระบบแล้ว' }, {status: 409});
    }

    const role = email.endsWith('.ac.th') ? Role.DEVELOPER : Role.CLIENT;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        });

        return NextResponse.json({ success : true, user}, {status: 201});
    } catch (err) {
        return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียน' }, {status: 500});
    }

}