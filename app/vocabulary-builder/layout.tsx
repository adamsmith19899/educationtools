import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vocabulary Builder - Universal Study & Education Support",
  description:
    "Expand your vocabulary with contextual learning exercises and interactive quizzes. Track progress and master new words.",
  keywords:
    "vocabulary builder, word learning, language learning, vocabulary quiz, definitions, word mastery, education",
  robots: "index, follow",
  openGraph: {
    title: "Vocabulary Builder - USNEWSE.COM",
    description: "Expand your vocabulary with contextual learning exercises and interactive quizzes",
    url: "https://usnewse.com/vocabulary-builder",
    type: "website",
  },
}

export default function VocabularyBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
