from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from services.memory import get_session_history
from core.config import GROQ_API_KEY, OPENROUTER_API_KEY
from core.prompts import SYSTEM_PROMPT
from datetime import datetime, timedelta
import asyncio

# ── Circuit Breaker ───────────────────────────────────────────
COOLDOWN_SECONDS = 60

health_status = {
    "groq":       {"healthy": True, "last_failure": None},
    "openrouter": {"healthy": True, "last_failure": None},
}

def is_healthy(provider: str) -> bool:
    status = health_status[provider]
    if status["healthy"]:
        return True
    if status["last_failure"] and (
        datetime.utcnow() - status["last_failure"] > timedelta(seconds=COOLDOWN_SECONDS)
    ):
        status["healthy"] = True
        status["last_failure"] = None
        print(f"[Circuit Breaker] {provider} recovered.")
        return True
    return False

def mark_unhealthy(provider: str):
    health_status[provider]["healthy"] = False
    health_status[provider]["last_failure"] = datetime.utcnow()
    print(f"[Circuit Breaker] {provider} marked unhealthy.")

# ── LLMs ──────────────────────────────────────────────────────
groq_llm = ChatGroq(
    model="llama-3.1-8b-instant",
    groq_api_key=GROQ_API_KEY,
    temperature=0.6,
    max_tokens=512,
)

openrouter_llm = ChatOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
    model="google/gemma-3-4b-it:free",
    temperature=0.6,
    max_tokens=512,
)

# ── Prompt & Chains ───────────────────────────────────────────
prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

def build_chain(llm):
    return RunnableWithMessageHistory(
        runnable=prompt | llm,
        get_session_history=get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )

groq_chain       = build_chain(groq_llm)
openrouter_chain = build_chain(openrouter_llm)

# ── Async Provider Caller ─────────────────────────────────────
async def try_provider(
    chain, provider: str, message: str, session_id: str
) -> str | None:
    if not is_healthy(provider):
        print(f"[{provider}] Skipping — in cooldown.")
        return None
    try:
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: chain.invoke(
                {"input": message},
                {"configurable": {"session_id": session_id}},
            )
        )
        return response.content
    except Exception as e:
        mark_unhealthy(provider)
        print(f"[{provider}] Failed: {e}")
        return None