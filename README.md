# AI Image Generator MVP

This is a frontend prototype for an AI Image Generator web application, built with Next.js, TypeScript, and Tailwind CSS. It provides a realistic user interface and experience for a service that generates images from text prompts.

The key feature of this project is its focus on a polished and intuitive frontend, demonstrating the user flow from landing page to image generation and viewing the gallery. It's designed to be a solid foundation that can later be integrated with a real backend and AI image generation model.

## ✨ Features

- **Modern & Responsive UI**: Built with Tailwind CSS and Shadcn UI for a clean and responsive design that works on all devices.
- **Simulated Image Generation**: A complete user flow for generating images from text prompts. The generation process is simulated with a delay to mimic a real AI model.
- **Freemium User Model**: A mock user system with "Free" and "Premium" tiers, managed via browser local storage.
  - **Free Users**: Can generate up to 3 images per day.
  - **Premium Users**: Have unlimited generation capabilities.
- **Image Gallery**: A beautiful masonry-style grid to display generated images.
- **Client-Side Storage**: Uses local storage to persist user data and generated images across sessions.
- **Prompt Suggestions**: Provides users with example prompts to inspire creativity.
- **URL-based Prompts**: Share a link with a pre-filled prompt to the generation page.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-image-generator-mvp.git
    cd ai-image-generator-mvp
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🔧 Project Structure

The project follows the standard Next.js App Router structure.

- `app/`: Contains all the routes and pages.
  - `(home)/page.tsx`: The main landing page.
  - `generate/page.tsx`: The core image generation interface.
  - `pricing/page.tsx`: The page for upgrading to premium (UI only).
  - `auth/page.tsx`: A mock authentication page.
- `components/`: Contains shared React components used throughout the application (e.g., `MasonryGrid`).
- `lib/`: Contains utility functions, including the `storage.ts` file for managing local storage.
- `hooks/`: For custom React hooks.
- `public/`: For static assets like images and icons.
- `styles/`: Contains global CSS styles.

## 💡 Future Integration (Backend)

This frontend-only project is set up for easy integration with a backend service. Here's how the `handleGenerate` function in `app/generate/page.tsx` could be modified:

```typescript
// app/generate/page.tsx

const handleGenerate = async () => {
  // ... (user checks)

  setIsGenerating(true);

  try {
    // Replace the promise timeout with a real API call
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const newImage = await response.json(); // { id, prompt, imageUrl, ... }

    // ... (update state with the new image)
  } catch (error) {
    console.error("Generation failed:", error);
    alert("Generation failed, please try again");
  } finally {
    setIsGenerating(false);
  }
};
``` 