"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Clock,
  Map,
  Calculator,
  LucideBinary as Vocabulary,
  FileText,
  Timer,
  Target,
  FileCheck,
  Lightbulb,
} from "lucide-react"

const tools = [
  { name: "Flashcard Generator", href: "/flashcard-generator", icon: BookOpen, color: "bg-blue-600" },
  { name: "Study Schedule Planner", href: "/study-schedule-planner", icon: Clock, color: "bg-yellow-500" },
  { name: "Concept Map Builder", href: "/concept-map-builder", icon: Map, color: "bg-red-600" },
  { name: "Math Problem Solver", href: "/math-problem-solver", icon: Calculator, color: "bg-black" },
  { name: "Vocabulary Builder", href: "/vocabulary-builder", icon: Vocabulary, color: "bg-lime-400" },
  { name: "Essay Outline Generator", href: "/essay-outline-generator", icon: FileText, color: "bg-fuchsia-500" },
  { name: "Pomodoro Productivity Timer", href: "/pomodoro-timer", icon: Timer, color: "bg-orange-500" },
  { name: "Study Goal Tracker", href: "/study-goal-tracker", icon: Target, color: "bg-emerald-500" },
  { name: "Note Summarizer", href: "/note-summarizer", icon: FileCheck, color: "bg-blue-600" },
  { name: "Mnemonic Generator", href: "/mnemonic-generator", icon: Lightbulb, color: "bg-yellow-500" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="lg:w-80 lg:flex-shrink-0 lg:ml-8 order-1 lg:order-2">
      {/* No fixed positioning — flows with the page */}
      <div className="bg-white dark:bg-gray-900 border-8 border-black p-6">
        <nav>
          <h2 className="text-lg font-black uppercase mb-6 border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">
            Study Tools
          </h2>
          <ul className="space-y-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              const isActive = pathname === tool.href

              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className={`
                      flex items-center gap-3 p-3 border-2 border-black font-bold text-sm transition-all
                      ${
                        isActive
                          ? `${tool.color} text-white shadow-brutal`
                          : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{tool.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
