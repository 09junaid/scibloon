import React from "react";
import Image from "next/image";
import { date } from "../../../../utils/getYear";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export default async function BlogPostPage({ params }) {
  const data = await getData(params.id);

  // agar API ka image galat format me aaye (double URL), clean kar dete hain
  const cleanImg =
    data.img?.includes("https://") && data.img.split("https://").length > 2
      ? "https://" + data.img.split("https://")[1]
      : data.img;

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <a href="/blog" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-foreground">Article</span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {data.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {data.description}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative">
                  <Image
                    className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                    src="/assets/images/svgs/avatar.svg" // agar API author image bhi bhejta hai to yahan change kar lo
                    alt={data.author}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">
                    {data.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Joined in {date}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <time dateTime="2024-01-15">Jan 15, 2024</time>
                </div>
              </div>
            </div>

            {/* Featured Image (API se) */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={cleanImg || "/assets/images/jpg/nested-blog.jpg"} // fallback if no img
                alt={data.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg sm:prose-xl max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            {data.content}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
            Understanding the Core Concepts
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            {data.content}
          </p>

          <blockquote className="border-l-4 border-primary bg-muted/50 p-6 my-8 rounded-r-lg">
            <p className="text-lg sm:text-xl italic text-foreground">
              "The best way to predict the future is to invent it."
            </p>
            <cite className="text-sm text-muted-foreground mt-2 block">
              — Alan Kay
            </cite>
          </blockquote>

          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            {data.content}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
            Practical Applications
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            {data.content}
          </p>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <span className="sr-only">Share on Twitter</span>
                  🐦
                </button>
                <button className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <span className="sr-only">Share on LinkedIn</span>
                  💼
                </button>
                <button className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                  <span className="sr-only">Share on Facebook</span>
                  📘
                </button>
              </div>
            </div>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline transition-colors"
            >
              ← Back to Blog
            </a>
          </div>
        </footer>
      </section>
    </article>
  );
}
