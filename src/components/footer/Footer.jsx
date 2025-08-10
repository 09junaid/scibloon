import React from "react";
import { date } from "../../../utils/getYear";
import { image } from "@/constants/images";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-6 px-4 xl:px-2 text-center sm:text-left">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {date} <span className="font-semibold">Scribloon</span>. All
          rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-5">
          {image.map((item) => (
            <span
              key={item.id}
              className="hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              {item.url}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
