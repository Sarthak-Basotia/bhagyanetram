"""The single Swiss-Ephemeris wrapper. Every position-based service calls this.

All longitudes are SIDEREAL (Lahiri ayanamsa) unless noted. Times are UTC.
"""
from __future__ import annotations

import datetime as _dt
from dataclasses import dataclass

import os

import swisseph as swe

from . import constants as C

# Configure once on import: sidereal zodiac, Lahiri ayanamsa.
swe.set_sid_mode(swe.SIDM_LAHIRI, 0, 0)

# If a Swiss Ephemeris data dir (.se1 files) is provided, use it for full JPL-grade
# precision; otherwise pyswisseph falls back to the built-in Moshier model (~1" accuracy).
_EPHE_PATH = os.environ.get("SWE_EPHE_PATH")


def _configure() -> None:
    """Apply ephemeris path + Lahiri sidereal mode.

    IMPORTANT: pyswisseph's global state (sidereal mode, ephe path) does NOT reliably
    propagate across threads. FastAPI runs sync endpoints in a worker-thread pool, so a
    mode set only once at import can be absent in the request thread — causing swisseph
    to silently use the default Fagan-Bradley ayanamsa (~0.9 deg off from Lahiri). We
    therefore (re)apply the config at the start of every calculation. It is cheap.
    """
    if _EPHE_PATH:
        swe.set_ephe_path(_EPHE_PATH)
    swe.set_sid_mode(swe.SIDM_LAHIRI, 0, 0)


# --- Convention switches (documented design choices) ---
# NODE_TYPE: "mean" (traditional Lahiri panchang) or "true" (PyJHora / many modern apps).
NODE_TYPE = os.environ.get("ASTRO_NODE_TYPE", "mean").lower()
# POSITION_MODE: "apparent" (what most Vedic software uses) or "true" (geometric).
POSITION_MODE = os.environ.get("ASTRO_POSITION_MODE", "apparent").lower()
# INCLUDE_OUTER: whether chart endpoints include Uranus/Neptune/Pluto (non-classical).
INCLUDE_OUTER = os.environ.get("ASTRO_INCLUDE_OUTER", "true").lower() in ("1", "true", "yes")

_OUTER_SWE = {"Uranus": swe.URANUS, "Neptune": swe.NEPTUNE, "Pluto": swe.PLUTO}


def _node_id() -> int:
    return swe.TRUE_NODE if NODE_TYPE == "true" else swe.MEAN_NODE


def _flags() -> int:
    f = swe.FLG_SIDEREAL | swe.FLG_SPEED | swe.FLG_SWIEPH
    if POSITION_MODE == "true":
        f |= swe.FLG_TRUEPOS
    return f


def _swe_ids() -> dict[str, int]:
    return {
        "Sun": swe.SUN, "Moon": swe.MOON, "Mars": swe.MARS, "Mercury": swe.MERCURY,
        "Jupiter": swe.JUPITER, "Venus": swe.VENUS, "Saturn": swe.SATURN,
        "Rahu": _node_id(),  # Ketu derived as Rahu + 180
    }


_ALL_BODIES = {
    "Sun": swe.SUN, "Moon": swe.MOON, "Mars": swe.MARS, "Mercury": swe.MERCURY,
    "Jupiter": swe.JUPITER, "Venus": swe.VENUS, "Saturn": swe.SATURN,
    "Uranus": swe.URANUS, "Neptune": swe.NEPTUNE, "Pluto": swe.PLUTO,
}


def body_longitude(jd: float, name: str) -> float:
    """Sidereal longitude (0-360) of a single body. Cheap helper for transit scans."""
    _configure()
    if name == "Rahu":
        vals, _ = swe.calc_ut(jd, _node_id(), _flags())
        return vals[0] % 360.0
    if name == "Ketu":
        vals, _ = swe.calc_ut(jd, _node_id(), _flags())
        return (vals[0] + 180.0) % 360.0
    vals, _ = swe.calc_ut(jd, _ALL_BODIES[name], _flags())
    return vals[0] % 360.0


@dataclass
class PlanetPosition:
    name: str
    longitude: float          # sidereal, 0-360
    sign_index: int           # 0 = Aries
    sign: str
    degree_in_sign: float
    nakshatra_index: int      # 0-26
    nakshatra: str
    pada: int                 # 1-4
    speed: float              # deg/day in longitude
    retrograde: bool


def to_julian_day(dt_utc: _dt.datetime) -> float:
    """Convert a timezone-aware (or naive-as-UTC) datetime to Julian Day (UT)."""
    if dt_utc.tzinfo is not None:
        dt_utc = dt_utc.astimezone(_dt.timezone.utc).replace(tzinfo=None)
    hour = dt_utc.hour + dt_utc.minute / 60 + dt_utc.second / 3600
    return swe.julday(dt_utc.year, dt_utc.month, dt_utc.day, hour, swe.GREG_CAL)


def get_ayanamsa(jd: float) -> float:
    _configure()
    return swe.get_ayanamsa_ut(jd)


def _nakshatra_of(longitude: float) -> tuple[int, int]:
    """Return (nakshatra_index 0-26, pada 1-4) for a sidereal longitude."""
    span = 360.0 / 27          # 13.3333 deg
    nak = int(longitude // span)
    pos_in_nak = longitude - nak * span
    pada = int(pos_in_nak // (span / 4)) + 1
    return nak % 27, pada


def _make_position(name: str, lon: float, speed: float) -> PlanetPosition:
    lon %= 360.0
    sign_index = int(lon // 30)
    nak, pada = _nakshatra_of(lon)
    return PlanetPosition(
        name=name,
        longitude=round(lon, 6),
        sign_index=sign_index,
        sign=C.SIGNS[sign_index],
        degree_in_sign=round(lon - sign_index * 30, 6),
        nakshatra_index=nak,
        nakshatra=C.NAKSHATRAS[nak],
        pada=pada,
        speed=round(speed, 6),
        retrograde=speed < 0,
    )


def get_positions(jd: float, include_outer: bool = False) -> dict[str, PlanetPosition]:
    """Sidereal positions of the 9 grahas (and optionally the outer planets) at jd (UT)."""
    _configure()
    out: dict[str, PlanetPosition] = {}
    flags = _flags()
    for name, body in _swe_ids().items():
        vals, _ = swe.calc_ut(jd, body, flags)
        lon, speed = vals[0], vals[3]
        out[name] = _make_position(name, lon, speed)
    # Ketu = Rahu + 180, same (nodal) speed sign as Rahu
    rahu = out["Rahu"]
    out["Ketu"] = _make_position("Ketu", rahu.longitude + 180.0, rahu.speed)
    if include_outer:
        for name, body in _OUTER_SWE.items():
            vals, _ = swe.calc_ut(jd, body, flags)
            out[name] = _make_position(name, vals[0], vals[3])
    return out


def get_ascendant(jd: float, lat: float, lon: float) -> PlanetPosition:
    """Sidereal ascendant (Lagna).

    Prefers houses_ex with FLG_SIDEREAL (most precise). Some pyswisseph builds raise
    `houses_ex: error` on that path, so we fall back to computing tropical cusps and
    subtracting the ayanamsa — portable and accurate to ~arcsecond.
    """
    _configure()
    try:
        _, ascmc = swe.houses_ex(jd, lat, lon, b"P", swe.FLG_SIDEREAL)
        asc_lon = ascmc[0] % 360.0
    except swe.Error:
        _, ascmc = swe.houses(jd, lat, lon, b"P")          # tropical
        asc_lon = (ascmc[0] - swe.get_ayanamsa_ut(jd)) % 360.0
    return _make_position("Ascendant", asc_lon, 0.0)


def whole_sign_house(sign_index: int, lagna_sign_index: int) -> int:
    """House number (1-12) of a sign under whole-sign system from the lagna."""
    return (sign_index - lagna_sign_index) % 12 + 1


# --- Rise/set/transit times (returns UTC datetimes) ---
# Use the Hindu disc-centre / no-refraction convention (BIT_HINDU_RISING) so sunrise and
# sunset match Indian panchang sites. Standard upper-limb+refraction differs by ~3-5 min.
def _rise_trans(jd_start: float, lat: float, lon: float, body: int, flag: int):
    res, tret = swe.rise_trans(
        jd_start, body, rsmi=flag | swe.BIT_HINDU_RISING, geopos=(lon, lat, 0.0),
        atpress=0.0, attemp=0.0, flags=swe.FLG_SWIEPH,
    )
    return tret[0] if res >= 0 else None


def _jd_to_utc(jd: float) -> _dt.datetime:
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    hour = int(h)
    minute = int((h - hour) * 60)
    second = int(round((((h - hour) * 60) - minute) * 60))
    if second == 60:
        second = 59
    return _dt.datetime(y, m, d, hour, minute, second, tzinfo=_dt.timezone.utc)


def rise_set(jd: float, lat: float, lon: float) -> dict[str, _dt.datetime | None]:
    """Sunrise/sunset/moonrise/moonset (UTC) for the day containing jd (00:00 UT start)."""
    day_start = swe.julday(*swe.revjul(jd, swe.GREG_CAL)[:3], 0.0, swe.GREG_CAL)
    return rise_set_after(day_start, lat, lon)


def rise_set_after(jd_start: float, lat: float, lon: float) -> dict[str, _dt.datetime | None]:
    """Next sunrise/sunset/moonrise/moonset (UTC) at or after jd_start (no flooring).

    Pass local-midnight-in-UT to get the events of a given LOCAL calendar day.
    """
    _configure()
    out = {
        "sunrise": _rise_trans(jd_start, lat, lon, swe.SUN, swe.CALC_RISE),
        "sunset": _rise_trans(jd_start, lat, lon, swe.SUN, swe.CALC_SET),
        "moonrise": _rise_trans(jd_start, lat, lon, swe.MOON, swe.CALC_RISE),
        "moonset": _rise_trans(jd_start, lat, lon, swe.MOON, swe.CALC_SET),
    }
    return {k: (_jd_to_utc(v) if v else None) for k, v in out.items()}
