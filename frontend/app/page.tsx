"use client"
import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, Sparkles, ArrowRight, Play } from "lucide-react"

function SearchSection() {
  const router = useRouter()
  const [mode, setMode] = useState<"normal" | "ai">("ai")
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    if (mode === "ai") {
      router.push(`/search?ai=${encodeURIComponent(query.trim())}`)
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="w-full max-w-xl space-y-3">
      {/* Mode toggle */}
      <div className="flex items-center bg-white/5 border border-white/8 rounded-xl p-1 w-fit">
        <button
          onClick={() => setMode("ai")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition ${
            mode === "ai"
              ? "bg-(--gold) text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles size={12} />
          AI Search
        </button>
        <button
          onClick={() => setMode("normal")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition ${
            mode === "normal"
              ? "bg-white/15 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Search size={12} />
          Normal
        </button>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {mode === "ai"
            ? <Sparkles size={16} className="text-(--gold)" />
            : <Search size={16} className="text-zinc-400" />
          }
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            mode === "ai"
              ? "Describe what you want to watch..."
              : "Search movies or TV shows..."
          }
          className="w-full bg-white/5 backdrop-blur border border-white/10 text-white pl-11 pr-28 py-4 rounded-2xl focus:outline-none focus:border-(--gold)/40 transition text-sm placeholder:text-zinc-500"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 disabled:opacity-40 text-black font-semibold text-xs px-4 py-2 rounded-xl transition ${
            mode === "ai"
              ? "bg-(--gold) hover:bg-(--gold-dim)"
              : "bg-white hover:bg-zinc-200"
          }`}
        >
          {mode === "ai" ? "Ask AI" : "Search"}
        </button>
      </form>

      {/* Mode hint */}
      <p className="text-zinc-600 text-xs px-1">
        {mode === "ai"
          ? "AI mode understands natural language — try \"something like Interstellar\" or \"dark crime dramas\""
          : "Normal mode searches by title, actor, or keyword"
        }
      </p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">

      {/* Subtle background texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,197,24,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,197,24,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Main content — centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative z-10">
        <div className="w-full max-w-xl space-y-10">

          {/* Logo + Brand */}
          <div className="flex flex-col items-center gap-4 text-center">
            <img
            src="/cinelyt_logo.png"
            alt="Cinelyt"
            className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="font-display text-5xl text-white tracking-wide">CINELYT</h1>
              <p className="text-zinc-500 text-sm mt-1">Find your next obsession</p>
            </div>
          </div>

          {/* Search */}
          <Suspense fallback={<div className="h-16 rounded-2xl bg-white/5 animate-pulse" />}>
            <SearchSection />
          </Suspense>

          {/* Watch Now CTA */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/home"
              className="flex items-center gap-2 bg-(--gold) hover:bg-(--gold-dim) text-black font-bold text-sm px-8 py-3.5 rounded-2xl transition group"
            >
              <Play size={16} className="fill-black" />
              Watch Now
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-zinc-700 text-xs">Browse trending movies and TV shows</p>
          </div>

          {/* About */}
          <div className="border-t border-white/5 pt-8 text-center space-y-2">
            <p className="text-zinc-500 text-xs leading-relaxed max-w-md mx-auto">
              Cinelyt is an AI-powered streaming discovery platform. Describe what you feel like watching
              and the AI finds it — or browse thousands of movies and TV shows directly.
              Powered by Google Gemini and TMDB.
            </p>
          </div>
        </div>
      </div>

      {/* Minimal bottom bar */}
      <div className="relative z-10 border-t border-white/5 py-4 px-6 flex items-center justify-between">
        <p className="text-zinc-700 text-xs">&copy; {new Date().getFullYear()} Cinelyt by Mark Olmedo</p>
        <div className="flex gap-4 text-xs text-zinc-700">
          <Link href="/movies" className="hover:text-zinc-400 transition">Movies</Link>
          <Link href="/tv" className="hover:text-zinc-400 transition">TV Shows</Link>
          <Link href="/watchlist" className="hover:text-zinc-400 transition">Watchlist</Link>
        </div>
      </div>
    </main>
  )
}