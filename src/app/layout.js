import { DM_Sans, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "../../context/ThemeContext";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Scribloon",
  description: "Your stories, amplified. Explore, write, and connect with a community of bloggers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${lora.variable} ${ibmPlexMono.variable} antialiased min-h-dvh flex flex-col`}
      >
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s? s==='dark': m;document.documentElement.classList.toggle('dark', d);}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded focus:shadow"
          >
            Skip to content
          </a>
          <Navbar />
            <main id="content" className="flex-1 focus:outline-none">
              {children}
            </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}