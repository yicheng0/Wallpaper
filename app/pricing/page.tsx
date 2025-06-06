"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type User, getStoredUser, setStoredUser } from "@/lib/storage"
import { Check, Crown, Sparkles, Zap, Star } from "lucide-react"

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  const handleUpgrade = async () => {
    if (!user) {
      window.location.href = "/auth"
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update user to premium
    const updatedUser: User = {
      ...user,
      isPremium: true,
    }

    setStoredUser(updatedUser)
    setUser(updatedUser)
    setIsProcessing(false)

    alert("Upgrade successful! Welcome to Premium!")
  }

  const features = {
    free: ["3 free generations daily", "Standard quality (512x512)", "Basic style options", "Community gallery access"],
    premium: [
      "Unlimited generations",
      "4K ultra-high resolution",
      "50+ professional styles",
      "Priority generation queue",
      "Batch generation",
      "Commercial use license",
      "Dedicated customer support",
      "Early access to new features",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Creative Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From free experience to professional creation, there's a plan for everyone
          </p>
        </div>

        {/* Current Status */}
        {user && (
          <div className="text-center mb-8">
            <Badge
              className={`text-lg px-4 py-2 ${
                user.isPremium ? "bg-gradient-to-r from-yellow-400 to-orange-500" : "bg-gray-100 text-gray-700"
              }`}
            >
              {user.isPremium ? (
                <>
                  <Crown className="h-5 w-5 mr-2" />
                  Current: Premium User
                </>
              ) : (
                <>
                  <Star className="h-5 w-5 mr-2" />
                  Current: Free User
                </>
              )}
            </Badge>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 border-gray-200">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                $0
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Perfect for first-time users</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" disabled={user && !user.isPremium}>
                {user && !user.isPremium ? "Current Plan" : "Get Started Free"}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-purple-500 shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">Recommended</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                $29
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mt-2">Best choice for professional creators</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleUpgrade}
                disabled={isProcessing || (user && user.isPremium)}
              >
                {isProcessing ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : user && user.isPremium ? (
                  "Current Plan"
                ) : (
                  "Upgrade Now"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use generated images commercially?</h3>
              <p className="text-gray-600">
                Premium users have commercial use license and can use generated images for business purposes. Free users
                are limited to personal use only.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. After cancellation, you can still use premium
                features until the end of your current billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference in generation speed?</h3>
              <p className="text-gray-600">
                Premium users enjoy priority generation queue with faster processing. Free users may experience slight
                delays during peak hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
