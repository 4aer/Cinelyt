"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Search, Bookmark, Film, X, ChevronDown, Tv, Clapperboard } from "lucide-react"

const MOVIE_GENRES = [
  { id: 28, name: "Action" }, { id: 35, name: "Comedy" }, { id: 18, name: "Drama" },
  { id: 27, name: "Horror" }, { id: 878, name: "Sci-Fi" }, { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" }, { id: 16, name: "Animation" }, { id: 99, name: "Documentary" },
]

const TV_GENRES = [
  { id: 10759, name: "Action & Adventure" }, { id: 35, name: "Comedy" }, { id: 18, name: "Drama" },
  { id: 9648, name: "Mystery" }, { id: 10765, name: "Sci-Fi & Fantasy" }, { id: 10762, name: "Kids" },
  { id: 10768, name: "War & Politics" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" },
]

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [moviesOpen, setMoviesOpen] = useState(false)
  const [tvOpen, setTvOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMoviesOpen(false)
    setTvOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery("")
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-2xl" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-7 h-7 bg-(--gold) rounded flex items-center justify-center">
            <Film size={14} className="text-black" />
          </div>
          <span className="font-display text-2xl text-white tracking-wide">CINELYT</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">

          {/* Movies Dropdown */}
          <div className="relative" onMouseEnter={() => setMoviesOpen(true)} onMouseLeave={() => setMoviesOpen(false)}>
            <button className="flex items-center gap-1.5 text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition">
              <Clapperboard size={14} />
              Movies
              <ChevronDown size={12} className={`transition-transform ${moviesOpen ? "rotate-180" : ""}`} />
            </button>
            {moviesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#161616] border border-white/8 rounded-2xl p-3 shadow-2xl grid grid-cols-3 gap-1 w-64 animate-slideIn">
                {MOVIE_GENRES.map((g) => (
                  <Link key={g.id} href={`/search?genre=${g.id}&type=movie&name=${g.name}`}
                    className="text-zinc-400 hover:text-(--gold) text-xs px-2 py-1.5 rounded-lg hover:bg-white/5 transition">
                    {g.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* TV Dropdown */}
          <div className="relative" onMouseEnter={() => setTvOpen(true)} onMouseLeave={() => setTvOpen(false)}>
            <button className="flex items-center gap-1.5 text-zinc-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition">
              <Tv size={14} />
              TV Shows
              <ChevronDown size={12} className={`transition-transform ${tvOpen ? "rotate-180" : ""}`} />
            </button>
            {tvOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#161616] border border-white/8 rounded-2xl p-3 shadow-2xl grid grid-cols-2 gap-1 w-56 animate-slideIn">
                {TV_GENRES.map((g) => (
                  <Link key={g.id} href={`/search?genre=${g.id}&type=tv&name=${g.name}`}
                    className="text-zinc-400 hover:text-(--gold) text-xs px-2 py-1.5 rounded-lg hover:bg-white/5 transition">
                    {g.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2 animate-slideIn">
              <input
                ref={searchRef}
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles..."
                className="bg-[#1a1a1a] border border-white/10 text-white text-sm px-4 py-2 rounded-xl w-48 focus:outline-none focus:border-(--gold)/50 transition"
              />
              <button type="button" onClick={() => setSearchOpen(false)}
                className="text-zinc-400 hover:text-white transition p-1">
                <X size={16} />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)}
              className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition">
              <Search size={18} />
            </button>
          )}

          <Link href="/watchlist"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition">
            <Bookmark size={16} />
            <span className="hidden sm:inline">Watchlist</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}