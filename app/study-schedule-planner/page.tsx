'use client' // ←←← THIS LINE WAS MISSING

import { ToolLayout } from "@/components/tool-layout"
import { useState } from "react"
import { Clock, Plus, Calendar, Trash2, Edit3, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Study Schedule Planner - Organize Your Study Time | Informi Education Online",
  description:
    "Plan and organize your study sessions with intelligent scheduling and time management. Track progress, set priorities, and boost productivity.",
  keywords:
    "study schedule planner, study planner, time management, academic planning, exam preparation, study organizer, student tools",
}

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
    <ToolLayout toolName="Study Schedule Planner">
      <div className="space-y-8">
        {/* Tool Interface */}
        <div className="bg-white border-4 border-black p-6">
          <div className="space-y-6">
            {/* Stats Dashboard */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="bg-blue-600 text-white border-4 border-black p-4">
                <div className="text-2xl font-black">{sessions.length}</div>
                <div className="text-sm font-bold">Total Sessions</div>
              </div>
              <div className="bg-green-500 text-white border-4 border-black p-4">
                <div className="text-2xl font-black">{getCompletedSessions()}</div>
                <div className="text-sm font-bold">Completed</div>
              </div>
              <div className="bg-yellow-500 text-black border-4 border-black p-4">
                <div className="text-2xl font-black">{getTodaysSessions().length}</div>
                <div className="text-sm font-bold">Today's Sessions</div>
              </div>
              <div className="bg-red-600 text-white border-4 border-black p-4">
                <div className="text-2xl font-black">{Math.round(getTotalStudyTime() / 60)}h</div>
                <div className="text-sm font-bold">Total Hours</div>
              </div>
            </div>

            {/* Create/Edit Session Form */}
            <div className="space-y-4">
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
                className="w-full bg-accent text-black p-3 border-2 border-black font-bold text-lg hover:bg-secondary transition-colors"
              >
                <Plus className="h-5 w-5 inline mr-2" />
                {showForm ? "Cancel" : "Add Session"}
              </button>

              {showForm && (
                <div className="bg-gray-50 border-2 border-black p-4 space-y-4">
                  <h2 className="text-xl font-bold border-b-2 border-black pb-2">
                    {editingId ? "Edit Session" : "Create New Session"}
                  </h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="subject" className="block text-lg font-bold mb-1">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Mathematics"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="border-2 border-black h-12 text-lg font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic" className="block text-lg font-bold mb-1">Topic</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Calculus Integration"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="border-2 border-black h-12 text-lg font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="date" className="block text-lg font-bold mb-1">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="border-2 border-black h-12 text-lg font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="block text-lg font-bold mb-1">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="border-2 border-black h-12 text-lg font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration" className="block text-lg font-bold mb-1">Duration (min)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="15"
                        max="480"
                        step="15"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="border-2 border-black h-12 text-lg font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="block text-lg font-bold mb-2">Priority</Label>
                    <div className="flex gap-2">
                      {(["low", "medium", "high"] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setFormData({ ...formData, priority: level })}
                          className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase ${
                            formData.priority === level
                              ? level === "low"
                                ? "bg-green-500 text-white"
                                : level === "medium"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-red-600 text-white"
                              : "bg-white text-black hover:bg-gray-100"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="block text-lg font-bold mb-1">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional notes or goals for this session..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="border-2 border-black h-20 text-lg font-mono resize-none"
                    />
                  </div>

                  <button
                    onClick={addOrUpdateSession}
                    disabled={!formData.subject.trim() || !formData.topic.trim() || !formData.date || !formData.time}
                    className="w-full bg-primary text-white border-2 border-black p-3 font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                  >
                    {editingId ? "Update Session" : "Create Session"}
                  </button>
                </div>
              )}

              {/* Sessions List */}
              <div className="space-y-4">
                {getTodaysSessions().length > 0 && (
                  <div className="border-2 border-black p-4 bg-gray-50">
                    <h3 className="font-bold text-lg mb-3">Today's Sessions</h3>
                    {getTodaysSessions().map((session) => (
                      <div
                        key={session.id}
                        className={`border-2 border-black p-3 mb-3 ${
                          session.completed ? "bg-green-100" : "bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
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
                            <span className="font-bold text-sm">{session.time}</span>
                            <span className="text-sm">({session.duration}min)</span>
                          </div>
                          <div className="flex gap-1">
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
                              className="bg-blue-600 text-white border border-black p-1"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="bg-red-600 text-white border border-black p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold">{session.subject}</div>
                        <div className="text-sm text-gray-700">{session.topic}</div>
                        {session.notes && <div className="text-sm mt-1">{session.notes}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {getUpcomingSessions().length > 0 && (
                  <div className="border-2 border-black p-4 bg-gray-50">
                    <h3 className="font-bold text-lg mb-3">Upcoming Sessions</h3>
                    {getUpcomingSessions().slice(0, 10).map((session) => (
                      <div key={session.id} className="border-2 border-black p-3 mb-3 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
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
                            <span className="font-bold text-sm">{session.date}</span>
                            <span className="text-sm">{session.time}</span>
                            <span className="text-sm">({session.duration}min)</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => editSession(session)}
                              className="bg-blue-600 text-white border border-black p-1"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteSession(session.id)}
                              className="bg-red-600 text-white border border-black p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="font-bold">{session.subject}</div>
                        <div className="text-sm text-gray-700">{session.topic}</div>
                        {session.notes && <div className="text-sm mt-1">{session.notes}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {sessions.length === 0 && (
                  <div className="border-2 border-black p-8 text-center bg-gray-50">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                    <p className="text-lg font-bold">No study sessions scheduled</p>
                    <p className="text-gray-600">Create your first session to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-secondary border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">HOW TO USE</h2>
          <ol className="space-y-3 text-lg">
            <li>
              <strong>1. Add Session:</strong> Click "Add Session" to create a new study block
            </li>
            <li>
              <strong>2. Fill Details:</strong> Enter subject, topic, date, time, and duration
            </li>
            <li>
              <strong>3. Set Priority:</strong> Choose low, medium, or high based on importance
            </li>
            <li>
              <strong>4. Track Progress:</strong> Mark sessions as complete when finished
            </li>
            <li>
              <strong>5. Review Schedule:</strong> View today's and upcoming sessions for planning
            </li>
          </ol>
        </div>

        {/* Description */}
        <div className="bg-accent border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">DESCRIPTION</h2>
          <p className="text-lg leading-relaxed">
            The Study Schedule Planner helps students organize and manage their study time effectively. Set priorities,
            track completed sessions, and visualize your weekly plan. Ideal for exam prep, course management, and
            building consistent study habits. Improve focus and academic performance with structured time management.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-white border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-4 border-black pb-2">TIPS</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <strong>Plan Ahead:</strong> Schedule sessions at least one week in advance
            </li>
            <li>
              <strong>Use Priorities:</strong> Focus on high-priority topics during peak energy hours
            </li>
            <li>
              <strong>Break It Down:</strong> Divide large subjects into focused 60-90 minute sessions
            </li>
            <li>
              <strong>Take Breaks:</strong> Include 10-minute breaks between sessions to recharge
            </li>
            <li>
              <strong>Stay Consistent:</strong> Review and update your schedule daily for best results
            </li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
