from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.discord import send_order_to_discord
from core.config import SERVICE_OPTIONS

router = APIRouter()

class ProjectRequest(BaseModel):
    name: str
    email: str
    service: str
    discord: str = ""
    socialMedia: str = ""

@router.post("/request")
async def handle_request(data: ProjectRequest):
    if not data.name.strip():
        raise HTTPException(status_code=400, detail="Name is required.")
    if not data.email.strip() or "@" not in data.email:
        raise HTTPException(status_code=400, detail="Valid email is required.")
    if data.service not in SERVICE_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid service selected.")

    success = await send_order_to_discord(data)

    if not success:
        raise HTTPException(status_code=502, detail="Failed to send request. Try again.")

    print(f"[Order] {data.name} ({data.email}) → {data.service}")
    return {
        "status":  "success",
        "message": "🌙 Your request has been received! We'll contact you soon."
    }