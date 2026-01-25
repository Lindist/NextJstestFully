"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
    href: string;
    label: string;
}
const NavLink = ({href,label}:Props) =>{
    const pathname = usePathname();
    return (
        <Link href={href} className={`flex items-center justify-center min-w-[100px] p-2 rounded-3xl font-semibold ${pathname === href ? "bg-[var(--foreground)] text-black" : ""}`}>
            {label}
        </Link>
    )
}

export default NavLink