"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function AISearchBar() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    router.push(`/search?ai=${encodeURIComponent(prompt.trim())}`)
  }

  const suggestions = [
    "Something like Breaking Bad",
    "Scary movies from the 90s",
    "Romantic comedies set in Europe",
    "Sci-fi series with mind-bending plots",
  ]

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <Sparkles size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to watch..."
          className="w-full bg-zinc-800/80 backdrop-blur text-white pl-11 pr-32 py-4 rounded-2xl border border-zinc-700 focus:outline-none focus:border-red-500 transition text-sm"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-xl transition"
        >
          {loading ? "Searching..." : "Ask AI"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setPrompt(s)}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-full border border-zinc-700 transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}