from core.config import DISCORD_WEBHOOK_URL, SERVICE_LABELS
from datetime import datetime, timezone
import httpx

async def send_order_to_discord(data) -> bool:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    discord_payload = {
        "username": "MoonBot Orders",
        "embeds": [
            {
                "title": "🌙 New Project Request — Moon Bow Agency",
                "color": 0x00FFFF,
                "fields": [
                    {"name": "👤 Full Name",         "value": data.name.strip(),                                                          "inline": True},
                    {"name": "📧 Email",              "value": data.email.strip(),                                                         "inline": True},
                    {"name": "🛠️ Service Requested", "value": SERVICE_LABELS.get(data.service, data.service),                             "inline": False},
                    {"name": "💬 Discord",            "value": data.discord.strip()     if data.discord.strip()     else "Not provided",   "inline": True},
                    {"name": "📱 Social Media",       "value": data.socialMedia.strip() if data.socialMedia.strip() else "Not provided",   "inline": True},
                ],
                "footer": {"text": f"Moon Bow Agency • {now}"},
            }
        ],
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            DISCORD_WEBHOOK_URL,
            json=discord_payload,
            timeout=10.0,
        )
        return response.status_code in (200, 204)