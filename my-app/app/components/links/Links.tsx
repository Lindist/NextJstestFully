"use client"

import NavLink from "./navLink/navLink";
import { useState } from "react";
import styles from "./links.module.css";
const Links = () => {
    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];
    const [open,setOpen] = useState(false);

    //Temporaly
    const session = true;
    const isAdmin = true;
    return (
        <div className="max-lg:ms-30">
            <div className="flex gap-5 flex-wrap max-md:hidden">
                {links.map((link) => (
                    <NavLink href={link.href} label={link.label} key={link.href}></NavLink>
                ))}{
                    session ? (
                        <>
                        {
                            isAdmin && (
                                <NavLink href="/admin" label="Admin"></NavLink>
                            )
                        }
                        <button className="p-[10px] cursor-pointer font-bold rounded bg-[var(--btnLogout)]">Logout</button>
                        </>
                    ) : (
                        <NavLink href="/login" label="Login"></NavLink>
                    )
                }
            </div>
            <button className="hidden max-md:block cursor-pointer" onClick={() => setOpen(!open)}>Menu</button>
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