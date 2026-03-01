"use client"
import { useState } from "react";

const ServerActionTestPage = () => {
    const [message, setMessage] = useState("");

    const handleAddPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body = {
            title: formData.get("title"),
            desc: formData.get("desc"),
            slug: formData.get("slug"),
            userId: formData.get("userId"),
        };
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        setMessage(res.ok ? "Post created!" : data.error);
    };

    const handleDeletePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const id = formData.get("id");
        const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        const data = await res.json();
        setMessage(res.ok ? "Post deleted!" : data.error);
    };

    return (
        <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddPost}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="desc" placeholder="Description" />
                <input type="text" name="slug" placeholder="slug" />
                <input type="text" name="userId" placeholder="userId" />
                <button type="submit">Create Post</button>
            </form>
            <form onSubmit={handleDeletePost}>
                <input type="text" name="id" placeholder="Id" />
                <button type="submit">Delete Post</button>
            </form>
        </div>
    );
};

export default ServerActionTestPage;