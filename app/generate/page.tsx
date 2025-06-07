"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MasonryGrid from "@/components/masonry-grid"
import { Paywall } from "@/components/paywall"
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
import { Sparkles, Wand2, Crown } from "lucide-react"
import Link from "next/link"

const allPromptSuggestions = [
    "A cute orange cat sitting under cherry blossoms, anime style",
    "Futuristic city at night with neon lights, cyberpunk style",
    "Magical forest cottage surrounded by rainbows, fairy tale style",
    "Colorful nebula in space, sci-fi style",
    "Ancient Chinese landscape painting, ink wash style",
    "Modern minimalist interior design, Scandinavian style",
    "A majestic lion with a crown of stars, fantasy art",
    "Steampunk-inspired mechanical owl with glowing eyes",
    "Underwater city with bioluminescent creatures, detailed illustration",
    "A lone astronaut on a desolate red planet, cinematic lighting",
    "Surreal portrait of a woman with butterfly wings for hair",
    "Impressionist painting of a rainy day in Paris",
    "A delicious-looking pizza with unusual toppings, hyperrealistic",
    "Vintage travel poster for a trip to Mars",
    "A robot tending to a garden of crystal flowers, concept art",
    "Portrait of a noble knight in ornate armor, digital painting",
    "Haunted forest with twisted trees and a glowing mist",
    "A city in the clouds, utopian architecture",
    "Low-poly illustration of a mountain range at sunrise",
    "An elaborate teacup with a galaxy swirling inside",
];

function getRandomSuggestions(count: number): string[] {
  const shuffled = allPromptSuggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function GeneratePageContent() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [myImages, setMyImages] = useState<GeneratedImage[]>([])
  const [showPaywall, setShowPaywall] = useState(false)
  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const currentUser = getStoredUser()
    setUser(currentUser)
    setMyImages(getStoredImages())
    setPromptSuggestions(getRandomSuggestions(6));

    const urlPrompt = searchParams.get("prompt")
    if (urlPrompt) {
      setPrompt(urlPrompt)
    }
  }, [searchParams])

  const handleGenerate = async () => {
    if (!user) {
      window.location.href = "/auth"
      return
    }

    if (!canGenerateToday(user)) {
      setShowPaywall(true)
      return
    }

    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const imageUrl = await generateImage(prompt.trim())
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        isHighRes: user.isPremium,
      }

      const updatedUser = incrementDailyGenerations(user)
      setStoredUser(updatedUser)
      setUser(updatedUser)
      addStoredImage(newImage)
      setMyImages([newImage, ...myImages])
      setPrompt("")
    } catch (error) {
      console.error("Generation failed:", error)
      alert("Generation failed, please try again")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-3">
            AI Image Generator
          </h1>
          <p className="text-neutral-400">
            Describe in words, let AI create unique artwork for you
          </p>
        </div>

        {user && (
          <Card className="mb-8 bg-neutral-900 border-neutral-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {user.isPremium ? (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-black font-bold">
                      <Crown className="h-4 w-4 mr-1" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 border-none">Free User</Badge>
                  )}
                </div>
                {!user.isPremium && (
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 text-white border-neutral-700 hover:bg-white/20"
                    >
                      Upgrade
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8 bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-neutral-200 mb-3">
                  Image Description
                </label>
                <Textarea
                  placeholder="e.g., A photo of a white fur monster standing in a purple room"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none bg-neutral-950 border-neutral-700 focus:ring-2 focus:ring-neutral-500 text-white placeholder:text-neutral-500 rounded-lg text-base"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full h-12 text-lg bg-white text-black hover:bg-neutral-200 font-bold rounded-lg transition-transform transform hover:scale-105 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:cursor-not-allowed"
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

              <div>
                <p className="text-sm text-neutral-400 mb-3">
                  Or try these suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(suggestion)}
                      className="text-xs bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Paywall
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
        />

        {myImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">My Creations</h2>
            <MasonryGrid images={myImages} />
          </div>
        )}

        {myImages.length === 0 && !isGenerating && (
          <div className="text-center py-12 border-2 border-dashed border-neutral-800 rounded-2xl">
            <Sparkles className="h-16 w-16 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-300 mb-2">
              Your creations will appear here
            </h3>
            <p className="text-neutral-500">
              Enter a description and start your AI art journey!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratePageContent />
    </Suspense>
  )
}
