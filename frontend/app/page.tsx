import { getTrendingMovies, getTrendingTV } from "@/lib/api"
import HeroSection from "@/components/sections/HeroSection"
import TrendingRow from "@/components/sections/TrendingRow"

export default async function HomePage() {
  const [movies, tv] = await Promise.all([getTrendingMovies(), getTrendingTV()])

  return (
    <main className="min-h-screen bg-zinc-950 pb-16">
      <HeroSection />
      <div className="space-y-12 pt-4">
        <TrendingRow title="Trending Movies" items={movies} />
        <TrendingRow title="Trending TV Shows" items={tv} />
      </div>
    </main>
  )
}