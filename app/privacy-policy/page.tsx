import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Privacy Policy | Universal Study & Education Support",
  description:
    "Privacy Policy for Universal Study & Education Support - Learn how we protect and handle your personal information on our educational platform.",
  keywords: "privacy policy, data protection, educational platform, student privacy, COPPA compliance",
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy | Universal Study & Education Support",
    description:
      "Privacy Policy for Universal Study & Education Support - Learn how we protect and handle your personal information.",
    url: "https://usnewse.com/privacy-policy",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Universal Study & Education Support",
    description:
      "Privacy Policy for Universal Study & Education Support - Learn how we protect and handle your personal information.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tight">
            PRIVACY POLICY
          </h1>
          <div className="w-24 h-2 bg-red-500 mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <p>
                At Universal Study & Education Support, we collect information to provide better educational services to
                our users:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information you provide when using our study tools</li>
                <li>Usage data and analytics to improve our educational platform</li>
                <li>Device information and browser data for technical optimization</li>
                <li>Study progress and performance data to enhance learning experiences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-yellow-500 pl-4">
              How We Use Your Information
            </h2>
            <div className="space-y-4">
              <p>We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing and maintaining our educational tools and services</li>
                <li>Personalizing your learning experience and study recommendations</li>
                <li>Analyzing usage patterns to improve our platform functionality</li>
                <li>Communicating with you about updates and educational content</li>
                <li>Ensuring the security and integrity of our services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-green-500 pl-4">
              Data Protection & Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. Your study data is encrypted and
              stored securely using industry-standard protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-purple-500 pl-4">
              Student Privacy (COPPA Compliance)
            </h2>
            <p>
              We are committed to protecting the privacy of students under 13 years of age in compliance with the
              Children's Online Privacy Protection Act (COPPA). We do not knowingly collect personal information from
              children under 13 without parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              Your Rights
            </h2>
            <div className="space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of certain data collection practices</li>
                <li>Export your study data and progress</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              Contact Information
            </h2>
            <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4">
              <p className="font-semibold">Universal Study & Education Support</p>
              <p>Email: privacy@usnewse.com</p>
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
