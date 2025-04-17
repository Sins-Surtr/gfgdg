'use client';
import  STYLE  from '@/constants/style';
import React, { useState } from "react";

export default function RegisterPage() {
    const [form, setfrom] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfrom({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        const respone = await fetch('/actions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await respone.json();
        if (respone.ok) {
            setMessage('ลงทะเบียนสำเร็จ');
        } else {
            setMessage(data.error || 'เกิดข้อผิดพลาดในการลงทะเบียน');
        }
    };

    return(
        <div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
            <input type="text" name="name" placeholder="Username" value={form.name} onChange={handleChange}
            className={STYLE} />

            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className={STYLE} />

            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
            className={STYLE} />
            
            <button onClick={handleRegister} className='bg-blue-700 text-white p-2 rounded'>
                Register
            </button>
            {message && <p>{message}</p>}

        </div>
    );

}