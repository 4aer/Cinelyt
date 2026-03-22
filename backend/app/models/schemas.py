from pydantic import BaseModel
from typing import Optional

class AISearchRequest(BaseModel):
    prompt: str

class MovieResult(BaseModel):
    id: int
    title: str
    overview: Optional[str]
    poster_path: Optional[str]
    release_date: Optional[str]
    vote_average: Optional[float]
    imdb_id: Optional[str]
    media_type: str = "movie"

class TVResult(BaseModel):
    id: int
    name: str
    overview: Optional[str]
    poster_path: Optional[str]
    first_air_date: Optional[str]
    vote_average: Optional[float]
    imdb_id: Optional[str]
    media_type: str = "tv"

class WatchlistItem(BaseModel):
    tmdb_id: int
    title: str
    poster_path: Optional[str]
    media_type: str