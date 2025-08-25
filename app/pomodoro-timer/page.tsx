"use client"

import { useState, useEffect, useRef } from "react"
import { Coffee, Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"

type PomodoroState = "work" | "shortBreak" | "longBreak" | "idle"

interface PomodoroSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number
}

export default function PomodoroTimer() {
  const [timer, setTimer] = useState(25 * 60)
  const [state, setState] = useState<PomodoroState>("idle")
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  })
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Initialize audio element
  useEffect(() => {
    // Create a simple notification sound if no external sound is available
    const audio = new Audio()
    audio.src = "data:audio/wav;base64,UklGRiQDAABXQVZFZm10IBAAAAABAAEARKwAAIgRABALAABR"
    audioRef.current = audio
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])
  
  const startTimer = () => {
    if (state === "idle") {
      setState("work")
      setTimer(settings.workDuration * 60)
    }
    
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          playNotification()
          advanceState()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }
  
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    if (state === "work") {
      setTimer(settings.workDuration * 60)
    } else if (state === "shortBreak") {
      setTimer(settings.shortBreakDuration * 60)
    } else if (state === "longBreak") {
      setTimer(settings.longBreakDuration * 60)
    }
  }
  
  const advanceState = () => {
    if (state === "work") {
      const nextSession = sessionsCompleted + 1
      setSessionsCompleted(nextSession)
      
      if (nextSession % settings.sessionsBeforeLongBreak === 0) {
        setState("longBreak")
        setTimer(settings.longBreakDuration * 60)
      } else {
        setState("shortBreak")
        setTimer(settings.shortBreakDuration * 60)
      }
    } else {
      setState("work")
      setTimer(settings.workDuration * 60)
    }
    
    // Auto-start next session after a brief pause
    setTimeout(startTimer, 1000)
  }
  
  const playNotification = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e))
    }
  }
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleSettingChange = (setting: keyof PomodoroSettings, value: number) => {
    if (value > 0) {
      setSettings(prev => ({
        ...prev,
        [setting]: value
      }))
      
      // Update timer if relevant setting changed while idle
      if (state === "idle") {
        if (setting === "workDuration") setTimer(value * 60)
        if (setting === "shortBreakDuration" && state === "shortBreak") setTimer(value * 60)
        if (setting === "longBreakDuration" && state === "longBreak") setTimer(value * 60)
      }
    }
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
                name: "Pomodoro Productivity Timer",
                description: "Boost your productivity with this Pomodoro technique timer for focused work sessions",
                url: "https://usnewse.com/pomodoro-timer",
                applicationCategory: "ProductivityApplication",
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
              <Coffee className="h-8 w-8 text-red-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Pomodoro Productivity Timer</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Boost your focus and productivity with the Pomodoro technique
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Settings Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                  Timer Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workDuration" className="text-lg font-bold">
                      Work Duration (minutes)
                    </Label>
                    <Input
                      id="workDuration"
                      type="number"
                      min="1"
                      value={settings.workDuration}
                      onChange={(e) => handleSettingChange("workDuration", parseInt(e.target.value) || 25)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortBreakDuration" className="text-lg font-bold">
                      Short Break (minutes)
                    </Label>
                    <Input
                      id="shortBreakDuration"
                      type="number"
                      min="1"
                      value={settings.shortBreakDuration}
                      onChange={(e) => handleSettingChange("shortBreakDuration", parseInt(e.target.value) || 5)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="longBreakDuration" className="text-lg font-bold">
                      Long Break (minutes)
                    </Label>
                    <Input
                      id="longBreakDuration"
                      type="number"
                      min="1"
                      value={settings.longBreakDuration}
                      onChange={(e) => handleSettingChange("longBreakDuration", parseInt(e.target.value) || 15)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionsBeforeLongBreak" className="text-lg font-bold">
                      Sessions Before Long Break
                    </Label>
                    <Input
                      id="sessionsBeforeLongBreak"
                      type="number"
                      min="1"
                      value={settings.sessionsBeforeLongBreak}
                      onChange={(e) => handleSettingChange("sessionsBeforeLongBreak", parseInt(e.target.value) || 4)}
                      className="border-2 border-black text-lg font-mono shadow-brutal"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 border-2 border-black bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label={isMuted ? "Unmute notifications" : "Mute notifications"}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <span className="font-bold">
                      {isMuted ? "Notifications Muted" : "Notifications Enabled"}
                    </span>
                  </div>
                </div>
              </div>

              {/* How to Use Section */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Configure your timer settings
                  </li>
                  <li>
                    <strong>2.</strong> Click "Start" to begin a work session
                  </li>
                  <li>
                    <strong>3.</strong> Work for the set duration (default: 25 min)
                  </li>
                  <li>
                    <strong>4.</strong> Take a short break when timer ends
                  </li>
                  <li>
                    <strong>5.</strong> After 4 work sessions, take a long break
                  </li>
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Productivity Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Eliminate distractions during work intervals</li>
                  <li>• Use breaks to stand up and stretch</li>
                  <li>• Track your completed Pomodoros for motivation</li>
                  <li>• Adjust durations to match your focus span</li>
                  <li>• Combine with task lists for maximum productivity</li>
                </ul>
              </div>
            </div>

            {/* Timer Display Section */}
            <div className="space-y-6">
              <div className={`bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal ${
                state === "work" ? "ring-2 ring-red-500" : 
                state === "shortBreak" ? "ring-2 ring-green-500" : 
                state === "longBreak" ? "ring-2 ring-blue-500" : ""
              }`}>
                <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2 text-center">
                  {state === "work" ? "WORK SESSION" : state === "shortBreak" ? "SHORT BREAK" : state === "longBreak" ? "LONG BREAK" : "READY TO START"}
                </h3>

                <div className="text-center mb-8">
                  <div className={`text-6xl font-black tracking-tighter mb-4 ${
                    state === "work" ? "text-red-600" : 
                    state === "shortBreak" ? "text-green-600" : 
                    state === "longBreak" ? "text-blue-600" : "text-gray-800 dark:text-gray-200"
                  }`}>
                    {formatTime(timer)}
                  </div>
                  
                  <div className="text-2xl font-bold mb-6">
                    {state === "work" ? "Stay Focused!" : state !== "idle" ? "Take a Break!" : "Ready to Boost Your Productivity?"}
                  </div>
                  
                  <div className="text-lg">
                    Pomodoros Completed: <span className="font-black">{sessionsCompleted}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={state === "idle" || state === "work" || state === "shortBreak" || state === "longBreak" ? 
                      (state === "idle" ? startTimer : pauseTimer) : 
                      startTimer}
                    className="bg-red-600 text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    {state === "idle" ? (
                      <>
                        <Play className="h-6 w-6 inline mr-2" />
                        Start
                      </>
                    ) : (
                      <>
                        <Pause className="h-6 w-6 inline mr-2" />
                        Pause
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetTimer}
                    className="bg-gray-600 text-white border-4 border-black px-8 py-4 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <RotateCcw className="h-6 w-6 inline mr-2" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-red-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">About Pomodoro</h3>
                <p className="text-lg">
                  The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
                  It uses a timer to break work into focused intervals traditionally 25 minutes in length, separated by short breaks. 
                  This technique helps improve mental agility and productivity by creating a rhythm of focused work and rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
