import Image from "next/image";
import { getUser } from "../../lib/data";

//GET fetch API
// const getPostUser = async (userId: number) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {cache: "no-store"});
//     if(!res.ok){
//         throw new Error("Failed to fetch posts");
//     }
//     return res.json();
// }
const PostUser = async ({userId}: {userId: string}) => {
    //GET fetch API
    // const user = await getPostUser(userId);
    //GET fetch without API
    const user = await getUser(String(userId));

    return (
        <>
            {user.img ? (
                <div>
                    <Image src={user.img} alt="" width={50} height={50} className="object-cover rounded-full" /> 
                </div>
            ) : (
                <div>
                    <Image src="/noavatar.png" alt="" width={50} height={50} className="object-cover rounded-full" /> 
                </div>
            )}
            <div className="flex flex-col gap-[10px]">
                <span className="text-[gray] font-bold">Author</span>
                <span className="font-light">{user ? user.username : "Unknown"}</span>
            </div>
        </>
    );
};

export default PostUser;