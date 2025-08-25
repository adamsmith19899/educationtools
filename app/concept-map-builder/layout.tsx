import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Concept Map Builder - Universal Study & Education Support",
  description:
    "Visualize relationships between concepts with interactive mind maps and knowledge graphs. Perfect for brainstorming and studying.",
  keywords: "concept map, mind map, knowledge graph, brainstorming, visual learning, concept mapping, education",
  robots: "index, follow",
  openGraph: {
    title: "Concept Map Builder - USNEWSE.COM",
    description: "Visualize relationships between concepts with interactive mind maps and knowledge graphs",
    url: "https://usnewse.com/concept-map-builder",
    type: "website",
  },
}

export default function ConceptMapBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
