"use client"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { getTVDetails, getTVEpisodeEmbed, buildImageUrl } from "@/lib/api"
import VideoPlayer from "@/components/player/VideoPlayer"
import MovieCard from "@/components/cards/MovieCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Star, Bookmark, BookmarkCheck, Play, List } from "lucide-react"
import { useWatchlistStore } from "@/store/watchlistStore"
import { formatRating } from "@/lib/utils"

export default function TVPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [embedUrls, setEmbedUrls] = useState<string[]>([])
  const [seasonOpen, setSeasonOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { add, remove, isInWatchlist } = useWatchlistStore()

  useEffect(() => {
    getTVDetails(Number(id))
      .then((d) => { setData(d); setEmbedUrls(d.embed_urls) })
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!data) return
    getTVEpisodeEmbed(Number(id), season, episode).then(setEmbedUrls)
  }, [season, episode])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSeasonOpen(false)
      }
    }

    if (seasonOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [seasonOpen])

  if (loading) return <div className="pt-24"><LoadingSpinner /></div>
  if (!data) return null

  const { details, similar } = data
  const inList = isInWatchlist(details.id)
  const maxSeasons = details.number_of_seasons || 1
  const currentSeason = details.seasons?.find((s: any) => s.season_number === season)
  const episodeCount = currentSeason?.episode_count || 12

  const toggleWatchlist = () => {
    if (inList) remove(details.id)
    else add({ tmdb_id: details.id, title: details.name, poster_path: details.poster_path, media_type: "tv" })
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-20">
      {/* Backdrop */}
      {details.backdrop_path && (
        <div className="relative h-80 w-full">
          <Image
            src={buildImageUrl(details.backdrop_path, "original")}
            alt={details.name}
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 -mt-24 relative z-10 space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6">
          {details.poster_path && (
            <div className="relative w-36 h-52 shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image src={buildImageUrl(details.poster_path)} alt={details.name} fill className="object-cover" />
            </div>
          )}
          <div className="space-y-3 pt-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">{details.name}</h1>
            {details.tagline && <p className="text-zinc-400 italic text-sm">{details.tagline}</p>}
            <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="flex items-center gap-1">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                {formatRating(details.vote_average)}
              </span>
              <span className="text-zinc-500">•</span>
              <span>{details.number_of_seasons} Seasons</span>
              <span className="text-zinc-500">•</span>
              <span>{details.first_air_date?.slice(0, 4)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {details.genres?.map((g: any) => (
                <span key={g.id} className="bg-white/5 border border-white/10 text-zinc-300 text-xs px-2.5 py-1 rounded-full">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">{details.overview}</p>
            <button
              onClick={toggleWatchlist}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              {inList ? <><BookmarkCheck size={15} className="text-red-400" /> In Watchlist</> : <><Bookmark size={15} /> Add to Watchlist</>}
            </button>
          </div>
        </div>

        {/* Player */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
            <Play size={16} className="text-red-500" />
            Now Playing — S{season} E{episode}
          </h2>
          <VideoPlayer embedUrls={embedUrls} title={`${details.name} S${season}E${episode}`} />
        </div>

        {/* Episode Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <List size={16} className="text-red-500" />
            <h2 className="text-white text-lg font-semibold">Episodes</h2>

            {/* Season Dropdown */}
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                onClick={() => setSeasonOpen(!seasonOpen)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm px-3 py-1.5 rounded-lg transition"
              >
                <span>Season {season}</span>
                <svg
                  className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${seasonOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {seasonOpen && (
                <div className="absolute top-full left-0 mt-1 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 min-w-32.5">
                  {Array.from({ length: maxSeasons }, (_, i) => i + 1).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setSeason(s); setEpisode(1); setSeasonOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition ${
                        s === season
                          ? "bg-black-500/20 text-red-500 font-semibold"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      Season {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Episode Cards — Horizontal Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700">
            {Array.from({ length: episodeCount }, (_, i) => i + 1).map((ep) => (
              <button
                key={ep}
                onClick={() => setEpisode(ep)}
                className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  ep === episode
                    ? "bg-black-500/15 border-red-500/40 text-white"
                    : "bg-white/3 border-white/8 text-zinc-400 hover:bg-white/8 hover:text-white hover:border-white/20"
                }`}
                style={{ minWidth: "fit-content" }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  ep === episode ? "bg-red-500" : "bg-white/10"
                }`}>
                  <Play size={10} className={ep === episode ? "text-black fill-black" : "text-zinc-400 fill-zinc-400"} />
                </div>
                <span className="whitespace-nowrap font-medium">Eps {ep}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Similar */}
        {similar?.length > 0 && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
              {similar.map((item: any) => (
                <MovieCard key={item.id} item={{ ...item, media_type: "tv" }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}