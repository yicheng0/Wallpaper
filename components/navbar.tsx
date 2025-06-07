"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { type User, getStoredUser } from "@/lib/storage"
import { Sparkles, Crown, Menu, X } from "lucide-react"

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">AI Art Generator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/generate" className="text-neutral-300 hover:text-white transition-colors">
              Generate
            </Link>
            <Link href="/pricing" className="text-neutral-300 hover:text-white transition-colors">
              Pricing
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.isPremium && <Crown className="h-5 w-5 text-yellow-400" />}
                <span className="text-sm text-neutral-400">
                  {user.isPremium ? "Premium" : `Creations Left: ${3 - user.dailyGenerations}`}
                </span>
                <Button variant="outline" size="sm" className="bg-transparent border-neutral-700 hover:bg-neutral-800 hover:text-white">
                  {user.email}
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button className="bg-white text-black hover:bg-neutral-200 font-bold">Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:bg-neutral-800">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-neutral-300 hover:text-white">
                Home
              </Link>
              <Link href="/generate" className="text-neutral-300 hover:text-white">
                Generate
              </Link>
              <Link href="/pricing" className="text-neutral-300 hover:text-white">
                Pricing
              </Link>
              {user ? (
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex items-center space-x-2 mb-2">
                    {user.isPremium && <Crown className="h-4 w-4 text-yellow-400" />}
                    <span className="text-sm text-neutral-300">{user.email}</span>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {user.isPremium ? "Premium User" : `Creations Left: ${3 - user.dailyGenerations}`}
                  </span>
                </div>
              ) : (
                <Link href="/auth">
                  <Button className="w-full bg-white text-black hover:bg-neutral-200 font-bold">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
