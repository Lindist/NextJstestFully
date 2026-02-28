import Link from "next/link";
import Links from "../links/Links";
import { auth } from "@/app/lib/auth";
const Navbar = async () => {
    const session = await auth();
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]">
            <div className="max-w-7xl w-full mx-auto px-5 flex justify-between py-5 items-center">
                <Link href="/" className="font-bold text-2xl">Logo</Link>
                <div>
                    <Links session={session} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;