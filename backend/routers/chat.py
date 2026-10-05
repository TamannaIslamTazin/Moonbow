from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from services.llm import groq_chain, openrouter_chain, try_provider
from services.memory import (
    get_session_history, trim_memory,
    is_rate_limited, store,
    session_last_active, request_log
)
from core.config import MAX_INPUT_CHARS, BASE_URL

router = APIRouter()

class MessageRequest(BaseModel):
    message: str
    session_id: str

@router.post("/chat")
async def chat(request: MessageRequest):
    if not request.session_id.strip():
        raise HTTPException(status_code=400, detail="Invalid session_id.")
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    if len(request.message) > MAX_INPUT_CHARS:
        raise HTTPException(status_code=400, detail=f"Message too long. Max {MAX_INPUT_CHARS} chars.")
    if is_rate_limited(request.session_id):
        raise HTTPException(status_code=429, detail="Too many requests. Slow down.")

    history = get_session_history(request.session_id)

    result = await try_provider(groq_chain, "groq", request.message, request.session_id)
    if result is None:
        result = await try_provider(openrouter_chain, "openrouter", request.message, request.session_id)
    if result is None:
        return {
            "response": f"I'm temporarily unavailable. Contact us at rashidshocho604@gmail.com or visit {BASE_URL}/#contact"
        }

    trim_memory(history)
    return {"response": result}

@router.post("/clear_session")
async def clear_session(request: Request):
    try:
        body = await request.json()
        session_id = body.get("session_id", "").strip()
    except Exception:
        session_id = ""

    if not session_id:
        raise HTTPException(status_code=400, detail="session_id is required.")

    store.pop(session_id, None)
    session_last_active.pop(session_id, None)
    request_log.pop(session_id, None)
    return {"status": "session cleared", "session_id": session_id}