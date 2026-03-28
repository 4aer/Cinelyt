import Link from "next/link"
import { Film } from "lucide-react"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-(--gold) rounded flex items-center justify-center shrink-0">
                <Film size={12} className="text-black" />
              </div>
              <span className="font-display text-xl text-white tracking-wide">CINELYT</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-48">
              AI-powered movie and TV show discovery. Find your next obsession.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Browse</p>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-zinc-600 hover:text-zinc-300 text-xs transition">Home</Link>
              <Link href="/search" className="text-zinc-600 hover:text-zinc-300 text-xs transition">Browse All</Link>
              <Link href="/watchlist" className="text-zinc-600 hover:text-zinc-300 text-xs transition">My Watchlist</Link>
              <Link href="/search?ai=trending+this+week" className="text-zinc-600 hover:text-zinc-300 text-xs transition">Trending</Link>
            </div>
          </div>

          {/* Attributions */}
          <div className="space-y-3">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Attributions</p>
            <div className="flex flex-col gap-2">
              <a href="https://themoviedb.org" target="_blank" rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-300 text-xs transition">
                Movie data by TMDB
              </a>
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-300 text-xs transition">
                AI by Google Gemini
              </a>
              <a href="https://vidsrc.to" target="_blank" rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-300 text-xs transition">
                Streams via VidSrc
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-700 text-xs">
            &copy; {currentYear} Cinelyt by Mark Olmedo. All rights reserved.
          </p>
          <p className="text-zinc-700 text-xs text-center">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
            Built for personal and educational use only.
          </p>
        </div>
      </div>
    </footer>
  )
}