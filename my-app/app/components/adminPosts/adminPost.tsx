"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
    id: string;
    _id: string;
    title: string;
    desc?: string;
    img?: string;
}

const AdminPost = ({ posts }: { posts: Post[] }) => {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                📝 Posts
                <span className="text-sm font-normal text-gray-400">({posts.length})</span>
            </h2>
            <div className="space-y-3">
                {posts.map((post) => (
                    <div key={post.id || post._id} className="flex items-center justify-between bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors duration-200">
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
                                href={`/admin?editPostId=${post.id || post._id}`}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(post.id || post._id)}
                                className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            >
                                Delete
                            </button>
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