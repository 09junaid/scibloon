"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function DarkModeToggle() {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      className={`w-[50px] h-[26px] border border-primary rounded-full flex items-center justify-between px-1 relative cursor-pointer transition-colors duration-300 ${
        mode === "light" ? "bg-white" : "bg-gray-800"
      }`}
    >
      {/* Moon */}
      <span className="text-[12px]">🌙</span>
      {/* Sun */}
      <span className="text-[12px]">🌞</span>

      {/* Toggle Knob */}
      <span
        className={`w-[16px] h-[16px] bg-primary rounded-full absolute top-1 transition-all duration-300 ${
          mode === "dark" ? "right-1" : "left-1"
        }`}
      />
    </button>
  );
}
