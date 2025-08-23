import React from "react";
import AboutPagePartial from "@/components/pages/about/AboutPage";

export const metadata = {
  title: "About Us | Scribloon",
  description: "Discover the story behind Scribloon. We are digital storytellers crafting award-winning digital experiences and helping creators share their stories.",
  keywords: ["about us", "digital storytelling", "digital experiences", "content creation", "blogging platform"],
  openGraph: {
    title: "About Us | Scribloon",
    description: "Discover the story behind Scribloon. We are digital storytellers crafting award-winning digital experiences and helping creators share their stories.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
    <AboutPagePartial/>
    </>
  );
}
