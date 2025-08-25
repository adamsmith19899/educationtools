"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Map, Plus, Trash2, Download, RotateCcw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"

interface ConceptNode {
  id: string
  text: string
  x: number
  y: number
  color: string
  connections: string[]
}

interface Connection {
  from: string
  to: string
  label?: string
}

export default function ConceptMapBuilder() {
  const [nodes, setNodes] = useState<ConceptNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [newNodeText, setNewNodeText] = useState("")
  const [connectionMode, setConnectionMode] = useState(false)
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [connectionLabel, setConnectionLabel] = useState("")
  const canvasRef = useRef<HTMLDivElement>(null)

  const colors = [
    "bg-blue-600",
    "bg-red-600",
    "bg-yellow-500",
    "bg-green-500",
    "bg-purple-600",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
  ]

  const addNode = () => {
    if (newNodeText.trim()) {
      const newNode: ConceptNode = {
        id: Date.now().toString(),
        text: newNodeText.trim(),
        x: Math.random() * 400 + 50,
        y: Math.random() * 300 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      }
      setNodes([...nodes, newNode])
      setNewNodeText("")
    }
  }

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter((node) => node.id !== nodeId))
    setConnections(connections.filter((conn) => conn.from !== nodeId && conn.to !== nodeId))
    if (selectedNode === nodeId) setSelectedNode(null)
  }

  const updateNodeText = (nodeId: string, newText: string) => {
    setNodes(nodes.map((node) => (node.id === nodeId ? { ...node, text: newText } : node)))
  }

  const handleNodeClick = (nodeId: string) => {
    if (connectionMode) {
      if (!connectingFrom) {
        setConnectingFrom(nodeId)
      } else if (connectingFrom !== nodeId) {
        const newConnection: Connection = {
          from: connectingFrom,
          to: nodeId,
          label: connectionLabel.trim() || undefined,
        }
        setConnections([...connections, newConnection])
        setConnectingFrom(null)
        setConnectionLabel("")
        setConnectionMode(false)
      }
    } else {
      setSelectedNode(selectedNode === nodeId ? null : nodeId)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (!connectionMode) {
      setDraggedNode(nodeId)
      const node = nodes.find((n) => n.id === nodeId)
      if (node) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          setDragOffset({
            x: e.clientX - rect.left - node.x,
            y: e.clientY - rect.top - node.y,
          })
        }
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNode && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const newX = e.clientX - rect.left - dragOffset.x
      const newY = e.clientY - rect.top - dragOffset.y

      setNodes(
        nodes.map((node) =>
          node.id === draggedNode
            ? { ...node, x: Math.max(0, Math.min(newX, 600)), y: Math.max(0, Math.min(newY, 400)) }
            : node,
        ),
      )
    }
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
  }

  const exportMap = () => {
    const mapData = { nodes, connections }
    const dataStr = JSON.stringify(mapData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "concept-map.json"
    link.click()
  }

  const clearMap = () => {
    setNodes([])
    setConnections([])
    setSelectedNode(null)
    setConnectingFrom(null)
    setConnectionMode(false)
  }

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    return node ? { x: node.x + 60, y: node.y + 20 } : { x: 0, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Sidebar />

      <div className="lg:pr-80 lg:pl-0">
        <div className="container py-8 px-6">
          {/* Header with Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Concept Map Builder",
                description: "Visualize relationships between concepts with interactive mind maps and knowledge graphs",
                url: "https://usnewse.com/concept-map-builder",
                applicationCategory: "EducationalApplication",
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
              <Map className="h-8 w-8 text-red-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Concept Map Builder</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Visualize relationships between concepts with interactive mind maps
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Add Node */}
              <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                <h2 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                  Add Concept
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nodeText" className="text-lg font-bold">
                      Concept Text
                    </Label>
                    <Input
                      id="nodeText"
                      placeholder="Enter concept..."
                      value={newNodeText}
                      onChange={(e) => setNewNodeText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addNode()}
                      className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                    />
                  </div>
                  <button
                    onClick={addNode}
                    disabled={!newNodeText.trim()}
                    className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <Plus className="h-5 w-5 inline mr-2" />
                    Add Node
                  </button>
                </div>
              </div>

              {/* Connection Mode */}
              <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Connect Concepts</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="connectionLabel" className="text-lg font-bold">
                      Connection Label (Optional)
                    </Label>
                    <Input
                      id="connectionLabel"
                      placeholder="e.g., 'leads to', 'part of'..."
                      value={connectionLabel}
                      onChange={(e) => setConnectionLabel(e.target.value)}
                      className="border-2 border-black h-12 text-lg font-mono shadow-brutal"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setConnectionMode(!connectionMode)
                      setConnectingFrom(null)
                    }}
                    className={`w-full border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                      connectionMode ? "bg-red-600 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {connectionMode ? "Cancel Connection" : "Start Connecting"}
                  </button>
                  {connectionMode && connectingFrom && (
                    <p className="text-sm font-bold bg-black text-white p-2 border-2 border-black">
                      Click another node to connect
                    </p>
                  )}
                </div>
              </div>

              {/* Map Actions */}
              <div className="bg-red-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Map Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={exportMap}
                    disabled={nodes.length === 0}
                    className="w-full bg-white text-red-600 border-2 border-white px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <Download className="h-4 w-4 inline mr-2" />
                    Export Map
                  </button>
                  <button
                    onClick={clearMap}
                    disabled={nodes.length === 0}
                    className="w-full bg-black text-white border-2 border-white px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4 inline mr-2" />
                    Clear Map
                  </button>
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                <ol className="space-y-2 text-lg">
                  <li>
                    <strong>1.</strong> Add concepts using the text input
                  </li>
                  <li>
                    <strong>2.</strong> Drag nodes to arrange them
                  </li>
                  <li>
                    <strong>3.</strong> Use connection mode to link concepts
                  </li>
                  <li>
                    <strong>4.</strong> Click nodes to select and edit
                  </li>
                  <li>
                    <strong>5.</strong> Export your completed map
                  </li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-purple-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Mapping Tips</h3>
                <ul className="space-y-2 text-lg">
                  <li>• Start with main concepts, then add details</li>
                  <li>• Use clear, concise labels</li>
                  <li>• Group related concepts with colors</li>
                  <li>• Add connection labels for clarity</li>
                  <li>• Review and reorganize regularly</li>
                </ul>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 border-4 border-black shadow-brutal">
                <div className="border-b-2 border-black dark:border-white p-4">
                  <h3 className="text-xl font-black uppercase">Concept Map Canvas</h3>
                  <p className="text-sm">Drag nodes to move them • Click to select • Use connection mode to link</p>
                </div>

                <div
                  ref={canvasRef}
                  className="relative h-96 lg:h-[600px] overflow-hidden cursor-move"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* Render Connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connections.map((connection, index) => {
                      const fromPos = getNodePosition(connection.from)
                      const toPos = getNodePosition(connection.to)
                      const midX = (fromPos.x + toPos.x) / 2
                      const midY = (fromPos.y + toPos.y) / 2

                      return (
                        <g key={index}>
                          <line
                            x1={fromPos.x}
                            y1={fromPos.y}
                            x2={toPos.x}
                            y2={toPos.y}
                            stroke="black"
                            strokeWidth="3"
                            markerEnd="url(#arrowhead)"
                          />
                          {connection.label && (
                            <text
                              x={midX}
                              y={midY - 5}
                              textAnchor="middle"
                              className="text-xs font-bold fill-black dark:fill-white"
                              style={{ fontSize: "12px" }}
                            >
                              {connection.label}
                            </text>
                          )}
                        </g>
                      )
                    })}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                      </marker>
                    </defs>
                  </svg>

                  {/* Render Nodes */}
                  {nodes.map((node) => (
                    <div
                      key={node.id}
                      className={`absolute cursor-pointer select-none ${node.color} text-white border-4 border-black shadow-brutal transition-all ${
                        selectedNode === node.id ? "ring-4 ring-yellow-400" : ""
                      } ${connectingFrom === node.id ? "ring-4 ring-green-400" : ""}`}
                      style={{
                        left: node.x,
                        top: node.y,
                        minWidth: "120px",
                        padding: "8px 12px",
                      }}
                      onMouseDown={(e) => handleMouseDown(e, node.id)}
                      onClick={() => handleNodeClick(node.id)}
                    >
                      <div className="text-center font-bold text-sm leading-tight">
                        {selectedNode === node.id ? (
                          <input
                            type="text"
                            value={node.text}
                            onChange={(e) => updateNodeText(node.id, e.target.value)}
                            onBlur={() => setSelectedNode(null)}
                            onKeyPress={(e) => e.key === "Enter" && setSelectedNode(null)}
                            className="bg-transparent text-white placeholder-white border-none outline-none text-center w-full"
                            autoFocus
                          />
                        ) : (
                          node.text
                        )}
                      </div>
                      {selectedNode === node.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNode(node.id)
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white border-2 border-black rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}

                  {nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Map className="h-16 w-16 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Empty Canvas</h3>
                        <p>Add your first concept to get started!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Concept Map Builder helps you visualize relationships between ideas, topics, and concepts. Create
                  interactive mind maps to better understand complex subjects, plan projects, or organize knowledge.
                  Perfect for brainstorming, studying, and knowledge management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
