"""All Yogas & Doshas detection (D1 chart).

Detection logic follows the standard Parashari rules and is transcribed to match
PyJHora (verified in tests). Descriptive text (significance / effects / remedies) is
static content — descriptive, not predictive.
"""
from __future__ import annotations

from ..core import constants as C
from ..core import ephemeris as E
from . import dosha as _dosha
from . import yoga as _yoga

KENDRAS = {1, 4, 7, 10}
# Panch Mahapurusha: planet -> (own/exalt signs, exalt sign). Sign index 0=Aries.
_MAHAPURUSHA = {
    "Ruchaka": ("Mars", {0, 7, 9}, 9),
    "Bhadra": ("Mercury", {2, 5}, 5),
    "Hamsa": ("Jupiter", {8, 11, 3}, 3),
    "Malavya": ("Venus", {1, 11, 6}, 11),
    "Sasa": ("Saturn", {9, 10, 6}, 6),
}
_MAHAPURUSHA_GIVES = {
    "Ruchaka": "courage, leadership, physical strength and a commanding personality",
    "Bhadra": "sharp intellect, eloquence, learning and business acumen",
    "Hamsa": "wisdom, righteousness, respect and a virtuous nature",
    "Malavya": "beauty, luxury, artistic talent and comforts",
    "Sasa": "authority, discipline, perseverance and power over others",
}
_KAALSARP_TYPES = ["Anant", "Kulik", "Vasuki", "Shankhpal", "Padma", "Mahapadma",
                   "Takshak", "Karkotak", "Shankhachur", "Ghatak", "Vishdhar", "Sheshnag"]

_SUN_TO_SATURN = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"]


def _signs(jd: float, lat: float, lon: float):
    pos = E.get_positions(jd)
    asc = E.get_ascendant(jd, lat, lon)
    sign = {n: pos[n].sign_index for n in C.PLANETS}
    return pos, asc.sign_index, sign


def _house(sign_index: int, ref_sign: int) -> int:
    return (sign_index - ref_sign) % 12 + 1


# ---------------------------------------------------------------- Yogas
def detect_yogas(jd: float, lat: float, lon: float) -> list[dict]:
    pos, lagna, sign = _signs(jd, lat, lon)
    out = []

    # Panch Mahapurusha
    for name, (planet, good_signs, exalt) in _MAHAPURUSHA.items():
        s = sign[planet]
        if s in good_signs and _house(s, lagna) in KENDRAS:
            out.append({
                "name": f"{name} Yoga", "category": "Panch Mahapurusha",
                "strength": "strong" if s == exalt else "moderate",
                "formed_by": [planet],
                "houses_involved": [_house(s, lagna)],
                "formation_description": (
                    f"{planet} in {'exalted ' if s == exalt else 'own sign '}"
                    f"{C.SIGNS[s]} in the {_house(s, lagna)}th house (a kendra)"),
                "significance": f"Grants {_MAHAPURUSHA_GIVES[name]}.",
            })

    # Budha-Aditya (Nipuna) — Sun & Mercury in the same sign
    if sign["Sun"] == sign["Mercury"]:
        out.append({
            "name": "Budha-Aditya Yoga", "category": "Solar",
            "strength": "moderate", "formed_by": ["Sun", "Mercury"],
            "houses_involved": [_house(sign["Sun"], lagna)],
            "formation_description": f"Sun and Mercury conjoined in {C.SIGNS[sign['Sun']]}",
            "significance": "Grants intelligence, communication skills and success in learning.",
        })

    # Gajakesari — Jupiter in a kendra from the Moon
    if _house(sign["Jupiter"], sign["Moon"]) in KENDRAS:
        out.append({
            "name": "Gajakesari Yoga", "category": "Chandra",
            "strength": "moderate", "formed_by": ["Jupiter", "Moon"],
            "houses_involved": [_house(sign["Jupiter"], lagna)],
            "formation_description": "Jupiter is in a kendra (1/4/7/10) from the Moon",
            "significance": "Grants intelligence, fame, respect and lasting reputation.",
        })

    # Chandra yogas: Sunapha / Anapha / Durudhara (planets excl. Sun & nodes around Moon)
    others = ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"]
    second = (sign["Moon"] + 1) % 12
    twelfth = (sign["Moon"] - 1) % 12
    in_2 = [p for p in others if sign[p] == second]
    in_12 = [p for p in others if sign[p] == twelfth]
    if in_2 and in_12:
        out.append({"name": "Durudhara Yoga", "category": "Chandra", "strength": "moderate",
                    "formed_by": sorted(in_2 + in_12), "houses_involved": [2, 12],
                    "formation_description": "Planets in both the 2nd and 12th from the Moon",
                    "significance": "Grants wealth, comforts and a generous, balanced life."})
    elif in_2:
        out.append({"name": "Sunapha Yoga", "category": "Chandra", "strength": "mild",
                    "formed_by": in_2, "houses_involved": [2],
                    "formation_description": "Planet(s) in the 2nd from the Moon",
                    "significance": "Grants self-earned wealth and status."})
    elif in_12:
        out.append({"name": "Anapha Yoga", "category": "Chandra", "strength": "mild",
                    "formed_by": in_12, "houses_involved": [12],
                    "formation_description": "Planet(s) in the 12th from the Moon",
                    "significance": "Grants health, character and a well-rounded personality."})

    # Amala — a natural benefic in the 10th from Lagna or Moon
    for p in ("Jupiter", "Venus", "Mercury"):
        if _house(sign[p], lagna) == 10 or _house(sign[p], sign["Moon"]) == 10:
            out.append({"name": "Amala Yoga", "category": "Raj", "strength": "moderate",
                        "formed_by": [p], "houses_involved": [10],
                        "formation_description": f"Benefic {p} in the 10th from Lagna/Moon",
                        "significance": "Grants lasting fame, a spotless reputation and success."})
            break

    # Raj Yogas (from the dedicated module)
    for ry in _yoga.detect_raj_yogas(jd, lat, lon)["raj_yogas"]:
        out.append({"name": ry["name"], "category": "Raj",
                    "strength": {"conjunction": "strong", "exchange": "strong",
                                 "mutual aspect": "moderate", "aspect": "mild",
                                 "yogakaraka": "strong",
                                 "kendra_from_moon": "moderate"}.get(ry.get("type"), "moderate"),
                    "formed_by": ry["planets"], "houses_involved": [],
                    "formation_description": f"{' & '.join(ry['planets'])} — {ry['type']}",
                    "significance": "A Raj Yoga — grants status, authority and success."})
    return out


# ---------------------------------------------------------------- Doshas
def _conjunct(sign, a, b) -> bool:
    return sign[a] == sign[b]


def detect_doshas(jd: float, lat: float, lon: float) -> list[dict]:
    pos, lagna, sign = _signs(jd, lat, lon)
    out = []

    # Kaal Sarp — all 7 planets on one side of the Rahu-Ketu axis
    rahu, ketu = sign["Rahu"], sign["Ketu"]
    arc_r = {(rahu + k) % 12 for k in range(7)}
    arc_k = {(ketu + k) % 12 for k in range(7)}
    planets7 = [sign[p] for p in _SUN_TO_SATURN]
    full = all(s in arc_r for s in planets7) or all(s in arc_k for s in planets7)
    outside = [p for p in _SUN_TO_SATURN if sign[p] not in arc_r and sign[p] not in arc_k]
    if full or len(outside) == 1:
        rahu_house = _house(rahu, lagna)
        out.append({
            "name": "Kaal Sarp Dosha", "category": "Dosha",
            "sub_type": f"{_KAALSARP_TYPES[rahu_house - 1]} Kaal Sarp",
            "severity": "high" if full else "partial",
            "formed_by": ["Rahu", "Ketu"], "houses_involved": [rahu_house, _house(ketu, lagna)],
            "formation_description": (
                ("All seven planets are hemmed between Rahu and Ketu"
                 if full else "All but one planet are between Rahu and Ketu (partial)")
                + f"; Rahu in the {rahu_house}th house"),
            "affected_areas": ["obstacles", "delays", "sudden ups and downs"],
            "is_cancelled": False,
            "remedies": ["Worship of Lord Shiva / Nag Devta", "Rahu-Ketu mantra japa",
                         "Nag Panchami rituals"],
        })

    # Simple conjunction doshas
    def conj_dosha(a, b, name, area, remedies, cat="Dosha"):
        if _conjunct(sign, a, b):
            h = _house(sign[a], lagna)
            out.append({"name": name, "category": cat, "severity": "moderate",
                        "formed_by": [a, b], "houses_involved": [h],
                        "formation_description": f"{a} conjunct {b} in {C.SIGNS[sign[a]]} "
                                                 f"({h}th house)",
                        "affected_areas": area, "is_cancelled": False, "remedies": remedies})

    if _conjunct(sign, "Jupiter", "Rahu") or _conjunct(sign, "Jupiter", "Ketu"):
        node = "Rahu" if _conjunct(sign, "Jupiter", "Rahu") else "Ketu"
        h = _house(sign["Jupiter"], lagna)
        out.append({"name": "Guru Chandal Dosha", "category": "Dosha", "severity": "moderate",
                    "formed_by": ["Jupiter", node], "houses_involved": [h],
                    "formation_description": f"Jupiter conjunct {node} in {C.SIGNS[sign['Jupiter']]}"
                                             f" ({h}th house)",
                    "affected_areas": ["wisdom", "ethics", "guru/teacher relations"],
                    "is_cancelled": False,
                    "remedies": ["Guru (Jupiter) mantra", "Respect elders/teachers",
                                 "Thursday fasting"]})

    # Grahan (eclipse) dosha
    if _conjunct(sign, "Sun", "Rahu") or _conjunct(sign, "Sun", "Ketu"):
        node = "Rahu" if _conjunct(sign, "Sun", "Rahu") else "Ketu"
        conj_dosha("Sun", node, "Surya Grahan Dosha",
                   ["father", "authority", "confidence", "health"],
                   ["Surya (Sun) mantra", "Offer water to the Sun", "Aditya Hridaya Stotra"])
    if _conjunct(sign, "Moon", "Rahu") or _conjunct(sign, "Moon", "Ketu"):
        node = "Rahu" if _conjunct(sign, "Moon", "Rahu") else "Ketu"
        conj_dosha("Moon", node, "Chandra Grahan Dosha",
                   ["mother", "mind", "emotions", "peace"],
                   ["Chandra (Moon) mantra", "Worship of Shiva", "Monday fasting"])

    conj_dosha("Mars", "Rahu", "Angarak Dosha",
               ["anger", "accidents", "conflicts", "impulsiveness"],
               ["Hanuman Chalisa", "Mangal mantra", "Tuesday fasting"])
    conj_dosha("Saturn", "Rahu", "Shrapit Dosha",
               ["chronic delays", "past-life karma", "struggles"],
               ["Shani mantra", "Serve the needy/elderly", "Saturday charity"])
    conj_dosha("Saturn", "Moon", "Vish Yoga",
               ["mental stress", "pessimism", "emotional lows"],
               ["Shiva worship", "Chandra & Shani mantras", "Meditation"])

    # Kemadruma — Moon isolated (no planet in 2nd/12th/with Moon, excl. Sun & nodes)
    others = ["Mars", "Mercury", "Jupiter", "Venus", "Saturn"]
    around = {(sign["Moon"] + 1) % 12, (sign["Moon"] - 1) % 12, sign["Moon"]}
    if not any(sign[p] in around for p in others):
        out.append({"name": "Kemadruma Dosha", "category": "Dosha", "severity": "moderate",
                    "formed_by": ["Moon"], "houses_involved": [_house(sign["Moon"], lagna)],
                    "formation_description": "No planets in the 2nd, 12th, or with the Moon "
                                             "(excluding Sun/nodes) — the Moon is isolated",
                    "affected_areas": ["mental peace", "struggle", "instability"],
                    "is_cancelled": False,
                    "remedies": ["Strengthen the Moon (Monday worship of Shiva)",
                                 "Chandra mantra"]})

    # Reference the dedicated dosha services for Mangal & Sade Sati
    mangal = _dosha.mangal_dosha(jd, lat, lon)
    if mangal["is_manglik"]:
        out.append({"name": "Mangal Dosha", "category": "Dosha",
                    "severity": "moderate" if mangal["mitigating_factors"] else "high",
                    "formed_by": ["Mars"],
                    "houses_involved": [mangal["mars_house_from_lagna"]],
                    "formation_description": mangal["interpretation"].split(". ")[0] + ".",
                    "affected_areas": ["marriage", "partnerships"],
                    "is_cancelled": bool(mangal["mitigating_factors"]),
                    "cancellation_reason": "; ".join(mangal["mitigating_factors"]) or None,
                    "remedies": ["Hanuman worship", "Mangal mantra", "Tuesday fasting"]})
    return out


def all_combinations(jd: float, lat: float, lon: float) -> dict:
    yogas = detect_yogas(jd, lat, lon)
    doshas = detect_doshas(jd, lat, lon)
    by_cat: dict[str, int] = {}
    for item in yogas + doshas:
        by_cat[item["category"]] = by_cat.get(item["category"], 0) + 1
    return {
        "summary": {
            "total_yogas": len(yogas),
            "total_doshas": len(doshas),
            "by_category": by_cat,
            "positives": [y["name"] for y in yogas],
            "cautions": [d["name"] for d in doshas],
        },
        "yogas": yogas,
        "doshas": doshas,
        "note": ("Vedic yogas & doshas are a belief system; detection is computed from the "
                 "chart while effects/remedies are descriptive, not predictive."),
    }
