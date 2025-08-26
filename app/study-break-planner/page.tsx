"use client"

import { useState, useEffect } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Coffee, Clock, Calendar, Music, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface BreakActivity {
  id: string
  title: string
  duration: number // in minutes
  category: "physical" | "mental" | "creative" | "social" | "relaxation"
  description: string
  difficulty: "easy" | "medium" | "hard"
}

interface StudySession {
  id: string
  date: string
  startTime: string
  endTime: string
  subject: string
  focusLevel: 1 | 2 | 3 | 4 | 5
  plannedBreaks: string[]
  completedBreaks: string[]
}

export default function StudyBreakPlanner() {
  const [activities, setActivities] = useState<BreakActivity[]>([
    { id: "1", title: "Stretching", duration: 5, category: "physical", description: "Simple stretching exercises to relieve muscle tension", difficulty: "easy" },
    { id: "2", title: "Mindful Breathing", duration: 3, category: "mental", description: "Focus on your breath to reset your mind", difficulty: "easy" },
    { id: "3", title: "Quick Walk", duration: 10, category: "physical", description: "Take a short walk around your space", difficulty: "easy" },
    { id: "4", title: "Doodle", duration: 7, category: "creative", description: "Freeform drawing to engage your creative side", difficulty: "easy" },
    { id: "5", title: "Listen to Music", duration: 5, category: "relaxation", description: "Listen to calming music", difficulty: "easy" }
  ])
  
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null)
  const [activeTab, setActiveTab] = useState<"planner" | "activities">("planner")
  
  // Form states
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState<number>(5)
  const [category, setCategory] = useState<"physical" | "mental" | "creative" | "social" | "relaxation">("relaxation")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [isAdding, setIsAdding] = useState(false)
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null)
  
  // Session planning states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("12:00")
  const [subject, setSubject] = useState("")
  const [focusLevel, setFocusLevel] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [plannedBreaks, setPlannedBreaks] = useState<string[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  // Add a new break activity
  const addActivity = () => {
    if (title && description) {
      const newActivity: BreakActivity = {
        id: Date.now().toString(),
        title: title.trim(),
        duration,
        category,
        description: description.trim(),
        difficulty
      }
      
      if (editingActivityId) {
        // Update existing activity
        setActivities(activities.map(activity => 
          activity.id === editingActivityId ? newActivity : activity
        ))
        setEditingActivityId(null)
      } else {
        // Add new activity
        setActivities([...activities, newActivity])
      }
      
      resetForm()
    }
  }

  // Edit an existing activity
  const editActivity = (activity: BreakActivity) => {
    setTitle(activity.title)
    setDuration(activity.duration)
    setCategory(activity.category)
    setDescription(activity.description)
    setDifficulty(activity.difficulty)
    setEditingActivityId(activity.id)
    setIsAdding(true)
    setActiveTab("activities")
  }

  // Delete an activity
  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id))
    // Also remove from any sessions
    setSessions(sessions.map(session => ({
      ...session,
      plannedBreaks: session.plannedBreaks.filter(breakId => breakId !== id),
      completedBreaks: session.completedBreaks.filter(breakId => breakId !== id)
    })))
  }

  // Reset form
  const resetForm = () => {
    setTitle("")
    setDuration(5)
    setCategory("relaxation")
    setDescription("")
    setDifficulty("easy")
    setEditingActivityId(null)
    setIsAdding(false)
  }

  // Plan a new study session
  const planSession = () => {
    if (subject && startTime && endTime && date) {
      // Calculate break times based on session length
      const start = new Date(`2023-01-01 ${startTime}`)
      const end = new Date(`2023-01-01 ${endTime}`)
      const sessionDuration = (end.getTime() - start.getTime()) / (1000 * 60) // in minutes
      
      // Suggest breaks every 45-50 minutes
      const suggestedBreaks: string[] = []
      let currentTime = new Date(`2023-01-01 ${startTime}`)
      
      while (true) {
        currentTime = new Date(currentTime.getTime() + 45 * 60000) // Add 45 minutes
        if (currentTime.getTime() < end.getTime()) {
          // Find a random activity that fits
          const eligibleActivities = activities.filter(a => a.duration <= 10)
          if (eligibleActivities.length > 0) {
            const randomActivity = eligibleActivities[Math.floor(Math.random() * eligibleActivities.length)]
            suggestedBreaks.push(randomActivity.id)
          }
        } else {
          break
        }
      }
      
      const newSession: StudySession = {
        id: Date.now().toString(),
        date,
        startTime,
        endTime,
        subject: subject.trim(),
        focusLevel,
        plannedBreaks: suggestedBreaks,
        completedBreaks: []
      }
      
      setSessions([...sessions, newSession])
      resetSessionForm()
      setShowSchedule(true)
    }
  }

  // Reset session form
  const resetSessionForm = () => {
    setSubject("")
    setStartTime("09:00")
    setEndTime("12:00")
    setDate(new Date().toISOString().split('T')[0])
    setFocusLevel(3)
    setPlannedBreaks([])
  }

  // Delete a session
  const deleteSession = (id: string) => {
    setSessions(sessions.filter(session => session.id !== id))
    if (currentSession && currentSession.id === id) {
      setCurrentSession(null)
    }
  }

  // Complete a break
  const completeBreak = (sessionId: string, breakId: string) => {
    setSessions(sessions.map(session => {
      if (session.id === sessionId) {
        if (!session.completedBreaks.includes(breakId)) {
          return {
            ...session,
            completedBreaks: [...session.completedBreaks, breakId]
          }
        }
      }
      return session
    }))
  }

  // Export data
  const exportData = () => {
    const data = { activities, sessions }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "study-break-planner.json"
    link.click()
  }

  // Import data
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string)
        if (importedData.activities) setActivities(importedData.activities)
        if (importedData.sessions) setSessions(importedData.sessions)
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  // Get session duration in hours
  const getSessionDuration = (session: StudySession) => {
    const start = new Date(`2023-01-01 ${session.startTime}`)
    const end = new Date(`2023-01-01 ${session.endTime}`)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return duration.toFixed(1)
  }

  // Calculate total break time for a session
  const getTotalBreakTime = (session: StudySession) => {
    return session.plannedBreaks.reduce((total, breakId) => {
      const activity = activities.find(a => a.id === breakId)
      return total + (activity?.duration || 0)
    }, 0)
  }

  // Calculate break completion percentage
  const getBreakCompletion = (session: StudySession) => {
    if (session.plannedBreaks.length === 0) return 0
    return Math.round((session.completedBreaks.length / session.plannedBreaks.length) * 100)
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
                name: "Study Break Planner",
                description: "Optimize your study sessions with scientifically-backed break planning and activities",
                url: "https://usnewse.com/study-break-planner",
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
              <Coffee className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Study Break Planner</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Optimize your study sessions with scientifically-backed break planning and activities
            </p>
          </div>

          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setActiveTab("planner")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                activeTab === "planner" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Planning Mode
            </button>
            <button
              onClick={() => setActiveTab("activities")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                activeTab === "activities" 
                  ? "bg-green-500 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Activities Mode
            </button>
          </div>

          {activeTab === "activities" ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Activities Management */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    {isAdding ? (editingActivityId ? "Edit Activity" : "Add Activity") : "Manage Activities"}
                  </h2>

                  {!isAdding ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title" className="text-lg font-bold">
                            Activity Title
                          </Label>
                          <input
                            type="text"
                            id="title"
                            placeholder="e.g., Stretching, Mindful Breathing"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-lg font-bold">
                          Category
                        </Label>
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        >
                          <option value="physical">Physical</option>
                          <option value="mental">Mental</option>
                          <option value="creative">Creative</option>
                          <option value="social">Social</option>
                          <option value="relaxation">Relaxation</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="difficulty" className="text-lg font-bold">
                          Difficulty
                        </Label>
                        <div className="flex gap-2 mt-2">
                          {(["easy", "medium", "hard"] as const).map((level) => (
                            <button
                              key={level}
                              onClick={() => setDifficulty(level)}
                              className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase transition-all ${
                                difficulty === level
                                  ? level === "easy"
                                    ? "bg-green-500 text-white"
                                    : level === "medium"
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

                      <div>
                        <Label htmlFor="description" className="text-lg font-bold">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the activity and how to perform it..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={addActivity}
                          disabled={!title || !description}
                          className="flex-1 bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {editingActivityId ? "Update" : "Add"} Activity
                        </button>
                        {editingActivityId && (
                          <button
                            onClick={resetForm}
                            className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                        <h3 className="text-lg font-bold mb-3">Recommended Activities</h3>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Physical:</strong> Stretching, walking, light exercise</li>
                          <li>• <strong>Mental:</strong> Mindful breathing, meditation, visualization</li>
                          <li>• <strong>Creative:</strong> Doodling, free writing, quick sketching</li>
                          <li>• <strong>Social:</strong> Quick chat with a friend, sending a message</li>
                          <li>• <strong>Relaxation:</strong> Listening to music, closing eyes, deep breathing</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* How to Use */}
                <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                  <ol className="space-y-2 text-lg">
                    <li><strong>1.</strong> Create a library of break activities</li>
                    <li><strong>2.</strong> Categorize activities by type and duration</li>
                    <li><strong>3.</strong> Plan study sessions with scheduled breaks</li>
                    <li><strong>4.</strong> Track your break completion</li>
                    <li><strong>5.</strong> Optimize your study routine based on data</li>
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Break Tips</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• Take a break every 45-50 minutes of study</li>
                    <li>• Move your body during breaks to improve circulation</li>
                    <li>• Avoid screens during breaks when possible</li>
                    <li>• Use breaks to hydrate and snack healthily</li>
                    <li>• Try different break types to find what works best</li>
                  </ul>
                </div>
              </div>

              {/* Activities List */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Break Activities ({activities.length})
                  </h3>
                  
                  {activities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Coffee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No activities added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {activities.map((activity) => (
                        <div key={activity.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-lg">{activity.title}</h4>
                              <div className="flex gap-2 mt-1">
                                <span className={`px-2 py-1 text-xs font-bold border ${
                                  activity.category === "physical" ? "border-red-600 bg-red-600 text-white" :
                                  activity.category === "mental" ? "border-blue-600 bg-blue-600 text-white" :
                                  activity.category === "creative" ? "border-green-600 bg-green-600 text-white" :
                                  activity.category === "social" ? "border-purple-600 bg-purple-600 text-white" :
                                  "border-yellow-500 bg-yellow-500 text-black"
                                }`}>
                                  {activity.category}
                                </span>
                                <span className={`px-2 py-1 text-xs font-bold border ${
                                  activity.difficulty === "easy" ? "border-green-600 bg-green-600 text-white" :
                                  activity.difficulty === "medium" ? "border-yellow-500 bg-yellow-500 text-black" :
                                  "border-red-600 bg-red-600 text-white"
                                }`}>
                                  {activity.difficulty}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editActivity(activity)}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteActivity(activity.id)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <div className="flex justify-between mb-2">
                              <span>Duration: <strong>{activity.duration} min</strong></span>
                            </div>
                            <p>{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Planning Mode */
            <div className="grid gap-8 lg:grid-cols-1">
              {!showSchedule ? (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Plan Your Study Session
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject" className="text-lg font-bold">
                          Subject
                        </Label>
                        <input
                          type="text"
                          id="subject"
                          placeholder="What will you study?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime" className="text-lg font-bold">
                          Start Time
                        </Label>
                        <input
                          type="time"
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime" className="text-lg font-bold">
                          End Time
                        </Label>
                        <input
                          type="time"
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Expected Focus Level</Label>
                      <div className="flex gap-2 mt-2">
                        {[1,2,3,4,5].map((level) => (
                          <button
                            key={level}
                            onClick={() => setFocusLevel(level as 1|2|3|4|5)}
                            className={`px-4 py-2 border-2 border-black font-bold text-sm transition-all ${
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

                    <button
                      onClick={planSession}
                      disabled={!subject || !startTime || !endTime}
                      className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calendar className="h-5 w-5 inline mr-2" />
                      Generate Study Plan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                        Today's Study Plan
                      </h3>
                      
                      <button
                        onClick={() => setShowSchedule(false)}
                        className="bg-gray-600 text-white border-4 border-black px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        <RotateCcw className="h-4 w-4 inline mr-1" />
                        Edit
                      </button>
                    </div>

                    <div className="grid gap-6">
                      {sessions.slice(-3).map((session, index) => (
                        <div key={session.id} className="border-2 border-black p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold">{session.subject}</h4>
                              <div className="text-sm mt-1">
                                {session.date} • {session.startTime} - {session.endTime} • {getSessionDuration(session)} hours
                              </div>
                            </div>
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="bg-red-600 text-white border border-black p-2 hover:bg-red-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-bold">Focus Level:</span>
                              <div className="flex gap-1">
                                {[1,2,3,4,5].map((star) => (
                                  <span key={star} className={star <= session.focusLevel ? "text-yellow-500" : "text-gray-400"}>
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="font-bold">Break Completion:</span>
                              <span className={`font-bold ${getBreakCompletion(session) >= 80 ? "text-green-600" : getBreakCompletion(session) >= 50 ? "text-yellow-600" : "text-red-600"}`}>
                                {getBreakCompletion(session)}%
                              </span>
                            </div>
                          </div>

                          <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                            <h5 className="font-bold mb-3">Scheduled Breaks ({session.plannedBreaks.length})</h5>
                            
                            {session.plannedBreaks.length === 0 ? (
                              <p className="text-center py-2">No breaks scheduled</p>
                            ) : (
                              <div className="space-y-2">
                                {session.plannedBreaks.map((breakId, idx) => {
                                  const activity = activities.find(a => a.id === breakId)
                                  if (!activity) return null
                                  
                                  const isCompleted = session.completedBreaks.includes(breakId)
                                  
                                  return (
                                    <div key={breakId} className="flex justify-between items-center p-2 border border-black bg-white dark:bg-gray-700">
                                      <div className="flex gap-2">
                                        <span className={`font-bold ${
                                          isCompleted ? "text-green-600" : "text-black dark:text-white"
                                        }`}>
                                          {isCompleted ? "✓" : "○"}
                                        </span>
                                        <div>
                                          <div>{activity.title} ({activity.duration} min)</div>
                                          <div className="text-xs text-gray-600 dark:text-gray-400">{activity.category}</div>
                                        </div>
                                      </div>
                                      {!isCompleted && (
                                        <button
                                          onClick={() => completeBreak(session.id, breakId)}
                                          className="bg-green-600 text-white border border-black px-2 py-1 text-sm hover:bg-green-700 transition-colors"
                                        >
                                          Complete
                                        </button>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Statistics */}
                  {sessions.length > 0 && (
                    <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                      <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Weekly Statistics</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white bg-opacity-20 border-2 border-white">
                          <div className="text-3xl font-black">{sessions.length}</div>
                          <div className="font-bold">Sessions</div>
                        </div>
                        <div className="text-center p-4 bg-white bg-opacity-20 border-2 border-white">
                          <div className="text-3xl font-black">
                            {Math.round(sessions.reduce((sum, s) => sum + parseFloat(getSessionDuration(s)), 0))}
                          </div>
                          <div className="font-bold">Total Hours</div>
                        </div>
                        <div className="text-center p-4 bg-white bg-opacity-20 border-2 border-white">
                          <div className="text-3xl font-black">
                            {sessions.length > 0 ? 
                              Math.round(sessions.reduce((sum, s) => sum + getBreakCompletion(s), 0) / sessions.length) : 
                              0}%
                          </div>
                          <div className="font-bold">Avg Break Completion</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {sessions.length > 0 && (
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
                  The Study Break Planner helps you optimize your study sessions by strategically planning 
                  effective breaks. Research shows that regular breaks improve focus, retention, and overall 
                  productivity. Use this tool to create personalized break activities, schedule them 
                  throughout your study sessions, and track your adherence to improve your study habits.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
