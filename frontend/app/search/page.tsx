"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { aiSearch, searchMovies, searchTV } from "@/lib/api"
import axios from "axios"
import SearchResults from "@/components/search/SearchResults"
import AISearchBar from "@/components/search/AISearchBar"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

function SearchContent() {
  const params = useSearchParams()
  const aiPrompt = params.get("ai")
  const query = params.get("q")
  const genreId = params.get("genre")
  const genreType = params.get("type") || "movie"
  const genreName = params.get("name")
  const [results, setResults] = useState<any[]>([])
  const [mood, setMood] = useState("")
  const [loading, setLoading] = useState(true)
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        if (aiPrompt) {
          const data = await aiSearch(aiPrompt)
          setResults(data.results)
          setMood(data.parsed_intent?.mood || "")
        } else if (query) {
          const [movies, tv] = await Promise.all([searchMovies(query), searchTV(query)])
          setResults([...movies, ...tv])
        } else if (genreId) {
          const res = await axios.get(`${API}/movies/discover`, {
            params: { genre_id: genreId, media_type: genreType }
          })
          setResults(res.data.results || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [aiPrompt, query, genreId])

  const title = aiPrompt
    ? `AI Results: "${aiPrompt}"`
    : query
    ? `Search: "${query}"`
    : genreName
    ? `${genreName} ${genreType === "tv" ? "Shows" : "Movies"}`
    : "Browse"

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <AISearchBar />
        <div>
          <h1 className="font-display text-4xl text-white tracking-wide mb-6">{title}</h1>
          {loading ? <LoadingSpinner /> : <SearchResults results={results} mood={mood} />}
        </div>
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-24"><LoadingSpinner /></div>}>
      <SearchContent />
    </Suspense>
  )
}