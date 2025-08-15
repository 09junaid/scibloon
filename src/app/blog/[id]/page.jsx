import React from "react";
import Image from "next/image";
import nestedBlog from "../../../../public/assets/images/jpg/nested-blog.jpg";
import avatar from "../../../../public/assets/images/svgs/avatar.svg";
import { date } from "../../../../utils/getYear";

export default function BlogPostPage() {
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
                omnis odio voluptas illum possimus assumenda dignissimos ex rem,
                fugit quod, consequuntur alias voluptatibus adipisci sint odit
                maiores? Praesentium, itaque exercitationem?
              </p>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative">
                  <Image
                    className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                    src={avatar}
                    alt="Author avatar"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">Junaid</div>
                  <div className="text-sm text-muted-foreground">
                    Joined in {date}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <time dateTime="2024-01-15">Jan 15, 2024</time>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={nestedBlog}
                alt="Blog featured image"
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            obcaecati repellat in vel nobis dolore, blanditiis magnam ut
            aspernatur doloribus officia deleniti veniam voluptatum quos nam
            error, odio hic. Accusamus esse itaque cum velit nisi aperiam sunt
            asperiores modi magni nulla earum autem odit nobis corrupti repellat
            nam quidem, provident natus deleniti fuga exercitationem.
          </p>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
            Understanding the Core Concepts
          </h2>
          
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            Dolorem earum natus facilis iure, ullam blanditiis et fuga voluptas
            dolores incidunt, pariatur nostrum nam voluptatem omnis recusandae!
            Error dicta iste dolorum dolores suscipit quod architecto consequuntur
            tenetur quisquam inventore est, ipsam ad sint atque iure aliquam.
            Suscipit velit, molestias porro, qui facere quibusdam asperiores nam
            rem consequuntur incidunt repellendus numquam veniam quisquam ea illo,
            aspernatur beatae cumque corrupti.
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
            Rerum nisi magni suscipit voluptate soluta porro saepe. Unde quam,
            soluta perspiciatis perferendis consectetur velit in ex quidem tenetur
            voluptatibus? Quisquam non deleniti, saepe officiis asperiores odit
            possimus vel similique eaque eligendi sapiente illo autem hic,
            cupiditate tempora! Iusto odio voluptate quas nostrum dolores
            reprehenderit rerum doloribus ad dignissimos.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6">
            Practical Applications
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8">
            Velit voluptas quibusdam, numquam non maxime error, ipsa suscipit
            sequi molestias eum, mollitia repellendus amet vitae omnis sunt
            possimus sint? Ea dolorem maiores hic soluta provident architecto
            iusto voluptates quod perferendis accusamus minus obcaecati vitae
            dolore suscipit nisi, eligendi sit, vero et harum, velit temporibus
            officiis optio? Atque illo esse praesentium ut a iste itaque soluta,
            nesciunt debitis numquam inventore sed reiciendis beatae sapiente
            architecto adipisci quia voluptas consectetur.
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
