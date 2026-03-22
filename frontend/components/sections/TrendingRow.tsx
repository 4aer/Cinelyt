import MovieCard from "@/components/cards/MovieCard"
import Link from "next/link"

interface Props {
  title: string
  items: any[]
  viewAllHref?: string
}

export default function TrendingRow({ title, items, viewAllHref }: Props) {
  if (!items || items.length === 0) return null

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-(--gold) rounded-full" />
          <h2 className="font-display text-2xl text-white tracking-wide">{title}</h2>
        </div>
        {viewAllHref && (
          <Link href={viewAllHref}
            className="text-(--gold) hover:text-(--gold-dim) text-xs font-medium tracking-wide uppercase transition">
            View All →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {items.slice(0, 14).map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}