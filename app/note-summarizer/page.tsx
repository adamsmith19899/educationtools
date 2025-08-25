"use client"

import { useState } from "react"
import { BookOpen, Sparkles, Copy, RefreshCw, FileText, Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface Summary {
  id: string
  original: string
  summarized: string
  timestamp: Date
}

export default function NoteSummarizer() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [history, setHistory] = useState<Summary[]>([])
  const [activeTab, setActiveTab] = useState<"summarize" | "history">("summarize")
  
  // Simulate AI summarization with a simple algorithm
  // In a real app, this would call an API
  const generateSummary = () => {
    if (!inputText.trim()) return
    
    setIsSummarizing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        // Simple summarization algorithm - extract key sentences
        const sentences = inputText
          .replace(/\n/g, " ")
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0)
        
        // Get the first sentence and any sentences with commas (likely more important)
        let summarySentences = []
        if (sentences.length > 0) {
          summarySentences.push(sentences[0]) // Always include first sentence
        
          // Include sentences with commas or that are longer
          const importantSentences = sentences.slice(1).filter(s => 
            s.includes(',') || s.length > 50
          )
          
          // Take up to 2 more important sentences
          summarySentences = summarySentences.concat(
            importantSentences.slice(0, 2)
          )
          
          // If we don't have enough, just take the next sentences
          if (summarySentences.length < 3 && sentences.length > summarySentences.length) {
            const remaining = 3 - summarySentences.length
            summarySentences = summarySentences.concat(
              sentences.slice(1, remaining + 1)
            )
          }
        }
        
        // Create the summary
        let generatedSummary = summarySentences
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join(". ") + "."
        
        // Ensure we have a summary and it's not the same as input
        if (generatedSummary === ".") {
          generatedSummary = sentences.slice(0, 2).join(". ") + "."
        }
        
        // Limit length if needed
        if (generatedSummary.length > 500) {
          generatedSummary = generatedSummary.substring(0, 497) + "..."
        }
        
        setSummary(generatedSummary)
        
        // Add to history
        const newSummary: Summary = {
          id: Date.now().toString(),
          original: inputText,
          summarized: generatedSummary,
          timestamp: new Date()
        }
        
        setHistory([newSummary, ...history.slice(0, 9)]) // Keep last 10 summaries
        
      } catch (error) {
        setSummary("Error generating summary. Please try again with different text.")
      } finally {
        setIsSummarizing(false)
      }
    }, 800)
  }
  
  const clearInput = () => {
    setInputText("")
    setSummary("")
  }
  
  const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
        .then(() => {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        })
        .catch(err => {
          console.error('Could not copy text: ', err)
        })
    }
  }
  
  const loadFromHistory = (summarizedText: string) => {
    setSummary(summarizedText)
    setActiveTab("summarize")
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
                name: "Note Summarizer",
                description: "Quickly summarize your notes and text with AI-powered summarization",
                url: "https://usnewse.com/note-summarizer",
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
              <Sparkles className="h-8 w-8 text-yellow-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Note Summarizer</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Quickly summarize your notes and text with AI-powered summarization
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Enter Your Notes
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes" className="text-lg font-bold">
                      Text to Summarize
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Paste your notes, article, or text here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="border-2 border-black h-64 text-lg font-mono shadow-brutal resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generateSummary}
                      disabled={!inputText.trim() || isSummarizing}
                      className="flex-1 bg-yellow-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="h-5 w-5 inline mr-2" />
                      {isSummarizing ? "Summarizing..." : "Generate Summary"}
                    </Button>
                    
                    <Button
                      onClick={clearInput}
                      variant="outline"
                      className="border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Paste your notes, article, or text in the input box
                  </li>
                  <li>
                    <strong>2.</strong> Click "Generate Summary" to process the text
                  </li>
                  <li>
                    <strong>3.</strong> Review the AI-generated summary
                  </li>
                  <li>
                    <strong>4.</strong> Copy the summary or save it to your history
                  </li>
                  <li>
                    <strong>5.</strong> Use the history tab to access previous summaries
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Summarization Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Clear, well-structured text produces better summaries</li>
                  <li>• Break long documents into sections for better results</li>
                  <li>• Review summaries for accuracy before using</li>
                  <li>• Use bullet points in original text for key information</li>
                  <li>• Combine with flashcards for effective studying</li>
                </ul>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveTab("summarize")}
                  className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                    activeTab === "summarize" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                  }`}
                >
                  <FileText className="h-5 w-5 inline mr-2" />
                  Summary
                </Button>
                
                <Button
                  onClick={() => setActiveTab("history")}
                  className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                    activeTab === "history" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                  }`}
                >
                  <BookOpen className="h-5 w-5 inline mr-2" />
                  History ({history.length})
                </Button>
              </div>

              {activeTab === "summarize" ? (
                summary ? (
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                        Summary
                      </h3>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="border-2 border-black hover:bg-gray-100 dark:hover:bg-gray-700"
                        disabled={!summary}
                      >
                        {copySuccess ? (
                          <>
                            <Check className="h-5 w-5 text-green-600" />
                          </>
                        ) : (
                          <>
                            <Copy className="h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="text-lg leading-relaxed min-h-[200px]">
                      {summary}
                    </div>
                    
                    {copySuccess && (
                      <div className="mt-4 p-2 bg-green-100 border-2 border-green-500 text-green-800 text-center font-bold">
                        Copied to clipboard!
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-bold mb-2">No summary generated yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Enter text and click "Generate Summary" to get started!</p>
                  </div>
                )
              ) : (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Summary History
                  </h3>
                  
                  {history.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {history.map((item) => (
                        <div key={item.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(item.timestamp)}
                            </div>
                            <Button
                              onClick={() => loadFromHistory(item.summarized)}
                              variant="outline"
                              className="border-2 border-black text-xs px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Reuse
                            </Button>
                          </div>
                          
                          <div className="text-sm italic mb-2 line-clamp-3">
                            {item.original.substring(0, 200)}{item.original.length > 200 ? "..." : ""}
                          </div>
                          
                          <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-2 border-l-4 border-blue-500">
                            {item.summarized.substring(0, 150)}{item.summarized.length > 150 ? "..." : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No history yet. Your summaries will appear here.
                    </div>
                  )}
                </div>
              )}

              {/* Description Section */}
              <div className="bg-yellow-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">About Summarization</h3>
                <p className="text-lg">
                  The Note Summarizer uses advanced algorithms to extract key information from your text and create concise summaries. 
                  This tool helps you quickly grasp the main points of lengthy documents, articles, or study notes. 
                  Perfect for students, researchers, and professionals who need to process information efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
