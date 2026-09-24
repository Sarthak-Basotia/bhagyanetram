"""Numerology: basic (DOB), name, and phone. Pure number mapping — no ephemeris."""
from __future__ import annotations

import datetime as _dt

# Chaldean letter values (1-8; 9 is never assigned in Chaldean)
_CHALDEAN = {
    "a": 1, "b": 2, "c": 3, "d": 4, "e": 5, "f": 8, "g": 3, "h": 5, "i": 1,
    "j": 1, "k": 2, "l": 3, "m": 4, "n": 5, "o": 7, "p": 8, "q": 1, "r": 2,
    "s": 3, "t": 4, "u": 6, "v": 6, "w": 6, "x": 5, "y": 1, "z": 7,
}
# Pythagorean letter values (1-9)
_PYTHAGOREAN = {c: (i % 9) + 1 for i, c in enumerate("abcdefghijklmnopqrstuvwxyz")}

MASTER_NUMBERS = {11, 22, 33}


def reduce_number(n: int, keep_master: bool = True) -> int:
    """Reduce to a single digit, optionally preserving master numbers 11/22/33."""
    while n > 9:
        if keep_master and n in MASTER_NUMBERS:
            return n
        n = sum(int(d) for d in str(n))
    return n


def _letters_sum(text: str, table: dict[str, int]) -> int:
    return sum(table[ch] for ch in text.lower() if ch in table)


def name_numerology(name: str, system: str = "chaldean") -> dict:
    """Name (expression) number with its full attribute profile."""
    table = _CHALDEAN if system.lower() == "chaldean" else _PYTHAGOREAN
    total = _letters_sum(name, table)
    root = reduce_number(total)
    return {
        "name": name,
        "system": system.lower(),
        "compound_number": total,
        "root_number": root,
        "profile": number_profile(reduce_number(root, keep_master=False), _dt.date.today()),
    }


def _is_vowel(ch: str) -> bool:
    return ch in "aeiou"


def phone_numerology(phone: str) -> dict:
    """Sum all digits of a phone number and reduce."""
    digits = [int(c) for c in phone if c.isdigit()]
    total = sum(digits)
    root = reduce_number(total, keep_master=False)
    return {
        "phone": phone,
        "digit_sum": total,
        "root_number": root,
        "profile": number_profile(root, _dt.date.today()),
    }


# ---------------------------------------------------------------------------
# Per-number associations (1-9). Chaldean / Cheiro school. Descriptive, not
# predictive — conventions vary between authors.
# ---------------------------------------------------------------------------
PLANET_BY_NUMBER = {1: "Sun", 2: "Moon", 3: "Jupiter", 4: "Rahu", 5: "Mercury",
                    6: "Venus", 7: "Ketu", 8: "Saturn", 9: "Mars"}

_DEITY = {
    1: "Surya (Sun) / Vishnu", 2: "Chandra (Moon) / Parvati",
    3: "Brihaspati (Jupiter) / Vishnu", 4: "Rahu / Ganesha / Durga",
    5: "Budha (Mercury) / Vishnu / Ganesha", 6: "Shukra (Venus) / Lakshmi",
    7: "Ketu / Durga", 8: "Shani (Saturn) / Hanuman",
    9: "Mangal (Mars) / Hanuman / Kartikeya",
}
_COLORS = {
    1: ["Gold", "Orange", "Yellow", "Copper"], 2: ["White", "Cream", "Light Green", "Silver"],
    3: ["Yellow", "Orange", "Violet", "Pink"], 4: ["Grey", "Khaki", "Electric Blue"],
    5: ["Green", "Grey", "Light Blue"], 6: ["White", "Pink", "Blue", "Pastels"],
    7: ["White", "Light Green", "Smoke Grey"], 8: ["Black", "Dark Blue", "Purple", "Grey"],
    9: ["Red", "Crimson", "Scarlet", "Pink"],
}
_DAYS = {
    1: ["Sunday", "Monday"], 2: ["Monday", "Friday"], 3: ["Thursday"],
    4: ["Saturday", "Sunday"], 5: ["Wednesday", "Friday"], 6: ["Friday", "Wednesday"],
    7: ["Monday", "Sunday"], 8: ["Saturday"], 9: ["Tuesday"],
}
_GEMSTONE = {1: "Ruby", 2: "Pearl", 3: "Yellow Sapphire", 4: "Hessonite (Gomed)",
             5: "Emerald", 6: "Diamond", 7: "Cat's Eye", 8: "Blue Sapphire", 9: "Red Coral"}
_METAL = {1: "Gold", 2: "Silver", 3: "Gold", 4: "Mixed metals", 5: "Bronze",
          6: "Silver/Platinum", 7: "Mixed metals", 8: "Iron/Steel", 9: "Copper"}
_ELEMENT = {1: "Fire", 2: "Water", 3: "Ether", 4: "Air", 5: "Earth",
            6: "Water", 7: "Water", 8: "Air", 9: "Fire"}
_DIRECTION = {1: "East", 2: "North-West", 3: "North-East", 4: "South-West", 5: "North",
              6: "South-East", 7: "South-West", 8: "West", 9: "South"}

# Natural (Naisargika) planetary friendships -> friendly/enemy numbers.
_FRIENDS = {
    "Sun": {"Moon", "Mars", "Jupiter"}, "Moon": {"Sun", "Mercury"},
    "Mars": {"Sun", "Moon", "Jupiter"}, "Mercury": {"Sun", "Venus"},
    "Jupiter": {"Sun", "Moon", "Mars"}, "Venus": {"Mercury", "Saturn"},
    "Saturn": {"Mercury", "Venus"}, "Rahu": {"Mercury", "Venus", "Saturn"},
    "Ketu": {"Mars", "Jupiter"},
}
_ENEMIES = {
    "Sun": {"Venus", "Saturn"}, "Moon": set(), "Mars": {"Mercury"},
    "Mercury": {"Moon"}, "Jupiter": {"Mercury", "Venus"}, "Venus": {"Sun", "Moon"},
    "Saturn": {"Sun", "Moon", "Mars"}, "Rahu": {"Sun", "Moon", "Mars"},
    "Ketu": {"Sun", "Moon"},
}
_NUM_BY_PLANET = {v: k for k, v in PLANET_BY_NUMBER.items()}

# Personality descriptions per number (Chaldean/Cheiro; descriptive, not predictive).
_TRAITS = {
    1: {"keywords": ["Leadership", "Independence", "Ambition", "Originality"],
        "strengths": ["Willpower", "Confidence", "Pioneering drive", "Self-reliance"],
        "challenges": ["Ego", "Stubbornness", "Domineering tendencies"],
        "summary": "A natural leader — independent, ambitious and original, happiest when "
                   "initiating and directing rather than following."},
    2: {"keywords": ["Sensitivity", "Diplomacy", "Intuition", "Cooperation"],
        "strengths": ["Empathy", "Tact", "Adaptability", "Team spirit"],
        "challenges": ["Over-sensitivity", "Indecision", "Mood swings"],
        "summary": "Gentle, intuitive and diplomatic — a peace-maker who works best in "
                   "partnership and thrives on harmony."},
    3: {"keywords": ["Creativity", "Expression", "Optimism", "Wisdom"],
        "strengths": ["Communication", "Imagination", "Enthusiasm", "Knowledge"],
        "challenges": ["Scattered focus", "Over-talkativeness", "Superficiality"],
        "summary": "Expressive, optimistic and creative — a communicator and teacher who "
                   "inspires others with ideas and cheer."},
    4: {"keywords": ["Discipline", "Practicality", "Stability", "Unconventionality"],
        "strengths": ["Organisation", "Reliability", "Endurance", "Method"],
        "challenges": ["Rigidity", "Rebelliousness", "Resistance to change"],
        "summary": "Practical, disciplined and hard-working — a builder who values structure "
                   "yet carries an unconventional streak."},
    5: {"keywords": ["Versatility", "Communication", "Adventure", "Intellect"],
        "strengths": ["Adaptability", "Quick wit", "Curiosity", "Networking"],
        "challenges": ["Restlessness", "Inconsistency", "Nervous energy"],
        "summary": "Versatile, clever and freedom-loving — a quick-thinking communicator "
                   "who thrives on variety and change."},
    6: {"keywords": ["Love", "Responsibility", "Harmony", "Artistry"],
        "strengths": ["Nurturing", "Sense of beauty", "Dependability", "Care"],
        "challenges": ["Over-indulgence", "Possessiveness", "Worry"],
        "summary": "Warm, responsible and artistic — a nurturer devoted to family, beauty "
                   "and harmony."},
    7: {"keywords": ["Analysis", "Spirituality", "Introspection", "Research"],
        "strengths": ["Intuition", "Depth", "Wisdom", "Investigation"],
        "challenges": ["Aloofness", "Over-thinking", "Secrecy"],
        "summary": "Thoughtful, analytical and spiritual — a seeker drawn to knowledge, "
                   "solitude and the deeper questions."},
    8: {"keywords": ["Ambition", "Authority", "Discipline", "Resilience"],
        "strengths": ["Perseverance", "Management", "Sense of justice", "Endurance"],
        "challenges": ["Rigidity", "Delays", "Materialism"],
        "summary": "Ambitious, disciplined and resilient — a capable organiser who achieves "
                   "lasting success through persistence."},
    9: {"keywords": ["Energy", "Courage", "Compassion", "Determination"],
        "strengths": ["Bravery", "Leadership", "Humanitarianism", "Drive"],
        "challenges": ["Impatience", "Anger", "Impulsiveness"],
        "summary": "Energetic, courageous and humanitarian — a determined fighter for "
                   "causes, driven to act and protect."},
}


def _relations(n: int) -> tuple[list[int], list[int], list[int]]:
    planet = PLANET_BY_NUMBER[n]
    friends = sorted({_NUM_BY_PLANET[p] for p in _FRIENDS[planet]} | {n})
    enemies = sorted({_NUM_BY_PLANET[p] for p in _ENEMIES[planet]})
    neutral = sorted(set(range(1, 10)) - set(friends) - set(enemies))
    return friends, enemies, neutral


def _favourable_alphabets(favourable: set[int]) -> list[str]:
    """Letters (Chaldean) whose value is one of the favourable numbers."""
    return [c.upper() for c in "abcdefghijklmnopqrstuvwxyz"
            if _CHALDEAN[c] in favourable]


def _favourable_dates(favourable: set[int], year: int, month: int) -> list[int]:
    import calendar
    days = calendar.monthrange(year, month)[1]
    return [d for d in range(1, days + 1) if reduce_number(d, keep_master=False) in favourable]


def number_profile(n: int, ref: _dt.date) -> dict:
    """All standard associations for a single numerology number (1-9)."""
    friends, enemies, neutral = _relations(n)
    fav = set(friends)
    return {
        "number": n,
        "ruling_planet": PLANET_BY_NUMBER[n],
        "favourable_god": _DEITY[n],
        "personality": _TRAITS[n],
        "friendly_numbers": friends,
        "enemy_numbers": enemies,
        "neutral_numbers": neutral,
        "favourable_colors": _COLORS[n],
        "favourable_days": _DAYS[n],
        "favourable_dates_this_month": _favourable_dates(fav, ref.year, ref.month),
        "favourable_alphabets": _favourable_alphabets(fav),
        "gemstone": _GEMSTONE[n],
        "metal": _METAL[n],
        "element": _ELEMENT[n],
        "direction": _DIRECTION[n],
    }


# --- Kua number (Eight Mansions) -> personal auspicious directions ---
_KUA_DIRECTIONS = {
    1: {"success": "SE", "health": "E", "relationship": "S", "wisdom": "N"},
    2: {"success": "NE", "health": "W", "relationship": "NW", "wisdom": "SW"},
    3: {"success": "S", "health": "N", "relationship": "SE", "wisdom": "E"},
    4: {"success": "N", "health": "S", "relationship": "E", "wisdom": "SE"},
    6: {"success": "W", "health": "NE", "relationship": "SW", "wisdom": "NW"},
    7: {"success": "NW", "health": "SW", "relationship": "NE", "wisdom": "W"},
    8: {"success": "SW", "health": "NW", "relationship": "W", "wisdom": "NE"},
    9: {"success": "E", "health": "SE", "relationship": "N", "wisdom": "S"},
}
_ALL_DIRS = {"N", "S", "E", "W", "NE", "NW", "SE", "SW"}


def kua_number(year: int, gender: str) -> int:
    y = reduce_number(sum(int(d) for d in str(year)), keep_master=False)
    male = gender.lower().startswith("m")
    if male:
        kua = (9 - y) if year >= 2000 else (10 - y)
    else:
        kua = (6 + y) if year >= 2000 else (5 + y)
    kua = reduce_number(kua, keep_master=False)
    if kua == 5:                       # 5 has no palace: males use 2, females 8
        kua = 2 if male else 8
    return kua


_DIRECTION_MEANING = {
    "success": "Sheng Chi — best for career growth, wealth and prosperity; face it while "
               "working or studying.",
    "health": "Tian Yi — supports health, recovery and vitality; good head-direction for "
              "sleeping and for dining.",
    "relationship": "Nien Yen — nurtures love, marriage and family harmony; face it during "
                    "important conversations.",
    "wisdom": "Fu Wei — aids personal growth, stability and spiritual development; good for "
              "study and meditation.",
}


def personal_directions(year: int, gender: str) -> dict:
    k = kua_number(year, gender)
    good = _KUA_DIRECTIONS[k]
    return {
        "kua_number": k,
        "group": "East" if k in (1, 3, 4, 9) else "West",
        "success": {"direction": good["success"], "meaning": _DIRECTION_MEANING["success"]},
        "health": {"direction": good["health"], "meaning": _DIRECTION_MEANING["health"]},
        "relationship": {"direction": good["relationship"],
                         "meaning": _DIRECTION_MEANING["relationship"]},
        "wisdom": {"direction": good["wisdom"], "meaning": _DIRECTION_MEANING["wisdom"]},
        "inauspicious_directions": sorted(_ALL_DIRS - set(good.values())),
    }


def basic_numerology(dob: _dt.date, full_name: str | None = None,
                     gender: str | None = None) -> dict:
    """Full numerology profile: core numbers + per-number attributes + directions."""
    today = _dt.date.today()
    radical = reduce_number(dob.day, keep_master=False)     # Mulank (psychic)
    destiny = reduce_number(sum(reduce_number(p) for p in (dob.year, dob.month, dob.day)))

    numbers = {
        "radical_number": radical,          # Mulank / psychic
        "destiny_number": destiny,          # Bhagyank / life-path
    }
    if full_name:
        clean = "".join(ch for ch in full_name.lower() if ch.isalpha())
        numbers["name_number"] = reduce_number(_letters_sum(clean, _CHALDEAN))
        numbers["soul_urge_number"] = reduce_number(
            _letters_sum("".join(c for c in clean if _is_vowel(c)), _PYTHAGOREAN))
        numbers["personality_number"] = reduce_number(
            _letters_sum("".join(c for c in clean if not _is_vowel(c)), _PYTHAGOREAN))

    out = {
        "date_of_birth": dob.isoformat(),
        "numbers": numbers,
        "radical_profile": number_profile(reduce_number(radical, keep_master=False), today),
        "destiny_profile": number_profile(reduce_number(destiny, keep_master=False), today),
        "note": ("Numerology is a belief system; these are descriptive associations "
                 "(Chaldean/Cheiro school), not predictions."),
    }
    if gender:
        out["directions"] = personal_directions(dob.year, gender)
    return out
