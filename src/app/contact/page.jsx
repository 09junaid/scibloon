"use client"
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import contactImg from "../../../public/assets/images/svgs/contact-img.svg";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto flex flex-col items-center gap-8 py-12 px-4 xl:px-2">
      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Let&apos;s Keep in Touch
      </h1>

      {/* Contact Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full">
        {/* Illustration */}
        <div className="flex justify-center flex-1 animate-smooth-bounce">
          <Image
            src={contactImg}
            alt="Contact Illustration"
            width={500}
            height={500}
            className="w-72 sm:w-96 lg:w-[550px] h-auto object-contain"
            priority
          />
        </div>

        {/* Contact Form */}
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Message"
            className="px-4 py-3 border border-gray-300 rounded-md min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <Button url="/" text="Send" />
        </form>
      </div>
    </section>
  );
}
