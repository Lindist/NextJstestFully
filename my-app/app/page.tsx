import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-[100px] ">
      <div className="flex-1 flex flex-col gap-[50px]">
        <h1 className="text-7xl max-sm:text-center max-md:text-5xl font-bold">Creative Thought Catda.</h1>
        <p className="text-xl max-sm:text-center max-md:text-lg">Best place to buy and sell second hand products.</p>
        <div className="flex gap-[10px] max-md:flex-col">
          <button className="p-5 bg-[var(--btn)] text-white rounded-md cursor-pointer">Learn More</button>
          <button className="p-5 bg-[var(--foreSoft)] text-black rounded-md cursor-pointer">Contact Us</button>
        </div>
        <div className="w-[500px] max-md:w-full h-[50px] relative grayscale">
          <Image src="/brands.png" alt="brands" fill className="object-contain" />
        </div>
      </div>
      <div className="relative flex-1 max-sm:hidden">
        <Image src="https://tenor.com/th/view/cat-spinning-cat-maxwell-the-cat-spinner-but-heres-the-gif-27262628.gif" alt="hero" fill className="object-contain" />
      </div>
    </div>
  );
}
