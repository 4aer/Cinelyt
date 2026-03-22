"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { getTVDetails, getTVEpisodeEmbed, buildImageUrl } from "@/lib/api"
import VideoPlayer from "@/components/player/VideoPlayer"
import MovieCard from "@/components/cards/MovieCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Star, Bookmark, BookmarkCheck } from "lucide-react"
import { useWatchlistStore } from "@/store/watchlistStore"
import { formatRating } from "@/lib/utils"

export default function TVPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [embedUrls, setEmbedUrls] = useState<string[]>([])
  const { add, remove, isInWatchlist } = useWatchlistStore()

  useEffect(() => {
    getTVDetails(Number(id)).then((d) => { setData(d); setEmbedUrls(d.embed_urls) }).finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!data) return
    getTVEpisodeEmbed(Number(id), season, episode).then(setEmbedUrls)
  }, [season, episode])

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>
  if (!data) return null

  const { details, similar } = data
  const inList = isInWatchlist(details.id)
  const maxSeasons = details.number_of_seasons || 1

  const toggleWatchlist = () => {
    if (inList) remove(details.id)
    else add({ tmdb_id: details.id, title: details.name, poster_path: details.poster_path, media_type: "tv" })
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-20">
      {details.backdrop_path && (
        <div className="relative h-72 w-full">
          <Image src={buildImageUrl(details.backdrop_path, "original")} alt={details.name} fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 space-y-10">
        <div className="flex flex-col sm:flex-row gap-6">
          {details.poster_path && (
            <div className="relative w-40 h-60 shrink-0 rounded-xl overflow-hidden shadow-2xl">
              <Image src={buildImageUrl(details.poster_path)} alt={details.name} fill className="object-cover" />
            </div>
          )}
          <div className="space-y-3 pt-2">
            <h1 className="text-3xl font-bold text-white">{details.name}</h1>
            {details.tagline && <p className="text-zinc-400 italic">{details.tagline}</p>}
            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" />{formatRating(details.vote_average)}</span>
              <span>{details.number_of_seasons} Seasons</span>
              <span>{details.first_air_date?.slice(0, 4)}</span>
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

        <div className="space-y-4">
          <h2 className="text-white text-xl font-semibold">Watch</h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label className="text-zinc-400 text-sm">Season</label>
              <select value={season} onChange={(e) => { setSeason(Number(e.target.value)); setEpisode(1) }}
                className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg border border-zinc-700 focus:outline-none focus:border-red-500">
                {Array.from({ length: maxSeasons }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Season {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-zinc-400 text-sm">Episode</label>
              <input type="number" min={1} value={episode} onChange={(e) => setEpisode(Number(e.target.value))}
                className="bg-zinc-800 text-white text-sm px-3 py-1.5 rounded-lg border border-zinc-700 focus:outline-none focus:border-red-500 w-20" />
            </div>
          </div>
          <VideoPlayer embedUrls={embedUrls} title={`${details.name} S${season}E${episode}`} />
        </div>

        {similar?.length > 0 && (
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">Similar Shows</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
              {similar.map((item: any) => <MovieCard key={item.id} item={{ ...item, media_type: "tv" }} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}