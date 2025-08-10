import Image from "next/image";
import hero from "../../public/assets/images/svgs/hero.svg";
import Button from "@/components/ui/Button/Button";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-12 px-2">
      {/* Text Content */}
      <div className="flex flex-col gap-6 flex-1 text-center md:text-left">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-b from-green-500 to-gray-400 bg-clip-text text-transparent"
        >
          Better design for your digital products
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
          Turning your idea into reality. We bring together teams from the
          global tech industry.
        </p>
        <Button url={"/"} text={"See Our Works"}/>
      </div>

      {/* Hero Image with smooth bounce */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="animate-smooth-bounce">
          <Image
            src={hero}
            alt="Hero"
            width={450}
            height={450}
            priority
            className="w-72 sm:w-96 lg:w-[500px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
