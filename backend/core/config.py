from dotenv import load_dotenv
import os

load_dotenv()

# Server
BASE_URL = "http://localhost:5173"

# Chat
MAX_MESSAGES        = 150
MAX_INPUT_CHARS     = 500
SESSION_TTL_SECONDS = 60 * 60
COOLDOWN_SECONDS    = 60
RATE_LIMIT_REQUESTS = 10

# API Keys
GROQ_API_KEY       = os.getenv("GROQ_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

# Validation
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY missing")
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY missing")
if not DISCORD_WEBHOOK_URL:
    raise ValueError("DISCORD_WEBHOOK_URL missing")

# Services
SERVICE_OPTIONS = [
    "chatbot",
    "ai-website-assistant",
    "workflow-automation",
    "research-project",
    "custom-ai-system",
]

SERVICE_LABELS = {
    "chatbot":              "🤖 Chatbot",
    "ai-website-assistant": "🌐 AI Website Assistant",
    "workflow-automation":  "⚙️ Workflow Automation",
    "research-project":     "🔬 Research Project",
    "custom-ai-system":     "🧠 Custom AI System",
}