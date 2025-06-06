"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MasonryGrid from "@/components/masonry-grid"
import {
  type User,
  type GeneratedImage,
  getStoredUser,
  getStoredImages,
  addStoredImage,
  canGenerateToday,
  incrementDailyGenerations,
  setStoredUser,
} from "@/lib/storage"
import { generateImage } from "@/lib/openai"
import { Sparkles, Wand2, Crown, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [myImages, setMyImages] = useState<GeneratedImage[]>([])
  const [showPaywall, setShowPaywall] = useState(false)

  useEffect(() => {
    const currentUser = getStoredUser()
    setUser(currentUser)
    setMyImages(getStoredImages())

    // Get prompt from URL params
    const urlPrompt = searchParams.get("prompt")
    if (urlPrompt) {
      setPrompt(urlPrompt)
    }
  }, [searchParams])

  const handleGenerate = async () => {
    if (!user) {
      // Redirect to auth
      window.location.href = "/auth"
      return
    }

    if (!canGenerateToday(user)) {
      setShowPaywall(true)
      return
    }

    if (!prompt.trim()) {
      alert("Please enter an image description")
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 3000))
      const imageUrl = await generateImage(prompt.trim());

      // Create mock generated image
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        // imageUrl: `/placeholder.svg?height=${400 + Math.floor(Math.random() * 200)}&width=300`,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        isHighRes: user.isPremium,
      }

      // Update user's daily generations
      const updatedUser = incrementDailyGenerations(user)
      setStoredUser(updatedUser)
      setUser(updatedUser)

      // Add to images
      addStoredImage(newImage)
      setMyImages([newImage, ...myImages])

      // Clear prompt
      setPrompt("")
    } catch (error) {
      console.error("Generation failed:", error)
      alert("Generation failed, please try again")
    } finally {
      setIsGenerating(false)
    }
  }

  const promptSuggestions = [
    "A cute orange cat sitting under cherry blossoms, anime style",
    "Futuristic city at night with neon lights, cyberpunk style",
    "Magical forest cottage surrounded by rainbows, fairy tale style",
    "Colorful nebula in space, sci-fi style",
    "Ancient Chinese landscape painting, ink wash style",
    "Modern minimalist interior design, Scandinavian style",
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Generator</h1>
          <p className="text-gray-600">Describe in words, let AI create unique artwork for you</p>
        </div>

        {/* User Status */}
        {user && (
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {user.isPremium ? (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Crown className="h-4 w-4 mr-1" />
                      Premium User
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Free User</Badge>
                  )}
                  <span className="text-sm text-gray-600">
                    {user.isPremium ? "Unlimited generations" : `Daily left: ${Math.max(0, 3 - user.dailyGenerations)}`}
                  </span>
                </div>
                {!user.isPremium && (
                  <Link href="/pricing">
                    <Button variant="outline" size="sm">
                      Upgrade to Premium
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generation Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Description</label>
                <Textarea
                  placeholder="Describe the image you want to generate in detail, like: a cute cat sitting in a garden with butterflies flying around, sunny day, anime style..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>

              {/* Prompt Suggestions */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Try these prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paywall Modal */}
        {showPaywall && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Daily Limit Reached</h3>
                <p className="text-gray-600 mb-6">
                  Free users can generate 3 images per day. Upgrade to Premium for unlimited generations!
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowPaywall(false)} className="flex-1">
                    Try Tomorrow
                  </Button>
                  <Link href="/pricing" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Upgrade Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* My Images */}
        {myImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Artwork</h2>
            <MasonryGrid images={myImages} />
          </div>
        )}

        {myImages.length === 0 && !isGenerating && (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images generated yet</h3>
            <p className="text-gray-600">Enter a description and start your AI art creation journey!</p>
          </div>
        )}
      </div>
    </div>
  )
}
