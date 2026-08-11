import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Jogi | IT Professional | AI enthusiast — FinTech & InsureTech Expert",
  description:
    "Rahul (Raul) Jogi — IT Professional & AI Enthusiast with 9+ years of experience (7+ in FinTech/InsureTech). Expert in AI solutions, automation, Agile delivery, and digital transformation. Open to remote, hybrid, and relocation.",
  keywords: [
    "IT Professional",
    "AI Enthusiast",
    "FinTech",
    "InsureTech",
    "Agile",
    "Scrum",
    "JIRA",
    "Confluence",
    "CBAP",
    "PMI-PBA",
    "Rahul Jogi",
    "Raul Jogi",
    "Requirements Gathering",
    "Stakeholder Management",
  ],
  authors: [{ name: "Rahul Jogi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rahul Jogi | IT Professional | AI enthusiast",
    description:
      "IT Professional & AI Enthusiast with 9+ years in FinTech/InsureTech. Available for remote, hybrid, contract and full-time opportunities.",
    siteName: "Rahul Jogi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Jogi | IT Professional | AI enthusiast",
    description: "IT Professional & AI Enthusiast | 9+ years in FinTech/InsureTech | Open to Opportunities",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from "@/components/CustomCursor";
import BackgroundAudio from "@/components/BackgroundAudio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <BackgroundAudio />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
