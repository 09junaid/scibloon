"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { link } from "../../../types/data";
import { Menu, X } from "lucide-react";
import DarkMode from "../ui/DarkMode/DarkMode";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (url) => {
    if (!pathname) return false;
    if (url === "/") return pathname === "/";
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
          {link.map((linkItem) => {
            const active = isActive(linkItem.url);
            return (
              <Link
                key={linkItem.id}
                href={linkItem.url}
                aria-current={active ? "page" : undefined}
                className={`transition-colors ${
                  active ? "text-primary font-medium" : "hover:text-primary"
                }`}
              >
                {linkItem.title}
              </Link>
            );
          })}
          <DarkMode />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-accent cursor-pointer rounded hover:bg-primary hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 p-4">
            {link.map((linkItem) => {
              const active = isActive(linkItem.url);
              return (
                <Link
                  key={linkItem.id}
                  href={linkItem.url}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${
                    active ? "text-primary font-medium" : "hover:text-primary"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {linkItem.title}
                </Link>
              );
            })}
            <DarkMode />
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-4 py-2 bg-accent cursor-pointer rounded hover:bg-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}