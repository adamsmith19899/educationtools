"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Clipboard, Book, User, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"
import Header from "@/components/Header"  // ✅ Ensure this exists
import Footer from "@/components/Footer"  // ✅ Ensure this exists

interface Source {
  id: string
  type: "book" | "article" | "website" | "journal" | "video"
  title: string
  author: string
  year: string
  publisher?: string
  url?: string
  accessedDate?: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
}

export default function CitationGenerator() {
  const [darkMode, setDarkMode] = useState(false) // ✅ For Header toggle
  const [sources, setSources] = useState<Source[]>([])
  const [currentSource, setCurrentSource] = useState<Source | null>(null)
  const [citationStyle, setCitationStyle] = useState<"apa" | "mla" | "chicago">("apa")
  const [isAdding, setIsAdding] = useState(false)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  // Form states
  const [sourceType, setSourceType] = useState<"book" | "article" | "website" | "journal" | "video">("website")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [year, setYear] = useState("")
  const [publisher, setPublisher] = useState("")
  const [url, setUrl] = useState("")
  const [accessedDate, setAccessedDate] = useState("")
  const [journal, setJournal] = useState("")
  const [volume, setVolume] = useState("")
  const [issue, setIssue] = useState("")
  const [pages, setPages] = useState("")

  const generateCitation = (source: Source, style: "apa" | "mla" | "chicago"): string => {
    const authorNames = source.author.split(",").map(name => name.trim())
    const formattedAuthor = authorNames.length > 0 ? authorNames[0] : ""
    
    switch (style) {
      case "apa":
        switch (source.type) {
          case "book":
            return `${formattedAuthor}. (${source.year}). ${source.title}. ${source.publisher}.`
          case "article":
          case "journal":
            return `${formattedAuthor}. (${source.year}). ${source.title}. ${source.journal ? source.journal + (source.volume ? `, ${source.volume}` : '') + (source.issue ? `(${source.issue})` : '') + (source.pages ? `, ${source.pages}` : '') + '.' : ''}`
          case "website":
            return `${formattedAuthor}. (${source.year}). ${source.title}. ${source.publisher ? source.publisher + '. ' : ''}Retrieved ${source.accessedDate} from ${source.url}`
          case "video":
            return `${formattedAuthor}. (${source.year}). ${source.title} [Video]. ${source.publisher ? source.publisher + '. ' : ''}Retrieved from ${source.url}`
          default:
            return source.title
        }
      case "mla":
        switch (source.type) {
          case "book":
            return `${formattedAuthor}. <em>${source.title}</em>. ${source.publisher}, ${source.year}.`
          case "article":
          case "journal":
            return `${formattedAuthor}. "${source.title}." <em>${source.journal}</em>, vol. ${source.volume}, no. ${source.issue}, ${source.year}, pp. ${source.pages}.`
          case "website":
            return `${formattedAuthor}. "<em>${source.title}</em>." ${source.publisher}, ${source.year}, ${source.url}. Accessed ${source.accessedDate}.`
          case "video":
            return `${formattedAuthor}. "<em>${source.title}</em>." ${source.publisher}, ${source.year}, ${source.url}.`
          default:
            return source.title
        }
      case "chicago":
        switch (source.type) {
          case "book":
            return `${formattedAuthor}. <em>${source.title}</em>. ${source.publisher}, ${source.year}.`
          case "article":
          case "journal":
            return `${formattedAuthor}. "${source.title}." <em>${source.journal}</em> ${source.volume}, no. ${source.issue} (${source.year}): ${source.pages}.`
          case "website":
            return `${formattedAuthor}. "${source.title}." ${source.publisher}. Last modified ${source.year}. Accessed ${source.accessedDate}. ${source.url}.`
          case "video":
            return `${formattedAuthor}. "${source.title}." ${source.publisher}. Video, ${source.year}. ${source.url}.`
          default:
            return source.title
        }
      default:
        return source.title
    }
  }

  const addSource = () => {
    if (title && author && year) {
      const newSource: Source = {
        id: Date.now().toString(),
        type: sourceType,
        title: title.trim(),
        author: author.trim(),
        year,
        publisher: publisher.trim() || undefined,
        url: url.trim() || undefined,
        accessedDate: accessedDate || undefined,
        journal: journal.trim() || undefined,
        volume: volume.trim() || undefined,
        issue: issue.trim() || undefined,
        pages: pages.trim() || undefined
      }
      setSources([...sources, newSource])
      resetForm()
      setIsAdding(false)
    }
  }

  const resetForm = () => {
    setSourceType("website")
    setTitle("")
    setAuthor("")
    setYear("")
    setPublisher("")
    setUrl("")
    setAccessedDate("")
    setJournal("")
    setVolume("")
    setIssue("")
    setPages("")
    setCurrentSource(null)
  }

  const editSource = (source: Source) => {
    setCurrentSource(source)
    setSourceType(source.type)
    setTitle(source.title)
    setAuthor(source.author)
    setYear(source.year)
    setPublisher(source.publisher || "")
    setUrl(source.url || "")
    setAccessedDate(source.accessedDate || "")
    setJournal(source.journal || "")
    setVolume(source.volume || "")
    setIssue(source.issue || "")
    setPages(source.pages || "")
    setIsAdding(true)
  }

  const updateSource = () => {
    if (currentSource && title && author && year) {
      setSources(sources.map(source => 
        source.id === currentSource.id 
          ? {
              ...source,
              type: sourceType,
              title: title.trim(),
              author: author.trim(),
              year,
              publisher: publisher.trim() || undefined,
              url: url.trim() || undefined,
              accessedDate: accessedDate || undefined,
              journal: journal.trim() || undefined,
              volume: volume.trim() || undefined,
              issue: issue.trim() || undefined,
              pages: pages.trim() || undefined
            }
          : source
      ))
      resetForm()
      setIsAdding(false)
    }
  }

  const deleteSource = (id: string) => {
    setSources(sources.filter(source => source.id !== id))
  }

  const copyCitation = (citation: string) => {
    navigator.clipboard.writeText(citation)
    setCopySuccess("Copied!")
    setTimeout(() => setCopySuccess(null), 2000)
  }

  const exportSources = () => {
    const dataStr = JSON.stringify(sources, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "citations.json"
    link.click()
  }

  const importSources = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSources = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedSources)) {
          setSources(importedSources)
        }
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  return (
    // ✅ Single root container with flex layout
    <div className={`flex flex-col min-h-screen bg-background font-mono ${darkMode ? 'dark' : ''}`}>
      {/* ✅ Header with dark mode toggle */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Sidebar & ScrollToTop */}
      <Sidebar />
      <ScrollToTop />

      {/* Main Content */}
      <div className="lg:pr-80 lg:pl-0 flex-1">
        <div className="container py-8 px-6 flex flex-col min-h-full">
          
          {/* Schema Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Citation Generator",
                description: "Generate properly formatted citations in APA, MLA, and Chicago styles for academic writing",
                url: "https://usnewse.com/citation-generator",
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

          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Clipboard className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Citation Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Generate properly formatted citations in APA, MLA, and Chicago styles for academic writing
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-8 lg:grid-cols-2 flex-1">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  {isAdding ? (currentSource ? "Edit Source" : "Add New Source") : "Add Source"}
                </h2>

                {!isAdding ? (
                  <div className="space-y-4">
                    {/* Source Type */}
                    <div>
                      <Label htmlFor="type" className="text-lg font-bold">
                        Source Type
                      </Label>
                      <select
                        id="type"
                        value={sourceType}
                        onChange={(e) => setSourceType(e.target.value as any)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      >
                        <option value="website">Website</option>
                        <option value="book">Book</option>
                        <option value="journal">Journal Article</option>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                      </select>
                    </div>

                    {/* Title */}
                    <div>
                      <Label htmlFor="title" className="text-lg font-bold">
                        Title
                      </Label>
                      <input
                        type="text"
                        id="title"
                        placeholder="Enter title of the work..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <Label htmlFor="author" className="text-lg font-bold">
                        Author(s)
                      </Label>
                      <input
                        type="text"
                        id="author"
                        placeholder="Last Name, First Name; e.g., Smith, John"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    {/* Year & Publisher */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year" className="text-lg font-bold">
                          Year
                        </Label>
                        <input
                          type="text"
                          id="year"
                          placeholder="2024"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="publisher" className="text-lg font-bold">
                          Publisher
                        </Label>
                        <input
                          type="text"
                          id="publisher"
                          placeholder="Publisher name"
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    {/* Website/Video Fields */}
                    {(sourceType === "website" || sourceType === "video") && (
                      <>
                        <div>
                          <Label htmlFor="url" className="text-lg font-bold">
                            URL
                          </Label>
                          <input
                            type="url"
                            id="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accessedDate" className="text-lg font-bold">
                            Accessed Date
                          </Label>
                          <input
                            type="date"
                            id="accessedDate"
                            value={accessedDate}
                            onChange={(e) => setAccessedDate(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                      </>
                    )}

                    {/* Journal/Article Fields */}
                    {(sourceType === "journal" || sourceType === "article") && (
                      <>
                        <div>
                          <Label htmlFor="journal" className="text-lg font-bold">
                            Journal/Periodical
                          </Label>
                          <input
                            type="text"
                            id="journal"
                            placeholder="Journal name"
                            value={journal}
                            onChange={(e) => setJournal(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="volume" className="text-lg font-bold">
                              Volume
                            </Label>
                            <input
                              type="text"
                              id="volume"
                              placeholder="Vol."
                              value={volume}
                              onChange={(e) => setVolume(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                          <div>
                            <Label htmlFor="issue" className="text-lg font-bold">
                              Issue
                            </Label>
                            <input
                              type="text"
                              id="issue"
                              placeholder="Issue"
                              value={issue}
                              onChange={(e) => setIssue(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pages" className="text-lg font-bold">
                              Pages
                            </Label>
                            <input
                              type="text"
                              id="pages"
                              placeholder="pp. 1-10"
                              value={pages}
                              onChange={(e) => setPages(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      onClick={addSource}
                      disabled={!title || !author || !year}
                      className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5 inline mr-2" />
                      Add Source
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Edit Mode Form (same fields) */}
                    {/* ... identical to above, just Update button */}
                    {/* (kept for brevity, but you already have it) */}
                    <div>
                      <Label htmlFor="type" className="text-lg font-bold">
                        Source Type
                      </Label>
                      <select
                        id="type"
                        value={sourceType}
                        onChange={(e) => setSourceType(e.target.value as any)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      >
                        <option value="website">Website</option>
                        <option value="book">Book</option>
                        <option value="journal">Journal Article</option>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="title" className="text-lg font-bold">
                        Title
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
                      <Label htmlFor="author" className="text-lg font-bold">
                        Author(s)
                      </Label>
                      <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year" className="text-lg font-bold">
                          Year
                        </Label>
                        <input
                          type="text"
                          id="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="publisher" className="text-lg font-bold">
                          Publisher
                        </Label>
                        <input
                          type="text"
                          id="publisher"
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    {(sourceType === "website" || sourceType === "video") && (
                      <>
                        <div>
                          <Label htmlFor="url" className="text-lg font-bold">
                            URL
                          </Label>
                          <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accessedDate" className="text-lg font-bold">
                            Accessed Date
                          </Label>
                          <input
                            type="date"
                            id="accessedDate"
                            value={accessedDate}
                            onChange={(e) => setAccessedDate(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                      </>
                    )}

                    {(sourceType === "journal" || sourceType === "article") && (
                      <>
                        <div>
                          <Label htmlFor="journal" className="text-lg font-bold">
                            Journal/Periodical
                          </Label>
                          <input
                            type="text"
                            id="journal"
                            value={journal}
                            onChange={(e) => setJournal(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="volume" className="text-lg font-bold">
                              Volume
                            </Label>
                            <input
                              type="text"
                              id="volume"
                              value={volume}
                              onChange={(e) => setVolume(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                          <div>
                            <Label htmlFor="issue" className="text-lg font-bold">
                              Issue
                            </Label>
                            <input
                              type="text"
                              id="issue"
                              value={issue}
                              onChange={(e) => setIssue(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pages" className="text-lg font-bold">
                              Pages
                            </Label>
                            <input
                              type="text"
                              id="pages"
                              value={pages}
                              onChange={(e) => setPages(e.target.value)}
                              className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={updateSource}
                        disabled={!title || !author || !year}
                        className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Update Source
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
                  <li><strong>1.</strong> Select your source type (book, website, etc.)</li>
                  <li><strong>2.</strong> Fill in the required information</li>
                  <li><strong>3.</strong> Choose your citation style (APA, MLA, Chicago)</li>
                  <li><strong>4.</strong> Generate and copy citations</li>
                  <li><strong>5.</strong> Export your bibliography</li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Citation Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Always verify citations with official style guides</li>
                  <li>• Include DOIs for academic journal articles when available</li>
                  <li>• For websites, include retrieval dates for time-sensitive content</li>
                  <li>• Double-check author names and publication dates</li>
                  <li>• Maintain consistency in your citation style throughout your work</li>
                </ul>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {sources.length > 0 ? (
                <>
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                      {(["apa", "mla", "chicago"] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => setCitationStyle(style)}
                          className={`px-4 py-3 border-4 border-black font-bold text-sm uppercase transition-all ${
                            citationStyle === style
                              ? "bg-blue-600 text-white"
                              : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {style.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <label className="bg-purple-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal cursor-pointer hover:translate-y-1 hover:shadow-none transition-all">
                      <Download className="h-5 w-5 inline mr-2" />
                      Import
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSources}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={exportSources}
                      className="bg-orange-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                      Citations ({sources.length})
                    </h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {sources.map((source) => {
                        const citation = generateCitation(source, citationStyle)
                        return (
                          <div key={source.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800 relative">
                            <div className="flex justify-between items-start mb-2">
                              <span className="px-2 py-1 text-xs font-bold border border-black bg-blue-600 text-white uppercase">
                                {source.type}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => copyCitation(citation)}
                                  className="bg-green-600 text-white border border-black p-1 hover:bg-green-700 transition-colors flex items-center gap-1 text-xs"
                                >
                                  <Clipboard className="h-3 w-3" />
                                  {copySuccess === source.id ? "Copied!" : "Copy"}
                                </button>
                                <button
                                  onClick={() => editSource(source)}
                                  className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteSource(source.id)}
                                  className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div 
                              className="text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: citation }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <Clipboard className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No sources added yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Add your first source to generate citations!</p>
                </div>
              )}

              {/* Description */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Citation Generator helps you create properly formatted citations in APA, MLA, and Chicago styles.
                  Simply enter your source information and select your preferred citation style to generate accurate
                  references for your academic papers, essays, and research projects. Save time and ensure consistency
                  in your bibliographies with this easy-to-use tool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  )
}
