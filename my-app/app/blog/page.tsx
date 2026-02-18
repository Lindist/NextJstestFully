import PostCard from "../components/postCard/postCard";
import { getPosts } from "../lib/data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Page",
  description: "Blog description",
};
//GET fetch API
// const getPosts = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {next: {revalidate: 3600}});
//     if(!res.ok){
//         throw new Error("Failed to fetch posts");
//     }
//     return res.json();
// }
const BlogPage = async () => {
    //GET fetch API
    // const posts = await getPosts();
    //GET fetch without API
    const posts = await getPosts();
    return (
        <div className="flex flex-wrap gap-[20px] justify-between">
            {posts.map((post: any) => (
                <div className="w-[30%] max-md:w-[100%] max-xl:w-[45%]" key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default BlogPage;
