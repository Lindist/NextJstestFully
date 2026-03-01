import { connectToDb } from "@/app/lib/utils";
import { Post } from "@/app/lib/models";
import { NextResponse } from "next/server";

// PUT /api/posts/[id] — Update a post
export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
        const body = await req.json();
        const { title, desc, slug, img, userId } = body;

        await connectToDb();
        await Post.findByIdAndUpdate(id, { title, desc, slug, img, userId });

        console.log("Post updated");
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};

// DELETE /api/posts/[id] — Delete a post
export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
        await connectToDb();
        await Post.findByIdAndDelete(id);

        console.log("Post deleted");
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};
