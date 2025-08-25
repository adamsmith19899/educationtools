"use client"

import { useState, useEffect } from "react"
import { BookOpen, Target, BarChart, Plus, X, Check, RotateCcw, Calendar, TrendingUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

interface StudyGoal {
  id: string
  subject: string
  targetHours: number
  completedHours: number
  deadline: string
  priority: "low" | "medium" | "high"
  notes: string
}

export default function StudyGoalTracker() {
  const [goals, setGoals] = useState<StudyGoal[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [newTargetHours, setNewTargetHours] = useState("2")
  const [newDeadline, setNewDeadline] = useState("")
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium")
  const [newNotes, setNewNotes] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [showStats, setShowStats] = useState(false)
  
  // Initialize with today's date as default deadline
  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0]
    setNewDeadline(formattedDate)
  }, [])
  
  const addGoal = () => {
    if (newSubject.trim() && Number(newTargetHours) > 0) {
      const newGoal: StudyGoal = {
        id: Date.now().toString(),
        subject: newSubject.trim(),
        targetHours: Number(newTargetHours),
        completedHours: 0,
        deadline: newDeadline,
        priority: newPriority,
        notes: newNotes.trim()
      }
      setGoals([...goals, newGoal])
      resetForm()
    }
  }
  
  const resetForm = () => {
    setNewSubject("")
    setNewTargetHours("2")
    setNewNotes("")
    const today = new Date()
    setNewDeadline(today.toISOString().split('T')[0])
    setNewPriority("medium")
  }
  
  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }
  
  const updateProgress = (id: string, hours: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completedHours: Math.min(goal.targetHours, goal.completedHours + hours) }
        : goal
    ))
  }
  
  const resetProgress = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completedHours: 0 }
        : goal
    ))
  }
  
  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0
    
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetHours, 0)
    const totalCompleted = goals.reduce((sum, goal) => sum + goal.completedHours, 0)
    
    return Math.round((totalCompleted / totalTarget) * 100)
  }
  
  const goalsDueSoon = goals.filter(goal => {
    const deadline = new Date(goal.deadline)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0
  })
  
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const daysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `${diffDays} days left`
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500 text-white"
      case "medium": return "bg-yellow-500 text-black"
      case "low": return "bg-green-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
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
                name: "Study Goal Tracker",
                description: "Track and manage your study goals with progress visualization and deadline tracking",
                url: "https://usnewse.com/study-goal-tracker",
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
              <Target className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Study Goal Tracker</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Track and manage your study goals with progress visualization and deadline tracking
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Create Goals Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Set New Goal
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject" className="text-lg font-bold">
                      Subject/Topic
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Enter subject or topic..."
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetHours" className="text-lg font-bold">
                      Target Hours
                    </Label>
                    <Input
                      id="targetHours"
                      type="number"
                      min="1"
                      placeholder="2"
                      value={newTargetHours}
                      onChange={(e) => setNewTargetHours(e.target.value)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deadline" className="text-lg font-bold">
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label className="text-lg font-bold">Priority</Label>
                    <div className="flex gap-2 mt-2">
                      {(["low", "medium", "high"] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setNewPriority(level)}
                          className={`px-4 py-2 border-2 border-black font-bold text-sm uppercase transition-all ${
                            newPriority === level
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
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes..."
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      className="border-2 border-black h-24 text-lg font-mono shadow-brutal resize-none"
                    />
                  </div>

                  <button
                    onClick={addGoal}
                    disabled={!newSubject.trim() || Number(newTargetHours) <= 0}
                    className="w-full bg-purple-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-5 w-5 inline mr-2" />
                    Add Study Goal
                  </button>
                </div>
              </div>

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Set a new study goal with subject, hours, and deadline
                  </li>
                  <li>
                    <strong>2.</strong> Track your progress by adding completed hours
                  </li>
                  <li>
                    <strong>3.</strong> View overall progress and upcoming deadlines
                  </li>
                  <li>
                    <strong>4.</strong> Use the stats view to analyze your study patterns
                  </li>
                  <li>
                    <strong>5.</strong> Adjust goals as needed for optimal learning
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Study Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Break large goals into smaller, manageable targets</li>
                  <li>• Prioritize goals based on upcoming deadlines</li>
                  <li>• Review progress daily to stay on track</li>
                  <li>• Balance high-priority goals with foundational topics</li>
                  <li>• Celebrate small wins to maintain motivation</li>
                </ul>
              </div>
            </div>

            {/* Goals Display Section */}
            <div className="space-y-6">
              {goals.length > 0 && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                      viewMode === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                    }`}
                  >
                    <BookOpen className="h-5 w-5 inline mr-2" />
                    List View
                  </button>
                  
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                      viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                    }`}
                  >
                    <Calendar className="h-5 w-5 inline mr-2" />
                    Calendar View
                  </button>
                  
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                      showStats ? "bg-purple-600 text-white" : "bg-white dark:bg-gray-800 text-black dark:text-white"
                    }`}
                  >
                    <TrendingUp className="h-5 w-5 inline mr-2" />
                    {showStats ? "Hide Stats" : "Show Stats"}
                  </button>
                </div>
              )}

              {showStats && (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Study Statistics
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-lg font-bold mb-2">Overall Progress</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 border-2 border-black h-6 rounded">
                        <div 
                          className={`h-6 rounded ${getProgressColor(calculateOverallProgress())}`}
                          style={{ width: `${calculateOverallProgress()}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-1 font-bold">{calculateOverallProgress()}% Complete</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-black p-4 bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-lg font-bold">Total Goals</div>
                        <div className="text-3xl font-black text-center">{goals.length}</div>
                      </div>
                      <div className="border-2 border-black p-4 bg-purple-50 dark:bg-purple-900/20">
                        <div className="text-lg font-bold">Due Soon</div>
                        <div className="text-3xl font-black text-center">{goalsDueSoon.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {goals.length > 0 ? (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Your Study Goals ({goals.length})
                  </h3>
                  
                  {viewMode === "list" ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {goals.map((goal) => {
                        const progress = Math.round((goal.completedHours / goal.targetHours) * 100)
                        
                        return (
                          <div key={goal.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className={`px-2 py-1 text-xs font-bold border border-black ${getPriorityColor(goal.priority)}`}>
                                  {goal.priority.toUpperCase()}
                                </span>
                                <span className="ml-2 text-sm bg-amber-200 border border-black px-2 py-1">
                                  {daysUntilDeadline(goal.deadline)}
                                </span>
                              </div>
                              <button
                                onClick={() => deleteGoal(goal.id)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                                aria-label="Delete goal"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="font-bold text-lg mb-2">{goal.subject}</div>
                            
                            <div className="text-sm mb-2">
                              <span className="font-bold">Progress:</span> {goal.completedHours}/{goal.targetHours} hours
                            </div>
                            
                            <div className="w-full bg-gray-200 dark:bg-gray-700 border-2 border-black h-4 rounded mb-2">
                              <div 
                                className={`h-4 rounded ${getProgressColor(progress)}`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            
                            <div className="text-sm mb-2">
                              <span className="font-bold">Deadline:</span> {formatDeadline(goal.deadline)}
                            </div>
                            
                            {goal.notes && (
                              <div className="text-sm italic border-l-4 border-black pl-2 mb-3 bg-gray-100 dark:bg-gray-700 p-2">
                                {goal.notes}
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateProgress(goal.id, 0.5)}
                                className="bg-green-500 text-white border-2 border-black px-3 py-1 font-bold text-sm hover:bg-green-600 transition-colors"
                              >
                                +0.5h
                              </button>
                              <button
                                onClick={() => updateProgress(goal.id, 1)}
                                className="bg-green-600 text-white border-2 border-black px-3 py-1 font-bold text-sm hover:bg-green-700 transition-colors"
                              >
                                +1h
                              </button>
                              <button
                                onClick={() => resetProgress(goal.id)}
                                className="bg-gray-500 text-white border-2 border-black px-3 py-1 font-bold text-sm hover:bg-gray-600 transition-colors"
                              >
                                <RotateCcw className="h-4 w-4 inline mr-1" />
                                Reset
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-7 gap-1 text-center font-bold text-sm border-b-2 border-black pb-2">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {/* This would be a simplified calendar view - in a real app, you'd generate actual calendar days */}
                        {Array.from({ length: 35 }).map((_, index) => (
                          <div 
                            key={index}
                            className={`min-h-[80px] border-2 border-black p-1 ${
                              index % 7 === 0 || index % 7 === 6 ? "bg-gray-100 dark:bg-gray-800" : ""
                            }`}
                          >
                            <div className="font-bold">{index + 1}</div>
                            {goals.filter(goal => {
                              const deadline = new Date(goal.deadline)
                              return deadline.getDate() === index + 1
                            }).map((goal) => (
                              <div 
                                key={goal.id}
                                className={`mt-1 text-xs truncate px-1 py-0.5 border border-black ${
                                  getPriorityColor(goal.priority)
                                }`}
                                title={`${goal.subject} - ${Math.round((goal.completedHours / goal.targetHours) * 100)}%`}
                              >
                                {goal.subject}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm font-bold mb-2">Legend:</div>
                        <div className="flex gap-2">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 border border-black mr-1"></div>
                            <span>High Priority</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 border border-black mr-1"></div>
                            <span>Medium Priority</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 border border-black mr-1"></div>
                            <span>Low Priority</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 border-4 border-black p-8 shadow-brutal text-center">
                  <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No study goals yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Set your first study goal to get started!</p>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-purple-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Study Goal Tracker helps you organize and monitor your academic goals with visual progress tracking. 
                  Set targets for each subject, track your completed study hours, and stay aware of upcoming deadlines. 
                  The calendar view helps visualize your study schedule, while statistics provide insights into your overall progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
