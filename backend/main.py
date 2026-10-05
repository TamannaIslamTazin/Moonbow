from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import chat, request
from services.memory import cleanup_loop
from core.config import BASE_URL
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    asyncio.create_task(cleanup_loop())
    yield
    # shutdown (if needed)

app = FastAPI(
    title="MoonBot — Moon Bow Agency API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://moonbow-h7ha76a5p-medical1.vercel.app",
         BASE_URL,
        "https://moonbow-phi.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router)
app.include_router(request.router)

@app.get("/")
async def health():
    from services.memory import store
    from services.llm import is_healthy
    return {
        "status":            "healthy",
        "service":           "MoonBot",
        "active_sessions":   len(store),
        "groq_status":       "healthy" if is_healthy("groq") else "cooldown",
        "openrouter_status": "healthy" if is_healthy("openrouter") else "cooldown",
    }