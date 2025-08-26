import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Universal Study & Education Support - Free Online Study Tools",
  description:
    "Boost your academic performance with our comprehensive suite of free study tools. Features flashcard generator, study planner, concept maps, math solver, vocabulary builder, essay outlines, Pomodoro timer, goal tracker, note summarizer, and mnemonic generator.",
  keywords: [
    "study tools",
    "education support",
    "flashcard generator",
    "study planner",
    "concept maps",
    "math problem solver",
    "vocabulary builder",
    "essay outline generator",
    "pomodoro timer",
    "study goal tracker",
    "note summarizer",
    "mnemonic generator",
    "online learning",
    "academic success",
    "student resources",
    "free study aids",
  ],
  authors: [{ name: "Universal Study & Education" }],
  creator: "Waqas Bukhari",
  publisher: "Universal Study & Education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.usnewse.com",
    siteName: "Universal Study & Education Support",
    title: "Universal Study & Education Support - Free Online Study Tools",
    description:
      "Comprehensive educational tools and study support platform featuring flashcards, study planners, concept maps, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Universal Study & Education Support - Study Tools Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Study & Education Support - Free Online Study Tools",
    description: "Boost your academic performance with our comprehensive suite of free study tools.",
    images: ["/og-image.jpg"],
    creator: "@usnewse",
  },
  alternates: {
    canonical: "https://www.usnewse.com",
  },
  category: "education",
  generator: "Waqas Bukhari",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://usnewse.com" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Universal Study & Education Support",
              alternateName: "USNEWSE",
              url: "https://usnewse.com",
              description:
                "Comprehensive educational tools and study support platform featuring flashcards, study planners, concept maps, and more.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://usnewse.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "USNEWSE",
                url: "https://usnewse.com",
              },
              mainEntity: {
                "@type": "SoftwareApplication",
                name: "Universal Study & Education Support",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                featureList: [
                  "Flashcard Generator",
                  "Study Schedule Planner",
                  "Concept Map Builder",
                  "Math Problem Solver",
                  "Vocabulary Builder",
                  "Essay Outline Generator",
                  "Pomodoro Productivity Timer",
                  "Study Goal Tracker",
                  "Note Summarizer",
                  "Mnemonic Generator",
                ],
              },
            }),
          }}
        />

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
