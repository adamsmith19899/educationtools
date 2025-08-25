"use client"

import { useState } from "react"
import { FileText, Plus, Trash2, Download, RotateCcw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"

interface OutlinePoint {
  id: string
  text: string
  level: number
  children: OutlinePoint[]
}

interface EssayOutline {
  id: string
  title: string
  essayType: string
  thesis: string
  introduction: OutlinePoint[]
  body: OutlinePoint[]
  conclusion: OutlinePoint[]
  createdAt: Date
}

export default function EssayOutlineGenerator() {
  const [outlines, setOutlines] = useState<EssayOutline[]>([])
  const [currentOutline, setCurrentOutline] = useState<EssayOutline | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingPoint, setEditingPoint] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    essayType: "argumentative",
    thesis: "",
    topic: "",
    keyPoints: "",
  })

  const essayTypes = [
    "argumentative",
    "persuasive",
    "expository",
    "narrative",
    "descriptive",
    "compare-contrast",
    "cause-effect",
    "research",
  ]

  const generateOutline = () => {
    if (!formData.title.trim() || !formData.thesis.trim()) return

    const keyPointsList = formData.keyPoints
      .split("\n")
      .filter((point) => point.trim())
      .map((point) => point.trim())

    const newOutline: EssayOutline = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      essayType: formData.essayType,
      thesis: formData.thesis.trim(),
      introduction: [
        {
          id: `intro-1-${Date.now()}`,
          text: "Hook: Attention-grabbing opening statement",
          level: 1,
          children: [],
        },
        {
          id: `intro-2-${Date.now()}`,
          text: "Background information and context",
          level: 1,
          children: [],
        },
        {
          id: `intro-3-${Date.now()}`,
          text: `Thesis statement: ${formData.thesis}`,
          level: 1,
          children: [],
        },
      ],
      body: keyPointsList.map((point, index) => ({
        id: `body-${index}-${Date.now()}`,
        text: `Body Paragraph ${index + 1}: ${point}`,
        level: 1,
        children: [
          {
            id: `body-${index}-topic-${Date.now()}`,
            text: "Topic sentence",
            level: 2,
            children: [],
          },
          {
            id: `body-${index}-evidence-${Date.now()}`,
            text: "Supporting evidence and examples",
            level: 2,
            children: [],
          },
          {
            id: `body-${index}-analysis-${Date.now()}`,
            text: "Analysis and explanation",
            level: 2,
            children: [],
          },
          {
            id: `body-${index}-transition-${Date.now()}`,
            text: "Transition to next paragraph",
            level: 2,
            children: [],
          },
        ],
      })),
      conclusion: [
        {
          id: `conclusion-1-${Date.now()}`,
          text: "Restate thesis in new words",
          level: 1,
          children: [],
        },
        {
          id: `conclusion-2-${Date.now()}`,
          text: "Summarize main points",
          level: 1,
          children: [],
        },
        {
          id: `conclusion-3-${Date.now()}`,
          text: "Closing thought or call to action",
          level: 1,
          children: [],
        },
      ],
      createdAt: new Date(),
    }

    setOutlines([newOutline, ...outlines])
    setCurrentOutline(newOutline)
    setFormData({
      title: "",
      essayType: "argumentative",
      thesis: "",
      topic: "",
      keyPoints: "",
    })
    setShowForm(false)
  }

  const updatePoint = (sectionType: "introduction" | "body" | "conclusion", pointId: string, newText: string) => {
    if (!currentOutline) return

    const updatePointsRecursively = (points: OutlinePoint[]): OutlinePoint[] => {
      return points.map((point) => {
        if (point.id === pointId) {
          return { ...point, text: newText }
        }
        if (point.children.length > 0) {
          return { ...point, children: updatePointsRecursively(point.children) }
        }
        return point
      })
    }

    const updatedOutline = {
      ...currentOutline,
      [sectionType]: updatePointsRecursively(currentOutline[sectionType]),
    }

    setCurrentOutline(updatedOutline)
    setOutlines(outlines.map((outline) => (outline.id === updatedOutline.id ? updatedOutline : outline)))
  }

  const addPoint = (sectionType: "introduction" | "body" | "conclusion", parentId?: string) => {
    if (!currentOutline) return

    const newPoint: OutlinePoint = {
      id: `${sectionType}-${Date.now()}`,
      text: "New point",
      level: parentId ? 2 : 1,
      children: [],
    }

    const addPointRecursively = (points: OutlinePoint[]): OutlinePoint[] => {
      if (!parentId) {
        return [...points, newPoint]
      }
      return points.map((point) => {
        if (point.id === parentId) {
          return { ...point, children: [...point.children, newPoint] }
        }
        if (point.children.length > 0) {
          return { ...point, children: addPointRecursively(point.children) }
        }
        return point
      })
    }

    const updatedOutline = {
      ...currentOutline,
      [sectionType]: addPointRecursively(currentOutline[sectionType]),
    }

    setCurrentOutline(updatedOutline)
    setOutlines(outlines.map((outline) => (outline.id === updatedOutline.id ? updatedOutline : outline)))
  }

  const deletePoint = (sectionType: "introduction" | "body" | "conclusion", pointId: string) => {
    if (!currentOutline) return

    const deletePointRecursively = (points: OutlinePoint[]): OutlinePoint[] => {
      return points
        .filter((point) => point.id !== pointId)
        .map((point) => ({
          ...point,
          children: deletePointRecursively(point.children),
        }))
    }

    const updatedOutline = {
      ...currentOutline,
      [sectionType]: deletePointRecursively(currentOutline[sectionType]),
    }

    setCurrentOutline(updatedOutline)
    setOutlines(outlines.map((outline) => (outline.id === updatedOutline.id ? updatedOutline : outline)))
  }

  const exportOutline = () => {
    if (!currentOutline) return

    const formatOutline = (points: OutlinePoint[], level = 1): string => {
      return points
        .map((point) => {
          const indent = "  ".repeat(level - 1)
          const bullet = level === 1 ? "I." : level === 2 ? "A." : "1."
          let result = `${indent}${bullet} ${point.text}\n`
          if (point.children.length > 0) {
            result += formatOutline(point.children, level + 1)
          }
          return result
        })
        .join("")
    }

    const outlineText = `
${currentOutline.title}
Essay Type: ${currentOutline.essayType}
Thesis: ${currentOutline.thesis}

I. Introduction
${formatOutline(currentOutline.introduction, 2)}

II. Body
${formatOutline(currentOutline.body, 2)}

III. Conclusion
${formatOutline(currentOutline.conclusion, 2)}
    `.trim()

    const dataBlob = new Blob([outlineText], { type: "text/plain" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${currentOutline.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_outline.txt`
    link.click()
  }

  const renderPoints = (points: OutlinePoint[], sectionType: "introduction" | "body" | "conclusion", level = 1) => {
    return points.map((point) => (
      <div key={point.id} className={`${level > 1 ? "ml-6" : ""} mb-3`}>
        <div className="flex items-start gap-2 group">
          <div className="flex-1">
            {editingPoint === point.id ? (
              <input
                type="text"
                value={point.text}
                onChange={(e) => updatePoint(sectionType, point.id, e.target.value)}
                onBlur={() => setEditingPoint(null)}
                onKeyPress={(e) => e.key === "Enter" && setEditingPoint(null)}
                className="w-full border-2 border-black p-2 font-mono text-sm bg-white dark:bg-gray-800"
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditingPoint(point.id)}
                className={`p-2 border-2 border-black cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  level === 1 ? "font-bold" : ""
                }`}
              >
                {point.text}
              </div>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => addPoint(sectionType, point.id)}
              className="bg-blue-600 text-white border border-black p-1 text-xs hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
            <button
              onClick={() => deletePoint(sectionType, point.id)}
              className="bg-red-600 text-white border border-black p-1 text-xs hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
        {point.children.length > 0 && renderPoints(point.children, sectionType, level + 1)}
      </div>
    ))
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
                name: "Essay Outline Generator",
                description: "Generate structured outlines for essays and research papers with organized sections",
                url: "https://usnewse.com/essay-outline-generator",
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
              <FileText className="h-8 w-8 text-fuchsia-500" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Essay Outline Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground">Generate structured outlines for essays and research papers</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form and Controls */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-fuchsia-500 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Plus className="h-5 w-5 inline mr-2" />
                  {showForm ? "Cancel" : "New Outline"}
                </button>
                {currentOutline && (
                  <>
                    <button
                      onClick={exportOutline}
                      className="bg-green-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentOutline(null)}
                      className="bg-red-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {showForm && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Create Essay Outline
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-lg font-bold">
                        Essay Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter essay title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    <div>
                      <Label htmlFor="essayType" className="text-lg font-bold">
                        Essay Type
                      </Label>
                      <select
                        id="essayType"
                        value={formData.essayType}
                        onChange={(e) => setFormData({ ...formData, essayType: e.target.value })}
                        className="w-full border-2 border-black h-12 text-lg font-mono shadow-brutal bg-white dark:bg-gray-800"
                      >
                        {essayTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="thesis" className="text-lg font-bold">
                        Thesis Statement
                      </Label>
                      <Textarea
                        id="thesis"
                        placeholder="Enter your main argument or thesis statement..."
                        value={formData.thesis}
                        onChange={(e) => setFormData({ ...formData, thesis: e.target.value })}
                        className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="keyPoints" className="text-lg font-bold">
                        Key Points (one per line)
                      </Label>
                      <Textarea
                        id="keyPoints"
                        placeholder="Enter main points for body paragraphs...
Example:
Social media affects mental health
Privacy concerns with data collection
Impact on real-world relationships"
                        value={formData.keyPoints}
                        onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                        className="border-2 border-black h-32 text-lg font-mono shadow-brutal resize-none"
                      />
                    </div>

                    <button
                      onClick={generateOutline}
                      disabled={!formData.title.trim() || !formData.thesis.trim()}
                      className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate Outline
                    </button>
                  </div>
                </div>
              )}

              {/* Previous Outlines */}
              {outlines.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Previous Outlines
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {outlines.map((outline) => (
                      <div
                        key={outline.id}
                        onClick={() => setCurrentOutline(outline)}
                        className={`p-3 border-2 border-black cursor-pointer transition-colors ${
                          currentOutline?.id === outline.id
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        <div className="font-bold text-sm">{outline.title}</div>
                        <div className="text-xs opacity-75">
                          {outline.essayType} • {outline.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Use */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Enter essay title and select type
                  </li>
                  <li>
                    <strong>2.</strong> Write your thesis statement
                  </li>
                  <li>
                    <strong>3.</strong> List key points for body paragraphs
                  </li>
                  <li>
                    <strong>4.</strong> Generate and customize outline
                  </li>
                  <li>
                    <strong>5.</strong> Export finished outline
                  </li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Writing Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Start with a strong, clear thesis statement</li>
                  <li>• Each body paragraph should support your thesis</li>
                  <li>• Use transitions between paragraphs</li>
                  <li>• Include evidence and examples</li>
                  <li>• End with a memorable conclusion</li>
                </ul>
              </div>
            </div>

            {/* Outline Display */}
            <div className="space-y-6">
              {currentOutline ? (
                <>
                  {/* Outline Header */}
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <h2 className="text-2xl font-black mb-4">{currentOutline.title}</h2>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Type:</strong>{" "}
                        {currentOutline.essayType.charAt(0).toUpperCase() +
                          currentOutline.essayType.slice(1).replace("-", " ")}
                      </div>
                      <div>
                        <strong>Thesis:</strong> {currentOutline.thesis}
                      </div>
                    </div>
                  </div>

                  {/* Introduction */}
                  <div className="bg-blue-100 dark:bg-blue-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase">I. Introduction</h3>
                      <button
                        onClick={() => addPoint("introduction")}
                        className="bg-blue-600 text-white border-2 border-black px-3 py-1 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Plus className="h-4 w-4 inline mr-1" />
                        Add Point
                      </button>
                    </div>
                    {renderPoints(currentOutline.introduction, "introduction")}
                  </div>

                  {/* Body */}
                  <div className="bg-green-100 dark:bg-green-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase">II. Body</h3>
                      <button
                        onClick={() => addPoint("body")}
                        className="bg-green-600 text-white border-2 border-black px-3 py-1 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Plus className="h-4 w-4 inline mr-1" />
                        Add Point
                      </button>
                    </div>
                    {renderPoints(currentOutline.body, "body")}
                  </div>

                  {/* Conclusion */}
                  <div className="bg-yellow-100 dark:bg-yellow-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase">III. Conclusion</h3>
                      <button
                        onClick={() => addPoint("conclusion")}
                        className="bg-yellow-600 text-white border-2 border-black px-3 py-1 font-bold text-sm shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <Plus className="h-4 w-4 inline mr-1" />
                        Add Point
                      </button>
                    </div>
                    {renderPoints(currentOutline.conclusion, "conclusion")}
                  </div>
                </>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No outline created yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Create your first essay outline to get started with structured writing!
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Essay Outline Generator helps you create structured, organized outlines for any type of essay or
                  research paper. Generate comprehensive outlines with introduction, body, and conclusion sections,
                  customize points, and export your work. Perfect for academic writing, assignments, and improving essay
                  structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
