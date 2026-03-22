VIDSRC_SOURCES = [
    "https://vidsrc.xyz/embed",
    "https://vidsrc.to/embed",
    "https://2embed.cc/embed",
    "https://autoembed.co/embed",
]

def get_movie_embed_urls(imdb_id: str) -> list[str]:
    return [f"{source}/movie?tmdb={imdb_id}" for source in VIDSRC_SOURCES]

def get_tv_embed_urls(imdb_id: str, season: int = 1, episode: int = 1) -> list[str]:
    return [f"{source}/tv?tmdb={imdb_id}&season={season}&episode={episode}" for source in VIDSRC_SOURCES]