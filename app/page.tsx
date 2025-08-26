"use client"
import { useState } from "react"
import {
  Circle,
  Square,
  Triangle,
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
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Activity,   // Added for Study Habit Analyzer
  Quote,      // Added for Citation Generator
  Book,       // Added for Reading Comprehension Trainer
  Gamepad,    // Added for Memory Game Generator
  Type,       // Added for Grammar Practice
  Coffee,     // Added for Study Break Planner
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import ScrollToTop from "@/components/scroll-to-top"

export default function UniversalStudyEducation() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`min-h-screen font-mono ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground min-h-screen">
        <ScrollToTop />
        {/* Navigation */}
        <header className="sticky top-0 z-40 w-full border-b-8 border-black bg-primary">
          <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center">
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-yellow-500 border-2 sm:border-4 border-black rotate-12"></div>
                <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-600 border-2 sm:border-4 border-black -ml-4 sm:-ml-6 -rotate-12"></div>
                <span className="font-black text-lg sm:text-2xl tracking-tighter ml-2 sm:ml-4 text-white">
                  Universal Study & Education
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="h-8 w-8 sm:h-10 sm:w-10 bg-yellow-500 border-2 sm:border-4 border-black flex items-center justify-center hover:bg-yellow-400 transition-colors"
              >
                {darkMode ? <Circle className="h-4 w-4 sm:h-5 sm:w-5" /> : <Square className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </div>
        </header>
        <main className="container py-6 sm:py-12 px-4 sm:px-6">
          <StudyTabs />
        </main>
        <Footer />
      </div>
    </div>
  )
}

function StudyTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-8 sm:space-y-12">
      <div className="flex justify-center">
        <TabsList className="grid w-full max-w-full sm:max-w-3xl grid-cols-2 sm:grid-cols-4 h-12 sm:h-16 bg-transparent gap-2 sm:gap-4">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:border-black data-[state=active]:border-2 sm:data-[state=active]:border-4 data-[state=active]:shadow-brutal
            bg-white border-2 sm:border-4 border-black text-sm sm:text-lg font-bold h-full px-2 sm:px-4"
          >
            OVERVIEW
          </TabsTrigger>
          <TabsTrigger
            value="tools"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:border-black data-[state=active]:border-2 sm:data-[state=active]:border-4 data-[state=active]:shadow-brutal
            bg-white border-2 sm:border-4 border-black text-sm sm:text-lg font-bold h-full px-2 sm:px-4"
          >
            TOOLS
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:border-black data-[state=active]:border-2 sm:data-[state=active]:border-4 data-[state=active]:shadow-brutal
            bg-white border-2 sm:border-4 border-black text-sm sm:text-lg font-bold h-full px-2 sm:px-4"
          >
            FEATURES
          </TabsTrigger>
          <TabsTrigger
            value="support"
            className="data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black data-[state=active]:border-2 sm:data-[state=active]:border-4 data-[state=active]:shadow-brutal
            bg-white border-2 sm:border-4 border-black text-sm sm:text-lg font-bold h-full px-2 sm:px-4"
          >
            SUPPORT
          </TabsTrigger>
        </TabsList>
      </div>

      {/* === Tools Tab (Updated with 6 new tools) === */}
      <TabsContent value="tools" className="space-y-8 sm:space-y-12">
        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
            STUDY TOOLS
          </h2>
          <p className="text-lg sm:text-xl">
            Comprehensive suite of educational tools to enhance your learning experience.
          </p>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {/* === Original 10 Tools (Unchanged) === */}
            {/* Flashcard Generator */}
            <div className="bg-white dark:bg-gray-900 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">FLASHCARD GENERATOR</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">
                Create interactive flashcards from your study materials automatically.
              </p>
              <Link href="/flashcard-generator">
                <button className="bg-blue-600 text-white border-2 sm:border-4 border-black px-3 sm:px-4 py-2 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  CREATE CARDS
                </button>
              </Link>
            </div>

            {/* Study Schedule Planner */}
            <div className="bg-yellow-500 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-black flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">STUDY PLANNER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">
                Plan and organize your study sessions with intelligent scheduling.
              </p>
              <Link href="/study-schedule-planner">
                <button className="bg-black text-white border-2 sm:border-4 border-black px-3 sm:px-4 py-2 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  PLAN STUDY
                </button>
              </Link>
            </div>

            {/* Concept Map Builder */}
            <div className="bg-red-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Map className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">CONCEPT MAPPER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">
                Visualize relationships between concepts with interactive mind maps.
              </p>
              <Link href="/concept-map-builder">
                <button className="bg-white text-red-600 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  BUILD MAP
                </button>
              </Link>
            </div>

            {/* Math Problem Solver */}
            <div className="bg-black text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal-inverse">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">MATH SOLVER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Step-by-step solutions for complex mathematical problems.</p>
              <Link href="/math-problem-solver">
                <button className="bg-cyan-400 text-black border-2 sm:border-4 border-white px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal-white hover:translate-y-1 hover:shadow-none transition-all">
                  SOLVE MATH
                </button>
              </Link>
            </div>

            {/* Vocabulary Builder */}
            <div className="bg-lime-400 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Vocabulary className="h-6 w-6 sm:h-8 sm:w-8 text-black flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">VOCAB BUILDER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Expand your vocabulary with contextual learning exercises.</p>
              <Link href="/vocabulary-builder">
                <button className="bg-black text-white border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  BUILD VOCAB
                </button>
              </Link>
            </div>

            {/* Essay Outline Generator */}
            <div className="bg-fuchsia-500 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">ESSAY OUTLINER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Generate structured outlines for essays and research papers.</p>
              <Link href="/essay-outline-generator">
                <button className="bg-white text-fuchsia-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  CREATE OUTLINE
                </button>
              </Link>
            </div>

            {/* Pomodoro Timer */}
            <div className="bg-orange-500 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">POMODORO TIMER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Boost productivity with focused study sessions and breaks.</p>
              <Link href="/pomodoro-timer">
                <button className="bg-white text-orange-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  START TIMER
                </button>
              </Link>
            </div>

            {/* Study Goal Tracker */}
            <div className="bg-emerald-500 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">GOAL TRACKER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Set, track, and achieve your academic goals systematically.</p>
              <Link href="/study-goal-tracker">
                <button className="bg-white text-emerald-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  TRACK GOALS
                </button>
              </Link>
            </div>

            {/* Note Summarizer */}
            <div className="bg-blue-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">NOTE SUMMARIZER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Transform lengthy notes into concise, actionable summaries.</p>
              <Link href="/note-summarizer">
                <button className="bg-white text-blue-600 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  SUMMARIZE
                </button>
              </Link>
            </div>

            {/* Mnemonic Generator */}
            <div className="bg-yellow-500 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-black flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">MNEMONIC MAKER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Create memorable mnemonics to enhance information retention.</p>
              <Link href="/mnemonic-generator">
                <button className="bg-black text-white border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  MAKE MNEMONICS
                </button>
              </Link>
            </div>

            {/* === New Tools (6) === */}

            {/* Study Habit Analyzer */}
            <div className="bg-indigo-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">HABIT ANALYZER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Analyze your study patterns and receive personalized improvement tips.</p>
              <Link href="/study-habit-analyzer">
                <button className="bg-white text-indigo-600 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  ANALYZE HABITS
                </button>
              </Link>
            </div>

            {/* Citation Generator */}
            <div className="bg-teal-500 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">CITATION GENERATOR</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Generate accurate APA, MLA, or Chicago-style citations instantly.</p>
              <Link href="/citation-generator">
                <button className="bg-white text-teal-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  GENERATE CITATIONS
                </button>
              </Link>
            </div>

            {/* Reading Comprehension Trainer */}
            <div className="bg-purple-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Book className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">READING TRAINER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Improve comprehension with guided exercises and quizzes.</p>
              <Link href="/reading-comprehension-trainer">
                <button className="bg-white text-purple-600 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  TRAIN READING
                </button>
              </Link>
            </div>

            {/* Memory Game Generator */}
            <div className="bg-pink-500 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Gamepad className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">MEMORY GAMES</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Turn study content into fun, customizable memory and recall games.</p>
              <Link href="/memory-game-generator">
                <button className="bg-white text-pink-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  PLAY GAMES
                </button>
              </Link>
            </div>

            {/* Grammar Practice */}
            <div className="bg-cyan-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Type className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">GRAMMAR PRACTICE</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Interactive exercises to master grammar rules and sentence structure.</p>
              <Link href="/grammar-practice">
                <button className="bg-white text-cyan-600 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  PRACTICE GRAMMAR
                </button>
              </Link>
            </div>

            {/* Study Break Planner */}
            <div className="bg-green-500 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-white flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-black uppercase">BREAK PLANNER</h3>
              </div>
              <p className="text-base sm:text-lg mb-4">Schedule rejuvenating breaks to maintain focus and prevent burnout.</p>
              <Link href="/study-break-planner">
                <button className="bg-white text-green-500 border-2 sm:border-4 border-black px-3 sm:px-4 py-2 sm:py-3 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  PLAN BREAKS
                </button>
              </Link>
            </div>

          </div>
        </section>
      </TabsContent>

      {/* === Other Tabs (Unchanged) === */}
      {/* Overview, Features, Support tabs remain unchanged for brevity */}
      {/* ... (rest of your code stays the same) ... */}
    </Tabs>
  )
}

// === Footer (Updated with new tools) ===
function Footer() {
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

          {/* === Updated Study Tools === */}
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

          {/* === Updated Productivity Tools === */}
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
