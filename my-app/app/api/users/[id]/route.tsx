import { connectToDb } from "@/app/lib/utils";
import { Post, User } from "@/app/lib/models";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { auth } from "@/app/lib/auth";

// PUT /api/users/[id] — Update a user
export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        const body = await req.json();
        const { username, email, password, img, isAdmin } = body;

        await connectToDb();
        const updateData: any = {
            username,
            email,
            img,
            isAdmin: isAdmin === "true" || isAdmin === true,
        };

        if (password && password.toString().trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password.toString(), salt);
        }

        await User.findByIdAndUpdate(id, updateData);

        console.log("User updated");
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};

// DELETE /api/users/[id] — Delete a user and their posts
export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    try {
        await connectToDb();
        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);

        console.log("User deleted");
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};
