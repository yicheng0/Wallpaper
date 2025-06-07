"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MasonryGrid from "@/components/masonry-grid"
import { type GeneratedImage, getStoredImages } from "@/lib/storage"
import { ArrowRight, Zap, Crown, Users } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Re-implement FeatureCard directly in the file
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

function FeatureCard({ icon, title, description, bgColor }: FeatureCardProps) {
  return (
    <div className={`p-8 rounded-2xl ${bgColor} border border-white/10`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/5`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </div>
  );
}

const faqItems = [
  {
    question: "What is this AI Art Generator?",
    answer: "This is a tool that uses artificial intelligence to create unique images from text descriptions. You can describe anything you can imagine, and the AI will generate a visual representation of it.",
  },
  {
    question: "How does it work?",
    answer: "Our generator uses advanced deep learning models (Generative Adversarial Networks or GANs, and Diffusion Models) that have been trained on vast datasets of images. When you enter a prompt, the AI interprets your words and synthesizes a new image based on its training.",
  },
  {
    question: "Is it free to use?",
    answer: "We offer a free tier that allows you to generate a certain number of images per day. For unlimited generations, higher resolution images, and access to premium features, you can upgrade to our Pro plan.",
  },
  {
    question: "Can I use the generated images for commercial purposes?",
    answer: "Yes, images created with our Pro plan can be used for commercial purposes. Images created under the free plan are for personal use only. Please refer to our terms of service for more details.",
  },
];

function FaqSection() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-neutral-400 mt-4">
            Find answers to common questions about our AI Art Generator.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="border-neutral-800">
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-400">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

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
      imageUrl: "/placeholder.svg?height=300&width=225",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-2",
      prompt: "Futuristic city at night with neon lights, cyberpunk style",
      imageUrl: "/placeholder.svg?height=375&width=225",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-3",
      prompt: "Magical forest cottage surrounded by rainbows, fairy tale style",
      imageUrl: "/placeholder.svg?height=263&width=225",
      createdAt: new Date().toISOString(),
    },
    {
      id: "example-4",
      prompt: "Colorful nebula in space, sci-fi style",
      imageUrl: "/placeholder.svg?height=338&width=225",
      createdAt: new Date().toISOString(),
    },
  ]

  const displayImages = recentImages.length > 0 ? recentImages : exampleImages

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-animated-gradient">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Create Stunning AI Art
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-neutral-300">
            Turn your ideas into visually striking images with our advanced AI generator.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="e.g., A futuristic city skyline at sunset"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 h-14 text-lg bg-neutral-900 border border-neutral-700 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-black text-white placeholder:text-neutral-500 rounded-lg"
              />
              <Link href={`/generate${prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""}`}>
                <Button size="lg" className="w-full sm:w-auto h-14 text-lg bg-white text-black hover:bg-neutral-200 font-bold rounded-lg transition-transform transform hover:scale-105">
                  Generate <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Our AI Generator Stands Out</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              We provide a seamless and powerful experience for creating digital art.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-white" />}
              title="Lightning Fast"
              description="Generate high-quality images in seconds. No more waiting."
              bgColor="bg-blue-500/10"
            />
            <FeatureCard
              icon={<Crown className="h-8 w-8 text-white" />}
              title="Premium Quality"
              description="Create stunning, high-resolution artwork for any purpose."
              bgColor="bg-purple-500/10"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-white" />}
              title="User-Friendly"
              description="Intuitive and easy to use, perfect for both beginners and experts."
              bgColor="bg-green-500/10"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {recentImages.length > 0 ? "Latest Creations" : "Featured Artwork"}
            </h2>
            <p className="text-neutral-400">
              {recentImages.length > 0 ? "Latest amazing works from our users" : "See what miracles AI can create"}
            </p>
          </div>

          <MasonryGrid images={displayImages} />

          <div className="text-center mt-12">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-neutral-200 font-bold rounded-lg transition-transform transform hover:scale-105"
              >
                Start Creating Your Artwork
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  )
}
