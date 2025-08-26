"use client"

import { useState } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Clock, TrendingUp, Calendar, Target } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface StudySession {
  id: string
  date: string
  duration: number // in minutes
  subject: string
  focusLevel: 1 | 2 | 3 | 4 | 5
  energyLevel: 1 | 2 | 3 | 4 | 5
  notes: string
}

export default function StudyHabitAnalyzer() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  
  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState("")
  const [subject, setSubject] = useState("")
  const [focusLevel, setFocusLevel] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [energyLevel, setEnergyLevel] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [notes, setNotes] = useState("")

  const addSession = () => {
    if (duration && subject) {
      const newSession: StudySession = {
        id: Date.now().toString(),
        date,
        duration: parseInt(duration),
        subject: subject.trim(),
        focusLevel,
        energyLevel,
        notes: notes.trim()
      }
      setSessions([...sessions, newSession])
      resetForm()
      setIsAdding(false)
    }
  }

  const resetForm = () => {
    setDuration("")
    setSubject("")
    setFocusLevel(3)
    setEnergyLevel(3)
    setNotes("")
  }

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id))
  }

  const editSession = (session: StudySession) => {
    setCurrentSession(session)
    setDate(session.date)
    setDuration(session.duration.toString())
    setSubject(session.subject)
    setFocusLevel(session.focusLevel)
    setEnergyLevel(session.energyLevel)
    setNotes(session.notes)
    setIsAdding(true)
  }

  const updateSession = () => {
    if (currentSession && duration && subject) {
      setSessions(sessions.map(session => 
        session.id === currentSession.id 
          ? {
              ...session,
              date,
              duration: parseInt(duration),
              subject: subject.trim(),
              focusLevel,
              energyLevel,
              notes: notes.trim()
            }
          : session
      ))
      resetForm()
      setCurrentSession(null)
      setIsAdding(false)
    }
  }

  const cancelEdit = () => {
    resetForm()
    setCurrentSession(null)
    setIsAdding(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(sessions, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "study-sessions.json"
    link.click()
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSessions = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedSessions)) {
          setSessions(importedSessions)
        }
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  // Analytics calculations
  const totalHours = sessions.reduce((sum, session) => sum + session.duration, 0) / 60
  const avgFocus = sessions.length > 0 ? 
    sessions.reduce((sum, session) => sum + session.focusLevel, 0) / sessions.length : 0
  const avgEnergy = sessions.length > 0 ? 
    sessions.reduce((sum, session) => sum + session.energyLevel, 0) / sessions.length : 0
  
  const bestSubject = sessions.length > 0 ? 
    Object.entries(
      sessions.reduce((acc, session) => {
        acc[session.subject] = (acc[session.subject] || 0) + session.duration
        return acc
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0][0] : ""

  const mostProductiveTime = "Based on your focus level data"

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
                name: "Study Habit Analyzer",
                description: "Track and analyze your study habits to improve productivity and learning effectiveness",
                url: "https://usnewse.com/study-habit-analyzer",
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
              <Target className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Study Habit Analyzer</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Track and analyze your study habits to improve productivity and learning effectiveness
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  {isAdding ? (currentSession ? "Edit Session" : "Add New Session") : "Log Study Session"}
                </h2>

                {!isAdding ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject" className="text-lg font-bold">
                        Subject
                      </Label>
                      <input
                        type="text"
                        id="subject"
                        placeholder="e.g., Mathematics, History, Programming"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-lg font-bold">
                          Date
                        </Label>
                        <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-lg font-bold">
                          Duration (min)
                        </Label>
                        <input
                          type="number"
                          id="duration"
                          placeholder="60"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Focus Level</Label>
                      <div className="flex gap-2 mt-2">
                        {[1,2,3,4,5].map((level) => (
                          <button
                            key={level}
                            onClick={() => setFocusLevel(level as 1|2|3|4|5)}
                            className={`px-3 py-2 border-2 border-black font-bold text-sm transition-all ${
                              focusLevel === level
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Energy Level</Label>
                      <div className="flex gap-2 mt-2">
                        {[1,2,3,4,5].map((level) => (
                          <button
                            key={level}
                            onClick={() => setEnergyLevel(level as 1|2|3|4|5)}
                            className={`px-3 py-2 border-2 border-black font-bold text-sm transition-all ${
                              energyLevel === level
                                ? "bg-green-500 text-white"
                                : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-lg font-bold">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any observations about your study session..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="border-2 border-black text-lg font-mono shadow-brutal resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={addSession}
                        disabled={!duration || !subject}
                        className="flex-1 bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 inline mr-2" />
                        Add Session
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject" className="text-lg font-bold">
                        Subject
                      </Label>
                      <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-lg font-bold">
                          Date
                        </Label>
                        <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-lg font-bold">
                          Duration (min)
                        </Label>
                        <input
                          type="number"
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Focus Level</Label>
                      <div className="flex gap-2 mt-2">
                        {[1,2,3,4,5].map((level) => (
                          <button
                            key={level}
                            onClick={() => setFocusLevel(level as 1|2|3|4|5)}
                            className={`px-3 py-2 border-2 border-black font-bold text-sm transition-all ${
                              focusLevel === level
                                ? "bg-blue-600 text-white"
                                : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Energy Level</Label>
                      <div className="flex gap-2 mt-2">
                        {[1,2,3,4,5].map((level) => (
                          <button
                            key={level}
                            onClick={() => setEnergyLevel(level as 1|2|3|4|5)}
                            className={`px-3 py-2 border-2 border-black font-bold text-sm transition-all ${
                              energyLevel === level
                                ? "bg-green-500 text-white"
                                : "bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-lg font-bold">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="border-2 border-black text-lg font-mono shadow-brutal resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={currentSession ? updateSession : addSession}
                        disabled={!duration || !subject}
                        className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentSession ? "Update" : "Add"} Session
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li><strong>1.</strong> Log each study session with details</li>
                  <li><strong>2.</strong> Rate your focus and energy levels</li>
                  <li><strong>3.</strong> Add notes about your experience</li>
                  <li><strong>4.</strong> View your analytics and patterns</li>
                  <li><strong>5.</strong> Adjust your study habits accordingly</li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Study Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Study during your peak energy times</li>
                  <li>• Take regular breaks (Pomodoro technique)</li>
                  <li>• Mix subjects to maintain interest</li>
                  <li>• Review your analytics weekly</li>
                  <li>• Optimize your study environment</li>
                </ul>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="space-y-6">
              {sessions.length > 0 ? (
                <>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setShowAnalysis(!showAnalysis)}
                      className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                        showAnalysis ? "bg-red-600 text-white" : "bg-green-500 text-white"
                      }`}
                    >
                      {showAnalysis ? "Hide Analysis" : "Show Analysis"}
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

                    <button
                      onClick={exportData}
                      className="bg-orange-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>

                  {showAnalysis ? (
                    <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal space-y-6">
                      <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                        Study Analytics
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900 border-2 border-black p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5" />
                            <span className="font-bold text-lg">Total Time</span>
                          </div>
                          <div className="text-2xl font-black">{totalHours.toFixed(1)} hrs</div>
                        </div>

                        <div className="bg-green-100 dark:bg-green-900 border-2 border-black p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5" />
                            <span className="font-bold text-lg">Avg Focus</span>
                          </div>
                          <div className="text-2xl font-black">{avgFocus.toFixed(1)}/5</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-black p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-5 w-5" />
                            <span className="font-bold text-lg">Avg Energy</span>
                          </div>
                          <div className="text-2xl font-black">{avgEnergy.toFixed(1)}/5</div>
                        </div>

                        <div className="bg-purple-100 dark:bg-purple-900 border-2 border-black p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-bold text-lg">Sessions</span>
                          </div>
                          <div className="text-2xl font-black">{sessions.length}</div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                        <h4 className="font-black text-lg mb-2">Key Insights</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Your most studied subject: <strong>{bestSubject || "N/A"}</strong></li>
                          <li>• Average session duration: <strong>{sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length) : 0} min</strong></li>
                          <li>• Best focus time: <strong>{mostProductiveTime}</strong></li>
                          <li>• Consistency rating: <strong>{sessions.length >= 7 ? "Excellent" : sessions.length >= 5 ? "Good" : sessions.length >= 3 ? "Fair" : "Needs improvement"}</strong></li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                      <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                        Your Study Sessions ({sessions.length})
                      </h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {[...sessions].reverse().map((session) => (
                          <div key={session.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-2">
                                <span className="px-2 py-1 text-xs font-bold border border-black bg-blue-600 text-white">
                                  {session.subject}
                                </span>
                                <span className="px-2 py-1 text-xs font-bold border border-black bg-gray-600 text-white">
                                  {session.duration}m
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => editSession(session)}
                                  className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteSession(session.id)}
                                  className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-sm grid grid-cols-2 gap-4">
                              <div>
                                <div className="font-bold">Date:</div>
                                <div>{session.date}</div>
                              </div>
                              <div>
                                <div className="font-bold">Focus:</div>
                                <div>{"★".repeat(session.focusLevel) + "☆".repeat(5-session.focusLevel)}</div>
                              </div>
                              <div>
                                <div className="font-bold">Energy:</div>
                                <div>{"★".repeat(session.energyLevel) + "☆".repeat(5-session.energyLevel)}</div>
                              </div>
                              <div>
                                <div className="font-bold">Notes:</div>
                                <div className="italic">{session.notes || "None"}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No study sessions yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Log your first study session to start tracking your habits!</p>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Study Habit Analyzer helps you track and improve your study patterns by collecting data on your sessions. 
                  By monitoring duration, focus, energy levels, and subjects, you can identify optimal study times and areas for improvement. 
                  Use the analytics to develop more effective learning routines and achieve better academic results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
