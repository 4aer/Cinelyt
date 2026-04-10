"use client"
import { useState } from "react"
import { SlidersHorizontal, X, ChevronDown } from "lucide-react"

interface FilterState {
  genre_id: string
  year: string
  sort_by: string
}

interface Props {
  mediaType: "movie" | "tv"
  filters: FilterState
  onApply: (filters: FilterState) => void
  totalResults: number
}

const MOVIE_GENRES = [
  { id: "28", name: "Action" }, { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" }, { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" }, { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" }, { id: "14", name: "Fantasy" },
  { id: "27", name: "Horror" }, { id: "10402", name: "Music" },
  { id: "9648", name: "Mystery" }, { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" }, { id: "53", name: "Thriller" },
  { id: "10752", name: "War" }, { id: "37", name: "Western" },
]

const TV_GENRES = [
  { id: "10759", name: "Action & Adventure" }, { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" }, { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" }, { id: "18", name: "Drama" },
  { id: "10751", name: "Family" }, { id: "10762", name: "Kids" },
  { id: "9648", name: "Mystery" }, { id: "10763", name: "News" },
  { id: "10764", name: "Reality" }, { id: "10765", name: "Sci-Fi & Fantasy" },
  { id: "10766", name: "Soap" }, { id: "10767", name: "Talk" },
  { id: "10768", name: "War & Politics" }, { id: "37", name: "Western" },
]

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "primary_release_date.desc", label: "Newest First" },
  { value: "primary_release_date.asc", label: "Oldest First" },
]

const currentYear = new Date().getFullYear()
const YEARS = ["", ...Array.from({ length: 30 }, (_, i) => String(currentYear - i))]

export default function FilterBar({ mediaType, filters, onApply, totalResults }: Props) {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState<FilterState>(filters)
  const genres = mediaType === "movie" ? MOVIE_GENRES : TV_GENRES

  const activeCount = [filters.genre_id, filters.year, filters.sort_by !== "popularity.desc"]
    .filter(Boolean).length

  const handleApply = () => {
    onApply(local)
    setOpen(false)
  }

  const handleReset = () => {
    const reset = { genre_id: "", year: "", sort_by: "popularity.desc" }
    setLocal(reset)
    onApply(reset)
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-500 text-sm">
          <span className="text-white font-medium">{totalResults.toLocaleString()}</span> titles found
        </p>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
            open || activeCount > 0
              ? "bg-(--gold)/10 border-(--gold)/30 text-(--gold)"
              : "bg-white/5 border-white/8 text-zinc-300 hover:bg-white/10"
          }`}
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeCount > 0 && (
            <span className="bg-(--gold) text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Filter panel */}
      {open && (
        <div className="bg-[#141414] border border-white/8 rounded-2xl p-5 space-y-6 animate-fadeUp">

          {/* Genre */}
          <div className="space-y-3">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Genre</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLocal({ ...local, genre_id: "" })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  local.genre_id === ""
                    ? "bg-(--gold) border-(--gold) text-black"
                    : "bg-white/5 border-white/8 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                All
              </button>
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setLocal({ ...local, genre_id: g.id })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    local.genre_id === g.id
                      ? "bg-(--gold) border-(--gold) text-black"
                      : "bg-white/5 border-white/8 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Year + Sort row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Release Year</p>
              <select
                value={local.year}
                onChange={(e) => setLocal({ ...local, year: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/8 text-zinc-300 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-(--gold)/40 transition"
              >
                <option value="">All Years</option>
                {YEARS.slice(1).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Sort By</p>
              <select
                value={local.sort_by}
                onChange={(e) => setLocal({ ...local, sort_by: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/8 text-zinc-300 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-(--gold)/40 transition"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleApply}
              className="bg-(--gold) hover:bg-(--gold-dim) text-black font-semibold text-sm px-6 py-2.5 rounded-xl transition"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/8 text-zinc-400 hover:text-white text-sm px-4 py-2.5 rounded-xl transition"
            >
              <X size={13} /> Reset
            </button>
          </div>
        </div>
      )}

      {/* Active filter pills */}
      {(filters.genre_id || filters.year) && (
        <div className="flex flex-wrap gap-2">
          {filters.genre_id && (
            <span className="flex items-center gap-1.5 bg-(--gold)/10 border border-(--gold)/20 text-(--gold) text-xs px-3 py-1 rounded-full">
              {genres.find(g => g.id === filters.genre_id)?.name}
              <button onClick={() => onApply({ ...filters, genre_id: "" })}><X size={11} /></button>
            </span>
          )}
          {filters.year && (
            <span className="flex items-center gap-1.5 bg-(--gold)/10 border border-(--gold)/20 text-(--gold) text-xs px-3 py-1 rounded-full">
              {filters.year}
              <button onClick={() => onApply({ ...filters, year: "" })}><X size={11} /></button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}