import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Informi Education Online - Complete Learning Platform | informi.online",
  description:
    "Transform your learning with Informi Education Online. Access flashcards, study planners, concept maps, math solvers, and 6 more powerful educational tools in one platform.",
  keywords:
    "online education, study tools, flashcards, study planner, concept maps, math solver, vocabulary builder, essay generator, pomodoro timer, study tracker, note summarizer, mnemonic generator, learning platform, educational technology",
  authors: [{ name: "Informi Education" }],
  creator: "Informi Education Online",
  publisher: "Informi Education Online",
  robots: "index, follow",
  openGraph: {
    title: "Informi Education Online - Complete Learning Platform",
    description:
      "Transform your learning with 10 powerful educational tools including flashcards, study planners, and math solvers.",
    url: "https://informi.online",
    siteName: "Informi Education Online",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Informi Education Online - Complete Learning Platform",
    description:
      "Transform your learning with 10 powerful educational tools including flashcards, study planners, and math solvers.",
    creator: "@informieducation",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#000000",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://informi.online",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Informi Education Online",
              url: "https://informi.online",
              description: "Complete online learning platform with 10 powerful educational tools",
              sameAs: ["https://twitter.com/informieducation", "https://facebook.com/informieducation"],
              offers: {
                "@type": "Offer",
                category: "Educational Services",
                availability: "https://schema.org/InStock",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Educational Tools",
                itemListElement: [
                  {
                    "@type": "Course",
                    name: "Flashcard Generator",
                    description: "Create and study with digital flashcards",
                  },
                  {
                    "@type": "Course",
                    name: "Study Schedule Planner",
                    description: "Plan and organize your study sessions",
                  },
                  {
                    "@type": "Course",
                    name: "Math Problem Solver",
                    description: "Solve complex mathematical problems step by step",
                  },
                ],
              },
            }),
          }}
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Informi Education" />

        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
