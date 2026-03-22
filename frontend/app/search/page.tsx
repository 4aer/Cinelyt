"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { aiSearch, searchMovies, searchTV } from "@/lib/api"
import SearchResults from "@/components/search/SearchResults"
import AISearchBar from "@/components/search/AISearchBar"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function SearchPage() {
  const params = useSearchParams()
  const aiPrompt = params.get("ai")
  const query = params.get("q")
  const [results, setResults] = useState<any[]>([])
  const [mood, setMood] = useState("")
  const [loading, setLoading] = useState(true)

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
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [aiPrompt, query])

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <AISearchBar />
        <div>
          <h1 className="text-white text-2xl font-bold mb-6">
            {aiPrompt ? `Results for: "${aiPrompt}"` : `Search: "${query}"`}
          </h1>
          {loading ? <LoadingSpinner /> : <SearchResults results={results} mood={mood} />}
        </div>
      </div>
    </main>
  )
}