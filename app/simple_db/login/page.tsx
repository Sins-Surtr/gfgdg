"use client"

import STYLE from "@/constants/style";
import login from "../_actions/login";
import { useActionState } from "react";
import { redirect } from "next/navigation";

export default function Login() {

    const [state, action] = useActionState(login, { error: "", message: "" })

    if (state.error !== "") {
        return (
            <div >
                <h1 className="text-2xl">Login</h1>
                <p className="text-red-500">{state.error}</p>
            </div>
        )
    }

    if (state.message !== "") {
        redirect("/simple_db")
    }

    return (
        <form action={action}>
            <h1>Login</h1>
            <div>
                <label htmlFor="email">Email: </label>
                <input className={STYLE} name="email" type="email" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input className={STYLE} name="password" type="password" />
            </div>
            <div>
                <input className={STYLE} name="remember" type="checkbox" />
                <label htmlFor="remember">Remember</label>
            </div>
            <div>
                <button type="submit" className={STYLE}>Login</button>
            </div>
        </form>
    )
}