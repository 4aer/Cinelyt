"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Bookmark, Film } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-red-500 font-bold text-xl shrink-0">
          <Film size={24} />
          Cinelyt
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Quick search..."
              className="w-full bg-zinc-800 text-white text-sm pl-9 pr-4 py-2 rounded-full border border-zinc-700 focus:outline-none focus:border-red-500 transition"
            />
          </div>
        </form>

        <Link
          href="/watchlist"
          className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm transition"
        >
          <Bookmark size={18} />
          <span className="hidden sm:inline">Watchlist</span>
        </Link>
      </div>
    </nav>
  )
}