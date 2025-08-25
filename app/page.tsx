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
                  USNEWSE.COM
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

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-8 sm:space-y-16">
        <section className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase leading-tight">
              Universal Study & Education Support
            </h1>
            <div className="flex gap-2 sm:gap-4 items-center">
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-red-600"></div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-600"></div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-yellow-500"></div>
              <p className="text-lg sm:text-2xl">
                Comprehensive educational tools designed to enhance your learning experience.
              </p>
            </div>
          </div>

          <ToolDescriptions />

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <div className="bg-white dark:bg-gray-900 border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black dark:border-white pb-2 text-black dark:text-white">
                STUDY TOOLS
              </h2>
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-black dark:text-white">
                <li className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                  <span>Interactive flashcard generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                  <span>Personalized study scheduling</span>
                </li>
                <li className="flex items-center gap-3">
                  <Map className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
                  <span>Visual concept mapping</span>
                </li>
                <li className="flex items-center gap-3">
                  <Calculator className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span>Advanced math problem solving</span>
                </li>
                <li className="flex items-center gap-3">
                  <Vocabulary className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                  <span>Vocabulary building exercises</span>
                </li>
              </ul>
            </div>

            <div className="bg-black text-white border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal-inverse">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                PRODUCTIVITY FEATURES
              </h2>
              <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
                <li className="flex items-center gap-3">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0" />
                  <span>Essay outline generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-fuchsia-400 flex-shrink-0" />
                  <span>Pomodoro productivity timer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400 flex-shrink-0" />
                  <span>Study goal tracking system</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 flex-shrink-0" />
                  <span>Intelligent note summarizer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 flex-shrink-0" />
                  <span>Mnemonic device generator</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
            LEARNING PRINCIPLES
          </h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-yellow-500 border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase border-b-2 sm:border-b-4 border-black pb-2">
                ADAPTIVE LEARNING
              </h3>
              <p className="text-base sm:text-lg">
                Personalized study paths that adapt to your learning style and pace.
              </p>
            </div>

            <div className="bg-blue-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal">
              <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                ACTIVE RECALL
              </h3>
              <p className="text-base sm:text-lg">
                Evidence-based techniques to strengthen memory retention and understanding.
              </p>
            </div>

            <div className="bg-red-600 text-white border-4 sm:border-8 border-black p-4 sm:p-6 shadow-brutal sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                SPACED REPETITION
              </h3>
              <p className="text-base sm:text-lg">
                Scientifically optimized review schedules for long-term knowledge retention.
              </p>
            </div>
          </div>
        </section>

        <FAQSection />
      </TabsContent>

      {/* Tools Tab */}
      <TabsContent value="tools" className="space-y-8 sm:space-y-12">
        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
            STUDY TOOLS
          </h2>
          <p className="text-lg sm:text-xl">
            Comprehensive suite of educational tools to enhance your learning experience.
          </p>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </section>
      </TabsContent>

      {/* Features Tab */}
      <TabsContent value="features" className="space-y-8 sm:space-y-12">
        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
            PLATFORM FEATURES
          </h2>
          <p className="text-lg sm:text-xl">Advanced features designed to optimize your educational journey.</p>

          <div className="space-y-12 sm:space-y-16">
            {/* Feature Cards */}
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-900 border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal">
                <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black dark:border-white pb-2">
                  ADAPTIVE LEARNING
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-black dark:text-white">
                  <li className="flex items-center gap-3">
                    <Square className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                    <span>AI-powered difficulty adjustment</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                    <span>Personalized learning paths</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Triangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
                    <span>Progress-based recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-black text-white border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal-inverse">
                <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                  ANALYTICS DASHBOARD
                </h3>
                <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
                  <li className="flex items-center gap-3">
                    <Square className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 flex-shrink-0" />
                    <span>Detailed performance metrics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-fuchsia-400 flex-shrink-0" />
                    <span>Learning pattern analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Triangle className="h-5 w-5 sm:h-6 sm:w-6 text-lime-400 flex-shrink-0" />
                    <span>Progress visualization</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="bg-gradient-to-br from-cyan-400 to-fuchsia-500 border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black pb-2">
                INTERACTIVE DEMO
              </h3>
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="bg-white dark:bg-gray-900 border-2 sm:border-4 border-black p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase">SAMPLE FLASHCARD</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-yellow-500 border-2 sm:border-4 border-black p-3 sm:p-4">
                      <p className="font-mono text-sm sm:text-lg">Question: What is photosynthesis?</p>
                    </div>
                    <button className="bg-blue-600 text-white border-2 sm:border-4 border-black px-3 sm:px-4 py-2 font-bold text-sm sm:text-base shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                      REVEAL ANSWER
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border-2 sm:border-4 border-black p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase">STUDY PROGRESS</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-emerald-500 border-2 sm:border-4 border-black p-3 sm:p-4">
                      <p className="font-mono text-sm sm:text-lg text-white">Today's Goal: 85% Complete</p>
                    </div>
                    <div className="bg-red-600 border-2 sm:border-4 border-black p-3 sm:p-4">
                      <p className="font-mono text-sm sm:text-lg text-white">Streak: 7 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* Support Tab */}
      <TabsContent value="support" className="space-y-8 sm:space-y-12">
        <section className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
            SUPPORT & RESOURCES
          </h2>
          <p className="text-lg sm:text-xl">Get help and access additional learning resources.</p>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <div className="bg-white dark:bg-gray-900 border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black dark:border-white pb-2 text-black dark:text-white">
                CONTACT FORM
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base sm:text-lg font-bold text-black dark:text-white">
                    NAME
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="border-2 sm:border-4 border-black h-12 sm:h-14 text-base sm:text-lg font-mono shadow-brutal focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base sm:text-lg font-bold text-black dark:text-white">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    className="border-2 sm:border-4 border-black h-12 sm:h-14 text-base sm:text-lg font-mono shadow-brutal focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  />
                </div>
                <button className="bg-red-600 text-white border-2 sm:border-4 border-black px-4 sm:px-6 py-2 sm:py-3 font-bold text-base sm:text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all">
                  SEND MESSAGE
                </button>
              </div>
            </div>

            <div className="bg-black text-white border-4 sm:border-8 border-black p-4 sm:p-8 shadow-brutal-inverse">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
                HELP RESOURCES
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <button className="w-full bg-cyan-400 text-black border-2 sm:border-4 border-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-base sm:text-lg shadow-brutal-white hover:translate-y-1 hover:shadow-none transition-all">
                    USER GUIDE
                  </button>
                  <button className="w-full bg-fuchsia-500 text-white border-2 sm:border-4 border-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-base sm:text-lg shadow-brutal-white hover:translate-y-1 hover:shadow-none transition-all">
                    VIDEO TUTORIALS
                  </button>
                  <button className="w-full bg-lime-400 text-black border-2 sm:border-4 border-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-base sm:text-lg shadow-brutal-white hover:translate-y-1 hover:shadow-none transition-all">
                    FAQ
                  </button>
                  <button className="w-full bg-orange-500 text-white border-2 sm:border-4 border-white px-4 sm:px-6 py-2 sm:py-3 font-bold text-base sm:text-lg shadow-brutal-white hover:translate-y-1 hover:shadow-none transition-all">
                    COMMUNITY FORUM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </TabsContent>
    </Tabs>
  )
}

function ToolDescriptions() {
  return (
    <section className="space-y-8 sm:space-y-12">
      <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
        FEATURED TOOLS
      </h2>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Memory & Retention Tools */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-400 text-white border-4 sm:border-8 border-black p-6 sm:p-8 shadow-brutal">
          <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
            MEMORY & RETENTION
          </h3>
          <div className="space-y-4">
            <div className="bg-white/20 border-2 border-white p-4 backdrop-blur-sm">
              <h4 className="font-black text-lg mb-2">FLASHCARD GENERATOR</h4>
              <p className="text-sm sm:text-base">
                AI-powered card creation with spaced repetition algorithms for optimal memory retention.
              </p>
            </div>
            <div className="bg-white/20 border-2 border-white p-4 backdrop-blur-sm">
              <h4 className="font-black text-lg mb-2">MNEMONIC GENERATOR</h4>
              <p className="text-sm sm:text-base">
                Create memorable acronyms and memory devices for complex information.
              </p>
            </div>
          </div>
        </div>

        {/* Organization & Planning Tools */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-black border-4 sm:border-8 border-black p-6 sm:p-8 shadow-brutal">
          <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black pb-2">
            ORGANIZATION & PLANNING
          </h3>
          <div className="space-y-4">
            <div className="bg-black/20 border-2 border-black p-4">
              <h4 className="font-black text-lg mb-2">STUDY SCHEDULE PLANNER</h4>
              <p className="text-sm sm:text-base">
                Intelligent scheduling with priority management and deadline tracking.
              </p>
            </div>
            <div className="bg-black/20 border-2 border-black p-4">
              <h4 className="font-black text-lg mb-2">GOAL TRACKER</h4>
              <p className="text-sm sm:text-base">
                Set SMART goals and track progress with detailed analytics and milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis & Problem Solving */}
        <div className="bg-gradient-to-br from-red-600 to-fuchsia-500 text-white border-4 sm:border-8 border-black p-6 sm:p-8 shadow-brutal">
          <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-white pb-2">
            ANALYSIS & PROBLEM SOLVING
          </h3>
          <div className="space-y-4">
            <div className="bg-white/20 border-2 border-white p-4 backdrop-blur-sm">
              <h4 className="font-black text-lg mb-2">MATH PROBLEM SOLVER</h4>
              <p className="text-sm sm:text-base">
                Step-by-step solutions for algebra, calculus, geometry, and statistics.
              </p>
            </div>
            <div className="bg-white/20 border-2 border-white p-4 backdrop-blur-sm">
              <h4 className="font-black text-lg mb-2">CONCEPT MAP BUILDER</h4>
              <p className="text-sm sm:text-base">
                Visual mind mapping with drag-and-drop interface and connection linking.
              </p>
            </div>
          </div>
        </div>

        {/* Writing & Communication */}
        <div className="bg-gradient-to-br from-emerald-500 to-lime-400 text-black border-4 sm:border-8 border-black p-6 sm:p-8 shadow-brutal">
          <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 uppercase border-b-2 sm:border-b-4 border-black pb-2">
            WRITING & COMMUNICATION
          </h3>
          <div className="space-y-4">
            <div className="bg-black/20 border-2 border-black p-4">
              <h4 className="font-black text-lg mb-2">ESSAY OUTLINE GENERATOR</h4>
              <p className="text-sm sm:text-base">
                Structured outlines for argumentative, narrative, and research papers.
              </p>
            </div>
            <div className="bg-black/20 border-2 border-black p-4">
              <h4 className="font-black text-lg mb-2">VOCABULARY BUILDER</h4>
              <p className="text-sm sm:text-base">Contextual learning with difficulty levels and progress tracking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does the adaptive learning system work?",
      answer:
        "Our AI-powered system analyzes your performance patterns, learning speed, and areas of difficulty to automatically adjust content difficulty and suggest personalized study paths. It tracks your progress across all tools and optimizes your learning experience in real-time.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Most tools require an internet connection for full functionality, including AI-powered features and cloud synchronization. However, created flashcards, notes, and study schedules can be accessed offline once downloaded to your device.",
    },
    {
      question: "Is my study data secure and private?",
      answer:
        "Yes, we use enterprise-grade encryption to protect all user data. Your study materials, progress, and personal information are stored securely and never shared with third parties. You maintain full control over your data and can export or delete it at any time.",
    },
    {
      question: "How accurate is the Math Problem Solver?",
      answer:
        "Our math solver provides step-by-step solutions for problems ranging from basic arithmetic to advanced calculus. It maintains 99%+ accuracy across supported mathematical domains and includes detailed explanations for each solution step.",
    },
    {
      question: "Can I collaborate with other students?",
      answer:
        "Yes! You can share flashcard sets, concept maps, and study schedules with classmates. The platform supports group study sessions, shared goal tracking, and collaborative note-taking while maintaining individual progress analytics.",
    },
    {
      question: "What subjects and grade levels are supported?",
      answer:
        "Our tools support all academic subjects from elementary through graduate level. The platform is particularly strong in STEM subjects, languages, social sciences, and standardized test preparation including SAT, ACT, GRE, and professional certifications.",
    },
  ]

  return (
    <section className="space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase border-b-2 sm:border-b-4 border-black pb-2 inline-block">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 border-4 sm:border-8 border-black shadow-brutal">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-black uppercase text-black dark:text-white pr-4">
                {faq.question}
              </h3>
              {openFAQ === index ? (
                <ChevronUp className="h-6 w-6 sm:h-8 sm:w-8 text-black dark:text-white flex-shrink-0" />
              ) : (
                <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-black dark:text-white flex-shrink-0" />
              )}
            </button>
            {openFAQ === index && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t-2 sm:border-t-4 border-black dark:border-white">
                <p className="text-base sm:text-lg text-black dark:text-white leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

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
              <span className="font-black text-2xl sm:text-3xl tracking-tighter ml-4 sm:ml-6">USNEWSE.COM</span>
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
                <Link
                  href="/flashcard-generator"
                  className="text-base sm:text-lg hover:text-yellow-500 transition-colors font-mono"
                >
                  FLASHCARD GENERATOR
                </Link>
              </li>
              <li>
                <Link
                  href="/study-schedule-planner"
                  className="text-base sm:text-lg hover:text-blue-400 transition-colors font-mono"
                >
                  STUDY PLANNER
                </Link>
              </li>
              <li>
                <Link
                  href="/concept-map-builder"
                  className="text-base sm:text-lg hover:text-red-400 transition-colors font-mono"
                >
                  CONCEPT MAPPER
                </Link>
              </li>
              <li>
                <Link
                  href="/math-problem-solver"
                  className="text-base sm:text-lg hover:text-cyan-400 transition-colors font-mono"
                >
                  MATH SOLVER
                </Link>
              </li>
              <li>
                <Link
                  href="/vocabulary-builder"
                  className="text-base sm:text-lg hover:text-lime-400 transition-colors font-mono"
                >
                  VOCAB BUILDER
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
                <Link
                  href="/essay-outline-generator"
                  className="text-base sm:text-lg hover:text-fuchsia-400 transition-colors font-mono"
                >
                  ESSAY OUTLINER
                </Link>
              </li>
              <li>
                <Link
                  href="/pomodoro-timer"
                  className="text-base sm:text-lg hover:text-orange-400 transition-colors font-mono"
                >
                  POMODORO TIMER
                </Link>
              </li>
              <li>
                <Link
                  href="/study-goal-tracker"
                  className="text-base sm:text-lg hover:text-emerald-400 transition-colors font-mono"
                >
                  GOAL TRACKER
                </Link>
              </li>
              <li>
                <Link
                  href="/note-summarizer"
                  className="text-base sm:text-lg hover:text-blue-400 transition-colors font-mono"
                >
                  NOTE SUMMARIZER
                </Link>
              </li>
              <li>
                <Link
                  href="/mnemonic-generator"
                  className="text-base sm:text-lg hover:text-yellow-400 transition-colors font-mono"
                >
                  MNEMONIC MAKER
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

            <div className="text-base sm:text-lg font-mono">© 2024 USNEWSE.COM - ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
