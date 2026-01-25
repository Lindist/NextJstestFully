import Image from "next/image";
const AboutPage = () => {
    return (
        <div className="flex gap-[100px]">
            <div className="flex-1 flex flex-col gap-[50px]">
                <h2 className="text-blue-500 text-lg font-bold">About Us</h2>
                <h1 className="text-4xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</h1>
                <p className="font-normal">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque cupiditate labore non delectus tenetur qui totam. Quam in nesciunt, fugiat quasi dignissimos dolor? Quam numquam debitis excepturi eos veniam animi rem error, praesentium porro consectetur esse impedit perferendis adipisci neque quibusdam iste quasi. Facilis odit tempore, at sapiente vero in.</p>
                <div className="flex gap-[50px]">
                    <div className="flex flex-col gap-[10px]">
                        <h2 className="text-blue-500 text-2xl font-bold">10+ k</h2>
                        <p>Years of experience</p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <h2 className="text-blue-500 text-2xl font-bold">10+ k</h2>
                        <p>Years of experience</p>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <h2 className="text-blue-500 text-2xl font-bold">10+ k</h2>
                        <p>Years of experience</p>
                    </div>
                </div>
            </div>
            <div className="relative flex-1">
                <Image className="object-contain" src="/about.png" alt="about" fill />
            </div>
        </div>
    );
};

export default AboutPage;
