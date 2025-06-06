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
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">AI Art Generator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/generate" className="text-gray-700 hover:text-purple-600 transition-colors">
              Generate
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Pricing
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {user.isPremium && <Crown className="h-5 w-5 text-yellow-500" />}
                <span className="text-sm text-gray-600">
                  {user.isPremium ? "Premium User" : `Daily Left: ${3 - user.dailyGenerations}`}
                </span>
                <Button variant="outline" size="sm">
                  {user.email}
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link href="/generate" className="text-gray-700 hover:text-purple-600">
                Generate
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-purple-600">
                Pricing
              </Link>
              {user ? (
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 mb-2">
                    {user.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {user.isPremium ? "Premium User" : `Daily Left: ${3 - user.dailyGenerations}`}
                  </span>
                </div>
              ) : (
                <Link href="/auth">
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
