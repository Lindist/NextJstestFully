import Image from "next/image";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    img?: string;
    slug: string;
}

const PostCard = ({post}: {post: Post}) => {
    return (
        <div className="flex flex-col gap-[20px] mb-[50px]">
            <div className="flex">
                {post.img ? <div className="w-[90%] h-[400px] relative">
                    <Image src={post.img} alt="" fill className="object-cover" />
                </div> : <div className="w-[90%] h-[400px] relative">
                    <Image src="/noimage.jpg" alt="" fill className="object-cover" />
                </div>}
                <span className="text-[gray] text-[12px] rotate-[-270deg] m-auto">01.01.2024</span>
            </div>
            <div>
                <h1 className="text-[24px] font-bold mb-[20px] w-[90%]">{post.title}</h1>
                <p className="text-[gray] mb-[20px] font-light w-[90%]">{post.body}</p>
                <Link href={`/blog/${post.slug}`} className="underline">Read More</Link>
            </div>
        </div>
    );
};

export default PostCard;