"""Raj Yoga detection (D1 chart, Parashari).

A Kendra-Trikona Raj Yoga forms when a lord of a kendra (1,4,7,10) and a lord of a
trikona (1,5,9) ASSOCIATE, where association means any of:
  (1) conjunction (same house),
  (2) mutual aspect (each casts graha drishti on the other), or
  (3) parivartana (mutual sign exchange).
A single planet that lords both a kendra and a trikona is a yogakaraka Raj Yoga by itself.
Also detects Gajakesari and Dharma-Karmadhipati yogas.
"""
from __future__ import annotations

from ..core import constants as C
from ..core import ephemeris as E

KENDRAS = {1, 4, 7, 10}
TRIKONAS = {1, 5, 9}

# Graha drishti: house-gap offsets (0 = same house, 6 = 7th house) a planet aspects.
# Everyone aspects the 7th; Mars also 4th/8th, Jupiter 5th/9th, Saturn 3rd/10th.
_ASPECT_OFFSETS = {
    "Sun": {6}, "Moon": {6}, "Mercury": {6}, "Venus": {6},
    "Mars": {3, 6, 7}, "Jupiter": {4, 6, 8}, "Saturn": {2, 6, 9},
}


def _lord_of_house(house: int, lagna_sign: int) -> str:
    return C.SIGN_LORD[(lagna_sign + house - 1) % 12]


def _houses_owned(planet: str, lagna_sign: int) -> list[int]:
    return [h for h in range(1, 13) if _lord_of_house(h, lagna_sign) == planet]


def _aspects(planet: str, from_house: int, to_house: int) -> bool:
    """True if `planet` (sitting in from_house) casts graha drishti on to_house.

    Rahu/Ketu are not sign lords here, so only the 7 classical planets appear.
    """
    return ((to_house - from_house) % 12) in _ASPECT_OFFSETS[planet]


def _association(a: str, b: str, p_house: dict, lagna_sign: int) -> str | None:
    """Return the association type between planets a and b, or None.

    Strongest-first: conjunction > exchange > mutual aspect > one-way aspect. A one-way
    graha-drishti link between a kendra lord and a trikona lord is counted as a Raj Yoga
    (the common standard used by mainstream Indian sites), labelled "aspect".
    """
    if p_house[a] == p_house[b]:
        return "conjunction"
    if p_house[a] in _houses_owned(b, lagna_sign) and p_house[b] in _houses_owned(a, lagna_sign):
        return "exchange"
    a_asp_b = _aspects(a, p_house[a], p_house[b])
    b_asp_a = _aspects(b, p_house[b], p_house[a])
    if a_asp_b and b_asp_a:
        return "mutual aspect"
    if a_asp_b or b_asp_a:
        return "aspect"
    return None


def detect_raj_yogas(jd: float, lat: float, lon: float) -> dict:
    positions = E.get_positions(jd)
    asc = E.get_ascendant(jd, lat, lon)
    lagna = asc.sign_index
    # Only the 7 classical planets can be house lords
    lords = [p for p in C.PLANETS if p not in ("Rahu", "Ketu")]
    p_house = {p: E.whole_sign_house(positions[p].sign_index, lagna) for p in C.PLANETS}

    house_lord = {h: _lord_of_house(h, lagna) for h in range(1, 13)}
    kendra_lords = {house_lord[h] for h in KENDRAS}
    trikona_lords = {house_lord[h] for h in TRIKONAS}

    yogas = []

    def _houses(planets):
        # House each involved planet occupies (from the Lagna).
        return {p: p_house[p] for p in planets}

    # 1) Yogakaraka: one planet lords BOTH a kendra (4/7/10) and a trikona (5/9).
    for p in lords:
        owned = set(_houses_owned(p, lagna))
        if owned & {4, 7, 10} and owned & {5, 9}:
            yogas.append({
                "name": "Yogakaraka Raj Yoga",
                "planets": [p],
                "type": "yogakaraka",
                "planet_houses": _houses([p]),
                "detail": f"{p} lords both a kendra and a trikona",
            })

    # 2) Kendra-Trikona Raj Yoga: a kendra lord and a (different) trikona lord associate.
    for kl in kendra_lords:
        for tl in trikona_lords:
            if kl == tl:
                continue
            assoc = _association(kl, tl, p_house, lagna)
            if assoc:
                pl = sorted([kl, tl])
                yogas.append({
                    "name": "Kendra-Trikona Raj Yoga",
                    "planets": pl,
                    "type": assoc,
                    "planet_houses": _houses(pl),
                })

    # 3) Dharma-Karmadhipati Yoga: 9th lord and 10th lord associate (special, strong case).
    l9, l10 = house_lord[9], house_lord[10]
    if l9 != l10:
        assoc = _association(l9, l10, p_house, lagna)
        if assoc:
            pl = sorted([l9, l10])
            yogas.append({
                "name": "Dharma-Karmadhipati Yoga",
                "planets": pl,
                "type": assoc,
                "planet_houses": _houses(pl),
            })

    # 4) Gajakesari Yoga: Jupiter in a kendra (1/4/7/10) from the Moon.
    jup_from_moon = (p_house["Jupiter"] - p_house["Moon"]) % 12 + 1
    if jup_from_moon in KENDRAS:
        yogas.append({"name": "Gajakesari Yoga", "planets": ["Jupiter", "Moon"],
                      "type": "kendra_from_moon", "planet_houses": _houses(["Jupiter", "Moon"])})

    # De-duplicate
    seen = set()
    unique = []
    for y in yogas:
        key = (y["name"], tuple(y["planets"]), y.get("type"))
        if key not in seen:
            seen.add(key)
            unique.append(y)

    return {
        "lagna": C.SIGNS[lagna],
        "raj_yogas_found": len(unique),
        "raj_yogas": unique,
    }
