"use client"
import { register } from "@/app/lib/action"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
const RegisterForm = () => {
    const [state, formAction] = useActionState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        if(state?.success){
            router.push("/login");
        }
    }, [state?.success,router]);
    return (
        <form action={formAction} className="flex flex-col gap-[20px] md:w-xl w-full">
            <h1 className="text-center text-2xl font-bold">Register</h1>
            <input type="text" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="username" id="" placeholder="username" />
            <input type="email" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="email" id="" placeholder="email" />
            <input type="password" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="password" id="" placeholder="password" />
            <input type="password" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" name="confirmpassword" id="" placeholder="passwordRepeat" />
            <button className="p-5 rounded-md border-none outline-none bg-[var(--btn)] text-white cursor-pointer" type="submit">Register</button>
            {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
            {state?.success && <p style={{ color: "green" }}>Registration successful!</p>}
            <Link href="/login" className="text-center underline">Have an account? <b>Login</b></Link>
        </form>
    );
};

export default RegisterForm;