import type { Metadata } from "next"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Disclaimer | Universal Study & Education Support",
  description:
    "Disclaimer for Universal Study & Education Support - Important information about the use of our educational tools and study resources.",
  keywords: "disclaimer, educational tools, study resources, academic support, learning platform",
  robots: "index, follow",
  openGraph: {
    title: "Disclaimer | Universal Study & Education Support",
    description:
      "Disclaimer for Universal Study & Education Support - Important information about the use of our educational tools.",
    url: "https://usnewse.com/disclaimer",
    siteName: "Universal Study & Education Support",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer | Universal Study & Education Support",
    description:
      "Disclaimer for Universal Study & Education Support - Important information about our educational tools.",
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tight">DISCLAIMER</h1>
          <div className="w-24 h-2 bg-green-500 mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-800 dark:text-gray-200">
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              Educational Purpose Only
            </h2>
            <p>
              Universal Study & Education Support (usnewse.com) provides educational tools and resources for learning
              enhancement purposes only. Our platform is designed to supplement, not replace, traditional educational
              methods, professional tutoring, or formal academic instruction. Users should always consult with their
              educators and follow their institution's guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              No Guarantee of Academic Success
            </h2>
            <p>
              While our study tools are designed to support learning, we make no guarantees regarding academic
              performance, test scores, or educational outcomes. Success in education depends on many factors including
              individual effort, study habits, prior knowledge, and institutional requirements that are beyond our
              control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-yellow-500 pl-4">
              Accuracy of Information
            </h2>
            <div className="space-y-4">
              <p>We strive to provide accurate and helpful educational tools, however:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mathematical solutions should be verified independently</li>
                <li>Generated content may contain errors or inaccuracies</li>
                <li>Study materials created using our tools should be reviewed by qualified educators</li>
                <li>We are not responsible for any errors in user-generated content</li>
                <li>Always cross-reference important information with authoritative sources</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-purple-500 pl-4">
              Academic Integrity Responsibility
            </h2>
            <p>
              Users are solely responsible for ensuring their use of our tools complies with their institution's
              academic integrity policies. Our platform should be used as a study aid and learning support tool, not as
              a means to circumvent academic requirements or engage in academic dishonesty. Always follow your school's
              guidelines regarding the use of study aids and external resources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-green-500 pl-4">
              Technical Limitations
            </h2>
            <div className="space-y-4">
              <p>Our educational tools have inherent limitations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI-generated content may not always be contextually appropriate</li>
                <li>Complex mathematical problems may require human verification</li>
                <li>Study schedules are suggestions and may need personal adjustment</li>
                <li>Concept maps are visual aids and may not capture all relationships</li>
                <li>Vocabulary definitions should be confirmed with authoritative dictionaries</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              No Professional Advice
            </h2>
            <p>
              Our platform does not provide professional educational, psychological, or medical advice. If you have
              learning difficulties, disabilities, or special educational needs, please consult with qualified
              professionals. Our tools are general-purpose educational aids and may not be suitable for all learning
              styles or educational requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
              Third-Party Content
            </h2>
            <p>
              Our platform may reference or link to third-party educational resources. We are not responsible for the
              accuracy, completeness, or reliability of any third-party content. Users should evaluate all external
              resources independently and verify information from multiple sources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-yellow-500 pl-4">
              Changes to Services
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of our educational tools at any time
              without notice. We are not liable for any inconvenience or loss resulting from changes to our services.
              Users should maintain backup copies of important study materials created using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-green-500 pl-4">
              Contact Information
            </h2>
            <p>If you have questions about this disclaimer or our educational services, please contact us:</p>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mt-4">
              <p className="font-semibold">Universal Study & Education Support</p>
              <p>Email: info@usnewse.com</p>
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
