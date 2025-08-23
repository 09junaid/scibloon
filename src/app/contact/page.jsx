import ContactPagePartial from "@/components/pages/contact/ContactPage";

export const metadata = {
  title: "Contact Us | Scribloon",
  description: "Get in touch with Scribloon. We'd love to hear from you and discuss how we can help with your digital storytelling needs.",
  keywords: ["contact", "get in touch", "digital storytelling", "blogging", "content creation"],
  openGraph: {
    title: "Contact Us | Scribloon",
    description: "Get in touch with Scribloon. We'd love to hear from you and discuss how we can help with your digital storytelling needs.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
    <ContactPagePartial/>
    </>
  );
}
