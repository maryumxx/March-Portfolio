import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maryam — Creative Full Stack Developer",
  description: "A playful animated portfolio where you can explore my work, skills, and story. Built with Next.js, Framer Motion, and a whole lot of love.",
  keywords: ["developer", "portfolio", "full stack", "React", "Next.js", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
