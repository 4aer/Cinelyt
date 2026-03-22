# Cinelyt

A personal streaming discovery platform powered by AI search. Built as a learning project to explore how to integrate large language model APIs and third-party data APIs into a full-stack web application.

---

## Purpose

This project was built to learn how to work with AI APIs (Google Gemini) and data APIs (TMDB) in a real application context — covering everything from prompt engineering and structured AI output parsing, to API integration, full-stack architecture, and deployment.

---

## What It Does

Cinelyt lets you discover movies and TV shows using natural language. Instead of typing a title, you describe what you want to watch — the AI interprets your prompt, extracts search intent, and returns matching results pulled from TMDB.

- Natural language AI search ("something like Breaking Bad but set in Japan")
- Browse trending movies and TV shows
- Browse by genre
- Watch via embedded third-party video sources with multiple fallbacks
- Save titles to a personal watchlist
- Full detail pages with cast, ratings, seasons, and episode selectors

---

## Tech Stack

**Frontend**
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Zustand (watchlist state, persisted to localStorage)
- Axios

**Backend**
- FastAPI (Python)
- Google Gemini API — `gemini-2.5-flash` via `google-genai` SDK
- TMDB API — movie and TV metadata
- VidSrc — embedded video playback (no video files hosted)

**Infrastructure**
- Frontend: Vercel
- Backend: Render
- Database: Supabase (PostgreSQL)

---

## How the AI Search Works

1. User submits a natural language prompt
2. FastAPI sends the prompt to Gemini with a structured system instruction
3. Gemini returns a JSON object containing extracted parameters: search query, media type, genres, mood, and any referenced title
4. If a specific title is referenced, TMDB's similar-titles endpoint is queried
5. Otherwise, results are fetched via TMDB's search or discover endpoints using the extracted parameters
6. Results are returned to the frontend and displayed as cards

---

## Project Structure

```
cinelyt/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── routers/
│   │   │   ├── movies.py
│   │   │   ├── tv.py
│   │   │   └── ai_search.py
│   │   ├── services/
│   │   │   ├── tmdb.py
│   │   │   ├── gemini.py
│   │   │   └── vidsrc.py
│   │   └── models/
│   │       └── schemas.py
│   ├── requirements.txt
│   └── render.yaml
│
└── frontend/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   ├── search/
    │   ├── movie/[id]/
    │   ├── tv/[id]/
    │   └── watchlist/
    ├── components/
    │   ├── ui/
    │   ├── cards/
    │   ├── player/
    │   ├── search/
    │   └── sections/
    ├── lib/
    ├── store/
    └── types/
```

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 20+ and pnpm
- TMDB API key (themoviedb.org)
- Gemini API key (aistudio.google.com)
- Supabase project (supabase.com)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```
TMDB_API_KEY=your_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
GEMINI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_anon_key
```

```bash
uvicorn app.main:app --reload
# Runs on http://localhost:8000
# API docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
pnpm install
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
pnpm dev
# Runs on http://localhost:3000
```

---

## Deployment

**Backend — Render**
1. Push to GitHub
2. Create a new Web Service on Render, set root directory to `backend`
3. Add all four environment variables from `.env` plus `FRONTEND_URL=https://your-vercel-url`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Frontend — Vercel**
1. Import the repository on Vercel, set root directory to `frontend`
2. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-url`
3. Deploy

Note: Render's free tier spins down after 15 minutes of inactivity. The first request after idle may take up to 30 seconds.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/movies/trending` | Trending movies |
| GET | `/movies/search?query=` | Search movies |
| GET | `/movies/{id}` | Movie details + embed URLs |
| GET | `/movies/discover?genre_id=` | Discover by genre |
| GET | `/tv/trending` | Trending TV shows |
| GET | `/tv/search?query=` | Search TV shows |
| GET | `/tv/{id}` | TV details + embed URLs |
| GET | `/tv/{id}/embed?season=&episode=` | Episode embed URLs |
| POST | `/ai-search/` | AI-powered search (body: `{ prompt }`) |

---

## Notes

- No video files are hosted. Playback is handled entirely through embedded third-party iframes (VidSrc and fallbacks). These sources can be unstable — multiple fallback sources are provided on each title page.
- This project is for personal and educational use only.
- Movie and TV data is provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.

---

## License

This project is not licensed for public distribution or commercial use. It was built solely for personal learning purposes.