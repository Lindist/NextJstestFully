import Image from "next/image";

const BlogSlugPage = () => {
    return (
        <div className="flex gap-[100px]">
            <div className="flex-1 relative h-[calc(100vh-100px)] max-md:hidden">
                <Image src="/post1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="flex-2 flex flex-col gap-[50px]">
                <h1 className="text-[64px] font-bold mb-[24px]">Title</h1>
                <div className="flex gap-[20px]">
                    <div>
                    <Image src="/noavatar.png" alt="" width={50} height={50} className="object-cover rounded-full" /> 
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[gray] font-bold">Author</span>
                        <span className="font-light">Four Cathoa</span>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[gray] font-bold">Published</span>
                        <span className="font-light">01.01.2024</span>
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis impedit, dolores asperiores vitae expedita, eos consequuntur placeat beatae reiciendis vero distinctio quae magnam iure deleniti aliquid fugit consequatur sunt corrupti!
                </div>
            </div>
        </div>
    );
};

export default BlogSlugPage;