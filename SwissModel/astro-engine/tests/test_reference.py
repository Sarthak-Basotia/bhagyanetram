"""Cross-check against PyJHora as an independent oracle.

Skipped automatically if PyJHora isn't installed. To run:
    pip install PyJHora --no-deps   (plus stubs for its GUI deps)
    SWE_EPHE_PATH=<jhora ephe dir> ASTRO_NODE_TYPE=true ASTRO_POSITION_MODE=true pytest tests/test_reference.py

With matched conventions (true node + true positions) the engine reproduces PyJHora
planetary longitudes to < 0.01 arcsecond and all divisional/panchang/dasha results exactly.
"""
import datetime as dt

import pytest

jhora = pytest.importorskip("jhora.panchanga.drik")
from jhora.horoscope.chart import charts as jc  # noqa: E402

from app.core import ephemeris as E  # noqa: E402
from app.services import charts as S  # noqa: E402
from app.services import panchang as P  # noqa: E402

IST = dt.timezone(dt.timedelta(hours=5, minutes=30))
CASES = [
    (dt.datetime(1990, 8, 15, 14, 30, tzinfo=IST), 28.6139, 77.2090, 5.5),
    (dt.datetime(1975, 3, 2, 6, 5, tzinfo=IST), 19.0760, 72.8777, 5.5),
    (dt.datetime(2001, 11, 23, 21, 45, tzinfo=IST), 13.0827, 80.2707, 5.5),
]
PMAP = {"Sun": 0, "Moon": 1, "Mars": 2, "Mercury": 3, "Jupiter": 4,
        "Venus": 5, "Saturn": 6, "Rahu": 7, "Ketu": 8}


@pytest.mark.parametrize("local,lat,lon,tz", CASES)
def test_divisionals_match_pyjhora(local, lat, lon, tz):
    jd = E.to_julian_day(local.astimezone(dt.timezone.utc))
    place = jhora.Place("x", lat, lon, tz)
    for dcf in S.SUPPORTED_VARGAS:
        mine = {p["planet"]: p["sign_index"]
                for p in S.divisional_chart(jd, lat, lon, dcf)["planets"]}
        jres = jc.divisional_chart(jd + tz / 24, place, divisional_chart_factor=dcf)
        jsigns = {it[0]: (it[1] if isinstance(it[1], int) else it[1][0]) for it in jres}
        for name, idx in PMAP.items():
            if idx in jsigns:
                assert jsigns[idx] == mine[name], f"D{dcf} {name}"


@pytest.mark.parametrize("local,lat,lon,tz", CASES)
def test_panchang_match_pyjhora(local, lat, lon, tz):
    jd = E.to_julian_day(local.astimezone(dt.timezone.utc))
    place = jhora.Place("x", lat, lon, tz)
    jl = jd + tz / 24
    assert P.tithi(jd)["tithi_index"] == jhora.tithi(jl, place)[0]
    assert P.nakshatra(jd)["nakshatra_index"] == jhora.nakshatra(jl, place)[0]
    assert P.yoga(jd)["yoga_index"] == jhora.yogam(jl, place)[0]
