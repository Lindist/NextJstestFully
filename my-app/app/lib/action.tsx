"use server"
import { signIn, signOut } from "@/app/lib/auth";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";

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