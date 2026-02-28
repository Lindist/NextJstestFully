"use client"

import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useState } from "react";
import styles from "./links.module.css";
import { handleGithubLogout } from "@/app/lib/action";
import { Session } from "next-auth";

const Links = ({ session }: { session: Session | null }) => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];
    const [open,setOpen] = useState(false);

    //Temporaly
    const isAdmin = true;
    return (
        <div className="max-lg:ms-30">
            <div className="flex gap-5 flex-wrap max-md:hidden">
                {links.map((link) => (
                    <NavLink href={link.href} label={link.label} key={link.href}></NavLink>
                ))}{
                    session?.user ? (
                        <>
                        {
                            session.user?.isAdmin && (
                                <NavLink href="/admin" label="Admin"></NavLink>
                            )
                        }
                        <form action={handleGithubLogout}>
                            <button type="submit" className="p-[10px] cursor-pointer font-bold rounded bg-[var(--btnLogout)]">Logout</button>
                        </form>
                        </>
                    ) : (
                        <NavLink href="/login" label="Login"></NavLink>
                    )
                }
            </div>
            <Image className="hidden max-md:block cursor-pointer" src="/menu.png" alt="menu" width={20} height={20} onClick={() => setOpen(!open)} />
            {
                open && (
                    <div className={styles.mobileMenu}>
                        {links.map((link) => (
                            <NavLink href={link.href} label={link.label} key={link.href}></NavLink>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Links;