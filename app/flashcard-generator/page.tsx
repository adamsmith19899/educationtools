"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface Flashcard {
  id: string
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
}

export default function FlashcardGenerator() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isStudyMode, setIsStudyMode] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")

  const addFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newCard: Flashcard = {
        id: Date.now().toString(),
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        difficulty,
      }
      setFlashcards([...flashcards, newCard])
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  const deleteCard = (id: string) => {
    setFlashcards(flashcards.filter((card) => card.id !== id))
    if (currentCard >= flashcards.length - 1) {
      setCurrentCard(Math.max(0, flashcards.length - 2))
    }
  }

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowAnswer(false)
  }

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentCard(0)
    setShowAnswer(false)
  }

  const exportCards = () => {
    const dataStr = JSON.stringify(flashcards, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "flashcards.json"
    link.click()
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Sidebar />
      <ScrollToTop />

      <div className="lg:pr-80 lg:pl-0">
        <div className="container py-8 px-6">
          {/* Header with Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Flashcard Generator",
                description: "Create interactive flashcards for effective studying and memorization",
                url: "https://usnewse.com/flashcard-generator",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              }),
            }}
          />

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Flashcard Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Create interactive flashcards for effective studying and memorization
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Create Cards Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Create New Card
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="question" className="text-lg font-bold">
                      Question
                    </Label>
                    <Textarea
                      id="question"
                      placeholder="Enter your question here..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="answer" className="text-lg font-bold">
                      Answer
                    </Label>
                    <Textarea
                      id="answer"
                      placeholder="Enter the answer here..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                    />
                  </div>

                  <div>
                    <Label className="text-lg font-bold">Difficulty</Label>
                    <div className="flex gap-2 mt-2">
                      {(["easy", "medium", "hard"] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase transition-all ${
                            difficulty === level
                              ? level === "easy"
                                ? "bg-green-500 text-white"
                                : level === "medium"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-red-600 text-white"
                              : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={addFlashcard}
                    disabled={!newQuestion.trim() || !newAnswer.trim()}
                    className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-5 w-5 inline mr-2" />
                    Add Flashcard
                  </button>
                </div>
              </div>

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Enter your question and answer
                  </li>
                  <li>
                    <strong>2.</strong> Select difficulty level
                  </li>
                  <li>
                    <strong>3.</strong> Click "Add Flashcard" to create
                  </li>
                  <li>
                    <strong>4.</strong> Use study mode to review cards
                  </li>
                  <li>
                    <strong>5.</strong> Export your cards for backup
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Study Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Keep questions concise and specific</li>
                  <li>• Use active recall techniques</li>
                  <li>• Review cards regularly for retention</li>
                  <li>• Mix different difficulty levels</li>
                  <li>• Practice spaced repetition</li>
                </ul>
              </div>
            </div>

            {/* Study Cards Section */}
            <div className="space-y-6">
              {flashcards.length > 0 && (
                <>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setIsStudyMode(!isStudyMode)}
                      className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                        isStudyMode ? "bg-red-600 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      {isStudyMode ? "Exit Study Mode" : "Enter Study Mode"}
                    </button>

                    <button
                      onClick={shuffleCards}
                      className="bg-purple-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Shuffle className="h-5 w-5" />
                    </button>

                    <button
                      onClick={exportCards}
                      className="bg-orange-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>

                  {isStudyMode ? (
                    <div className="bg-white dark:bg-gray-900 border-4 border-black p-8 shadow-brutal">
                      <div className="text-center mb-6">
                        <span className="text-lg font-bold">
                          Card {currentCard + 1} of {flashcards.length}
                        </span>
                      </div>

                      <div className="min-h-[200px] flex items-center justify-center mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-4">{showAnswer ? "Answer:" : "Question:"}</div>
                          <div className="text-xl">
                            {showAnswer ? flashcards[currentCard]?.answer : flashcards[currentCard]?.question}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center gap-4 mb-6">
                        <button
                          onClick={() => setShowAnswer(!showAnswer)}
                          className="bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          <RotateCcw className="h-5 w-5 inline mr-2" />
                          {showAnswer ? "Show Question" : "Show Answer"}
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevCard}
                          className="bg-gray-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Previous
                        </button>
                        <button
                          onClick={nextCard}
                          className="bg-gray-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                      <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                        Your Flashcards ({flashcards.length})
                      </h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {flashcards.map((card, index) => (
                          <div key={card.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-start mb-2">
                              <span
                                className={`px-2 py-1 text-xs font-bold border border-black ${
                                  card.difficulty === "easy"
                                    ? "bg-green-500 text-white"
                                    : card.difficulty === "medium"
                                      ? "bg-yellow-500 text-black"
                                      : "bg-red-600 text-white"
                                }`}
                              >
                                {card.difficulty.toUpperCase()}
                              </span>
                              <button
                                onClick={() => deleteCard(card.id)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-sm">
                              <div className="font-bold mb-1">Q: {card.question}</div>
                              <div>A: {card.answer}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {flashcards.length === 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No flashcards yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Create your first flashcard to get started!</p>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Flashcard Generator helps you create digital flashcards for effective studying. Use spaced
                  repetition and active recall techniques to improve memory retention. Perfect for vocabulary,
                  definitions, formulas, and any question-answer pairs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
