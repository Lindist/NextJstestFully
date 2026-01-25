import Link from "next/link";
import Links from "../links/Links";
const Navbar = () => {
    return (
        <div className="flex justify-between py-5 items-center">
            <div className="font-bold text-2xl">Logo</div>
            <div>
                <Links />
            </div>
        </div>
    );
};

export default Navbar;