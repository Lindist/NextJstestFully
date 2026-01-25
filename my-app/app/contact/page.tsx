import Image from "next/image";

const ContactPage = () => {
    return (
        <div className="flex gap-[100px] items-center">
            <div className="flex-1 relative h-[500px]">
                <Image src="/contact.png" alt="contact" fill className="object-contain" />
            </div>
            <div className="flex-1">
                <form action="" className="flex flex-col gap-[20px]">
                    <input type="text" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" placeholder="Name and Surname" />
                    <input type="email" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" placeholder="Email Address" />
                    <input type="text" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" placeholder="Phone Number (Optional)" />
                    <textarea name="" id="" className="p-5 rounded-md border-none outline-none bg-[var(--bgSoft)] text-white" placeholder="Message"></textarea>
                    <button className="p-5 rounded-md border-none outline-none bg-[var(--btn)] text-white cursor-pointer">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
