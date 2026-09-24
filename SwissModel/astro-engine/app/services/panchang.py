"""Panchang / Nanchang: the five limbs plus sun/moon times, month, ritu, muhurta, hora."""
from __future__ import annotations

import datetime as _dt

import swisseph as swe

from ..core import constants as C
from ..core import ephemeris as E


def _sun_moon_long(jd: float) -> tuple[float, float]:
    return E.body_longitude(jd, "Sun"), E.body_longitude(jd, "Moon")


# --- Index functions for the five angas (used for current value + end-time search) ---
def _tithi_idx(jd: float) -> int:
    s, m = _sun_moon_long(jd)
    return int(((m - s) % 360) // 12)          # 0-29


def _nak_idx(jd: float) -> int:
    return int((E.body_longitude(jd, "Moon") % 360) // (360 / 27))  # 0-26


def _yoga_idx(jd: float) -> int:
    s, m = _sun_moon_long(jd)
    return int(((m + s) % 360) // (360 / 27))  # 0-26


def _karana_idx(jd: float) -> int:
    s, m = _sun_moon_long(jd)
    return int(((m - s) % 360) // 6)           # 0-59


def _find_end(jd_start: float, idx_func) -> float | None:
    """Julian day when the anga at jd_start ends (its index next changes)."""
    cur = idx_func(jd_start)
    step = 0.02                                  # ~29 min coarse steps
    j = jd_start
    for _ in range(100):                         # search up to ~2 days
        j2 = j + step
        if idx_func(j2) != cur:
            lo, hi = j, j2
            for _ in range(42):                  # bisect to ~1 second
                mid = (lo + hi) / 2
                if idx_func(mid) == cur:
                    lo = mid
                else:
                    hi = mid
            return hi
        j = j2
    return None


def _local(jd: float | None, tz_offset: float) -> str | None:
    """Format a Julian day (UT) as an ISO local datetime string."""
    if jd is None:
        return None
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    utc = _dt.datetime(y, m, d, tzinfo=_dt.timezone.utc) + _dt.timedelta(hours=h)
    return utc.astimezone(_dt.timezone(_dt.timedelta(hours=tz_offset))).isoformat()


def tithi(jd: float) -> dict:
    """Lunar day: 1-30 based on Moon-Sun elongation in 12-degree steps."""
    sun, moon = _sun_moon_long(jd)
    diff = (moon - sun) % 360
    idx = int(diff // 12)               # 0-29
    paksha = "Shukla" if idx < 15 else "Krishna"
    return {
        "tithi_index": idx + 1,
        "tithi": C.TITHI_NAMES[idx],
        "paksha": paksha,
        "degrees_into_tithi": round(diff - idx * 12, 4),
    }


def nakshatra(jd: float) -> dict:
    moon = E.get_positions(jd)["Moon"]
    return {"nakshatra": moon.nakshatra, "nakshatra_index": moon.nakshatra_index + 1,
            "pada": moon.pada}


def yoga(jd: float) -> dict:
    """Nitya yoga: (Sun + Moon longitude) in 27 parts of 13.3333 deg."""
    sun, moon = _sun_moon_long(jd)
    total = (sun + moon) % 360
    idx = int(total // (360 / 27))
    return {"yoga": C.YOGA_NAMES[idx], "yoga_index": idx + 1}


def karana(jd: float) -> dict:
    """Half-tithi (6 deg). 60 karanas per lunar month; mapping per classical rule."""
    sun, moon = _sun_moon_long(jd)
    diff = (moon - sun) % 360
    n = int(diff // 6)                  # 0-59
    if n == 0:
        name = "Kimstughna"            # first half of Shukla Pratipada
    elif n >= 57:
        # last three half-tithis: Shakuni, Chatushpada, Naga
        name = C.KARANA_NAMES[7 + (n - 57)]
    else:
        # 7 repeating movable karanas (Bava..Vishti) cycle through (n-1)
        name = C.KARANA_NAMES[(n - 1) % 7]
    return {"karana": name, "karana_index": n + 1}


# Ritu by solar sign-pair, Vasanta starting at Pisces+Aries. Index into C.RITUS.
# Applied to the TROPICAL (sayana) Sun for Drik Ritu (the observed season).
_RITU_BY_SIGN = {11: 0, 0: 0, 1: 1, 2: 1, 3: 2, 4: 2,
                 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5}


def _prev_new_moon(jd: float) -> float:
    """Julian day of the most recent new moon (Amavasya end) at or before jd."""
    def signed_elong(j):
        d = (E.body_longitude(j, "Moon") - E.body_longitude(j, "Sun")) % 360
        return d - 360 if d > 180 else d
    e0 = (E.body_longitude(jd, "Moon") - E.body_longitude(jd, "Sun")) % 360
    est = jd - e0 / 12.19                      # ~12.19 deg/day elongation rate
    lo, hi = est - 3, est + 3                  # signed elongation is monotonic through 0 here
    for _ in range(50):
        mid = (lo + hi) / 2
        if signed_elong(mid) < 0:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def _lunar_month_index(jd: float) -> int:
    """Amanta lunar-month index (0=Chaitra): named from the Sun's sign at the new moon."""
    nm = _prev_new_moon(jd)
    sun_sign = int(E.body_longitude(nm, "Sun") // 30)
    return (sun_sign + 1) % 12                 # Sun in Pisces at new moon -> Chaitra


def lunar_month_and_ritu(jd: float) -> dict:
    """Lunar month plus both ritus.

    Drik Ritu = observed season from the Sun's TROPICAL (sayana) sign.
    Vedic Ritu = traditional season from the lunar month.
    """
    sid_sun = E.body_longitude(jd, "Sun")          # sidereal
    sun_sign = int(sid_sun // 30)
    trop_sign = int(((sid_sun + E.get_ayanamsa(jd)) % 360) // 30)  # tropical
    lunar_idx = _lunar_month_index(jd)
    return {
        "hindu_month": C.LUNAR_MONTHS[lunar_idx],
        "solar_month": C.LUNAR_MONTHS[sun_sign],
        "drik_ritu": C.RITUS[_RITU_BY_SIGN[trop_sign]],
        "vedic_ritu": C.RITUS[lunar_idx // 2],     # 2 lunar months per ritu
    }


def weekday_and_times(jd: float, lat: float, lon: float) -> dict:
    rs = E.rise_set(jd, lat, lon)
    # Vedic weekday begins at sunrise; use civil weekday of the date here.
    y, m, d, _ = swe.revjul(jd, swe.GREG_CAL)
    wd = _dt.date(y, m, d).strftime("%A")
    return {
        "weekday": wd,
        "day_lord": C.DAY_LORD[wd],
        "sunrise": rs["sunrise"].isoformat() if rs["sunrise"] else None,
        "sunset": rs["sunset"].isoformat() if rs["sunset"] else None,
        "moonrise": rs["moonrise"].isoformat() if rs["moonrise"] else None,
        "moonset": rs["moonset"].isoformat() if rs["moonset"] else None,
    }


# Fraction-of-day offsets (start) by weekday (0=Sunday). Each window lasts 1/8 of the day.
_TRIKALAM = {
    "Rahu Kaal":  [0.875, 0.125, 0.75, 0.5, 0.625, 0.375, 0.25],
    "Gulika Kaal": [0.75, 0.625, 0.5, 0.375, 0.25, 0.125, 0.0],
    "Yamaganda":  [0.5, 0.375, 0.25, 0.125, 0.0, 0.75, 0.625],
}
# Dur Muhurtam offsets (in 1/12 of day units) by weekday (0=Sunday); 0.0 = not present.
# Second value uses night duration only on Tuesday (index 2).
_DURMUHURTAM = [[10.4, 0.0], [6.4, 8.8], [2.4, 4.8], [5.6, 0.0],
                [4.0, 8.8], [2.4, 6.4], [1.6, 0.0]]


def _span(a_jd: float, b_jd: float, tz_offset: float, name: str) -> dict:
    return {"name": name, "start": _local(a_jd, tz_offset), "end": _local(b_jd, tz_offset)}


def muhurtas(jd: float, lat: float, lon: float, tz_offset: float) -> dict:
    """Auspicious and inauspicious timings for the day (all in local time).

    Inauspicious: Rahu Kaal, Yamaganda, Gulika Kaal, Dur Muhurtam.
    Auspicious:   Abhijit, Brahma Muhurta, Vijaya Muhurta, Godhuli Muhurta.
    Rahu/Yama/Gulika divide daytime into 8 parts (weekday-specific); values match PyJHora.
    """
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    local_date = (_dt.datetime(y, m, d, tzinfo=_dt.timezone.utc)
                  + _dt.timedelta(hours=h)).astimezone(tz).date()
    jd_mid = E.to_julian_day(
        _dt.datetime(local_date.year, local_date.month, local_date.day,
                     tzinfo=tz).astimezone(_dt.timezone.utc))
    rs = E.rise_set_after(jd_mid, lat, lon)
    if not (rs["sunrise"] and rs["sunset"]):
        return {"error": "No sunrise/sunset for this location/date (polar region)."}
    sr = E.to_julian_day(rs["sunrise"])
    ss = E.to_julian_day(rs["sunset"])
    next_sr = E.to_julian_day(E.rise_set_after(ss + 0.01, lat, lon)["sunrise"])
    day_len = ss - sr
    night_len = next_sr - ss
    vaara = (local_date.weekday() + 1) % 7        # 0 = Sunday

    inauspicious = []
    for name, offs in _TRIKALAM.items():
        start = sr + day_len * offs[vaara]
        inauspicious.append(_span(start, start + 0.125 * day_len, tz_offset, name))
    # Dur Muhurtam (one or two windows per day)
    dm_len = day_len * 0.8 / 12
    for i, off in enumerate(_DURMUHURTAM[vaara]):
        if off == 0.0:
            continue
        base, dur = (ss, night_len) if (vaara == 2 and i == 1) else (sr, day_len)
        start = base + dur * off / 12
        inauspicious.append(_span(start, start + dm_len, tz_offset, "Dur Muhurtam"))

    # 15 muhurtas span sunrise->sunset. Abhijit = 8th (midday); Vijaya = 11th (afternoon).
    muhurta = 48.0 / 1440                       # a muhurta is a fixed 48 minutes
    auspicious = [
        _span(sr + 7 / 15 * day_len, sr + 8 / 15 * day_len, tz_offset, "Abhijit Muhurta"),
        # Brahma Muhurta: the fixed 48-min muhurta ending 48 min before sunrise.
        _span(sr - 2 * muhurta, sr - muhurta, tz_offset, "Brahma Muhurta"),
        _span(sr + 10 / 15 * day_len, sr + 11 / 15 * day_len, tz_offset, "Vijaya Muhurta"),
        # Godhuli (twilight): ~24 min centred on sunset.
        _span(ss - day_len / 60, ss + night_len / 60, tz_offset, "Godhuli Muhurta"),
    ]

    return {
        "date": local_date.isoformat(),
        "sunrise": _local(sr, tz_offset),
        "sunset": _local(ss, tz_offset),
        "auspicious_timings": auspicious,
        "inauspicious_timings": inauspicious,
    }


def hora(jd: float, lat: float, lon: float, tz_offset: float) -> dict:
    """Planetary hours (horas) for the full Vedic day: sunrise -> sunset -> next sunrise.

    24 horas total — 12 daytime (each = daylight/12) and 12 nighttime (each = night/12),
    starting from the day lord and following the Chaldean order. Returned in local time.
    """
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    local_date = (_dt.datetime(y, m, d, tzinfo=_dt.timezone.utc)
                  + _dt.timedelta(hours=h)).astimezone(tz).date()
    jd_mid = E.to_julian_day(
        _dt.datetime(local_date.year, local_date.month, local_date.day,
                     tzinfo=tz).astimezone(_dt.timezone.utc))
    rs = E.rise_set_after(jd_mid, lat, lon)
    if not (rs["sunrise"] and rs["sunset"]):
        return {"error": "No sunrise/sunset for this location/date (polar region)."}
    sr = E.to_julian_day(rs["sunrise"])
    ss = E.to_julian_day(rs["sunset"])
    next_sr = E.to_julian_day(E.rise_set_after(ss + 0.01, lat, lon)["sunrise"])

    day_lord = C.DAY_LORD[local_date.strftime("%A")]
    start_idx = C.HORA_LORDS.index(day_lord)
    day_unit = (ss - sr) / 12
    night_unit = (next_sr - ss) / 12

    horas = []
    for i in range(24):                          # 12 day + 12 night, sequence continues
        lord = C.HORA_LORDS[(start_idx + i) % 7]
        if i < 12:
            a, b, period = sr + day_unit * i, sr + day_unit * (i + 1), "day"
        else:
            j = i - 12
            a, b, period = ss + night_unit * j, ss + night_unit * (j + 1), "night"
        horas.append({"hora": i + 1, "lord": lord, "period": period,
                      "start": _local(a, tz_offset), "end": _local(b, tz_offset)})
    return {"day_lord": day_lord, "horas": horas}


# --- Choghadiya (8 day + 8 night slots). Tables/types match PyJHora. ---
_CHOGH_DAY = [[0, 1, 2, 3, 4, 5, 6, 0], [3, 4, 5, 6, 0, 1, 2, 3], [6, 0, 1, 2, 3, 4, 5, 6],
              [2, 3, 4, 5, 6, 0, 1, 2], [5, 6, 0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 0, 1],
              [4, 5, 6, 0, 1, 2, 3, 4]]
_CHOGH_NIGHT = [[5, 3, 1, 6, 4, 2, 0, 5], [1, 6, 4, 2, 0, 5, 3, 1], [4, 2, 0, 5, 3, 1, 6, 4],
                [0, 5, 3, 1, 6, 4, 2, 0], [3, 1, 6, 4, 2, 0, 5, 3], [6, 4, 2, 0, 5, 3, 1, 6],
                [2, 0, 5, 3, 1, 6, 4, 2]]
_CHOGH = [("Udveg", "bad", "Sun"), ("Chara", "good", "Venus"), ("Labha", "good", "Mercury"),
          ("Amrit", "good", "Moon"), ("Kaala", "bad", "Saturn"), ("Shubha", "good", "Jupiter"),
          ("Rog", "bad", "Mars")]


def _day_bounds(jd: float, lat: float, lon: float, tz_offset: float):
    """(local_date, sunrise_jd, sunset_jd, next_sunrise_jd) for the local day of jd."""
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    local_date = (_dt.datetime(y, m, d, tzinfo=_dt.timezone.utc)
                  + _dt.timedelta(hours=h)).astimezone(tz).date()
    jd_mid = E.to_julian_day(_dt.datetime(local_date.year, local_date.month, local_date.day,
                                          tzinfo=tz).astimezone(_dt.timezone.utc))
    rs = E.rise_set_after(jd_mid, lat, lon)
    if not (rs["sunrise"] and rs["sunset"]):
        return local_date, None, None, None
    sr = E.to_julian_day(rs["sunrise"])
    ss = E.to_julian_day(rs["sunset"])
    next_sr = E.to_julian_day(E.rise_set_after(ss + 0.01, lat, lon)["sunrise"])
    return local_date, sr, ss, next_sr


def choghadiya(jd: float, lat: float, lon: float, tz_offset: float) -> dict:
    """Gauri Choghadiya: 8 day + 8 night slots, each with type and good/bad quality."""
    local_date, sr, ss, next_sr = _day_bounds(jd, lat, lon, tz_offset)
    if sr is None:
        return {"error": "No sunrise/sunset for this location/date (polar region)."}
    vaara = (local_date.weekday() + 1) % 7        # 0 = Sunday
    day_unit, night_unit = (ss - sr) / 8, (next_sr - ss) / 8

    def build(base, unit, table):
        slots = []
        for i in range(8):
            name, quality, lord = _CHOGH[table[vaara][i]]
            slots.append({"name": name, "quality": quality, "lord": lord,
                          "start": _local(base + unit * i, tz_offset),
                          "end": _local(base + unit * (i + 1), tz_offset)})
        return slots

    return {
        "date": local_date.isoformat(),
        "sunrise": _local(sr, tz_offset), "sunset": _local(ss, tz_offset),
        "day": build(sr, day_unit, _CHOGH_DAY),
        "night": build(ss, night_unit, _CHOGH_NIGHT),
    }


_NAK_SPAN = 360 / 27


def _karana_name(n: int) -> str:
    if n == 0:
        return "Kimstughna"
    if n >= 57:
        return C.KARANA_NAMES[7 + (n - 57)]
    return C.KARANA_NAMES[(n - 1) % 7]


def daily_panchang(jd: float, lat: float, lon: float, tz_offset: float) -> dict:
    """Full daily Panchang reckoned from sunrise, with end times in local time.

    The Hindu day begins at sunrise, so the five limbs (tithi, nakshatra, yoga, karana)
    are reported as they prevail at sunrise, each with the time it ends (and what follows).
    """
    tz = _dt.timezone(_dt.timedelta(hours=tz_offset))
    # Local date of the requested moment, then anchor on that day's sunrise.
    y, m, d, h = swe.revjul(jd, swe.GREG_CAL)
    local_date = (_dt.datetime(y, m, d, tzinfo=_dt.timezone.utc)
                  + _dt.timedelta(hours=h)).astimezone(tz).date()
    # Search rise/set from LOCAL midnight so we get this local day's events.
    midnight_local = _dt.datetime(local_date.year, local_date.month, local_date.day, tzinfo=tz)
    jd_mid = E.to_julian_day(midnight_local.astimezone(_dt.timezone.utc))

    rs = E.rise_set_after(jd_mid, lat, lon)
    sunrise_utc = rs["sunrise"]
    sr_jd = E.to_julian_day(sunrise_utc) if sunrise_utc else (jd_mid + 0.25)

    # --- Five limbs at sunrise, with end times ---
    ti = _tithi_idx(sr_jd)
    tithi_block = {
        "index": ti + 1, "name": C.TITHI_NAMES[ti],
        "paksha": "Shukla" if ti < 15 else "Krishna",
        "ends_at": _local(_find_end(sr_jd, _tithi_idx), tz_offset),
        "next": C.TITHI_NAMES[(ti + 1) % 30],
    }
    moon_long = E.body_longitude(sr_jd, "Moon")
    ni = int(moon_long // _NAK_SPAN)
    pada = int((moon_long - ni * _NAK_SPAN) // (_NAK_SPAN / 4)) + 1
    nak_block = {
        "index": ni + 1, "name": C.NAKSHATRAS[ni], "pada": pada,
        "ends_at": _local(_find_end(sr_jd, _nak_idx), tz_offset),
        "next": C.NAKSHATRAS[(ni + 1) % 27],
    }
    yi = _yoga_idx(sr_jd)
    yoga_block = {
        "index": yi + 1, "name": C.YOGA_NAMES[yi],
        "ends_at": _local(_find_end(sr_jd, _yoga_idx), tz_offset),
        "next": C.YOGA_NAMES[(yi + 1) % 27],
    }
    ki = _karana_idx(sr_jd)
    karana_block = {
        "index": ki + 1, "name": _karana_name(ki),
        "ends_at": _local(_find_end(sr_jd, _karana_idx), tz_offset),
        "next": _karana_name((ki + 1) % 60),
    }

    wd = local_date.strftime("%A")
    month_ritu = lunar_month_and_ritu(sr_jd)
    return {
        "date": local_date.isoformat(),
        "weekday": wd,
        "day_lord": C.DAY_LORD[wd],
        "paksha": tithi_block["paksha"],
        "sunrise": _local(sr_jd, tz_offset),
        "sunset": _local(E.to_julian_day(rs["sunset"]), tz_offset) if rs["sunset"] else None,
        "moonrise": _local(E.to_julian_day(rs["moonrise"]), tz_offset) if rs["moonrise"] else None,
        "moonset": _local(E.to_julian_day(rs["moonset"]), tz_offset) if rs["moonset"] else None,
        "tithi": tithi_block,
        "nakshatra": nak_block,
        "yoga": yoga_block,
        "karana": karana_block,
        "hindu_month": month_ritu["hindu_month"],
        "solar_month": month_ritu["solar_month"],
        "drik_ritu": month_ritu["drik_ritu"],
        "vedic_ritu": month_ritu["vedic_ritu"],
    }
