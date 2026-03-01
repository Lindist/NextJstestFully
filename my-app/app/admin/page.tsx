import { Suspense } from "react";
import AdminPost from "../components/adminPosts/adminPost";
import AdminUser from "../components/adminUser/adminUser";
import AdminPostForm from "../components/adminPostForm/adminPostForm";
import AdminUserForm from "../components/adminUserForm/adminUserForm";
import { auth } from "../lib/auth";
import { getPostById, getUser } from "../lib/data";

const AdminPage = async({ searchParams }: { searchParams: Promise<{ editPostId?: string; editUserId?: string }> }) => {
    const session = await auth();
    const userId = session?.user?.id;
    const params = await searchParams;

    // Fetch data for editing if IDs are present in search params
    let editPostData = null;
    let editUserData = null;

    if (params?.editPostId) {
        try {
            const post = await getPostById(params.editPostId);
            if (post) {
                editPostData = {
                    id: post._id.toString(),
                    title: post.title,
                    desc: post.desc || "",
                    slug: post.slug,
                    img: post.img || "",
                    userId: post.userId,
                };
            }
        } catch (e) {
            console.log("Failed to fetch post for editing", e);
        }
    }

    if (params?.editUserId) {
        try {
            const user = await getUser(params.editUserId);
            if (user) {
                editUserData = {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    img: user.img || "",
                    isAdmin: user.isAdmin,
                };
            }
        } catch (e) {
            console.log("Failed to fetch user for editing", e);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6 md:p-10">
            <h1 className="text-3xl font-bold text-white mb-8">
                🛠️ Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-10 text-gray-400">
                            <svg className="animate-spin h-6 w-6 mr-3 text-indigo-400" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                            </svg>
                            Loading Posts...
                        </div>
                    }>
                        <AdminPost />
                    </Suspense>
                </div>
                <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
                    <AdminPostForm key={editPostData ? `edit-post-${editPostData.id}` : "add-post"} userId={userId ?? ""} editData={editPostData} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-10 text-gray-400">
                            <svg className="animate-spin h-6 w-6 mr-3 text-indigo-400" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                            </svg>
                            Loading Users...
                        </div>
                    }>
                        <AdminUser />
                    </Suspense>
                </div>
                <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
                    <AdminUserForm key={editUserData ? `edit-user-${editUserData.id}` : "add-user"} editData={editUserData} />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
