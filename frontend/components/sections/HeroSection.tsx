import AISearchBar from "@/components/search/AISearchBar"

export default function HeroSection() {
  return (
    <section className="relative min-h-105 flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-red-950/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Find your next<span className="text-red-500"> obsession</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Tell AI what you're in the mood for — it'll find it.
          </p>
        </div>
        <AISearchBar />
      </div>
    </section>
  )
}