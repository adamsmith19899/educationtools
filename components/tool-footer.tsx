import Link from "next/link"
import { BookOpen, Calculator, Mail, Phone, MapPin } from "lucide-react"

export default function ToolFooter() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-yellow-500 border-4 border-white rotate-12 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-black" />
              </div>
              <div className="h-12 w-12 bg-blue-600 border-4 border-white -ml-6 -rotate-12 flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter ml-4">Universal Study & Education</span>
            </div>
            <p className="text-lg mb-6 max-w-md">
              Empowering students worldwide with innovative educational technology and AI-powered study tools.
            </p>
            <div className="flex gap-4">
              <div className="h-8 w-8 bg-red-600 border-2 border-white"></div>
              <div className="h-8 w-8 bg-blue-600 border-2 border-white"></div>
              <div className="h-8 w-8 bg-yellow-500 border-2 border-white"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-white pb-2">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-lg hover:text-yellow-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-lg hover:text-yellow-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-lg hover:text-yellow-500 transition-colors">
                  Study Tools
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-lg hover:text-yellow-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-white pb-2">CONTACT</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span className="text-lg">hello@informi.online</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-lime-400" />
                <span className="text-lg">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-fuchsia-400" />
                <span className="text-lg">Global Online Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-white mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg">© 2024 INFORMI EDUCATION ONLINE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-lg hover:text-yellow-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-lg hover:text-yellow-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
