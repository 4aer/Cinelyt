export const formatDate = (dateStr: string) => {
  if (!dateStr) return "Unknown"
  return new Date(dateStr).getFullYear().toString()
}

export const formatRating = (rating: number) => {
  if (!rating) return "N/A"
  return rating.toFixed(1)
}

export const getTitle = (item: any) => item.title || item.name || "Unknown"

export const getDate = (item: any) => item.release_date || item.first_air_date || ""

export const getMediaType = (item: any) => item.media_type || (item.title ? "movie" : "tv")

export const buildImageUrl = (path: string | null, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-poster.png"