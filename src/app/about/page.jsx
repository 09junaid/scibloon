import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import AboutUsImg from "../../../public/assets/images/jpeg/about-us.jpeg";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl py-4 px-2 space-y-8">
      {/* Hero Image with Overlay Text */}
      <div className="relative w-full h-[300px]">
        <Image
          src={AboutUsImg}
          alt="About Us"
          fill
          priority
          className="object-cover grayscale"
        />
        <div className="absolute bottom-5 left-5 bg-accent/80 p-4 rounded">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Digital Storytellers
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold leading-tight">
            Handcrafting award-winning digital experiences
          </h2>
        </div>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row gap-[100px]">
        {/* Who Are We Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            Who Are We?
          </h1>
          <p className="text-muted-foreground text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis iure consectetur repellat fuga cumque, possimus harum
            totam minus voluptatum ipsum laboriosam optio quisquam sequi numquam
            aspernatur enim! Pariatur, enim. Velit esse inventore adipisci
            voluptates in dolor consequatur atque animi voluptatibus deleniti.
          </p>
          <p className="text-muted-foreground text-justify">
            Commodi hic corrupti cupiditate provident, neque, doloremque
            expedita reiciendis obcaecati molestiae quibusdam enim. Doloribus,
            eius. Harum corrupti possimus voluptatibus eum. Ab alias
            praesentium, fuga labore expedita nemo tenetur, ea nulla hic odio
            totam saepe, omnis dolores! Tempora, qui laudantium!
          </p>
        </div>

        {/* What We Do Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            What We Do?
          </h1>
          <p className="text-muted-foreground text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            architecto odio! Cumque quisquam velit inventore dicta voluptatem
            voluptas hic et dolore numquam tenetur, in ab, at laudantium, vitae
            dolorum. Necessitatibus?
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Dynamic Websites</li>
            <li>Fast and Handy</li>
            <li>Mobile Apps</li>
          </ul>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </section>
  );
}
