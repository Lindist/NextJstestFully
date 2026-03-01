import { connectToDb } from "./utils";
import { Post } from "./models";
import { User } from "./models";
import { unstable_noStore as noStore } from "next/cache";
//TEMPORARY DATA
// const users =[
//     {id: 1, name: "John Doe", email: "[EMAIL_ADDRESS]"},
//     {id: 2, name: "Jane Doe", email: "[EMAIL_ADDRESS]"},
//     {id: 3, name: "Bob Smith", email: "[EMAIL_ADDRESS]"},
// ];
// const posts =[
//     {id: 1, title: "Post1", body: ".....", userId: 1},
//     {id: 2, title: "Post2", body: ".....", userId: 2},
//     {id: 3, title: "Post3", body: ".....", userId: 3},
//     {id: 4, title: "Post4", body: ".....", userId: 2},
// ];  
export const getPosts = async () => {
    try{
        await connectToDb();
        const posts = await Post.find();
        return posts;
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch posts");
    }
}
export const getPost = async (slug: string) => {
    try{
        await connectToDb();
        const post = await Post.findOne({slug});
        return post;
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch post");
    }
}
export const getPostById = async (id: string) => {
    try{
        await connectToDb();
        const post = await Post.findById(id);
        return post;
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch post");
    }
}
export const getUser = async (id: string) => {
    try{
        noStore();
        await connectToDb();
        const user = await User.findById(id);
        return user;
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}

export const getUsers = async () => {
    try{
        await connectToDb();
        const users = await User.find();
        return users;
    }catch(error){
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}
