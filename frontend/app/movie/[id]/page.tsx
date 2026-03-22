"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { getMovieDetails, buildImageUrl } from "@/lib/api"
import VideoPlayer from "@/components/player/VideoPlayer"
import MovieCard from "@/components/cards/MovieCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Star, Clock, Bookmark, BookmarkCheck } from "lucide-react"
import { useWatchlistStore } from "@/store/watchlistStore"
import { formatRating } from "@/lib/utils"

export default function MoviePage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { add, remove, isInWatchlist } = useWatchlistStore()

  useEffect(() => {
    getMovieDetails(Number(id)).then(setData).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>
  if (!data) return null

  const { details, embed_urls, similar } = data
  const inList = isInWatchlist(details.id)

  const toggleWatchlist = () => {
    if (inList) {
      remove(details.id)
    } else {
      add({ tmdb_id: details.id, title: details.title, poster_path: details.poster_path, media_type: "movie" })
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-20">
      {details.backdrop_path && (
        <div className="relative h-72 w-full">
          <Image src={buildImageUrl(details.backdrop_path, "original")} alt={details.title} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 space-y-10">
        <div className="flex flex-col sm:flex-row gap-6">
          {details.poster_path && (
            <div className="relative w-40 h-60 shrink-0 rounded-xl overflow-hidden shadow-2xl">
              <Image src={buildImageUrl(details.poster_path)} alt={details.title} fill className="object-cover" />
            </div>
          )}
          <div className="space-y-3 pt-2">
            <h1 className="text-3xl font-bold text-white">{details.title}</h1>
            {details.tagline && <p className="text-zinc-400 italic">{details.tagline}</p>}
            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" />{formatRating(details.vote_average)}</span>
              {details.runtime && <span className="flex items-center gap-1"><Clock size={14} />{details.runtime} min</span>}
              <span>{details.release_date?.slice(0, 4)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {details.genres?.map((g: any) => (
                <span key={g.id} className="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-full">{g.name}</span>
              ))}
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">{details.overview}</p>
            <button onClick={toggleWatchlist} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-4 py-2 rounded-lg transition">
              {inList ? <><BookmarkCheck size={16} /> In Watchlist</> : <><Bookmark size={16} /> Add to Watchlist</>}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-white text-xl font-semibold mb-3">Watch Now</h2>
          <VideoPlayer embedUrls={embed_urls} title={details.title} />
        </div>

        {similar?.length > 0 && (
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">Similar Movies</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
              {similar.map((item: any) => <MovieCard key={item.id} item={{ ...item, media_type: "movie" }} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}