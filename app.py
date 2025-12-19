import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables (e.g., OPENAI_API_KEY) from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

app = FastAPI()

# Allow frontend (localhost:3000 by default) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # during local dev, allow all; tighten if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SentimentRequest(BaseModel):
    text: str


@app.get("/")
async def root():
    return {
        "message": "Sentiment Analysis API",
        "endpoints": {
            "sentiment": "POST /sentiment",
            "docs": "GET /docs",
            "health": "GET /health"
        }
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/sentiment")
async def sentiment(payload: SentimentRequest):
    if client is None:
        raise HTTPException(status_code=503, detail="LLM backend not configured (missing OPENAI_API_KEY).")

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a sentiment classifier. Respond with only one word: positive, negative, or neutral.",
                },
                {"role": "user", "content": payload.text},
            ],
            max_tokens=5,
            temperature=0,
        )
        sentiment_raw = (resp.choices[0].message.content or "").strip().lower()
        sentiment_norm = {
            "positive": "positive",
            "negative": "negative",
            "neutral": "neutral",
        }.get(sentiment_raw, "neutral")
        return {"sentiment": sentiment_norm}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {e}")
