"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tools = [
  { name: "Flashcard Generator", slug: "flashcard-generator", icon: "📚" },
  { name: "Study Schedule Planner", slug: "study-schedule-planner", icon: "📅" },
  { name: "Concept Map Builder", slug: "concept-map-builder", icon: "🗺️" },
  { name: "Math Problem Solver", slug: "math-problem-solver", icon: "🧮" },
  { name: "Vocabulary Builder", slug: "vocabulary-builder", icon: "📖" },
  { name: "Essay Outline Generator", slug: "essay-outline-generator", icon: "✍️" },
  { name: "Pomodoro Productivity Timer", slug: "pomodoro-timer", icon: "⏰" },
  { name: "Study Goal Tracker", slug: "study-goal-tracker", icon: "🎯" },
  { name: "Note Summarizer", slug: "note-summarizer", icon: "📝" },
  { name: "Mnemonic Generator", slug: "mnemonic-generator", icon: "🧠" },
  { name: "Habit Analyzer", slug: "habit-analyzer", icon: "📊" },
  { name: "Citation Generator", slug: "citation-generator", icon: "📄" },
  { name: "Reading Trainer", slug: "reading-trainer", icon: "👁️" },
  { name: "Memory Games", slug: "memory-games", icon: "🎮" },
  { name: "Grammar Practice", slug: "grammar-practice", icon: "✏️" },
  { name: "Break Planner", slug: "break-planner", icon: "☕" },
]

export default function ToolSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-80 bg-yellow-400 border-l-4 border-black p-6 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-black tracking-tighter mb-2 border-b-2 border-black pb-2">ALL TOOLS</h2>
      </div>

      <nav className="space-y-2">
        {tools.map((tool) => {
          const isActive = pathname === `/tools/${tool.slug}`
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className={`block p-3 border-2 border-black font-mono text-sm transition-all hover:shadow-brutal ${
                isActive ? "bg-red-500 text-white shadow-brutal" : "bg-white hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="mr-2">{tool.icon}</span>
              {tool.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 space-y-4">
        <div className="p-4 bg-white border-2 border-black">
          <h3 className="font-black text-sm mb-2">QUICK TIP</h3>
          <p className="text-xs font-mono">Use multiple tools together for maximum learning efficiency!</p>
        </div>

        <div className="p-4 bg-green-500 text-white border-2 border-black">
          <h3 className="font-black text-sm mb-2">POPULAR COMBO</h3>
          <p className="text-xs font-mono">Try: Flashcards → Pomodoro Timer → Goal Tracker</p>
        </div>
      </div>
    </aside>
  )
}
