export interface GeneratedImage {
  id: string
  prompt: string
  imageUrl: string
  createdAt: string
  isHighRes?: boolean
}

export interface User {
  id: string
  email: string
  isPremium: boolean
  dailyGenerations: number
  lastGenerationDate: string
}

export const storageKeys = {
  user: "ai-generator-user",
  images: "ai-generator-images",
  generations: "ai-generator-generations",
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(storageKeys.user)
  return stored ? JSON.parse(stored) : null
}

export function setStoredUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem(storageKeys.user, JSON.stringify(user))
}

export function getStoredImages(): GeneratedImage[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(storageKeys.images)
  return stored ? JSON.parse(stored) : []
}

export function addStoredImage(image: GeneratedImage): void {
  if (typeof window === "undefined") return
  const images = getStoredImages()
  images.unshift(image)
  localStorage.setItem(storageKeys.images, JSON.stringify(images))
}

export function canGenerateToday(user: User): boolean {
  const today = new Date().toDateString()
  if (user.lastGenerationDate !== today) {
    return true
  }
  return user.isPremium || user.dailyGenerations < 3
}

export function incrementDailyGenerations(user: User): User {
  const today = new Date().toDateString()
  if (user.lastGenerationDate !== today) {
    return {
      ...user,
      dailyGenerations: 1,
      lastGenerationDate: today,
    }
  }
  return {
    ...user,
    dailyGenerations: user.dailyGenerations + 1,
  }
}
