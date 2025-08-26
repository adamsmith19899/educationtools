"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Eye, MessageSquare, Check, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface Passage {
  id: string
  title: string
  content: string
  questions: Question[]
}

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function ReadingComprehensionTrainer() {
  const [passages, setPassages] = useState<Passage[]>([])
  const [currentPassage, setCurrentPassage] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizActive, setQuizActive] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [activeTab, setActiveTab] = useState<"create" | "study">("study")

  // Form states
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState<string[]>(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [explanation, setExplanation] = useState("")
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)

  const addPassage = () => {
    if (title && content) {
      const newPassage: Passage = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        questions: []
      }
      setPassages([...passages, newPassage])
      resetForm()
      setIsAdding(false)
    }
  }

  const updatePassage = () => {
    if (currentPassage !== null && title && content) {
      const updatedPassages = [...passages]
      updatedPassages[currentPassage] = {
        ...updatedPassages[currentPassage],
        title: title.trim(),
        content: content.trim()
      }
      setPassages(updatedPassages)
      resetForm()
      setIsAdding(false)
    }
  }

  const deletePassage = (index: number) => {
    const updatedPassages = passages.filter((_, i) => i !== index)
    setPassages(updatedPassages)
    if (currentPassage !== null && index <= currentPassage) {
      setCurrentPassage(prev => prev !== null ? Math.max(0, prev - 1) : null)
    }
    if (updatedPassages.length === 0) {
      setQuizActive(false)
      setShowResults(false)
    }
  }

  const addQuestion = () => {
    if (questionText && options.some(opt => opt.trim()) && explanation) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionText.trim(),
        options: options.map(opt => opt.trim()),
        correctAnswer,
        explanation: explanation.trim()
      }

      if (isAdding && currentPassage !== null) {
        // Adding to existing passage
        const updatedPassages = [...passages]
        updatedPassages[currentPassage] = {
          ...updatedPassages[currentPassage],
          questions: [...updatedPassages[currentPassage].questions, newQuestion]
        }
        setPassages(updatedPassages)
      }
      
      resetQuestionForm()
    }
  }

  const updateQuestion = () => {
    if (currentPassage !== null && editingQuestionId && questionText && options.some(opt => opt.trim()) && explanation) {
      const updatedPassages = [...passages]
      const questionIndex = updatedPassages[currentPassage].questions.findIndex(q => q.id === editingQuestionId)
      
      if (questionIndex !== -1) {
        updatedPassages[currentPassage].questions[questionIndex] = {
          id: editingQuestionId,
          text: questionText.trim(),
          options: options.map(opt => opt.trim()),
          correctAnswer,
          explanation: explanation.trim()
        }
        
        setPassages(updatedPassages)
        resetQuestionForm()
      }
    }
  }

  const deleteQuestion = (passageIndex: number, questionId: string) => {
    const updatedPassages = [...passages]
    updatedPassages[passageIndex].questions = updatedPassages[passageIndex].questions.filter(q => q.id !== questionId)
    setPassages(updatedPassages)
  }

  const editQuestion = (passageIndex: number, question: Question) => {
    setCurrentPassage(passageIndex)
    setQuestionText(question.text)
    setOptions([...question.options])
    setCorrectAnswer(question.correctAnswer)
    setExplanation(question.explanation)
    setEditingQuestionId(question.id)
    setActiveTab("create")
    setIsAdding(true)
  }

  const startQuiz = (passageIndex: number) => {
    setCurrentPassage(passageIndex)
    setCurrentQuestion(0)
    setUserAnswers(new Array(passages[passageIndex].questions.length).fill(null))
    setShowResults(false)
    setQuizActive(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers(new Array(passages[currentPassage || 0].questions.length).fill(null))
    setShowResults(false)
  }

  const nextQuestion = () => {
    if (currentQuestion < (passages[currentPassage || 0]?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)
  }

  const calculateResults = () => {
    if (currentPassage === null) return { score: 0, total: 0, percentage: 0 }
    
    const passage = passages[currentPassage]
    const total = passage.questions.length
    const correct = passage.questions.reduce((count, question, index) => {
      return userAnswers[index] === question.correctAnswer ? count + 1 : count
    }, 0)
    
    return {
      score: correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(passages, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "reading-comprehension.json"
    link.click()
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedPassages = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedPassages)) {
          setPassages(importedPassages)
        }
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setQuestionText("")
    setOptions(["", "", "", ""])
    setCorrectAnswer(0)
    setExplanation("")
    setCurrentPassage(null)
    setIsAdding(false)
    setEditingQuestionId(null)
  }

  const resetQuestionForm = () => {
    setQuestionText("")
    setOptions(["", "", "", ""])
    setCorrectAnswer(0)
    setExplanation("")
    setEditingQuestionId(null)
  }

  const handlePassageEdit = (index: number) => {
    const passage = passages[index]
    setTitle(passage.title)
    setContent(passage.content)
    setCurrentPassage(index)
    setIsAdding(true)
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
                name: "Reading Comprehension Trainer",
                description: "Improve your reading skills with interactive passages and comprehension questions",
                url: "https://usnewse.com/reading-comprehension-trainer",
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
              <Eye className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Reading Comprehension Trainer</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Improve your reading skills with interactive passages and comprehension questions
            </p>
          </div>

          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setActiveTab("study")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                activeTab === "study" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Study Mode
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                activeTab === "create" 
                  ? "bg-green-500 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Create Mode
            </button>
          </div>

          {activeTab === "create" ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Create Section */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    {isAdding ? (editingQuestionId ? "Edit Question" : "Edit Passage") : "Create New"}
                  </h2>

                  {!isAdding ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-bold">
                          Passage Title
                        </Label>
                        <input
                          type="text"
                          id="title"
                          placeholder="Enter passage title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>

                      <div>
                        <Label htmlFor="content" className="text-lg font-bold">
                          Passage Content
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Enter the reading passage here..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="border-2 border-black h-40 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      <button
                        onClick={addPassage}
                        disabled={!title || !content}
                        className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 inline mr-2" />
                        Create Passage
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editingQuestionId ? (
                        <>
                          <div>
                            <Label htmlFor="question" className="text-lg font-bold">
                              Question
                            </Label>
                            <Textarea
                              id="question"
                              placeholder="Enter your question..."
                              value={questionText}
                              onChange={(e) => setQuestionText(e.target.value)}
                              className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                            />
                          </div>

                          <div>
                            <Label className="text-lg font-bold">Options</Label>
                            <div className="space-y-2 mt-2">
                              {options.map((option, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`answer-${index}`}
                                    checked={correctAnswer === index}
                                    onChange={() => setCorrectAnswer(index)}
                                    className="mr-2"
                                  />
                                  <input
                                    type="text"
                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...options]
                                      newOptions[index] = e.target.value
                                      setOptions(newOptions)
                                    }}
                                    className="flex-1 border-2 border-black p-2 font-mono"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="explanation" className="text-lg font-bold">
                              Explanation
                            </Label>
                            <Textarea
                              id="explanation"
                              placeholder="Explain why this is the correct answer..."
                              value={explanation}
                              onChange={(e) => setExplanation(e.target.value)}
                              className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                            />
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={updateQuestion}
                              disabled={!questionText || !options.some(opt => opt.trim()) || !explanation}
                              className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Update Question
                            </button>
                            <button
                              onClick={resetQuestionForm}
                              className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="title" className="text-lg font-bold">
                              Passage Title
                            </Label>
                            <input
                              type="text"
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>

                          <div>
                            <Label htmlFor="content" className="text-lg font-bold">
                              Passage Content
                            </Label>
                            <Textarea
                              id="content"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="border-2 border-black h-40 text-lg font-mono shadow-brutal resize-none"
                            />
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={updatePassage}
                              disabled={!title || !content}
                              className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Update Passage
                            </button>
                            <button
                              onClick={resetForm}
                              className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Creation */}
                {isAdding && !editingQuestionId && currentPassage !== null && (
                  <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Add Question</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="question" className="text-lg font-bold">
                          Question
                        </Label>
                        <Textarea
                          id="question"
                          placeholder="Enter your question..."
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                          className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      <div>
                        <Label className="text-lg font-bold">Options</Label>
                        <div className="space-y-2 mt-2">
                          {options.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="radio"
                                id={`answer-${index}`}
                                checked={correctAnswer === index}
                                onChange={() => setCorrectAnswer(index)}
                                className="mr-2"
                              />
                              <input
                                type="text"
                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...options]
                                  newOptions[index] = e.target.value
                                  setOptions(newOptions)
                                }}
                                className="flex-1 border-2 border-black p-2 font-mono"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="explanation" className="text-lg font-bold">
                          Explanation
                        </Label>
                        <Textarea
                          id="explanation"
                          placeholder="Explain why this is the correct answer..."
                          value={explanation}
                          onChange={(e) => setExplanation(e.target.value)}
                          className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      <button
                        onClick={addQuestion}
                        disabled={!questionText || !options.some(opt => opt.trim()) || !explanation}
                        className="w-full bg-purple-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 inline mr-2" />
                        Add Question
                      </button>
                    </div>
                  </div>
                )}

                {/* How to Use */}
                <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                  <ol className="space-y-2 text-lg">
                    <li><strong>1.</strong> Create reading passages with titles and content</li>
                    <li><strong>2.</strong> Add comprehension questions with multiple choices</li>
                    <li><strong>3.</strong> Specify the correct answer and provide explanations</li>
                    <li><strong>4.</strong> Switch to Study Mode to practice</li>
                    <li><strong>5.</strong> Review your results and improve</li>
                  </ol>
                </div>
              </div>

              {/* Passage List */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Your Passages ({passages.length})
                  </h3>
                  
                  {passages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No passages created yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {passages.map((passage, idx) => (
                        <div key={passage.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{passage.title}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handlePassageEdit(idx)}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deletePassage(idx)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm mb-3 line-clamp-3">
                            {passage.content}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold border border-black px-2 py-1">
                              {passage.questions.length} Questions
                            </span>
                            <button
                              onClick={() => {
                                setCurrentPassage(idx)
                                setIsAdding(true)
                              }}
                              className="bg-green-600 text-white border border-black px-3 py-1 text-sm hover:bg-green-700 transition-colors"
                            >
                              Add Question
                            </button>
                          </div>
                          
                          {passage.questions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {passage.questions.map((question) => (
                                <div key={question.id} className="text-xs p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                                  <div className="font-medium mb-1">Q: {question.text}</div>
                                  <div className="flex gap-1">
                                    {question.options.map((opt, idx) => (
                                      <span 
                                        key={idx}
                                        className={`px-1 ${
                                          idx === question.correctAnswer ? "font-bold text-green-600" : ""
                                        }`}
                                      >
                                        {String.fromCharCode(65 + idx)}. {opt}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="mt-1">
                                    <button
                                      onClick={() => editQuestion(idx, question)}
                                      className="text-blue-600 hover:underline text-xs"
                                    >
                                      Edit
                                    </button>
                                    <span className="mx-2">|</span>
                                    <button
                                      onClick={() => deleteQuestion(idx, question.id)}
                                      className="text-red-600 hover:underline text-xs"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Study Mode */
            <div className="grid gap-8 lg:grid-cols-1">
              {!quizActive ? (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Select a Passage to Study
                  </h3>
                  
                  {passages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No passages available. Please create some in Create Mode.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {passages.map((passage, idx) => (
                        <div key={passage.id} className="border-2 border-black p-6 bg-gray-50 dark:bg-gray-800">
                          <h4 className="text-xl font-bold mb-3">{passage.title}</h4>
                          <p className="text-sm mb-4 line-clamp-3">{passage.content}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold border border-black px-3 py-1">
                              {passage.questions.length} Questions
                            </span>
                            <button
                              onClick={() => startQuiz(idx)}
                              disabled={passage.questions.length === 0}
                              className="bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Start Quiz
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  {showResults ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-black mb-4">Quiz Results</h3>
                        <div className="bg-blue-100 dark:bg-blue-900 border-2 border-black p-6 inline-block">
                          <div className="text-4xl font-black">
                            {calculateResults().percentage}%
                          </div>
                          <div className="text-lg">
                            {calculateResults().score} of {calculateResults().total} correct
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {passages[currentPassage || 0]?.questions.map((question, idx) => (
                          <div key={question.id} className="border-2 border-black p-4">
                            <h4 className="font-bold mb-3">Question {idx + 1}: {question.text}</h4>
                            
                            <div className="space-y-2 mb-3">
                              {question.options.map((option, optIdx) => (
                                <div 
                                  key={optIdx}
                                  className={`p-2 border-2 ${
                                    optIdx === question.correctAnswer 
                                      ? "border-green-600 bg-green-100 dark:bg-green-900" 
                                      : userAnswers[idx] === optIdx && userAnswers[idx] !== question.correctAnswer
                                        ? "border-red-600 bg-red-100 dark:bg-red-900"
                                        : "border-gray-300 dark:border-gray-600"
                                  }`}
                                >
                                  <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span> {option}
                                  {optIdx === question.correctAnswer && (
                                    <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                                  )}
                                  {userAnswers[idx] === optIdx && userAnswers[idx] !== question.correctAnswer && (
                                    <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-black p-3">
                              <h5 className="font-bold mb-1">Explanation:</h5>
                              <p>{question.explanation}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-center">
                        <button
                          onClick={resetQuiz}
                          className="bg-blue-600 text-white border-4 border-black px-8 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Retake Quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                          Quiz Mode
                        </h3>
                        <div className="text-sm font-bold border-2 border-black px-3 py-1">
                          Question {currentQuestion + 1} of {passages[currentPassage || 0]?.questions.length}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg mb-4">
                          {passages[currentPassage || 0]?.questions[currentQuestion]?.text}
                        </h4>
                        
                        <div className="space-y-3">
                          {passages[currentPassage || 0]?.questions[currentQuestion]?.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => selectAnswer(idx)}
                              className={`w-full text-left p-4 border-2 transition-all ${
                                userAnswers[currentQuestion] === idx
                                  ? "border-blue-600 bg-blue-100 dark:bg-blue-900"
                                  : "border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <span className="font-bold text-lg mr-3">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={prevQuestion}
                          disabled={currentQuestion === 0}
                          className="bg-gray-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {currentQuestion === (passages[currentPassage || 0]?.questions.length || 0) - 1 ? (
                          <button
                            onClick={() => setShowResults(true)}
                            disabled={userAnswers[currentQuestion] === null}
                            className="bg-green-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Finish Quiz
                          </button>
                        ) : (
                          <button
                            onClick={nextQuestion}
                            disabled={userAnswers[currentQuestion] === null}
                            className="bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next Question
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {passages.length > 0 && (
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={exportData}
                    className="bg-orange-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  
                  <label className="bg-purple-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal cursor-pointer hover:translate-y-1 hover:shadow-none transition-all">
                    <Download className="h-5 w-5 inline mr-2" />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importData}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Reading Comprehension Trainer helps you improve your reading skills through interactive passages 
                  and targeted questions. Create custom reading materials on any topic, add comprehension questions with 
                  detailed explanations, and test your understanding with quiz functionality. Track your progress and 
                  enhance your ability to extract information, make inferences, and understand complex texts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
