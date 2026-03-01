"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditPostData {
    id: string;
    title: string;
    desc: string;
    slug: string;
    img: string;
    userId: string;
}

const AdminPostForm = ({ userId, editData }: { userId: string; editData?: EditPostData | null }) => {
    const isEditing = !!editData;
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setError("");
        setSuccess("");
        setLoading(true);

        const formData = new FormData(form);
        const body = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            img: formData.get("img"),
            desc: formData.get("desc"),
            userId: formData.get("userId"),
        };

        try {
            const url = isEditing ? `/api/posts/${editData.id}` : "/api/posts";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong!");
            } else {
                setSuccess(isEditing ? "Post updated successfully!" : "Post added successfully!");
                if (!isEditing) {
                    form.reset();
                }
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    {isEditing ? "✏️ Edit Post" : "➕ Add New Post"}
                </h2>
                {isEditing && (
                    <Link
                        href="/admin"
                        className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                        ✕ Cancel
                    </Link>
                )}
            </div>
            <input type="hidden" name="userId" value={isEditing ? editData.userId : userId} />
            <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={isEditing ? editData.title : ""}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <input
                type="text"
                name="slug"
                placeholder="Slug"
                defaultValue={isEditing ? editData.slug : ""}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <input
                type="text"
                name="img"
                placeholder="Image URL"
                defaultValue={isEditing ? editData.img : ""}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
                name="desc"
                placeholder="Description"
                rows={5}
                defaultValue={isEditing ? editData.desc : ""}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg disabled:opacity-50 ${
                    isEditing
                        ? "bg-amber-600 hover:bg-amber-500 shadow-amber-500/20"
                        : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
                }`}
            >
                {loading ? "Processing..." : isEditing ? "Update Post" : "Add Post"}
            </button>
            {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    {error}
                </p>
            )}
            {success && (
                <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                    {success}
                </p>
            )}
        </form>
    );
};

export default AdminPostForm;