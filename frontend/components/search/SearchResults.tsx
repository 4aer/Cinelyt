import MovieCard from "@/components/cards/MovieCard"

interface Props {
  results: any[]
  prompt?: string
  mood?: string
}

export default function SearchResults({ results, prompt, mood }: Props) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-zinc-400 py-20">
        No results found. Try a different prompt.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mood && (
        <p className="text-zinc-400 text-sm italic">
          Mood detected: <span className="text-red-400">{mood}</span>
        </p>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {results.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}