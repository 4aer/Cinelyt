import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
})

export const getTrendingMovies = async () => {
  const res = await api.get("/movies/trending")
  return res.data.results
}

export const getTrendingTV = async () => {
  const res = await api.get("/tv/trending")
  return res.data.results
}

export const getMovieDetails = async (id: number) => {
  const res = await api.get(`/movies/${id}`)
  return res.data
}

export const getTVDetails = async (id: number) => {
  const res = await api.get(`/tv/${id}`)
  return res.data
}

export const getTVEpisodeEmbed = async (id: number, season: number, episode: number) => {
  const res = await api.get(`/tv/${id}/embed`, { params: { season, episode } })
  return res.data.embed_urls
}

export const aiSearch = async (prompt: string) => {
  const res = await api.post("/ai-search/", { prompt })
  return res.data
}

export const searchMovies = async (query: string) => {
  const res = await api.get("/movies/search", { params: { query } })
  return res.data.results
}

export const searchTV = async (query: string) => {
  const res = await api.get("/tv/search", { params: { query } })
  return res.data.results
}

export const browseMovies = async (params: {
  page?: number
  genre_id?: string
  year?: string
  sort_by?: string
}) => {
  const res = await api.get("/movies/browse", { params })
  return res.data
}

export const browseTV = async (params: {
  page?: number
  genre_id?: string
  year?: string
  sort_by?: string
}) => {
  const res = await api.get("/tv/browse", { params })
  return res.data
}

export const buildImageUrl = (path: string | null, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-poster.png"