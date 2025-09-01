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
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-yellow-500 border-4 border-black p-2 shadow-brutal"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 border-l-8 border-black z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6 border-b-4 border-black">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-yellow-500 border-4 border-black rotate-12"></div>
            <div className="h-8 w-8 bg-blue-600 border-4 border-black -ml-4 -rotate-12"></div>
            <span className="font-black text-xl tracking-tighter ml-2 text-black dark:text-white">USNEWSE</span>
          </Link>
        </div>

        <nav className="p-6">
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
                    onClick={() => setIsOpen(false)}
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
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
