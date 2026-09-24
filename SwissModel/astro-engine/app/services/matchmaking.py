"""Couple matchmaking: Ashtakoota Milan (Guna Milan, 36 points) + Manglik matching.

The eight kootas and their scoring tables follow the standard North-Indian method and
are transcribed to match PyJHora exactly (verified in tests).
"""
from __future__ import annotations

from ..core import constants as C
from ..core import ephemeris as E
from . import dosha

# --- Scoring tables (0-indexed) transcribed from the standard North method ---
_YONI_MAP = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1]
_YONI_ANIMAL = ["Horse", "Elephant", "Sheep", "Serpent", "Dog", "Cat", "Rat", "Cow",
                "Buffalo", "Tiger", "Deer", "Monkey", "Mongoose", "Lion"]
_YONI = [
    [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 1, 3, 2, 1], [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0],
    [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1], [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
    [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1], [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
    [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2], [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
    [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1], [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
    [1, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1], [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
    [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2], [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4],
]
_GANA = [[6, 6, 0], [5, 6, 0], [1, 0, 6]]
_GANA_NAMES = ["Deva", "Manushya", "Rakshasa"]
_GANA_DEVA = {0, 4, 6, 7, 12, 14, 16, 21, 26}
_GANA_MANUSHYA = {1, 3, 5, 10, 11, 19, 20, 24, 25}
_VARNA = [[1, 0, 0, 0], [1, 1, 0, 0], [1, 1, 1, 0], [1, 1, 1, 1]]
_VARNA_BY_RASI = [1, 3, 2, 0, 1, 3, 2, 0, 1, 3, 2, 0]      # rasi 0-idx -> varna idx
_VARNA_NAMES = ["Brahmin", "Kshatriya", "Vaishya", "Shudra"]
_VASIYA = [[2.0, 0.5, 1.0, 0.0, 2.0], [0.5, 2.0, 0.0, 0.0, 0.0], [1.0, 0.0, 2.0, 2.0, 2.0],
           [0.0, 0.0, 2.0, 2.0, 0.0], [1.0, 0.0, 1.0, 0.0, 2.0]]
_VASIYA_NAMES = ["Chatushpada", "Manava", "Jalachara", "Vanachara", "Keeta"]
_MAITRI = [[5.0, 5.0, 5.0, 4.0, 5.0, 0.0, 0.0], [5.0, 5.0, 4.0, 1.0, 4.0, 0.5, 0.5],
           [5.0, 4.0, 5.0, 0.5, 5.0, 3.0, 0.5], [4.0, 1.0, 0.5, 5.0, 0.5, 5.0, 4.0],
           [5.0, 4.0, 5.0, 0.5, 5.0, 0.5, 3.0], [0.0, 0.5, 3.0, 5.0, 0.5, 5.0, 5.0],
           [0.0, 0.5, 0.5, 4.0, 3.0, 5.0, 5.0]]
_MAITRI_MAP = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4]        # rasi 0-idx -> lord idx
_BHAKOOT = [
    [7, 0, 7, 7, 0, 0, 7, 0, 0, 7, 7, 0], [0, 7, 0, 7, 7, 0, 0, 7, 0, 0, 7, 7],
    [7, 0, 7, 0, 7, 7, 0, 0, 7, 0, 0, 7], [7, 7, 0, 7, 0, 7, 7, 0, 0, 7, 0, 0],
    [0, 7, 7, 0, 7, 0, 7, 7, 0, 0, 7, 0], [0, 0, 7, 7, 0, 7, 0, 7, 7, 0, 0, 7],
    [7, 0, 0, 7, 7, 0, 7, 0, 7, 7, 0, 0], [0, 7, 0, 0, 7, 7, 0, 7, 0, 7, 7, 0],
    [0, 0, 7, 0, 0, 7, 7, 0, 7, 0, 7, 7], [7, 0, 0, 7, 0, 0, 7, 7, 0, 7, 0, 7],
    [7, 7, 0, 7, 7, 0, 0, 7, 7, 0, 7, 0], [0, 7, 7, 0, 0, 7, 0, 0, 7, 7, 0, 7],
]
_NADI = [[0, 8, 8], [8, 0, 8], [8, 8, 0]]
_NADI_BY_NAK = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2]
_NADI_NAMES = ["Aadi (Vata)", "Madhya (Pitta)", "Antya (Kapha)"]


def _person(jd: float):
    moon = E.get_positions(jd)["Moon"]
    return {"nakshatra": moon.nakshatra_index + 1,   # 1-27
            "pada": moon.pada,                        # 1-4
            "rasi": moon.sign_index + 1,              # 1-12
            "nakshatra_name": moon.nakshatra,
            "rasi_name": moon.sign}


def _gana(nak0: int) -> int:
    return 0 if nak0 in _GANA_DEVA else 1 if nak0 in _GANA_MANUSHYA else 2


def _vasiya_group(r: int, p: int) -> int:
    """Vashya group (rasi 1-indexed, Aries=1). Matches the standard North method."""
    if r in (1, 2) or (r == 9 and p in (3, 4)) or (r == 10 and p in (1, 2)):
        return 0  # Chatushpada (quadruped)
    if r in (3, 6, 7, 11) or (r == 9 and p in (1, 2)):
        return 1  # Manava (human)
    if r in (4, 12) or (r == 10 and p in (3, 4)):
        return 2  # Jalachara (aquatic)
    if r == 5:
        return 3  # Vanachara (Leo)
    return 4      # Keeta (Scorpio)


def _tara_score(boy_nak: int, girl_nak: int) -> float:
    res = 0.0
    for a, b in ((girl_nak, boy_nak), (boy_nak, girl_nak)):
        count = ((b - a) % 27) + 1
        if count % 9 in (3, 5, 7):
            res += 1.5
    return res


def _kootas(boy: dict, girl: dict) -> list[dict]:
    bn, gn = boy["nakshatra"], girl["nakshatra"]
    bn0, gn0 = bn - 1, gn - 1
    br, gr = boy["rasi"], girl["rasi"]

    bv, gv = _VARNA_BY_RASI[br - 1], _VARNA_BY_RASI[gr - 1]
    varna = _VARNA[gv][bv]
    vasiya = _VASIYA[_vasiya_group(gr, girl["pada"])][_vasiya_group(br, boy["pada"])]
    tara = _tara_score(bn, gn)
    yoni = _YONI[_YONI_MAP[gn0]][_YONI_MAP[bn0]]
    maitri = _MAITRI[_MAITRI_MAP[gr - 1]][_MAITRI_MAP[br - 1]]
    gana = _GANA[_gana(gn0)][_gana(bn0)]
    bhakoot = _BHAKOOT[gr - 1][br - 1]
    nadi = _NADI[_NADI_BY_NAK[bn0]][_NADI_BY_NAK[gn0]]

    return [
        {"koota": "Varna", "score": varna, "max": 1, "meaning": "Spiritual/ego compatibility",
         "boy": _VARNA_NAMES[bv], "girl": _VARNA_NAMES[gv]},
        {"koota": "Vashya", "score": vasiya, "max": 2, "meaning": "Mutual attraction & control",
         "boy": _VASIYA_NAMES[_vasiya_group(br, boy["pada"])],
         "girl": _VASIYA_NAMES[_vasiya_group(gr, girl["pada"])]},
        {"koota": "Tara", "score": tara, "max": 3, "meaning": "Health & destiny (birth-star)"},
        {"koota": "Yoni", "score": yoni, "max": 4, "meaning": "Physical/sexual compatibility",
         "boy": _YONI_ANIMAL[_YONI_MAP[bn0]], "girl": _YONI_ANIMAL[_YONI_MAP[gn0]]},
        {"koota": "Graha Maitri", "score": maitri, "max": 5,
         "meaning": "Mental compatibility & friendship of Moon-sign lords"},
        {"koota": "Gana", "score": gana, "max": 6, "meaning": "Temperament",
         "boy": _GANA_NAMES[_gana(bn0)], "girl": _GANA_NAMES[_gana(gn0)]},
        {"koota": "Bhakoot", "score": bhakoot, "max": 7, "meaning": "Love, family & finances"},
        {"koota": "Nadi", "score": nadi, "max": 8, "meaning": "Health & progeny (genes)",
         "boy": _NADI_NAMES[_NADI_BY_NAK[bn0]], "girl": _NADI_NAMES[_NADI_BY_NAK[gn0]]},
    ]


def _verdict(score: float) -> str:
    if score < 18:
        return "Not recommended"
    if score < 25:
        return "Average / acceptable"
    if score < 32:
        return "Very good"
    return "Excellent"


def match(boy_jd: float, boy_lat: float, boy_lon: float,
          girl_jd: float, girl_lat: float, girl_lon: float) -> dict:
    boy, girl = _person(boy_jd), _person(girl_jd)
    kootas = _kootas(boy, girl)
    total = sum(k["score"] for k in kootas)

    # Manglik comparison (verdict per placement)
    bm = dosha.mangal_dosha(boy_jd, boy_lat, boy_lon)
    gm = dosha.mangal_dosha(girl_jd, girl_lat, girl_lon)
    both = bm["is_manglik"] == gm["is_manglik"]
    manglik = {
        "boy": bm["effective_status"],
        "girl": gm["effective_status"],
        "compatible": both,
        "note": ("Both partners share the same Manglik status — considered compatible."
                 if both else
                 "One partner is Manglik and the other is not — traditionally a caution; "
                 "remedies or cancellations are often considered."),
    }

    # Serious dosha flags
    warnings = []
    nadi_k = next(k for k in kootas if k["koota"] == "Nadi")
    bhakoot_k = next(k for k in kootas if k["koota"] == "Bhakoot")
    if nadi_k["score"] == 0:
        warnings.append("Nadi Dosha (0/8) — affects health/progeny; check for cancellation.")
    if bhakoot_k["score"] == 0:
        warnings.append("Bhakoot Dosha (0/7) — affects emotional/financial harmony.")

    return {
        "boy": boy,
        "girl": girl,
        "kootas": kootas,
        "total_score": round(total, 1),
        "max_score": 36,
        "percentage": round(total / 36 * 100, 1),
        "verdict": _verdict(total),
        "manglik": manglik,
        "warnings": warnings,
        "note": ("Ashtakoota Guna Milan (North Indian, 36 points). Vedic-astrology "
                 "compatibility — descriptive, not a guarantee; a low score can be offset "
                 "by dosha cancellations and vice-versa."),
    }
