"use server"
import { connectToDb } from "./utils";
import { Post } from "./models";
import { revalidatePath } from "next/cache";
export const addPost = async (formData: FormData) => {
    // const title = formData.get("title")
    // const desc = formData.get("desc")
    // const slug = formData.get("slug")
    // const userId = formData.get("userId")

    const {title, desc, slug, userId} = Object.fromEntries(formData.entries())
    
    try{
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });
        
        await newPost.save();
        console.log("Post saved")
        revalidatePath("/blog");
    }catch(error){
        console.log(error);
    }
}

export const deletePost = async (formData: FormData) => {
    
    const { id } = Object.fromEntries(formData.entries())
    
    try{
        connectToDb()
        await Post.findByIdAndDelete(id);
        console.log("Post deleted")
        revalidatePath("/blog");
    }catch(error){
        console.log(error);
    }
}