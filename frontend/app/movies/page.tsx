"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { browseMovies } from "@/lib/api"
import MovieCard from "@/components/cards/MovieCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import Pagination from "@/components/ui/Pagination"
import FilterBar from "@/components/ui/FilterBar"

interface FilterState {
  genre_id: string
  year: string
  sort_by: string
}

function MoviesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [results, setResults] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)

  const page = Number(searchParams.get("page") || 1)
  const filters: FilterState = {
    genre_id: searchParams.get("genre_id") || "",
    year: searchParams.get("year") || "",
    sort_by: searchParams.get("sort_by") || "popularity.desc",
  }

  useEffect(() => {
    setLoading(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
    browseMovies({ page, ...filters })
      .then((data) => {
        setResults(data.results)
        setTotalPages(data.total_pages)
        setTotalResults(data.total_results)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [searchParams.toString()])

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v === "" || v === 0) params.delete(k)
      else params.set(k, String(v))
    })
    router.push(`/movies?${params.toString()}`)
  }

  const handleFilterApply = (f: FilterState) => {
    updateParams({ ...f, page: 1 })
  }

  const handlePageChange = (p: number) => {
    updateParams({ page: p })
  }

  const pagination = (
    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
  )

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-(--gold)] rounded-full" />
          <h1 className="font-display text-4xl text-white tracking-wide">Movies</h1>
        </div>

        {/* Filter bar */}
        <FilterBar
          mediaType="movie"
          filters={filters}
          onApply={handleFilterApply}
          totalResults={totalResults}
        />

        {/* Top pagination */}
        {!loading && totalPages > 1 && <div className="py-2">{pagination}</div>}

        {/* Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : results.length === 0 ? (
          <div className="text-center text-zinc-500 py-24">No results found for these filters.</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {results.map((item) => (
              <MovieCard key={item.id} item={{ ...item, media_type: "movie" }} />
            ))}
          </div>
        )}

        {/* Bottom pagination */}
        {!loading && totalPages > 1 && <div className="pt-4">{pagination}</div>}
      </div>
    </main>
  )
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="pt-24"><LoadingSpinner /></div>}>
      <MoviesContent />
    </Suspense>
  )
}