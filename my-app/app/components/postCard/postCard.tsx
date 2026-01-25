import Image from "next/image";
import Link from "next/link";
const PostCard = () => {
    return (
        <div className="flex flex-col gap-[20px] mb-[50px]">
            <div className="flex">
                <div className="w-[90%] h-[400px] relative">
                    <Image src="/post1.jpg" alt="" fill className="object-cover" />
                </div>
                <span className="text-[gray] text-[12px] rotate-[-270deg] m-auto">01.01.2024</span>
            </div>
            <div>
                <h1 className="text-[24px] font-bold mb-[20px] w-[90%]">Title</h1>
                <p className="text-[gray] mb-[20px] font-light w-[90%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <Link href="/blog/post" className="underline">Read More</Link>
            </div>
        </div>
    );
};

export default PostCard;