import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "About Us | Universal Study & Education Support",
  description:
    "Learn about Universal Study & Education Support - Our mission to provide innovative educational tools and study resources for students worldwide.",
  keywords: "about us, educational platform, study tools, learning resources, student support, education technology",
  robots: "index, follow",
  openGraph: {
    title: "About Us | Universal Study & Education Support",
    description:
      "Learn about Universal Study & Education Support - Our mission to provide innovative educational tools for students.",
    url: "https://usnewse.com/about",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Us | Universal Study & Education Support",
    description: "Learn about Universal Study & Education Support and our educational mission.",
  },
}

export default function AboutPage() {
  const tools = [
    {
      name: "Flashcard Generator",
      description: "Create interactive flashcards for effective memorization and spaced repetition learning.",
      color: "bg-red-500",
    },
    {
      name: "Study Schedule Planner",
      description: "Organize your study time with intelligent scheduling and progress tracking.",
      color: "bg-blue-500",
    },
    {
      name: "Concept Map Builder",
      description: "Visualize complex relationships between ideas with interactive mind mapping.",
      color: "bg-green-500",
    },
    {
      name: "Math Problem Solver",
      description: "Get step-by-step solutions and explanations for mathematical problems.",
      color: "bg-yellow-500",
    },
    {
      name: "Vocabulary Builder",
      description: "Expand your vocabulary with contextual learning and interactive quizzes.",
      color: "bg-purple-500",
    },
    {
      name: "Essay Outline Generator",
      description: "Structure your essays with professional outlines and writing frameworks.",
      color: "bg-pink-500",
    },
    {
      name: "Pomodoro Timer",
      description: "Boost productivity with focused study sessions and strategic breaks.",
      color: "bg-indigo-500",
    },
    {
      name: "Study Goal Tracker",
      description: "Set, monitor, and achieve your academic goals with progress visualization.",
      color: "bg-orange-500",
    },
    {
      name: "Note Summarizer",
      description: "Transform lengthy notes into concise, actionable summaries.",
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tight">ABOUT US</h1>
          <div className="w-24 h-2 bg-purple-500 mb-6"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
            Empowering students worldwide with innovative educational tools and study resources designed to enhance
            learning outcomes and academic success.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6 border-l-4 border-red-500 pl-4">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At Universal Study & Education Support, we believe that every student deserves access to powerful,
                intuitive tools that make learning more effective and enjoyable. Our mission is to democratize
                educational technology by providing free, high-quality study tools that adapt to different learning
                styles and academic needs.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We're committed to supporting students at every level of their educational journey, from elementary
                school through higher education and beyond. Our platform combines cutting-edge technology with proven
                educational methodologies to create tools that truly make a difference.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-yellow-500 p-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">10</span>
                  </div>
                  <div>
                    <p className="font-bold">Educational Tools</p>
                    <p className="text-sm opacity-90">Comprehensive study suite</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">∞</span>
                  </div>
                  <div>
                    <p className="font-bold">Students Supported</p>
                    <p className="text-sm opacity-90">Growing global community</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">24/7</span>
                  </div>
                  <div>
                    <p className="font-bold">Available Access</p>
                    <p className="text-sm opacity-90">Learn anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 border-l-4 border-blue-500 pl-4">
            Our Educational Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-900 p-6 border-l-4 border-gray-300 dark:border-gray-700"
              >
                <div className={`w-4 h-4 ${tool.color} mb-3`}></div>
                <h3 className="font-bold text-black dark:text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 border-l-4 border-green-500 pl-4">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Accessibility</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Education should be accessible to everyone. Our tools are free, user-friendly, and designed to work
                  across all devices and learning abilities.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We continuously evolve our platform using the latest educational research and technology to provide
                  cutting-edge learning experiences.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Student-Centered</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every feature we develop is designed with students in mind, focusing on real learning challenges and
                  practical solutions.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Quality</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We maintain high standards in everything we do, from user interface design to educational content
                  accuracy and platform reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8 border-l-4 border-orange-500 pl-4">
            Our Commitment
          </h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
            <div className="max-w-4xl">
              <p className="text-xl mb-6 leading-relaxed">
                We're more than just a platform – we're your partners in academic success. Our team of educators,
                developers, and learning specialists work tirelessly to ensure that every tool we create serves a real
                purpose in your educational journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-90">Free to Use</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Platform Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-sm opacity-90">Learning Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6 border-l-4 border-pink-500 pl-4">
            Looking Forward
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 p-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              As we continue to grow, we're excited about the future of educational technology. We're constantly
              researching new ways to enhance learning through artificial intelligence, personalized learning paths, and
              collaborative study features.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our vision is to create a comprehensive educational ecosystem where students can access everything they
              need to succeed academically, all in one place. We're committed to staying at the forefront of educational
              innovation while never losing sight of our core mission: making learning more effective and accessible for
              everyone.
            </p>
          </div>
        </section>

        {/* Back to Home */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            ← BACK TO HOME
          </a>
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}
