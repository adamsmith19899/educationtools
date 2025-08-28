"use client"
import { Circle, Square } from "lucide-react"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-8 border-black bg-primary">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center">
            <div className="h-8 w-8 sm:h-12 sm:w-12 bg-yellow-500 border-2 sm:border-4 border-black rotate-12"></div>
            <div className="h-8 w-8 sm:h-12 sm:w-12 bg-blue-600 border-2 sm:border-4 border-black -ml-4 sm:-ml-6 -rotate-12"></div>
            <span className="font-black text-lg sm:text-2xl tracking-tighter ml-2 sm:ml-4 text-white">
              Universal Study & Education
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-8 w-8 sm:h-10 sm:w-10 bg-yellow-500 border-2 sm:border-4 border-black flex items-center justify-center hover:bg-yellow-400 transition-colors"
          >
            {darkMode ? <Circle className="h-4 w-4 sm:h-5 sm:w-5" /> : <Square className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
