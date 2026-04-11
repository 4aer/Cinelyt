import { getTrendingMovies, getTrendingTV } from "@/lib/api"
import HeroSection from "@/components/sections/HeroSection"
import TrendingRow from "@/components/sections/TrendingRow"

export default async function HomePage() {
  const [movies, tv] = await Promise.all([getTrendingMovies(), getTrendingTV()])

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-20">
      <HeroSection />
      <div className="space-y-14 pt-12">
        <TrendingRow title="Trending Movies" items={movies} viewAllHref="/movies" />
        <TrendingRow title="Trending TV Shows" items={tv} viewAllHref="/tv" />
      </div>
    </main>
  )
}