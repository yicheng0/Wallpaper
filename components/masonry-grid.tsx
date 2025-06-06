"use client"

import { useState } from "react"
import type { GeneratedImage } from "@/lib/storage"
import { Download, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MasonryGridProps {
  images: GeneratedImage[]
}

export default function MasonryGrid({ images }: MasonryGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No generated images yet</p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid relative group cursor-pointer"
          onMouseEnter={() => setHoveredId(image.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={image.prompt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />

              {/* Overlay with actions */}
              {hoveredId === image.id && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => downloadImage(image.imageUrl, `ai-art-${image.id}.png`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{image.prompt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                {image.isHighRes && <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full">HD</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
