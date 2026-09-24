"""Vimshottari Dasha: Mahadasha / Antardasha / Pratyantardasha from the Moon's nakshatra."""
from __future__ import annotations

import datetime as _dt

from ..core import constants as C
from ..core import ephemeris as E

# Vimshottari year = sidereal year (days). Matches standard Jyotish software so that
# multi-decade period dates align. (Some traditions use 365.25; change here if desired.)
_DAYS_PER_YEAR = 365.256364
_NAK_SPAN = 360.0 / 27  # 13.3333 deg


def _order_from(lord: str) -> list[str]:
    i = C.VIMSHOTTARI_ORDER.index(lord)
    return C.VIMSHOTTARI_ORDER[i:] + C.VIMSHOTTARI_ORDER[:i]


def _add_years(start: _dt.datetime, years: float) -> _dt.datetime:
    return start + _dt.timedelta(days=years * _DAYS_PER_YEAR)


def _fmt(d: _dt.datetime) -> str:
    """Format a period boundary as a date, rounded to the nearest day."""
    return (d + _dt.timedelta(hours=12)).date().isoformat()


def compute_vimshottari(jd: float, birth_dt_utc: _dt.datetime, levels: int = 3) -> dict:
    """Return nested dasha periods. levels: 1=maha, 2=+antar, 3=+pratyantar.

    The running mahadasha begins BEFORE birth. We compute its true start (birth minus
    the elapsed portion) so that every antardasha / pratyantardasha lands on its correct
    calendar date — i.e. the sub-period actually running at birth is reported correctly,
    not restarted from the mahadasha lord.
    """
    moon = E.get_positions(jd)["Moon"]
    nak = moon.nakshatra_index
    # Lord of the Moon's nakshatra (cycle of 9 over 27 nakshatras)
    maha_lord = C.VIMSHOTTARI_ORDER[nak % 9]

    # Fraction of the nakshatra already elapsed -> elapsed portion of the mahadasha
    pos_in_nak = moon.longitude - nak * _NAK_SPAN
    elapsed_frac = pos_in_nak / _NAK_SPAN
    maha_years = C.VIMSHOTTARI_YEARS[maha_lord]
    elapsed_years = maha_years * elapsed_frac
    balance_years = maha_years - elapsed_years

    # True start of the currently-running mahadasha (before birth).
    maha_start = _add_years(birth_dt_utc, -elapsed_years)

    periods = []
    cursor = maha_start
    for lord in _order_from(maha_lord):          # 9 mahadashas over the 120-year cycle
        full = C.VIMSHOTTARI_YEARS[lord]
        start, end = cursor, _add_years(cursor, full)
        node = {
            "lord": lord,
            "start": _fmt(start),
            "end": _fmt(end),
            "years": round(full, 4),
        }
        if levels >= 2:
            node["antardashas"] = _sub_periods(lord, full, start, levels)
        periods.append(node)
        cursor = end
    return {
        "moon_nakshatra": moon.nakshatra,
        "mahadasha_lord_at_birth": maha_lord,
        "mahadasha_start": _fmt(maha_start),
        "balance_years_at_birth": round(balance_years, 4),
        "mahadashas": periods,
    }


def _sub_periods(parent_lord: str, parent_years: float, start: _dt.datetime,
                 levels: int, depth: int = 2) -> list[dict]:
    """Antardasha (depth 2) / Pratyantardasha (depth 3). Each sub starts at parent's lord."""
    out = []
    cursor = start
    for lord in _order_from(parent_lord):
        # Sub-period duration = parent_years * (lord_years / 120)
        dur = parent_years * C.VIMSHOTTARI_YEARS[lord] / C.VIMSHOTTARI_TOTAL
        s, e = cursor, _add_years(cursor, dur)
        node = {
            "lord": lord,
            "start": _fmt(s),
            "end": _fmt(e),
            "years": round(dur, 4),
        }
        if levels > depth:
            key = "pratyantardashas"
            node[key] = _sub_periods(lord, dur, s, levels, depth + 1)
        out.append(node)
        cursor = e
    return out
