import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Math Problem Solver - Universal Study & Education Support",
  description:
    "Step-by-step solutions for complex mathematical problems including algebra, calculus, geometry, and more. Get detailed explanations.",
  keywords: "math solver, step by step solutions, algebra, calculus, geometry, mathematics, problem solving, education",
  robots: "index, follow",
  openGraph: {
    title: "Math Problem Solver - USNEWSE.COM",
    description: "Step-by-step solutions for complex mathematical problems including algebra, calculus, and more",
    url: "https://usnewse.com/math-problem-solver",
    type: "website",
  },
}

export default function MathProblemSolverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
