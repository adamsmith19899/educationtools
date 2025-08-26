"use client"

import { useState, useEffect } from "react"
import { BookOpen, Plus, RotateCcw, X, Shuffle, Download, Gamepad, Grid, List } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Sidebar from "@/components/sidebar"
import ScrollToTop from "@/components/scroll-to-top"
import { AlertCircle } from "lucide-react";

interface Card {
  id: string
  front: string
  back: string
  isFlipped: boolean
  isMatched: boolean
}

interface MemoryGame {
  id: string
  title: string
  cards: Card[]
  gridSize: 4 | 6 | 8
}

export default function MemoryGameGenerator() {
  const [games, setGames] = useState<MemoryGame[]>([])
  const [currentGame, setCurrentGame] = useState<number | null>(null)
  const [gameMode, setGameMode] = useState<"create" | "play">("play")
  const [isAdding, setIsAdding] = useState(false)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  
  // Form states
  const [title, setTitle] = useState("")
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const [gridSize, setGridSize] = useState<4 | 6 | 8>(4)
  const [flipSpeed, setFlipSpeed] = useState("normal")

  const [gameCards, setGameCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Create a new game
  const createGame = () => {
    if (title && gameCards.length >= 2) {
      const newGame: MemoryGame = {
        id: Date.now().toString(),
        title: title.trim(),
        cards: gameCards.map(card => ({ ...card, isFlipped: false, isMatched: false })),
        gridSize
      }
      setGames([...games, newGame])
      resetForm()
      setIsAdding(false)
    }
  }

  // Update existing game
  const updateGame = () => {
    if (currentGame !== null && title && gameCards.length >= 2) {
      const updatedGames = [...games]
      updatedGames[currentGame] = {
        ...updatedGames[currentGame],
        title: title.trim(),
        cards: gameCards,
        gridSize
      }
      setGames(updatedGames)
      resetForm()
      setIsAdding(false)
    }
  }

  // Add a card to the current game
  const addCard = () => {
    if (front && back) {
      const newCard: Card = {
        id: Date.now().toString(),
        front: front.trim(),
        back: back.trim(),
        isFlipped: false,
        isMatched: false
      }
      
      if (editingCardId) {
        // Update existing card
        setGameCards(gameCards.map(card => 
          card.id === editingCardId 
            ? newCard 
            : card
        ))
        setEditingCardId(null)
      } else {
        // Add new card
        setGameCards([...gameCards, newCard])
      }
      
      setFront("")
      setBack("")
    }
  }

  // Edit a card
  const editCard = (card: Card) => {
    setFront(card.front)
    setBack(card.back)
    setEditingCardId(card.id)
  }

  // Delete a card
  const deleteCard = (id: string) => {
    setGameCards(gameCards.filter(card => card.id !== id))
    if (editingCardId === id) {
      setEditingCardId(null)
      setFront("")
      setBack("")
    }
  }

  // Delete a game
  const deleteGame = (index: number) => {
    const updatedGames = games.filter((_, i) => i !== index)
    setGames(updatedGames)
    if (currentGame !== null && index <= currentGame) {
      setCurrentGame(prev => prev !== null ? Math.max(0, prev - 1) : null)
    }
    if (updatedGames.length === 0) {
      setGameMode("create")
    }
  }

  // Start playing a game
  const startGame = (index: number) => {
    setCurrentGame(index)
    const game = games[index]
    
    // Create pairs and shuffle
    const cardPairs = [...game.cards, ...game.cards.map(card => ({ ...card, id: card.id + "_copy" }))]
    const shuffledCards = shuffleArray(cardPairs.map(card => ({ ...card, isFlipped: false, isMatched: false })))
    
    setGameCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameStarted(true)
    setGameCompleted(false)
    setGameMode("play")
  }

  // Reset the current game
  const resetCurrentGame = () => {
    if (currentGame !== null) {
      startGame(currentGame)
    }
  }

  // Handle card click during gameplay
  const handleCardClick = (index: number) => {
    // Prevent clicking if already two cards are flipped or if the card is already matched/flipped
    if (flippedCards.length === 2 || 
        gameCards[index].isMatched || 
        flippedCards.includes(index)) {
      return
    }

    // Flip the card
    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)
    setMoves(prev => prev + 1)

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = gameCards[firstIndex]
      const secondCard = gameCards[secondIndex]
      
      // Create a copy of cards to update
      const updatedCards = [...gameCards]
      
      if (firstCard.front === secondCard.front && firstCard.back === secondCard.back ||
          firstCard.front === secondCard.back && firstCard.back === secondCard.front) {
        // Cards match
        updatedCards[firstIndex] = { ...updatedCards[firstIndex], isMatched: true }
        updatedCards[secondIndex] = { ...updatedCards[secondIndex], isMatched: true }
        setGameCards(updatedCards)
        setMatchedPairs(prev => prev + 1)
        
        // Check if all pairs are matched
        if (matchedPairs + 1 === gameCards.length / 2) {
          setTimeout(() => setGameCompleted(true), 500)
        }
        
        // Reset flipped cards after delay
        setTimeout(() => setFlippedCards([]), 1000)
      } else {
        // Cards don't match - flip back after delay
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Shuffle array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Export games data
  const exportGames = () => {
    const dataStr = JSON.stringify(games, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "memory-games.json"
    link.click()
  }

  // Import games data
  const importGames = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedGames = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedGames)) {
          setGames(importedGames)
        }
      } catch (error) {
        console.error("Error parsing imported data")
      }
    }
    reader.readAsText(file)
  }

  // Reset form
  const resetForm = () => {
    setTitle("")
    setFront("")
    setBack("")
    setGridSize(4)
    setGameCards([])
    setEditingCardId(null)
    setCurrentGame(null)
    setIsAdding(false)
  }

  // Get grid classes based on size
  const getGridClasses = () => {
    switch (gridSize) {
      case 4: return "grid-cols-4"
      case 6: return "grid-cols-6"
      case 8: return "grid-cols-8"
      default: return "grid-cols-4"
    }
  }

  // Calculate game completion percentage
  const getCompletionPercentage = () => {
    if (currentGame === null) return 0
    const totalPairs = games[currentGame].cards.length
    return Math.round((matchedPairs / totalPairs) * 100)
  }

  return (
    <div className="min-h-screen bg-background font-mono">
      <Sidebar />
      <ScrollToTop />

      <div className="lg:pr-80 lg:pl-0">
        <div className="container py-8 px-6">
          {/* Header with Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Memory Game Generator",
                description: "Create custom memory matching games for learning and entertainment",
                url: "https://usnewse.com/memory-game-generator",
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
              <Gamepad className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-black uppercase tracking-tighter">Memory Game Generator</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Create custom memory matching games for learning and entertainment
            </p>
          </div>

          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setGameMode("play")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                gameMode === "play" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Play Mode
            </button>
            <button
              onClick={() => setGameMode("create")}
              className={`px-6 py-3 border-4 border-black font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all ${
                gameMode === "create" 
                  ? "bg-green-500 text-white" 
                  : "bg-white dark:bg-gray-800 text-black dark:text-white"
              }`}
            >
              Create Mode
            </button>
          </div>

          {gameMode === "create" ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Create Section */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h2 className="text-2xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    {isAdding ? "Edit Game" : "Create New Game"}
                  </h2>

                  {!isAdding ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-bold">
                          Game Title
                        </Label>
                        <input
                          type="text"
                          id="title"
                          placeholder="Enter game title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="gridSize" className="text-lg font-bold">
                            Grid Size
                          </Label>
                          <select
                            id="gridSize"
                            value={gridSize}
                            onChange={(e) => setGridSize(Number(e.target.value) as 4 | 6 | 8)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          >
                            <option value={4}>4×4 (16 cards)</option>
                            <option value={6}>6×6 (36 cards)</option>
                            <option value={8}>8×8 (64 cards)</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="flipSpeed" className="text-lg font-bold">
                            Flip Speed
                          </Label>
                          <select
                            id="flipSpeed"
                            value={flipSpeed}
                            onChange={(e) => setFlipSpeed(e.target.value)}
                            className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                          >
                            <option value="slow">Slow</option>
                            <option value="normal">Normal</option>
                            <option value="fast">Fast</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsAdding(true)
                          setGameCards([])
                        }}
                        disabled={!title}
                        className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 inline mr-2" />
                        Start Building Game
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-lg font-bold">
                          Game Title
                        </Label>
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gridSize" className="text-lg font-bold">
                          Grid Size
                        </Label>
                        <select
                          id="gridSize"
                          value={gridSize}
                          onChange={(e) => setGridSize(Number(e.target.value) as 4 | 6 | 8)}
                          className="w-full border-2 border-black p-3 text-lg font-mono shadow-brutal"
                        >
                          <option value={4}>4×4 (16 cards)</option>
                          <option value={6}>6×6 (36 cards)</option>
                          <option value={8}>8×8 (64 cards)</option>
                        </select>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black p-4">
                        <h3 className="text-lg font-bold mb-3">Add Card Pair</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="front" className="text-md font-bold">
                              Front Side
                            </Label>
                            <input
                              type="text"
                              id="front"
                              placeholder="Enter text for front side..."
                              value={front}
                              onChange={(e) => setFront(e.target.value)}
                              className="w-full border-2 border-black p-2 font-mono"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="back" className="text-md font-bold">
                              Back Side
                            </Label>
                            <input
                              type="text"
                              id="back"
                              placeholder="Enter text for back side..."
                              value={back}
                              onChange={(e) => setBack(e.target.value)}
                              className="w-full border-2 border-black p-2 font-mono"
                            />
                          </div>
                          
                          <button
                            onClick={addCard}
                            disabled={!front || !back}
                            className="w-full bg-purple-600 text-white border-2 border-black px-4 py-2 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {editingCardId ? "Update" : "Add"} Card Pair
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={currentGame !== null ? updateGame : createGame}
                          disabled={!title || gameCards.length < 2}
                          className="flex-1 bg-green-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {currentGame !== null ? "Update" : "Create"} Game
                        </button>
                        <button
                          onClick={resetForm}
                          className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* How to Use */}
                <div className="bg-yellow-500 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">How to Use</h3>
                  <ol className="space-y-2 text-lg">
                    <li><strong>1.</strong> Create a new memory game with a title and grid size</li>
                    <li><strong>2.</strong> Add card pairs with front and back content</li>
                    <li><strong>3.</strong> Save your game and play it in Play Mode</li>
                    <li><strong>4.</strong> Match pairs by remembering card positions</li>
                    <li><strong>5.</strong> Export your games for backup or sharing</li>
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-lime-400 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">Game Tips</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• Use related pairs like vocabulary words and definitions</li>
                    <li>• Include images in your card text for visual learning</li>
                    <li>• Start with smaller grids if you're a beginner</li>
                    <li>• Challenge yourself with larger grids as you improve</li>
                    <li>• Play regularly to improve your memory and concentration</li>
                  </ul>
                </div>
              </div>

              {/* Game List */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                    Your Memory Games ({games.length})
                  </h3>
                  
                  {games.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Gamepad className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No games created yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {games.map((game, idx) => (
                        <div key={game.id} className="border-2 border-black p-4 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{game.title}</h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setCurrentGame(idx)
                                  setTitle(game.title)
                                  setGameCards(game.cards.filter((_, i) => i < game.cards.length / 2)) // Show only unique cards
                                  setGridSize(game.gridSize)
                                  setIsAdding(true)
                                }}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => deleteGame(idx)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-sm mb-3">
                            <div className="flex justify-between">
                              <span>Size: {game.gridSize}×{game.gridSize}</span>
                              <span>Cards: {game.cards.length}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => startGame(idx)}
                            className="w-full bg-green-600 text-white border-2 border-black py-2 font-bold hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Play Game
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Current Game Cards */}
                {isAdding && (
                  <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                    <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-black dark:border-white pb-2">
                      Card Pairs ({gameCards.length})
                    </h3>
                    
                    {gameCards.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No card pairs added yet
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {gameCards.filter((_, i) => i < gameCards.length / 2).map((card) => (
                          <div key={card.id} className="border-2 border-black p-3 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                            <div className="flex-1">
                              <div className="font-bold text-sm">Front: {card.front}</div>
                              <div className="text-sm">Back: {card.back}</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => editCard(card)}
                                className="bg-blue-600 text-white border border-black p-1 hover:bg-blue-700 transition-colors"
                              >
                                <RotateCcw className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => deleteCard(card.id)}
                                className="bg-red-600 text-white border border-black p-1 hover:bg-red-700 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Play Mode */
            <div className="space-y-6">
              {!gameStarted ? (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <h3 className="text-xl font-black mb-6 uppercase border-b-2 border-black dark:border-white pb-2">
                    Select a Memory Game to Play
                  </h3>
                  
                  {games.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No games available. Please create some in Create Mode.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {games.map((game, idx) => (
                        <div key={game.id} className="border-2 border-black p-6 bg-gray-50 dark:bg-gray-800">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-xl font-bold">{game.title}</h4>
                            <span className="text-sm font-bold border border-black px-3 py-1">
                              {game.gridSize}×{game.gridSize}
                            </span>
                          </div>
                          
                          <div className="grid gap-2 mb-4" style={{gridTemplateColumns: `repeat(${Math.min(4, game.gridSize)}, 1fr)`}}>
                            {game.cards.slice(0, Math.min(8, game.cards.length / 2)).map((card, i) => (
                              <div key={i} className="border border-gray-300 dark:border-gray-600 p-2 text-xs truncate">
                                {card.front} → {card.back}
                              </div>
                            ))}
                            {game.cards.length / 2 > 8 && (
                              <div className="border border-gray-300 dark:border-gray-600 p-2 text-xs text-center">
                                +{game.cards.length / 2 - 8} more pairs
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => startGame(idx)}
                            className="w-full bg-blue-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                          >
                            Start Game
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 border-4 border-black p-6 shadow-brutal">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2">
                      {games[currentGame || 0]?.title}
                    </h3>
                    
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="font-bold text-lg">{moves}</div>
                        <div className="text-xs">Moves</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{matchedPairs} / {gameCards.length / 2}</div>
                        <div className="text-xs">Pairs Found</div>
                      </div>
                    </div>
                  </div>

                  {/* Game Grid */}
                  <div className={`grid gap-2 ${getGridClasses()} mb-6 aspect-square`}>
                    {gameCards.map((card, index) => {
                      const isFlipped = flippedCards.includes(index) || card.isMatched
                      const isInactive = card.isMatched && !flippedCards.includes(index)
                      
                      return (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(index)}
                          disabled={isInactive}
                          className={`relative w-full aspect-square transition-transform duration-300 ${
                            isFlipped 
                              ? "rotate-y-180" 
                              : ""
                          } ${isInactive ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:shadow-brutal"}`}
                          style={{ 
                            transformStyle: "preserve-3d",
                            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                          }}
                        >
                          {/* Card Front */}
                          <div 
                            className={`absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-2 text-center bg-white border-2 border-black ${
                              isInactive ? "bg-gray-200" : ""
                            }`}
                            style={{ 
                              backfaceVisibility: "hidden"
                            }}
                          >
                            <span className="text-sm font-bold">{card.front}</span>
                          </div>
                          
                          {/* Card Back */}
                          <div 
                            className={`absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-2 text-center bg-blue-600 text-white border-2 border-black transform rotate-y-180`}
                            style={{ 
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)"
                            }}
                          >
                            <span className="text-sm font-bold">{card.back}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Game Controls */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={resetCurrentGame}
                      className="bg-gray-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      <RotateCcw className="h-5 w-5 inline mr-2" />
                      Restart
                    </button>
                    
                    <button
                      onClick={() => {
                        setGameStarted(false)
                        setGameMode("create")
                      }}
                      className="bg-red-600 text-white border-4 border-black px-6 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      Exit Game
                    </button>
                  </div>

                  {/* Completion Message */}
                  {gameCompleted && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white dark:bg-gray-900 border-4 border-black p-8 shadow-brutal text-center">
                        <h3 className="text-2xl font-black mb-4">Congratulations!</h3>
                        <p className="text-xl mb-4">You've completed the game!</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="border-2 border-black p-4">
                            <div className="font-black text-2xl">{moves}</div>
                            <div className="font-bold">Moves</div>
                          </div>
                          <div className="border-2 border-black p-4">
                            <div className="font-black text-2xl">{Math.round(moves / (gameCards.length / 2))}</div>
                            <div className="font-bold">Efficiency</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const modal = document.querySelector('.fixed.inset-0')
                            if (modal) modal.remove()
                            resetCurrentGame()
                          }}
                          className="bg-green-600 text-white border-4 border-black px-8 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                        >
                          Play Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {games.length > 0 && (
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={exportGames}
                    className="bg-orange-500 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  
                  <label className="bg-purple-600 text-white border-4 border-black px-4 py-3 font-bold shadow-brutal cursor-pointer hover:translate-y-1 hover:shadow-none transition-all">
                    <Download className="h-5 w-5 inline mr-2" />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importGames}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Description Section */}
              <div className="bg-blue-600 text-white border-4 border-black p-6 shadow-brutal">
                <h3 className="text-xl font-black mb-4 uppercase border-b-2 border-white pb-2">Description</h3>
                <p className="text-lg">
                  The Memory Game Generator allows you to create custom matching games for education and entertainment. 
                  Design games with your own content, from vocabulary pairs to historical facts, and improve your 
                  memory and cognitive skills through engaging gameplay. Perfect for students, teachers, and anyone 
                  looking to boost their brain power with fun, personalized challenges.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
