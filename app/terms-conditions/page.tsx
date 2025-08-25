import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Terms & Conditions | Universal Study & Education Support",
  description:
    "Terms & Conditions for Universal Study & Education Support - Read our terms of service for using our educational platform and study tools.",
  keywords: "terms of service, terms and conditions, educational platform, user agreement, study tools",
  robots: "index, follow",
  openGraph: {
    title: "Terms & Conditions | Universal Study & Education Support",
    description:
      "Terms & Conditions for Universal Study & Education Support - Read our terms of service for using our platform.",
    url: "https://usnewse.com/terms-conditions",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Universal Study & Education Support",
    description: "Terms & Conditions for Universal Study & Education Support - Read our terms of service.",
  },
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tight">
            TERMS & CONDITIONS
          </h1>
          <div className="w-24 h-2 bg-yellow-500 mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using Universal Study & Education Support ("usnewse.com"), you accept and agree to be
              bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others
              who access or use our educational platform and study tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              Use of Educational Services
            </h2>
            <div className="space-y-4">
              <p>Our platform provides various educational tools and services including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Flashcard Generator for memory enhancement</li>
                <li>Study Schedule Planner for time management</li>
                <li>Concept Map Builder for visual learning</li>
                <li>Math Problem Solver for mathematical assistance</li>
                <li>Vocabulary Builder for language development</li>
                <li>Essay Outline Generator for writing support</li>
                <li>Pomodoro Timer for productivity</li>
                <li>Study Goal Tracker for progress monitoring</li>
                <li>Note Summarizer for content condensation</li>
                <li>Mnemonic Generator for memory techniques</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-green-500 pl-4">
              User Responsibilities
            </h2>
            <div className="space-y-4">
              <p>As a user of our educational platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our services for legitimate educational purposes only</li>
                <li>Provide accurate information when creating study materials</li>
                <li>Respect intellectual property rights of others</li>
                <li>Not attempt to disrupt or compromise our platform security</li>
                <li>Follow academic integrity guidelines when using our tools</li>
                <li>Not share account credentials with unauthorized users</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-purple-500 pl-4">
              Intellectual Property
            </h2>
            <p>
              The content, features, and functionality of Universal Study & Education Support are owned by us and are
              protected by international copyright, trademark, and other intellectual property laws. You retain
              ownership of the study materials you create using our tools, while we retain rights to our platform
              technology and educational methodologies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-yellow-500 pl-4">
              Academic Integrity
            </h2>
            <p>
              Our tools are designed to support learning and should be used in accordance with your institution's
              academic integrity policies. Users are responsible for ensuring their use of our platform complies with
              their school's guidelines regarding study aids and educational assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              Limitation of Liability
            </h2>
            <p>
              Universal Study & Education Support provides educational tools "as is" without warranties. We are not
              liable for any direct, indirect, incidental, or consequential damages arising from your use of our
              platform. Our educational tools are supplementary aids and should not replace proper study methods or
              professional educational guidance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
              on this page. Your continued use of our platform after any changes constitutes acceptance of the new
              terms. We encourage users to review these terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-green-500 pl-4">
              Contact Information
            </h2>
            <p>If you have questions about these Terms & Conditions, please contact us:</p>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4">
              <p className="font-semibold">Universal Study & Education Support</p>
              <p>Email: legal@usnewse.com</p>
              <p>Website: https://usnewse.com</p>
            </div>
          </section>
        </div>

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
