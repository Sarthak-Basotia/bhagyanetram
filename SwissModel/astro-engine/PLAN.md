# Astro Engine — Implementation Plan

A single FastAPI service (modular monolith) for Vedic astrology calculations.
One dependency does the hard work: **pyswisseph**. Everything else is rule code we own.

Out of scope (per decision): palmistry, AI/horoscope text, Vastu.

---

## Architecture

```
astro-engine/
  app/
    core/
      ephemeris.py      # the ONE pyswisseph wrapper: positions, houses, ayanamsa, rise/set
      constants.py      # signs, nakshatras, exaltation/debilitation tables, dasha years
      models.py         # pydantic request/response schemas
    services/
      numerology.py     # name, phone, basic number mapping (no ephemeris)
      charts.py         # lagna (D1) + D4/D6/D7/D9/D10/D60, dignities
      panchang.py       # tithi, nakshatra, yoga, karana, paksha, sun/moon times, month, ritu, muhurta, hora
      dasha.py          # vimshottari: maha / antar / pratyantar
      dosha.py          # mangal dosh, sade sati (with phases)
      yoga.py           # rajyoga detection (24)
    routers/
      numerology.py
      kundli.py
      panchang.py
      dasha.py
      dosha.py
      yoga.py
    main.py             # FastAPI app, wires routers
  tests/
    fixtures.py         # 2-3 known birth charts with verified values
    test_*.py
  requirements.txt
  README.md
```

Core rule: **every chart/panchang/dasha/dosha endpoint calls `core/ephemeris.py` once** for
planetary positions, then applies its own rules. Numerology never touches the ephemeris.

Settings: Lahiri ayanamsa, sidereal zodiac, datetime always converted to UTC, lat/lon required for
anything position-based.

---

## Build order (each phase = working, tested endpoints before moving on)

### Phase 0 — Project setup & ephemeris core
- FastAPI skeleton, `requirements.txt` (`pyswisseph`, `fastapi`, `uvicorn`, `pydantic`, `pytest`).
- `core/ephemeris.py`: `get_positions(dt_utc, lat, lon)` returning each planet's sidereal longitude,
  speed (retro flag), sign, nakshatra; plus `get_houses()` (lagna/ascendant) and `rise_set()`.
- `core/constants.py`: signs, nakshatras, exaltation/debilitation, planet dasha years.
- `tests/fixtures.py`: 2-3 birth charts with known-correct values from established Jyotish software.
- **Deliverable:** `/health` + an internal positions function the rest builds on.

### Phase 1 — Numerology (easiest, no ephemeris)
- `services/numerology.py`: basic (DOB), name (Chaldean + Pythagorean), phone.
- Routes: `/numerology/basic`, `/numerology/name`, `/numerology/phone`.
- **Why first:** zero ephemeris, pure mapping — fast win to validate the project plumbing.

### Phase 2 — Charts (the Kundli core)
- Lagna chart (D1) from `get_houses` + `get_positions`.
- Divisional charts D4, D6, D7, D9, D10, D60 — each a longitude-division formula.
- Dignities: retrograde (speed<0), combust (near Sun), exalted/debilitated (sign tables).
- Chandra chart (Moon as reference).
- Routes: `/kundli/lagna`, `/kundli/divisional/{d}`, `/kundli/chandra`.
- **Deliverable:** full birth-chart output with planet states.

### Phase 3 — Panchang / Nanchang (day-wise)
- Tithi, nakshatra, yoga, karana, paksha from sun/moon longitudes.
- Sunrise/sunset/moonrise/moonset, Hindu month, Ritu, direction.
- Abhijit muhurta, Dushta muhurta, Hora (day-wise).
- Routes: `/panchang/day`, `/panchang/muhurta`, `/panchang/hora`.

### Phase 4 — Dasha analysis
- Vimshottari from Moon's nakshatra: Mahadasha → Antardasha → Pratyantardasha.
- Route: `/dasha/vimshottari` (returns nested periods with start/end dates).

### Phase 5 — Doshas
- Mangal Dosh: Mars in houses 1,2,4,7,8,12 from lagna/moon/venus.
- Sade Sati: Saturn transit vs natal Moon sign, with the 3 phases.
- Routes: `/dosha/mangal`, `/dosha/sade-sati`.

### Phase 6 — RajYoga
- Detect the 24 raj yogas (planet/house/lord-combination rules).
- Route: `/yoga/rajyoga` (returns which yogas are present + explanation).

### Phase 7 — Hardening
- Input validation, error handling, timezone edge cases (DST, pre-1970 dates).
- Full test pass against fixtures, API docs (FastAPI auto-docs), README.

---

## Testing strategy (runs through every phase)
Pick 2-3 birth charts with values verified in established software (e.g. Jagannatha Hora / AstroSage).
Assert lagna, planet signs, nakshatra, dasha start dates, etc. match. This is what lets us trust
hand-written rule code. PyJHora and drik-panchanga are used as **reference only** to confirm formulas —
not shipped as dependencies (avoids PyQt6 bloat and GPL licensing issues).

---

## Dependencies (final, minimal)
```
pyswisseph        # the engine — only hard dependency for math
fastapi, uvicorn  # web layer
pydantic          # schemas/validation
pytest            # tests
```
Everything else (charts, dasha, yoga, dosha, panchang, numerology) = our own code.
