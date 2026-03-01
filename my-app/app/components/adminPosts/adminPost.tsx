import { getPosts } from "@/app/lib/data";
import Image from "next/image";
import { deletePost } from "@/app/lib/action";
import Link from "next/link";

const AdminPost = async() => {

    const posts = await getPosts();

    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                📝 Posts
                <span className="text-sm font-normal text-gray-400">({posts.length})</span>
            </h2>
            <div className="space-y-3">
                {posts.map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors duration-200">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <Image
                                src={post.img || "/noavatar.png"}
                                alt={post.title}
                                width={50}
                                height={50}
                                className="rounded-lg object-cover w-12 h-12 flex-shrink-0"
                            />
                            <div className="min-w-0">
                                <h3 className="text-white font-medium truncate">{post.title}</h3>
                                <p className="text-gray-400 text-sm truncate">{post.desc}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                            <Link
                                href={`/admin?editPostId=${post.id}`}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                                Edit
                            </Link>
                            <form action={deletePost}>
                                <input type="hidden" name="id" value={post.id} />
                                <button className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No posts yet.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPost;