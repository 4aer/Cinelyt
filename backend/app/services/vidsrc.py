VIDSRC_SOURCES = [
    # Active VidSrc network mirrors/forks
    "https://vidsrc.me/embed",
    "https://vidsrc.cc/v2/embed",
    "https://vidsrc.icu/embed",
    "https://vidsrc.sbs/embed",
    
    # Active Alternative Embed Providers
    "https://vidlink.pro",
    "https://superembed.stream",
    "https://2embed.org/embed",
]

def get_movie_embed_urls(tmdb_or_imdb_id: str) -> list[str]:
    """
    Generates movie embed URLs. 
    Accepts TMDB IDs (e.g. '550') or IMDb IDs (e.g. 'tt0137523').
    """
    return [
        # VidSrc Standard Format: /embed/movie/{id}
        f"https://vidsrc.me/embed/movie/{tmdb_or_imdb_id}",
        f"https://vidsrc.cc/v2/embed/movie/{tmdb_or_imdb_id}",
        f"https://vidsrc.icu/embed/movie/{tmdb_or_imdb_id}",
        f"https://vidsrc.sbs/embed/movie/{tmdb_or_imdb_id}",
        
        # VidLink Format: /movie/{id}
        f"https://vidlink.pro/movie/{tmdb_or_imdb_id}",
        
        # SuperEmbed Format: /movie/{id}
        f"https://superembed.stream/movie/{tmdb_or_imdb_id}",
        
        # 2Embed Legacy/Query Format
        f"https://www.2embed.org/embed/movie?id={tmdb_or_imdb_id}",
    ]

def get_tv_embed_urls(tmdb_or_imdb_id: str, season: int = 1, episode: int = 1) -> list[str]:
    """
    Generates TV show embed URLs.
    Accepts TMDB IDs or IMDb IDs.
    """
    return [
        # VidSrc Standard Format: /embed/tv/{id}/{season}/{episode}
        f"https://vidsrc.me/embed/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        f"https://vidsrc.cc/v2/embed/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        f"https://vidsrc.icu/embed/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        f"https://vidsrc.sbs/embed/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        
        # VidLink Format: /tv/{id}/{season}/{episode}
        f"https://vidlink.pro/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        
        # SuperEmbed Format: /tv/{id}/{season}/{episode}
        f"https://superembed.stream/tv/{tmdb_or_imdb_id}/{season}/{episode}",
        
        # 2Embed Query Format
        f"https://www.2embed.org/embed/tv?id={tmdb_or_imdb_id}&s={season}&e={episode}",
    ]