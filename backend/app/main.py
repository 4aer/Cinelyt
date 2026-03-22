from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import movies, tv, ai_search

app = FastAPI(title="Cinelyt API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movies.router)
app.include_router(tv.router)
app.include_router(ai_search.router)


@app.get("/")
async def root():
    return {"message": "Cinelyt API is running"}