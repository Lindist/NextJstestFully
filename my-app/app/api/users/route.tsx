import { connectToDb } from "@/app/lib/utils";
import { User } from "@/app/lib/models";
import { NextResponse } from "next/server";

// POST /api/users — Create a new user
export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { username, email, password, img, isAdmin } = body;

        await connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img,
            isAdmin: isAdmin === "true" || isAdmin === true,
        });
        await newUser.save();

        console.log("User saved");
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
    }
};
