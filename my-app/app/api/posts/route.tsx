import { connectToDb } from "@/app/lib/utils";
import { Post } from "@/app/lib/models";
import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

// POST /api/posts — Create a new post
export const POST = async (req: Request) => {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, desc, slug, img, userId } = body;

        await connectToDb();
        const newPost = new Post({ title, desc, slug, img, userId });
        await newPost.save();

        console.log("Post saved");
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return NextResponse.json({ error: `${field} already exists!` }, { status: 409 });
        }
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};
