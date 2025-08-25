import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Universal Study & Education Support",
  description:
    "Contact Universal Study & Education Support for technical support, feedback, or general inquiries about our educational tools and study resources.",
  keywords: "contact, support, help, educational platform, technical support, feedback, customer service",
  robots: "index, follow",
  openGraph: {
    title: "Contact Us | Universal Study & Education Support",
    description: "Contact Universal Study & Education Support for technical support, feedback, or general inquiries.",
    url: "https://usnewse.com/contact",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | Universal Study & Education Support",
    description: "Contact Universal Study & Education Support for support and inquiries.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us - Universal Study & Education Support",
    description: "Contact page for Universal Study & Education Support educational platform",
    url: "https://usnewse.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Universal Study & Education Support",
      url: "https://usnewse.com",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "",
          contactType: "customer service",
          email: "support@usnewse.com",
          availableLanguage: "English",
        },
        {
          "@type": "ContactPoint",
          contactType: "technical support",
          email: "tech@usnewse.com",
          availableLanguage: "English",
        },
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
