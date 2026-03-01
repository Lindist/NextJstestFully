"use client"
import { useActionState } from "react"
import { addPost, updatePost } from "@/app/lib/action";
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
    const action = isEditing ? updatePost : addPost;
    const [state, formAction] = useActionState(action, undefined);

    return (
        <form action={formAction} className="space-y-4">
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
            {isEditing && <input type="hidden" name="id" value={editData.id} />}
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
            <button className={`w-full py-3 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg ${
                isEditing
                    ? "bg-amber-600 hover:bg-amber-500 shadow-amber-500/20"
                    : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
            }`}>
                {isEditing ? "Update Post" : "Add Post"}
            </button>
            {state?.error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                    {state.error}
                </p>
            )}
            {state?.success && (
                <p className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
                    {isEditing ? "Post updated successfully!" : "Post added successfully!"}
                </p>
            )}
        </form>
    );
};

export default AdminPostForm;