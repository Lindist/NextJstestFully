import Image from "next/image";
import PostUser from "../../components/postUser/postUser";
import { Suspense } from "react";
// import { getPost } from "../../lib/data";
import { notFound } from "next/navigation";

//GET fetch API
const getPost = async (slug: string) => {
    const res = await fetch(`${process.env.BASE_URI || 'http://localhost:3000'}/api/blog/${slug}`, {next: {revalidate: 3600}});
    if(!res.ok){
        throw new Error("Failed to fetch posts");
    }
    return res.json();
}

export const generateMetadata = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const post = await getPost(String(slug));
    return {
        title: post.title,
        description: post.desc,
    };
}

const BlogSlugPage = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    //GET fetch API
    const post = await getPost(slug);
    //GET fetch without API
    // const post = await getPost(String(slug));

    if (!post) {
        return notFound();
    }
    return (
        <div className="flex gap-[100px]">
            {post.img ? <div className="flex-1 relative h-[calc(100vh-100px)] max-md:hidden">
                <Image src={post.img} alt="" fill className="object-cover" />
            </div> : <div className="flex-1 relative h-[calc(100vh-100px)] max-md:hidden">
                <Image src="/noimage.jpg" alt="" fill className="object-cover" />
            </div>}
            
            <div className="flex-2 flex flex-col gap-[50px]">
                <h1 className="text-[64px] font-bold mb-[24px]">{post.title}</h1>
                <div className="flex gap-[20px]">
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={post.userId} />
                    </Suspense>
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[gray] font-bold">Published</span>
                        <span className="font-light">{post.createdAt.toString().slice(0, 10)}</span>
                    </div>
                </div>
                <div>
                    {post.desc}
                </div>
            </div>
        </div>
    );
};

export default BlogSlugPage;