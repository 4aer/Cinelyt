import { create } from "zustand"
import { persist } from "zustand/middleware"
import { WatchlistItem } from "@/types"

interface WatchlistStore {
  items: WatchlistItem[]
  add: (item: WatchlistItem) => void
  remove: (tmdb_id: number) => void
  isInWatchlist: (tmdb_id: number) => boolean
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      remove: (tmdb_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.tmdb_id !== tmdb_id),
        })),
      isInWatchlist: (tmdb_id) => get().items.some((i) => i.tmdb_id === tmdb_id),
    }),
    { name: "cinelyt-watchlist" }
  )
)