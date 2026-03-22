from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import movies, tv, ai_search
import os

app = FastAPI(title="Cinelyt API", version="1.0.0")

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://cinelyt.vercel.app",
    os.getenv("FRONTEND_URL", ""),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in ALLOWED_ORIGINS if o],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(tv.router)
app.include_router(ai_search.router)

@app.get("/")
async def root():
    return {"message": "Cinelyt API is running"}