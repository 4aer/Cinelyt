import MovieCard from "@/components/cards/MovieCard"

interface Props {
  title: string
  items: any[]
}

export default function TrendingRow({ title, items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <section className="px-4 max-w-7xl mx-auto">
      <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {items.slice(0, 14).map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}