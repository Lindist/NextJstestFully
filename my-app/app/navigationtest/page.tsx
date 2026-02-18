"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function NavigationTestPage() {
    
    //CLIENT SIDE NAVIGATION
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const q = searchParams.get("q")
    console.log(pathname, q)

    const handleClick = () =>{
        console.log("Clicked")
        router.forward()
    }
    return (
        <div>
            <Link href="/" prefetch={false} >Click here</Link><br/>
            <button onClick={handleClick}>Write and Redirect</button>
            {/* <button onClick={() => router.push("/about")}>About</button> */}
        </div>
    )
}