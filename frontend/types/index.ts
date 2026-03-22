export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids?: number[]
  media_type?: string
  imdb_id?: string
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  genre_ids?: number[]
  media_type?: string
  imdb_id?: string
}

export interface MediaDetails extends Movie, TVShow {
  external_ids?: { imdb_id: string }
  genres?: { id: number; name: string }[]
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
  }
  number_of_seasons?: number
  number_of_episodes?: number
  seasons?: Season[]
  runtime?: number
  status?: string
  tagline?: string
}

export interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
}

export interface WatchlistItem {
  tmdb_id: number
  title: string
  poster_path: string | null
  media_type: string
}

export interface AISearchResponse {
  parsed_intent: {
    search_query: string
    media_type: string
    genres: string[]
    similar_to: string | null
    mood: string
  }
  results: (Movie | TVShow)[]
}