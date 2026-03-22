"use client"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react"
import AISearchBar from "@/components/search/AISearchBar"
import { getTrendingMovies } from "@/lib/api"
import { buildImageUrl } from "@/lib/utils"
import { getTitle, getDate } from "@/lib/utils"

export default function HeroSection() {
  const [slides, setSlides] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setSlides(data.slice(0, 6))
      setLoaded(true)
    })
  }, [])

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length])
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length === 0) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [slides.length, next])

  const slide = slides[current]

  return (
    <section className="relative h-[90vh] min-h-150 max-h-215 overflow-hidden">

      {/* Backdrop */}
      {slide?.backdrop_path && (
        <div className="absolute inset-0">
          <Image
            key={slide.id}
            src={buildImageUrl(slide.backdrop_path, "original")}
            alt={getTitle(slide)}
            fill
            priority
            className="object-cover transition-opacity duration-1000"
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlays */}
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-1.5 bg-(--gold)" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
            }`} />
        ))}
      </div>

      {/* Arrow Controls */}
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 border border-white/10 text-white p-2 rounded-full transition backdrop-blur-sm">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 border border-white/10 text-white p-2 rounded-full transition backdrop-blur-sm">
        <ChevronRight size={20} />
      </button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 max-w-7xl mx-auto">
        {loaded && slide && (
          <div className="max-w-xl space-y-4 animate-fadeUp mb-10">
            <p className="text-(--gold) text-xs font-semibold tracking-[0.2em] uppercase">
              Trending Now
            </p>
            <h1 className="font-display text-5xl sm:text-7xl text-white leading-none tracking-wide">
              {getTitle(slide)}
            </h1>
            <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2 max-w-md">
              {slide.overview}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href={`/${slide.media_type || "movie"}/${slide.id}`}
                className="flex items-center gap-2 bg-(--gold) hover:bg-var(--gold-dim) text-black font-semibold text-sm px-5 py-2.5 rounded-xl transition"
              >
                <Play size={15} className="fill-black" /> Watch Now
              </Link>
              <Link
                href={`/${slide.media_type || "movie"}/${slide.id}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm px-5 py-2.5 rounded-xl transition backdrop-blur-sm"
              >
                <Info size={15} /> More Info
              </Link>
            </div>
          </div>
        )}

        {/* AI Search Bar floating at bottom of hero */}
        <div className="w-full max-w-2xl">
          <AISearchBar />
        </div>
      </div>
    </section>
  )
}