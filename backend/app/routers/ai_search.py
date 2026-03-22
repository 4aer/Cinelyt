from fastapi import APIRouter
from app.models.schemas import AISearchRequest
from app.services import gemini, tmdb

router = APIRouter(prefix="/ai-search", tags=["AI Search"])

TMDB_GENRE_MAP = {
    "Action": 28, "Adventure": 12, "Animation": 16, "Comedy": 35,
    "Crime": 80, "Documentary": 99, "Drama": 18, "Family": 10751,
    "Fantasy": 14, "History": 36, "Horror": 27, "Music": 10402,
    "Mystery": 9648, "Romance": 10749, "Science Fiction": 878,
    "Thriller": 53, "War": 10752, "Western": 37,
    "Action & Adventure": 10759, "Kids": 10762, "News": 10763,
    "Reality": 10764, "Sci-Fi & Fantasy": 10765, "Soap": 10766,
    "Talk": 10767, "War & Politics": 10768,
}


@router.post("/")
async def ai_search(request: AISearchRequest):
    # Step 1 — Gemini interprets the user prompt
    parsed = await gemini.interpret_search_prompt(request.prompt)

    media_type = parsed.get("media_type", "multi")
    search_query = parsed.get("search_query", "")
    genres = parsed.get("genres", [])
    similar_to = parsed.get("similar_to")

    # Step 2 — Convert genre names to TMDB genre IDs
    genre_ids = ",".join(
        str(TMDB_GENRE_MAP[g]) for g in genres if g in TMDB_GENRE_MAP
    )

    results = []

    # Step 3 — If user mentioned a specific title, find it and get similar
    if similar_to:
        similar_results = await tmdb.search_tmdb(query=similar_to, media_type="multi")
        if similar_results:
            top = similar_results[0]
            top_id = top["id"]
            top_type = top.get("media_type", media_type)
            results = await tmdb.get_similar(top_id, media_type=top_type)

    # Step 4 — Fall back to keyword search or discover
    if not results and search_query:
        results = await tmdb.search_tmdb(query=search_query, media_type=media_type)

    if not results and genre_ids:
        discover_type = "movie" if media_type == "movie" else "tv"
        results = await tmdb.discover_tmdb(media_type=discover_type, genre_ids=genre_ids)

    return {
        "parsed_intent": parsed,
        "results": results[:20],
    }