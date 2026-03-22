"use client"
import Link from "next/link"
import Image from "next/image"
import { Star, Bookmark, BookmarkCheck } from "lucide-react"
import { buildImageUrl, formatRating } from "@/lib/utils"
import { useWatchlistStore } from "@/store/watchlistStore"
import { getTitle, getDate, getMediaType } from "@/lib/utils"

export default function MovieCard({ item }: { item: any }) {
  const { add, remove, isInWatchlist } = useWatchlistStore()
  const mediaType = getMediaType(item)
  const title = getTitle(item)
  const inList = isInWatchlist(item.id)

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inList) {
      remove(item.id)
    } else {
      add({ tmdb_id: item.id, title, poster_path: item.poster_path, media_type: mediaType })
    }
  }

  return (
    <Link href={`/${mediaType}/${item.id}`} className="group relative block">
      <div className="relative aspect-2/3 rounded-lg overflow-hidden bg-zinc-800">
        <Image
          src={buildImageUrl(item.poster_path)}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 200px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        <button
          onClick={toggleWatchlist}
          className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
        >
          {inList ? <BookmarkCheck size={14} className="text-white" /> : <Bookmark size={14} className="text-white" />}
        </button>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs">{formatRating(item.vote_average)}</span>
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <p className="text-white text-sm font-medium truncate">{title}</p>
        <p className="text-zinc-400 text-xs">{getDate(item)?.slice(0, 4)}</p>
      </div>
    </Link>
  )
}