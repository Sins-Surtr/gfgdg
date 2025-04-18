import { registerUser } from '../Developer/actions/registerUser'

const RegisterPage = () => {
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const newUser = await registerUser(formData)

        if (newUser) {
            // ลงทะเบียนสำเร็จ
            console.log("User registered:", newUser)
        } else {
            // แจ้งข้อผิดพลาด
            console.log("Registration failed")
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    )
}
