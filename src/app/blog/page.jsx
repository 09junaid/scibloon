import { blogs } from "@/constants/blogData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 xl:px-2 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      {/* Blog List */}
      <div className="flex flex-col gap-12">
        {blogs.map((item) => (
          <article
            key={item.id}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-[250px] md:h-[200px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-wrap">{item.title}</h2>
              <p className="text-muted-foreground text-justify">{item.description}</p>
              <Link
                href={`/blog/${item.id}`}
                className="text-primary font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
