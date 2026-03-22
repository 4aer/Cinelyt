VIDSRC_SOURCES = [
    "https://vidsrc.to/embed",
    "https://vidsrc.me/embed",
    "https://2embed.cc/embed",
]

def get_movie_embed_urls(imdb_id: str) -> list[str]:
    return [f"{source}/movie/{imdb_id}" for source in VIDSRC_SOURCES]


def get_tv_embed_urls(imdb_id: str, season: int = 1, episode: int = 1) -> list[str]:
    return [f"{source}/tv/{imdb_id}/{season}/{episode}" for source in VIDSRC_SOURCES]