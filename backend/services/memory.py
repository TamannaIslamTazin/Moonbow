from langchain_community.chat_message_histories import ChatMessageHistory
from core.config import MAX_MESSAGES, SESSION_TTL_SECONDS
from collections import defaultdict
import asyncio
import time

store: dict[str, ChatMessageHistory] = {}
session_last_active: dict[str, float] = {}
request_log: dict[str, list] = defaultdict(list)

def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    session_last_active[session_id] = time.time()
    return store[session_id]

def trim_memory(history: ChatMessageHistory):
    if len(history.messages) > MAX_MESSAGES:
        history.messages = history.messages[-MAX_MESSAGES:]

def is_rate_limited(session_id: str, limit: int = 10) -> bool:
    now = time.time()
    request_log[session_id] = [
        t for t in request_log[session_id] if now - t < 60
    ]
    if len(request_log[session_id]) >= limit:
        return True
    request_log[session_id].append(now)
    return False

def cleanup_expired_sessions():
    now = time.time()
    expired = [
        sid for sid, last in session_last_active.items()
        if now - last > SESSION_TTL_SECONDS
    ]
    for sid in expired:
        store.pop(sid, None)
        session_last_active.pop(sid, None)
    if expired:
        print(f"[Cleanup] Removed {len(expired)} expired sessions.")

async def cleanup_loop():
    while True:
        await asyncio.sleep(600)
        cleanup_expired_sessions()