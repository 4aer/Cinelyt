import Link from "next/link"
import { Film } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-(--gold) rounded flex items-center justify-center">
            <Film size={12} className="text-black" />
          </div>
          <span className="font-display text-xl text-white tracking-wide">CINELYT</span>
        </div>
        <p className="text-zinc-600 text-xs text-center">
          Movie data provided by{" "}
          <a href="https://themoviedb.org" target="_blank" rel="noopener noreferrer"
            className="text-zinc-500 hover:text-(--gold) transition">TMDB</a>
          . For personal use only.
        </p>
        <div className="flex gap-4 text-xs text-zinc-600">
          <Link href="/watchlist" className="hover:text-zinc-400 transition">Watchlist</Link>
          <Link href="/search" className="hover:text-zinc-400 transition">Browse</Link>
        </div>
      </div>
    </footer>
  )
}