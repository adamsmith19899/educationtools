"use client"

import { useState } from "react"
import { Brain, Sparkles, Copy, RefreshCw, BookOpen, Share2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface Mnemonic {
  id: string
  keyword: string
  mnemonic: string
  category: string
  timestamp: Date
}

export default function MnemonicGenerator() {
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("General")
  const [generatedMnemonic, setGeneratedMnemonic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [savedMnemonics, setSavedMnemonics] = useState<Mnemonic[]>([])
  const [activeTab, setActiveTab] = useState<"generate" | "library">("generate")
  const [categories] = useState(["General", "Science", "Math", "History", "Language", "Medicine", "Music"])
  
  // Simulate AI mnemonic generation
  const generateMnemonic = () => {
    if (!keyword.trim()) return
    
    setIsGenerating(true)
    
    // Simulate processing delay
    setTimeout(() => {
      try {
        // Extract letters from the keyword
        const letters = keyword
          .replace(/[^a-zA-Z]/g, '')
          .toUpperCase()
          .split('')
        
        // Different mnemonic types based on category
        let mnemonic = ""
        
        if (category === "Science") {
          const scienceWords = [
            "Super", "Amazing", "Brilliant", "Curious", "Diligent", 
            "Eager", "Focused", "Genius", "Intelligent", "Knowledgeable",
            "Learned", "Master", "Notable", "Observant", "Precise",
            "Quick", "Remarkable", "Scientist", "Thinker", "Understanding",
            "Visionary", "Wise", "Expert", "Youthful", "Zealous"
          ]
          
          mnemonic = letters.map((letter, index) => {
            const matchingWords = scienceWords.filter(word => 
              word.toUpperCase().startsWith(letter)
            )
            return matchingWords.length > 0 
              ? matchingWords[index % matchingWords.length] 
              : `${letter}_Word`
          }).join(" ")
          
        } else if (category === "Math") {
          const mathWords = [
            "Calculate", "Determine", "Equation", "Formula", "Geometry",
            "Hypothesis", "Integral", "Justify", "Knowledge", "Logic",
            "Multiply", "Number", "Operation", "Proof", "Quantify",
            "Reason", "Solve", "Theory", "Unknown", "Variable",
            "Work", "X-axis", "Yield", "Zero", "Algebra"
          ]
          
          mnemonic = letters.map((letter, index) => {
            const matchingWords = mathWords.filter(word => 
              word.toUpperCase().startsWith(letter)
            )
            return matchingWords.length > 0 
              ? matchingWords[index % matchingWords.length] 
              : `${letter}_Term`
          }).join(" ")
          
        } else if (category === "History") {
          const historyWords = [
            "Ancient", "Battle", "Civilization", "Dynasty", "Empire",
            "Famous", "Great", "Historical", "Important", "Journey",
            "Kingdom", "Legacy", "Monument", "Nation", "Origins",
            "Past", "Quest", "Revolution", "Story", "Tradition",
            "Uncover", "Victory", "War", "Xplorers", "Year", "Zeitgeist"
          ]
          
          mnemonic = letters.map((letter, index) => {
            const matchingWords = historyWords.filter(word => 
              word.toUpperCase().startsWith(letter)
            )
            return matchingWords.length > 0 
              ? matchingWords[index % matchingWords.length] 
              : `${letter}_Event`
          }).join(" ")
          
        } else {
          // General mnemonic generation
          const generalWords = [
            "Amazing", "Brilliant", "Creative", "Determined", "Energetic",
            "Fantastic", "Great", "Happy", "Incredible", "Joyful",
            "Kind", "Loving", "Magnificent", "Nice", "Outstanding",
            "Perfect", "Quick", "Remarkable", "Smart", "Terrific",
            "Unbelievable", "Very", "Wonderful", "Xtraordinary", "Youthful", "Zesty"
          ]
          
          mnemonic = letters.map((letter, index) => {
            const matchingWords = generalWords.filter(word => 
              word.toUpperCase().startsWith(letter)
            )
            return matchingWords.length > 0 
              ? matchingWords[index % matchingWords.length] 
              : letter
          }).join(" ")
        }
        
        // Add a creative phrase for shorter keywords
        if (letters.length <= 3) {
          const creativePhrases = [
            `"${keyword.toUpperCase()} Remember: ${mnemonic}"`,
            `"Big ${keyword} needs Big Words: ${mnemonic}"`,
            `"${mnemonic} - That's how we remember ${keyword}!"`,
            `"Never forget ${keyword} with: ${mnemonic}"`
          ]
          mnemonic = creativePhrases[Math.floor(Math.random() * creativePhrases.length)]
        } else {
          mnemonic = `"${mnemonic}"`
        }
        
        setGeneratedMnemonic(mnemonic)
        
        // Add to saved mnemonics
        const newMnemonic: Mnemonic = {
          id: Date.now().toString(),
          keyword: keyword.trim(),
          mnemonic: mnemonic,
          category: category,
          timestamp: new Date()
        }
        
        setSavedMnemonics([newMnemonic, ...savedMnemonics.slice(0, 19)]) // Keep last 20
        
      } catch (error) {
        setGeneratedMnemonic("Error generating mnemonic. Please try again.")
      } finally {
        setIsGenerating(false)
      }
    }, 600)
  }
  
  const clearInput = () => {
    setKeyword("")
    setGeneratedMnemonic("")
  }
  
  const copyToClipboard = () => {
    if (generatedMnemonic) {
      navigator.clipboard.writeText(generatedMnemonic)
        .then(() => {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        })
        .catch(err => {
          console.error('Could not copy text: ', err)
        })
    }
  }
  
  const shareMnemonic = () => {
    if (generatedMnemonic && navigator.share) {
      navigator.share({
        title: 'Check out this mnemonic!',
        text: `Mnemonic for "${keyword}": ${generatedMnemonic}`,
      })
    } else if (generatedMnemonic) {
      // Fallback to copy if Web Share API not supported
      copyToClipboard()
    }
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
                name: "Mnemonic Generator",
                description: "Create memorable mnemonics to help you remember complex information and improve learning",
                url: "https://usnewse.com/mnemonic-generator",
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
              <Brain className="h-8 w-8 text-indigo-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Mnemonic Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Create memorable mnemonics to help you remember complex information and improve learning
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Create a Mnemonic
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="keyword" className="text-lg font-bold">
                      Word or Concept
                    </Label>
                    <Input
                      id="keyword"
                      placeholder="Enter a word, acronym, or concept..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-lg font-bold">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border-2 border-black text-lg font-mono shadow-brutal p-2 bg-white dark:bg-gray-800"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={generateMnemonic}
                      disabled={!keyword.trim() || isGenerating}
                      className="flex-1 bg-indigo-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="h-5 w-5 inline mr-2" />
                      {isGenerating ? "Generating..." : "Generate Mnemonic"}
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
                    <strong>1.</strong> Enter a word, acronym, or concept you want to remember
                  </li>
                  <li>
                    <strong>2.</strong> Select a category to tailor the mnemonic
                  </li>
                  <li>
                    <strong>3.</strong> Click "Generate Mnemonic" to create a memory aid
                  </li>
                  <li>
                    <strong>4.</strong> Review and customize the generated mnemonic
                  </li>
                  <li>
                    <strong>5.</strong> Save useful mnemonics to your personal library
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Memory Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Use vivid, unusual images in your mental associations</li>
                  <li>• Incorporate humor or emotion for stronger recall</li>
                  <li>• Create personal connections to improve retention</li>
                  <li>• Practice retrieval without looking at the mnemonic</li>
                  <li>• Combine with spaced repetition for long-term memory</li>
                </ul>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <Button
                  onClick={() => setActiveTab("generate")}
                  className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                    activeTab === "generate" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                  }`}
                >
                  <Sparkles className="h-5 w-5 inline mr-2" />
                  Generator
                </Button>
                
                <Button
                  onClick={() => setActiveTab("library")}
                  className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                    activeTab === "library" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                  }`}
                >
                  <BookOpen className="h-5 w-5 inline mr-2" />
                  Library ({savedMnemonics.length})
                </Button>
              </div>

              {activeTab === "generate" ? (
                generatedMnemonic ? (
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                        Your Mnemonic
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          className="border-2 border-black hover:bg-gray-100 dark:hover:bg-gray-700"
                          disabled={!generatedMnemonic}
                        >
                          {copySuccess ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </Button>
                        
                        <Button
                          onClick={shareMnemonic}
                          variant="outline"
                          className="border-2 border-black hover:bg-gray-100 dark:hover:bg-gray-700"
                          disabled={!generatedMnemonic}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-center my-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded">
                      {generatedMnemonic}
                    </div>
                    
                    <div className="text-center text-lg">
                      <p>Use this to remember: <span className="font-bold">{keyword}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Category: {category}</p>
                    </div>
                    
                    {copySuccess && (
                      <div className="mt-4 p-2 bg-green-100 border-2 border-green-500 text-green-800 text-center font-bold">
                        Copied to clipboard!
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                    <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-bold mb-2">No mnemonic generated yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">Enter a word and click "Generate Mnemonic" to get started!</p>
                  </div>
                )
              ) : (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Mnemonic Library
                  </h3>
                  
                  {savedMnemonics.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {savedMnemonics.map((item) => (
                        <div key={item.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm">
                              <span className="font-bold">{item.keyword}</span>
                              <span className="mx-2">•</span>
                              <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(item.timestamp)}
                            </div>
                          </div>
                          
                          <div className="text-lg font-bold bg-indigo-50 dark:bg-indigo-900/20 p-3 border-l-4 border-indigo-200 dark:border-indigo-800 mb-2">
                            {item.mnemonic}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                setKeyword(item.keyword)
                                setCategory(item.category)
                                setGeneratedMnemonic(item.mnemonic)
                                setActiveTab("generate")
                              }}
                              variant="outline"
                              className="border-2 border-black text-xs px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => navigator.clipboard.writeText(item.mnemonic)}
                              variant="outline"
                              className="border-2 border-black text-xs px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Your saved mnemonics will appear here.
                    </div>
                  )}
                </div>
              )}

              {/* Description Section */}
              <div className="bg-indigo-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">About Mnemonics</h3>
                <p className="text-lg">
                  Mnemonics are memory aids that help you remember information through associations, 
                  patterns, and creative connections. This tool generates personalized mnemonics 
                  to make learning easier and more effective. Whether you're studying for exams, 
                  learning a new language, or just want to improve your memory, mnemonics can 
                  significantly enhance your recall ability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
