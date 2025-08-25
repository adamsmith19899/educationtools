import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Essay Outline Generator - Universal Study & Education Support",
  description:
    "Generate structured outlines for essays and research papers with organized sections. Perfect for academic writing and assignments.",
  keywords:
    "essay outline, writing structure, academic writing, research paper, essay planning, writing tool, education",
  robots: "index, follow",
  openGraph: {
    title: "Essay Outline Generator - USNEWSE.COM",
    description: "Generate structured outlines for essays and research papers with organized sections",
    url: "https://usnewse.com/essay-outline-generator",
    type: "website",
  },
}

export default function EssayOutlineGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
