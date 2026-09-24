"""Kundli charts: Lagna (D1), divisional charts, Chandra chart, and planetary dignities.

Divisional-sign formulas follow standard Parashari rules. Each is independently
verified against PyJHora in tests/verify.
"""
from __future__ import annotations

from ..core import constants as C
from ..core import ephemeris as E

SUPPORTED_VARGAS = [1, 4, 6, 7, 9, 10, 60]


def _chart_bodies() -> list[str]:
    """Planets to include in chart output: 9 grahas plus outer planets if enabled."""
    return C.PLANETS + (C.OUTER_PLANETS if E.INCLUDE_OUTER else [])


def _is_odd_sign(s: int) -> bool:
    # Aries (s=0) is the 1st sign = odd. So odd signs have even index.
    return s % 2 == 0


def divisional_sign(longitude: float, dcf: int) -> int:
    """Return the 0-indexed sign of a planet in the Dn chart (dcf = division factor)."""
    s = int(longitude // 30)        # rasi sign
    d = longitude - s * 30          # degrees within sign (0-30)

    if dcf == 1:                                    # D1 Rasi
        return s
    if dcf == 9:                                    # D9 Navamsa
        part = int(d // (30 / 9))
        return (s * 9 + part) % 12
    if dcf == 4:                                    # D4 Chaturthamsa (kendras)
        part = int(d // (30 / 4))
        return (s + 3 * part) % 12
    if dcf == 7:                                    # D7 Saptamsa
        part = int(d // (30 / 7))
        start = s if _is_odd_sign(s) else (s + 6) % 12
        return (start + part) % 12
    if dcf == 10:                                   # D10 Dasamsa
        part = int(d // (30 / 10))
        start = s if _is_odd_sign(s) else (s + 8) % 12
        return (start + part) % 12
    if dcf == 6:                                    # D6 Shashthamsa
        part = int(d // (30 / 6))
        start = 0 if _is_odd_sign(s) else 6         # odd->from Aries, even->from Libra
        return (start + part) % 12
    if dcf == 60:                                   # D60 Shashtiamsa
        part = int(d // (30 / 60))
        return (s + part) % 12
    raise ValueError(f"Unsupported divisional factor D{dcf}")


def divisional_longitude(longitude: float, dcf: int) -> float:
    """Continuous 0-360 longitude of a planet within its Dn chart.

    The whole-sign result is `divisional_sign`; the degree within that sign is the
    planet's progress through its varga part, rescaled to 0-30. This lets us report
    degree / nakshatra / pada for divisional charts just like the D1 chart.
    """
    d_sign = divisional_sign(longitude, dcf)
    d = longitude - int(longitude // 30) * 30      # degrees within rasi sign
    part_size = 30.0 / dcf
    frac_deg = (d % part_size) / part_size * 30.0   # position within the varga -> 0-30
    return (d_sign * 30 + frac_deg) % 360.0


def dignity(planet: str, sign_index: int, degree: float) -> str:
    """Classify a planet's dignity in a sign: exalted / debilitated / own / neutral."""
    if planet in ("Rahu", "Ketu"):
        return "neutral"
    ex = C.EXALTATION.get(planet)
    if ex and ex[0] == sign_index:
        return "exalted"
    deb = C.DEBILITATION.get(planet)
    if deb and deb[0] == sign_index:
        return "debilitated"
    if sign_index in C.OWN_SIGNS.get(planet, []):
        return "own"
    return "neutral"


def is_combust(planet: str, planet_lon: float, sun_lon: float) -> bool:
    if planet not in C.COMBUSTION_ORB:
        return False
    sep = abs(((planet_lon - sun_lon + 180) % 360) - 180)
    return sep <= C.COMBUSTION_ORB[planet]


def lagna_chart(jd: float, lat: float, lon: float) -> dict:
    """Full D1 chart: ascendant, planets with sign, house, nakshatra, dignity, flags."""
    asc = E.get_ascendant(jd, lat, lon)
    positions = E.get_positions(jd, include_outer=True)
    sun_lon = positions["Sun"].longitude
    lagna_sign = asc.sign_index

    planets = []
    for name in _chart_bodies():
        p = positions[name]
        planets.append({
            "planet": name,
            "longitude": p.longitude,
            "sign": p.sign,
            "sign_index": p.sign_index,
            "degree_in_sign": p.degree_in_sign,
            "house": E.whole_sign_house(p.sign_index, lagna_sign),
            "nakshatra": p.nakshatra,
            "pada": p.pada,
            "retrograde": p.retrograde if name not in ("Sun", "Moon") else False,
            "combust": is_combust(name, p.longitude, sun_lon),
            "dignity": dignity(name, p.sign_index, p.degree_in_sign),
        })
    return {
        "ascendant": {
            "longitude": asc.longitude, "sign": asc.sign,
            "sign_index": asc.sign_index, "degree_in_sign": asc.degree_in_sign,
            "nakshatra": asc.nakshatra, "pada": asc.pada,
        },
        "planets": planets,
    }


def divisional_chart(jd: float, lat: float, lon: float, dcf: int) -> dict:
    """Dn chart: divisional sign of the ascendant and each planet."""
    if dcf not in SUPPORTED_VARGAS:
        raise ValueError(f"Unsupported D{dcf}. Supported: {SUPPORTED_VARGAS}")
    asc = E.get_ascendant(jd, lat, lon)
    positions = E.get_positions(jd, include_outer=True)
    sun_lon = positions["Sun"].longitude

    # Divisional ascendant (full position derived from its divisional longitude)
    asc_d = E._make_position("Ascendant", divisional_longitude(asc.longitude, dcf), 0.0)
    asc_d_sign = asc_d.sign_index

    planets = []
    for name in _chart_bodies():
        p = positions[name]
        dp = E._make_position(name, divisional_longitude(p.longitude, dcf), p.speed)
        planets.append({
            "planet": name,
            "longitude": dp.longitude,
            "sign": dp.sign,
            "sign_index": dp.sign_index,
            "degree_in_sign": dp.degree_in_sign,
            "house": E.whole_sign_house(dp.sign_index, asc_d_sign),
            "nakshatra": dp.nakshatra,
            "pada": dp.pada,
            # retrograde/combust are natal (D1) physical properties, carried over
            "retrograde": p.retrograde if name not in ("Sun", "Moon") else False,
            "combust": is_combust(name, p.longitude, sun_lon),
            "dignity": dignity(name, dp.sign_index, dp.degree_in_sign),
        })
    return {
        "chart": f"D{dcf}",
        "ascendant": {
            "longitude": asc_d.longitude,
            "sign": asc_d.sign,
            "sign_index": asc_d.sign_index,
            "degree_in_sign": asc_d.degree_in_sign,
            "nakshatra": asc_d.nakshatra,
            "pada": asc_d.pada,
        },
        # kept for backward compatibility
        "ascendant_sign": asc_d.sign,
        "ascendant_sign_index": asc_d_sign,
        "planets": planets,
    }


def chandra_chart(jd: float, lat: float, lon: float) -> dict:
    """Moon-as-lagna (Chandra) chart: same D1 positions, houses counted from the Moon."""
    positions = E.get_positions(jd, include_outer=True)
    moon = positions["Moon"]
    moon_sign = moon.sign_index
    sun_lon = positions["Sun"].longitude

    planets = []
    for name in _chart_bodies():
        p = positions[name]
        planets.append({
            "planet": name,
            "longitude": p.longitude,
            "sign": p.sign,
            "sign_index": p.sign_index,
            "degree_in_sign": p.degree_in_sign,
            "house": E.whole_sign_house(p.sign_index, moon_sign),
            "nakshatra": p.nakshatra,
            "pada": p.pada,
            "retrograde": p.retrograde if name not in ("Sun", "Moon") else False,
            "combust": is_combust(name, p.longitude, sun_lon),
            "dignity": dignity(name, p.sign_index, p.degree_in_sign),
        })
    return {
        "chart": "Chandra",
        "moon_sign": moon.sign,
        "moon_sign_index": moon_sign,
        "reference": {
            "longitude": moon.longitude,
            "sign": moon.sign,
            "sign_index": moon_sign,
            "degree_in_sign": moon.degree_in_sign,
            "nakshatra": moon.nakshatra,
            "pada": moon.pada,
        },
        "planets": planets,
    }


def transit_chart(birth_jd: float, transit_jd: float, lat: float, lon: float) -> dict:
    """Gochar (transit) chart: planets NOW placed against the NATAL Moon and Lagna.

    Vedic transits are read from the natal reference points, so each transiting planet's
    house is given from both the natal Moon (primary) and the natal Lagna (secondary).
    """
    natal = E.get_positions(birth_jd)
    natal_asc = E.get_ascendant(birth_jd, lat, lon)
    natal_moon_sign = natal["Moon"].sign_index
    natal_lagna_sign = natal_asc.sign_index

    transit = E.get_positions(transit_jd, include_outer=True)
    sun_lon = transit["Sun"].longitude

    planets = []
    for name in _chart_bodies():
        p = transit[name]
        planets.append({
            "planet": name,
            "longitude": p.longitude,
            "sign": p.sign,
            "sign_index": p.sign_index,
            "degree_in_sign": p.degree_in_sign,
            "nakshatra": p.nakshatra,
            "pada": p.pada,
            "retrograde": p.retrograde if name not in ("Sun", "Moon") else False,
            "combust": is_combust(name, p.longitude, sun_lon),
            "dignity": dignity(name, p.sign_index, p.degree_in_sign),
            "house_from_natal_moon": E.whole_sign_house(p.sign_index, natal_moon_sign),
            "house_from_natal_lagna": E.whole_sign_house(p.sign_index, natal_lagna_sign),
        })
    return {
        "chart": "Transit (Gochar)",
        "natal_moon_sign": C.SIGNS[natal_moon_sign],
        "natal_lagna_sign": C.SIGNS[natal_lagna_sign],
        "planets": planets,
    }
