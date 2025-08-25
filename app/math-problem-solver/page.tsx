"use client"

import { useState } from "react"
import { Calculator, Play, RotateCcw, Copy, History } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"

interface SolutionStep {
  step: number
  description: string
  equation: string
  explanation: string
}

interface MathSolution {
  id: string
  problem: string
  answer: string
  steps: SolutionStep[]
  category: string
  timestamp: Date
}

export default function MathProblemSolver() {
  const [problem, setProblem] = useState("")
  const [currentSolution, setCurrentSolution] = useState<MathSolution | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<MathSolution[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Mock math solver function - in a real app, this would call an API
  const solveProblem = async (mathProblem: string): Promise<MathSolution> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock solution based on problem type
    const problemLower = mathProblem.toLowerCase()
    let category = "General"
    let answer = ""
    let steps: SolutionStep[] = []

    if (problemLower.includes("quadratic") || problemLower.includes("x²") || problemLower.includes("x^2")) {
      category = "Algebra"
      answer = "x = 2, x = -3"
      steps = [
        {
          step: 1,
          description: "Identify the quadratic equation",
          equation: "x² + x - 6 = 0",
          explanation: "This is a standard quadratic equation in the form ax² + bx + c = 0",
        },
        {
          step: 2,
          description: "Factor the equation",
          equation: "(x + 3)(x - 2) = 0",
          explanation: "Find two numbers that multiply to -6 and add to 1: 3 and -2",
        },
        {
          step: 3,
          description: "Solve for x",
          equation: "x + 3 = 0 or x - 2 = 0",
          explanation: "Set each factor equal to zero",
        },
        {
          step: 4,
          description: "Final answer",
          equation: "x = -3 or x = 2",
          explanation: "The solutions are the x-intercepts of the parabola",
        },
      ]
    } else if (problemLower.includes("derivative") || problemLower.includes("d/dx")) {
      category = "Calculus"
      answer = "f'(x) = 3x² + 2x"
      steps = [
        {
          step: 1,
          description: "Identify the function",
          equation: "f(x) = x³ + x² + 5",
          explanation: "We need to find the derivative of this polynomial function",
        },
        {
          step: 2,
          description: "Apply power rule",
          equation: "d/dx[x³] = 3x²",
          explanation: "For xⁿ, the derivative is n·xⁿ⁻¹",
        },
        {
          step: 3,
          description: "Continue with power rule",
          equation: "d/dx[x²] = 2x",
          explanation: "Apply the same rule to the second term",
        },
        {
          step: 4,
          description: "Derivative of constant",
          equation: "d/dx[5] = 0",
          explanation: "The derivative of any constant is zero",
        },
        {
          step: 5,
          description: "Combine results",
          equation: "f'(x) = 3x² + 2x + 0 = 3x² + 2x",
          explanation: "Add all the derivative terms together",
        },
      ]
    } else if (problemLower.includes("integral") || problemLower.includes("∫")) {
      category = "Calculus"
      answer = "∫(2x + 3)dx = x² + 3x + C"
      steps = [
        {
          step: 1,
          description: "Identify the integral",
          equation: "∫(2x + 3)dx",
          explanation: "We need to find the antiderivative of this function",
        },
        {
          step: 2,
          description: "Split the integral",
          equation: "∫2x dx + ∫3 dx",
          explanation: "Use the sum rule for integration",
        },
        {
          step: 3,
          description: "Apply power rule for integration",
          equation: "2∫x dx + 3∫1 dx",
          explanation: "Factor out constants and integrate each term",
        },
        {
          step: 4,
          description: "Integrate each term",
          equation: "2(x²/2) + 3x + C",
          explanation: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
        },
        {
          step: 5,
          description: "Simplify",
          equation: "x² + 3x + C",
          explanation: "Combine and simplify the result",
        },
      ]
    } else {
      // Default arithmetic example
      category = "Arithmetic"
      answer = "42"
      steps = [
        {
          step: 1,
          description: "Parse the expression",
          equation: "15 + 27",
          explanation: "Identify the numbers and operation to perform",
        },
        {
          step: 2,
          description: "Perform addition",
          equation: "15 + 27 = 42",
          explanation: "Add the two numbers together",
        },
      ]
    }

    return {
      id: Date.now().toString(),
      problem: mathProblem,
      answer,
      steps,
      category,
      timestamp: new Date(),
    }
  }

  const handleSolve = async () => {
    if (!problem.trim()) return

    setIsLoading(true)
    try {
      const solution = await solveProblem(problem)
      setCurrentSolution(solution)
      setHistory([solution, ...history.slice(0, 9)]) // Keep last 10 solutions
    } catch (error) {
      console.error("Error solving problem:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearProblem = () => {
    setProblem("")
    setCurrentSolution(null)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const loadFromHistory = (solution: MathSolution) => {
    setProblem(solution.problem)
    setCurrentSolution(solution)
    setShowHistory(false)
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
                name: "Math Problem Solver",
                description:
                  "Step-by-step solutions for complex mathematical problems including algebra, calculus, and more",
                url: "https://usnewse.com/math-problem-solver",
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
              <Calculator className="h-8 w-8 text-black dark:text-white" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Math Problem Solver</h1>
            </div>
            <p className="text-xl text-muted-foreground">Step-by-step solutions for complex mathematical problems</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Enter Math Problem
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="problem" className="text-lg font-bold">
                      Problem
                    </Label>
                    <Textarea
                      id="problem"
                      placeholder="Enter your math problem here... 
Examples:
• x² + x - 6 = 0
• Find the derivative of x³ + x² + 5
• ∫(2x + 3)dx
• 15 + 27"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="border-2 border-black h-32 text-lg font-mono shadow-brutal resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSolve}
                      disabled={!problem.trim() || isLoading}
                      className="flex-1 bg-black text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline mr-2"></div>
                          Solving...
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5 inline mr-2" />
                          Solve Problem
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearProblem}
                      className="bg-red-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-6 shadow-brutal">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                    Recent Problems
                  </h3>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="bg-blue-600 text-white border-2 border-black px-3 py-1 font-bold text-sm shadow-brutal"
                  >
                    <History className="h-4 w-4 inline mr-1" />
                    {showHistory ? "Hide" : "Show"}
                  </button>
                </div>

                {showHistory && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No problems solved yet</p>
                    ) : (
                      history.map((solution) => (
                        <div
                          key={solution.id}
                          onClick={() => loadFromHistory(solution)}
                          className="bg-white dark:bg-gray-700 border-2 border-black p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="text-sm font-bold">{solution.category}</div>
                          <div className="text-xs truncate">{solution.problem}</div>
                          <div className="text-xs text-gray-500">{solution.timestamp.toLocaleDateString()}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* How to Use */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Enter your math problem in the text area
                  </li>
                  <li>
                    <strong>2.</strong> Click "Solve Problem" to get step-by-step solution
                  </li>
                  <li>
                    <strong>3.</strong> Review each step and explanation
                  </li>
                  <li>
                    <strong>4.</strong> Copy solutions or access recent problems
                  </li>
                  <li>
                    <strong>5.</strong> Use clear mathematical notation for best results
                  </li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Problem Types</h3>
                <ul className="space-y-2 text-lg">
                  <li>
                    • <strong>Algebra:</strong> Equations, inequalities, factoring
                  </li>
                  <li>
                    • <strong>Calculus:</strong> Derivatives, integrals, limits
                  </li>
                  <li>
                    • <strong>Geometry:</strong> Area, volume, trigonometry
                  </li>
                  <li>
                    • <strong>Statistics:</strong> Probability, distributions
                  </li>
                  <li>
                    • <strong>Arithmetic:</strong> Basic operations, fractions
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution Display */}
            <div className="space-y-6">
              {currentSolution ? (
                <>
                  {/* Answer */}
                  <div className="bg-green-500 text-white border-4 border-black p-6 shadow-brutal">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase border-b-2 border-white pb-2">Answer</h3>
                      <button
                        onClick={() => copyToClipboard(currentSolution.answer)}
                        className="bg-white text-green-500 border-2 border-white px-3 py-1 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Copy className="h-4 w-4 inline mr-1" />
                        Copy
                      </button>
                    </div>
                    <div className="text-2xl font-black font-mono bg-white text-green-500 border-2 border-white p-4">
                      {currentSolution.answer}
                    </div>
                    <div className="mt-2 text-sm">
                      <strong>Category:</strong> {currentSolution.category}
                    </div>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                      Step-by-Step Solution
                    </h3>

                    <div className="space-y-6">
                      {currentSolution.steps.map((step) => (
                        <div key={step.step} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-blue-600 text-white border-2 border-black w-8 h-8 flex items-center justify-center font-bold">
                              {step.step}
                            </div>
                            <h4 className="text-lg font-bold">{step.description}</h4>
                          </div>

                          <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-black p-3 mb-3 font-mono text-lg">
                            {step.equation}
                          </div>

                          <p className="text-gray-700 dark:text-gray-300">{step.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No problem solved yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter a math problem and click "Solve Problem" to see step-by-step solutions!
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Math Problem Solver provides detailed, step-by-step solutions for a wide range of mathematical
                  problems. From basic arithmetic to advanced calculus, get clear explanations and learn the reasoning
                  behind each step. Perfect for homework help, exam preparation, and understanding mathematical
                  concepts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
