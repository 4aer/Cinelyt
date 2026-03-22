import google.generativeai as genai
import json
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")


async def interpret_search_prompt(prompt: str) -> dict:
    system_instruction = """
    You are a movie and TV show search assistant.
    The user will give you a natural language prompt describing what they want to watch.
    Your job is to extract structured search parameters from that prompt.

    Return ONLY a valid JSON object with these fields:
    - search_query: a short keyword search string (e.g. "crime drama dark")
    - media_type: "movie", "tv", or "multi"
    - genres: list of TMDB genre names (e.g. ["Crime", "Drama", "Thriller"])
    - similar_to: a movie or TV show title they mentioned (or null)
    - mood: short description of tone/mood (e.g. "dark, intense, slow burn")

    Do not include any explanation, markdown, or extra text. Only output the raw JSON.
    """

    full_prompt = f"{system_instruction}\n\nUser prompt: {prompt}"

    response = model.generate_content(full_prompt)
    raw = response.text.strip()

    # Strip markdown code fences if Gemini adds them
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Fallback if Gemini misbehaves
        return {
            "search_query": prompt,
            "media_type": "multi",
            "genres": [],
            "similar_to": None,
            "mood": ""
        }