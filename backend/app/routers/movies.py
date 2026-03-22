from fastapi import APIRouter, HTTPException
from app.services import tmdb, vidsrc

router = APIRouter(prefix="/movies", tags=["Movies"])


@router.get("/trending")
async def get_trending_movies():
    results = await tmdb.fetch_trending(media_type="movie")
    return {"results": results}


@router.get("/search")
async def search_movies(query: str):
    results = await tmdb.search_tmdb(query=query, media_type="movie")
    return {"results": results}


@router.get("/{tmdb_id}")
async def get_movie(tmdb_id: int):
    try:
        details = await tmdb.get_movie_details(tmdb_id)
        imdb_id = details.get("external_ids", {}).get("imdb_id") or details.get("imdb_id")
        embed_urls = vidsrc.get_movie_embed_urls(imdb_id) if imdb_id else []
        similar = await tmdb.get_similar(tmdb_id, media_type="movie")
        return {
            "details": details,
            "embed_urls": embed_urls,
            "similar": similar[:10],
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))