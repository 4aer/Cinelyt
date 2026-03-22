"use client"
import { useWatchlistStore } from "@/store/watchlistStore"
import MovieCard from "@/components/cards/MovieCard"
import { Bookmark } from "lucide-react"

export default function WatchlistPage() {
  const { items } = useWatchlistStore()

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-8 flex items-center gap-2">
          <Bookmark className="text-red-500" /> My Watchlist
        </h1>
        {items.length === 0 ? (
          <div className="text-center text-zinc-400 py-20">
            Your watchlist is empty. Browse and bookmark titles to add them here.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {items.map((item) => (
              <MovieCard key={item.tmdb_id} item={{ id: item.tmdb_id, title: item.title, poster_path: item.poster_path, media_type: item.media_type }} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}