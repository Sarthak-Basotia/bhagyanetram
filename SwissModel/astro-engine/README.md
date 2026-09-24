# Astro Engine

A single FastAPI service (modular monolith) for Vedic astrology calculations.
One hard dependency — **pyswisseph** (Swiss Ephemeris) — does the astronomy; everything
else (charts, dasha, panchang, doshas, yogas, numerology) is our own rule code.

## Run with Docker (recommended)

```bash
cd astro-engine
docker compose up --build
# API at http://localhost:8000 — docs at http://localhost:8000/docs
```

Or with plain Docker:

```bash
docker build -t astro-engine .
docker run -p 8000:8000 astro-engine
```

The image is multi-stage: a builder stage compiles `pyswisseph` (it ships as C source
with no prebuilt wheels), and the final slim image installs the prebuilt wheels with no
compiler — keeping it small. Override conventions at runtime, e.g.
`docker run -p 8000:8000 -e ASTRO_NODE_TYPE=true astro-engine`.

Run the tests inside the image:

```bash
docker run --rm astro-engine pytest tests/test_engine.py -q
```

## Run locally (without Docker)

Use Python 3.11 or 3.12 (3.14 has no pyswisseph wheel and needs a compiler):

```bash
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# docs at http://127.0.0.1:8000/docs
```

## Endpoints

| Method | Path | What |
|--------|------|------|
| POST | `/kundli/lagna` | D1 chart: ascendant + 9 planets with sign, house, nakshatra, dignity, retrograde, combust |
| POST | `/kundli/divisional/{dcf}` | Divisional chart. `dcf` ∈ {1,4,6,7,9,10,60} |
| POST | `/kundli/chandra` | Moon-as-lagna chart |
| POST | `/kundli/dasha?levels=3` | Vimshottari: maha / antar / pratyantar |
| POST | `/kundli/dosha/mangal` | Manglik check from lagna/moon/venus |
| POST | `/kundli/dosha/sade-sati` | Sade Sati status + phase |
| POST | `/kundli/rajyoga` | Raj yoga detection (kendra-trikona, parivartana, gajakesari, dharma-karmadhipati) |
| POST | `/panchang/day` | Weekday, tithi, nakshatra, yoga, karana, paksha, month, ritu, sun/moon times |
| POST | `/panchang/muhurta` | Abhijit muhurta + windows |
| POST | `/panchang/hora` | Planetary hours (day) |
| POST | `/numerology/basic` | Life path, expression, soul-urge, personality |
| POST | `/numerology/name` | Name number (Chaldean / Pythagorean) |
| POST | `/numerology/phone` | Phone number reduction |

Position-based endpoints take a `BirthData` body:

```json
{ "datetime": "1990-08-15T14:30:00", "timezone_offset": 5.5,
  "latitude": 28.6139, "longitude": 77.2090 }
```

## Conventions (configurable via env vars)

- **Ayanamsa:** Lahiri (sidereal).
- **Houses:** whole-sign from the lagna.
- `ASTRO_NODE_TYPE` = `mean` (default, traditional) or `true` — Rahu/Ketu node.
- `ASTRO_POSITION_MODE` = `apparent` (default) or `true` — geometric vs apparent positions.
- `SWE_EPHE_PATH` — point to Swiss Ephemeris `.se1` data files for full JPL-grade precision
  (otherwise the built-in Moshier model is used, accurate to ~1 arcsecond).

## Verification

Calculations were cross-checked against **PyJHora** (an independent implementation of
PVR Narasimha Rao's Jyotish system) as an oracle:

- Planetary longitudes and the ascendant match to **< 0.01 arcsecond** when conventions
  are aligned (true node + true positions).
- All divisional charts (D1/D4/D6/D7/D9/D10/D60) match planet-by-planet across multiple
  birth charts.
- Tithi, nakshatra, yoga, karana and Vimshottari dasha (lord + balance) match exactly.

Run the tests:

```bash
pytest tests/test_engine.py        # regression tests, no extra deps
pytest tests/test_reference.py     # PyJHora cross-check (skipped if PyJHora absent)
```

## Structure

```
app/
  core/       ephemeris.py (the one swe wrapper), constants.py, models.py
  services/   charts, panchang, dasha, dosha, yoga, numerology   (pure rule code)
  routers/    kundli, panchang, numerology
  main.py
tests/        test_engine.py (regression), test_reference.py (oracle cross-check)
```

## Notes / next steps

- Panchang `muhurta`/`hora` use an equal-segment (daytime) model; swap in sunrise-to-sunrise
  ghati divisions if you need classical Dushta-muhurta granularity.
- RajYoga covers the principal Parashari yogas; extend `services/yoga.py` to reach the full 24.
- Mangal/Sade-Sati conventions vary by tradition; toggles are documented inline.
```
