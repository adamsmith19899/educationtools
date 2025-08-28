import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-8 border-black">
      <div className="container px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-yellow-500 border-4 border-white rotate-12"></div>
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-600 border-4 border-white -ml-6 sm:-ml-8 -rotate-12"></div>
              <span className="font-black text-2xl sm:text-3xl tracking-tighter ml-4 sm:ml-6">Universal Study & Education</span>
            </div>
            <p className="text-lg sm:text-xl mb-6 leading-relaxed">
              Universal Study & Education Support - Comprehensive educational tools designed to enhance your learning
              experience through innovative technology and evidence-based methodologies.
            </p>
            <div className="flex gap-4">
              <div className="h-8 w-8 bg-red-600 border-2 border-white"></div>
              <div className="h-8 w-8 bg-blue-600 border-2 border-white"></div>
              <div className="h-8 w-8 bg-yellow-500 border-2 border-white"></div>
              <div className="h-8 w-8 bg-emerald-500 border-2 border-white"></div>
            </div>
          </div>
          {/* Study Tools */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
              STUDY TOOLS
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/flashcard-generator" className="text-base sm:text-lg hover:text-yellow-500 transition-colors font-mono">
                  FLASHCARD GENERATOR
                </Link>
              </li>
              <li>
                <Link href="/study-schedule-planner" className="text-base sm:text-lg hover:text-blue-400 transition-colors font-mono">
                  STUDY PLANNER
                </Link>
              </li>
              <li>
                <Link href="/concept-map-builder" className="text-base sm:text-lg hover:text-red-400 transition-colors font-mono">
                  CONCEPT MAPPER
                </Link>
              </li>
              <li>
                <Link href="/math-problem-solver" className="text-base sm:text-lg hover:text-cyan-400 transition-colors font-mono">
                  MATH SOLVER
                </Link>
              </li>
              <li>
                <Link href="/vocabulary-builder" className="text-base sm:text-lg hover:text-lime-400 transition-colors font-mono">
                  VOCAB BUILDER
                </Link>
              </li>
              {/* New Tools Added */}
              <li>
                <Link href="/study-habit-analyzer" className="text-base sm:text-lg hover:text-indigo-400 transition-colors font-mono">
                  HABIT ANALYZER
                </Link>
              </li>
              <li>
                <Link href="/citation-generator" className="text-base sm:text-lg hover:text-teal-400 transition-colors font-mono">
                  CITATION GENERATOR
                </Link>
              </li>
              <li>
                <Link href="/reading-comprehension-trainer" className="text-base sm:text-lg hover:text-purple-400 transition-colors font-mono">
                  READING TRAINER
                </Link>
              </li>
            </ul>
          </div>
          {/* Productivity Tools */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
              PRODUCTIVITY
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/essay-outline-generator" className="text-base sm:text-lg hover:text-fuchsia-400 transition-colors font-mono">
                  ESSAY OUTLINER
                </Link>
              </li>
              <li>
                <Link href="/pomodoro-timer" className="text-base sm:text-lg hover:text-orange-400 transition-colors font-mono">
                  POMODORO TIMER
                </Link>
              </li>
              <li>
                <Link href="/study-goal-tracker" className="text-base sm:text-lg hover:text-emerald-400 transition-colors font-mono">
                  GOAL TRACKER
                </Link>
              </li>
              <li>
                <Link href="/note-summarizer" className="text-base sm:text-lg hover:text-blue-400 transition-colors font-mono">
                  NOTE SUMMARIZER
                </Link>
              </li>
              <li>
                <Link href="/mnemonic-generator" className="text-base sm:text-lg hover:text-yellow-400 transition-colors font-mono">
                  MNEMONIC MAKER
                </Link>
              </li>
              {/* New Tools Added */}
              <li>
                <Link href="/memory-game-generator" className="text-base sm:text-lg hover:text-pink-400 transition-colors font-mono">
                  MEMORY GAMES
                </Link>
              </li>
              <li>
                <Link href="/grammar-practice" className="text-base sm:text-lg hover:text-cyan-400 transition-colors font-mono">
                  GRAMMAR PRACTICE
                </Link>
              </li>
              <li>
                <Link href="/study-break-planner" className="text-base sm:text-lg hover:text-green-400 transition-colors font-mono">
                  BREAK PLANNER
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t-4 border-white mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                <span className="text-base sm:text-lg font-mono">contact@usnewse.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400" />
                <span className="text-base sm:text-lg font-mono">Global Education Platform</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-base sm:text-lg font-mono">
              <a href="/about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a>
              <a href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="/terms-conditions" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="/disclaimer" className="hover:text-cyan-400 transition-colors">Disclaimer</a>
            </div>
            <div className="text-base sm:text-lg font-mono">© 2025 USNEWSE.COM - ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
