import Link from "next/link";
import Links from "../links/Links";
const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]">
            <div className="max-w-7xl w-full mx-auto px-5 flex justify-between py-5 items-center">
                <Link href="/" className="font-bold text-2xl">Logo</Link>
                <div>
                    <Links />
                </div>
            </div>
        </div>
    );
};

export default Navbar;