import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Study Schedule Planner - Universal Study & Education Support",
  description:
    "Plan and organize your study sessions with intelligent scheduling and time management. Track progress and maintain consistency.",
  keywords: "study planner, schedule, time management, study sessions, academic planning, productivity, education",
  robots: "index, follow",
  openGraph: {
    title: "Study Schedule Planner - USNEWSE.COM",
    description: "Plan and organize your study sessions with intelligent scheduling and time management",
    url: "https://usnewse.com/study-schedule-planner",
    type: "website",
  },
}

export default function StudySchedulePlannerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
