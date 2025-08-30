"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Clipboard, Book, User, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ToolLayout } from "@/components/tool-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Citation Generator - APA, MLA, Chicago Style Citations | Informi Education Online",
  description:
    "Generate accurate citations in APA, MLA, and Chicago styles. Perfect for academic papers, research projects, and scholarly writing.",
  keywords:
    "citation generator, APA citations, MLA citations, Chicago style, bibliography, academic writing, research citations",
}

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
  const [darkMode, setDarkMode] = useState(false)
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
            return `${formattedAuthor}. (${source.year}). <em>${source.title}</em>. ${source.publisher}.`
          case "article":
          case "journal":
            return `${formattedAuthor}. (${source.year}). ${source.title}. <em>${source.journal}</em>, ${source.volume ? `vol. ${source.volume}, ` : ''}${source.issue ? `no. ${source.issue}, ` : ''}${source.pages ? `pp. ${source.pages}.` : ''}`
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
    navigator.clipboard.writeText(citation.replace(/<[^>]+>/g, '')) // strip HTML for clipboard
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
    <ToolLayout toolName="Citation Generator">
      <div className="space-y-8">
        {/* Tool Interface */}
        <div className="bg-white border-4 border-black p-6 shadow-brutal">
          <div className="space-y-6">
            {/* Style Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setCitationStyle("apa")}
                className={`p-3 border-2 border-black font-bold text-lg uppercase ${
                  citationStyle === "apa"
                    ? "bg-blue-600 text-white"
                    : "bg-primary text-black hover:bg-secondary hover:text-black"
                } transition-colors`}
              >
                APA STYLE
              </button>
              <button
                onClick={() => setCitationStyle("mla")}
                className={`p-3 border-2 border-black font-bold text-lg uppercase ${
                  citationStyle === "mla"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-secondary"
                } transition-colors`}
              >
                MLA STYLE
              </button>
              <button
                onClick={() => setCitationStyle("chicago")}
                className={`p-3 border-2 border-black font-bold text-lg uppercase ${
                  citationStyle === "chicago"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-secondary"
                } transition-colors`}
              >
                CHICAGO STYLE
              </button>
            </div>

            {/* Source Type & Author */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2">Source Type</label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                  className="w-full p-3 border-2 border-black text-lg font-mono"
                >
                  <option value="website">Website</option>
                  <option value="book">Book</option>
                  <option value="journal">Journal Article</option>
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Author</label>
                <input
                  type="text"
                  placeholder="Last, First M."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-3 border-2 border-black text-lg font-mono"
                />
              </div>
            </div>

            {/* Title & Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Source title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border-2 border-black text-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Publication Year</label>
                <input
                  type="text"
                  placeholder="2024"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-3 border-2 border-black text-lg font-mono"
                />
              </div>
            </div>

            {/* Dynamic Fields */}
            {(sourceType === "website" || sourceType === "video") && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-bold mb-2">URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full p-3 border-2 border-black text-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2">Accessed Date</label>
                  <input
                    type="date"
                    value={accessedDate}
                    onChange={(e) => setAccessedDate(e.target.value)}
                    className="w-full p-3 border-2 border-black text-lg font-mono"
                  />
                </div>
              </div>
            )}

            {(sourceType === "journal" || sourceType === "article") && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-lg font-bold mb-2">Journal</label>
                  <input
                    type="text"
                    placeholder="Journal Name"
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full p-3 border-2 border-black text-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2">Volume</label>
                  <input
                    type="text"
                    placeholder="Vol."
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full p-3 border-2 border-black text-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2">Issue</label>
                  <input
                    type="text"
                    placeholder="Issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full p-3 border-2 border-black text-lg font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-lg font-bold mb-2">Publisher</label>
              <input
                type="text"
                placeholder="Publisher (if applicable)"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full p-3 border-2 border-black text-lg font-mono"
              />
            </div>

            {sourceType === "journal" && (
              <div>
                <label className="block text-lg font-bold mb-2">Pages</label>
                <input
                  type="text"
                  placeholder="pp. 1-10"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="w-full p-3 border-2 border-black text-lg font-mono"
                />
              </div>
            )}

            {/* Add/Update Button */}
            <button
              onClick={isAdding ? updateSource : addSource}
              disabled={!title || !author || !year}
              className="w-full bg-accent text-black p-4 border-2 border-black font-bold text-xl hover:bg-secondary transition-colors disabled:opacity-50"
            >
              {isAdding ? "UPDATE SOURCE" : "ADD SOURCE"}
            </button>

            {/* Generated Citations */}
            {sources.length > 0 && (
              <div className="bg-gray-100 border-2 border-black p-4 mt-6">
                <h3 className="font-bold text-lg mb-3">Citations ({sources.length})</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {sources.map((source) => {
                    const citation = generateCitation(source, citationStyle)
                    return (
                      <div key={source.id} className="bg-white p-3 border-2 border-black relative">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 uppercase">
                            {source.type}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => copyCitation(citation)}
                              className="text-xs bg-green-600 text-white border border-black px-2 py-1 hover:bg-green-700"
                            >
                              {copySuccess === source.id ? "Copied!" : "Copy"}
                            </button>
                            <button
                              onClick={() => editSource(source)}
                              className="text-xs bg-blue-600 text-white border border-black px-2 py-1 hover:bg-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteSource(source.id)}
                              className="text-xs bg-red-600 text-white border border-black px-2 py-1 hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div
                          className="text-sm font-mono leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: citation }}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 flex gap-3">
                  <label className="bg-purple-600 text-white p-2 border-2 border-black font-bold cursor-pointer hover:translate-y-1 transition-all">
                    <Download className="h-5 w-5 inline mr-1" />
                    Import
                    <input type="file" accept=".json" onChange={importSources} className="hidden" />
                  </label>
                  <button
                    onClick={exportSources}
                    className="bg-orange-500 text-white p-2 border-2 border-black font-bold hover:translate-y-1 transition-all"
                  >
                    <Download className="h-5 w-5 inline mr-1" /> Export
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-lime-400 border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">HOW TO USE</h2>
          <ol className="space-y-3 text-lg">
            <li><strong>1. Choose Style:</strong> Select APA, MLA, or Chicago citation style</li>
            <li><strong>2. Select Source Type:</strong> Choose the type of source you're citing</li>
            <li><strong>3. Fill Information:</strong> Enter author, title, publication details</li>
            <li><strong>4. Generate Citation:</strong> Click to create properly formatted citation</li>
            <li><strong>5. Copy & Use:</strong> Copy the citation to your bibliography or works cited page</li>
          </ol>
        </div>

        {/* Description */}
        <div className="bg-blue-600 text-white border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-white pb-2">DESCRIPTION</h2>
          <p className="text-lg leading-relaxed">
            The Citation Generator creates accurate, properly formatted citations in major academic styles including
            APA, MLA, and Chicago. This tool ensures your research papers meet academic standards and helps you avoid
            plagiarism by properly crediting sources. Whether you're writing essays, research papers, or dissertations,
            this generator saves time and ensures consistency in your bibliographic references.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-yellow-500 border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">TIPS</h2>
          <ul className="space-y-3 text-lg">
            <li><strong>Double-Check Information:</strong> Verify all source details before generating citations</li>
            <li><strong>Know Your Style:</strong> Check assignment requirements for the required citation style</li>
            <li><strong>Keep Records:</strong> Save source information as you research to make citing easier</li>
            <li><strong>Use Consistent Format:</strong> Stick to one citation style throughout your paper</li>
            <li><strong>Include Page Numbers:</strong> Add specific page numbers for direct quotes and paraphrases</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
