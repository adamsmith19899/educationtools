"use client"

import { useState } from "react"
import { Clock, Plus, Calendar, Trash2, Edit3, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"

interface StudySession {
  id: string
  subject: string
  topic: string
  duration: number
  date: string
  time: string
  priority: "low" | "medium" | "high"
  completed: boolean
  notes?: string
}

export default function StudySchedulePlanner() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    duration: 60,
    date: "",
    time: "",
    priority: "medium" as "low" | "medium" | "high",
    notes: "",
  })

  const addOrUpdateSession = () => {
    if (formData.subject.trim() && formData.topic.trim() && formData.date && formData.time) {
      if (editingId) {
        setSessions(
          sessions.map((session) =>
            session.id === editingId ? { ...session, ...formData, completed: false } : session,
          ),
        )
        setEditingId(null)
      } else {
        const newSession: StudySession = {
          id: Date.now().toString(),
          ...formData,
          completed: false,
        }
        setSessions([...sessions, newSession])
      }

      setFormData({
        subject: "",
        topic: "",
        duration: 60,
        date: "",
        time: "",
        priority: "medium",
        notes: "",
      })
      setShowForm(false)
    }
  }

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id))
  }

  const toggleComplete = (id: string) => {
    setSessions(
      sessions.map((session) => (session.id === id ? { ...session, completed: !session.completed } : session)),
    )
  }

  const editSession = (session: StudySession) => {
    setFormData({
      subject: session.subject,
      topic: session.topic,
      duration: session.duration,
      date: session.date,
      time: session.time,
      priority: session.priority,
      notes: session.notes || "",
    })
    setEditingId(session.id)
    setShowForm(true)
  }

  const getTodaysSessions = () => {
    const today = new Date().toISOString().split("T")[0]
    return sessions.filter((session) => session.date === today)
  }

  const getUpcomingSessions = () => {
    const today = new Date().toISOString().split("T")[0]
    return sessions
      .filter((session) => session.date > today)
      .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
  }

  const getTotalStudyTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0)
  }

  const getCompletedSessions = () => {
    return sessions.filter((session) => session.completed).length
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Sidebar />

      <div className="lg:pr-80 lg:pl-0">
        <div className="container py-8 px-6">
          {/* Header with Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Study Schedule Planner",
                description: "Plan and organize your study sessions with intelligent scheduling and time management",
                url: "https://usnewse.com/study-schedule-planner",
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
              <Clock className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Study Schedule Planner</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Plan and organize your study sessions with intelligent scheduling
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <div className="bg-blue-600 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{sessions.length}</div>
              <div className="text-sm font-bold">Total Sessions</div>
            </div>
            <div className="bg-green-500 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{getCompletedSessions()}</div>
              <div className="text-sm font-bold">Completed</div>
            </div>
            <div className="bg-yellow-500 text-black border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{getTodaysSessions().length}</div>
              <div className="text-sm font-bold">Today's Sessions</div>
            </div>
            <div className="bg-red-600 text-white border-4 border-black p-4 shadow-brutal">
              <div className="text-2xl font-black">{Math.round(getTotalStudyTime() / 60)}h</div>
              <div className="text-sm font-bold">Total Hours</div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Create/Edit Session Form */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingId(null)
                    setFormData({
                      subject: "",
                      topic: "",
                      duration: 60,
                      date: "",
                      time: "",
                      priority: "medium",
                      notes: "",
                    })
                  }}
                  className="bg-yellow-500 text-black border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Plus className="h-5 w-5 inline mr-2" />
                  {showForm ? "Cancel" : "Add Session"}
                </button>
              </div>

              {showForm && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    {editingId ? "Edit Session" : "Create New Session"}
                  </h2>

                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="subject" className="text-lg font-bold">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="e.g., Mathematics"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="topic" className="text-lg font-bold">
                          Topic
                        </Label>
                        <Input
                          id="topic"
                          placeholder="e.g., Calculus Integration"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="date" className="text-lg font-bold">
                          Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-lg font-bold">
                          Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-lg font-bold">
                          Duration (min)
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          min="15"
                          max="480"
                          step="15"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                          className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-bold">Priority</Label>
                      <div className="flex gap-2 mt-2">
                        {(["low", "medium", "high"] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setFormData({ ...formData, priority: level })}
                            className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase transition-all ${
                              formData.priority === level
                                ? level === "low"
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
                      <Label htmlFor="notes" className="text-lg font-bold">
                        Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes or goals for this session..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="border-2 border-black h-20 text-lg font-mono shadow-brutal resize-none"
                      />
                    </div>

                    <button
                      onClick={addOrUpdateSession}
                      disabled={!formData.subject.trim() || !formData.topic.trim() || !formData.date || !formData.time}
                      className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editingId ? "Update Session" : "Create Session"}
                    </button>
                  </div>
                </div>
              )}

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Click "Add Session" to create new study sessions
                  </li>
                  <li>
                    <strong>2.</strong> Fill in subject, topic, date, and time
                  </li>
                  <li>
                    <strong>3.</strong> Set duration and priority level
                  </li>
                  <li>
                    <strong>4.</strong> Add optional notes for context
                  </li>
                  <li>
                    <strong>5.</strong> Mark sessions complete when finished
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Planning Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Schedule high-priority subjects during peak focus hours</li>
                  <li>• Break long topics into 45-90 minute sessions</li>
                  <li>• Include 10-15 minute breaks between sessions</li>
                  <li>• Review and adjust your schedule weekly</li>
                  <li>• Balance different subjects throughout the week</li>
                </ul>
              </div>
            </div>

            {/* Sessions List */}
            <div className="space-y-6">
              {/* Today's Sessions */}
              {getTodaysSessions().length > 0 && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Today's Sessions
                  </h3>
                  <div className="space-y-3">
                    {getTodaysSessions().map((session) => (
                      <div
                        key={session.id}
                        className={`border-2 border-black p-4 ${
                          session.completed ? "bg-green-100 dark:bg-green-900" : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs font-bold border border-black ${
                                session.priority === "low"
                                  ? "bg-green-500 text-white"
                                  : session.priority === "medium"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-red-600 text-white"
                              }`}
                            >
                              {session.priority.toUpperCase()}
                            </span>
                            <span className="text-sm font-bold">{session.time}</span>
                            <span className="text-sm">({session.duration}min)</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleComplete(session.id)}
                              className={`p-1 border border-black ${
                                session.completed ? "bg-green-500 text-white" : "bg-white text-black"
                              }`}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => editSession(session)}
                              className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold text-lg">{session.subject}</div>
                        <div className="text-sm mb-2">{session.topic}</div>
                        {session.notes && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">{session.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Sessions */}
              {getUpcomingSessions().length > 0 && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {getUpcomingSessions()
                      .slice(0, 10)
                      .map((session) => (
                        <div key={session.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 text-xs font-bold border border-black ${
                                  session.priority === "low"
                                    ? "bg-green-500 text-white"
                                    : session.priority === "medium"
                                      ? "bg-yellow-500 text-black"
                                      : "bg-red-600 text-white"
                                }`}
                              >
                                {session.priority.toUpperCase()}
                              </span>
                              <span className="text-sm font-bold">{session.date}</span>
                              <span className="text-sm">{session.time}</span>
                              <span className="text-sm">({session.duration}min)</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editSession(session)}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteSession(session.id)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="font-bold text-lg">{session.subject}</div>
                          <div className="text-sm mb-2">{session.topic}</div>
                          {session.notes && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">{session.notes}</div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {sessions.length === 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No study sessions scheduled</h3>
                  <p className="text-gray-600 dark:text-gray-400">Create your first study session to get started!</p>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Study Schedule Planner helps you organize and manage your study sessions effectively. Set
                  priorities, track completion, and maintain a consistent study routine. Perfect for exam preparation,
                  course planning, and time management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
