import { connectToDb } from "../../../lib/utils";
import { Post } from "../../../lib/models";
import { NextResponse } from "next/server";

export const GET = async (req:Request,{params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    try {
        connectToDb()
        const post = await Post.findOne({slug})
        return NextResponse.json(post)
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed Fetching Post");
    }
}

export const DELETE = async (req:Request,{params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    try {
        connectToDb()
        await Post.deleteOne({slug})
        return NextResponse.json({message: "Post deleted successfully"}, {status: 200})
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed Deleting Post");
    }
}