import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { CategoryItems } from "@/constants/data";

export  async function generateMetadata({ params }) {
  const categoryData = CategoryItems[params.category] || [];
  const title = categoryData.length
    ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} | Scribloon`
    : "Category Not Found | Scribloon";
  const description = categoryData.length
    ? categoryData[0].desc
    : "Category description not found";
  return {
    title,
    description,
  };
}
export default function CategoryPage({ params }) {
  const categoryData = CategoryItems[params.category] || [];

  return (
    <section className="max-w-6xl mx-auto px-4 xl:px-2 py-2">
      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-10 capitalize text-primary">{params.category}</h1>

      {/* Items */}
      <div className="flex flex-col gap-16">
        {categoryData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-4xl font-semibold">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                <Button url="/" text="See More" />
              </div>

              {/* Image */}
              <div className="flex-1 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
