from fastapi import APIRouter, HTTPException
from app.services import tmdb, vidsrc

router = APIRouter(prefix="/tv", tags=["TV"])

@router.get("/trending")
async def get_trending_tv():
    results = await tmdb.fetch_trending(media_type="tv")
    return {"results": results}

@router.get("/search")
async def search_tv(query: str):
    results = await tmdb.search_tmdb(query=query, media_type="tv")
    return {"results": results}

@router.get("/{tmdb_id}")
async def get_tv_show(tmdb_id: int):
    try:
        details = await tmdb.get_tv_details(tmdb_id)
        embed_urls = vidsrc.get_tv_embed_urls(str(tmdb_id))
        similar = await tmdb.get_similar(tmdb_id, media_type="tv")
        return {
            "details": details,
            "embed_urls": embed_urls,
            "similar": similar[:10],
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{tmdb_id}/embed")
async def get_tv_episode_embed(tmdb_id: int, season: int = 1, episode: int = 1):
    embed_urls = vidsrc.get_tv_embed_urls(str(tmdb_id), season, episode)
    return {"embed_urls": embed_urls}