"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"

function AISearchBarContent() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => { setLoading(false) }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || loading) return
    setLoading(true)
    router.push(`/search?ai=${encodeURIComponent(prompt.trim())}`)
  }

  const suggestions = [
    "Like Breaking Bad",
    "Scary 90s movies",
    "Rom-coms in Europe",
    "Mind-bending sci-fi",
  ]

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit} className="relative search-focus rounded-2xl">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Sparkles size={16} className="text-(--gold)" />
          <span className="text-zinc-500 text-xs font-medium hidden sm:block">AI Search</span>
          <span className="w-px h-4 bg-white/10 hidden sm:block" />
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to watch..."
          disabled={loading}
          className="w-full bg-black/60 backdrop-blur-md text-white pl-28 sm:pl-32 pr-28 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-(--gold)/40 transition text-sm placeholder:text-zinc-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-(--gold) hover:bg-(--gold-dim) disabled:opacity-40 text-black font-semibold text-xs px-4 py-2 rounded-xl transition"
        >
          {loading ? "Searching..." : "Ask AI"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => setPrompt(s)} disabled={loading}
            className="bg-white/5 hover:bg-white/10 border border-white/8 disabled:opacity-40 text-zinc-400 hover:text-white text-xs px-3 py-1.5 rounded-full transition">
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AISearchBar() {
  return (
    <Suspense fallback={<div className="h-14 rounded-2xl bg-white/5 animate-pulse" />}>
      <AISearchBarContent />
    </Suspense>
  )
}