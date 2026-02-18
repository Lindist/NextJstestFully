import { addPost, deletePost } from "../lib/action";
const ServerActionTestPage = () => {
    // const actionIncomponent = async () => {
    //     "use server"
    //     console.log("it works");
    // }
    return (
        <div>
            <form action={addPost}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="desc" placeholder="Description" />
                <input type="text" name="slug" placeholder="slug" />
                <input type="text" name="userId" placeholder="userId" />
                <button type="submit">Create Post</button>
            </form>
            <form action={deletePost}>
                <input type="text" name="id" placeholder="Id" />
                <button type="submit">Delete Post</button>
            </form>
        </div>
    );
};

export default ServerActionTestPage;