from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
import html as html_lib
from datetime import datetime, timezone

import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend config
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "nicolas@hultech.no").strip()

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


app = FastAPI(title="Hultech API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    company: Optional[str] = Field(default="", max_length=200)
    email: Optional[EmailStr] = None
    message: str = Field(..., min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str = ""
    email: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class ContactMessageResponse(BaseModel):
    id: str
    name: str
    company: str = ""
    email: Optional[str] = None
    message: str
    created_at: datetime
    email_sent: bool = False
    email_configured: bool = False


# ---------- Email helper ----------
def _build_email_html(msg: ContactMessage) -> str:
    e = html_lib.escape
    company_row = (
        f'<tr><td style="padding:6px 0;color:#666;font:12px Inter,Arial">Selskap</td>'
        f'<td style="padding:6px 0;color:#111;font:14px Inter,Arial">{e(msg.company)}</td></tr>'
        if msg.company else ""
    )
    email_row = (
        f'<tr><td style="padding:6px 0;color:#666;font:12px Inter,Arial">E-post</td>'
        f'<td style="padding:6px 0;color:#111;font:14px Inter,Arial">'
        f'<a href="mailto:{e(msg.email)}" style="color:#4A90D9;text-decoration:none">{e(msg.email)}</a></td></tr>'
        if msg.email else ""
    )
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:24px 0">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e5e5">
          <tr><td style="background:#0F0F0F;padding:18px 24px;color:#fff;font:600 16px 'Space Grotesk',Arial">
            Hultech — Ny prosjekthenvendelse
          </td></tr>
          <tr><td style="padding:24px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#666;font:12px Inter,Arial;width:120px">Navn</td>
                  <td style="padding:6px 0;color:#111;font:14px Inter,Arial">{e(msg.name)}</td></tr>
              {company_row}
              {email_row}
              <tr><td colspan="2" style="padding:14px 0 6px;color:#666;font:12px Inter,Arial">Melding</td></tr>
              <tr><td colspan="2" style="padding:8px 12px;background:#fafafa;border-left:3px solid #4A90D9;color:#222;font:14px/1.55 Inter,Arial;white-space:pre-wrap">{e(msg.message)}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:14px 24px;background:#fafafa;border-top:1px solid #eee;color:#888;font:11px Inter,Arial">
            ID: {e(msg.id)} · Mottatt: {e(msg.created_at.isoformat())}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def _send_notification_email(msg: ContactMessage) -> bool:
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not set — skipping email notification.")
        return False
    reply_to = msg.email if msg.email else None
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFY_EMAIL],
        "subject": f"Hultech · Ny henvendelse fra {msg.name}",
        "html": _build_email_html(msg),
    }
    if reply_to:
        params["reply_to"] = reply_to
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend email sent: %s", result.get("id") if isinstance(result, dict) else result)
        return True
    except Exception:
        logger.exception("Resend email send failed")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Hultech API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "email_configured": bool(RESEND_API_KEY),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/contact", response_model=ContactMessageResponse, status_code=201)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(
        name=payload.name.strip(),
        company=(payload.company or "").strip(),
        email=payload.email,
        message=payload.message.strip(),
    )

    # Send email (non-blocking, graceful failure)
    email_sent = await _send_notification_email(msg)
    msg.email_sent = email_sent

    # Persist to MongoDB
    doc = msg.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to insert contact message")
        raise HTTPException(status_code=500, detail="Kunne ikke lagre meldingen") from e

    return ContactMessageResponse(
        id=msg.id,
        name=msg.name,
        company=msg.company,
        email=msg.email,
        message=msg.message,
        created_at=msg.created_at,
        email_sent=email_sent,
        email_configured=bool(RESEND_API_KEY),
    )


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
