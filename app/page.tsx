import { login } from './Developer/actions/login'

const LoginPage = () => {
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const { error, message, role } = await login(formData)

        if (error) {
            // แจ้งข้อผิดพลาด
            console.log("Error:", error)
        } else {
            // หากล็อกอินสำเร็จ
            console.log("Logged in as", role)
            // เพิ่มการเปลี่ยนหน้าไปยังหน้าอื่นตาม role (เช่นไปยังหน้า Developer หรือ Client)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    )
}
