"use client"
import { useActionState } from "react"
import { login, handleGithubLogin } from "@/app/lib/action"
import Link from "next/link"
const LoginForm = () => {
    const [state, formAction] = useActionState(login, undefined);
    return (
        <div className="flex gap-[20px] items-center mx-auto flex-col">
            <form action={formAction} className="flex flex-col gap-[20px] md:w-xl w-full">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <input type="text" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="username" id="" placeholder="username" />
                <input type="password" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="password" id="" placeholder="password" />
                <button className="p-5 rounded-md border-none outline-none bg-[var(--btn)] text-white cursor-pointer" type="submit">Login</button>
                {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
                {state?.success && <p style={{ color: "green" }}>Login successful!</p>}
                <Link href="/register" className="text-center underline">Don't have an account? <b>Register</b></Link>
            </form>
            <form action={handleGithubLogin} className="w-full">
                <button className="p-5 rounded-md border-none outline-none bg-white text-black cursor-pointer w-full" type="submit">Login with Github</button>
            </form>
        </div>
    );
};

export default LoginForm;