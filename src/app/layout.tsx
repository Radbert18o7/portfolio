import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Jogi | IT Business Analyst — FinTech & InsureTech Expert",
  description:
    "Rahul (Raul) Jogi — Business Analyst with 9+ years of experience (7+ in FinTech/InsureTech). Expert in requirements gathering, Agile/Scrum, stakeholder management, and digital transformation. Open to remote, hybrid, and relocation.",
  keywords: [
    "Business Analyst",
    "IT Business Analyst",
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
    title: "Rahul Jogi | IT Business Analyst",
    description:
      "Business Analyst with 9+ years in FinTech/InsureTech. Available for remote, hybrid, contract and full-time opportunities.",
    siteName: "Rahul Jogi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Jogi | IT Business Analyst",
    description: "9+ years in FinTech/InsureTech | Agile | CBAP Pursuing | Open to Opportunities",
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
