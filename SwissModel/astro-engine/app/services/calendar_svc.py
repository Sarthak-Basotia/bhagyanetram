"""Calendar-style timing over a date range: Rahu-Kaal, Choghadiya, Panchak, Bhadra."""
from __future__ import annotations

import datetime as _dt

import swisseph as swe

from ..core import ephemeris as E
from . import panchang as P

_MAX_DAYS = 366


def _daterange(from_d: _dt.date, to_d: _dt.date):
    d = from_d
    while d <= to_d:
        yield d
        d += _dt.timedelta(days=1)


def _jd_noon(d: _dt.date, tz_offset: float) -> float:
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    return E.to_julian_day(_dt.datetime(d.year, d.month, d.day, 12, tzinfo=tz)
                           .astimezone(_dt.timezone.utc))


# --- Per-day calendars (Rahu Kaal, Choghadiya) ---
def rahu_kaal_calendar(from_d, to_d, lat, lon, tz_offset) -> list[dict]:
    out = []
    for d in _daterange(from_d, to_d):
        m = P.muhurtas(_jd_noon(d, tz_offset), lat, lon, tz_offset)
        rk = next((t for t in m.get("inauspicious_timings", []) if t["name"] == "Rahu Kaal"), None)
        if rk:
            out.append({"date": d.isoformat(), "start": rk["start"], "end": rk["end"]})
    return out


def choghadiya_calendar(from_d, to_d, lat, lon, tz_offset) -> list[dict]:
    return [P.choghadiya(_jd_noon(d, tz_offset), lat, lon, tz_offset)
            for d in _daterange(from_d, to_d)]


# --- Continuous-window scans (Panchak, Bhadra) ---
def _find_windows(from_jd, to_jd, predicate, step, refine=44) -> list[tuple[float, float]]:
    """Contiguous [start, end] windows where predicate(jd) is True over [from_jd, to_jd]."""
    windows = []
    jd = from_jd
    active = predicate(jd)
    seg_start = from_jd if active else None
    while jd < to_jd:
        nxt = min(jd + step, to_jd)
        a = predicate(nxt)
        if a != active:
            lo, hi = jd, nxt                     # bisect the transition
            for _ in range(refine):
                mid = (lo + hi) / 2
                if predicate(mid) == active:
                    lo = mid
                else:
                    hi = mid
            if a:                                 # became active -> window starts
                seg_start = hi
            else:                                 # became inactive -> window ends
                windows.append((seg_start, hi))
                seg_start = None
            active = a
        jd = nxt
    if active and seg_start is not None:
        windows.append((seg_start, to_jd))
    return windows


def _moon_long(jd: float) -> float:
    return E.body_longitude(jd, "Moon")


def _is_panchak(jd: float) -> bool:
    # Panchak = Moon in the last five nakshatras (Dhanishta 3rd pada .. Revati) = 300deg..360deg
    return _moon_long(jd) >= 300.0


def _is_bhadra(jd: float) -> bool:
    return P._karana_name(P._karana_idx(jd)) == "Vishti"


def _fmt(jd: float, tz_offset: float) -> str:
    return P._local(jd, tz_offset)


def panchak_calendar(from_d, to_d, lat, lon, tz_offset) -> list[dict]:
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    lo = E.to_julian_day(_dt.datetime(from_d.year, from_d.month, from_d.day, tzinfo=tz)
                         .astimezone(_dt.timezone.utc))
    hi = E.to_julian_day(_dt.datetime(to_d.year, to_d.month, to_d.day, 23, 59, tzinfo=tz)
                         .astimezone(_dt.timezone.utc))
    wins = _find_windows(lo, hi, _is_panchak, step=0.25)   # Moon ~13 deg/day -> 6h steps ok
    return [{"start": _fmt(a, tz_offset), "end": _fmt(b, tz_offset),
             "type": "Panchak (Moon in Aquarius/Pisces)"} for a, b in wins]


def bhadra_calendar(from_d, to_d, lat, lon, tz_offset) -> list[dict]:
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    lo = E.to_julian_day(_dt.datetime(from_d.year, from_d.month, from_d.day, tzinfo=tz)
                         .astimezone(_dt.timezone.utc))
    hi = E.to_julian_day(_dt.datetime(to_d.year, to_d.month, to_d.day, 23, 59, tzinfo=tz)
                         .astimezone(_dt.timezone.utc))
    wins = _find_windows(lo, hi, _is_bhadra, step=1 / 12)  # ~2h steps (Vishti ~ hours long)
    return [{"start": _fmt(a, tz_offset), "end": _fmt(b, tz_offset),
             "type": "Bhadra (Vishti Karana)"} for a, b in wins]


_CALENDARS = {
    "rahu_kaal": rahu_kaal_calendar,
    "choghadiya": choghadiya_calendar,
    "panchak": panchak_calendar,
    "bhadra": bhadra_calendar,
}


def build_calendar(cal_type, from_d, to_d, lat, lon, tz_offset) -> dict:
    if cal_type not in _CALENDARS:
        raise ValueError(f"Unknown calendar type. Choose one of: {sorted(_CALENDARS)}")
    if to_d < from_d:
        raise ValueError("`to` must be on or after `from`.")
    if (to_d - from_d).days > _MAX_DAYS:
        raise ValueError(f"Date range too large (max {_MAX_DAYS} days).")
    return {
        "type": cal_type,
        "from": from_d.isoformat(),
        "to": to_d.isoformat(),
        "entries": _CALENDARS[cal_type](from_d, to_d, lat, lon, tz_offset),
    }
