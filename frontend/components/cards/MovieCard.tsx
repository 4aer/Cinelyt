"use client"
import Link from "next/link"
import Image from "next/image"
import { Star, Bookmark, BookmarkCheck, Play } from "lucide-react"
import { buildImageUrl, formatRating, getTitle, getDate, getMediaType } from "@/lib/utils"
import { useWatchlistStore } from "@/store/watchlistStore"

export default function MovieCard({ item }: { item: any }) {
  const { add, remove, isInWatchlist } = useWatchlistStore()
  const mediaType = getMediaType(item)
  const title = getTitle(item)
  const inList = isInWatchlist(item.id)

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inList) remove(item.id)
    else add({ tmdb_id: item.id, title, poster_path: item.poster_path, media_type: mediaType })
  }

  return (
    <Link href={`/${mediaType}/${item.id}`} className="group relative block card-glow rounded-xl transition-all duration-300">
      <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-(--surface-2)">
        <Image
          src={buildImageUrl(item.poster_path)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 200px"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 bg-(--gold) rounded-full flex items-center justify-center shadow-lg">
            <Play size={14} className="text-black fill-black ml-0.5" />
          </div>
        </div>

        {/* Bookmark */}
        <button onClick={toggleWatchlist}
          className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-(--gold) hover:text-black">
          {inList
            ? <BookmarkCheck size={12} className="text-(--gold) group-hover:text-black" />
            : <Bookmark size={12} className="text-white" />}
        </button>

        {/* Rating badge */}
        {item.vote_average > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Star size={10} className="text-(--gold) fill-(--gold)" />
            <span className="text-white text-xs font-medium">{formatRating(item.vote_average)}</span>
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <p className="text-zinc-200 text-sm font-medium truncate group-hover:text-white transition-colors">{title}</p>
        <p className="text-zinc-500 text-xs mt-0.5">{getDate(item)?.slice(0, 4)}</p>
      </div>
    </Link>
  )
}