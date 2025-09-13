import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Scribloon",
  description: "Explore the latest blog posts and stories on Scribloon. Discover engaging content from our community of digital storytellers.",
  keywords: ["blog", "blog posts", "stories", "digital storytelling", "content", "articles"],
  openGraph: {
    title: "Blog | Scribloon",
    description: "Explore the latest blog posts and stories on Scribloon. Discover engaging content from our community of digital storytellers.",
    type: "website",
  },
};

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogPage() {
  const data = await getData();

  return (
    <section className="max-w-6xl mx-auto px-4 xl:px-2 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>

      {/* Blog List */}
      <div className="flex flex-col gap-12">
        {data.map((item) => (
          <article
            key={item._id}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-[250px] md:h-[200px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={
                  item.img.includes("https://")
                    ? "https://" + item.img.split("https://")[1]
                    : item.img
                }
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-wrap">{item.title}</h2>
              <p className="text-muted-foreground text-justify">
                {item.description}
              </p>
              <Link
                href={`/blog/${item._id}`}
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
