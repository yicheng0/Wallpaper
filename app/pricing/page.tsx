"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { type User, getStoredUser } from "@/lib/storage"
import { Crown, Star } from "lucide-react"
import { PricingTab } from "@/components/pricing-tab"

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Main Content */}
      <div className="relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        {/* Radial Gradient */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Choose Your Creative Plan
            </h1>
            <p className="text-2xl text-neutral-300 max-w-3xl mx-auto">
              From free experience to professional creation, there's a plan for everyone
            </p>
            <p className="mt-4 text-lg text-neutral-400">
              专业级AI创作工具
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Already joined by 100,000+ creators
            </p>
          </div>

          {/* Current Status */}
          {user && (
            <div className="text-center mb-12">
              <Badge
                className={`text-lg px-6 py-3 border border-white/10 ${
                  user.isPremium
                    ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 text-yellow-300"
                    : "bg-white/5 text-neutral-300"
                }`}
              >
                {user.isPremium ? (
                  <>
                    <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                    Current: Premium User
                  </>
                ) : (
                  <>
                    <Star className="h-5 w-5 mr-2 text-neutral-400" />
                    Current: Free User
                  </>
                )}
              </Badge>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="max-w-4xl mx-auto">
            <PricingTab />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
              <p className="text-neutral-300 mb-4">"The AI image generation is mind-blowing. The quality is top-notch and it's so easy to use. A must-have for any creative professional."</p>
              <p className="font-semibold text-white">- Sarah J.</p>
            </div>
            <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
              <p className="text-neutral-300 mb-4">"I've saved countless hours on my projects. The premium features are worth every penny. Highly recommended!"</p>
              <p className="font-semibold text-white">- Mike R.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2 text-lg">Can I use generated images commercially?</h3>
            <p className="text-neutral-400">
              Premium users have commercial use license and can use generated images for business purposes. Free users
              are limited to personal use only.
            </p>
          </div>
          <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2 text-lg">Can I cancel my subscription anytime?</h3>
            <p className="text-neutral-400">
              Yes, you can cancel your subscription at any time. After cancellation, you can still use premium features
              until the end of your current billing cycle.
            </p>
          </div>
          <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2 text-lg">What's the difference in generation speed?</h3>
            <p className="text-neutral-400">
              Premium users enjoy priority generation queue with faster processing. Free users may experience slight
              delays during peak hours.
            </p>
          </div>
          <div className="bg-neutral-900/70 border border-white/10 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-2 text-lg">Is there a money-back guarantee?</h3>
            <p className="text-neutral-400">
              Yes, we offer a 7-day money-back guarantee for new Premium subscribers. If you're not satisfied, you can request a full refund within 7 days of your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
