"use client"

import type React from "react"

import ToolHeader from "./tool-header"
import ToolSidebar from "./tool-sidebar"
import ToolFooter from "./tool-footer"
 
interface ToolLayoutProps {
  children: React.ReactNode
  toolName?: string
}

export function ToolLayout({ children, toolName }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <ToolHeader />
      <div className="flex">
        <main className="flex-1 p-8">{children}</main>
        <ToolSidebar />
      </div>
      <ToolFooter />
    </div>
  )
}

export default ToolLayout
