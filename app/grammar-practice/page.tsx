"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Check, XCircle, HelpCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface GrammarExercise {
  id: string
  title: string
  type: "fill-blank" | "error-correction" | "sentence-reordering" | "multiple-choice"
  prompt: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

export default function GrammarPracticeTool() {
  const [exercises, setExercises] = useState<GrammarExercise[]>([])
  const [currentExercise, setCurrentExercise] = useState<number | null>(null)
  const [userAnswer, setUserAnswer] = useState<string | number>('')
  const [showResult, setShowResult] = useState(false)
  const [practiceMode, setPracticeMode] = useState<"create" | "practice">("practice")
  const [isAdding, setIsAdding] = useState(false)
  const [activeTab, setActiveTab] = useState<"create" | "practice">("practice")

  // Form states
  const [title, setTitle] = useState("")
  const [exerciseType, setExerciseType] = useState<"fill-blank" | "error-correction" | "sentence-reordering" | "multiple-choice">("fill-blank")
  const [prompt, setPrompt] = useState("")
  const [options, setOptions] = useState<string[]>(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState<string | number>("")
  const [explanation, setExplanation] = useState("")
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null)

  const addExercise = () => {
    if (title && prompt && explanation) {
      const newExercise: GrammarExercise = {
        id: Date.now().toString(),
        title: title.trim(),
        type: exerciseType,
        prompt: prompt.trim(),
        options: exerciseType === "multiple-choice" ? options.map(opt => opt.trim()) : undefined,
        correctAnswer: correctAnswer,
        explanation: explanation.trim()
      }
      
      setExercises([...exercises, newExercise])
      resetForm()
      setIsAdding(false)
    }
  }

  const updateExercise = () => {
    if (currentExercise !== null && title && prompt && explanation) {
      const updatedExercises = [...exercises]
      updatedExercises[currentExercise] = {
        id: updatedExercises[currentExercise].id,
        title: title.trim(),
        type: exerciseType,
        prompt: prompt.trim(),
        options: exerciseType === "multiple-choice" ? options.map(opt => opt.trim()) : updatedExercises[currentExercise].options,
        correctAnswer: correctAnswer,
        explanation: explanation.trim()
      }
      
      setExercises(updatedExercises)
      resetForm()
      setIsAdding(false)
    }
  }

  const deleteExercise = (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index)
    setExercises(updatedExercises)
    if (currentExercise !== null && index <= currentExercise) {
      setCurrentExercise(prev => prev !== null ? Math.max(0, prev - 1) : null)
    }
    if (updatedExercises.length === 0) {
      setPracticeMode("create")
    }
  }

  const startPractice = (index: number) => {
    setCurrentExercise(index)
    setUserAnswer('')
    setShowResult(false)
    setPracticeMode("practice")
  }

  const checkAnswer = () => {
    setShowResult(true)
  }

  const nextExercise = () => {
    if (currentExercise !== null && currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => (prev !== null ? prev + 1 : 0))
      setUserAnswer('')
      setShowResult(false)
    }
  }

  const prevExercise = () => {
    if (currentExercise !== null && currentExercise > 0) {
      setCurrentExercise(prev => (prev !== null ? prev - 1 : 0))
      setUserAnswer('')
      setShowResult(false)
    }
  }

  const resetPractice = () => {
    setUserAnswer('')
    setShowResult(false)
  }

  const exportExercises = () => {
    const dataStr = JSON.stringify(exercises, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "grammar-exercises.json"
    link.click()
  }

  const importExercises = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedExercises = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedExercises)) {
          setExercises(importedExercises)
        }
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  const resetForm = () => {
    setTitle("")
    setExerciseType("fill-blank")
    setPrompt("")
    setOptions(["", "", "", ""])
    setCorrectAnswer("")
    setExplanation("")
    setCurrentExercise(null)
    setIsAdding(false)
    setEditingExerciseId(null)
    setUserAnswer('')
    setShowResult(false)
  }

  const handleEdit = (index: number) => {
    const exercise = exercises[index]
    setTitle(exercise.title)
    setExerciseType(exercise.type)
    setPrompt(exercise.prompt)
    setOptions(exercise.options || ["", "", "", ""])
    setCorrectAnswer(exercise.correctAnswer)
    setExplanation(exercise.explanation)
    setCurrentExercise(index)
    setIsAdding(true)
  }

  const isAnswerCorrect = () => {
    if (typeof correctAnswer === 'number') {
      return userAnswer === correctAnswer
    } else {
      return String(userAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim()
    }
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
                name: "Grammar Practice Tool",
                description: "Interactive grammar exercises to improve your writing and language skills",
                url: "https://usnewse.com/grammar-practice-tool",
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
              <Check className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Grammar Practice Tool</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Interactive grammar exercises to improve your writing and language skills
            </p>
          </div>

          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setActiveTab("practice")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                activeTab === "practice" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Practice Mode
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
                    {isAdding ? "Edit Exercise" : "Create New Exercise"}
                  </h2>

                  {!isAdding ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-bold">
                          Exercise Title
                        </Label>
                        <input
                          type="text"
                          id="title"
                          placeholder="Enter exercise title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>

                      <div>
                        <Label htmlFor="type" className="text-lg font-bold">
                          Exercise Type
                        </Label>
                        <select
                          id="type"
                          value={exerciseType}
                          onChange={(e) => setExerciseType(e.target.value as any)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        >
                          <option value="fill-blank">Fill in the Blank</option>
                          <option value="error-correction">Error Correction</option>
                          <option value="sentence-reordering">Sentence Reordering</option>
                          <option value="multiple-choice">Multiple Choice</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          setIsAdding(true)
                          setExerciseType("fill-blank")
                          setPrompt("")
                          setOptions(["", "", "", ""])
                          setCorrectAnswer("")
                          setExplanation("")
                        }}
                        disabled={!title}
                        className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 inline mr-2" />
                        Create Exercise
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-bold">
                          Exercise Title
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
                        <Label htmlFor="type" className="text-lg font-bold">
                          Exercise Type
                        </Label>
                        <select
                          id="type"
                          value={exerciseType}
                          onChange={(e) => setExerciseType(e.target.value as any)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        >
                          <option value="fill-blank">Fill in the Blank</option>
                          <option value="error-correction">Error Correction</option>
                          <option value="sentence-reordering">Sentence Reordering</option>
                          <option value="multiple-choice">Multiple Choice</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="prompt" className="text-lg font-bold">
                          Prompt/Instruction
                        </Label>
                        <Textarea
                          id="prompt"
                          placeholder="Enter the grammar exercise prompt..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      {exerciseType === "multiple-choice" && (
                        <div>
                          <Label className="text-lg font-bold">Multiple Choice Options</Label>
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
                      )}

                      {exerciseType !== "multiple-choice" && (
                        <div>
                          <Label htmlFor="correctAnswer" className="text-lg font-bold">
                            Correct Answer
                          </Label>
                          <input
                            type="text"
                            id="correctAnswer"
                            placeholder="Enter the correct answer..."
                            value={typeof correctAnswer === 'string' ? correctAnswer : ''}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="explanation" className="text-lg font-bold">
                          Explanation
                        </Label>
                        <Textarea
                          id="explanation"
                          placeholder="Explain the grammar rule and why this is the correct answer..."
                          value={explanation}
                          onChange={(e) => setExplanation(e.target.value)}
                          className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={currentExercise !== null ? updateExercise : addExercise}
                          disabled={!title || !prompt || !explanation}
                          className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {currentExercise !== null ? "Update" : "Create"} Exercise
                        </button>
                        <button
                          onClick={resetForm}
                          className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* How to Use */}
                <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                  <ol className="space-y-2 text-lg">
                    <li><strong>1.</strong> Create grammar exercises with clear prompts</li>
                    <li><strong>2.</strong> Choose the appropriate exercise type</li>
                    <li><strong>3.</strong> Provide the correct answer and detailed explanation</li>
                    <li><strong>4.</strong> Switch to Practice Mode to test your knowledge</li>
                    <li><strong>5.</strong> Review explanations to understand grammar rules</li>
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Grammar Tips</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• Focus on one grammar rule per exercise</li>
                    <li>• Use real-world examples for better understanding</li>
                    <li>• Include common mistakes in error correction exercises</li>
                    <li>• Provide clear explanations with grammar terminology</li>
                    <li>• Practice regularly to reinforce grammar rules</li>
                  </ul>
                </div>
              </div>

              {/* Exercise List */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Your Grammar Exercises ({exercises.length})
                  </h3>
                  
                  {exercises.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Check className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No exercises created yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {exercises.map((exercise, idx) => (
                        <div key={exercise.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-lg">{exercise.title}</h4>
                              <span className={`text-xs font-bold border border-black px-2 py-1 mt-1 inline-block ${
                                exercise.type === "fill-blank" ? "bg-blue-600 text-white" :
                                exercise.type === "error-correction" ? "bg-yellow-500 text-black" :
                                exercise.type === "sentence-reordering" ? "bg-green-500 text-white" :
                                "bg-purple-600 text-white"
                              }`}>
                                {exercise.type.split('-').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(idx)}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteExercise(idx)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm mb-3 line-clamp-2">
                            {exercise.prompt}
                          </div>
                          
                          <button
                            onClick={() => startPractice(idx)}
                            className="w-full bg-green-600 text-white border-2 border-black py-2 font-bold hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Practice Exercise
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Practice Mode */
            <div className="grid gap-8 lg:grid-cols-1">
              {!practiceMode || exercises.length === 0 ? (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Select a Grammar Exercise to Practice
                  </h3>
                  
                  {exercises.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No exercises available. Please create some in Create Mode.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {exercises.map((exercise, idx) => (
                        <div key={exercise.id} className="border-2 border-black p-6 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-xl font-bold">{exercise.title}</h4>
                              <span className={`text-sm font-bold border border-black px-3 py-1 mt-2 inline-block ${
                                exercise.type === "fill-blank" ? "bg-blue-600 text-white" :
                                exercise.type === "error-correction" ? "bg-yellow-500 text-black" :
                                exercise.type === "sentence-reordering" ? "bg-green-500 text-white" :
                                "bg-purple-600 text-white"
                              }`}>
                                {exercise.type.split('-').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-4">{exercise.prompt}</p>
                          
                          <button
                            onClick={() => startPractice(idx)}
                            className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Start Practice
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                      {exercises[currentExercise || 0]?.title}
                    </h3>
                    
                    <span className={`text-sm font-bold border border-black px-3 py-1 ${
                      exercises[currentExercise || 0]?.type === "fill-blank" ? "bg-blue-600 text-white" :
                      exercises[currentExercise || 0]?.type === "error-correction" ? "bg-yellow-500 text-black" :
                      exercises[currentExercise || 0]?.type === "sentence-reordering" ? "bg-green-500 text-white" :
                      "bg-purple-600 text-white"
                    }`}>
                      {exercises[currentExercise || 0]?.type.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Exercise</h4>
                      <p className="text-lg mb-6 p-4 bg-gray-100 dark:bg-gray-800 border-2 border-black">
                        {exercises[currentExercise || 0]?.prompt}
                      </p>
                    </div>

                    {!showResult ? (
                      <div>
                        <h4 className="font-bold text-lg mb-4">Your Answer</h4>
                        
                        {exercises[currentExercise || 0]?.type === "multiple-choice" ? (
                          <div className="space-y-3">
                            {exercises[currentExercise || 0]?.options?.map((option, index) => (
                              <label key={index} className="flex items-center p-3 border-2 border-black hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                                <input
                                  type="radio"
                                  value={index}
                                  checked={userAnswer === index}
                                  onChange={(e) => setUserAnswer(parseInt(e.target.value))}
                                  className="mr-3"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Type your answer here..."
                            value={typeof userAnswer === 'string' ? userAnswer : ''}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        )}

                        <div className="mt-8 text-center">
                          <button
                            onClick={checkAnswer}
                            disabled={!userAnswer}
                            className="bg-blue-600 text-white border-4 border-black px-8 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Check Answer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={`p-6 border-4 ${
                          isAnswerCorrect() 
                            ? "border-green-600 bg-green-100 dark:bg-green-900" 
                            : "border-red-600 bg-red-100 dark:bg-red-900"
                        }`}>
                          <div className="flex items-center gap-3 mb-4">
                            {isAnswerCorrect() ? (
                              <>
                                <Check className="h-8 w-8 text-green-600" />
                                <h4 className="text-2xl font-black">Correct!</h4>
                              </>
                            ) : (
                              <>
                                <XCircle className="h-8 w-8 text-red-600" />
                                <h4 className="text-2xl font-black">Incorrect</h4>
                              </>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-bold text-lg">Your Answer:</h5>
                            <p className="text-lg p-3 bg-white border-2 border-black">{typeof userAnswer === 'string' ? userAnswer : exercises[currentExercise || 0]?.options?.[userAnswer as number]}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-bold text-lg">Correct Answer:</h5>
                            <p className="text-lg p-3 bg-white border-2 border-black">
                              {exercises[currentExercise || 0]?.type === "multiple-choice" 
                                ? exercises[currentExercise || 0]?.options?.[exercises[currentExercise || 0]?.correctAnswer as number]
                                : exercises[currentExercise || 0]?.correctAnswer}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-bold text-lg">Explanation:</h5>
                            <p className="text-lg p-3 bg-white border-2 border-black">{exercises[currentExercise || 0]?.explanation}</p>
                          </div>
                        </div>

                        <div className="flex justify-between mt-8">
                          <button
                            onClick={prevExercise}
                            disabled={(currentExercise || 0) === 0}
                            className="bg-gray-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          
                          <button
                            onClick={resetPractice}
                            className="bg-yellow-500 text-black border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Try Again
                          </button>
                          
                          <button
                            onClick={nextExercise}
                            disabled={(currentExercise || 0) >= exercises.length - 1}
                            className="bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next Exercise
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {exercises.length > 0 && (
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={exportExercises}
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
                      onChange={importExercises}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Grammar Practice Tool helps you master English grammar through interactive exercises. 
                  Create custom exercises for specific grammar rules or practice from a library of pre-made 
                  activities. Each exercise includes detailed explanations to help you understand the underlying 
                  grammar concepts, making it an ideal tool for students, writers, and language learners.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
