"use client"

import type React from "react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-4 tracking-tight">CONTACT US</h1>
          <div className="w-24 h-2 bg-blue-500 mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            Have questions about our educational tools? Need technical support? Want to provide feedback? We're here to
            help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6 border-l-4 border-red-500 pl-4">
                Send us a Message
              </h2>

              {submitStatus === "success" && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-500 text-green-800 dark:text-green-200 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-black dark:text-white mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-black dark:text-white mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-black dark:text-white mb-2">
                    SUBJECT *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-black dark:text-white mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6 border-l-4 border-yellow-500 pl-4">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-100 dark:bg-gray-900 p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-black dark:text-white mb-2">EMAIL SUPPORT</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">For general inquiries and support</p>
                  <a
                    href="mailto:support@usnewse.com"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    support@usnewse.com
                  </a>
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 p-6 border-l-4 border-green-500">
                  <h3 className="font-bold text-black dark:text-white mb-2">TECHNICAL ISSUES</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">For bugs and technical problems</p>
                  <a
                    href="mailto:tech@usnewse.com"
                    className="text-green-600 dark:text-green-400 font-semibold hover:underline"
                  >
                    tech@usnewse.com
                  </a>
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 p-6 border-l-4 border-red-500">
                  <h3 className="font-bold text-black dark:text-white mb-2">PARTNERSHIPS</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">For business and educational partnerships</p>
                  <a
                    href="mailto:partnerships@usnewse.com"
                    className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                  >
                    partnerships@usnewse.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-purple-500 pl-4">
                Response Times
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>General Inquiries:</span>
                  <span className="font-semibold">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Technical Support:</span>
                  <span className="font-semibold">12-24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Bug Reports:</span>
                  <span className="font-semibold">6-12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgent Issues:</span>
                  <span className="font-semibold">2-6 hours</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4 border-l-4 border-orange-500 pl-4">
                Office Hours
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM (EST)
                </p>
                <p>
                  <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM (EST)
                </p>
                <p>
                  <span className="font-semibold">Sunday:</span> Closed
                </p>
                <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                  * Emergency technical issues are monitored 24/7
                </p>
              </div>
            </div>
          </div>
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
