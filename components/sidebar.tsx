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
  Activity,
  Quote,
  Book,
  Gamepad,
  Type,
  Coffee,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

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
  { name: "Study Habit Analyzer", href: "/study-habit-analyzer", icon: Activity, color: "bg-indigo-600" },
  { name: "Citation Generator", href: "/citation-generator", icon: Quote, color: "bg-teal-500" },
  { name: "Reading Comprehension Trainer", href: "/reading-comprehension-trainer", icon: Book, color: "bg-purple-600" },
  { name: "Memory Game Generator", href: "/memory-game-generator", icon: Gamepad, color: "bg-pink-500" },
  { name: "Grammar Practice", href: "/grammar-practice", icon: Type, color: "bg-cyan-600" },
  { name: "Study Break Planner", href: "/study-break-planner", icon: Coffee, color: "bg-green-500" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Focus trap inside sidebar when open
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      const focusableElements = sidebarRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      ) as NodeListOf<HTMLElement>
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="lg:hidden fixed top-4 right-4 z-50 bg-yellow-500 border-4 border-black p-2 shadow-brutal"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-16 bottom-0 lg:top-0 lg:bottom-0
          right-0 h-full w-80 bg-white dark:bg-gray-900 border-l-8 border-black z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
        style={{ maxHeight: 'calc(100vh - 4rem)' }}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
      >
        <div className="p-6 border-b-4 border-black">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="h-8 w-8 bg-yellow-500 border-4 border-black rotate-12"></div>
            <div className="h-8 w-8 bg-blue-600 border-4 border-black -ml-4 -rotate-12"></div>
            <span className="font-black text-xl tracking-tighter ml-2 text-black dark:text-white">
              USNEWSE
            </span>
          </Link>
        </div>

        <nav className="p-6 h-[calc(100%-80px)] overflow-y-auto" aria-label="Main Navigation">
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
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}
    </>
  )
}
