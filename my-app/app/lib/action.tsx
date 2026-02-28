"use server"
import { signIn, signOut } from "@/app/lib/auth";
import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { constants } from "node:buffer";
import bcrypt from "bcrypt";

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

export const handleGithubLogin = async () => {
        "use server"
        await signIn("github");
}

export const handleGithubLogout = async () => {
        "use server"
        await signOut();
}

export const register = async (previousState: { error?: string; success?: boolean } | undefined, formData: FormData): Promise<{ error?: string; success?: boolean }> => {
    const { username, email, password, img, confirmpassword } = Object.fromEntries(formData.entries())
    
    if(password !== confirmpassword){
        return { error: "Passwords do not match" };
    }

    try{
        connectToDb();
        const user = await User.findOne({username});
        if(user){
            return { error: "Username already exists" };
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });
        await newUser.save();
        return { success: true };
    }catch(err){
        console.log(err);
        return { error: "Something went wrong!" };
    }

}

export const login = async (previousState: { error?: string; success?: boolean } | undefined, formData: FormData): Promise<{ error?: string; success?: boolean }> => {
    const { username, password } = Object.fromEntries(formData.entries())
    
    try{
        connectToDb();
        const user = await User.findOne({username});
        if(!user){
            return { error: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(password.toString(), user.password);
        if(!isPasswordValid){
            return { error: "Invalid password" };
        }
        await signIn("credentials", { username, password });
        return { success: true };
    }catch(err){
        console.log(err);
        throw err;
    }

}