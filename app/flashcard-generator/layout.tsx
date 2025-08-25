import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Flashcard Generator - Universal Study & Education Support",
  description:
    "Create interactive flashcards for effective studying and memorization. Use spaced repetition and active recall techniques.",
  keywords: "flashcards, study cards, memorization, active recall, spaced repetition, education, learning",
  robots: "index, follow",
  openGraph: {
    title: "Flashcard Generator - USNEWSE.COM",
    description: "Create interactive flashcards for effective studying and memorization",
    url: "https://usnewse.com/flashcard-generator",
    type: "website",
  },
}

export default function FlashcardGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
