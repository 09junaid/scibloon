import { portfolio } from "@/constants/images";
import Link from "next/link";
import React from "react";

export default function PortfolioPage() {
  return (
    <section className="max-w-6xl mx-auto flex flex-col gap-8 py-8 px-4 xl:px-2">
      {/* Page Heading */}
      <h2 className="text-xl font-bold px-2">Choose a Gallery</h2>

      {/* Portfolio Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="group relative w-full h-[400px] border-4 border-border rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${item.url.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Title Overlay */}
            <span className="absolute bottom-3 right-3 text-4xl font-bold text-accent group-hover:text-primary transition-colors">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
