import React from "react";

export default function Layout({ children }) {
  return (
    <>
      {/* Section Heading */}
      <h1 className="max-w-6xl mx-auto px-2 py-6 text-4xl md:text-6xl font-bold">
        Our Works
      </h1>

      {/* Page Content */}
      {children}
    </>
  );
}
