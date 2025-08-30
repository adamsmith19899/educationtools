import Link from "next/link"
import { BookOpen, Calculator } from "lucide-react"

export default function ToolHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-8 border-black bg-primary">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <div className="h-12 w-12 bg-yellow-500 border-4 border-black rotate-12 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-black" />
            </div>
            <div className="h-12 w-12 bg-blue-600 border-4 border-black -ml-6 -rotate-12 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter ml-4 text-white">INFORMI.ONLINE</span>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-mono font-bold text-white hover:text-yellow-500 transition-colors text-lg">
            HOME
          </Link>
          <Link
            href="/tools"
            className="font-mono font-bold text-white hover:text-yellow-500 transition-colors text-lg"
          >
            TOOLS
          </Link>
          <Link
            href="/about"
            className="font-mono font-bold text-white hover:text-yellow-500 transition-colors text-lg"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="font-mono font-bold text-white hover:text-yellow-500 transition-colors text-lg"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </header>
  )
}
