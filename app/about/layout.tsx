import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Universal Study & Education Support",
  description:
    "Learn about Universal Study & Education Support - Our mission to provide innovative educational tools and study resources for students worldwide.",
  keywords: "about us, educational platform, study tools, learning resources, student support, education technology",
  robots: "index, follow",
  openGraph: {
    title: "About Us | Universal Study & Education Support",
    description:
      "Learn about Universal Study & Education Support - Our mission to provide innovative educational tools for students.",
    url: "https://usnewse.com/about",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us | Universal Study & Education Support",
    description: "Learn about Universal Study & Education Support and our educational mission.",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us - Universal Study & Education Support",
    description: "About page for Universal Study & Education Support educational platform",
    url: "https://usnewse.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "Universal Study & Education Support",
      url: "https://usnewse.com",
      description:
        "Educational platform providing innovative study tools and resources for students worldwide including flashcards, study planners, and learning aids.",
      foundingDate: "2024",
      mission:
        "To democratize educational technology by providing free, high-quality study tools that adapt to different learning styles and academic needs.",
      serviceArea: "Worldwide",
      knowsAbout: [
        "Educational Technology",
        "Study Tools",
        "Learning Resources",
        "Student Support",
        "Academic Success",
        "Online Learning",
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
