import PostCard from "../components/postCard/postCard";

const BlogPage = () => {
    return (
        <div className="flex flex-wrap gap-[20px] justify-between">

            <div className="w-[30%] max-md:w-[100%] max-xl:w-[45%]">
                <PostCard />
            </div>
            <div className="w-[30%] max-md:w-[100%] max-xl:w-[45%]">
                <PostCard />
            </div>
            <div className="w-[30%] max-md:w-[100%] max-xl:w-[45%]">
                <PostCard />
            </div>

        </div>
    );
};

export default BlogPage;
