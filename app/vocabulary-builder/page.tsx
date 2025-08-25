"use client"

import { useState } from "react"
import { LucideBinary as Vocabulary, Plus, Play, Check, X, BookOpen, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"

interface VocabWord {
  id: string
  word: string
  definition: string
  partOfSpeech: string
  example: string
  difficulty: "beginner" | "intermediate" | "advanced"
  mastered: boolean
  attempts: number
  correctAttempts: number
  dateAdded: Date
}

interface QuizQuestion {
  word: VocabWord
  options: string[]
  correctAnswer: string
}

export default function VocabularyBuilder() {
  const [words, setWords] = useState<VocabWord[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [quizMode, setQuizMode] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 })

  const [formData, setFormData] = useState({
    word: "",
    definition: "",
    partOfSpeech: "noun",
    example: "",
    difficulty: "intermediate" as "beginner" | "intermediate" | "advanced",
  })

  const partsOfSpeech = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "interjection"]

  const addWord = () => {
    if (formData.word.trim() && formData.definition.trim()) {
      const newWord: VocabWord = {
        id: Date.now().toString(),
        word: formData.word.trim(),
        definition: formData.definition.trim(),
        partOfSpeech: formData.partOfSpeech,
        example: formData.example.trim(),
        difficulty: formData.difficulty,
        mastered: false,
        attempts: 0,
        correctAttempts: 0,
        dateAdded: new Date(),
      }
      setWords([...words, newWord])
      setFormData({
        word: "",
        definition: "",
        partOfSpeech: "noun",
        example: "",
        difficulty: "intermediate",
      })
      setShowAddForm(false)
    }
  }

  const deleteWord = (id: string) => {
    setWords(words.filter((word) => word.id !== id))
  }

  const toggleMastered = (id: string) => {
    setWords(words.map((word) => (word.id === id ? { ...word, mastered: !word.mastered } : word)))
  }

  const generateQuiz = (difficulty?: "beginner" | "intermediate" | "advanced") => {
    let availableWords = words.filter((word) => !word.mastered)
    if (difficulty) {
      availableWords = availableWords.filter((word) => word.difficulty === difficulty)
    }

    if (availableWords.length < 4) {
      alert("Need at least 4 unmastered words to generate a quiz!")
      return
    }

    const shuffled = [...availableWords].sort(() => Math.random() - 0.5)
    const quizWords = shuffled.slice(0, Math.min(10, shuffled.length))

    const quiz: QuizQuestion[] = quizWords.map((word) => {
      const otherWords = words.filter((w) => w.id !== word.id)
      const wrongAnswers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => w.definition)

      const options = [word.definition, ...wrongAnswers].sort(() => Math.random() - 0.5)

      return {
        word,
        options,
        correctAnswer: word.definition,
      }
    })

    setCurrentQuiz(quiz)
    setCurrentQuestionIndex(0)
    setQuizScore({ correct: 0, total: quiz.length })
    setQuizMode(true)
    setShowResult(false)
    setSelectedAnswer("")
  }

  const submitAnswer = () => {
    if (!selectedAnswer) return

    const currentQuestion = currentQuiz[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    // Update word statistics
    setWords(
      words.map((word) =>
        word.id === currentQuestion.word.id
          ? {
              ...word,
              attempts: word.attempts + 1,
              correctAttempts: word.correctAttempts + (isCorrect ? 1 : 0),
            }
          : word,
      ),
    )

    if (isCorrect) {
      setQuizScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestionIndex < currentQuiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer("")
        setShowResult(false)
      } else {
        // Quiz finished
        setQuizMode(false)
        setCurrentQuestionIndex(0)
        setSelectedAnswer("")
        setShowResult(false)
      }
    }, 2000)
  }

  const exitQuiz = () => {
    setQuizMode(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowResult(false)
  }

  const getMasteredCount = () => words.filter((word) => word.mastered).length
  const getAverageAccuracy = () => {
    const wordsWithAttempts = words.filter((word) => word.attempts > 0)
    if (wordsWithAttempts.length === 0) return 0
    const totalAccuracy = wordsWithAttempts.reduce((sum, word) => sum + (word.correctAttempts / word.attempts) * 100, 0)
    return Math.round(totalAccuracy / wordsWithAttempts.length)
  }

  if (quizMode) {
    const currentQuestion = currentQuiz[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    return (
      <div className="min-h-screen bg-background font-mono">
        <Sidebar />

        <div className="lg:ml-80">
          <div className="container py-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black uppercase">Vocabulary Quiz</h1>
                <button
                  onClick={exitQuiz}
                  className="bg-red-600 text-white border-4 border-black px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Exit Quiz
                </button>
              </div>

              <div className="bg-white dark:bg-gray-900 border-4 border-black p-8 shadow-brutal">
                <div className="text-center mb-6">
                  <div className="text-lg font-bold mb-2">
                    Question {currentQuestionIndex + 1} of {currentQuiz.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Score: {quizScore.correct}/{currentQuestionIndex + (showResult ? 1 : 0)}
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black mb-4 text-blue-600">{currentQuestion.word.word}</h2>
                  <div className="text-lg text-gray-600 dark:text-gray-400">({currentQuestion.word.partOfSpeech})</div>
                </div>

                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && setSelectedAnswer(option)}
                      disabled={showResult}
                      className={`w-full p-4 border-4 border-black text-left font-bold transition-all ${
                        showResult
                          ? option === currentQuestion.correctAnswer
                            ? "bg-green-500 text-white"
                            : option === selectedAnswer
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700"
                          : selectedAnswer === option
                            ? "bg-blue-600 text-white shadow-brutal"
                            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-brutal hover:translate-y-1 hover:shadow-none"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showResult ? (
                  <div className="text-center">
                    <div className={`text-2xl font-black mb-4 ${isCorrect ? "text-green-500" : "text-red-600"}`}>
                      {isCorrect ? "Correct!" : "Incorrect!"}
                    </div>
                    {currentQuestion.word.example && (
                      <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-black p-4 mb-4">
                        <strong>Example:</strong> {currentQuestion.word.example}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                      className="bg-green-500 text-white border-4 border-black px-8 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Sidebar />

      <div className="lg:ml-80">
        <div className="container py-8 px-6">
          {/* Header with Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Vocabulary Builder",
                description: "Expand your vocabulary with contextual learning exercises and interactive quizzes",
                url: "https://usnewse.com/vocabulary-builder",
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
              <Vocabulary className="h-8 w-8 text-lime-400" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Vocabulary Builder</h1>
            </div>
            <p className="text-xl text-muted-foreground">Expand your vocabulary with contextual learning exercises</p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <div className="bg-blue-600 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{words.length}</div>
              <div className="text-sm font-bold">Total Words</div>
            </div>
            <div className="bg-green-500 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{getMasteredCount()}</div>
              <div className="text-sm font-bold">Mastered</div>
            </div>
            <div className="bg-yellow-500 text-black border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{getAverageAccuracy()}%</div>
              <div className="text-sm font-bold">Accuracy</div>
            </div>
            <div className="bg-purple-600 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{words.filter((w) => !w.mastered).length}</div>
              <div className="text-sm font-bold">To Learn</div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Add Word & Quiz Section */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-lime-400 text-black border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Plus className="h-5 w-5 inline mr-2" />
                  {showAddForm ? "Cancel" : "Add Word"}
                </button>
                <button
                  onClick={() => generateQuiz()}
                  disabled={words.filter((w) => !w.mastered).length < 4}
                  className="bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="h-5 w-5 inline mr-2" />
                  Start Quiz
                </button>
              </div>

              {showAddForm && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Add New Word
                  </h2>

                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="word" className="text-lg font-bold">
                          Word
                        </Label>
                        <Input
                          id="word"
                          placeholder="Enter word..."
                          value={formData.word}
                          onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="partOfSpeech" className="text-lg font-bold">
                          Part of Speech
                        </Label>
                        <select
                          id="partOfSpeech"
                          value={formData.partOfSpeech}
                          onChange={(e) => setFormData({ ...formData, partOfSpeech: e.target.value })}
                          className="w-full border-2 border-black h-12 text-lg font-mono shadow-brutal bg-white dark:bg-gray-800"
                        >
                          {partsOfSpeech.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="definition" className="text-lg font-bold">
                        Definition
                      </Label>
                      <Textarea
                        id="definition"
                        placeholder="Enter definition..."
                        value={formData.definition}
                        onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
                        className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="example" className="text-lg font-bold">
                        Example Sentence (Optional)
                      </Label>
                      <Textarea
                        id="example"
                        placeholder="Enter example sentence..."
                        value={formData.example}
                        onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                        className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                      />
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Difficulty Level</Label>
                      <div className="flex gap-2 mt-2">
                        {(["beginner", "intermediate", "advanced"] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setFormData({ ...formData, difficulty: level })}
                            className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase transition-all ${
                              formData.difficulty === level
                                ? level === "beginner"
                                  ? "bg-green-500 text-white"
                                  : level === "intermediate"
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
                      onClick={addWord}
                      disabled={!formData.word.trim() || !formData.definition.trim()}
                      className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Word
                    </button>
                  </div>
                </div>
              )}

              {/* Quiz Options */}
              <div className="bg-purple-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Quiz by Difficulty</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  <button
                    onClick={() => generateQuiz("beginner")}
                    disabled={words.filter((w) => !w.mastered && w.difficulty === "beginner").length < 4}
                    className="bg-green-500 text-white border-2 border-white px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => generateQuiz("intermediate")}
                    disabled={words.filter((w) => !w.mastered && w.difficulty === "intermediate").length < 4}
                    className="bg-yellow-500 text-black border-2 border-white px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => generateQuiz("advanced")}
                    disabled={words.filter((w) => !w.mastered && w.difficulty === "advanced").length < 4}
                    className="bg-red-600 text-white border-2 border-white px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    Advanced
                  </button>
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Add new words with definitions and examples
                  </li>
                  <li>
                    <strong>2.</strong> Set difficulty levels for each word
                  </li>
                  <li>
                    <strong>3.</strong> Take quizzes to test your knowledge
                  </li>
                  <li>
                    <strong>4.</strong> Mark words as mastered when learned
                  </li>
                  <li>
                    <strong>5.</strong> Track your progress and accuracy
                  </li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-cyan-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Learning Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Use words in sentences to remember context</li>
                  <li>• Review regularly with spaced repetition</li>
                  <li>• Focus on words relevant to your goals</li>
                  <li>• Practice with different difficulty levels</li>
                  <li>• Create associations and mnemonics</li>
                </ul>
              </div>
            </div>

            {/* Word List */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                  Your Vocabulary ({words.length} words)
                </h3>

                {words.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-xl font-bold mb-2">No words added yet</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Add your first word to start building vocabulary!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {words.map((word) => (
                      <div
                        key={word.id}
                        className={`border-2 border-black p-4 ${
                          word.mastered ? "bg-green-100 dark:bg-green-900" : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black">{word.word}</h4>
                            <span className="text-sm text-gray-600 dark:text-gray-400">({word.partOfSpeech})</span>
                            <span
                              className={`px-2 py-1 text-xs font-bold border border-black ${
                                word.difficulty === "beginner"
                                  ? "bg-green-500 text-white"
                                  : word.difficulty === "intermediate"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-red-600 text-white"
                              }`}
                            >
                              {word.difficulty.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleMastered(word.id)}
                              className={`p-1 border border-black ${
                                word.mastered ? "bg-green-500 text-white" : "bg-white text-black"
                              }`}
                            >
                              {word.mastered ? <Star className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => deleteWord(word.id)}
                              className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm mb-2 font-medium">{word.definition}</p>

                        {word.example && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
                            Example: {word.example}
                          </p>
                        )}

                        {word.attempts > 0 && (
                          <div className="text-xs text-gray-500">
                            Quiz Performance: {word.correctAttempts}/{word.attempts} (
                            {Math.round((word.correctAttempts / word.attempts) * 100)}%)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Vocabulary Builder helps you systematically expand your vocabulary through contextual learning and
                  interactive quizzes. Add words with definitions and examples, track your progress, and test your
                  knowledge with difficulty-based quizzes. Perfect for language learning, test preparation, and
                  professional development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
