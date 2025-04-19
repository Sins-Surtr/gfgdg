'use server'

import { cookies } from 'next/headers'

export async function logoutAction() {
    try {
        console.log("=== before logout ===");
        await (await cookies()).delete('session')
        console.log("=== after delete logout ===");

        return { message: "Logout Success" }
    }
    catch (e) {
        console.log("Error: ", e)   
        return { message: "Logout Failed" }  // กรณีเกิดข้อผิดพลาด
    }
    finally {
        console.log("=== finally logout ===");
    }
    // return NextResponse.json({ message: "Logout Success" })
}
