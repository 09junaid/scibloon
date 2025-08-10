"use client";

import Link from "next/link";
import React, { useState } from "react";
import { link } from "../../../types/data";
import { Menu, X } from "lucide-react";
import DarkMode from "../ui/DarkMode/DarkMode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-4 xl:px-2">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-[22px] text-primary"
          aria-label="Scribloon Home"
        >
          Scribloon
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {link.map((linkItem) => (
            <Link
              key={linkItem.id}
              href={linkItem.url}
              className="hover:text-primary transition-colors"
            >
              {linkItem.title}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-accent cursor-pointer rounded hover:bg-primary hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
          <DarkMode/>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 p-4">
            {link.map((linkItem) => (
              <Link
                key={linkItem.id}
                href={linkItem.url}
                className="hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {linkItem.title}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-4 py-2 bg-accent cursor-pointer rounded hover:bg-primary hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
