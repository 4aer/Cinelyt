import httpx
from app.config import TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL

TMDB_API_KEY = TMDB_API_KEY
TMDB_BASE_URL = TMDB_BASE_URL

HEADERS = {
    "accept": "application/json",
}

PARAMS_BASE = {
    "api_key": TMDB_API_KEY,
    "language": "en-US",
}


async def fetch_trending(media_type: str = "all", time_window: str = "week"):
    url = f"{TMDB_BASE_URL}/trending/{media_type}/{time_window}"
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=PARAMS_BASE, headers=HEADERS)
        res.raise_for_status()
        return res.json().get("results", [])


async def search_tmdb(query: str, media_type: str = "multi"):
    url = f"{TMDB_BASE_URL}/search/{media_type}"
    params = {**PARAMS_BASE, "query": query}
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers=HEADERS)
        res.raise_for_status()
        return res.json().get("results", [])


async def discover_tmdb(media_type: str = "movie", genre_ids: str = "", keywords: str = ""):
    url = f"{TMDB_BASE_URL}/discover/{media_type}"
    params = {
        **PARAMS_BASE,
        "sort_by": "popularity.desc",
        "with_genres": genre_ids,
        "with_keywords": keywords,
    }
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers=HEADERS)
        res.raise_for_status()
        return res.json().get("results", [])


async def get_movie_details(tmdb_id: int):
    url = f"{TMDB_BASE_URL}/movie/{tmdb_id}"
    params = {**PARAMS_BASE, "append_to_response": "external_ids,credits"}
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers=HEADERS)
        res.raise_for_status()
        return res.json()


async def get_tv_details(tmdb_id: int):
    url = f"{TMDB_BASE_URL}/tv/{tmdb_id}"
    params = {**PARAMS_BASE, "append_to_response": "external_ids,credits"}
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers=HEADERS)
        res.raise_for_status()
        return res.json()


async def get_similar(tmdb_id: int, media_type: str = "movie"):
    url = f"{TMDB_BASE_URL}/{media_type}/{tmdb_id}/similar"
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=PARAMS_BASE, headers=HEADERS)
        res.raise_for_status()
        return res.json().get("results", [])


async def get_genre_list(media_type: str = "movie"):
    url = f"{TMDB_BASE_URL}/genre/{media_type}/list"
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=PARAMS_BASE, headers=HEADERS)
        res.raise_for_status()
        return res.json().get("genres", [])


def build_image_url(path: str):
    if not path:
        return None
    return f"{TMDB_IMAGE_BASE_URL}{path}"