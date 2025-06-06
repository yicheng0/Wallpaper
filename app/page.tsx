"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MasonryGrid from "@/components/masonry-grid"
import { type GeneratedImage, getStoredImages } from "@/lib/storage"
import { Sparkles, Zap, Crown, Users } from "lucide-react"

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [recentImages, setRecentImages] = useState<GeneratedImage[]>([])

  useEffect(() => {
    const images = getStoredImages().slice(0, 12)
    setRecentImages(images)
  }, [])

  // Example images data
  const exampleImages: GeneratedImage[] = [
    {
      id: "example-1",
      prompt: "A cute orange cat sitting under cherry blossoms, anime style",
      imageUrl: "/placeholder.svg?height=400&width=300",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-2",
      prompt: "Futuristic city at night with neon lights, cyberpunk style",
      imageUrl: "/placeholder.svg?height=500&width=300",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-3",
      prompt: "Magical forest cottage surrounded by rainbows, fairy tale style",
      imageUrl: "/placeholder.svg?height=350&width=300",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-4",
      prompt: "Colorful nebula in space, sci-fi style",
      imageUrl: "/placeholder.svg?height=450&width=300",
      createdAt: new Date().toISOString(),
    },
  ]

  const displayImages = recentImages.length > 0 ? recentImages : exampleImages

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                {" "}
                Infinite Possibilities{" "}
              </span>
              with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Just describe what you want, AI creates unique artwork for you
            </p>

            {/* Quick Generate */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Describe the image you want, like: a cute cat in a garden..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 h-12 text-gray-900 bg-white/90 border-0 focus:bg-white"
                />
                <Link href={`/generate${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""}`}>
                  <Button size="lg" className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-purple-100">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm">Generated Images</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1K+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology, simple operation, and premium generation quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate images in 30 seconds, no waiting required</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-gray-600">4K resolution, professional-grade artwork</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">No expertise needed, anyone can create art</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {recentImages.length > 0 ? "Latest Creations" : "Featured Artwork"}
            </h2>
            <p className="text-gray-600">
              {recentImages.length > 0 ? "Latest amazing works from our users" : "See what miracles AI can create"}
            </p>
          </div>

          <MasonryGrid images={displayImages} />

          <div className="text-center mt-12">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Creating Your Artwork
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
