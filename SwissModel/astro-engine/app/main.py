"""Astro Engine — FastAPI app. One modular monolith for Vedic astrology calculations."""
from fastapi import FastAPI

from app.routers import calendar, kundli, match, numerology, panchang

app = FastAPI(
    title="Astro Engine",
    version="0.1.0",
    description="Vedic astrology calculation API (Kundli, Panchang, Dasha, Doshas, Yogas, Numerology).",
)

app.include_router(kundli.router)
app.include_router(panchang.router)
app.include_router(numerology.router)
app.include_router(match.router)
app.include_router(calendar.router)


@app.get("/health")
def health():
    return {"status": "ok"}
