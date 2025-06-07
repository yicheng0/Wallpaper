"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface PaywallProps {
  isOpen: boolean
  onClose: () => void
}

export function Paywall({ isOpen, onClose }: PaywallProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-neutral-900 border-neutral-800">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-3 text-white">Daily Limit Reached</h3>
          <p className="text-neutral-400 mb-8">
            Free users can generate up to 3 images per day. Upgrade to Premium for unlimited creations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={onClose} className="flex-1 h-12 border-neutral-700 hover:bg-neutral-800 hover:text-white">
              Maybe Later
            </Button>
            <Link href="/pricing" className="flex-1">
              <Button className="w-full h-12 bg-white text-black hover:bg-neutral-200 font-bold">
                Upgrade Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 